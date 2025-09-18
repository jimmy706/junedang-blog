<script lang="ts">
  import BriefCase from "../../components/icons/BriefCase.svelte";
  import CodeBracketSquare from "../../components/icons/CodeBracketSquare.svelte";
  import MapPin from "../../components/icons/MapPin.svelte";
  import SocialLinks from "../../lib/SocialLinks.svelte";
</script>

<svelte:head>
  <title>Junedang | About</title>
  <meta
    name="description"
    content="Learn more about June Dang, a Vietnamese software engineer passionate about cloud computing, finance technology, video games, movies, travel, and coding."
  />
</svelte:head>

<div class="max-w-4xl mx-auto">
  <!-- Header Section with Avatar -->
  <div class="p-6 bg-gray-50 shadow-sm rounded-sm relative mb-8">
    <div
      class="bg-stone-950 rounded-full overflow-hidden w-24 h-24 block ring-2 ring-gray-500 absolute m-auto left-0 right-0 transform -translate-y-1/2"
    >
      <img
        class="block w-full h-full"
        src="/image/avatar.webp"
        alt="June Dang"
      />
    </div>

    <div class="pt-16 text-center">
      <h1 class="text-4xl font-bold text-black mb-4">June Dang</h1>
      <p class="text-xl text-gray-700 mb-2">Software Engineer</p>
      <p class="text-lg text-gray-600">Viet Nam 🇻🇳</p>
    </div>

    <!-- Social Links -->
    <SocialLinks 
      showTitle={false}
      containerClass="flex justify-center mt-6 socials text-black px-2 py-4 gap-x-1"
      linkClass="block text-black p-4 rounded-full hover:bg-gray-200"
    />
  </div>

  <!-- Bio Section -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <!-- About Me -->
    <div class="p-6 bg-white shadow-sm rounded-sm">
      <h2 class="text-3xl font-bold text-black mb-4">About Me</h2>
      <p class="text-gray-600 mb-4">
        Hello World! I'm June Dang, a passionate Vietnamese software engineer
        with a love for building innovative solutions in the cloud and finance
        sectors.
      </p>
      <p class="text-gray-600 mb-4">
        My journey in software development has led me to work extensively with
        cloud technologies, helping businesses scale their operations and
        improve their digital infrastructure. I find great satisfaction in
        solving complex problems and creating elegant, efficient solutions.
      </p>
      <p class="text-gray-600">
        When I'm not coding, I love exploring new technologies, sharing
        knowledge through writing, and staying up-to-date with the latest trends
        in software engineering. Welcome to my blog, where I share my
        experiences, insights, and learnings!
      </p>
    </div>

    <!-- Professional Info -->
    <div class="p-6 bg-white shadow-sm rounded-sm">
      <h2 class="text-3xl font-bold text-black mb-4">Professional</h2>
      <div class="space-y-4">
        <div>
          <h3 class="flex items-center text-lg font-semibold text-gray-800">
            <i>
              <BriefCase />
            </i>
            Current Role
          </h3>
          <p class="text-gray-600">Software Engineer</p>
        </div>
        <div>
          <h3 class="flex items-center text-lg font-semibold text-gray-800">
            <i>
              <MapPin />
            </i>
            Location
          </h3>
          <p class="text-gray-600">Viet Nam 🇻🇳</p>
        </div>
        <div>
          <h3 class="flex items-center text-lg font-semibold text-gray-800">
            <i>
              <CodeBracketSquare />
            </i>
            Focus Areas
          </h3>
          <ul class="text-gray-600 list-disc list-inside">
            <li>Cloud Infrastructure</li>
            <li>Financial Technology Solutions</li>
            <li>Java & Python Backend Development</li>
            <li>System Architecture</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Hobbies & Interests -->
  <div class="p-6 bg-gray-50 shadow-sm rounded-sm mt-8">
    <h2 class="text-3xl font-bold text-black mb-6">Hobbies & Interests</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <!-- Video Games -->
      <div class="text-center">
        <div
          class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3"
        >
          <svg
            class="w-8 h-8 text-blue-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M7.97 16.06c.8 0 1.45-.65 1.45-1.45s-.65-1.45-1.45-1.45-1.45.65-1.45 1.45.65 1.45 1.45 1.45zm2.54-4.46c.8 0 1.45-.65 1.45-1.45s-.65-1.45-1.45-1.45-1.45.65-1.45 1.45.65 1.45 1.45 1.45zm2.6 1.06c-.8 0-1.45.65-1.45 1.45s.65 1.45 1.45 1.45 1.45-.65 1.45-1.45-.65-1.45-1.45-1.45zm-1.06-2.54c-.8 0-1.45.65-1.45 1.45s.65 1.45 1.45 1.45 1.45-.65 1.45-1.45-.65-1.45-1.45-1.45z"
            />
            <path
              d="M17.5 6h-11C4.57 6 3 7.57 3 9.5S4.57 13 6.5 13h.75c.41 1.2 1.53 2.06 2.85 2.06s2.44-.86 2.85-2.06h.1c.41 1.2 1.53 2.06 2.85 2.06S18.34 14.2 18.75 13h.75c1.93 0 3.5-1.57 3.5-3.5S19.43 6 17.5 6zm-11 5c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8s1.5.67 1.5 1.5S7.33 11 6.5 11zm11 0c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
            />
          </svg>
        </div>
        <h3 class="font-semibold text-gray-800">Video Games</h3>
        <p class="text-sm text-gray-600 mt-1">
          Gaming enthusiast who loves exploring virtual worlds and strategic
          gameplay
        </p>
      </div>

      <!-- Movies -->
      <div class="text-center">
        <div
          class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3"
        >
          <svg
            class="w-8 h-8 text-red-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"
            />
          </svg>
        </div>
        <h3 class="font-semibold text-gray-800">Movies</h3>
        <p class="text-sm text-gray-600 mt-1">
          Cinephile who enjoys diverse genres from sci-fi to documentaries
        </p>
      </div>

      <!-- Travel -->
      <div class="text-center">
        <div
          class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3"
        >
          <svg
            class="w-8 h-8 text-green-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
          </svg>
        </div>
        <h3 class="font-semibold text-gray-800">Travel</h3>
        <p class="text-sm text-gray-600 mt-1">
          Explorer at heart, always seeking new cultures and experiences
        </p>
      </div>

      <!-- Coding -->
      <div class="text-center">
        <div
          class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3"
        >
          <svg
            class="w-8 h-8 text-purple-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"
            />
          </svg>
        </div>
        <h3 class="font-semibold text-gray-800">Coding</h3>
        <p class="text-sm text-gray-600 mt-1">
          Passionate about clean code, new technologies, and open-source
          contributions
        </p>
      </div>
    </div>
  </div>

  <!-- Contact CTA -->
  <div class="p-6 bg-slate-950 text-white rounded-sm mt-8 text-center">
    <h2 class="text-2xl font-bold mb-4">Let's Connect!</h2>
    <p class="text-gray-300 mb-6">
      Feel free to reach out if you'd like to discuss technology, collaborate on
      projects, or just have a friendly chat.
    </p>
    <a
      href="/contact"
      class="inline-flex items-center px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors"
    >
      Get in Touch
      <svg
        class="ml-2 w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </a>
  </div>
</div>
