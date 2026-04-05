import {
  parentEmailRiskSignals,
  type Signal,
  type SignalCategory,
} from "@/lib/parent-email-risk/signals";

type ToneClass = "accusatory" | "defensive" | "clinical" | "collaborative";
type TopicSensitivity = "high" | "medium" | "low";
type RiskLevel = "low" | "medium" | "high";

export type ParentEmailRiskIssue = {
  id: string;
  label: string;
  category: string;
  matchedPhrase?: string;
};

export type ParentEmailRiskResult = {
  riskScore: number;
  riskLevel: RiskLevel;
  issuesDetected: ParentEmailRiskIssue[];
  saferVersion: string;
};

type FiredSignal = Signal & {
  adjustedWeight: number;
  matchedPhrase?: string;
};

type ProfessionalRiskFlag = {
  signalId: string;
  label: string;
  matchedPhrase: string;
};

type ReactionForecast = {
  collaborative: number;
  concerned: number;
  defensive: number;
  hostile: number;
  confused: number;
};

type InternalAnalysis = {
  riskScore: number;
  riskLevel: RiskLevel;
  firedSignals: FiredSignal[];
  professionalRiskFlags: ProfessionalRiskFlag[];
  toneClass: ToneClass;
  topicSensitivity: TopicSensitivity;
  reactionForecast: ReactionForecast;
  explanationLines: string[];
  structuralImbalance: boolean;
};

const NEGATIVE_CATEGORIES = new Set<SignalCategory>([
  "accusation",
  "escalation",
  "frustration",
  "negative_generalisation",
  "prescriptive_demand",
]);

const CATEGORY_CAPS: Partial<Record<SignalCategory, number>> = {
  accusation: 30,
  escalation: 25,
  frustration: 15,
  negative_generalisation: 20,
  prescriptive_demand: 20,
  emotional_coldness: 10,
};

const TOPIC_MULTIPLIERS: Record<TopicSensitivity, number> = {
  high: 1.5,
  medium: 1.2,
  low: 1,
};

const TONE_MODIFIERS: Record<ToneClass, number> = {
  accusatory: 30,
  defensive: 20,
  clinical: 5,
  collaborative: -20,
};

const TOPIC_RULES = {
  high: [
    "fight",
    "hit",
    "aggression",
    "aggressive",
    "bullying",
    "bully",
    "excluded",
    "exclusion",
    "safeguarding",
    "attendance",
    "absent",
    "ADHD",
    "SEN",
    "learning difficulty",
    "failed",
    "failing",
    "suspended",
    "suspension",
    "incident",
  ],
  medium: [
    "homework",
    "disruptive",
    "disruption",
    "late",
    "missing equipment",
    "behaviour",
    "distraction",
    "unfocused",
  ],
} as const;

const REACTION_LADDER: Array<keyof ReactionForecast> = [
  "hostile",
  "defensive",
  "confused",
  "concerned",
  "collaborative",
];

const REACTION_ADJUSTMENTS: Record<string, Partial<ReactionForecast>> = {
  acc_your_child_negative: { defensive: 20, hostile: 10 },
  acc_character_claim: { defensive: 25, hostile: 15 },
  acc_label_attachment: { hostile: 30, defensive: 20 },
  acc_refusal_language: { defensive: 15 },
  acc_judgement_label: { defensive: 10 },
  esc_consequence_framing: { hostile: 25, defensive: 10 },
  esc_administrative_threat: { hostile: 20 },
  esc_formal_documentation: { hostile: 15 },
  pre_parental_directive: { hostile: 20, defensive: 10 },
  fru_exhaustion: { defensive: 10, concerned: 10 },
  fru_repetition_fatigue: { defensive: 15 },
  neg_state_claim: { defensive: 10, confused: 5 },
  cold_no_collaboration: { confused: 15, defensive: 5 },
  cold_no_greeting: { defensive: 5 },
  mit_collaborative_opener: { collaborative: 20, concerned: 10 },
  mit_evidence_phrasing: { collaborative: 15, concerned: 10 },
  mit_positive_observation: { collaborative: 20 },
  mit_meeting_invitation: { collaborative: 15 },
  mit_empathy: { collaborative: 10, concerned: 5 },
};

const CATEGORY_REWRITE_ACTIONS: Record<
  Exclude<SignalCategory, "mitigating" | "professional_risk">,
  string
