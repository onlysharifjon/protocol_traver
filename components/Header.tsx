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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-white/5 bg-ink/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between">
        {/* Brand */}
        <Link href="/" className="leading-none">
          <span className="block font-serif text-xl tracking-[0.08em] text-cream">
            {brand.name}
          </span>
          <span className="mt-1 block font-sans text-[9px] uppercase tracking-[0.3em] text-gold">
            {brand.tagline}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 lg:flex">
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
                className={`font-sans text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 hover:text-gold ${
                  active ? "text-gold" : "text-cream"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Language + mobile toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 sm:flex">
            <LangSwitcher current={lang} />
          </div>

          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] lg:hidden"
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
        className={`overflow-y-auto overscroll-contain border-t border-white/5 bg-ink/95 backdrop-blur-md transition-all duration-500 lg:hidden ${
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
