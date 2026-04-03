<script lang="ts">
  import type { Post } from "../../types/posts";
  import { constructArticleSlug } from "../../utils/string-helper";

  export let post: Post;

  const formatYyyyMmDd = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const parsePostDate = (value?: string): Date | null => {
    if (!value) {
      return null;
    }

    const candidates = [
      value,
      value.replace(" ", "T"),
      value.replace(/\s\+0000$/, "Z").replace(" ", "T")
    ];

    for (const candidate of candidates) {
      const parsed = new Date(candidate);
      if (!Number.isNaN(parsed.getTime())) {
        return parsed;
      }
    }

    return null;
  };

  const toDate = (value?: string): string => {
    const parsed = parsePostDate(value);
    return formatYyyyMmDd(parsed ?? new Date());
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
