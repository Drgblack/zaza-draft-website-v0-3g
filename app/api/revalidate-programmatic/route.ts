import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  PROGRAMMATIC_REVALIDATE_TAG,
  getProgrammaticSeedPaths,
} from "@/lib/programmatic";
import { getDefaultRevalidationPaths } from "@/lib/seo-helpers";

const DEFAULT_PATHS = Array.from(
  new Set([...getDefaultRevalidationPaths(), ...getProgrammaticSeedPaths()]),
);

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const configuredSecret = process.env.PROGRAMMATIC_REVALIDATE_SECRET;

  if (!configuredSecret || secret !== configuredSecret) {
    return NextResponse.json(
      { ok: false, error: "Invalid secret" },
      { status: 401 },
    );
  }

  const body = await request.json().catch(() => ({}));
  const requestedPaths = Array.isArray(body?.paths) ? body.paths : [];
  const includeDefaults = body?.includeDefaults !== false;
  const paths = Array.from(
    new Set([...(includeDefaults ? DEFAULT_PATHS : []), ...requestedPaths]),
  );

  for (const path of paths) {
    if (typeof path === "string" && path.startsWith("/")) {
      revalidatePath(path);
    }
  }

  return NextResponse.json({
    ok: true,
    tag: PROGRAMMATIC_REVALIDATE_TAG,
    revalidated: paths,
  });
}
