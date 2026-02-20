import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        bg: "#f7f3e8",
        "bg-dark": "#121515",
        ink: "#171717",
        "ink-soft": "#2e2e2e",
        "ink-inverse": "#f7f3e8",
        "accent-terminal": "#00b56a",
        "accent-pink": "#ef5da8"
      },
      borderWidth: {
        3: "3px"
      },
      boxShadow: {
        pixel: "4px 4px 0 0 #171717",
        "pixel-dark": "4px 4px 0 0 #00b56a"
      },
      fontFamily: {
        mono: ["Departure Mono", "Courier New", "monospace"],
        pixel: ["Departure Mono", "Courier New", "monospace"],
        body: ["Departure Mono", "Courier New", "monospace"]
      }
    }
  },
  plugins: []
} as Config;
