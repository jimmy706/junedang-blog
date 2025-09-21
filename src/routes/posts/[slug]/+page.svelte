<script lang="ts">
  import PageLoading from "$lib/PageLoading.svelte";
  import { onMount } from "svelte";
  import Container from "$lib/Container.svelte";

  export let data;
  let loading = true;
  let iframeElement: HTMLIFrameElement;
  let iframeHeight = "800px"; // Default height

  // Function to handle messages from the iframe
  const handleMessage = (event: MessageEvent) => {
    // Make sure the message is from our iframe
    if (event.source === iframeElement?.contentWindow) {
      try {
        // Process the message data
        const messageData = event.data;

        // Check if it's our resize message
        if (
          messageData &&
          typeof messageData === "object" &&
          messageData.type === "resize-iframe"
        ) {
          // Update iframe height with some additional padding
          const newHeight = messageData.height + 50; // Add padding
          iframeHeight = `${newHeight}px`;

          // Ensure minimum height
          if (newHeight < 500) {
            iframeHeight = "500px";
          }
        }
      } catch (error) {
        console.error("Error processing iframe message:", error);
      }
    }
  };

  // Function to inject resize script into the iframe
  const injectResizeScript = () => {
    try {
      // Check if we can access the iframe content (same-origin policy)
      if (
        iframeElement &&
        iframeElement.contentWindow &&
        iframeElement.contentDocument
      ) {
        // Create a script to measure and report height
        const script = iframeElement.contentDocument.createElement("script");
        script.textContent = `
          // Function to measure and send height
          function reportHeight() {
            // Get document height
            const height = Math.max(
              document.body.scrollHeight,
              document.body.offsetHeight,
              document.documentElement.clientHeight,
              document.documentElement.scrollHeight,
              document.documentElement.offsetHeight
            );
            
            // Send message to parent window
            window.parent.postMessage({
              type: 'resize-iframe',
              height: height
            }, '*');
          }
          
          // Report height when loaded
          window.addEventListener('load', reportHeight);
          
          // Report height on resize
          window.addEventListener('resize', reportHeight);
          
          // Report height after images load
          document.addEventListener('DOMContentLoaded', function() {
            const images = document.querySelectorAll('img');
            let loadedImages = 0;
            const totalImages = images.length;
            
            // If no images, just report height
            if (totalImages === 0) {
              reportHeight();
            }
            
            // Report height after each image loads
            images.forEach(function(img) {
              img.addEventListener('load', function() {
                loadedImages++;
                reportHeight();
              });
              
              // Also count images that fail to load
              img.addEventListener('error', function() {
                loadedImages++;
                reportHeight();
              });
            });
          });
          
          // Initial report
          reportHeight();
          
          // Report periodically just to be safe
          setInterval(reportHeight, 1000);
        `;

        // Append the script to the document
        iframeElement.contentDocument.body.appendChild(script);
      }
    } catch (e) {
      console.warn(
        "Could not inject resize script - cross-origin restriction.",
        e
      );
      // If we can't inject the script due to cross-origin policy,
      // we'll rely on the external script approach instead
    }
  };

  onMount(() => {
    // Add message event listener
    window.addEventListener("message", handleMessage);

    // Create a helper function to add resize script parameter to URL
    const addScriptParam = (url: string) => {
      const separator = url.includes("?") ? "&" : "?";
      return `${url}${separator}_iframe=true&_t=${Date.now()}`;
    };

    // If we have iframe element, update its src to include params
    if (iframeElement && data.blogPostUrl) {
      // Add parameters to trigger resize script in the content
      iframeElement.src = addScriptParam(data.blogPostUrl);
    }

    // Cleanup function
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  });
</script>

<svelte:head>
  <title>Junedang | {data.slug}</title>
  <!-- Add a global script that will be included on blog posts to enable cross-domain communication -->
  <script>
    // This script will be included in the head of the parent page
    // It creates a global function that the iframe can call via postMessage
    window.receiveIframeHeight = function (height) {
      const iframe = document.getElementById("post-iframe");
      if (iframe) {
        iframe.style.height = height + 50 + "px"; // Add padding
      }
    };
  </script>
  <style>
    /* This ensures the body doesn't create its own scrollbar */
    html,
    body {
      height: 100%;
      overflow: hidden;
      margin: 0;
      padding: 0;
    }
  </style>
</svelte:head>

<!-- Remove padding to take full viewport -->
<div class="flex w-full h-screen flex-col">
  {#if loading}
    <Container>
      <PageLoading {loading} />
    </Container>
  {/if}
  <iframe
    id="post-iframe"
    bind:this={iframeElement}
    class={`w-full h-full ${loading ? "hidden" : ""}`}
    style={`height: ${loading ? "100vh" : iframeHeight}; border: none;`}
    src={data.blogPostUrl}
    title={data.slug}
    on:load={() => {
      loading = false;
      // Try to inject resize script (will work for same-origin)
      injectResizeScript();
      // For cross-origin, we rely on the blog having our resize script
    }}
    scrolling="auto"
  ></iframe>
</div>
