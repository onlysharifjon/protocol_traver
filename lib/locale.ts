import "server-only";
import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "./data";

export const LANG_COOKIE = "lang";
export const ADMIN_LANG_COOKIE = "admin_lang";
export const ADMIN_THEME_COOKIE = "admin_theme";

export type AdminTheme = "dark" | "light";

function read(name: string): Locale {
  const v = cookies().get(name)?.value;
  return (LOCALES as string[]).includes(v ?? "")
    ? (v as Locale)
    : DEFAULT_LOCALE;
}

// Public site language (visitor-selected).
export function getLang(): Locale {
  return read(LANG_COOKIE);
}

// Admin dashboard editing language.
export function getAdminLang(): Locale {
  return read(ADMIN_LANG_COOKIE);
}

// Admin dashboard colour theme (dark is the default look).
export function getAdminTheme(): AdminTheme {
  return cookies().get(ADMIN_THEME_COOKIE)?.value === "light"
    ? "light"
    : "dark";
}
