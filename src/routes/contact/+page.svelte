<script lang="ts">
  import SocialLinks from "$lib/SocialLinks.svelte";
  import BriefCase from "../../components/icons/BriefCase.svelte";
  import Clock from "../../components/icons/Clock.svelte";
  import DocumentText from "../../components/icons/DocumentText.svelte";
  import Envelope from "../../components/icons/Envelope.svelte";
  import Location from "../../components/icons/Location.svelte";
  const email = "jim.dangquoc706@gmail.com";
  const cvLink =
    "https://1drv.ms/b/c/c14ce25ddf8a1dde/EX9hNe_KOIlOvftJtqt-3SEBABynZsmaDVgkEBz3OJNtyA?e=iItgC0";
  // No specific imports needed for this page
</script>

<svelte:head>
  <title>Junedang | Contact</title>
  <meta
    name="description"
    content="Get in touch with June Dang - Vietnamese software engineer. Contact information including email, location, and professional details."
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
      <h1 class="text-4xl font-bold text-black mb-4">Contact Me</h1>
      <p class="text-xl text-gray-700 mb-2">Let's connect and collaborate</p>
      <p class="text-lg text-gray-600">Feel free to reach out!</p>
    </div>
  </div>

  <!-- Contact Information -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <!-- Contact Details -->
    <div class="p-6 bg-white shadow-sm rounded-sm">
      <h2 class="text-3xl font-bold text-black mb-6">Contact Information</h2>
      <div class="space-y-6">
        <!-- Email -->
        <div class="flex items-start space-x-4">
          <div
            class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0"
          >
            <Envelope class="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-800">Email</h3>
            <a
              href="mailto:{email}"
              class="text-blue-600 hover:text-blue-800 transition-colors"
            >
              {email}
            </a>
          </div>
        </div>

        <!-- Location -->
        <div class="flex items-start space-x-4">
          <div
            class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0"
          >
            <Location class="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-800">Location</h3>
            <p class="text-gray-600">Vietnam - Vi 🇻🇳</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Professional Links -->
    <div class="p-6 bg-white shadow-sm rounded-sm">
      <h2 class="text-3xl font-bold text-black mb-6">Professional</h2>
      <div class="space-y-6">
        <!-- CV/Resume -->
        <div class="flex items-start space-x-4">
          <div
            class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0"
          >
            <DocumentText class="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-800">Resume/CV</h3>
            <a
              href={cvLink}
              class="text-blue-600 hover:text-blue-800 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download the CV
            </a>
          </div>
        </div>

        <!-- Role -->
        <div class="flex items-start space-x-4">
          <div
            class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0"
          >
            <BriefCase class="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-800">Current Role</h3>
            <p class="text-gray-600">Software Engineer</p>
            <p class="text-sm text-gray-500">
              Focus: Cloud & Finance Technology
            </p>
          </div>
        </div>

        <!-- Response Time -->
        <div class="flex items-start space-x-4">
          <div
            class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0"
          >
            <Clock class="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-800">Response Time</h3>
            <p class="text-gray-600">Usually within 24-48 hours</p>
            <p class="text-sm text-gray-500">
              I'll get back to you as soon as possible!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Social Links -->
  <SocialLinks containerClass="p-6 bg-gray-50 shadow-sm rounded-sm mt-8" />

  <!-- Call to Action -->
  <div class="p-6 bg-slate-950 text-white rounded-sm mt-8 text-center">
    <h2 class="text-2xl font-bold mb-4">Ready to Connect?</h2>
    <p class="text-gray-300 mb-6">
      Whether it's for collaboration, consulting, or just a friendly tech chat,
      I'd love to hear from you. Drop me an email and let's start the
      conversation!
    </p>
    <a
      href="mailto:jim.dangquoc706@gmail.com"
      class="inline-flex items-center px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors"
    >
      Send Email
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
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    </a>
  </div>
</div>
