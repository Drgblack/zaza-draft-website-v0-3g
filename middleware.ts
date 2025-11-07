import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Pass through public files and API
  if (pathname.startsWith("/api") || PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  // Match /en/... or /de/...
  const m = pathname.match(/^\/(en|de)(\/.*)?$/);
  if (m) {
    const lang = m[1] as "en" | "de";
    const rest = m[2] || "/";
    const url = new URL(rest, req.url);

    const res = NextResponse.rewrite(url);
    res.cookies.set("lang", lang, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return res;
  }

  // Ensure we always have a cookie (default EN)
  const res = NextResponse.next();
  if (!req.cookies.get("lang")) {
    res.cookies.set("lang", "en", { path: "/", maxAge: 60 * 60 * 24 * 365 });
  }
  return res;
}

export const config = {
  matcher: ["/((?!_next|.*\\..*|api).*)"],
};