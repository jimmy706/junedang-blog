<script>
  export let padding = "lg:px-4 lg:py-6 px-4 py-4"; // Default padding
  export let margin = "mx-auto"; // Default margin
</script>

<div class="w-full">
  <div class={`container mx-auto ${padding} ${margin}`}>
    <slot></slot>
  </div>
</div>


<style>
  .container {
    min-height: calc(100vh - 181px);
  }
</style>