<script lang="ts">
  import type { Post } from "../../types/posts";
  import PostItemWithImage from "./PostItemWithImage.svelte";
  export let post: Post;
  
  // Use placeholder image if post doesn't have an image
  const postWithImage = {
    ...post,
    image: post.image || '/image/placeholder.png'
  };
</script>

<PostItemWithImage post={postWithImage} />
