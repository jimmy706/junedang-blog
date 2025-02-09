<script lang="ts">
  import type { Post } from "../../types/posts";
  import { constructArticleSlug } from "../../utils/string-helper";
  export let post: Post;
</script>

<a
  class="bg-gray-50 rounded block hover:shadow-sm overflow-hidden mb-5 min-h-96"
  href={constructArticleSlug(post.url)}
  title={post.description}
>
  <div class="mr-4 block w-full max-h-52 overflow-hidden">
    <img src={post.image} alt={post.title} class="w-full h-full object-cover" />
  </div>
  <div class="p-4 flex-1">
    <h3 class="block text-2xl font-semibold text-black">
      {post.title}
    </h3>

    {#if post.description}
      <p class="text-gray-600 mt-4 text-ellipsis overflow-hidden line-clamp-2">
        {post.description}
      </p>
    {/if}

    <small class="text-gray-800 mt-2 text-sm">
      {#if post.date}
        {new Date(post.date).toLocaleDateString()}
      {:else}
        {new Date().toLocaleDateString()}
      {/if}
    </small>
  </div>
</a>
