"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { db } from "@/lib/db";
import {
  SESSION_COOKIE,
  createSessionToken,
  verifyCredentials,
  verifySessionToken,
} from "@/lib/auth";
import { getResource } from "./config";

const PUBLIC_PATHS = ["/", "/tours", "/destinations", "/about", "/documents"];

function revalidateSite() {
  for (const p of PUBLIC_PATHS) revalidatePath(p);
}

async function requireAuth() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) {
    redirect("/dashboard/login");
  }
}

// ---------- Auth ----------
export async function login(formData: FormData) {
  const user = String(formData.get("username") ?? "");
  const pass = String(formData.get("password") ?? "");
  if (!verifyCredentials(user, pass)) {
    redirect("/dashboard/login?error=1");
  }
  const token = await createSessionToken(user);
  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/dashboard");
}

export async function logout() {
  cookies().delete(SESSION_COOKIE);
  redirect("/dashboard/login");
}

// ---------- Image upload ----------
async function saveUploadedFile(file: File): Promise<string> {
  const dir = path.join(process.cwd(), "public", "images");
  await mkdir(dir, { recursive: true });
  const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase();
  const base = file.name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40) || "upload";
  const filename = `${base}-${Date.now()}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), bytes);
  return `/images/${filename}`;
}

// ---------- Generic resource CRUD ----------
export async function saveResource(
  slug: string,
  idRaw: string,
  formData: FormData
) {
  await requireAuth();
  const res = getResource(slug);
  if (!res) throw new Error("Unknown resource");

  const cols: string[] = [];
  const values: (string | number)[] = [];

  for (const field of res.fields) {
    let value: string | number;
    if (field.type === "image") {
      const file = formData.get(`${field.name}__file`) as File | null;
      if (file && typeof file === "object" && file.size > 0) {
        value = await saveUploadedFile(file);
      } else {
        value = String(formData.get(field.name) ?? "");
      }
    } else if (field.type === "number" || field.type === "ref") {
      value = Number(formData.get(field.name) ?? 0) || 0;
    } else {
      value = String(formData.get(field.name) ?? "");
    }
    cols.push(field.name);
    values.push(value);
  }

  if (idRaw === "new") {
    const placeholders = cols.map(() => "?").join(", ");
    db.prepare(
      `INSERT INTO ${res.table} (${cols.join(", ")}) VALUES (${placeholders})`
    ).run(...values);
  } else {
    const setClause = cols.map((c) => `${c} = ?`).join(", ");
    db.prepare(`UPDATE ${res.table} SET ${setClause} WHERE id = ?`).run(
      ...values,
      Number(idRaw)
    );
  }

  revalidateSite();
  revalidatePath(`/dashboard/${slug}`);
  redirect(`/dashboard/${slug}`);
}

export async function deleteResource(slug: string, id: number) {
  await requireAuth();
  const res = getResource(slug);
  if (!res) throw new Error("Unknown resource");
  db.prepare(`DELETE FROM ${res.table} WHERE id = ?`).run(id);
  revalidateSite();
  revalidatePath(`/dashboard/${slug}`);
  redirect(`/dashboard/${slug}`);
}

// ---------- Settings ----------
export async function saveSettings(group: string, formData: FormData) {
  await requireAuth();
  // Only update keys that already exist in this group (whitelist).
  const existing = db
    .prepare("SELECT key FROM settings WHERE grp = ?")
    .all(group) as { key: string }[];
  const upd = db.prepare("UPDATE settings SET value = ? WHERE key = ?");
  const tx = db.transaction(() => {
    for (const { key } of existing) {
      if (formData.has(key)) {
        upd.run(String(formData.get(key) ?? ""), key);
      }
    }
  });
  tx();
  revalidateSite();
  redirect(`/dashboard/settings/${group}`);
}
