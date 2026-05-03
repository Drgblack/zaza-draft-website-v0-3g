import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an SEO content writer for zazadraft.com, a teacher-focused AI writing assistant that helps UK primary school teachers write report comments and professional parent emails.

Write a complete SEO article in UK English. Structure it exactly as follows:

1. H1 title using the primary keyword naturally
2. Introduction (2-3 short paragraphs) explaining the teacher problem this keyword addresses
3. ## Why Teachers Find This Challenging (2-3 short paragraphs)
4. ## 10 Example Phrases to Use (a numbered list of 10 ready-to-use phrases)
5. ## Tips for Writing Professional Comments (3-5 practical bullet points)
6. ## Common Mistakes to Avoid (3-4 bullet points)
7. ## How Zaza Draft Can Help (2 short paragraphs introducing Zaza Draft as an AI writing assistant - do not oversell, be helpful and honest)
8. ## Ready to Save Time on Your Reports? (short closing paragraph with a CTA to try Zaza Draft)

Tone: Professional, calm, warm, and supportive toward teachers. Never condescending.
Do not use em dashes. Use short paragraphs. UK English throughout.
Length: 900-1100 words.

At the end, on a new line, write exactly: INTERNAL_LINKS: /report-comments, /scenario-builder`;

type GeneratorRequestBody = {
  slug?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string;
  yearGroup?: string;
  subject?: string;
  modifier?: string;
};

function isLocalRequest(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  return host.startsWith("localhost:") || host.startsWith("127.0.0.1:");
}

function buildUserPrompt(body: GeneratorRequestBody) {
  return `Primary keyword: ${body.primaryKeyword ?? ""}
URL slug: ${body.slug ?? ""}
Secondary keywords: ${body.secondaryKeywords ?? ""}
Year group: ${body.yearGroup ?? ""}
Subject/issue: ${body.subject ?? ""}
Pupil type/modifier: ${body.modifier || "General"}

Generate the full SEO article now.`;
}

export async function POST(request: NextRequest) {
  const configuredSecret = process.env.SEO_ARTICLE_GENERATOR_SECRET;
  const providedSecret = request.headers.get("x-seo-generator-secret");

  if (configuredSecret) {
    if (providedSecret !== configuredSecret) {
      return NextResponse.json(
        { error: "Invalid generator secret" },
        { status: 401 },
      );
    }
  } else if (!isLocalRequest(request)) {
    return NextResponse.json(
      { error: "SEO article generator secret is not configured" },
      { status: 500 },
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not configured" },
      { status: 500 },
    );
  }

  const body = (await request
    .json()
    .catch(() => null)) as GeneratorRequestBody | null;
  if (!body?.primaryKeyword?.trim()) {
    return NextResponse.json(
      { error: "Primary keyword is required" },
      { status: 400 },
    );
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-20250514",
      max_tokens: 2500,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildUserPrompt(body) }],
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMessage =
      data && typeof data === "object" && "error" in data
        ? String(
            (data as { error?: { message?: string } }).error?.message ??
              "API error",
          )
        : "API error";
    return NextResponse.json(
      { error: errorMessage },
      { status: response.status },
    );
  }

  const text =
    data &&
    typeof data === "object" &&
    Array.isArray(
      (data as { content?: Array<{ type?: string; text?: string }> }).content,
    )
      ? (data as { content: Array<{ type?: string; text?: string }> }).content
          .filter(
            (item) => item.type === "text" && typeof item.text === "string",
          )
          .map((item) => item.text)
          .join("\n\n")
      : "";

  if (!text.trim()) {
    return NextResponse.json(
      { error: "No text returned from Anthropic" },
      { status: 502 },
    );
  }

  return NextResponse.json({ text });
}
