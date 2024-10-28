import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
    fontFamily: {
      display: ["Segoe UI","Roboto","Helvetica","Arial","sans-serif","Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"],
      body: ["Segoe UI","Roboto","Helvetica","Arial","sans-serif","Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"],
    }
  },
  plugins: [],
} as Config;
