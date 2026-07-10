import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { getContact } from "@/lib/queries";
import { getLang } from "@/lib/locale";
import { localizedMeta } from "@/lib/page-meta";

export function generateMetadata() {
  return localizedMeta({
    ru: {
      title: "Контакты",
      description:
        "Свяжитесь с Protocol Travel Services: телефон, WhatsApp, email и офис в Ташкенте. Ответим в течение рабочего дня.",
    },
    en: {
      title: "Contact",
      description:
        "Get in touch with Protocol Travel Services: phone, WhatsApp, email and our Tashkent office. We reply within one business day.",
    },
  });
}
export const dynamic = "force-dynamic";

// Self-contained bilingual copy for the Contact page.
const copy = {
  ru: {
    eyebrow: "Контакты",
    title1: "Начнём",
    titleEm: "разговор",
    lead: "Расскажите, каким вы видите своё путешествие — мы предложим маршрут, продуманный под вас. Отвечаем в течение рабочего дня.",
    phoneLabel: "Телефон",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
    addressLabel: "Офис",
    hoursLabel: "Часы работы",
    hours: "Пн–Сб, 9:00–19:00 (GMT+5)",
    formTitle: "Оставьте заявку",
    formSub: "Мы перезвоним и обсудим детали.",
    source: "Заявка со страницы контактов",
    firstName: "Имя",
    lastName: "Фамилия",
    phone: "Номер телефона",
    submit: "Отправить",
    sending: "Отправка…",
    success: "Спасибо! Мы свяжемся с вами в ближайшее время.",
    error: "Пожалуйста, заполните все поля.",
  },
  en: {
    eyebrow: "Contact",
    title1: "Let's start",
    titleEm: "a conversation",
    lead: "Tell us how you picture your journey — we will propose an itinerary built around you. We reply within one business day.",
    phoneLabel: "Phone",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
    addressLabel: "Office",
    hoursLabel: "Working hours",
    hours: "Mon–Sat, 9:00–19:00 (GMT+5)",
    formTitle: "Send an enquiry",
    formSub: "We will call you back to discuss the details.",
    source: "Enquiry from the contact page",
    firstName: "First name",
    lastName: "Last name",
    phone: "Phone number",
    submit: "Send",
    sending: "Sending…",
    success: "Thank you! We will be in touch shortly.",
    error: "Please fill in all the fields.",
  },
};

const GOLD_LIGHT = "#e4c97e";

export default function ContactPage() {
  const lang = getLang();
  const c = copy[lang];
  const contact = getContact(lang);
  const waDigits = contact.whatsapp.replace(/\D/g, "");

  const rows = [
    { label: c.phoneLabel, value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
    { label: c.whatsappLabel, value: contact.whatsapp, href: `https://wa.me/${waDigits}` },
    { label: c.emailLabel, value: contact.email, href: `mailto:${contact.email}` },
    { label: c.addressLabel, value: contact.address },
    { label: c.hoursLabel, value: c.hours },
  ].filter((r) => r.value);

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden pb-16 pt-[160px] md:pt-[200px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,rgba(201,168,76,0.07)_0%,transparent_70%)]" />
        <div className="container-x relative">
          <Reveal>
            <p className="eyebrow">{c.eyebrow}</p>
            <h1 className="mt-6 font-serif text-5xl font-light leading-[1.02] text-cream sm:text-6xl md:text-8xl">
              {c.title1}{" "}
              <em className="italic" style={{ color: GOLD_LIGHT }}>
                {c.titleEm}
              </em>
            </h1>
            <p className="mt-8 max-w-xl font-serif text-lg font-light italic leading-[1.6] text-cream/80">
              {c.lead}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Details + form */}
      <section className="pb-28 md:pb-36">
        <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="divide-y divide-white/5 border-t border-white/5">
              {rows.map((r) => (
                <div key={r.label} className="grid grid-cols-[110px_1fr] gap-6 py-6 md:grid-cols-[140px_1fr]">
                  <span className="font-sans text-[9px] uppercase leading-6 tracking-[0.3em] text-gold">
                    {r.label}
                  </span>
                  {r.href ? (
                    <a
                      href={r.href}
                      className="font-serif text-xl font-light text-cream transition-colors hover:text-gold md:text-2xl"
                      {...(r.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
                    >
                      {r.value}
                    </a>
                  ) : (
                    <span className="font-serif text-xl font-light text-cream md:text-2xl">
                      {r.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="eyebrow">{c.formTitle}</p>
            <p className="mb-6 mt-3 font-sans text-xs font-light leading-relaxed text-muted-400">
              {c.formSub}
            </p>
            <ContactForm
              labels={{
                source: c.source,
                firstName: c.firstName,
                lastName: c.lastName,
                phone: c.phone,
                submit: c.submit,
                sending: c.sending,
                success: c.success,
                error: c.error,
              }}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
