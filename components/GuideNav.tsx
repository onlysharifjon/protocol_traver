"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

// Sticky section sub-nav for destination guides, with scroll-spy that
// highlights the section currently in view.
export default function GuideNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-25% 0px -70% 0px" }
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);

  return (
    <nav className="dg-nav">
      <div className="dg-nav-inner">
        <div className="dg-nav-sections">
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={`dg-nav-btn${active === it.id ? " active" : ""}`}
            >
              {it.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
