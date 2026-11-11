<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  export let align: "left" | "right" = "right";
  export let containerClass: string = "relative inline-block text-left";
  export let panelClass: string = "absolute z-[95] mt-2 min-w-40 border-2 border-ink !bg-bg dark:border-accent-terminal dark:!bg-bg-dark shadow-sm isolate";
  export let triggerClass: string = ""; // allow parent to style trigger wrapper

  let open = false;
  let trigger: HTMLButtonElement;
  let rootEl: HTMLElement;

  const onDocClick = (e: MouseEvent) => {
    if (!rootEl?.contains(e.target as Node)) {
      open = false;
    }
  };

  const onKey = (e: KeyboardEvent) => {
    if (open && e.key === "Escape") close();
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
  const close = () => {
    open = false;
    trigger.focus();
  };
</script>

<div bind:this={rootEl} class={containerClass} style={open ? "z-index: 90;" : undefined}>
  <button
    type="button"
    bind:this={trigger}
    class={triggerClass}
    aria-expanded={open}
    on:click|stopPropagation={toggle}
  >
    <slot name="trigger" />
  </button>

  {#if open}
    <div class={`menu-panel ${panelClass} ${align === "right" ? "right-0" : "left-0"}`} style="opacity: 1;">
      <slot {close} />
    </div>
  {/if}
</div>

<style>
  .menu-panel {
    background-color: #f7f3e8 !important;
  }

  :global(.dark) .menu-panel {
    background-color: #121515 !important;
  }
</style>
