<script lang="ts">
  import { onMount } from "svelte";
  import Container from "$lib/Container.svelte";
  import TerminalPanel from "$lib/components/TerminalPanel.svelte";
  import PostListRow from "$lib/components/PostListRow.svelte";
  import PostWindowCard from "$lib/components/PostWindowCard.svelte";
  import { initViewMode, setViewMode, viewMode } from "$lib/stores/viewMode";

  export let data;

  $: posts = data.posts;
  $: currentTag = data.currentTag;

  onMount(() => {
    initViewMode();
  });
</script>

<svelte:head>
  <title>Junedang | Articles</title>
</svelte:head>

<Container>
  <div class="mx-auto max-w-6xl space-y-6">
    <TerminalPanel title="$ ls -la /posts">
      <p class="text-sm">total: {posts?.length || 0} {currentTag ? `(tag #${currentTag})` : ""}</p>
      <div class="mt-4 flex flex-wrap gap-2 text-xs">
        <button
          type="button"
          class={`focus-terminal border-2 px-3 py-1 ${$viewMode === "list"
            ? "border-ink bg-ink text-ink-inverse dark:border-accent-terminal dark:bg-accent-terminal dark:text-ink"
            : "border-ink terminal-hover dark:border-accent-terminal"}`}
          on:click={() => setViewMode("list")}
        >
          &gt; view list
        </button>
        <button
          type="button"
          class={`focus-terminal border-2 px-3 py-1 ${$viewMode === "windows"
            ? "border-ink bg-ink text-ink-inverse dark:border-accent-terminal dark:bg-accent-terminal dark:text-ink"
            : "border-ink terminal-hover dark:border-accent-terminal"}`}
          on:click={() => setViewMode("windows")}
        >
          &gt; view windows
        </button>
        {#if currentTag}
          <a href="/posts" class="focus-terminal border-2 border-ink px-3 py-1 terminal-hover dark:border-accent-terminal">&gt; clear tag</a>
        {/if}
      </div>
    </TerminalPanel>

    {#if $viewMode === "list"}
      <TerminalPanel title="$ cat files.list">
        <div class="border-2 border-ink dark:border-accent-terminal">
          {#each posts as post}
            <PostListRow {post} />
          {/each}
        </div>
      </TerminalPanel>
    {:else}
      <TerminalPanel title="$ open windows.mode" controls={true}>
        <div class="grid gap-5 md:grid-cols-2">
          {#each posts as post}
            <PostWindowCard {post} />
          {/each}
        </div>
      </TerminalPanel>
    {/if}
  </div>
</Container>
