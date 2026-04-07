export type DisplayRiskLevel = "low" | "medium" | "high";
export type CheckerLocale = "en" | "de";

export type CheckerCopy = {
  demoDraft: string;
  pageTitle: string;
  introTop: string;
  textareaPlaceholder: string;
  textareaAriaLabel: string;
  inputLabel: string;
  submitButton: string;
  trustLine: string;
  emptyState: string;
  shortInputGuard: string;
  loadingCopy: string;
  loadingBody: string;
  processingError: string;
  resultTitle: string;
  resultPlaceholderTitle: string;
  resultPlaceholderBody: string;
  riskLevelLabel: string;
  scoreLabel: string;
  lowerRisk: string;
  higherRisk: string;
  issuesTitle: string;
  noMajorRisks: string;
  saferVersionTitle: string;
  saferVersionIntro: string;
  rewriteTrustLine: string;
  whyThisWorksTitle: string;
  whyThisWorksBullets: [string, string, string];
  copySaferVersion: string;
  copied: string;
  resultCtaTitle: string;
  resultCtaBody: string;
  resultCtaButton: string;
  tryAnother: string;
  detailToggleLabel: string;
  originalDraftLabel: string;
  shareTitle: string;
  shareText: string;
  shareHeading: string;
  shareButton: string;
  sharedButton: string;
  copyLink: string;
  linkCopied: string;
  relatabilityTitle: string;
  relatabilityIntro: string;
  relatabilityBullets: string[];
  relatabilityClosing: string;
  howItWorksTitle: string;
  howItWorksSteps: { title: string; body: string }[];
  positioningTitle: string;
  positioningIntro: string;
  positioningBullets: string[];
  positioningClosing: string;
  bottomCtaTitle: string;
  bottomCtaButton: string;
  riskHelperText: string;
  copiedRewriteMessage: string;
  copiedRewriteError: string;
  copiedLinkMessage: string;
  copiedLinkError: string;
  sharedMessage: string;
  reinforcement: Record<DisplayRiskLevel, string>;
  riskLabels: Record<DisplayRiskLevel, string>;
  indicatorLabels: Record<DisplayRiskLevel, string>;
  issueWarnings: Record<string, string>;
};

