import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  PROGRAMMATIC_REVALIDATE_TAG,
  getProgrammaticSeedPaths,
} from "@/lib/programmatic";

const DEFAULT_PATHS = getProgrammaticSeedPaths();

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
  const paths =
    Array.isArray(body?.paths) && body.paths.length
      ? body.paths
      : DEFAULT_PATHS;

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
