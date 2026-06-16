"use server";

import { db } from "@/lib/db";

export type OrderResult = { ok: boolean; error?: string };

// Public action — called from the tour booking form. No auth: any visitor may
// place a booking request. Validates, then stores the order for the /admin page.
export async function createOrder(formData: FormData): Promise<OrderResult> {
  const firstName = String(formData.get("first_name") ?? "").trim();
  const lastName = String(formData.get("last_name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const tourTitle = String(formData.get("tour_title") ?? "").trim();
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

  return { ok: true };
}
