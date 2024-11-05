<script lang="ts">
  import type { Post } from "../../types/posts";
  import { constructArticleSlug } from "../../utils/string-helper";
  export let post: Post;

  const bgBlackColors = [
    "bg-gray-950",
    "bg-black",
    "bg-slate-950",
    "bg-zinc-950",
  ];

  /**
   * Generate random background color
   */
  function renderBgColor() {
    return bgBlackColors[Math.floor(Math.random() * bgBlackColors.length)];
  }
</script>

<a
  class={`${renderBgColor()} rounded block hover:shadow-sm overflow-hidden mb-5 min-h-96 text-white relative p-4 hover:bg-opacity-90`}
  href={constructArticleSlug(post.url)}
  title={post.description}
>
  <span class="absolute top-4 right-4 text-gray-200">
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
  <div class="flex-1 mt-8 text-ellipsis line-clamp-2 h-20 overflow-hidden">
    <h3>
      <p class="block text-3xl font-semibold text-gray-100">
        {post.title}
      </p>
    </h3>
  </div>
  <div class="mt-5">
    <button
      class="inline-flex items-center rounded-full bg-transparent px-4 py-2 font-semibold ring-w ring-inset ring-2 ring-gray-300 text-gray-300"
    >
      More... <svg
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
    </button>
  </div>
</a>