> = {
  accusation: "replace with observation-based phrasing",
  escalation: "soften to a collaborative next step",
  frustration: "remove emotionally charged phrasing",
  negative_generalisation: "replace with a specific, time-bounded observation",
  prescriptive_demand: "replace with a collaborative invitation",
  emotional_coldness: "add a warmer opener or collaborative close",
};

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const DEFAULT_ANTHROPIC_MODEL = "claude-sonnet-4-20250514";
const MAX_REWRITE_PASSES = 2;
const DANGEROUS_REWRITE_PATTERNS = [
  /\bbrat\b/i,
  /\bidiot\b/i,
  /\bstupid\b/i,
  /\blazy\b/i,
  /\bthrow (him|her|them) out\b/i,
  /\bthrow .* out of (my )?class\b/i,
  /\bwill not hesitate\b/i,
  /\bI expect better\b/i,
  /\bmega disruptive\b/i,
  /\byour kid\b/i,
];

function countWords(rawMessage: string) {
  return rawMessage.trim().split(/\s+/).filter(Boolean).length;
}

function splitSentences(rawMessage: string) {
  const sentences = rawMessage.match(/[^.!?]+[.!?]?/g);
  if (!sentences) {
    return [];
  }

  return sentences.map((sentence) => sentence.trim()).filter(Boolean);
}

function matchesPattern(text: string, pattern: string) {
  return new RegExp(pattern, "i").test(text);
}

function isSignalMatched(signal: Signal, rawMessage: string) {
  if (signal.patterns.length === 0) {
    return false;
  }

  const matchedPatterns = signal.patterns.filter((pattern) =>
    matchesPattern(rawMessage, pattern),
  );

  if (signal.matchMode === "absence") {
    return matchedPatterns.length === 0;
  }

  if (signal.matchMode === "all") {
    return matchedPatterns.length === signal.patterns.length;
  }

  return matchedPatterns.length > 0;
}

function hasEdgeSentenceMatch(signal: Signal, sentences: string[]) {
  if (signal.matchMode === "absence" || sentences.length === 0) {
    return false;
  }

  const edgeSentences =
    sentences.length === 1
      ? [sentences[0]]
      : [sentences[0], sentences[sentences.length - 1]];

  return edgeSentences.some((sentence) =>
    signal.patterns.some((pattern) => matchesPattern(sentence, pattern)),
  );
}

function getMatchedPhrase(rawMessage: string, patterns: string[]) {
  let bestMatch: RegExpExecArray | null = null;

  for (const pattern of patterns) {
    const match = new RegExp(pattern, "i").exec(rawMessage);

    if (!match?.[0]) {
      continue;
    }

    if (!bestMatch) {
      bestMatch = match;
      continue;
    }

    const bestIndex = bestMatch.index ?? Number.POSITIVE_INFINITY;
    const currentIndex = match.index ?? Number.POSITIVE_INFINITY;

    if (currentIndex < bestIndex) {
      bestMatch = match;
      continue;
    }

    if (currentIndex === bestIndex && match[0].length > bestMatch[0].length) {
      bestMatch = match;
    }
  }

  return bestMatch?.[0] ?? null;
}

function detectSignals(rawMessage: string): FiredSignal[] {
  const sentences = splitSentences(rawMessage);

  return parentEmailRiskSignals
    .filter((signal) => isSignalMatched(signal, rawMessage))
    .map((signal) => ({
      ...signal,
      adjustedWeight:
        signal.proximityBoost && hasEdgeSentenceMatch(signal, sentences)
          ? signal.weight * 1.25
          : signal.weight,
      matchedPhrase:
        signal.matchMode === "absence"
          ? undefined
          : (getMatchedPhrase(rawMessage, signal.patterns) ?? undefined),
    }));
}

function detectProfessionalRiskFlags(
  rawMessage: string,
): ProfessionalRiskFlag[] {
  return parentEmailRiskSignals
    .filter((signal) => signal.category === "professional_risk")
    .map((signal) => {
      const matchedPhrase = getMatchedPhrase(rawMessage, signal.patterns);

      if (!matchedPhrase) {
        return null;
      }

      return {
        signalId: signal.id,
        label: signal.label,
        matchedPhrase,
      };
    })
    .filter((flag): flag is ProfessionalRiskFlag => Boolean(flag));
}

function signalMatchesSentence(signal: FiredSignal, sentence: string) {
  if (signal.patterns.length === 0 || signal.matchMode === "absence") {
    return false;
  }

  const matchedPatternCount = signal.patterns.filter((pattern) =>
    new RegExp(pattern, "i").test(sentence),
  ).length;

  if (signal.matchMode === "all") {
    return matchedPatternCount === signal.patterns.length;
  }

  return matchedPatternCount > 0;
}

