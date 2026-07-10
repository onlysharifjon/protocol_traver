"use server";

import { db } from "@/lib/db";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { getSettings } from "@/lib/queries";
import { sendMail } from "@/lib/mailer";

export type OrderResult = { ok: boolean; error?: string };

// Best-effort admin notification — a mail failure must never lose the order
// (it is already stored and visible on /admin).
async function notifyNewOrder(o: {
  tourTitle: string;
  firstName: string;
  lastName: string;
  phone: string;
}) {
  const to =
    process.env.ORDER_NOTIFY_TO || getSettings("contact", "ru").contact_email;
  if (!to) return;
  await sendMail({
    to,
    subject: `Новая заявка: ${o.tourTitle} — ${o.firstName} ${o.lastName}`,
    text: [
      "Новая заявка на бронирование с сайта protocoldmc.com",
      "",
      `Тур:      ${o.tourTitle}`,
      `Имя:      ${o.firstName} ${o.lastName}`,
      `Телефон:  ${o.phone}`,
      "",
      "Все заявки: https://protocoldmc.com/admin",
    ].join("\n"),
  });
}

// Public action — called from the tour booking form. No auth: any visitor may
// place a booking request. Validates, then stores the order for the /admin page.
export async function createOrder(formData: FormData): Promise<OrderResult> {
  // Honeypot: real users never fill this hidden field. Pretend success so
  // bots don't learn they were filtered.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { ok: true };
  }
  // Spam guard: 5 bookings per hour per IP.
  if (!rateLimit(`order:${clientIp()}`, 5, 60 * 60 * 1000)) {
    return { ok: false, error: "rate" };
  }

  const firstName = String(formData.get("first_name") ?? "").trim().slice(0, 80);
  const lastName = String(formData.get("last_name") ?? "").trim().slice(0, 80);
  const phone = String(formData.get("phone") ?? "").trim().slice(0, 40);
  const tourTitle = String(formData.get("tour_title") ?? "").trim().slice(0, 200);
  const tourIdRaw = String(formData.get("tour_id") ?? "");
  const tourId = Number(tourIdRaw) || null;

  if (!firstName || !lastName || !phone) {
    return { ok: false, error: "missing" };
  }
  // Light phone sanity check: at least 7 digits.
  if ((phone.replace(/\D/g, "").length ?? 0) < 7) {
    return { ok: false, error: "phone" };
  }

  db.prepare(
    `INSERT INTO orders (tour_id, tour_title, first_name, last_name, phone)
     VALUES (?, ?, ?, ?, ?)`
  ).run(tourId, tourTitle || "—", firstName, lastName, phone);

  try {
    await notifyNewOrder({ tourTitle: tourTitle || "—", firstName, lastName, phone });
  } catch (err) {
    console.error("[order] notification mail failed:", err);
  }

  return { ok: true };
}
