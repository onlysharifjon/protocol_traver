import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getResource } from "../../../config";
import { saveResource } from "../../../actions";
import ResourceForm from "@/components/dashboard/ResourceForm";

export const dynamic = "force-dynamic";

export default function EditResourcePage({
  params,
}: {
  params: { resource: string; id: string };
}) {
  const res = getResource(params.resource);
  if (!res) notFound();

  const isNew = params.id === "new";
  let values: Record<string, unknown> = {};

  if (!isNew) {
    const row = db
      .prepare(`SELECT * FROM ${res.table} WHERE id = ?`)
      .get(Number(params.id)) as Record<string, unknown> | undefined;
    if (!row) notFound();
    values = row;
  } else {
    // sensible default ordering for new rows
    const max = db
      .prepare(`SELECT COALESCE(MAX(position), -1) AS m FROM ${res.table}`)
      .get() as { m: number };
    values = { position: max.m + 1 };
  }

  // Load options for ref fields
  const refOptions: Record<string, { id: number; label: string }[]> = {};
  for (const f of res.fields) {
    if (f.type === "ref" && f.refTable && f.refLabel) {
      refOptions[f.name] = db
        .prepare(
          `SELECT id, ${f.refLabel} AS label FROM ${f.refTable} ORDER BY position, id`
        )
        .all() as { id: number; label: string }[];
    }
  }

  const action = saveResource.bind(null, res.slug, params.id);

  return (
    <div>
      <h1 className="font-serif text-3xl font-light text-cream">
        {isNew ? `Add ${res.title}` : `Edit ${res.title}`}
      </h1>
      <p className="mb-8 mt-2 font-sans text-xs text-muted-600">
        {res.titlePlural}
      </p>

      <ResourceForm
        fields={res.fields}
        values={values}
        refOptions={refOptions}
        action={action}
        backHref={`/dashboard/${res.slug}`}
      />
    </div>
  );
}
