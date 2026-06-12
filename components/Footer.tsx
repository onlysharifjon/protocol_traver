import Link from "next/link";

const socials = ["Instagram", "Facebook", "Tripadvisor"];
const langs = ["EN", "RU"];

type Column = { title: string; links: string[] };
type Contact = { email: string; phone: string; address: string };
type Brand = { name: string; tagline: string };

export default function Footer({
  columns,
  contact,
  brand,
}: {
  columns: Column[];
  contact: Contact;
  brand: Brand;
}) {
  return (
    <footer id="contact" className="border-t border-white/5 bg-ink-900">
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
              Uzbekistan&apos;s premier private tour operator. Tashkent,
              established 2008.
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
            © 2024 Protocol Travel Services LLC. All rights reserved.
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
            <div className="flex items-center gap-2">
              {langs.map((l, i) => (
                <span key={l} className="flex items-center gap-2">
                  <button
                    className={`font-sans text-[9px] tracking-[0.18em] hover:text-gold ${
                      i === 0 ? "text-gold" : "text-muted-800"
                    }`}
                  >
                    {l}
                  </button>
                  {i < langs.length - 1 && (
                    <span className="text-muted-500">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
