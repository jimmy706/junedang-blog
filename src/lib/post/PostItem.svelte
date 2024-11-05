<script lang="ts">
  import type { Post } from "../../types/posts";
  import PostItemWithImage from "./PostItemWithImage.svelte";
  import PostItemWithNoImage from "./PostItemWithNoImage.svelte";
  export let post: Post;
  const havingImage = !!post.image;
</script>

{#if havingImage}
  <PostItemWithImage {post} />
{:else}
  <PostItemWithNoImage {post} />
{/if}
