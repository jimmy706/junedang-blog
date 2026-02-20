<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { theme, toggleTheme } from "$lib/stores/theme";
  import { formatUptime } from "$lib/utils/uptime";

  const startedAt = Date.now();
  let uptime = "00:00:00";
  let timer: ReturnType<typeof setInterval>;

  onMount(() => {
    uptime = formatUptime(startedAt);
    timer = setInterval(() => {
      uptime = formatUptime(startedAt);
    }, 1000);
  });

  onDestroy(() => {
    clearInterval(timer);
  });
</script>

<div class="border-b-3 border-ink bg-bg px-4 py-2 text-xs dark:border-accent-terminal dark:bg-bg-dark">
  <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 font-mono">
    <div class="flex flex-wrap items-center gap-4">
      <span>STATUS: <strong class="text-accent-terminal">ONLINE</strong></span>
      <span>NODE: VN-SG-01</span>
      <span>UPTIME: {uptime}</span>
      <span>THEME: {$theme.toUpperCase()}</span>
    </div>
    <button
      type="button"
      on:click={toggleTheme}
      class="focus-terminal border-2 border-ink px-3 py-1 text-xs terminal-hover dark:border-accent-terminal"
    >
      &gt; theme {$theme === "dark" ? "light" : "dark"}
    </button>
  </div>
</div>
