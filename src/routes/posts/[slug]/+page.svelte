<script lang="ts">
  import PageLoading from "$lib/PageLoading.svelte";
  import { onMount } from "svelte";
  import Container from "$lib/Container.svelte";
  import DOMPurify from "isomorphic-dompurify";
  import ShareButtons from "$lib/post/ShareButtons.svelte";
  import Dropdown from "$lib/Dropdown.svelte";
  import ChervonDown from "../../../components/icons/ChervonDown.svelte";

  // Load mermaid only in the browser to avoid SSR "document is not defined"
  onMount(async () => {
    try {
      const { default: mermaid } = await import("mermaid");
      mermaid.initialize({
        startOnLoad: true,
        theme: "default",
      });
      mermaid.run();
    } catch (e) {
      // Fail silently in case mermaid fails to load on client
      console.warn("Mermaid failed to initialize", e);
    }
  });

  // Add proper type definition for data prop
  interface PageData {
    blogPostUrl: string;
    slug: string;
    htmlContent: string | null;
    markdownContent: string | null;
    success: boolean;
    error?: string;
    [key: string]: any; // Allow for additional properties
  }

  export let data: PageData;
  let contentElement: HTMLElement;

  // Since we're using server-side rendering, data is available immediately
  // We can set loading based on whether we have data or not
  $: loading = !data;

  // Function to enhance content after it's rendered
  const enhanceContent = () => {
    if (!contentElement) return;

    // Handle image lazy loading if needed
    const images = contentElement.querySelectorAll("img");
    images.forEach((img) => {
      // Ensure images have proper loading attributes
      if (!img.hasAttribute("loading")) {
        img.setAttribute("loading", "lazy");
      }

      // Add error handling for images
      img.addEventListener("error", () => {
        console.warn(`Failed to load image: ${img.src}`);
      });
    });

    // Handle external links to open in new tab
    const links = contentElement.querySelectorAll('a[href^="http"]');
    links.forEach((link) => {
      if (!link.hasAttribute("target")) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      }
    });
  };

  // Enhance content when the contentElement is available
  $: if (contentElement && data?.success && data?.htmlContent) {
    enhanceContent();
  }

  // Copy functionality state
  let copyStatus: string = "";
  let copyTimeout: ReturnType<typeof setTimeout> | undefined;

  // Function to copy HTML content
  const copyAsHtml = async () => {
    if (!data.htmlContent) return;
    
    try {
      await navigator.clipboard.writeText(data.htmlContent);
      showCopyStatus("HTML copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy HTML:", error);
      showCopyStatus("Failed to copy HTML");
    }
  };

  // Function to copy Markdown content (now from server-side data)
  const copyAsMarkdown = async () => {
    if (!data.markdownContent) {
      showCopyStatus("Markdown content not available");
      return;
    }

    try {
      await navigator.clipboard.writeText(data.markdownContent);
      showCopyStatus("Markdown copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy Markdown:", error);
      showCopyStatus("Failed to copy Markdown");
    }
  };

  // Function to copy domain URL
  const copyDomainUrl = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      showCopyStatus("URL copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy URL:", error);
      showCopyStatus("Failed to copy URL");
    }
  };

  // Helper function to show copy status with auto-dismiss
  const showCopyStatus = (message: string) => {
    copyStatus = message;
    if (copyTimeout) clearTimeout(copyTimeout);
    copyTimeout = setTimeout(() => {
      copyStatus = "";
    }, 3000);
  };

</script>

<svelte:head>
  <title>Junedang | {data.slug}</title>
  <meta name="description" content="Blog post: {data.slug}" />
  <style>
    /* Blog post content styles */
    .blog-content {
      line-height: 1.7;
      color: #111;
    }

    .blog-content h1,
    .blog-content h2,
    .blog-content h3,
    .blog-content h4,
    .blog-content h5,
    .blog-content h6 {
      margin-top: 2rem;
      margin-bottom: 1rem;
      font-weight: 600;
      line-height: 1.25;
    }

    .blog-content h1 {
      font-size: 2.25rem;
    }
    .blog-content h2 {
      font-size: 1.875rem;
    }
    .blog-content h3 {
      font-size: 1.5rem;
    }
    .blog-content h4 {
      font-size: 1.25rem;
    }

    .blog-content p {
      margin-bottom: 1rem;
    }

    .blog-content img {
      max-width: 100%;
      height: auto;
      border-radius: 0.5rem;
      margin: 1rem 0;
    }

    .blog-content pre {
      background-color: #f8fafc;
      border-radius: 0.5rem;
      padding: 1rem;
      overflow-x: auto;
      margin: 1rem 0;
    }

    .blog-content code {
      background-color: #f8fafc;
      padding: 0.125rem 0.25rem;
      border-radius: 0.25rem;
      font-family: "Courier New", monospace;
    }

    .blog-content pre code {
      background-color: transparent;
      padding: 0;
    }

    .blog-content blockquote {
      border-left: 4px solid #e2e8f0;
      padding-left: 1rem;
      margin: 1rem 0;
      font-style: italic;
      color: #64748b;
    }

    .blog-content a {
      color: #111;
      text-decoration: underline;
    }

    .blog-content ul,
    .blog-content ol {
      margin: 1rem 0;
      padding-left: 1.5rem;
    }

    .blog-content li {
      margin-bottom: 0.5rem;
    }

    .blog-content table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
    }

    .blog-content th,
    .blog-content td {
      border: 1px solid #e2e8f0;
      padding: 0.5rem;
      text-align: left;
    }

    .blog-content th {
      background-color: #f8fafc;
      font-weight: 600;
    }
  </style>
