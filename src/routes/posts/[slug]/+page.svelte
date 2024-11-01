<script lang="ts">
  import PageLoading from "$lib/PageLoading.svelte";
  import iframeResizer from "@iframe-resizer/parent";
  import { onMount } from "svelte";

  export let data;
  let loading = true;
  onMount(() => {
    iframeResizer({ waitForLoad: false, license: "GPLv3" }, "#post-iframe");
  });
</script>

<div class="flex w-full h-full">
  <PageLoading {loading} />
  <iframe
    id="post-iframe"
    class={`w-full h-full ${loading ? "hidden" : ""}`}
    src={data.blogPostUrl}
    title={data.slug}
    on:load={() => (loading = false)}
  ></iframe>
</div>
