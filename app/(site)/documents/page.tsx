import Reveal from "@/components/Reveal";
import { getSettings, getDocumentGroups } from "@/lib/queries";
import { getLang } from "@/lib/locale";
import { t } from "@/lib/i18n";

export const metadata = {
  title: "Licenses & Certifications — Protocol",
};
export const dynamic = "force-dynamic";

const statusStyles: Record<string, string> = {
  valid: "text-muted-400",
  expired: "text-danger",
  ongoing: "text-[#6f9061]",
};

function TypeBadge({ type }: { type: string }) {
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-gold/25 bg-gold/5 font-sans text-[8px] font-bold tracking-wider text-gold">
      {type}
    </span>
  );
}

export default function DocumentsPage() {
  const lang = getLang();
  const ui = t(lang);
  const s = getSettings("documents", lang);
  const documentGroups = getDocumentGroups(lang);

  return (
    <>
      {/* Header */}
      <section className="bg-ink pb-16 pt-[160px] md:pt-[200px]">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-end">
            <Reveal>
              <p className="eyebrow">{s.docs_eyebrow}</p>
              <h1 className="mt-6 font-serif text-5xl font-light leading-[1.05] text-cream md:text-7xl lg:text-[72px]">
                {s.docs_title_1}
                <br />
                <span className="italic text-gold">{s.docs_title_2}</span>
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="max-w-md font-sans text-[13px] font-light leading-[1.85] text-muted-500 lg:ml-auto">
                {s.docs_intro}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Document groups */}
      <section className="bg-ink pb-24">
        <div className="container-x space-y-20">
          {documentGroups.map((group) => (
            <Reveal key={group.title}>
              <div className="flex items-baseline justify-between">
                <h2 className="font-serif text-3xl font-light text-cream">
                  {group.title}
                </h2>
                <span className="font-serif text-sm text-muted-900">
                  {group.count}
                </span>
              </div>
              <p className="mt-4 max-w-2xl font-sans text-xs font-light leading-[1.8] text-muted-600">
                {group.intro}
              </p>

              <div className="mt-8 border-t border-white/5">
                {group.docs.map((doc) => (
                  <div
                    key={doc.title}
                    className="flex flex-col gap-5 border-b border-white/5 py-7 md:flex-row md:items-center md:gap-7"
                  >
                    <TypeBadge type={doc.type} />

                    <div className="min-w-0 flex-1">
                      <h3 className="font-serif text-xl text-cream-dim">
                        {doc.title}
                      </h3>
                      <p className="mt-1 font-sans text-[11px] font-light tracking-wide text-muted-600">
                        {doc.subtitle}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-[10px] tracking-wide text-muted-700">
                        <span>{doc.issuer}</span>
                        <span className="text-muted-900">·</span>
                        <span>{doc.issued}</span>
                        <span className="text-muted-900">·</span>
                        <span className={statusStyles[doc.statusType] ?? "text-muted-400"}>
                          {doc.status}
                        </span>
                      </div>
                    </div>

                    {doc.file ? (
                      <div className="flex shrink-0 items-center gap-6">
                        <a
                          href={doc.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-sans text-[9px] uppercase tracking-[0.25em] text-muted-700 transition-colors hover:text-cream"
                        >
                          {ui.docView}
                        </a>
                        <a
                          href={doc.file}
                          download
                          className="flex items-center gap-2 border border-gold/30 px-5 py-3 font-sans text-[9px] uppercase tracking-[0.25em] text-gold transition-colors hover:bg-gold hover:text-ink"
                        >
                          ↓ {ui.docDownload}
                        </a>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </Reveal>
          ))}

          {/* Footnote */}
          <Reveal className="border-t border-white/5 pt-10">
            <p className="max-w-3xl font-sans text-[11px] font-light leading-[1.8] text-muted-900">
              {s.docs_footnote}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
