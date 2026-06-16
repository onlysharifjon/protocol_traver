"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

async function requireAuth() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) {
    redirect("/dashboard/login?from=/admin");
  }
}

// Toggle a booking between "new" and "done" (contacted/handled).
export async function toggleOrderStatus(id: number, next: string) {
  await requireAuth();
  const status = next === "done" ? "done" : "new";
  db.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, id);
  revalidatePath("/admin");
}

export async function deleteOrder(id: number) {
  await requireAuth();
  db.prepare("DELETE FROM orders WHERE id = ?").run(id);
  revalidatePath("/admin");
}
