import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getResource } from "../../config";
import { deleteResource } from "../../actions";

export const dynamic = "force-dynamic";

export default function ResourceListPage({
  params,
}: {
  params: { resource: string };
}) {
  const res = getResource(params.resource);
  if (!res) notFound();

  const rows = db
    .prepare(`SELECT * FROM ${res.table} ORDER BY position, id`)
    .all() as Record<string, unknown>[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl font-light text-cream">
          {res.titlePlural}
        </h1>
        <Link
          href={`/dashboard/${res.slug}/new`}
          className="bg-gold px-5 py-2.5 font-sans text-[10px] uppercase tracking-[0.2em] text-ink hover:opacity-90"
        >
          + Add {res.title}
        </Link>
      </div>

      <div className="mt-8 border border-white/10">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-ink-600">
              {res.listColumns.map((c) => (
                <th
                  key={c}
                  className="px-4 py-3 text-left font-sans text-[9px] uppercase tracking-[0.2em] text-muted-600"
                >
                  {res.fields.find((f) => f.name === c)?.label ?? c}
                </th>
              ))}
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={res.listColumns.length + 1}
                  className="px-4 py-8 text-center font-sans text-sm text-muted-600"
                >
                  No items yet.
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr
                key={String(row.id)}
                className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
              >
                {res.listColumns.map((c) => (
                  <td
                    key={c}
                    className="max-w-xs truncate px-4 py-3 font-sans text-[13px] text-cream"
                  >
                    {String(row[c] ?? "")}
                  </td>
                ))}
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <Link
                    href={`/dashboard/${res.slug}/${row.id}`}
                    className="font-sans text-[11px] uppercase tracking-wide text-gold hover:underline"
                  >
                    Edit
                  </Link>
                  <form
                    action={deleteResource.bind(null, res.slug, Number(row.id))}
                    className="ml-4 inline"
                  >
                    <button className="font-sans text-[11px] uppercase tracking-wide text-muted-600 hover:text-danger">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
