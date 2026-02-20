<script lang="ts">
  import { onMount } from "svelte";
  import LinkedIn from "../../components/icons/LinkedIn.svelte";
  import DocumentDuplicate from "../../components/icons/DocumentDuplicate.svelte";
  import Share from "../../components/icons/Share.svelte";

  export let url: string | undefined = undefined;
  export let title: string | undefined = undefined;
  export let tags: string[] = [];
  export let className: string = "mt-8";

  let shareUrl = "";
  let copied = false;
  let canNativeShare = false;

  onMount(() => {
    // Use provided url or fallback to current location when in browser
    if (!url && typeof window !== "undefined") {
      shareUrl = window.location.href;
    } else if (url) {
      shareUrl = url;
    }

    // Check if native sharing is supported
    if (typeof navigator !== "undefined" && "share" in navigator) {
      canNativeShare = true;
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

  const nativeShare = async () => {
    try {
      if (typeof navigator !== "undefined" && "share" in navigator && shareUrl) {
        await navigator.share({
          title: title || "Check out this post",
          url: shareUrl,
        });
      }
    } catch (e) {
      // User cancelled or sharing failed, fallback to copy
      await copyToClipboard();
    }
  };
</script>

<div class={className}>
  <div class="border-2 border-ink bg-bg dark:border-accent-terminal dark:bg-bg-dark">
    <div class="border-b-2 border-ink px-4 py-2 bg-bg dark:border-accent-terminal dark:bg-bg-dark">
      <span class="text-ink dark:text-ink-inverse">$ share this post</span>
    </div>
    <div class="p-4">
      <div class="flex flex-wrap items-center gap-3">
        {#if canNativeShare}
          <button
            class="cursor-pointer inline-flex items-center gap-2 text-ink dark:text-ink-inverse border-2 border-ink dark:border-accent-terminal px-3 py-2 hover:bg-ink hover:text-ink-inverse dark:hover:bg-accent-terminal dark:hover:text-ink"
            on:click={nativeShare}
            type="button"
          >
            <Share class="size-5" />
            <span>Share</span>
          </button>
        {/if}
        <button
          class="cursor-pointer inline-flex items-center gap-2 text-ink dark:text-ink-inverse border-2 border-ink dark:border-accent-terminal px-3 py-2 hover:bg-ink hover:text-ink-inverse dark:hover:bg-accent-terminal dark:hover:text-ink"
          on:click={copyToClipboard}
          type="button"
          aria-live="polite"
        >
          <DocumentDuplicate class="size-5" />
          <span>{copied ? "Copied!" : "Copy link"}</span>
        </button>
      </div>
    </div>
  </div>
</div>