function detectStructuralImbalance(
  rawMessage: string,
  firedSignals: FiredSignal[],
) {
  const sentences = splitSentences(rawMessage);

  const negativeCount = sentences.filter((sentence) =>
    firedSignals.some(
      (signal) =>
        NEGATIVE_CATEGORIES.has(signal.category) &&
        signalMatchesSentence(signal, sentence),
    ),
  ).length;

  const positiveCount = sentences.filter((sentence) =>
    firedSignals.some(
      (signal) =>
        signal.category === "mitigating" &&
        signalMatchesSentence(signal, sentence),
    ),
  ).length;

  return negativeCount > 2 && positiveCount === 0;
}

function detectTopicSensitivity(rawMessage: string): TopicSensitivity {
  const lower = rawMessage.toLowerCase();

  if (
    TOPIC_RULES.high.some((keyword) => lower.includes(keyword.toLowerCase()))
  ) {
    return "high";
  }

  if (
    TOPIC_RULES.medium.some((keyword) => lower.includes(keyword.toLowerCase()))
  ) {
    return "medium";
  }

  return "low";
}

function getCappedSignalSum(firedSignals: FiredSignal[]) {
  const categoryTotals = new Map<SignalCategory, number>();

  for (const signal of firedSignals) {
    if (signal.category === "professional_risk") {
      continue;
    }

    categoryTotals.set(
      signal.category,
      (categoryTotals.get(signal.category) ?? 0) + signal.adjustedWeight,
    );
  }

  let cappedSum = 0;

  for (const [category, total] of categoryTotals.entries()) {
    if (category === "mitigating") {
      cappedSum += total;
      continue;
    }

    const cap = CATEGORY_CAPS[category];
    cappedSum += cap === undefined ? total : Math.min(total, cap);
  }

  return cappedSum;
}

function getRiskLevel(riskScore: number): RiskLevel {
  if (riskScore <= 35) {
    return "low";
  }

  if (riskScore <= 65) {
    return "medium";
  }

  return "high";
}

function getNonMitigatingCategoryCount(firedSignals: FiredSignal[]) {
  return new Set(
    firedSignals
      .filter(
        (signal) =>
          signal.category !== "mitigating" &&
          signal.category !== "professional_risk",
      )
      .map((signal) => signal.category),
  ).size;
}

function scoreSafetySignals(
  firedSignals: FiredSignal[],
  topicSensitivity: TopicSensitivity,
  structuralImbalance: boolean,
  toneModifier: number,
) {
  const cappedSignalSum = getCappedSignalSum(firedSignals);
  const rawScore =
    cappedSignalSum + toneModifier + (structuralImbalance ? 10 : 0);
  const riskScore = Math.min(
    100,
    Math.max(0, rawScore * TOPIC_MULTIPLIERS[topicSensitivity]),
  );

  let riskLevel = getRiskLevel(riskScore);

  if (riskLevel === "high" && getNonMitigatingCategoryCount(firedSignals) < 2) {
    riskLevel = "medium";
  }

  return {
    riskScore,
    riskLevel,
  };
}

function normalizeWeights(weights: ReactionForecast): ReactionForecast {
  const sanitizedWeights = REACTION_LADDER.reduce((normalized, key) => {
    normalized[key] = Math.max(weights[key] ?? 0, 0);
    return normalized;
  }, {} as ReactionForecast);

  const total = REACTION_LADDER.reduce(
    (sum, key) => sum + sanitizedWeights[key],
    0,
  );

  if (total <= 0) {
    const equalShare = 100 / REACTION_LADDER.length;

    return REACTION_LADDER.reduce((normalized, key) => {
      normalized[key] = equalShare;
      return normalized;
    }, {} as ReactionForecast);
  }

  return REACTION_LADDER.reduce((normalized, key) => {
    normalized[key] = (sanitizedWeights[key] / total) * 100;
    return normalized;
  }, {} as ReactionForecast);
}

function suppressLowHostile(normalizedWeights: ReactionForecast) {
  if (normalizedWeights.hostile > 15) {
    return normalizedWeights;
  }

  const redistributedWeights = { ...normalizedWeights };
  const hostileWeight = redistributedWeights.hostile;
  redistributedWeights.hostile = 0;

  const otherKeys = REACTION_LADDER.filter((key) => key !== "hostile");
  const otherTotal = otherKeys.reduce(
    (sum, key) => sum + redistributedWeights[key],
    0,
  );

  for (const key of otherKeys) {
    redistributedWeights[key] +=
      (redistributedWeights[key] / otherTotal) * hostileWeight;
  }

  return redistributedWeights;
}

