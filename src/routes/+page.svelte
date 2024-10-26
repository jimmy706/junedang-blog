<script lang="ts">
  import PostItem from "$lib/PostItem.svelte";
  export let data;
  const { posts } = data;
</script>

<div class="grid grid-cols-1">
  {#each posts as post}
    <div>
      <PostItem {post} />
    </div>
  {/each}
</div>
