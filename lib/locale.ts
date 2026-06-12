import "server-only";
import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "./data";

export const LANG_COOKIE = "lang";
export const ADMIN_LANG_COOKIE = "admin_lang";

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
