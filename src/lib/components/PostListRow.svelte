<script lang="ts">
  import type { Post } from "../../types/posts";
  import { constructArticleSlug } from "../../utils/string-helper";

  export let post: Post;

  const toDate = (value?: string): string => {
    if (!value) {
      return new Date().toISOString().slice(0, 10);
    }

    return new Date(value).toISOString().slice(0, 10);
  };

  const kbSize = (text: string): string => {
    const size = Math.max(8, Math.ceil(text.length / 70));
    return `${size}KB`;
  };

  $: title = post.title ?? "untitled";
  $: slug = `${constructArticleSlug(post.url).split("/").pop() ?? "entry"}.md`;
  $: tags = post.tags ?? [];
</script>

<a
  href={constructArticleSlug(post.url)}
  class="focus-terminal terminal-hover block border-b border-ink px-3 py-3 text-sm dark:border-accent-terminal"
>
  <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
    <span>-rw-r--r--</span>
    <span>{toDate(post.date)}</span>
    <span>{kbSize(`${title} ${post.description ?? ""}`)}</span>
    <span class="font-semibold">{slug}</span>
    {#if tags.length > 0}
      <span class="text-xs">
        {#each tags.slice(0, 3) as tag}
          [#{tag}]
        {/each}
      </span>
    {/if}
  </div>
</a>
