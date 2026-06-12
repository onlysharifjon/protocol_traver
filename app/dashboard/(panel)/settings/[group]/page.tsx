import { notFound } from "next/navigation";
import { getSettings } from "@/lib/queries";
import { SETTINGS_GROUPS, prettifyKey } from "../../../config";
import { saveSettings } from "../../../actions";

export const dynamic = "force-dynamic";

export default function SettingsGroupPage({
  params,
}: {
  params: { group: string };
}) {
  const meta = SETTINGS_GROUPS.find((g) => g.slug === params.group);
  if (!meta) notFound();

  const settings = getSettings(params.group);
  const keys = Object.keys(settings).sort();
  const action = saveSettings.bind(null, params.group);

  const labelFor = (key: string) =>
    prettifyKey(key.replace(new RegExp(`^${params.group}_`), ""));

  return (
    <div>
      <h1 className="font-serif text-3xl font-light text-cream">{meta.title}</h1>
      <p className="mb-8 mt-2 font-sans text-xs text-muted-600">
        Edit the wording shown on this part of the site.
      </p>

      <form action={action} className="max-w-2xl space-y-6">
        {keys.map((key) => {
          const value = settings[key];
          const long = value.length > 70;
          return (
            <div key={key}>
              <label className="mb-2 block font-sans text-[10px] uppercase tracking-[0.2em] text-muted-400">
                {labelFor(key)}
              </label>
              {long ? (
                <textarea
                  name={key}
                  defaultValue={value}
                  rows={3}
                  className="w-full border border-white/10 bg-ink px-4 py-3 font-sans text-sm text-cream outline-none focus:border-gold"
                />
              ) : (
                <input
                  name={key}
                  type="text"
                  defaultValue={value}
                  className="w-full border border-white/10 bg-ink px-4 py-3 font-sans text-sm text-cream outline-none focus:border-gold"
                />
              )}
            </div>
          );
        })}

        <button
          type="submit"
          className="bg-gold px-7 py-3 font-sans text-[10px] uppercase tracking-[0.2em] text-ink hover:opacity-90"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
