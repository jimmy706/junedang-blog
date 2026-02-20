<script lang="ts">
  import { onMount } from "svelte";

  let isVisible = false;

  const getScrollY = () =>
    window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;

  const checkScroll = () => {
    isVisible = getScrollY() > 200;
  };

  const nativeSmoothSupported =
    typeof document !== "undefined" && "scrollBehavior" in document.documentElement.style;

  const smoothScrollToTop = () => {
    if (nativeSmoothSupported) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Fallback for browsers that don't support smooth behavior
    const start = getScrollY();
    const duration = 400;
    const startTime = performance.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const y = Math.ceil(start * (1 - easeOutCubic(progress)));
      window.scrollTo(0, y);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  onMount(() => {
    // Set initial visibility state and listen for scroll in a passive way
    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  });
</script>

<button
  on:click={smoothScrollToTop}
  class="cursor-pointer fixed bottom-6 right-6 z-40 font-mono text-sm tracking-tight leading-none px-3 py-2 border-2 border-ink bg-bg text-ink shadow-pixel transition-all duration-150 ease-out hover:bg-ink hover:text-ink-inverse hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_#171717] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0_0_#171717] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bg dark:border-accent-terminal dark:bg-bg-dark dark:text-ink-inverse dark:shadow-pixel-dark dark:hover:bg-accent-terminal dark:hover:text-ink dark:hover:shadow-[6px_6px_0_0_#00b56a] dark:active:shadow-[2px_2px_0_0_#00b56a] dark:focus-visible:ring-accent-terminal dark:focus-visible:ring-offset-bg-dark"
  class:opacity-0={!isVisible}
  class:opacity-100={isVisible}
  class:pointer-events-none={!isVisible}
  aria-label="Scroll to top"
>
  <span aria-hidden="true" class="mr-1">^</span>
  TOP
</button>

<style>
  button {
    opacity: 0;
    visibility: hidden;
  }
  .opacity-100 {
    opacity: 1;
    visibility: visible;
  }
</style>
