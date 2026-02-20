<script lang="ts">
  import { page } from '$app/stores';
  
  $: error = $page.error;
  $: status = $page.status;
  
  // Check if it's a 404 error or API error
  $: is404 = status === 404;
  $: isApiError = status >= 500 || (error?.message && error.message.includes('API'));
</script>

<svelte:head>
  <title>Junedang | {is404 ? 'Page Not Found' : 'Something Went Wrong'}</title>
  <meta name="description" content="Error page for Junedang blog" />
</svelte:head>

<div class="flex items-center justify-center min-h-screen">
  <div class="text-center p-6 bg-bg dark:bg-bg-dark rounded-lg shadow-md text-ink dark:text-ink-inverse">
    <div class="flex justify-center mb-4">
      <img
        class="max-w-xs"
        src="/image/maintenance.webp"
        alt="Error illustration"
      />
    </div>
    
    {#if is404}
      <!-- 404 Error -->
      <h1 class="text-4xl font-bold text-red-600 mb-4">Oops! This Page Went on Vacation 🏖️</h1>
      <p class="text-lg mb-2">
        It seems like this page packed its bags and left without telling us! 
      </p>
      <p class="text-md text-ink-soft dark:text-ink-inverse/70 mb-4">
        Maybe it's chilling on a beach somewhere, or perhaps it never existed in the first place... 🤔
      </p>
      <small class="text-ink-soft dark:text-ink-inverse/60">
        Don't worry though, the other pages are still here and working hard! 
        Try going back to the <a href="/" class="text-accent-terminal hover:underline">homepage</a> 🏠
      </small>
    {:else if isApiError}
      <!-- API Error -->
      <h1 class="text-4xl font-bold text-red-600 mb-4">Houston, We Have a Problem! 🚀</h1>
      <p class="text-lg mb-2">
        Our servers are having a bit of a moment right now...
      </p>
      <p class="text-md text-ink-soft dark:text-ink-inverse/70 mb-4">
        They're probably just taking a coffee break or debugging some cosmic code! ☕
      </p>
      <small class="text-ink-soft dark:text-ink-inverse/60">
        We'll be back up and running in just a few minutes. Thanks for your patience! 🛠️
      </small>
    {:else}
      <!-- Generic Error -->
      <h1 class="text-4xl font-bold text-red-600 mb-4">Something Unexpected Happened! 🤷‍♂️</h1>
      <p class="text-lg mb-2">
        Well, this is awkward... Something went wrong, but we're not quite sure what!
      </p>
      <p class="text-md text-ink-soft dark:text-ink-inverse/70 mb-4">
        Our digital hamsters are working overtime to figure this out! 🐹
      </p>
      <small class="text-ink-soft dark:text-ink-inverse/60">
        Try refreshing the page or head back to the <a href="/" class="text-accent-terminal hover:underline">homepage</a>
      </small>
    {/if}
    
    {#if error?.message}
      <div class="mt-6 p-3 bg-ink/5 dark:bg-ink-inverse/5 rounded text-sm text-ink-soft dark:text-ink-inverse/70">
        <details>
          <summary class="cursor-pointer font-medium">Technical Details</summary>
          <p class="mt-2 text-left">{error.message}</p>
        </details>
      </div>
    {/if}
  </div>
</div>