function roundForecast(weights: ReactionForecast): ReactionForecast {
  const roundedEntries = REACTION_LADDER.map((key) => ({
    key,
    rounded: Math.round(weights[key]),
    delta: weights[key] - Math.round(weights[key]),
  }));

  let total = roundedEntries.reduce((sum, entry) => sum + entry.rounded, 0);

  if (total < 100) {
    const ordered = [...roundedEntries].sort((a, b) => b.delta - a.delta);

    for (const entry of ordered) {
      if (total >= 100) {
        break;
      }
      entry.rounded += 1;
      total += 1;
    }
  }

  if (total > 100) {
    const ordered = [...roundedEntries].sort((a, b) => a.delta - b.delta);

    for (const entry of ordered) {
      if (total <= 100) {
        break;
      }
      entry.rounded -= 1;
      total -= 1;
    }
  }

  return roundedEntries.reduce((forecast, entry) => {
    forecast[entry.key] = entry.rounded;
    return forecast;
  }, {} as ReactionForecast);
}

function forecastReactions(firedSignalIds: string[], wordCount: number) {
  const weights: ReactionForecast = {
    collaborative: 20,
    concerned: 20,
    defensive: 20,
    hostile: 20,
    confused: 20,
  };

  for (const signalId of firedSignalIds) {
    const adjustments = REACTION_ADJUSTMENTS[signalId];

    if (!adjustments) {
      continue;
    }

    for (const key of REACTION_LADDER) {
      weights[key] += adjustments[key] ?? 0;
    }
  }

  if (!firedSignalIds.includes("mit_evidence_phrasing") && wordCount > 20) {
    weights.confused += 15;
  }

  return roundForecast(suppressLowHostile(normalizeWeights(weights)));
}

function buildExplanationLines(
  firedSignals: FiredSignal[],
  structuralImbalance: boolean,
) {
  const explanationLines: string[] = [];

  if (structuralImbalance) {
    explanationLines.push(
      "Message contains only negative observations and no positive context.",
    );
  }

  const remainingSlots = 4 - explanationLines.length;
  if (remainingSlots <= 0) {
    return explanationLines;
  }

  const signalLines = firedSignals
    .slice()
    .sort((left, right) => right.adjustedWeight - left.adjustedWeight)
    .map((signal) => {
      if (
        signal.category === "mitigating" ||
        signal.category === "professional_risk"
      ) {
        return null;
      }

      return `${signal.label} detected - ${CATEGORY_REWRITE_ACTIONS[signal.category]}`;
    })
    .filter((line): line is string => Boolean(line))
    .slice(0, remainingSlots);

  return [...explanationLines, ...signalLines];
}

function getFriendlyLabel(signal: {
  id: string;
  category?: string;
  label: string;
}) {
  const normalizedLabel = signal.label.trim().toLowerCase();

  if (signal.id === "cold_no_collaboration") {
    return "Missing collaboration invitation";
  }

  if (signal.id === "cold_no_greeting") {
    return "Missing greeting";
  }

  if (signal.id === "esc_administrative_threat") {
    return "Administrative escalation language";
  }

  if (signal.id === "pro_medical_speculation") {
    return "Medical or diagnostic speculation";
  }

  if (signal.id === "pro_motive_attribution") {
    return "Motive attribution";
  }

  if (signal.id === "pro_psychological_interpretation") {
    return "Psychological interpretation";
  }

  if (signal.id === "pro_legal_certainty") {
    return "Overstatement of certainty";
  }

  if (normalizedLabel === "no collaboration invitation") {
    return "Missing collaboration invitation";
  }

  if (normalizedLabel === "no greeting") {
    return "Missing greeting";
  }

  if (
    signal.category === "accusation" ||
    signal.category === "negative_generalisation"
  ) {
    return "Judgement wording";
  }

  if (normalizedLabel === "absolute negative statement") {
    return "Strong negative wording";
  }

  return signal.label;
}

