import type { NextRequest } from "next/server";

type RateLimitWindow = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfterSeconds: number;
};

const requestLedger = new Map<string, RateLimitWindow>();

function getClientKey(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export function checkRateLimit(
  request: NextRequest,
  {
    namespace,
    limit,
    windowMs,
  }: {
    namespace: string;
    limit: number;
    windowMs: number;
  },
): RateLimitResult {
  const now = Date.now();
  const clientKey = `${namespace}:${getClientKey(request)}`;
  const current = requestLedger.get(clientKey);

  if (!current || current.resetAt <= now) {
    const resetAt = now + windowMs;
    requestLedger.set(clientKey, {
      count: 1,
      resetAt,
    });

    return {
      allowed: true,
      limit,
      remaining: limit - 1,
      resetAt,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetAt: current.resetAt,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  requestLedger.set(clientKey, current);

  return {
    allowed: true,
    limit,
    remaining: Math.max(0, limit - current.count),
    resetAt: current.resetAt,
    retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  };
}
