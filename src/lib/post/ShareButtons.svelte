<script lang="ts">
  import { onMount } from "svelte";
  import LinkedIn from "../../components/icons/LinkedIn.svelte";

  export let url: string | undefined = undefined;
  export let title: string | undefined = undefined;
  export let tags: string[] = [];
  export let className: string = "mt-8";

  let shareUrl = "";
  let copied = false;

  onMount(() => {
    // Use provided url or fallback to current location when in browser
    if (!url && typeof window !== "undefined") {
      shareUrl = window.location.href;
    } else if (url) {
      shareUrl = url;
    }
  });

  const encodedUrl = () => encodeURIComponent(shareUrl);
  const encodedTitle = () => encodeURIComponent(title ?? "");
  const encodedTags = () => encodeURIComponent(tags.join(","));

  const shareLinks = () => ({
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl()}&text=${encodedTitle()}${
      tags.length ? `&hashtags=${encodedTags()}` : ""
    }`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl()}`,
    linkedin: `https://www.linkedin.com/shareArticle?url=${encodedUrl()}`,
  });

  const copyToClipboard = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && shareUrl) {
        await navigator.clipboard.writeText(shareUrl);
        copied = true;
        setTimeout(() => (copied = false), 2000);
      }
    } catch (e) {
      // noop
    }
  };
</script>

<div class={className}>
  <div class="border-2 border-black bg-white">
    <div class="border-b-2 border-black px-4 py-2 bg-white">
      <span class="text-black">$ share this post</span>
    </div>
    <div class="p-4">
      <div class="flex flex-wrap items-center gap-3">
        <a
          class="inline-flex items-center gap-2 text-black border-2 border-black px-3 py-2 hover:bg-black hover:text-white transition-colors"
          href={shareLinks().twitter}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Twitter/X"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
            <path d="M18.244 2.25h3.308l-7.227 8.26L22.5 21.75h-6.531l-5.12-6.698-5.858 6.698H1.683l7.73-8.83L1.5 2.25h6.72l4.61 6.124 5.414-6.124zM17.1 19.695h1.833L7.005 4.206H5.04L17.1 19.695z"/>
          </svg>
          <span>Twitter</span>
        </a>

        <a
          class="inline-flex items-center gap-2 text-black border-2 border-black px-3 py-2 hover:bg-black hover:text-white transition-colors"
          href={shareLinks().facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
            <path d="M22 12.06C22 6.48 17.52 2 11.94 2 6.48 2 2 6.48 2 12.06c0 5 3.66 9.14 8.44 9.94v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34v7.03C18.34 21.2 22 17.06 22 12.06z"/>
          </svg>
          <span>Facebook</span>
        </a>

        <a
          class="inline-flex items-center gap-2 text-black border-2 border-black px-3 py-2 hover:bg-black hover:text-white transition-colors"
          href={shareLinks().linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
        >
          <LinkedIn/>
          <span>LinkedIn</span>
        </a>

        <button
          class="cursor-pointer inline-flex items-center gap-2 text-black border-2 border-black px-3 py-2 hover:bg-black hover:text-white transition-colors"
          on:click={copyToClipboard}
          type="button"
          aria-live="polite"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
            <path d="M16 1H4c-1.1 0-2 .9-2 2v12h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
          </svg>
          <span>{copied ? "Copied!" : "Copy link"}</span>
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  /* Ensure icons inherit currentColor */
  svg { display: block; }
</style>
