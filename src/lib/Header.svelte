<script lang="ts">
  import { page } from "$app/stores";

  let smMenuOpen = false;

  // Reactive statement to close mobile menu when route changes
  $: if ($page.url.pathname) {
    smMenuOpen = false;
  }
  const mdMenuClass =
    "text-sm leading-6 text-ink border-2 border-ink px-3 py-1 hover:bg-ink hover:text-ink-inverse dark:border-accent-terminal dark:text-ink-inverse dark:hover:bg-accent-terminal dark:hover:text-ink transition-colors mdMenuItem";
  const smMenuClass =
    "-mx-3 block px-3 py-2 text-base leading-7 text-ink border-2 border-ink hover:bg-ink hover:text-ink-inverse dark:border-accent-terminal dark:text-ink-inverse dark:hover:bg-accent-terminal dark:hover:text-ink transition-colors smMenuItem";

  const menuItems = [
    {
      name: "Home",
      href: "/",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>`,
    },
    {
      name: "About",
      href: "/about",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>`,
    },
    {
      name: "Contact",
      href: "/contact",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.32 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
</svg>`,
    },
    {
      name: "Articles",
      href: "/posts",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
</svg>`,
    },
  ];
</script>

<header class="bg-bg font-mono border-2 border-ink dark:bg-bg-dark dark:border-accent-terminal">
  <nav
    class="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
    aria-label="Global"
  >
    <div class="flex lg:flex-1">
      <a href="/" class="-m-1.5 p-1.5">
        <span class="sr-only">Junedang</span>
        <img class="h-12 w-auto" src="/favicon.jpeg" alt="Home" />
      </a>
    </div>
    <div class="flex lg:hidden">
      <button
        type="button"
        class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-ink dark:text-ink-inverse"
        title="Open main menu"
        on:click={() => (smMenuOpen = true)}
      >
        <span class="sr-only">Open main menu</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>
    <div class="hidden lg:flex lg:gap-x-5">
      <div class="relative hidden">
        <button
          type="button"
          class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
          aria-expanded="false"
        >
          Product
          <svg
            class="h-5 w-5 flex-none text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fill-rule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <!--
            'Product' flyout menu, show/hide based on flyout menu state.
  
            Entering: "transition ease-out duration-200"
              From: "opacity-0 translate-y-1"
              To: "opacity-100 translate-y-0"
            Leaving: "transition ease-in duration-150"
              From: "opacity-100 translate-y-0"
              To: "opacity-0 translate-y-1"
          -->
        <div
          class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 hidden"
        >
          <div class="p-4">
            <div
              class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
            >
              <div
                class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
              >
                <svg
                  class="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                  />
                </svg>
              </div>
              <div class="flex-auto">
                <button
                  type="button"
                  class="block font-semibold text-gray-900"
                >
                  Analytics
                  <span class="absolute inset-0"></span>
                </button>
                <p class="mt-1 text-gray-600">
                  Get a better understanding of your traffic
                </p>
              </div>
            </div>
            <div
              class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
            >
              <div
                class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
              >
                <svg
                  class="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"
                  />
                </svg>
              </div>
              <div class="flex-auto">
                <button
                  type="button"
                  class="block font-semibold text-gray-900"
                >
                  Engagement
                  <span class="absolute inset-0"></span>
                </button>
                <p class="mt-1 text-gray-600">
                  Speak directly to your customers
                </p>
              </div>
            </div>
            <div
              class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
            >
              <div
                class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
              >
                <svg
                  class="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33"
                  />
                </svg>
              </div>
              <div class="flex-auto">
                <button
                  type="button"
                  class="block font-semibold text-gray-900"
                >
                  Security
                  <span class="absolute inset-0"></span>
                </button>
                <p class="mt-1 text-gray-600">
                  Your customers’ data will be safe and secure
                </p>
              </div>
            </div>
            <div
              class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
            >
              <div
                class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
              >
                <svg
                  class="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </div>
              <div class="flex-auto">
                <button
                  type="button"
                  class="block font-semibold text-gray-900"
                >
                  Integrations
                  <span class="absolute inset-0"></span>
                </button>
                <p class="mt-1 text-gray-600">Connect with third-party tools</p>
              </div>
            </div>
            <div
              class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
            >
              <div
                class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
              >
                <svg
                  class="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </div>
              <div class="flex-auto">
                <button
                  type="button"
                  class="block font-semibold text-gray-900"
                >
                  Automations
                  <span class="absolute inset-0"></span>
                </button>
                <p class="mt-1 text-gray-600">
                  Build strategic funnels that will convert
                </p>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
            <button
              type="button"
              class="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
            >
              <svg
                class="h-5 w-5 flex-none text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm6.39-2.908a.75.75 0 0 1 .766.027l3.5 2.25a.75.75 0 0 1 0 1.262l-3.5 2.25A.75.75 0 0 1 8 12.25v-4.5a.75.75 0 0 1 .39-.658Z"
                  clip-rule="evenodd"
                />
              </svg>
              Watch demo
            </button>
            <button
              type="button"
              class="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
            >
              <svg
                class="h-5 w-5 flex-none text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z"
                  clip-rule="evenodd"
                />
              </svg>
              Contact sales
            </button>
          </div>
        </div>
      </div>

      {#each menuItems as item}
        <a
          href={item.href}
          class={mdMenuClass}
          class:active={item.href === "/"
            ? $page.url.pathname === item.href
            : $page.url.pathname.startsWith(item.href)}>{item.name}</a
        >
      {/each}
    </div>
    <div class="hidden lg:flex lg:flex-1 lg:justify-end">
      <!-- <a href="javascript:void(0)" class="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a> -->
    </div>
  </nav>
  <!-- Mobile menu, show/hide based on menu open state. -->
  <div class="lg:hidden" role="dialog" aria-modal="true">
    <div
      class={`fixed transition-transform inset-y-0 right-0 z-10 w-full overflow-y-auto bg-bg dark:bg-bg-dark px-6 py-6 sm:max-w-sm border-l-2 border-ink dark:border-accent-terminal ${smMenuOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div class="flex items-center justify-between">
        <a href="/" class="-m-1.5 p-1.5" on:click={() => (smMenuOpen = false)}>
          <span class="sr-only">Junedang</span>
          <img class="h-10 w-auto md:h-8" src="/favicon.jpeg" alt="" />
        </a>
        <button
          on:click={() => (smMenuOpen = false)}
          title="Close menu"
          type="button"
          class="-m-2.5 rounded-md p-2.5 text-ink dark:text-ink-inverse"
        >
          <span class="sr-only">Close menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div class="mt-6 flow-root">
        <div class="-my-6 divide-y divide-gray-500/10">
          <div class="space-y-2 py-6">
            <div class="-mx-3 hidden">
              <button
                type="button"
                class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                aria-controls="disclosure-1"
                aria-expanded="false"
              >
                Products
                <!--
                    Expand/collapse icon, toggle classes based on menu open state.
  
                    Open: "rotate-180", Closed: ""
                  -->
                <svg
                  class="h-5 w-5 flex-none"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <!-- 'Product' sub-menu, show/hide based on menu state. -->
              <div class="mt-2 space-y-2" id="disclosure-1">
                <a
                  href="/"
                  class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >Product item 1</a
                >
                <a
                  href="/about"
                  class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >Product item 2</a
                >
                <a
                  href="/posts"
                  class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >Product item 3</a
                >
              </div>
            </div>

            {#each menuItems as item}
              <a
                href={item.href}
                class={smMenuClass}
                class:active={item.href === "/"
                  ? $page.url.pathname === item.href
                  : $page.url.pathname.startsWith(item.href)}
                on:click={() => (smMenuOpen = false)}>{item.name}</a
              >
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</header>

<style>
  .mdMenuItem.active {
    background-color: #171717;
    color: #f7f3e8;
  }

  .mdMenuItem.active:hover {
    background-color: #171717;
  }

  :global(.dark) .mdMenuItem.active {
    background-color: #00b56a;
    color: #171717;
  }

  :global(.dark) .mdMenuItem.active:hover {
    background-color: #00b56a;
  }

  .smMenuItem.active {
    background-color: #171717;
    color: #f7f3e8;
  }

  .smMenuItem.active:hover {
    background-color: #171717;
  }

  :global(.dark) .smMenuItem.active {
    background-color: #00b56a;
    color: #171717;
  }

  :global(.dark) .smMenuItem.active:hover {
    background-color: #00b56a;
  }
</style>
