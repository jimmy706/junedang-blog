<script lang="ts">
  import Container from "$lib/Container.svelte";
  import PostItem from "../../lib/post/PostItem.svelte";
  export let data;
  const { posts } = data;
</script>

<svelte:head>
  <title>Junedang | Articles</title>
</svelte:head>
<Container>
  <div class="max-w-4xl mx-auto">
    <div class="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {#each posts as post}
      <div class="">
        <PostItem {post} />
      </div>
    {/each}
    </div>
  </div>
</Container>
