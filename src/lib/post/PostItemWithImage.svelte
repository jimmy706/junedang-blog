<script lang="ts">
  import type { Post } from "../../types/posts";
  import { constructArticleSlug } from "../../utils/string-helper";
  export let post: Post;
</script>

<a
  class="block border-2 border-black bg-white overflow-hidden mb-5 hover:bg-black hover:text-white transition-colors"
  href={constructArticleSlug(post.url)}
  title={post.description}
>
  <div class="w-full max-h-52 overflow-hidden border-b-2 border-black">
    <img src={post.image} alt={post.title} class="w-full h-52 object-cover" />
  </div>
  <div class="p-4 flex-1">
    <h3 class="block text-2xl font-semibold">
      {post.title}
    </h3>

    {#if post.description}
      <p class="mt-4 text-ellipsis overflow-hidden line-clamp-2">
        {post.description}
      </p>
    {/if}

    <small class="mt-2 text-sm opacity-70">
      {#if post.date}
        {new Date(post.date).toLocaleDateString()}
      {:else}
        {new Date().toLocaleDateString()}
      {/if}
    </small>
  </div>
</a>
