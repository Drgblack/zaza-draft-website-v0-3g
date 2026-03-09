import { cache } from "react";

export type HowToKeyword = {
  slug: string;
  primaryKeyword: string;
  secondaryKeywords: string;
  yearGroup: string;
  subject: string;
  modifier: string;
};

export type GeneratedHowToArticle = {
  title: string;
  intro: string;
  whyChallenging: string;
  examplePhrases: string[];
  tips: string[];
  mistakes: string[];
  zazaDraftSection: string;
  conclusion: string;
};

const ARTICLE_SCHEMA_DESCRIPTION =
  "Return valid JSON only. No markdown fences. Use this exact schema: " +
  '{"title":"string","intro":"string","whyChallenging":"string","examplePhrases":["string"],"tips":["string"],"mistakes":["string"],"zazaDraftSection":"string","conclusion":"string"}';

function normaliseArticle(raw: GeneratedHowToArticle): GeneratedHowToArticle {
  return {
    title: String(raw.title || "").trim(),
    intro: String(raw.intro || "").trim(),
    whyChallenging: String(raw.whyChallenging || "").trim(),
    examplePhrases: Array.isArray(raw.examplePhrases)
      ? raw.examplePhrases
          .map((item) => String(item).trim())
          .filter(Boolean)
          .slice(0, 10)
      : [],
    tips: Array.isArray(raw.tips)
      ? raw.tips
          .map((item) => String(item).trim())
          .filter(Boolean)
          .slice(0, 5)
      : [],
    mistakes: Array.isArray(raw.mistakes)
      ? raw.mistakes
          .map((item) => String(item).trim())
          .filter(Boolean)
          .slice(0, 4)
      : [],
    zazaDraftSection: String(raw.zazaDraftSection || "").trim(),
    conclusion: String(raw.conclusion || "").trim(),
  };
}

function extractJson(text: string) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Anthropic response did not contain JSON.");
  }

  return text.slice(start, end + 1);
}

async function generateArticleInternal(
  keyword: HowToKeyword,
): Promise<GeneratedHowToArticle> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not configured.");
  }

  const systemPrompt = `You are an SEO content writer for zazadraft.com, a teacher-focused AI writing assistant that helps UK primary school teachers write report comments and professional parent emails.

Write in UK English with a professional, calm, warm, practical tone for teachers.
Do not use em dashes.
Keep all writing genuinely helpful, concise, and specific.
${ARTICLE_SCHEMA_DESCRIPTION}`;

  const userPrompt = `Create a complete static SEO article for this keyword set.

Primary keyword: ${keyword.primaryKeyword}
Secondary keywords: ${keyword.secondaryKeywords}
Year group: ${keyword.yearGroup}
Subject / issue: ${keyword.subject}
Modifier: ${keyword.modifier}
Slug: ${keyword.slug}

Requirements:
- The title must use the primary keyword naturally.
- The intro should be 2-3 short paragraphs.
- The whyChallenging section should be 2-3 short paragraphs.
- examplePhrases must contain exactly 10 ready-to-use phrases.
- tips must contain 3-5 practical bullet points.
- mistakes must contain 3-4 common mistakes.
- zazaDraftSection must be 2 short paragraphs, helpful and honest, not salesy.
- conclusion must include a light CTA to try Zaza Draft.
- Optimise naturally for the primary keyword.
- Suitable for static programmatic SEO pages for teachers.

Return JSON only.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2200,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    }),
  });

  const data = (await response.json()) as {
    content?: Array<{ type?: string; text?: string }>;
    error?: { message?: string };
  };

  if (!response.ok) {
    throw new Error(data.error?.message || "Anthropic API request failed.");
  }

  const text = (data.content || [])
    .filter((item) => item.type === "text" && typeof item.text === "string")
    .map((item) => item.text)
    .join("\n\n");

  const parsed = JSON.parse(extractJson(text)) as GeneratedHowToArticle;
  const article = normaliseArticle(parsed);

  if (
    !article.title ||
    !article.intro ||
    !article.whyChallenging ||
    article.examplePhrases.length !== 10 ||
    article.tips.length < 3 ||
    article.mistakes.length < 3 ||
    !article.zazaDraftSection ||
    !article.conclusion
  ) {
    throw new Error("Anthropic returned an incomplete article payload.");
  }

  return article;
}

export const generateArticle = cache(async (keyword: HowToKeyword) =>
  generateArticleInternal(keyword),
);