function buildIssuesDetected(
  firedSignals: FiredSignal[],
  professionalRiskFlags: ProfessionalRiskFlag[],
) {
  const deduped = new Map<
    string,
    ParentEmailRiskIssue & { priority: number }
  >();

  for (const signal of firedSignals) {
    if (signal.category === "mitigating") {
      continue;
    }

    const label = getFriendlyLabel(signal);
    const key = `${signal.category}:${label}`;
    const nextIssue = {
      id: signal.id,
      label,
      category: signal.category,
      matchedPhrase: signal.matchedPhrase,
      priority: Math.abs(signal.adjustedWeight),
    };
    const current = deduped.get(key);

    if (!current || nextIssue.priority > current.priority) {
      deduped.set(key, nextIssue);
    }
  }

  for (const flag of professionalRiskFlags) {
    const label = getFriendlyLabel({ id: flag.signalId, label: flag.label });
    const key = `professional_risk:${label}`;
    const nextIssue = {
      id: flag.signalId,
      label,
      category: "professional_risk",
      matchedPhrase: flag.matchedPhrase,
      priority: 15,
    };
    const current = deduped.get(key);

    if (!current) {
      deduped.set(key, nextIssue);
    }
  }

  return [...deduped.values()]
    .sort((left, right) => right.priority - left.priority)
    .map(({ priority, ...issue }) => issue);
}

function fallbackToneClassify(rawMessage: string, firedSignals: FiredSignal[]) {
  const lower = rawMessage.toLowerCase();
  const categories = new Set(firedSignals.map((signal) => signal.category));
  let toneClass: ToneClass = "clinical";

  if (
    /for the record|i already told|as i(?:'ve| have) mentioned|to be blunt|frankly|honestly/.test(
      lower,
    ) ||
    categories.has("frustration")
  ) {
    toneClass = "defensive";
  }

  if (
    categories.has("accusation") ||
    categories.has("negative_generalisation") ||
    categories.has("prescriptive_demand") ||
    categories.has("escalation")
  ) {
    toneClass = "accusatory";
  }

  if (
    categories.has("mitigating") &&
    !categories.has("accusation") &&
    !categories.has("prescriptive_demand") &&
    !categories.has("escalation")
  ) {
    toneClass = "collaborative";
  }

  return {
    toneClass,
    toneModifier: TONE_MODIFIERS[toneClass],
  };
}

function extractAnthropicText(payload: unknown) {
  const content = (
    payload as { content?: Array<{ type?: string; text?: string }> }
  )?.content;

  if (!Array.isArray(content)) {
    return "";
  }

  return content
    .filter((item) => item?.type === "text" && typeof item.text === "string")
    .map((item) => item.text)
    .join(" ")
    .trim();
}

async function classifyTone(
  rawMessage: string,
  firedSignals: FiredSignal[],
  options: { skipApi?: boolean } = {},
) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey || options.skipApi) {
    return fallbackToneClassify(rawMessage, firedSignals);
  }

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || DEFAULT_ANTHROPIC_MODEL,
        max_tokens: 10,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Classify the overall tone of this teacher-parent message.\nReturn exactly one word from this list:\naccusatory | defensive | clinical | collaborative\n\nMessage:\n${rawMessage}`,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Tone classification failed with ${response.status}`);
    }

    const toneClassRaw = extractAnthropicText(
      await response.json(),
    ).toLowerCase();
    const toneClass: ToneClass =
      toneClassRaw === "accusatory" ||
      toneClassRaw === "defensive" ||
      toneClassRaw === "clinical" ||
      toneClassRaw === "collaborative"
        ? toneClassRaw
        : "clinical";

    return {
      toneClass,
      toneModifier: TONE_MODIFIERS[toneClass],
    };
  } catch {
    return fallbackToneClassify(rawMessage, firedSignals);
  }
}

function applyProfessionalRiskFloor(
  riskScore: number,
  riskLevel: RiskLevel,
  professionalRiskFlags: ProfessionalRiskFlag[],
): { riskScore: number; riskLevel: RiskLevel } {
  if (professionalRiskFlags.length === 0) {
    return { riskScore, riskLevel };
  }

  const floor = professionalRiskFlags.length > 1 ? 72 : 58;
  const elevatedScore = Math.max(riskScore, floor);
  const elevatedLevel: RiskLevel =
    professionalRiskFlags.length > 1
      ? "high"
      : elevatedScore <= 65
        ? "medium"
        : "high";

  return {
    riskScore: elevatedScore,
    riskLevel:
      riskLevel === "high"
        ? "high"
        : elevatedLevel === "high"
          ? "high"
          : "medium",
  };
}