</svelte:head>

<!-- Blog post content container -->
<Container>
  <div class="max-w-4xl mx-auto font-mono">
    <div class="border-2 border-black bg-white mb-8">
      <div class="border-b-2 border-black px-4 py-2 bg-white">
        <span class="text-black">SYSTEM: POST.EXE</span>
      </div>
      <div class="px-4 py-2 text-black">
        <span>$ cat /posts/{data.slug}.md</span>
      </div>
    </div>

    {#if loading}
      <PageLoading {loading} />
    {:else if !data.success}
      <div class="border-2 border-black bg-white">
        <div class="border-b-2 border-black px-4 py-2 bg-white">
          <span class="text-black">$ echo \"content not found\"</span>
        </div>
        <div class="p-4">
          <pre class="text-black text-sm leading-relaxed">{data.error ||
              "Unable to load blog post content"}

> RETURN TO /posts</pre>
          <div class="mt-4">
            <a
              href="/posts"
              class="inline-block text-black border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
              >> BACK TO POSTS</a
            >
          </div>
        </div>
      </div>
    {:else if data.htmlContent}
      <div class="border-2 border-black bg-white">
        <div
          class="border-b-2 border-black px-4 py-2 bg-white flex items-center justify-between gap-2"
        >
          <span class="text-black">$ render {data.slug}</span>
          <div class="flex items-center gap-2">
            {#if copyStatus}
              <span class="text-sm text-black">{copyStatus}</span>
            {/if}
            <Dropdown align="right" containerClass="relative inline-block">
              <div
                slot="trigger"
                class="flex items-center gap-1 text-black border-2 border-black px-3 py-1 hover:bg-black hover:text-white transition-colors cursor-pointer"
              >
                <span class="text-sm">Copy Page</span>
                <ChervonDown class="size-4 stroke-current" />
              </div>
              <div slot="default" let:close>
                <button
                  on:click={() => {
                    copyAsHtml();
                    close();
                  }}
                  class="cursor-pointer block w-full text-left px-4 py-2 text-sm text-black hover:bg-black hover:text-white transition-colors"
                >
                  Copy as HTML
                </button>
                <button
                  on:click={() => {
                    copyAsMarkdown();
                    close();
                  }}
                  disabled={!data.markdownContent}
                  class="cursor-pointer block w-full text-left px-4 py-2 text-sm text-black transition-colors border-t-2 border-black {data.markdownContent ? 'hover:bg-black hover:text-white' : 'opacity-50 cursor-not-allowed'}"
                >
                  Copy as Markdown
                  {#if !data.markdownContent}
                    <span class="text-xs">(unavailable)</span>
                  {/if}
                </button>
                <button
                  on:click={() => {
                    copyDomainUrl();
                    close();
                  }}
                  class="cursor-pointer block w-full text-left px-4 py-2 text-sm text-black hover:bg-black hover:text-white transition-colors border-t-2 border-black"
                >
                  Copy URL
                </button>
              </div>
            </Dropdown>
          </div>
        </div>
        <div class="p-4">
          <article class="blog-content max-w-none" bind:this={contentElement}>
            {@html DOMPurify.sanitize(data.htmlContent)}
          </article>
          <ShareButtons title={data.slug} className="mt-6" />
        </div>
      </div>
    {:else}
      <div class="border-2 border-black bg-white">
        <div class="border-b-2 border-black px-4 py-2 bg-white">
          <span class="text-black">$ echo \"no content available\"</span>
        </div>
        <div class="p-4">
          <pre
            class="text-black text-sm leading-relaxed">The blog post content is currently unavailable.</pre>
          <div class="mt-4">
            <a
              href="/posts"
              class="inline-block text-black border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
              >> BACK TO POSTS</a
            >
          </div>
        </div>
      </div>
    {/if}
  </div>
</Container>
