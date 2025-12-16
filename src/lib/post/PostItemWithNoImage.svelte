<script lang="ts">
  import type { Post } from "../../types/posts";
  import { constructArticleSlug } from "../../utils/string-helper";
  import Tags from "./Tags.svelte";
  export let post: Post;
</script>

<a
  class="group block border-2 border-black bg-white overflow-hidden mb-5 relative p-4 hover:bg-black hover:text-white transition-colors"
  href={constructArticleSlug(post.url)}
  title={post.description}
>
  <span class="absolute top-4 right-4">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-8"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  </span>
  <div class="flex-1 mt-8 text-ellipsis md:line-clamp-2 h-auto md:h-20 overflow-hidden">
    <h3>
      <p class="block text-3xl font-semibold">
        {post.title}
      </p>
    </h3>
  </div>
  {#if post.tags && post.tags.length > 0}
    <div class="mt-4">
      <Tags tags={post.tags} limit={3} />
    </div>
  {/if}
  <div class="mt-5">
    <span
      class="inline-flex items-center border-2 border-black px-3 py-1 font-semibold"
    >
      > READ <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-4 ml-2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
        />
      </svg>
    </span>
  </div>
</a>
