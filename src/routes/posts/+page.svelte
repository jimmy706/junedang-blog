<script lang="ts">
  import Container from "$lib/Container.svelte";
  import PostItem from "../../lib/post/PostItem.svelte";
  export let data;
  const { posts } = data;
</script>

<svelte:head>
  <title>Junedang | Articles</title>
  <meta name="description" content="Browse all blog posts from June Dang covering technology, programming, cloud computing, finance, and more." />
  <meta property="og:title" content="Articles | Junedang Blog" />
  <meta property="og:description" content="Browse all blog posts from June Dang covering technology, programming, cloud computing, finance, and more." />
  <meta property="og:image" content="/favicon.jpeg" />
  <meta property="og:url" content="https://junedang.com/posts" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Articles | Junedang Blog" />
  <meta name="twitter:description" content="Browse all blog posts from June Dang covering technology, programming, cloud computing, finance, and more." />
  <meta name="twitter:image" content="/favicon.jpeg" />
</svelte:head>
<Container>
  <div class="max-w-4xl mx-auto font-mono">
    <!-- Terminal Header -->
    <div class="border-2 border-black bg-white mb-8">
      <div class="border-b-2 border-black px-4 py-2 bg-white">
        <span class="text-black">SYSTEM: POSTS.EXE</span>
      </div>
      <div class="p-4">
        <pre class="text-black text-sm leading-relaxed">$ ls -la /posts
total {posts?.length || 0}
drwxr-xr-x	.
drwxr-xr-x	..
rw-r--r--	index.txt
</pre>
      </div>
    </div>

    <!-- Posts Listing Terminal -->
    <div class="border-2 border-black bg-white">
      <div class="border-b-2 border-black px-4 py-2 bg-white">
        <span class="text-black">$ cat index.txt</span>
      </div>
      <div class="p-4">
        <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
          {#each posts as post}
            <div>
              <PostItem {post} />
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</Container>
