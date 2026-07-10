import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "./auth";

// Server-side auth guard for admin pages and actions. The middleware also
// protects these routes, but pages must not rely on it alone (defense in
// depth against middleware-bypass class bugs in the framework).
export async function requireAuth(): Promise<void> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) {
    redirect("/dashboard/login");
  }
}
