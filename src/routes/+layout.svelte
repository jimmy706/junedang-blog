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
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
  <FloatingButton />
{/if}
