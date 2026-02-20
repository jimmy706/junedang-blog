<script lang="ts">
  import GitHub from "../components/icons/GitHub.svelte";
  import LinkedIn from "../components/icons/LinkedIn.svelte";
  import LeetCode from "../components/icons/LeetCode.svelte";
  export let showTitle: boolean = true;
  export let title: string = "Connect With Me";
  export let containerClass: string = "p-6 bg-bg dark:bg-bg-dark shadow-sm rounded-sm";
  export let titleClass: string = "text-3xl font-bold text-ink dark:text-ink-inverse mb-6 text-center";
  export let linksContainerClass: string = "flex justify-center socials text-ink dark:text-ink-inverse px-2 py-4 gap-x-1";
  // Ensure icon color switches to white on hover; use currentColor in SVGs below
  export let linkClass: string = "block p-4 rounded-full transition-colors text-ink dark:text-ink-inverse hover:text-ink-inverse hover:bg-ink dark:hover:bg-accent-terminal dark:hover:text-ink";
</script>

<div class={containerClass}>
  {#if showTitle}
    <h2 class={titleClass}>
      {title}
    </h2>
  {/if}
  <div class={linksContainerClass}>
    <a
      href="https://github.com/jimmy706"
      target="_blank"
      class={linkClass}
      title="GitHub"
      aria-label="Visit my GitHub profile"
    >
      <GitHub />
    </a>

    <a
      href="https://www.linkedin.com/in/%C4%91%E1%BA%B7ng-d%C5%A9ng-843588163/"
      target="_blank"
      class={linkClass}
      title="LinkedIn"
      aria-label="Visit my LinkedIn profile"
    >
      <LinkedIn />
    </a>

    <a
      href="https://leetcode.com/u/jimmy706/"
      target="_blank"
      class={linkClass}
      title="LeetCode"
      aria-label="Visit my LeetCode profile"
    >
      <LeetCode />
    </a>
  </div>
</div>