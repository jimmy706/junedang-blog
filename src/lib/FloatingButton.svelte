<script>
  import { onMount } from "svelte";

  let isVisible = false;

  const checkScroll = () => {
    isVisible = window.scrollY > 200;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  onMount(() => {
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  });
</script>

<button
  on:click={scrollToTop}
  class="fixed bottom-8 right-8 p-3 bg-sky-800 text-white rounded-full shadow-lg transition-opacity duration-300 ease-in-out animate-bounce"
  class:opacity-0={!isVisible}
  class:opacity-100={isVisible}
  aria-label="Go to top"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="size-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m4.5 18.75 7.5-7.5 7.5 7.5"
    />
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m4.5 12.75 7.5-7.5 7.5 7.5"
    />
  </svg>
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
