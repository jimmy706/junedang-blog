<svelte:head>
	<title>Junedang | About me</title>
</svelte:head>

<div class="grid grid-cols-3">
  <div class="p-4 bg-gray-50 shadow-sm rounded-sm">
    <div
      class="bg-stone-950 rounded-full overflow-hidden w-20 h-20 block ring-2 ring-gray-500"
    >
      <img class="block w-full h-full" src="/favicon.jpeg" alt="avatar" />
    </div>
    <h1 class="text-3xl mt-5 font-bold text-black">About me</h1>
    <p class="text-gray-600 mt-2">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
      corporis non dolorem optio animi deserunt perferendis dolorum natus
      sapiente earum porro, adipisci nesciunt. Ex, in laborum voluptates iusto
      dolor at?
    </p>
    <button
      class="bg-black text-white py-2 px-4 rounded-full flex items-center space-x-2 hover:bg-gray-800 transition"
    >
      <span>Get Started</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="w-5 h-5"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</div>
