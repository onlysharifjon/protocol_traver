"use client";

// Kept in sync with lib/locale.ts (can't import it here — that module is
// server-only, and this is a client component).
const ADMIN_THEME_COOKIE = "admin_theme";
type AdminTheme = "dark" | "light";

const themes: { key: AdminTheme; label: string }[] = [
  { key: "dark", label: "Dark" },
  { key: "light", label: "Light" },
];

// Toggles the admin-only colour theme by writing a cookie the server layout
// reads on the next render (mirrors LangSwitcher so there is no FOUC).
export default function ThemeSwitcher({ current }: { current: AdminTheme }) {
  const set = (t: AdminTheme) => {
    if (t === current) return;
    document.cookie = `${ADMIN_THEME_COOKIE}=${t}; path=/; max-age=31536000; samesite=lax`;
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-2">
      {themes.map((t, i) => (
        <span key={t.key} className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => set(t.key)}
            className={`font-sans text-[10px] tracking-[0.15em] transition-colors hover:text-gold ${
              current === t.key ? "text-gold" : "text-muted-400"
            }`}
          >
            {t.label}
          </button>
          {i < themes.length - 1 && <span className="text-muted-800">|</span>}
        </span>
      ))}
    </div>
  );
}
