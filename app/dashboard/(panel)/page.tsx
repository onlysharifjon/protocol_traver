import Link from "next/link";
import { db } from "@/lib/db";
import { RESOURCES, SETTINGS_GROUPS } from "../config";

export const dynamic = "force-dynamic";

function count(table: string): number {
  try {
    return (db.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get() as { n: number })
      .n;
  } catch {
    return 0;
  }
}

export default function DashboardHome() {
  return (
    <div>
      <h1 className="font-serif text-4xl font-light text-cream">Dashboard</h1>
      <p className="mt-3 font-sans text-sm text-muted-400">
        Edit every part of the site here. Changes go live immediately.
      </p>

      <h2 className="mb-4 mt-12 font-sans text-[10px] uppercase tracking-[0.25em] text-gold">
        Page Text
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {SETTINGS_GROUPS.map((g) => (
          <Link
            key={g.slug}
            href={`/dashboard/settings/${g.slug}`}
            className="border border-white/10 bg-ink-600 p-5 transition-colors hover:border-gold/40"
          >
            <span className="font-serif text-lg text-cream">{g.title}</span>
          </Link>
        ))}
      </div>

      <h2 className="mb-4 mt-12 font-sans text-[10px] uppercase tracking-[0.25em] text-gold">
        Content Lists
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {RESOURCES.map((r) => (
          <Link
            key={r.slug}
            href={`/dashboard/${r.slug}`}
            className="flex items-center justify-between border border-white/10 bg-ink-600 p-5 transition-colors hover:border-gold/40"
          >
            <span className="font-serif text-lg text-cream">
              {r.titlePlural}
            </span>
            <span className="font-sans text-xs text-muted-600">
              {count(r.table)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
