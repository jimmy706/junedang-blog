<script lang="ts">
  import type { Post } from "../../types/posts";
  import { constructArticleSlug } from "../../utils/string-helper";

  export let post: Post;

  $: tags = post.tags?.slice(0, 3) ?? [];
</script>

<a
  href={constructArticleSlug(post.url)}
  class="focus-terminal block border-3 border-ink bg-bg shadow-pixel transition-colors hover:bg-ink hover:text-ink-inverse dark:border-accent-terminal dark:bg-bg-dark dark:shadow-pixel-dark dark:hover:bg-accent-terminal dark:hover:text-ink"
>
  <div class="flex items-center justify-between border-b-3 border-ink px-3 py-2 text-xs dark:border-accent-terminal">
    <span class="font-pixel">{post.title ?? "untitled"}</span>
    <span aria-hidden="true">[ _ ] [ □ ] [ X ]</span>
  </div>
  <div class="grid gap-3 p-3 md:grid-cols-[120px_1fr]">
    {#if post.image}
      <img src={post.image} alt={post.title} class="h-24 w-full border-2 border-current object-cover" />
    {:else}
      <div class="flex h-24 items-center justify-center border-2 border-current text-xs">NO PREVIEW</div>
    {/if}
    <div>
      <p class="text-sm font-semibold">{post.title}</p>
      {#if post.description}
        <p class="mt-2 line-clamp-2 text-xs">{post.description}</p>
      {/if}
      <div class="mt-3 flex flex-wrap gap-2 text-[11px]">
        {#each tags as tag}
          <span class="border border-current px-1 py-0.5">#{tag}</span>
        {/each}
      </div>
    </div>
  </div>
</a>
