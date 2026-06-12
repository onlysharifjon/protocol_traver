import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  getNav,
  getBrand,
  getFooterColumns,
  getContact,
} from "@/lib/queries";
import { getLang } from "@/lib/locale";

export const dynamic = "force-dynamic";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = getLang();
  const nav = getNav(lang);
  const brand = getBrand(lang);
  const footerColumns = getFooterColumns(lang);
  const contact = getContact(lang);

  return (
    <>
      <Header nav={nav} brand={brand} lang={lang} />
      <main>{children}</main>
      <Footer columns={footerColumns} contact={contact} brand={brand} lang={lang} />
      <WhatsAppButton whatsapp={contact.whatsapp} />
    </>
  );
}
