"use client";

import Link from "next/link";
import { useState } from "react";
import type { Field } from "@/app/dashboard/config";

type RefOption = { id: number; label: string };

export default function ResourceForm({
  fields,
  values,
  refOptions,
  action,
  backHref,
}: {
  fields: Field[];
  values: Record<string, unknown>;
  refOptions: Record<string, RefOption[]>;
  action: (formData: FormData) => void | Promise<void>;
  backHref: string;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-6">
      {fields.map((f) => (
        <FieldInput
          key={f.name}
          field={f}
          value={values[f.name]}
          options={refOptions[f.name]}
        />
      ))}

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          className="bg-gold px-7 py-3 font-sans text-[10px] uppercase tracking-[0.2em] text-ink hover:opacity-90"
        >
          Save
        </button>
        <Link
          href={backHref}
          className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted-400 hover:text-cream"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

function FieldInput({
  field,
  value,
  options,
}: {
  field: Field;
  value: unknown;
  options?: RefOption[];
}) {
  const base =
    "w-full border border-white/10 bg-ink px-4 py-3 font-sans text-sm text-cream outline-none focus:border-gold";
  const current = value == null ? "" : String(value);
  const [preview, setPreview] = useState<string>(current);

  return (
    <div>
      <label className="mb-2 block font-sans text-[10px] uppercase tracking-[0.2em] text-muted-400">
        {field.label}
      </label>

      {field.type === "textarea" && (
        <textarea name={field.name} defaultValue={current} rows={4} className={base} />
      )}

      {field.type === "text" && (
        <input name={field.name} type="text" defaultValue={current} className={base} />
      )}

      {field.type === "number" && (
        <input
          name={field.name}
          type="number"
          defaultValue={current || "0"}
          className={base}
        />
      )}

      {field.type === "select" && (
        <select name={field.name} defaultValue={current} className={base}>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}

      {field.type === "ref" && (
        <select name={field.name} defaultValue={current} className={base}>
          {options?.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      )}

      {field.type === "image" && (
        <div className="space-y-3">
          {preview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="preview"
              className="h-28 w-28 border border-white/10 object-cover"
            />
          )}
          <input name={field.name} type="hidden" defaultValue={current} />
          <input
            name={`${field.name}__file`}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPreview(URL.createObjectURL(file));
            }}
            className="block w-full font-sans text-xs text-muted-400 file:mr-4 file:border file:border-gold/30 file:bg-transparent file:px-4 file:py-2 file:font-sans file:text-[10px] file:uppercase file:tracking-[0.2em] file:text-gold"
          />
          <p className="font-sans text-[10px] text-muted-600">
            Current: {current || "none"} — leave empty to keep, or choose a file to replace.
          </p>
        </div>
      )}
    </div>
  );
}