export const CHECKER_COPY: Record<CheckerLocale, CheckerCopy> = {
  en: {
    demoDraft: `Hi Mrs Khan,

I need to be direct. This is the third time this week that your daughter has ignored instructions and it is becoming difficult for the class.

You need to speak to her tonight because if this carries on we will have to take this further.

Regards,
Ms Reed`,
    pageTitle: "Parent Email Risk Checker",
    introTop:
      "Paste your draft and get a calmer, clearer, more professional version to work from.",
    textareaPlaceholder:
      "Paste the parent email or draft message you are worried about here.",
    textareaAriaLabel: "Parent email draft",
    inputLabel: "Paste your draft",
    submitButton: "Make this safer",
    trustLine:
      "Get a safer version first - one that keeps your point clear while reducing the chance of escalation.",
    emptyState: "Paste a message to check before sending",
    shortInputGuard: "Add a bit more detail so we can assess the tone properly",
    loadingCopy: "Checking your message…",
    loadingBody:
      "Looking for tone risk, escalation triggers, and how the message may land.",
    processingError: "The checker could not process that draft just now.",
    resultTitle: "Safer version",
    resultPlaceholderTitle: "Your result will appear here",
    resultPlaceholderBody:
      "Your score, risk level, issues, and safer version will appear here.",
    riskLevelLabel: "Risk level",
    scoreLabel: "Score",
    lowerRisk: "Lower risk",
    higherRisk: "Higher risk",
    issuesTitle: "What could go wrong",
    noMajorRisks: "No major language risks detected.",
    saferVersionTitle: "Safer version",
    saferVersionIntro:
      "This keeps the message clear and professional while lowering the chance of escalation.",
    rewriteTrustLine:
      "Designed to reduce defensiveness while keeping your message clear.",
    whyThisWorksTitle: "Why this works better",
    whyThisWorksBullets: [
      "keeps your point clear",
      "removes reactive phrasing",
      "sounds more professional in a parent-facing context",
    ],
    copySaferVersion: "Copy safer version",
    copied: "Copied",
    resultCtaTitle: "Continue with Zaza Draft",
    resultCtaBody:
      "If this feels closer to something you could actually send, Zaza Draft is built for the rest of those messages too.",
    resultCtaButton: "Continue with Zaza Draft",
    tryAnother: "Try another draft",
    detailToggleLabel: "See original draft and detailed notes",
    originalDraftLabel: "Original draft",
    shareTitle: "Check a parent email before you send it",
    shareText:
      "This free tool checks whether a parent email may sound too blunt, defensive, or likely to escalate.",
    shareHeading: "Useful? Share the checker with another teacher.",
    shareButton: "Share",
    sharedButton: "Shared",
    copyLink: "Copy link",
    linkCopied: "Link copied",
    relatabilityTitle:
      "If you’ve ever rewritten a parent email 3 times before sending…",
    relatabilityIntro: "You’re not alone.",
    relatabilityBullets: [
      "late-night emails that need a reply by morning",
      "messages that could easily be misunderstood",
      "pressure to stay professional, even when frustrated",
    ],
    relatabilityClosing:
      "Zaza Draft helps you pause, reframe, and send something you won’t regret tomorrow.",
    howItWorksTitle: "How this works",
    howItWorksSteps: [
      { title: "Paste your draft", body: "Start with the message as it is." },
      {
        title: "We check for tone, risk signals, and escalation triggers",
        body: "We look for the wording most likely to land badly.",
      },
      {
        title: "You get a safer version you can actually send",
        body: "Clearer, calmer, and still recognisably yours.",
      },
    ],
    positioningTitle: "Not a writing tool. A safety layer.",
    positioningIntro: "Zaza Draft isn’t here to replace your voice.",
    positioningBullets: [
      "avoid misunderstandings",
      "reduce escalation",
      "communicate clearly under pressure",
    ],
    positioningClosing: "Especially in the messages that matter most.",
    bottomCtaTitle: "Write the message you won’t regret tomorrow",
    bottomCtaButton: "Start using Zaza Draft",
    riskHelperText:
      "This score reflects tone risk, escalation risk, and how the wording may land with a parent.",
    copiedRewriteMessage: "Safer version copied.",
    copiedRewriteError: "The safer version could not be copied just now.",
    copiedLinkMessage: "Checker link copied.",
    copiedLinkError: "The checker link could not be copied just now.",
    sharedMessage: "Checker shared.",
    reinforcement: {
      high: "This is likely to trigger defensiveness or escalate the situation.",
      medium: "This could easily be misread depending on the parent.",
      low: "This looks clear and professional. Minor tweaks only.",
    },
    riskLabels: { high: "High risk", medium: "Medium risk", low: "Low risk" },
    indicatorLabels: {
      high: "Red risk status",
      medium: "Amber risk status",
      low: "Green risk status",
    },
    issueWarnings: {
      accusation: "May sound accusatory",
      negative_generalisation: "May sound accusatory",
      frustration: "Could be read as defensive",
      escalation: "May escalate tension",
      professional_risk: "May escalate tension",
      emotional_coldness: "May feel harsher than intended",
      prescriptive_demand: "Leaves little room for collaboration",
    },
  },
  de: {
    demoDraft: `Hallo Frau Khan,

ich muss das direkt ansprechen. Diese Woche ist es nun schon das dritte Mal, dass Ihre Tochter Anweisungen nicht befolgt hat, und das wird fuer die Klasse zunehmend schwierig.

Bitte sprechen Sie heute Abend mit ihr, denn wenn das so weitergeht, muessen wir weitere Schritte einleiten.

Viele Gruesse
Frau Reed`,
    pageTitle: "Prüfe eine Elternmail, bevor du sie sendest",
    introTop:
      "Füge deinen Entwurf ein und erhalte eine ruhigere, klarere und professionellere Version als Ausgangspunkt.",
    textareaPlaceholder: "Füge hier deinen Entwurf der Elternmail ein…",
    textareaAriaLabel: "Entwurf der Elternmail",
    inputLabel: "Entwurf einfügen",
    submitButton: "Diese E-Mail prüfen",
    trustLine:
      "Entwickelt für echte Lehrer-Eltern-Kommunikation - nicht für generisches KI-Schreiben.",
    emptyState: "Füge eine Nachricht ein, bevor du sie prüfst",
    shortInputGuard:
      "Gib noch etwas mehr Kontext ein, damit wir den Ton sinnvoll prüfen können",
    loadingCopy: "Deine Nachricht wird geprüft…",
    loadingBody:
      "Wir prüfen Tonrisiko, Eskalationssignale und wie die Nachricht bei Eltern ankommen könnte.",
    processingError:
      "Der Checker konnte diesen Entwurf gerade nicht verarbeiten.",
    resultTitle: "Dein Ergebnis",
    resultPlaceholderTitle: "Dein Ergebnis erscheint hier",
    resultPlaceholderBody:
      "Score, Risikostufe, Hinweise und eine ruhigere Version erscheinen hier.",
    riskLevelLabel: "Risikostufe",
    scoreLabel: "Score",
    lowerRisk: "Niedrigeres Risiko",
    higherRisk: "Höheres Risiko",
    issuesTitle: "Was problematisch wirken könnte",
    noMajorRisks: "Keine grösseren sprachlichen Risiken erkannt.",
    saferVersionTitle: "Eine ruhigere, sicherere Version",
    saferVersionIntro:
      "Die gleiche Aussage - aber weniger eskalationsanfällig.",
    rewriteTrustLine:
      "Formuliert, um Abwehr zu reduzieren und deine Aussage klar zu halten.",
    whyThisWorksTitle: "Warum das besser funktioniert",
    whyThisWorksBullets: [
      "haelt deine Aussage klar",
      "nimmt reaktive Formulierungen heraus",
      "wirkt professioneller im Kontakt mit Eltern",
    ],
    copySaferVersion: "Sicherere Version kopieren",
    copied: "Kopiert",
    resultCtaTitle: "Genau das macht Zaza Draft - jedes Mal, wenn du schreibst",
    resultCtaBody:
      "Mach aus schwierigen Elternmails etwas Klares, Ruhiges und Professionelles - ohne deine Stimme zu verlieren.",
    resultCtaButton: "In Zaza Draft sicherer umformulieren",
    tryAnother: "Einen anderen Entwurf pruefen",
    detailToggleLabel: "Originalentwurf und Details anzeigen",
    originalDraftLabel: "Originalentwurf",
    shareTitle: "Prüfe eine Elternmail, bevor du sie sendest",
    shareText:
      "Dieses kostenlose Tool prüft, ob eine Elternmail zu scharf, defensiv oder eskalierend wirken könnte.",
    shareHeading: "Nützlich? Teile den Checker mit einer anderen Lehrkraft.",
    shareButton: "Teilen",
    sharedButton: "Geteilt",
    copyLink: "Link kopieren",
    linkCopied: "Link kopiert",
    relatabilityTitle:
      "Wenn du eine Elternmail schon drei Mal umgeschrieben hast, bevor du sie sendest…",
    relatabilityIntro: "Du bist damit nicht allein.",
    relatabilityBullets: [
      "späte Nachrichten, die bis zum Morgen beantwortet sein müssen",
      "Formulierungen, die leicht falsch verstanden werden können",
      "der Druck, professionell zu bleiben - auch wenn du frustriert bist",
    ],
    relatabilityClosing:
      "Zaza Draft hilft dir, kurz innezuhalten, neu zu formulieren und etwas zu senden, das du morgen nicht bereust.",
    howItWorksTitle: "So funktioniert es",
    howItWorksSteps: [
      {
        title: "Füge deinen Entwurf ein",
        body: "Starte mit der Nachricht so, wie sie gerade ist.",
      },
      {
        title: "Wir prüfen Ton, Risikosignale und mögliche Eskalation",
        body: "Wir schauen auf Formulierungen, die leicht falsch ankommen.",
      },
      {
        title: "Du bekommst eine Version, die du wirklich senden kannst",
        body: "Klarer, ruhiger und trotzdem noch erkennbar deine.",
      },
    ],
    positioningTitle: "Kein Schreibtool. Eine Sicherheitsschicht.",
    positioningIntro: "Zaza Draft soll deine Stimme nicht ersetzen.",
    positioningBullets: [
      "Missverständnisse vermeiden",
      "Eskalation reduzieren",
      "unter Druck klar kommunizieren",
    ],
    positioningClosing: "Gerade bei den Nachrichten, die am meisten zählen.",
    bottomCtaTitle: "Schreibe die Nachricht, die du morgen nicht bereust",
    bottomCtaButton: "Mit Zaza Draft starten",
    riskHelperText:
      "Dieser Score spiegelt Tonrisiko, Eskalationsrisiko und die wahrscheinliche Wirkung bei Eltern wider.",
    copiedRewriteMessage: "Sicherere Version kopiert.",
    copiedRewriteError:
      "Die sicherere Version konnte gerade nicht kopiert werden.",
    copiedLinkMessage: "Checker-Link kopiert.",
    copiedLinkError: "Der Checker-Link konnte gerade nicht kopiert werden.",
    sharedMessage: "Checker geteilt.",
    reinforcement: {
      high: "Das dürfte leicht Abwehr auslösen oder die Situation verschärfen.",
      medium: "Das könnte je nach Elternteil schnell missverstanden werden.",
      low: "Das wirkt klar und professionell. Nur kleine Anpassungen nötig.",
    },
    riskLabels: {
      high: "Hohes Risiko",
      medium: "Mittleres Risiko",
      low: "Niedriges Risiko",
    },
    indicatorLabels: {
      high: "Roter Risikostatus",
      medium: "Gelber Risikostatus",
      low: "Grüner Risikostatus",
    },
    issueWarnings: {
      accusation: "Kann vorwurfsvoll wirken",
      negative_generalisation: "Kann vorwurfsvoll wirken",
      frustration: "Kann defensiv wirken",
      escalation: "Kann die Spannung erhöhen",
      professional_risk: "Kann die Spannung erhöhen",
      emotional_coldness: "Kann härter wirken als beabsichtigt",
      prescriptive_demand: "Lässt wenig Raum für Zusammenarbeit",
    },
  },
};
