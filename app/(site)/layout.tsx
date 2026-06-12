import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  getNav,
  getBrand,
  getFooterColumns,
  getContact,
} from "@/lib/queries";

export const dynamic = "force-dynamic";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nav = getNav();
  const brand = getBrand();
  const footerColumns = getFooterColumns();
  const contact = getContact();

  return (
    <>
      <Header nav={nav} brand={brand} />
      <main>{children}</main>
      <Footer columns={footerColumns} contact={contact} brand={brand} />
      <WhatsAppButton whatsapp={contact.whatsapp} />
    </>
  );
}
