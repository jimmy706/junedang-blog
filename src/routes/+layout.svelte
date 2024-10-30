<script>
  import Container from "$lib/Container.svelte";
  import Header from "$lib/Header.svelte";
  import "../app.css";
  
  import Maintance from "$lib/Maintance.svelte";
  import { env } from '$env/dynamic/public';
  import Footer from "$lib/Footer.svelte";
  const { PUBLIC_MAINTENANCE_MODE } = env;
</script>
{#if PUBLIC_MAINTENANCE_MODE == "true"}
  <Maintance />
{:else}
  <Header />
  <Container>
    <slot />
  </Container>
  <Footer/>
{/if}