async function runInternalAnalysis(
  rawMessage: string,
  options: { skipToneApi?: boolean } = {},
): Promise<InternalAnalysis> {
  const firedSignals = detectSignals(rawMessage);
  const topicSensitivity = detectTopicSensitivity(rawMessage);
  const structuralImbalance = detectStructuralImbalance(
    rawMessage,
    firedSignals,
  );
  const { toneClass, toneModifier } = await classifyTone(
    rawMessage,
    firedSignals,
    {
      skipApi: options.skipToneApi,
    },
  );
  const scored = scoreSafetySignals(
    firedSignals,
    topicSensitivity,
    structuralImbalance,
    toneModifier,
  );
  const professionalRiskFlags = detectProfessionalRiskFlags(rawMessage);
  const elevated = applyProfessionalRiskFloor(
    scored.riskScore,
    scored.riskLevel,
    professionalRiskFlags,
  );

  return {
    riskScore: elevated.riskScore,
    riskLevel: elevated.riskLevel,
    firedSignals,
    professionalRiskFlags,
    toneClass,
    topicSensitivity,
    reactionForecast: forecastReactions(
      firedSignals.map((signal) => signal.id),
      countWords(rawMessage),
    ),
    explanationLines: buildExplanationLines(firedSignals, structuralImbalance),
    structuralImbalance,
  };
}

function createRedactionMap(rawMessage: string) {
  const replacements: Array<{ token: string; value: string }> = [];
  let counter = 0;

  const pushReplacement = (value: string, prefix: string) => {
    counter += 1;
    const token = `[[${prefix}_${counter}]]`;
    replacements.push({ token, value });
    return token;
  };

  const redacted = rawMessage
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, (value) =>
      pushReplacement(value, "EMAIL"),
    )
    .replace(
      /(?:(?:\+?\d{1,3}[\s-]?)?(?:\(?\d{2,4}\)?[\s-]?)?\d{3,4}[\s-]?\d{3,4})/g,
      (value) => {
        const digits = value.replace(/\D/g, "");
        return digits.length >= 7 ? pushReplacement(value, "PHONE") : value;
      },
    )
    .replace(/https?:\/\/[^\s]+/gi, (value) => pushReplacement(value, "LINK"));

  return {
    redacted,
    restore(text: string) {
      return replacements.reduce(
        (output, replacement) =>
          output.replaceAll(replacement.token, replacement.value),
        text,
      );
    },
  };
}

function buildRewritePrompt(
  originalDraft: string,
  analysis: InternalAnalysis,
  passNumber: number,
) {
  const issueSummary = buildIssuesDetected(
    analysis.firedSignals,
    analysis.professionalRiskFlags,
  )
    .map((issue) => issue.label)
    .join(", ");

  const professionalRiskLine =
    analysis.professionalRiskFlags.length > 0
      ? "Describe only observable behaviour. Do not diagnose, assign motives, or state certainty beyond what the teacher directly observed."
      : "Keep the wording factual, calm, and proportionate.";

  return [
    "You are Zaza Draft, a calm and risk-aware co-writer for teachers.",
    "Rewrite the teacher's draft parent email so it is safer to send.",
    "Requirements:",
    "- Keep the core facts, concern, and next step.",
    "- Use UK English.",
    "- No em dashes.",
    "- Sound calm, professional, and teacher-authentic.",
    "- Remove blame, threat, pressure, or emotionally charged phrasing.",
    "- Prefer observation-based language over judgement.",
    "- Do not invent facts, dates, meetings, or school actions.",
    "- Return only the rewritten email body.",
    professionalRiskLine,
    `Pass: ${passNumber}`,
    `Current risk level: ${analysis.riskLevel}`,
    `Main issues: ${issueSummary || "tone risk"}`,
    ...(analysis.explanationLines.length
      ? [
          "Rewrite focus:",
          ...analysis.explanationLines.map((line) => `- ${line}`),
        ]
      : []),
    "",
    "Teacher draft:",
    originalDraft,
  ].join("\n");
}

function normalizeRewrite(rawText: string) {
  return rawText
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function sentenceLooksUnsafe(sentence: string) {
  return DANGEROUS_REWRITE_PATTERNS.some((pattern) => pattern.test(sentence));
}

function splitLines(rawText: string) {
  return rawText
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim());
}

