<script lang="ts">
  import PageLoading from "$lib/PageLoading.svelte";
  import { onMount } from "svelte";
  import Container from "$lib/Container.svelte";
  import { sanitize } from "isomorphic-dompurify";
  import ShareButtons from "$lib/post/ShareButtons.svelte";
  import Dropdown from "$lib/Dropdown.svelte";
  import ChervonDown from "../../../components/icons/ChervonDown.svelte";
  import Tags from "$lib/post/Tags.svelte";
  import ArrowUturnLeft from "../../../components/icons/ArrowUturnLeft.svelte";
  import Modal from "$lib/Modal.svelte";

  // Load mermaid and highlight.js only in the browser to avoid SSR "document is not defined"
  onMount(async () => {
    try {
      const { default: mermaid } = await import("mermaid");
      mermaid.initialize({
        startOnLoad: true,
        theme: "default",
      });

      if (contentElement) {
        const mermaidDiagrams = contentElement.querySelectorAll(".mermaid");
        mermaidDiagrams.forEach((diagram) => {
          const element = diagram as HTMLElement;
          if (!element.dataset.mermaidCode) {
            element.dataset.mermaidCode = element.textContent?.trim() || "";
          }
        });
      }

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
        normalizeCodeBlocksForHighlighting();

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
  let expandedMermaidSvg = "";

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

    // Wrap tables for horizontal scrolling
    const tables = contentElement.querySelectorAll("table");
    tables.forEach((table) => {
      // Create wrapper if not already wrapped
      if (table.parentElement?.classList.contains("table-wrapper")) return;
      
      const wrapper = document.createElement("div");
      wrapper.className = "table-wrapper";
      wrapper.style.overflowX = "auto";
      wrapper.style.maxWidth = "100%";
      wrapper.style.marginBottom = "1rem";
      
      table.parentNode?.insertBefore(wrapper, table);
      wrapper.appendChild(table);
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
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
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

    // Add actions for Mermaid diagrams
    const mermaidDiagrams = contentElement.querySelectorAll(".mermaid");
    mermaidDiagrams.forEach((mermaidDiagram) => {
      // Prevent duplicate wrappers/buttons when content enhancement reruns
      if (mermaidDiagram.parentElement?.classList.contains("mermaid-diagram-container")) {
        return;
      }

      const diagramElement = mermaidDiagram as HTMLElement;
      const mermaidSourceCode = diagramElement.dataset.mermaidCode || "";

      // Create wrapper around Mermaid diagram for controls
      const wrapper = document.createElement("div");
      wrapper.className = "mermaid-diagram-container";

      diagramElement.parentNode?.insertBefore(wrapper, diagramElement);
      wrapper.appendChild(diagramElement);

      const controls = document.createElement("div");
      controls.className = "mermaid-controls";

      const copyMermaidButton = document.createElement("button");
      copyMermaidButton.className = "copy-code-button";
      copyMermaidButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
        </svg>
      `;
      copyMermaidButton.setAttribute("aria-label", "Copy Mermaid diagram source");
      copyMermaidButton.disabled = !mermaidSourceCode;

      copyMermaidButton.addEventListener("click", () => {
        copyCode(mermaidSourceCode);
      });

      const expandMermaidButton = document.createElement("button");
      expandMermaidButton.className = "copy-code-button mermaid-expand-button";
      expandMermaidButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
        </svg>
      `;
      expandMermaidButton.setAttribute("aria-label", "View Mermaid diagram in larger size");

      expandMermaidButton.addEventListener("click", () => {
        const svg = diagramElement.querySelector("svg");
        if (!svg) {
          showCopyStatus("Unable to expand Mermaid diagram");
          return;
        }

        expandedMermaidSvg = svg.outerHTML;
      });

      controls.appendChild(copyMermaidButton);
      controls.appendChild(expandMermaidButton);
      wrapper.appendChild(controls);
    });
  };

  const normalizeCodeBlocksForHighlighting = () => {
    if (!contentElement) return;

    const codeBlocks = contentElement.querySelectorAll("pre code");
    codeBlocks.forEach((block) => {
      // Normalize third-party code blocks to plain text before highlight.js runs.
      // This avoids unescaped HTML warnings and prevents raw HTML from being rendered in code blocks.
      block.textContent = block.textContent || "";
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

  const closeExpandedMermaid = () => {
    expandedMermaidSvg = "";
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
    color: #171717;
  }

  :global(.dark .blog-content) {
    color: #f7f3e8;
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
    border: 2px solid #e2e8f0;
    border-radius: 0.25rem;
    padding: 1rem;
    overflow-x: auto;
    margin: 1rem 0;
    max-width: 100%;
    color: #171717;
  }

  :global(.dark .blog-content pre) {
    background-color: #1e2424;
    border-color: #334155;
    color: #f7f3e8;
  }

  :global(.blog-content code) {
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-family: "Courier New", monospace;
    color: #171717;
    font-size: 0.9em;
  }

  :global(.dark .blog-content code) {
    background-color: #1e2424;
    border-color: #334155;
    color: #00b56a;
  }

  :global(.blog-content pre code) {
    background-color: transparent;
    border: none;
    padding: 0;
    color: inherit;
  }

  :global(.blog-content blockquote) {
    border-left: 4px solid #e2e8f0;
    padding-left: 1rem;
    margin: 1rem 0;
    font-style: italic;
    color: #64748b;
  }

  :global(.dark .blog-content blockquote) {
    border-left-color: #00b56a;
    color: #94a3b8;
  }

  :global(.blog-content a) {
    color: #171717;
    text-decoration: underline;
  }

  :global(.dark .blog-content a) {
    color: #00b56a;
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

  :global(.dark .blog-content th),
  :global(.dark .blog-content td) {
    border-color: #334155;
  }

  :global(.blog-content th) {
    background-color: #f8fafc;
    font-weight: 600;
  }

  :global(.dark .blog-content th) {
    background-color: #1e2424;
  }

  /* Dark mode syntax highlighting adjustments */
  :global(.dark .blog-content pre code .hljs-comment),
  :global(.dark .blog-content pre code .hljs-quote) {
    color: #94a3b8;
  }

  :global(.dark .blog-content pre code .hljs-keyword),
  :global(.dark .blog-content pre code .hljs-selector-tag),
  :global(.dark .blog-content pre code .hljs-type) {
    color: #ef5da8;
  }

  :global(.dark .blog-content pre code .hljs-string),
  :global(.dark .blog-content pre code .hljs-attr),
  :global(.dark .blog-content pre code .hljs-addition) {
    color: #00b56a;
  }

  :global(.dark .blog-content pre code .hljs-number),
  :global(.dark .blog-content pre code .hljs-literal) {
    color: #fbbf24;
  }

  :global(.dark .blog-content pre code .hljs-title),
  :global(.dark .blog-content pre code .hljs-function) {
    color: #60a5fa;
  }

  :global(.dark .blog-content pre code .hljs-variable),
  :global(.dark .blog-content pre code .hljs-name) {
    color: #f7f3e8;
  }

  /* Copy code button styles */
  :global(.copy-code-button) {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background-color: #f7f3e8;
    border: 2px solid #171717;
    border-radius: 0.25rem;
    padding: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }

  :global(.dark .copy-code-button) {
    background-color: #121515;
    border-color: #00b56a;
    color: #f7f3e8;
  }

  :global(.copy-code-button:hover) {
    background-color: #171717;
    color: #f7f3e8;
  }

  :global(.dark .copy-code-button:hover) {
    background-color: #00b56a;
    color: #171717;
  }

  :global(.copy-code-button svg) {
    width: 1.25rem;
    height: 1.25rem;
  }

  :global(.copy-code-button:hover svg) {
    stroke: #f7f3e8;
  }

  :global(.dark .copy-code-button:hover svg) {
    stroke: #171717;
  }

  :global(.mermaid-diagram-container) {
    position: relative;
    border: 2px solid #e2e8f0;
    border-radius: 0.5rem;
    padding: 3.5rem 1rem 1rem;
    margin: 1rem 0;
    overflow: auto;
    background: #ffffff;
  }

  :global(.dark .mermaid-diagram-container) {
    border-color: #334155;
    background: #121515;
  }

  :global(.mermaid-controls) {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: flex;
    gap: 0.5rem;
  }

  :global(.mermaid-controls .copy-code-button) {
    position: static;
    padding: 0.375rem 0.5rem;
    font-size: 0.75rem;
  }

  :global(.mermaid-controls .copy-code-button:disabled) {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .mermaid-modal-diagram {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-width: max-content;
  }
</style>

<!-- Blog post content container -->
<Container>
  <div class="max-w-4xl mx-auto font-mono">
    <div class="border-2 border-ink bg-bg dark:border-accent-terminal dark:bg-bg-dark mb-8">
      <div class="border-b-2 border-ink px-4 py-2 bg-bg dark:border-accent-terminal dark:bg-bg-dark">
        <span class="text-ink dark:text-ink-inverse">SYSTEM: POST.EXE</span>
      </div>
      <div class="px-4 py-2 text-ink dark:text-ink-inverse">
        <span>$ cat /posts/{data.slug}.md</span>
      </div>
    </div>

    {#if loading}
      <PageLoading {loading} />
    {:else if !data.success}
      <div class="border-2 border-ink bg-bg dark:border-accent-terminal dark:bg-bg-dark">
        <div class="border-b-2 border-ink px-4 py-2 bg-bg dark:border-accent-terminal dark:bg-bg-dark">
          <span class="text-ink dark:text-ink-inverse">$ echo \"content not found\"</span>
        </div>
        <div class="p-4">
          <pre class="text-ink dark:text-ink-inverse text-sm leading-relaxed">{data.error ||
              "Unable to load blog post content"}

> RETURN TO /posts</pre>
          <div class="mt-4">
            <a
              href="/posts"
              class="inline-flex items-center gap-1 text-ink dark:text-ink-inverse border-2 border-ink dark:border-accent-terminal px-4 py-2 hover:bg-ink hover:text-ink-inverse dark:hover:bg-accent-terminal dark:hover:text-ink transition-colors"
              ><ArrowUturnLeft /> BACK TO POSTS</a
            >
          </div>
        </div>
      </div>
    {:else if data.htmlContent}
      <div class="border-2 border-ink bg-bg dark:border-accent-terminal dark:bg-bg-dark">
        <div
          class="border-b-2 border-ink px-4 py-2 bg-bg dark:border-accent-terminal dark:bg-bg-dark flex items-center justify-between gap-2"
        >
          <span class="text-ink dark:text-ink-inverse">$ render {data.slug}</span>
          <div class="flex items-center gap-2">
            {#if copyStatus}
              <span class="text-sm text-ink dark:text-ink-inverse">{copyStatus}</span>
            {/if}
            <Dropdown align="right" containerClass="relative inline-block">
              <div
                slot="trigger"
                class="flex items-center gap-1 text-ink dark:text-ink-inverse border-2 border-ink dark:border-accent-terminal px-3 py-1 hover:bg-ink hover:text-ink-inverse dark:hover:bg-accent-terminal dark:hover:text-ink transition-colors cursor-pointer"
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
                  class="cursor-pointer block w-full text-left px-4 py-2 text-sm text-ink dark:text-ink-inverse hover:bg-ink hover:text-ink-inverse dark:hover:bg-accent-terminal dark:hover:text-ink transition-colors"
                >
                  Copy as HTML
                </button>
                <button
                  on:click={() => {
                    copyAsMarkdown();
                    close();
                  }}
                  disabled={!data.markdownContent}
                  class="cursor-pointer block w-full text-left px-4 py-2 text-sm text-ink dark:text-ink-inverse transition-colors border-t-2 border-ink dark:border-accent-terminal {data.markdownContent ? 'hover:bg-ink hover:text-ink-inverse dark:hover:bg-accent-terminal dark:hover:text-ink' : 'opacity-50 cursor-not-allowed'}"
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
                  class="cursor-pointer block w-full text-left px-4 py-2 text-sm text-ink dark:text-ink-inverse hover:bg-ink hover:text-ink-inverse dark:hover:bg-accent-terminal dark:hover:text-ink transition-colors border-t-2 border-ink dark:border-accent-terminal"
                >
                  Copy URL
                </button>
              </div>
            </Dropdown>
          </div>
        </div>
        <div class="p-4">
          <article class="blog-content max-w-none" bind:this={contentElement}>
            {@html sanitize(data.htmlContent)}
          </article>
          {#if data.post?.tags}
            {@const tagsArray = typeof data.post.tags === 'string' 
              ? data.post.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
              : Array.isArray(data.post.tags) 
                ? data.post.tags 
                : []}
            {#if tagsArray.length > 0}
              <div class="mt-6 pt-6 border-t-2 border-ink dark:border-accent-terminal">
                <h4 class="text-sm font-semibold mb-3 text-ink dark:text-ink-inverse">TAGS:</h4>
                <Tags tags={tagsArray} />
              </div>
            {/if}
          {/if}
          <ShareButtons title={data.slug} className="mt-6" />
        </div>
      </div>
    {:else}
      <div class="border-2 border-ink bg-bg dark:border-accent-terminal dark:bg-bg-dark">
        <div class="border-b-2 border-ink px-4 py-2 bg-bg dark:border-accent-terminal dark:bg-bg-dark">
          <span class="text-ink dark:text-ink-inverse">$ echo \"no content available\"</span>
        </div>
        <div class="p-4">
          <pre
            class="text-ink dark:text-ink-inverse text-sm leading-relaxed">The blog post content is currently unavailable.</pre>
          <div class="mt-4">
            <a
              href="/posts"
              class="inline-block text-ink dark:text-ink-inverse border-2 border-ink dark:border-accent-terminal px-4 py-2 hover:bg-ink hover:text-ink-inverse dark:hover:bg-accent-terminal dark:hover:text-ink transition-colors"
              ><ArrowUturnLeft class="size-4" /> BACK TO POSTS</a
            >
          </div>
        </div>
      </div>
    {/if}
  </div>
</Container>

<Modal
  open={!!expandedMermaidSvg}
  ariaLabel="Expanded Mermaid diagram"
  on:close={closeExpandedMermaid}
>
  <svelte:fragment slot="header">
    <span class="text-sm font-mono text-ink dark:text-ink-inverse">DIAGRAM.SVG</span>
  </svelte:fragment>
  <div class="mermaid-modal-diagram">
    {@html sanitize(expandedMermaidSvg, {
      USE_PROFILES: { svg: true, svgFilters: true },
      ADD_TAGS: ['foreignObject'],
      ADD_ATTR: ['dominant-baseline', 'text-anchor', 'requiredFeatures'],
    })}
  </div>
</Modal>
