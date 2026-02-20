<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { env } from "$env/dynamic/public";
  import FloatingButton from "$lib/FloatingButton.svelte";
  import Maintance from "$lib/Maintance.svelte";
  import SystemBar from "$lib/components/SystemBar.svelte";
  import TerminalNav from "$lib/components/TerminalNav.svelte";
  import { initTheme } from "$lib/stores/theme";

  const { PUBLIC_MAINTENANCE_MODE } = env;
  let bootLine = "$ boot ui-shell --ok";

  $: bootLine = `$ route ${$page.url.pathname} --ready`;

  onMount(() => {
    initTheme();
  });
</script>

{#if PUBLIC_MAINTENANCE_MODE == "true"}
  <Maintance />
{:else}
  <div class="min-h-screen bg-bg text-ink dark:bg-bg-dark dark:text-ink-inverse">
    <SystemBar />
    <TerminalNav />
    <p class="mx-auto max-w-6xl px-4 py-3 text-xs" aria-live="polite">{bootLine}</p>
    <main class="pb-8">
      <slot />
    </main>
  </div>
  <FloatingButton />
{/if}
