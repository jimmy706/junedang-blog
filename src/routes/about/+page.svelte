<script lang="ts">
  import Container from "$lib/Container.svelte";
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
<Container>
  <div class="max-w-4xl mx-auto font-mono">
    <!-- Terminal Header -->
    <div class="border-2 border-black bg-white mb-8">
      <div class="border-b-2 border-black px-4 py-2 bg-white">
        <span class="text-black">SYSTEM: ABOUT.EXE</span>
      </div>

      <div class="p-6">
        <!-- ASCII Art Header -->
        <pre class="text-black text-sm mb-6 leading-tight">
 ╭─────────────────────────────────────────╮
 │  ██╗██╗   ██╗███╗   ██╗███████╗        │
 │  ██║██║   ██║████╗  ██║██╔════╝        │
 │  ██║██║   ██║██╔██╗ ██║█████╗          │
 │  ██║██║   ██║██║╚██╗██║██╔══╝          │
 │  ██║╚██████╔╝██║ ╚████║███████╗        │
 │  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝        │
 │                                        │
 │  ██████╗  █████╗ ███╗   ██╗ ██████╗    │
 │  ██╔══██╗██╔══██╗████╗  ██║██╔════╝    │
 │  ██║  ██║███████║██╔██╗ ██║██║  ███╗   │
 │  ██║  ██║██╔══██║██║╚██╗██║██║   ██║   │
 │  ██████╔╝██║  ██║██║ ╚████║╚██████╔╝   │
 │  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝    │
 ╰─────────────────────────────────────────╯
        </pre>

        <div class="text-black">
          <p class="mb-2">USER: JUNE_DANG</p>
          <p class="mb-2">ROLE: SOFTWARE_ENGINEER</p>
          <p class="mb-4">LOCATION: VIETNAM</p>
        </div>

        <!-- Terminal Social Links -->
        <div class="border-t-2 border-black pt-4">
          <p class="text-black mb-2">CONNECT:</p>
          <SocialLinks
            showTitle={false}
            containerClass="flex flex-wrap gap-4 socials text-black"
            linkClass="block text-black hover:bg-black hover:text-white px-2 py-1 border border-black transition-colors"
          />
        </div>
      </div>
    </div>

    <!-- Terminal Sections -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- About Terminal -->
      <div class="border-2 border-black bg-white">
        <div class="border-b-2 border-black px-4 py-2 bg-white">
          <span class="text-black">$ cat about.txt</span>
        </div>
        <div class="p-4">
          <pre
            class="text-black text-sm leading-relaxed whitespace-pre-wrap">Hello World!

I'm June Dang, a passionate Vietnamese 
software engineer with a love for building 
innovative solutions in the cloud and 
finance sectors.

My journey in software development has led 
me to work extensively with cloud 
technologies, helping businesses scale 
their operations and improve their digital 
infrastructure.

I find great satisfaction in solving 
complex problems and creating elegant, 
efficient solutions.

When I'm not coding, I love exploring new 
technologies, sharing knowledge through 
writing, and staying up-to-date with the 
latest trends in software engineering.

Welcome to my blog, where I share my 
experiences, insights, and learnings!

EOF</pre>
        </div>
      </div>

      <!-- Professional Terminal -->
      <div class="border-2 border-black bg-white">
        <div class="border-b-2 border-black px-4 py-2 bg-white">
          <span class="text-black">$ ls -la /professional/</span>
        </div>
        <div class="p-4">
          <pre class="text-black text-sm leading-relaxed">total 4
drwxr-xr-x  2 june staff  128 Oct  4 2025 .
drwxr-xr-x  5 june staff  160 Oct  4 2025 ..
-rw-r--r--  1 june staff   64 Oct  4 2025 role.txt
-rw-r--r--  1 june staff   32 Oct  4 2025 location.txt
-rw-r--r--  1 june staff  256 Oct  4 2025 skills.txt

$ cat role.txt
SOFTWARE_ENGINEER

$ cat location.txt  
VIETNAM

$ cat skills.txt
• Cloud Infrastructure
• Financial Technology Solutions  
• Java & Python Backend Development
• System Architecture
• Distributed Systems
• DevOps & CI/CD</pre>
        </div>
      </div>
    </div>
    <!-- Contact Terminal -->
    <div class="border-2 border-black bg-white mt-8">
      <div class="border-b-2 border-black px-4 py-2 bg-white">
        <span class="text-black">$ ./connect.sh</span>
      </div>
      <div class="p-4">
        <pre class="text-black text-sm leading-relaxed">#!/bin/bash
# Connection Script v1.0
# Author: June Dang

echo "Initializing connection protocol..."
echo "Available channels:"
echo "  [1] Email"
echo "  [2] Social Media" 
echo "  [3] Contact Form"
echo ""
echo "Feel free to reach out if you'd like to"
echo "discuss technology, collaborate on projects,"
echo "or just have a friendly chat."
echo ""
echo "Ready to connect..."

# Execute contact module</pre>

        <div class="mt-4 pt-4 border-t-2 border-black">
          <a
            href="/contact"
            class="inline-block text-black border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
          >
            > EXECUTE CONTACT.EXE
          </a>
        </div>
      </div>
    </div>
  </div>
</Container>
