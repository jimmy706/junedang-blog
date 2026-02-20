import { browser } from "$app/environment";
import { writable } from "svelte/store";

export type Theme = "light" | "dark";
const STORAGE_KEY = "junedang-theme";

export const theme = writable<Theme>("light");

export function applyTheme(nextTheme: Theme): void {
  if (!browser) {
    return;
  }

  const root = document.documentElement;
  root.classList.toggle("dark", nextTheme === "dark");
  localStorage.setItem(STORAGE_KEY, nextTheme);
  theme.set(nextTheme);
}

export function initTheme(): void {
  if (!browser) {
    return;
  }

  const storedTheme = localStorage.getItem(STORAGE_KEY) as Theme | null;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const nextTheme = storedTheme ?? (prefersDark ? "dark" : "light");
  applyTheme(nextTheme);
}

export function toggleTheme(): void {
  let activeTheme: Theme = "light";
  const unsubscribe = theme.subscribe((value) => {
    activeTheme = value;
  });
  unsubscribe();

  applyTheme(activeTheme === "light" ? "dark" : "light");
}
