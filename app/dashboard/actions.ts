"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { db } from "@/lib/db";
import { SESSION_COOKIE, createSessionToken, verifyCredentials } from "@/lib/auth";
import { requireAuth } from "@/lib/require-auth";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { getAdminLang } from "@/lib/locale";
import { getResource } from "./config";

const PUBLIC_PATHS = ["/", "/tours", "/destinations", "/about", "/documents"];

function revalidateSite() {
  for (const p of PUBLIC_PATHS) revalidatePath(p);
}

// ---------- Auth ----------
export async function login(formData: FormData) {
  // Brute-force protection: 5 attempts per 15 minutes per IP.
  if (!rateLimit(`login:${clientIp()}`, 5, 15 * 60 * 1000)) {
    redirect("/dashboard/login?error=rate");
  }
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
// Raster images only (no SVG — inline scripts would be served from /images/).
const ALLOWED_IMAGE_EXT = new Set(["jpg", "jpeg", "png", "webp", "avif", "gif"]);
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

async function saveUploadedFile(file: File): Promise<string> {
  const ext = (file.name.split(".").pop() ?? "").toLowerCase();
  if (!ALLOWED_IMAGE_EXT.has(ext) || !file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed (jpg, png, webp, avif, gif)");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("Image is too large (max 10 MB)");
  }
  const dir = path.join(process.cwd(), "public", "images");
  await mkdir(dir, { recursive: true });
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
  // Freshly uploaded files, mirrored to the other language's row below.
  const uploadedImages: { col: string; path: string }[] = [];

  for (const field of res.fields) {
    let value: string | number;
    if (field.type === "image") {
      const file = formData.get(`${field.name}__file`) as File | null;
      if (file && typeof file === "object" && file.size > 0) {
        value = await saveUploadedFile(file);
        uploadedImages.push({ col: field.name, path: value });
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
    // New rows belong to the language currently selected in the dashboard.
    const insCols = [...cols, "lang"];
    const insValues = [...values, getAdminLang()];
    const placeholders = insCols.map(() => "?").join(", ");
    db.prepare(
      `INSERT INTO ${res.table} (${insCols.join(", ")}) VALUES (${placeholders})`
    ).run(...insValues);
  } else {
    const id = Number(idRaw);
    const setClause = cols.map((c) => `${c} = ?`).join(", ");
    db.prepare(`UPDATE ${res.table} SET ${setClause} WHERE id = ?`).run(
      ...values,
      id
    );
    // Pictures are language-neutral: when a new file was uploaded, copy it to
    // the matching row of the other language (same position), so switching
    // the admin language doesn't leave the old image behind.
    if (uploadedImages.length > 0) {
      try {
        const row = db
          .prepare(`SELECT lang, position FROM ${res.table} WHERE id = ?`)
          .get(id) as { lang: string; position: number } | undefined;
        if (row) {
          for (const img of uploadedImages) {
            db.prepare(
              `UPDATE ${res.table} SET ${img.col} = ? WHERE lang != ? AND position = ?`
            ).run(img.path, row.lang, row.position);
          }
        }
      } catch {
        // Table without lang/position columns — nothing to mirror.
      }
    }
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
  const lang = getAdminLang();
  // Only update keys that already exist in this group/language (whitelist).
  const existing = db
    .prepare("SELECT key FROM settings WHERE grp = ? AND lang = ?")
    .all(group, lang) as { key: string }[];
  const upd = db.prepare(
    "UPDATE settings SET value = ? WHERE key = ? AND lang = ?"
  );
  const tx = db.transaction(() => {
    for (const { key } of existing) {
      if (formData.has(key)) {
        upd.run(String(formData.get(key) ?? ""), key, lang);
      }
    }
  });
  tx();
  revalidateSite();
  redirect(`/dashboard/settings/${group}`);
}
