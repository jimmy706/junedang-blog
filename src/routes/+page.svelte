<script lang="ts">
  import Container from "$lib/Container.svelte";
  import PostItem from "$lib/post/PostItem.svelte";
  import SocialLinks from "$lib/SocialLinks.svelte";

  export let data;
  const latestPosts = data.posts
    .filter((post) => post.date)
    .sort(
      (a, b) =>
        new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
    )
    .slice(0, 2);
</script>

<svelte:head>
  <title>Junedang | Home</title>
  <meta name="description" content="Blog about technology, programming, cloud computing, finance, gaming, and software engineering by June Dang." />
  <meta property="og:title" content="Junedang | Home" />
  <meta property="og:description" content="Blog about technology, programming, cloud computing, finance, gaming, and software engineering by June Dang." />
  <meta property="og:image" content="/favicon.jpeg" />
  <meta property="og:url" content="https://junedang.com" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Junedang | Home" />
  <meta name="twitter:description" content="Blog about technology, programming, cloud computing, finance, gaming, and software engineering by June Dang." />
  <meta name="twitter:image" content="/favicon.jpeg" />
</svelte:head>
<Container>
    <div class="max-w-4xl mx-auto font-mono">
      <!-- Terminal Header -->
      <div class="border-2 border-black bg-white mb-8">
        <div class="border-b-2 border-black px-4 py-2 bg-white">
          <span class="text-black">SYSTEM: HOME.EXE</span>
        </div>
        <div class="p-6">
          <pre class="text-black text-sm mb-4 leading-tight">
   ╭───────────────────────────╮
   │        JUNEDANG.COM       │
   ╰───────────────────────────╯
          </pre>
          <div class="text-black">
            <p class="mb-2">USER: JUNE_DANG</p>
            <p class="mb-2">ROLE: SOFTWARE_ENGINEER</p>
            <p class="mb-4">LOCATION: VIETNAM</p>
          </div>
        </div>
      </div>

      <!-- Two-column layout (desktop) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Bio + Connect Terminal (Left) -->
      <div class="border-2 border-black bg-white md:col-span-1">
        <div class="border-b-2 border-black px-4 py-2 bg-white">
          <span class="text-black">$ cat bio.txt</span>
        </div>
        <div class="p-4">
          <pre class="text-black text-sm leading-relaxed whitespace-pre-wrap">Hello World! I'm a Vietnamese software engineer
  working mainly in cloud and finance. Besides coding,
  I enjoy playing video games and writing.

  Welcome to my blog!</pre>
          <div class="mt-4 pt-4 border-t-2 border-black">
            <p class="text-black mb-2">CONNECT:</p>
            <SocialLinks
              showTitle={false}
              containerClass="flex flex-wrap gap-4 socials text-black"
              linkClass="block text-black hover:bg-black hover:text-white px-2 py-1 border border-black transition-colors"
            />
          </div>
        </div>
      </div>

      <!-- Latest Articles Terminal -->
      <div class="border-2 border-black bg-white md:col-span-2">
        <div class="border-b-2 border-black px-4 py-2 bg-white flex items-center justify-between">
          <span class="text-black">$ ls -la /posts/latest</span>
          <a href="/posts" class="hidden md:inline-block text-black border-2 border-black px-2 py-1 hover:bg-black hover:text-white transition-colors">> VIEW ALL</a>
        </div>
        <div class="p-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            {#each latestPosts as post}
              <div>
                <PostItem {post} />
              </div>
            {/each}
          </div>
          <div class="mt-4 md:hidden">
            <a href="/posts" class="inline-block text-black border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors">> VIEW ALL</a>
          </div>
        </div>
      </div>
      </div>
    </div>
  </Container>
