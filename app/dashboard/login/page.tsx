import { login } from "../actions";

export const metadata = { title: "Dashboard Login — Protocol" };

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <div className="font-serif text-2xl tracking-[0.06em] text-cream">
            PROTOCOL
          </div>
          <div className="mt-1 font-sans text-[9px] uppercase tracking-[0.3em] text-gold">
            Admin Dashboard
          </div>
        </div>

        <form
          action={login}
          className="space-y-5 border border-white/10 bg-ink-600 p-8"
        >
          {searchParams.error && (
            <p className="border border-danger/40 bg-danger/10 px-4 py-3 text-center font-sans text-xs text-danger">
              Incorrect username or password
            </p>
          )}
          <div>
            <label className="mb-2 block font-sans text-[10px] uppercase tracking-[0.2em] text-muted-400">
              Username
            </label>
            <input
              name="username"
              type="text"
              required
              autoFocus
              className="w-full border border-white/10 bg-ink px-4 py-3 font-sans text-sm text-cream outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="mb-2 block font-sans text-[10px] uppercase tracking-[0.2em] text-muted-400">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full border border-white/10 bg-ink px-4 py-3 font-sans text-sm text-cream outline-none focus:border-gold"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gold py-3 font-sans text-[11px] uppercase tracking-[0.25em] text-ink transition-opacity hover:opacity-90"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
