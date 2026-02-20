<script lang="ts">
  import { page } from "$app/stores";

  const links = [
    { href: "/", label: "home" },
    { href: "/about", label: "about" },
    { href: "/contact", label: "contact" },
    { href: "/posts", label: "posts" }
  ];

  const isActive = (href: string, pathname: string): boolean => {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };
</script>

<nav class="border-b-3 border-ink bg-bg px-4 py-3 dark:border-accent-terminal dark:bg-bg-dark" aria-label="Primary">
  <div class="mx-auto flex max-w-6xl flex-wrap items-center gap-3 text-sm">
    <span class="font-pixel tracking-tight">C:\junedang&gt;</span>
    {#each links as link}
      <a
        href={link.href}
        class={`focus-terminal border-2 px-2 py-1 ${isActive(link.href, $page.url.pathname)
          ? "border-ink bg-ink text-ink-inverse dark:border-accent-terminal dark:bg-accent-terminal dark:text-ink"
          : "border-transparent terminal-hover"}`}
      >
        {link.label}
      </a>
    {/each}
  </div>
</nav>
