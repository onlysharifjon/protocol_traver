import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

// Keep in sync with LANG_COOKIE / LOCALES in lib (can't import server-only
// modules into the edge middleware).
const LANG_COOKIE = "lang";
const LOCALES = ["ru", "en"];

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // Allow ?lang=ru|en on any page to switch language: persist it as the `lang`
  // cookie, then redirect to the clean URL so the choice sticks on navigation.
  const requested = searchParams.get("lang");
  if (requested && LOCALES.includes(requested)) {
    const url = req.nextUrl.clone();
    url.searchParams.delete("lang");
    const res = NextResponse.redirect(url);
    res.cookies.set(LANG_COOKIE, requested, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return res;
  }

  // Protected areas: the dashboard (except its login page) and the /admin
  // orders view. Both reuse the same session; unauthenticated requests are
  // sent to the dashboard login.
  const isProtected =
    (pathname.startsWith("/dashboard") && pathname !== "/dashboard/login") ||
    pathname === "/admin" ||
    pathname.startsWith("/admin/");
  if (isProtected) {
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    const valid = await verifySessionToken(token);
    if (!valid) {
      const url = req.nextUrl.clone();
      url.search = "";
      url.pathname = "/dashboard/login";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes except Next internals and static files (so ?lang works
  // site-wide), plus the dashboard for auth.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
