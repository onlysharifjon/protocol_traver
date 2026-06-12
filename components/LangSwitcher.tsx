"use client";

const langs = ["RU", "EN"] as const;

export default function LangSwitcher({
  current,
  cookieName = "lang",
  reload = true,
}: {
  current: string;
  cookieName?: string;
  reload?: boolean;
}) {
  const set = (l: string) => {
    if (l === current) return;
    document.cookie = `${cookieName}=${l}; path=/; max-age=31536000; samesite=lax`;
    if (reload) window.location.reload();
  };

  return (
    <div className="flex items-center gap-2">
      {langs.map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => set(l.toLowerCase())}
            className={`font-sans text-[10px] tracking-[0.15em] transition-colors hover:text-gold ${
              current === l.toLowerCase() ? "text-gold" : "text-muted-400"
            }`}
          >
            {l}
          </button>
          {i < langs.length - 1 && <span className="text-muted-800">|</span>}
        </span>
      ))}
    </div>
  );
}
