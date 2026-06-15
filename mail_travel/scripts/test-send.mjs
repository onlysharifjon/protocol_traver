#!/usr/bin/env node
// Test xat yuborish skripti (Nodemailer orqali SMTP ni tekshirish).
// Foydalanish:
//   node scripts/test-send.mjs qabuluvchi@example.com
// .env (mail_travel) yoki muhit o'zgaruvchilaridan SMTP_* ni o'qiydi.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import nodemailer from "nodemailer";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ENV = path.join(HERE, "..", ".env");

// .env ni oddiy o'qish (KEY=VALUE)
if (fs.existsSync(ENV)) {
  for (const line of fs.readFileSync(ENV, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

const to = process.argv[2];
if (!to) {
  console.error("Foydalanish: node scripts/test-send.mjs qabuluvchi@example.com");
  process.exit(1);
}

const port = Number(process.env.SMTP_PORT ?? 587);
const t = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  secure: process.env.SMTP_SECURE === "true" || port === 465,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

try {
  await t.verify();
  console.log("SMTP ulanish OK ✓");
  const info = await t.sendMail({
    from: process.env.MAIL_FROM ?? process.env.SMTP_USER,
    to,
    subject: "Protocol DMC — test xat",
    text: "Bu mail_travel pochta serveridan yuborilgan test xabar.",
    html: "<p>Bu <b>mail_travel</b> pochta serveridan yuborilgan test xabar.</p>",
  });
  console.log("Yuborildi ✓  messageId:", info.messageId);
} catch (err) {
  console.error("Xato:", err.message);
  process.exit(1);
}
