import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Pass through public files and API
  if (pathname.startsWith("/api") || PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  // Match /en/... or /de/... and just tag the request + cookie without rewriting
  const m = pathname.match(/^\/(en|de)(\/.*)?$/);
  if (m) {
    const lang = m[1] as "en" | "de";
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-lang", lang);

    const res = NextResponse.next({ request: { headers: requestHeaders } });
    res.cookies.set("lang", lang, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return res;
  }

  // Default to English when no locale prefix
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-lang", "en");
  const res = NextResponse.next({ request: { headers: requestHeaders } });
  res.cookies.set("lang", "en", { path: "/", maxAge: 60 * 60 * 24 * 365 });
  return res;
}

export const config = {
  matcher: ["/((?!_next|.*\\..*|api).*)"],
};

