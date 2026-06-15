import Link from "next/link";
import Sidebar from "@/components/dashboard/Sidebar";
import LangSwitcher from "@/components/LangSwitcher";
import ThemeSwitcher from "@/components/dashboard/ThemeSwitcher";
import { getAdminLang, getAdminTheme } from "@/lib/locale";
import { logout } from "../actions";

export const metadata = { title: "Dashboard — Protocol" };
export const dynamic = "force-dynamic";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminLang = getAdminLang();
  const adminTheme = getAdminTheme();
  return (
    <div
      className="admin-root flex min-h-screen bg-ink text-cream"
      data-admin-theme={adminTheme}
    >
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-60 shrink-0 flex-col justify-between overflow-y-auto border-r border-white/10 bg-ink-900 md:flex">
        <div>
          <div className="border-b border-white/10 px-4 py-5">
            <div className="font-serif text-lg tracking-[0.06em] text-cream">
              PROTOCOL
            </div>
            <div className="mt-1 font-sans text-[8px] uppercase tracking-[0.3em] text-gold">
              Admin Dashboard
            </div>
            <div className="mt-4 flex items-center justify-between border border-white/10 bg-ink px-3 py-2">
              <span className="font-sans text-[8px] uppercase tracking-[0.25em] text-muted-600">
                Editing
              </span>
              <LangSwitcher current={adminLang} cookieName="admin_lang" />
            </div>
            <div className="mt-2 flex items-center justify-between border border-white/10 bg-ink px-3 py-2">
              <span className="font-sans text-[8px] uppercase tracking-[0.25em] text-muted-600">
                Theme
              </span>
              <ThemeSwitcher current={adminTheme} />
            </div>
          </div>
          <Sidebar />
        </div>
        <div className="border-t border-white/10 p-4">
          <Link
            href="/"
            target="_blank"
            className="mb-3 block font-sans text-[11px] tracking-wide text-muted-400 hover:text-cream"
          >
            ↗ View site
          </Link>
          <form action={logout}>
            <button className="w-full border border-white/10 py-2 font-sans text-[10px] uppercase tracking-[0.2em] text-muted-400 hover:border-danger/50 hover:text-danger">
              Log out
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 md:ml-60">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:hidden">
          <span className="font-serif tracking-wide">PROTOCOL Admin</span>
          <div className="flex items-center gap-4">
            <ThemeSwitcher current={adminTheme} />
            <LangSwitcher current={adminLang} cookieName="admin_lang" />
            <form action={logout}>
              <button className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted-400">
                Log out
              </button>
            </form>
          </div>
        </div>
        <main className="mx-auto max-w-4xl px-6 py-10">{children}</main>
      </div>
    </div>
  );
}
