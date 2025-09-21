<script>
  import Header from "$lib/Header.svelte";
  import "../app.css";
  
  import { env } from '$env/dynamic/public';
  import FloatingButton from "$lib/FloatingButton.svelte";
  import Footer from "$lib/Footer.svelte";
  import Maintance from "$lib/Maintance.svelte";
  const { PUBLIC_MAINTENANCE_MODE } = env;
</script>
{#if PUBLIC_MAINTENANCE_MODE == "true"}
  <Maintance />
{:else}
  <Header />
    <slot />
  <FloatingButton/>
  <Footer/>
{/if}