function parseEmailParts(originalDraft: string) {
  const lines = splitLines(originalDraft).filter(Boolean);

  let greeting = "Hi,";
  let signoff = "Regards,";
  let sender = "";

  if (
    lines.length > 0 &&
    /^(dear|hello|hi|good morning|good afternoon)\b/i.test(lines[0])
  ) {
    greeting = lines[0];
    lines.shift();
  }

  const signoffIndex = lines.findIndex((line) =>
    /^(regards|kind regards|best|many thanks|thank you|sincerely)[,]?$/i.test(
      line,
    ),
  );

  if (signoffIndex >= 0) {
    signoff = lines[signoffIndex];
    sender = lines
      .slice(signoffIndex + 1)
      .join(" ")
      .trim();
    lines.splice(signoffIndex);
  }

  return {
    greeting,
    signoff,
    sender,
    body: lines.join(" ").trim(),
  };
}

function inferChildReference(rawText: string) {
  const lower = rawText.toLowerCase();

  if (lower.includes("your daughter")) {
    return {
      childLabel: "your daughter",
      subjectPronoun: "she",
      objectPronoun: "her",
    };
  }

  if (lower.includes("your son")) {
    return {
      childLabel: "your son",
      subjectPronoun: "he",
      objectPronoun: "him",
    };
  }

  return {
    childLabel: "your child",
    subjectPronoun: "they",
    objectPronoun: "them",
  };
}

function cleanObservationSentence(sentence: string) {
  if (!sentence || sentenceLooksUnsafe(sentence)) {
    return null;
  }

  let cleaned = sentence
    .replace(/\bHonestly,?\s*/gi, "")
    .replace(/\bFrankly,?\s*/gi, "")
    .replace(/\bto be blunt,?\s*/gi, "")
    .replace(/\bI need to be direct\.?\s*/gi, "")
    .replace(/\bIn fact,?\s*/gi, "")
    .replace(
      /\byour child has ignored instructions\b/gi,
      "your child has found it difficult to follow instructions",
    )
    .replace(
      /\byour daughter has ignored instructions\b/gi,
      "your daughter has found it difficult to follow instructions",
    )
    .replace(
      /\byour son has ignored instructions\b/gi,
      "your son has found it difficult to follow instructions",
    )
    .replace(
      /\bhe has ignored instructions\b/gi,
      "he has found it difficult to follow instructions",
    )
    .replace(
      /\bshe has ignored instructions\b/gi,
      "she has found it difficult to follow instructions",
    )
    .replace(
      /\bthey have ignored instructions\b/gi,
      "they have found it difficult to follow instructions",
    )
    .replace(
      /\bit is becoming difficult for the class\b/gi,
      "this has been affecting the class",
    )
    .replace(/\bdisruptive\b/gi, "finding it difficult to stay settled")
    .trim();

  cleaned = cleaned.replace(/\s+/g, " ").trim();

  if (!cleaned || sentenceLooksUnsafe(cleaned)) {
    return null;
  }

  if (!/[.!?]$/.test(cleaned)) {
    cleaned = `${cleaned}.`;
  }

  return cleaned;
}

function buildObservationParagraph(body: string, childLabel: string) {
  const sentences = splitSentences(body);

  for (const sentence of sentences) {
    const cleaned = cleanObservationSentence(sentence);
    if (cleaned) {
      return cleaned;
    }
  }

  return `There have been a few moments recently where ${childLabel} has found it difficult to follow instructions in class, and I wanted to make you aware of it.`;
}

function buildSupportParagraph(
  body: string,
  childLabel: string,
  objectPronoun: string,
) {
  const timePhrase = /\b(tonight|this evening|today)\b/i.test(body)
    ? " this evening"
    : "";

  if (/speak to (him|her|them|your child|your daughter|your son)/i.test(body)) {
    return `I would appreciate your support in speaking with ${objectPronoun}${timePhrase} so we can reinforce the expectations together.`;
  }

  if (/support|work together|help/i.test(body)) {
    return `I would appreciate your support so we can help ${childLabel} reset and move forward positively.`;
  }

  return `I wanted to share this with you so we can support ${childLabel} together and keep things moving in a positive direction.`;
}

function buildNextStepParagraph(body: string) {
  if (
    /if this carries on|if this continues|take this further|formal|principal|head teacher|complaint/i.test(
      body,
    )
  ) {
    return "If this pattern continues, we may need to discuss the next steps together, but I hope we can address it early.";
  }

  return "If it would be helpful, I am happy to discuss the best next step together.";
}

