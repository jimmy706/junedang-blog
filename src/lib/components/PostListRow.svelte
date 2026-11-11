<script lang="ts">
  import type { Post } from "../../types/posts";
  import { constructArticleSlug } from "../../utils/string-helper";

  export let post: Post;

  import { parsePostDate } from "$lib/utils/post-date";

  $: date = parsePostDate(post.date);
</script>

<a href={constructArticleSlug(post.url)}
  class="terminal-hover block border-b border-ink px-3 py-3 dark:border-accent-terminal">
  <span class="block wrap-anywhere font-semibold">{post.title}</span>
  {#if date || post.tags?.length}
    <div class="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
      {#if date}<time datetime={date.toISOString()}>{date.toLocaleDateString()}</time>{/if}
      {#each post.tags?.slice(0, 3) ?? [] as tag}
        <span class="wrap-anywhere">[#{tag}]</span>
      {/each}
    </div>
  {/if}
</a>
