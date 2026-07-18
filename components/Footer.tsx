import Link from "next/link";
import LangSwitcher from "./LangSwitcher";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/data";

const socials = ["Instagram", "Facebook", "Tripadvisor"];

type Column = { title: string; links: string[] };
type Contact = { email: string; phone: string; address: string };
type Brand = { name: string; tagline: string };

export default function Footer({
  columns,
  contact,
  brand,
  lang,
}: {
  columns: Column[];
  contact: Contact;
  brand: Brand;
  lang: Locale;
}) {
  const ui = t(lang);
  return (
    <footer id="contact" className="scroll-mt-[72px] border-t border-white/5 bg-ink-900">
      <div className="container-x py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="font-serif text-2xl tracking-[0.06em] text-cream">
              {brand.name}
            </div>
            <div className="mt-1 font-sans text-[9px] uppercase tracking-[0.3em] text-gold">
              {brand.tagline}
            </div>
            <p className="mt-6 max-w-[280px] font-sans text-xs leading-[1.8] text-muted-600">
              {ui.footerTagline}
            </p>
            <div className="mt-6 space-y-2 font-sans text-[11px] tracking-[0.05em] text-muted-400">
              <a href={`mailto:${contact.email}`} className="block hover:text-gold">
                {contact.email}
              </a>
              <a href={`tel:${contact.phone}`} className="block hover:text-gold">
                {contact.phone}
              </a>
              <p className="text-muted-600">{contact.address}</p>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-sans text-[9px] uppercase tracking-[0.3em] text-gold">
                {col.title}
              </h4>
              <ul className="mt-6 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="font-sans text-xs tracking-[0.03em] text-muted-600 transition-colors hover:text-cream"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/5 pt-8 md:flex-row md:items-center">
          <p className="font-sans text-[10px] tracking-[0.1em] text-muted-800">
            © 2024 Protocol Travel Services LLC. {ui.footerRights}
          </p>

          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              {socials.map((s) => (
                <Link
                  key={s}
                  href="#"
                  className="font-sans text-[9px] uppercase tracking-[0.18em] text-muted-800 hover:text-gold"
                >
                  {s}
                </Link>
              ))}
            </div>
            <LangSwitcher current={lang} />
          </div>
        </div>
      </div>
    </footer>
  );
}
