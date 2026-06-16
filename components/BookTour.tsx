"use client";

import { useState } from "react";
import { createOrder } from "@/app/(site)/order-actions";
import type { t } from "@/lib/i18n";

type UI = ReturnType<typeof t>;

export default function BookTour({
  tourId,
  tourTitle,
  ui,
}: {
  tourId: number;
  tourTitle: string;
  ui: UI;
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  function reset() {
    setStatus("idle");
    setError("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");
    const res = await createOrder(data);
    if (res.ok) {
      setStatus("done");
      form.reset();
    } else {
      setError(res.error === "phone" ? ui.phone + " ✕" : ui.bookingError);
      setStatus("error");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          reset();
          setOpen(true);
        }}
        className="w-full border border-gold/40 py-3 font-sans text-[10px] uppercase tracking-[0.3em] text-gold transition-colors duration-300 hover:bg-gold hover:text-ink"
      >
        {ui.book}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-md border border-white/10 bg-ink-600 p-8 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label={ui.close}
              onClick={() => setOpen(false)}
              className="absolute right-5 top-5 font-sans text-lg leading-none text-muted-400 transition-colors hover:text-cream"
            >
              ✕
            </button>

            {status === "done" ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-6 h-px w-12 bg-gold/40" />
                <p className="font-serif text-2xl font-light text-cream">
                  {ui.bookingSuccess}
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-8 border border-gold/40 px-8 py-3 font-sans text-[10px] uppercase tracking-[0.3em] text-gold transition-colors hover:bg-gold hover:text-ink"
                >
                  {ui.close}
                </button>
              </div>
            ) : (
              <>
                <p className="eyebrow">{ui.book}</p>
                <h3 className="mt-3 font-serif text-2xl font-light text-cream">
                  {ui.bookHeading}
                </h3>
                <p className="mt-2 font-sans text-xs font-light leading-relaxed text-muted-400">
                  {tourTitle}
                </p>
                <p className="mt-1 font-sans text-[11px] font-light leading-relaxed text-muted-500">
                  {ui.bookSubheading}
                </p>

                <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                  <input type="hidden" name="tour_id" value={tourId} />
                  <input type="hidden" name="tour_title" value={tourTitle} />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field name="first_name" label={ui.firstName} />
                    <Field name="last_name" label={ui.lastName} />
                  </div>
                  <Field name="phone" label={ui.phone} type="tel" placeholder="+998 ___ __ __" />

                  {status === "error" && (
                    <p className="font-sans text-xs text-danger">
                      {error || ui.bookingError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-2 w-full bg-gold py-3.5 font-sans text-[10px] uppercase tracking-[0.3em] text-ink transition-opacity hover:opacity-90 disabled:opacity-50"
                  >
                    {status === "sending" ? ui.sending : ui.submitBooking}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
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
