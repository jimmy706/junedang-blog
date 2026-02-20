<script lang="ts">
  import Container from "$lib/Container.svelte";
  import SocialLinks from "$lib/SocialLinks.svelte";
  const email = "jim.dangquoc706@gmail.com";
  const cvLink = "https://1drv.ms/b/c/c14ce25ddf8a1dde/EX9hNe_KOIlOvftJtqt-3SEBABynZsmaDVgkEBz3OJNtyA?e=iItgC0";
</script>

<svelte:head>
  <title>Junedang | Contact</title>
  <meta
    name="description"
    content="Contact June Dang - Vietnamese software engineer. Email and professional information."
  />
  <meta property="og:title" content="Contact June Dang | Software Engineer" />
  <meta property="og:description" content="Contact June Dang - Vietnamese software engineer. Email and professional information." />
  <meta property="og:image" content="/favicon.jpeg" />
  <meta property="og:url" content="https://junedang.com/contact" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Contact June Dang | Software Engineer" />
  <meta name="twitter:description" content="Contact June Dang - Vietnamese software engineer. Email and professional information." />
  <meta name="twitter:image" content="/favicon.jpeg" />
</svelte:head>
<Container>
  <div class="max-w-4xl mx-auto font-mono">
    <!-- Terminal Header -->
    <div class="border-2 border-ink bg-bg dark:border-accent-terminal dark:bg-bg-dark mb-8">
      <div class="border-b-2 border-ink px-4 py-2 bg-bg dark:border-accent-terminal dark:bg-bg-dark">
        <span class="text-ink dark:text-ink-inverse">SYSTEM: CONTACT.EXE</span>
      </div>

      <div class="p-6">
        <!-- ASCII-lite Header -->
        <pre class="text-ink dark:text-ink-inverse text-sm mb-6 leading-tight">
 ╭─────────────────────────────────────────╮
 │           CONTACT INTERFACE             │
 ╰─────────────────────────────────────────╯
        </pre>

        <div class="text-ink dark:text-ink-inverse">
          <p class="mb-2">USER: JUNE_DANG</p>
          <p class="mb-2">ADDRESS: <a href={`mailto:${email}`}>{email}</a></p>
          <p class="mb-4">LOCATION: VIETNAM</p>
        </div>

        <!-- Terminal Social Links -->
        <div class="border-t-2 border-ink dark:border-accent-terminal pt-4">
          <p class="text-ink dark:text-ink-inverse mb-2">CONNECT:</p>
          <SocialLinks
            showTitle={false}
            containerClass="flex flex-wrap gap-4 socials text-ink dark:text-ink-inverse"
            linkClass="block text-ink dark:text-ink-inverse hover:bg-ink hover:text-ink-inverse dark:hover:bg-accent-terminal dark:hover:text-ink px-2 py-1 border border-ink dark:border-accent-terminal transition-colors"
          />
        </div>
      </div>
    </div>

    <!-- Terminal Sections -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Contact Details Terminal -->
      <div class="border-2 border-ink bg-bg dark:border-accent-terminal dark:bg-bg-dark">
        <div class="border-b-2 border-ink px-4 py-2 bg-bg dark:border-accent-terminal dark:bg-bg-dark">
          <span class="text-ink dark:text-ink-inverse">$ cat contact.txt</span>
        </div>
        <div class="p-4">
          <pre class="text-ink dark:text-ink-inverse text-sm leading-relaxed whitespace-pre-wrap">Email: {email}
Availability: Usually within 24-48 hours

Feel free to reach out for:
• Collaboration & Consulting
• Open-source & Community
• Tech chats and networking

EOF</pre>
        </div>
      </div>

      <!-- Professional Terminal -->
      <div class="border-2 border-ink bg-bg dark:border-accent-terminal dark:bg-bg-dark">
        <div class="border-b-2 border-ink px-4 py-2 bg-bg dark:border-accent-terminal dark:bg-bg-dark">
          <span class="text-ink dark:text-ink-inverse">$ ls -la /professional/</span>
        </div>
        <div class="p-4">
          <pre class="text-ink dark:text-ink-inverse text-sm leading-relaxed">total 3
-rw-r--r--  1 june staff   64  resume.pdf
-rw-r--r--  1 june staff   24  role.txt
-rw-r--r--  1 june staff   16  focus.txt

$ cat role.txt
SOFTWARE_ENGINEER

$ cat focus.txt
Cloud & Finance Technology</pre>
          <div class="mt-4 pt-4 border-t-2 border-ink dark:border-accent-terminal">
            <a
              href={cvLink}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block text-ink dark:text-ink-inverse border-2 border-ink dark:border-accent-terminal px-4 py-2 hover:bg-ink hover:text-ink-inverse dark:hover:bg-accent-terminal dark:hover:text-ink transition-colors"
            >
              > OPEN RESUME.PDF
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Email Script Terminal -->
    <div class="border-2 border-ink bg-bg dark:border-accent-terminal dark:bg-bg-dark mt-8">
      <div class="border-b-2 border-ink px-4 py-2 bg-bg dark:border-accent-terminal dark:bg-bg-dark">
        <span class="text-ink dark:text-ink-inverse">$ ./mail.sh</span>
      </div>
      <div class="p-4">
        <pre class="text-ink dark:text-ink-inverse text-sm leading-relaxed">#!/bin/bash
# Mail Script v1.0
# Author: June Dang

echo "Preparing email client..."
echo "TO: {email}"
echo "SUBJECT: Hello from junedang.com"
echo ""
echo "Message:"
echo "Hi June, I'd like to connect about ..."
echo ""
echo "Ready to send."

# Execute mail module</pre>

        <div class="mt-4 pt-4 border-t-2 border-ink dark:border-accent-terminal">
          <a
            href={`mailto:${email}`}
            class="inline-block text-ink dark:text-ink-inverse border-2 border-ink dark:border-accent-terminal px-4 py-2 hover:bg-ink hover:text-ink-inverse dark:hover:bg-accent-terminal dark:hover:text-ink transition-colors"
          >
            > SEND EMAIL
          </a>
        </div>
      </div>
    </div>
  </div>
</Container>
