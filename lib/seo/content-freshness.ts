export type FreshnessPrecision = "month" | "date";

export type FreshnessEntry = {
  isoDate: `${number}-${number}-${number}`;
  precision: FreshnessPrecision;
};

export const CONTENT_FRESHNESS = {
  guidesPages: {
    isoDate: "2026-04-25",
    precision: "month",
  },
  start: {
    isoDate: "2026-04-25",
    precision: "month",
  },
  parentEmailRiskChecker: {
    isoDate: "2026-04-25",
    precision: "month",
  },
  aiSearchPages: {
    isoDate: "2026-04-25",
    precision: "month",
  },
  programmaticPages: {
    isoDate: "2026-04-25",
    precision: "month",
  },
  comparisonPages: {
    isoDate: "2026-04-25",
    precision: "month",
  },
  matrixPages: {
    isoDate: "2026-04-25",
    precision: "month",
  },
  scenarioPages: {
    isoDate: "2026-04-25",
    precision: "month",
  },
  teacherWritingPages: {
    isoDate: "2026-04-25",
    precision: "month",
  },
  regionalTeacherWritingPages: {
    isoDate: "2026-04-25",
    precision: "month",
  },
} as const satisfies Record<string, FreshnessEntry>;

export function parseFreshnessDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00.000Z`);
}

export function toSchemaDate(isoDate: string) {
  return parseFreshnessDate(isoDate).toISOString();
}
