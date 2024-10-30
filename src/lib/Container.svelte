<script>
  export let padding = "p-4"; // Default padding
  export let margin = "mx-auto"; // Default margin
</script>

<div class="w-full min-h-svh">
  <div class={`container mx-auto ${padding} ${margin}`}>
    <slot></slot>
  </div>
</div>
