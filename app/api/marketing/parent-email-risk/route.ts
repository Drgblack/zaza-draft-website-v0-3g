import { NextRequest, NextResponse } from "next/server";
import { analyzeParentEmailRisk } from "@/lib/parent-email-risk/analyze";

export const runtime = "nodejs";

const MAX_REQUESTS_PER_WINDOW = 8;
const WINDOW_MS = 10 * 60 * 1000;
const MIN_WORDS = 10;
const MAX_CHARS = 4000;

const requestLedger = new Map<string, { count: number; resetAt: number }>();

function getClientKey(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(clientKey: string) {
  const now = Date.now();
  const current = requestLedger.get(clientKey);

  if (!current || current.resetAt <= now) {
    requestLedger.set(clientKey, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });
    return false;
  }

  if (current.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  current.count += 1;
  requestLedger.set(clientKey, current);
  return false;
}

function countWords(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function jsonError(message: string, status: number) {
  return NextResponse.json(
    { error: message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

export async function POST(request: NextRequest) {
  const clientKey = getClientKey(request);
  if (isRateLimited(clientKey)) {
    return jsonError(
      "Too many checks from this connection. Please wait a few minutes and try again.",
      429,
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return jsonError("Invalid request body.", 400);
  }

  const draft =
    typeof (payload as { draft?: unknown })?.draft === "string"
      ? (payload as { draft: string }).draft.trim()
      : "";

  if (!draft) {
    return jsonError("Paste a parent email draft to check.", 400);
  }

  if (draft.length > MAX_CHARS) {
    return jsonError(
      `Keep the draft under ${MAX_CHARS} characters for this free checker.`,
      400,
    );
  }

  if (countWords(draft) < MIN_WORDS) {
    return jsonError(
      "Paste at least a fuller draft email so the checker has enough context to score it.",
      400,
    );
  }

  try {
    const result = await analyzeParentEmailRisk(draft);

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return jsonError(
      "The risk checker could not process that draft just now. Please try again.",
      500,
    );
  }
}
