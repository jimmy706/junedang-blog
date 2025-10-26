<script lang="ts">
  import PageLoading from "$lib/PageLoading.svelte";
  import { onMount } from "svelte";
  import Container from "$lib/Container.svelte";
  import mermaid from "mermaid";

  onMount(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "default",
    });
   mermaid.run();
  });

  // Add proper type definition for data prop
  interface PageData {
    blogPostUrl: string;
    slug: string;
    sanitizedContent: string | null;
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
  $: if (contentElement && data?.success && data?.sanitizedContent) {
    enhanceContent();
  }
</script>

<svelte:head>
  <title>Junedang | {data.slug}</title>
  <meta name="description" content="Blog post: {data.slug}" />
  <style>
    /* Blog post content styles */
    .blog-content {
      line-height: 1.7;
      color: #334155;
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
      color: #0ea5e9;
      text-decoration: underline;
    }

    .blog-content a:hover {
      color: #0284c7;
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
  {#if loading}
    <PageLoading {loading} />
  {:else if !data.success}
    <div class="text-center py-8">
      <h1 class="text-2xl font-bold text-gray-700 mb-4">Content Not Found</h1>
      <p class="text-gray-600 mb-4">
        {data.error || "Unable to load blog post content"}
      </p>
      <a href="/posts" class="text-sky-600 hover:text-sky-700 underline">
        ← Back to Posts
      </a>
    </div>
  {:else if data.sanitizedContent}
    <article
      class="blog-content prose prose-slate max-w-none"
      bind:this={contentElement}
    >
      {@html data.sanitizedContent}
    </article>
  {:else}
    <div class="text-center py-8">
      <h1 class="text-2xl font-bold text-gray-700 mb-4">
        No Content Available
      </h1>
      <p class="text-gray-600 mb-4">
        The blog post content is currently unavailable.
      </p>
      <a href="/posts" class="text-sky-600 hover:text-sky-700 underline">
        ← Back to Posts
      </a>
    </div>
  {/if}
</Container>
