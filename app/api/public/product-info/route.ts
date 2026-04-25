import { NextRequest, NextResponse } from "next/server";
import { getPublicProductInfo } from "@/lib/public-api/agent-foundation";
import { checkRateLimit } from "@/lib/public-api/rate-limit";

export const runtime = "nodejs";

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 60;

function buildHeaders(rateLimit: ReturnType<typeof checkRateLimit>) {
  return {
    "Cache-Control": "public, max-age=300, s-maxage=3600",
    "X-RateLimit-Limit": String(rateLimit.limit),
    "X-RateLimit-Remaining": String(rateLimit.remaining),
    "X-RateLimit-Reset": String(Math.floor(rateLimit.resetAt / 1000)),
  };
}

export async function GET(request: NextRequest) {
  const rateLimit = checkRateLimit(request, {
    namespace: "public-product-info",
    limit: MAX_REQUESTS_PER_WINDOW,
    windowMs: WINDOW_MS,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: "Too many requests. Please try again shortly.",
      },
      {
        status: 429,
        headers: {
          ...buildHeaders(rateLimit),
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      },
    );
  }

  return NextResponse.json(getPublicProductInfo(), {
    headers: buildHeaders(rateLimit),
  });
}
