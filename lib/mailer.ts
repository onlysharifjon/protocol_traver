// lib/mailer.ts — Protocol DMC sayti uchun email yuborish (Nodemailer + SMTP).
// SMTP sozlamalari mail_travel pochta serveriga ulanadi.
// Kerakli env (.env.local): SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM
import * as nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    throw new Error(
      "SMTP sozlamalari yo'q: SMTP_HOST, SMTP_USER, SMTP_PASS ni .env.local da to'ldiring."
    );
  }

  const port = Number(process.env.SMTP_PORT ?? 587);
  transporter = nodemailer.createTransport({
    host,
    port,
    // 465 -> implicit TLS; 587 -> STARTTLS
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: { user, pass },
  });
  return transporter;
}

export interface SendMailInput {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
}

/** Bitta email yuboradi. Xatda exception tashlaydi. */
export async function sendMail(input: SendMailInput) {
  const from = process.env.MAIL_FROM ?? process.env.SMTP_USER!;
  return getTransporter().sendMail({
    from,
    to: input.to,
    subject: input.subject,
    text: input.text,
    html: input.html,
    replyTo: input.replyTo,
  });
}

/** SMTP ulanishini tekshiradi (sozlama to'g'riligini bilish uchun). */
export async function verifyMailer(): Promise<boolean> {
  return getTransporter().verify();
}
