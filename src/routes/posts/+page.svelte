<script lang="ts">
  import { onMount } from "svelte";
  import Container from "$lib/Container.svelte";
  import TerminalPanel from "$lib/components/TerminalPanel.svelte";
  import PostListRow from "$lib/components/PostListRow.svelte";
  import PostItem from "$lib/post/PostItem.svelte";
  import { initViewMode, setViewMode, viewMode, type ViewMode } from "$lib/stores/viewMode";

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
        <select
          class="focus-terminal border-2 border-ink bg-transparent px-3 py-1 text-xs terminal-hover dark:border-accent-terminal dark:text-accent-terminal"
          value={$viewMode}
          on:change={(e) => setViewMode(e.currentTarget.value as ViewMode)}
        >
          <option value="list">&gt; view list</option>
          <option value="windows">&gt; view windows</option>
        </select>
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
        <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {#each posts as post}
            <PostItem {post} />
          {/each}
        </div>
      </TerminalPanel>
    {/if}
  </div>
</Container>
