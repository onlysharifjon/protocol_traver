"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LangSwitcher from "./LangSwitcher";

type NavItem = { label: string; href: string };
type Brand = { name: string; tagline: string };

export default function Header({
  nav,
  brand,
  lang,
}: {
  nav: NavItem[];
  brand: Brand;
  lang: string;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Hash links (e.g. "#contact" → the footer) live on every page via the
  // layout. next/link treats a bare "#hash" as a soft navigation and skips the
  // browser's default scroll, so we scroll to the target ourselves.
  const handleHashClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("#")) return;
    const el = document.getElementById(href.slice(1));
    if (!el) return; // let the browser handle it if the target isn't here
    e.preventDefault();
    setOpen(false);
    el.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", href);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-white/5 bg-ink/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="shrink-0 leading-none">
          <span className="block font-serif text-xl tracking-[0.08em] text-cream">
            {brand.name}
          </span>
          <span className="mt-1 block font-sans text-[9px] uppercase tracking-[0.3em] text-gold">
            {brand.tagline}
          </span>
        </Link>

        {/* Desktop nav — only at xl+, where the longer Russian labels fit
            without colliding; smaller screens use the hamburger menu. */}
        <nav className="hidden items-center gap-x-5 xl:flex 2xl:gap-x-7">
          {nav.map((item) => {
            const active =
              item.href !== "#contact" &&
              (item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleHashClick(e, item.href)}
                className={`whitespace-nowrap font-sans text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 hover:text-gold ${
                  active ? "text-gold" : "text-cream"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Language + mobile toggle */}
        <div className="flex shrink-0 items-center gap-4">
          <div className="hidden items-center gap-2 sm:flex">
            <LangSwitcher current={lang} />
          </div>

          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] xl:hidden"
          >
            <span
              className={`h-px w-5 bg-cream transition-all duration-300 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-cream transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-cream transition-all duration-300 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-y-auto overscroll-contain border-t border-white/5 bg-ink/95 backdrop-blur-md transition-all duration-500 xl:hidden ${
          open ? "max-h-[80vh]" : "max-h-0 overflow-hidden"
        }`}
      >
        <nav className="container-x flex flex-col py-6">
          {nav.map((item) => {
            const active =
              item.href !== "#contact" &&
              (item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleHashClick(e, item.href)}
                className={`border-b border-white/5 py-4 font-sans text-xs uppercase tracking-[0.2em] transition-colors hover:text-gold ${
                  active ? "text-gold" : "text-cream"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          {/* Language switcher — header bar hides it below sm, so surface it here */}
          <div className="flex items-center gap-2 pt-6 sm:hidden">
            <LangSwitcher current={lang} />
          </div>
        </nav>
      </div>
    </header>
  );
}