function buildFallbackRewrite(
  originalDraft: string,
  analysis: InternalAnalysis,
) {
  const { greeting, signoff, sender, body } = parseEmailParts(originalDraft);
  const { childLabel, objectPronoun } = inferChildReference(originalDraft);

  const observation = buildObservationParagraph(body, childLabel)
    .replace(/\bdeliberately\b/gi, "")
    .replace(/\bintentionally\b/gi, "")
    .trim();

  const support = buildSupportParagraph(body, childLabel, objectPronoun);
  const nextStep = buildNextStepParagraph(body);

  const rewritten = [
    greeting,
    "",
    "I wanted to share a concern about what I have observed in class recently.",
    "",
    observation,
    "",
    support,
    "",
    nextStep,
    "",
    signoff,
    sender,
  ]
    .filter(Boolean)
    .join("\n");

  return normalizeRewrite(rewritten);
}

function candidatePenalty(analysis: InternalAnalysis, draft: string) {
  const levelPenalty =
    analysis.riskLevel === "high"
      ? 200
      : analysis.riskLevel === "medium"
        ? 80
        : 0;

  return (
    analysis.riskScore +
    levelPenalty +
    analysis.professionalRiskFlags.length * 120 +
    analysis.firedSignals.filter((signal) => signal.category !== "mitigating")
      .length *
      12 +
    (DANGEROUS_REWRITE_PATTERNS.some((pattern) => pattern.test(draft))
      ? 500
      : 0)
  );
}

async function chooseBestRewriteCandidate(candidates: string[]) {
  const uniqueCandidates = Array.from(
    new Set(
      candidates
        .map((candidate) => normalizeRewrite(candidate))
        .filter(Boolean),
    ),
  );

  const evaluated = await Promise.all(
    uniqueCandidates.map(async (draft) => ({
      draft,
      analysis: await runInternalAnalysis(draft, { skipToneApi: true }),
    })),
  );

  evaluated.sort((left, right) => {
    return (
      candidatePenalty(left.analysis, left.draft) -
      candidatePenalty(right.analysis, right.draft)
    );
  });

  return evaluated[0] ?? null;
}

async function rewriteWithAnthropic(
  originalDraft: string,
  analysis: InternalAnalysis,
  passNumber: number,
) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return null;
  }

  const { redacted, restore } = createRedactionMap(originalDraft);

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || DEFAULT_ANTHROPIC_MODEL,
        max_tokens: 700,
        temperature: 0.2,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: buildRewritePrompt(redacted, analysis, passNumber),
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      return null;
    }

    const text = extractAnthropicText(await response.json());
    if (!text) {
      return null;
    }

    return normalizeRewrite(restore(text));
  } catch {
    return null;
  }
}

async function buildSaferVersion(
  originalDraft: string,
  firstAnalysis: InternalAnalysis,
) {
  const fallbackDraft = buildFallbackRewrite(originalDraft, firstAnalysis);
  const firstAiDraft = await rewriteWithAnthropic(
    originalDraft,
    firstAnalysis,
    1,
  );

  let bestCandidate = await chooseBestRewriteCandidate(
    [fallbackDraft, firstAiDraft].filter((draft): draft is string =>
      Boolean(draft),
    ),
  );

  if (!bestCandidate) {
    return fallbackDraft;
  }

  for (let pass = 2; pass <= MAX_REWRITE_PASSES; pass += 1) {
    if (
      bestCandidate.analysis.riskLevel === "low" &&
      bestCandidate.analysis.professionalRiskFlags.length === 0
    ) {
      break;
    }

    const refinedDraft = await rewriteWithAnthropic(
      bestCandidate.draft,
      bestCandidate.analysis,
      pass,
    );

    if (!refinedDraft) {
      break;
    }

    const nextBestCandidate = await chooseBestRewriteCandidate([
      bestCandidate.draft,
      fallbackDraft,
      refinedDraft,
    ]);

    if (!nextBestCandidate) {
      break;
    }

    bestCandidate = nextBestCandidate;
  }

  return bestCandidate.draft;
}

function normalizeInput(rawDraft: string) {
  return rawDraft
    .replace(/\r\n/g, "\n")
    .replace(/\u00a0/g, " ")
    .trim();
}

export async function analyzeParentEmailRisk(
  rawDraft: string,
): Promise<ParentEmailRiskResult> {
  const normalizedDraft = normalizeInput(rawDraft);
  const analysis = await runInternalAnalysis(normalizedDraft);
  const issuesDetected = buildIssuesDetected(
    analysis.firedSignals,
    analysis.professionalRiskFlags,
  );
  const saferVersion = await buildSaferVersion(normalizedDraft, analysis);

  return {
    riskScore: Math.round(analysis.riskScore),
    riskLevel: analysis.riskLevel,
    issuesDetected,
    saferVersion,
  };
}
