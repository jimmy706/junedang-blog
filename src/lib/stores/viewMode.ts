import { browser } from "$app/environment";
import { writable } from "svelte/store";

export type ViewMode = "list" | "windows";
const STORAGE_KEY = "junedang-post-view";

export const viewMode = writable<ViewMode>("list");

export function initViewMode(): void {
  if (!browser) {
    return;
  }

  const stored = localStorage.getItem(STORAGE_KEY) as ViewMode | null;
  if (stored === "list" || stored === "windows") {
    viewMode.set(stored);
  }
}

export function setViewMode(nextMode: ViewMode): void {
  if (browser) {
    localStorage.setItem(STORAGE_KEY, nextMode);
  }

  viewMode.set(nextMode);
}
