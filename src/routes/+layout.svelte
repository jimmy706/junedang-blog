<script>
  import Container from "$lib/Container.svelte";
  import Header from "$lib/Header.svelte";
  import "../app.css";
  
  import Maintance from "$lib/Maintance.svelte";
</script>

{#if Boolean(import.meta.env.VITE_MAINTENANCE_MODE)}
  <Maintance />
{:else}
  <Header />
  <Container>
    <slot />
  </Container>
{/if}
