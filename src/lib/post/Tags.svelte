<script lang="ts">
  export let tags: string[] | undefined;
  export let limit: number | undefined = undefined;
  export let clickable: boolean = true;
  
  $: displayTags = limit && tags ? tags.slice(0, limit) : tags || [];
</script>

{#if displayTags.length > 0}
  <div class="flex flex-wrap gap-2">
    {#each displayTags as tag}
      {#if clickable}
        <a
          href="/posts?tag={encodeURIComponent(tag)}"
          class="inline-block border-2 border-ink dark:border-accent-terminal px-2 py-1 text-xs font-mono bg-bg dark:bg-bg-dark group-hover:bg-ink group-hover:text-ink-inverse dark:group-hover:bg-accent-terminal dark:group-hover:text-ink hover:bg-ink hover:text-ink-inverse dark:hover:bg-accent-terminal dark:hover:text-ink transition-colors cursor-pointer"
        >
          #{tag}
        </a>
      {:else}
        <span class="inline-block border-2 border-ink dark:border-accent-terminal px-2 py-1 text-xs font-mono bg-bg dark:bg-bg-dark group-hover:bg-ink group-hover:text-ink-inverse dark:group-hover:bg-accent-terminal dark:group-hover:text-ink transition-colors">
          #{tag}
        </span>
      {/if}
    {/each}
  </div>
{/if}
