<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  export let align: "left" | "right" = "right";
  export let containerClass: string = "relative inline-block text-left";
  export let panelClass: string = "absolute z-20 mt-2 min-w-40 border-2 border-black bg-white shadow-sm";
  export let triggerClass: string = ""; // allow parent to style trigger wrapper

  let open = false;
  let rootEl: HTMLElement;

  const onDocClick = (e: MouseEvent) => {
    if (!rootEl?.contains(e.target as Node)) {
      open = false;
    }
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") open = false;
  };

  onMount(() => {
    if (typeof document !== "undefined") {
      document.addEventListener("click", onDocClick);
      document.addEventListener("keydown", onKey);
    }
  });

  onDestroy(() => {
    if (typeof document !== "undefined") {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    }
  });

  const toggle = () => (open = !open);
  const close = () => (open = false);
</script>

<div bind:this={rootEl} class={containerClass}>
  <div
    class={triggerClass}
    role="button"
    tabindex="0"
    on:click|stopPropagation={toggle}
    on:keydown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    }}
  >
    <slot name="trigger" />
  </div>

  {#if open}
    <div class={`${panelClass} ${align === "right" ? "right-0" : "left-0"}`} role="menu" aria-orientation="vertical" tabindex="-1">
      <slot {close} />
    </div>
  {/if}
</div>
