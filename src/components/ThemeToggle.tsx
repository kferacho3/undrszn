"use client";

import { Icon } from "./Icon";

export const THEME_KEY = "undr-theme";

/** Dark is the default; light ("paper") is opt-in and remembered per browser. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "light" ? "#f3f1eb" : "#0b0b0a");
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* ignore */
    }
  }
  return (
    <button type="button" className={`icon-btn theme-toggle ${className}`} onClick={toggle} aria-label="Switch between dark and light mode">
      <Icon name="moon" className="icon-moon" />
      <Icon name="sun" className="icon-sun" />
    </button>
  );
}
