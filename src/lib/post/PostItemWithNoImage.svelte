<script lang="ts">
  import type { Post } from "../../types/posts";
  import { constructArticleSlug } from "../../utils/string-helper";
  export let post: Post;
</script>

<a
  class="group block border-2 border-ink bg-bg dark:border-accent-terminal dark:bg-bg-dark overflow-hidden mb-5 relative p-4 hover:bg-ink hover:text-ink-inverse dark:hover:bg-accent-terminal dark:hover:text-ink transition-colors"
  href={constructArticleSlug(post.url)}
  title={post.description}
>
  <span class="absolute top-4 right-4">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-8"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  </span>
  <div class="mt-8 mb-4 pr-12">
    <h3 class="text-3xl font-semibold line-clamp-3">
      {post.title}
    </h3>
    {#if post.description}
      <p class="mt-4 text-base opacity-90 line-clamp-3">
        {post.description}
      </p>
    {/if}
  </div>
  <div class="mt-4 flex items-center justify-between">
    {#if post.tags && post.tags.length > 0}
      <div class="flex flex-wrap gap-2">
        {#each post.tags.slice(0, 3) as tag}
          <span class="text-xs font-mono px-2 py-1 border-2 border-current">
            #{tag}
          </span>
        {/each}
      </div>
    {/if}
    <span class="text-xs font-mono border-2 border-current px-2 py-1 ml-auto">
      {#if post.date}
        {new Date(post.date).toLocaleDateString()}
      {:else}
        {new Date().toLocaleDateString()}
      {/if}
    </span>
  </div>
</a>
