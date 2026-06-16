import Link from "next/link";
import { getOrders } from "@/lib/queries";
import { logout } from "../dashboard/actions";
import { toggleOrderStatus, deleteOrder } from "./actions";

export const metadata = { title: "Orders — Protocol" };
export const dynamic = "force-dynamic";

function formatDate(s: string) {
  // SQLite stores "YYYY-MM-DD HH:MM:SS" (UTC). Show date + time, no seconds.
  const [date, time = ""] = s.split(" ");
  return `${date} ${time.slice(0, 5)}`.trim();
}

export default function AdminOrdersPage() {
  const orders = getOrders();
  const newCount = orders.filter((o) => o.status !== "done").length;

  return (
    <div className="min-h-screen bg-ink text-cream">
      {/* Top bar */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <div className="font-serif text-lg tracking-[0.06em]">PROTOCOL</div>
            <div className="mt-1 font-sans text-[8px] uppercase tracking-[0.3em] text-gold">
              Tour Orders
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="font-sans text-[11px] tracking-wide text-muted-400 hover:text-cream"
            >
              ↗ Dashboard
            </Link>
            <form action={logout}>
              <button className="border border-white/10 px-4 py-2 font-sans text-[10px] uppercase tracking-[0.2em] text-muted-400 hover:border-danger/50 hover:text-danger">
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex items-end justify-between">
          <h1 className="font-serif text-3xl font-light">Orders</h1>
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-muted-400">
            {orders.length} total
            {newCount > 0 && (
              <span className="ml-3 text-gold">{newCount} new</span>
            )}
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="border border-white/10 px-6 py-20 text-center font-sans text-sm text-muted-400">
            No orders yet.
          </div>
        ) : (
          <div className="overflow-x-auto border border-white/10">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 font-sans text-[9px] uppercase tracking-[0.2em] text-muted-600">
                  <th className="px-4 py-4 font-normal">Date</th>
                  <th className="px-4 py-4 font-normal">Name</th>
                  <th className="px-4 py-4 font-normal">Phone</th>
                  <th className="px-4 py-4 font-normal">Tour</th>
                  <th className="px-4 py-4 font-normal">Status</th>
                  <th className="px-4 py-4 text-right font-normal">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => {
                  const done = o.status === "done";
                  return (
                    <tr
                      key={o.id}
                      className="border-b border-white/5 align-middle font-sans text-[13px]"
                    >
                      <td className="whitespace-nowrap px-4 py-4 text-muted-400">
                        {formatDate(o.created_at)}
                      </td>
                      <td className="px-4 py-4 text-cream">
                        {o.first_name} {o.last_name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <a
                          href={`tel:${o.phone.replace(/\s/g, "")}`}
                          className="text-gold hover:underline"
                        >
                          {o.phone}
                        </a>
                      </td>
                      <td className="px-4 py-4 text-muted-400">{o.tour_title}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-block px-2 py-1 font-sans text-[8px] uppercase tracking-[0.2em] ${
                            done
                              ? "bg-success/20 text-cream/70"
                              : "bg-gold/15 text-gold"
                          }`}
                        >
                          {done ? "Done" : "New"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <form
                            action={toggleOrderStatus.bind(
                              null,
                              o.id,
                              done ? "new" : "done"
                            )}
                          >
                            <button className="border border-white/10 px-3 py-1.5 font-sans text-[9px] uppercase tracking-[0.15em] text-muted-400 hover:border-gold/40 hover:text-gold">
                              {done ? "Reopen" : "Mark done"}
                            </button>
                          </form>
                          <form action={deleteOrder.bind(null, o.id)}>
                            <button className="border border-white/10 px-3 py-1.5 font-sans text-[9px] uppercase tracking-[0.15em] text-muted-400 hover:border-danger/50 hover:text-danger">
                              Delete
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
