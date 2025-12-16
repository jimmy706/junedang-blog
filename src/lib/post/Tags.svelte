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
          class="inline-block border-2 border-black px-2 py-1 text-xs font-mono bg-white group-hover:bg-black group-hover:text-white hover:bg-black hover:text-white transition-colors cursor-pointer"
        >
          #{tag}
        </a>
      {:else}
        <span class="inline-block border-2 border-black px-2 py-1 text-xs font-mono bg-white group-hover:bg-black group-hover:text-white transition-colors">
          #{tag}
        </span>
      {/if}
    {/each}
  </div>
{/if}
