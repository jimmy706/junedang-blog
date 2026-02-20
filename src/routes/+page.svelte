<script lang="ts">
  import { onMount } from "svelte";
  import Container from "$lib/Container.svelte";
  import SocialLinks from "$lib/SocialLinks.svelte";
  import PostItem from "$lib/post/PostItem.svelte";
  import TerminalPanel from "$lib/components/TerminalPanel.svelte";

  export let data;

  let introAnimated = false;

  const latestPosts = data.posts
    .filter((post) => post.date)
    .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
    .slice(0, 2);

  onMount(() => {
    const timer = window.setTimeout(() => {
      introAnimated = true;
    }, 1200);

    return () => window.clearTimeout(timer);
  });
</script>

<svelte:head>
  <title>Junedang | Home</title>
</svelte:head>

<Container>
  <div class="mx-auto grid max-w-6xl gap-6 md:grid-cols-[1.1fr_1fr]">
    <TerminalPanel title="$ cat profile.sys">
      <div class="space-y-4 text-sm">
        <div>
          <p class={!introAnimated ? "typewriter-once" : ""}>$ whoami</p>
          <p class="mt-1 pl-4 text-accent-terminal">June_Dang</p>
        </div>
        <div>
          <p>$ role</p>
          <p class="mt-1 pl-4">Software Engineer</p>
        </div>
        <div>
          <p>$ location</p>
          <p class="mt-1 pl-4">Vietnam</p>
        </div>
      </div>
      <div class="mt-6 border-t-2 border-ink pt-4 dark:border-accent-terminal">
        <p class="mb-2 cursor-block">$ links ps</p>
        <SocialLinks
          showTitle={false}
          containerClass="flex flex-wrap gap-2"
          linkClass="focus-terminal border-2 border-ink px-2 py-1 text-xs terminal-hover dark:border-accent-terminal"
        />
      </div>
    </TerminalPanel>

    <TerminalPanel title="$ ls /posts/latest" controls={true}>
      <div class="space-y-4">
        {#each latestPosts as post}
          <PostItem {post} />
        {/each}
        <a href="/posts" class="focus-terminal inline-block border-2 border-ink px-3 py-2 text-xs terminal-hover dark:border-accent-terminal">
          &gt; open posts
        </a>
      </div>
    </TerminalPanel>
  </div>
</Container>
