<script lang="ts">
  export let title = "panel";
  export let controls = false;
</script>

<section class="border-3 border-ink bg-bg shadow-pixel dark:border-accent-terminal dark:bg-bg-dark dark:shadow-pixel-dark">
  <header class="flex items-center justify-between border-b-3 border-ink px-4 py-2 text-xs tracking-tight dark:border-accent-terminal">
    <p class="font-pixel uppercase">{title}</p>
    {#if controls}
      <p class="space-x-2" aria-hidden="true">
        <span>[ _ ]</span><span>[ □ ]</span><span>[ X ]</span>
      </p>
    {/if}
  </header>
  <div class="p-4">
    <slot />
  </div>
</section>
