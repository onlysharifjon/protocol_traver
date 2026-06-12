"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RESOURCES, SETTINGS_GROUPS } from "@/app/dashboard/config";

function Item({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      className={`block px-4 py-2 font-sans text-[12px] tracking-wide transition-colors ${
        active
          ? "border-l-2 border-gold bg-white/5 text-gold"
          : "border-l-2 border-transparent text-muted-400 hover:text-cream"
      }`}
    >
      {label}
    </Link>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-4 pb-2 pt-6 font-sans text-[9px] uppercase tracking-[0.25em] text-muted-700">
      {children}
    </p>
  );
}

export default function Sidebar() {
  return (
    <nav className="pb-12">
      <div className="pt-4">
        <Item href="/dashboard" label="Overview" />
      </div>

      <Heading>Page Text</Heading>
      {SETTINGS_GROUPS.map((g) => (
        <Item
          key={g.slug}
          href={`/dashboard/settings/${g.slug}`}
          label={g.title}
        />
      ))}

      <Heading>Content Lists</Heading>
      {RESOURCES.map((r) => (
        <Item key={r.slug} href={`/dashboard/${r.slug}`} label={r.titlePlural} />
      ))}
    </nav>
  );
}
