import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  if (url.pathname === "/about/founder") {
    const cookieLocale = req.cookies.get("NEXT_LOCALE")?.value;
    const queryLocale = url.searchParams.get("lang");
    const acceptLang = req.headers.get("accept-language") || "";
    const wantsDE =
      cookieLocale === "de" ||
      queryLocale === "de" ||
      acceptLang.toLowerCase().startsWith("de");
    if (wantsDE) {
      const rewrite = url.clone();
      rewrite.pathname = "/de/about/founder";
      return NextResponse.rewrite(rewrite);
    }
  }
  return NextResponse.next();
}

export const config = { matcher: [/about/founder, /about/company] };

