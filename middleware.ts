import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  if (pathname === "/about/founder") {
    // Check NEXT_LOCALE=de cookie or ?lang=de query
    const cookieLocale = req.cookies.get("NEXT_LOCALE")?.value;
    const queryLocale = req.nextUrl.searchParams.get("lang");
    const wantsDE = cookieLocale === "de" || queryLocale === "de";
    if (wantsDE) {
      const url = req.nextUrl.clone();
      url.pathname = "/de/about/founder";
      return NextResponse.rewrite(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/about/founder"],
};
