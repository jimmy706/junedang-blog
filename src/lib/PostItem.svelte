<script lang="ts">
  import type { Post } from "../types/posts";

  export let post: Post;
</script>

<div
  class="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-md overflow-hidden flex mb-5"
>
  {#if post.image}
    <div class="mr-4 inline-block w-[160px] h-[106px] lg:w-[260px] lg:h-[160px]">
      <img
        src={post.image}
        alt={post.title}
        class="w-full h-full object-cover"
      />
    </div>
  {/if}
  <div class="p-4 flex-1">
    <h3>
      {#if post.url}
        <a
          href={post.url}
          class="block text-2xl font-semibold text-black hover:underline cursor-pointer font-normal"
        >
          {post.title}
        </a>
      {:else}
        <p class="block text-2xl font-semibold text-black">
          {post.title}
        </p>
      {/if}
    </h3>
    {#if post.date}
      <p class="text-gray-600 text-sm mt-2">
        {new Date(post.date).toLocaleDateString()}
      </p>
    {/if}
    {#if post.description}
      <p class="text-gray-700 mt-4 text-ellipsis overflow-hidden line-clamp-2">
        {post.description}
      </p>
    {/if}
  </div>
</div>
