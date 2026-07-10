"use client";

import { useState } from "react";
import { createOrder } from "@/app/(site)/order-actions";

// Standalone enquiry form for the /contact page. Stores the request as an
// order (source label instead of a tour title) so it shows up on /admin and
// triggers the same email notification.
export default function ContactForm({
  labels,
}: {
  labels: {
    source: string;
    firstName: string;
    lastName: string;
    phone: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
  };
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    const res = await createOrder(data);
    if (res.ok) {
      setStatus("done");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="border border-white/10 bg-ink-600 p-10 text-center">
        <div className="mx-auto mb-6 h-px w-12 bg-gold/40" />
        <p className="font-serif text-2xl font-light text-cream">{labels.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border border-white/10 bg-ink-600 p-8 md:p-10">
      <input type="hidden" name="tour_title" value={labels.source} />
      {/* Honeypot: invisible to people, filled by spam bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field name="first_name" label={labels.firstName} />
        <Field name="last_name" label={labels.lastName} />
      </div>
      <Field name="phone" label={labels.phone} type="tel" placeholder="+998 ___ __ __" />

      {status === "error" && (
        <p className="font-sans text-xs text-danger">{labels.error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 w-full bg-gold py-3.5 font-sans text-[10px] uppercase tracking-[0.3em] text-ink transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "sending" ? labels.sending : labels.submit}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-sans text-[9px] uppercase tracking-[0.25em] text-muted-400">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full border border-white/10 bg-ink px-4 py-3 font-sans text-sm text-cream outline-none transition-colors placeholder:text-muted-500 focus:border-gold"
      />
    </label>
  );
}
