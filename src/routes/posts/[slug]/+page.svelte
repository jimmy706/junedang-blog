<script lang="ts">
  import PageLoading from "$lib/PageLoading.svelte";
  import { onMount } from "svelte";
  import Container from "$lib/Container.svelte";
  import DOMPurify from "isomorphic-dompurify";
  import ShareButtons from "$lib/post/ShareButtons.svelte";
  import Dropdown from "$lib/Dropdown.svelte";
  import ChervonDown from "../../../components/icons/ChervonDown.svelte";
  import Tags from "$lib/post/Tags.svelte";
  import ArrowUturnLeft from "../../../components/icons/ArrowUturnLeft.svelte";

  // Load mermaid and highlight.js only in the browser to avoid SSR "document is not defined"
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

    // Initialize syntax highlighting and enhance content
    try {
      const hljs = await import("highlight.js");
      // Apply syntax highlighting to all code blocks
      if (contentElement) {
        const codeBlocks = contentElement.querySelectorAll("pre code");
        codeBlocks.forEach((block) => {
          hljs.default.highlightElement(block as HTMLElement);
        });
        
        // Enhance content after highlighting
        enhanceContent();
      }
    } catch (e) {
      console.warn("Highlight.js failed to initialize", e);
      // Still enhance content even if highlighting fails
      if (contentElement) {
        enhanceContent();
      }
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
    post?: {
      title?: string;
      url?: string;
      date?: string;
      categories?: string;
      tags?: string;
      layout?: string;
      description?: string;
      image?: string;
    } | null;
    [key: string]: any; // Allow for additional properties
  }

  export let data: PageData;
  let contentElement: HTMLElement;

  // Since we're using server-side rendering, data is available immediately
  // We can set loading based on whether we have data or not
  $: loading = !data;

  // Function to copy code from code block
  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      showCopyStatus("Code copied!");
    } catch (error) {
      console.error("Failed to copy code:", error);
      showCopyStatus("Failed to copy code");
    }
  };

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

    // Add copy buttons to code blocks
    const codeBlocks = contentElement.querySelectorAll("pre");
    codeBlocks.forEach((pre) => {
      // Skip if already has a copy button, if it's a triple pre tag, or if it's a mermaid diagram
      if (pre.querySelector(".copy-code-button") || pre.parentElement?.tagName === "PRE" || pre.classList.contains("mermaid")) {
        return;
      }

      // Create wrapper for positioning
      const wrapper = document.createElement("div");
      wrapper.style.position = "relative";
      
      // Wrap the pre element
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      // Create copy button
      const copyButton = document.createElement("button");
      copyButton.className = "copy-code-button";
      copyButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
        </svg>
      `;
      copyButton.setAttribute("aria-label", "Copy code");
      
      // Get code content - use textContent which is already safe from XSS
      // textContent automatically handles escaping and returns plain text
      const codeElement = pre.querySelector("code");
      const codeText = codeElement?.textContent || pre.textContent || "";
      
      copyButton.addEventListener("click", () => {
        copyCode(codeText);
      });

      wrapper.appendChild(copyButton);
    });
  };

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
  <title>Junedang | {data.post?.title || data.slug}</title>
  <meta name="description" content={data.post?.description || `Blog post: ${data.slug}`} />
  <meta property="og:title" content={data.post?.title || data.slug} />
  <meta property="og:description" content={data.post?.description || `Blog post: ${data.slug}`} />
  <meta property="og:image" content={data.post?.image || '/favicon.jpeg'} />
  <meta property="og:url" content={`https://junedang.com/posts/${data.slug}`} />
  <meta property="og:type" content="article" />
  {#if data.post?.date}
    <meta property="article:published_time" content={data.post.date} />
  {/if}
  {#if data.post?.tags}
    <meta property="article:tag" content={data.post.tags} />
  {/if}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={data.post?.title || data.slug} />
  <meta name="twitter:description" content={data.post?.description || `Blog post: ${data.slug}`} />
  <meta name="twitter:image" content={data.post?.image || '/favicon.jpeg'} />
</svelte:head>

<style>
  /* Blog post content styles */
  :global(.blog-content) {
    line-height: 1.7;
    color: #111;
  }

  :global(.blog-content h1),
  :global(.blog-content h2),
  :global(.blog-content h3),
  :global(.blog-content h4),
  :global(.blog-content h5),
  :global(.blog-content h6) {
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-weight: 600;
    line-height: 1.25;
  }

  :global(.blog-content h1) {
    font-size: 2.25rem;
  }
  :global(.blog-content h2) {
    font-size: 1.875rem;
  }
  :global(.blog-content h3) {
    font-size: 1.5rem;
  }
  :global(.blog-content h4) {
    font-size: 1.25rem;
  }

  :global(.blog-content p) {
    margin-bottom: 1rem;
  }

  :global(.blog-content img) {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    margin: 1rem 0;
  }

  :global(.blog-content pre) {
    background-color: #f8fafc;
    border-radius: 0.5rem;
    padding: 1rem;
    overflow-x: auto;
    margin: 1rem 0;
  }

  :global(.blog-content code) {
    background-color: #f8fafc;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-family: "Courier New", monospace;
  }

  :global(.blog-content pre code) {
    background-color: transparent;
    padding: 0;
  }

  :global(.blog-content blockquote) {
    border-left: 4px solid #e2e8f0;
    padding-left: 1rem;
    margin: 1rem 0;
    font-style: italic;
    color: #64748b;
  }

  :global(.blog-content a) {
    color: #111;
    text-decoration: underline;
  }

  :global(.blog-content ul),
  :global(.blog-content ol) {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  :global(.blog-content ul) {
    list-style-type: disc;
  }
  :global(.blog-content ol) {
    list-style-type: decimal;
  }
  :global(.blog-content li) {
    margin-bottom: 0.5rem;
  }

  :global(.blog-content table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }

  :global(.blog-content th),
  :global(.blog-content td) {
    border: 1px solid #e2e8f0;
    padding: 0.5rem;
    text-align: left;
  }

  :global(.blog-content th) {
    background-color: #f8fafc;
    font-weight: 600;
  }

  /* Copy code button styles */
  :global(.copy-code-button) {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background-color: #fff;
    border: 2px solid #000;
    border-radius: 0.25rem;
    padding: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }

  :global(.copy-code-button:hover) {
    background-color: #000;
    color: #fff;
  }

  :global(.copy-code-button svg) {
    width: 1.25rem;
    height: 1.25rem;
  }

  :global(.copy-code-button:hover svg) {
    stroke: #fff;
  }
</style>

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
              class="inline-flex items-center gap-1 text-black border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
              ><ArrowUturnLeft /> BACK TO POSTS</a
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
          {#if data.post?.tags}
            {@const tagsArray = typeof data.post.tags === 'string' 
              ? data.post.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
              : Array.isArray(data.post.tags) 
                ? data.post.tags 
                : []}
            {#if tagsArray.length > 0}
              <div class="mt-6 pt-6 border-t-2 border-black">
                <h4 class="text-sm font-semibold mb-3 text-black">TAGS:</h4>
                <Tags tags={tagsArray} />
              </div>
            {/if}
          {/if}
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
              ><ArrowUturnLeft class="size-4" /> BACK TO POSTS</a
            >
          </div>
        </div>
      </div>
    {/if}
  </div>
</Container>
