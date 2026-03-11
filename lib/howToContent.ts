import howToArticles from "@/data/how-to-articles.json";
import howToKeywords from "@/data/how-to-keywords.json";

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

type StoredHowToArticle = {
  slug: string;
  article: GeneratedHowToArticle;
};

const keywords = howToKeywords as HowToKeyword[];
const storedArticles = howToArticles as StoredHowToArticle[];

function toTitleCase(value: string) {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildFallbackArticle(keyword: HowToKeyword): GeneratedHowToArticle {
  const modifierLabel =
    keyword.modifier && keyword.modifier !== "General"
      ? keyword.modifier.toLowerCase()
      : "pupils";

  return {
    title: toTitleCase(keyword.primaryKeyword),
    intro: `If you need help with ${keyword.primaryKeyword}, the hard part is usually finding wording that sounds professional, specific, and fair. These static how-to pages are stored in the repo so they can build cleanly on Vercel without relying on a live AI request.\n\nThis fallback version gives you a practical starting point for ${keyword.yearGroup} ${keyword.subject.toLowerCase()} comments focused on ${modifierLabel}. It is designed to be edited further as you add richer pre-written content to the repository.`,
    whyChallenging: `${keyword.yearGroup} ${keyword.subject.toLowerCase()} comments can be difficult because teachers need to balance clarity with sensitivity. Parents need a clear picture, but the wording also needs to remain calm, defensible, and easy to understand.\n\nWhen the focus is ${modifierLabel}, generic report phrasing usually falls flat. The most useful comments explain what the pupil can do, what is getting in the way, and the next step that would make the biggest difference.`,
    examplePhrases: [
      `${keyword.yearGroup} ${keyword.subject} understanding is developing steadily, and the next step is to show this more consistently in independent work.`,
      `During supported tasks, the pupil often demonstrates stronger understanding than written work alone might suggest.`,
      `They are beginning to apply taught methods with greater confidence and would benefit from explaining their thinking more fully.`,
      `There is growing confidence in class discussion, and this now needs to carry through into recorded work.`,
      `The pupil responds well to modelling and is developing greater independence in ${keyword.subject.toLowerCase()}.`,
      `With clear scaffolds, they can complete work successfully and are ready to build greater consistency.`,
      `A key next step is to improve the clarity and detail of written responses so that progress is easier to see.`,
      `They are working hard to secure core ${keyword.subject.toLowerCase()} skills and would benefit from regular opportunities to rehearse written explanations.`,
      `Confidence is building, particularly when tasks are broken into manageable steps and expectations are made explicit.`,
      `Continued practice will help them present their ideas more clearly and reflect their understanding more accurately.`,
    ],
    tips: [
      "Start with one secure strength before naming the area for development.",
      "Describe the barrier in learning terms rather than behaviour labels.",
      "Keep the next step narrow enough that parents can understand it quickly.",
      "Use wording that matches the evidence you have seen in books, discussion, and guided work.",
    ],
    mistakes: [
      "Writing comments that are so vague the parent cannot tell what needs to improve.",
      "Using judgemental wording instead of describing the learning barrier calmly.",
      "Trying to mention every issue instead of focusing on the most important next step.",
      "Forgetting to separate verbal understanding from written evidence when that distinction matters.",
    ],
    zazaDraftSection:
      "Zaza Draft is useful when you already know what you want to say but need help shaping it into professional report language quickly. Teachers can start with rough notes and compare calmer, clearer versions without losing their own judgement.\n\nBecause the tool is designed for school communication, it helps you stay specific, measured, and consistent across a full class set. That is especially helpful when you need wording that feels fair for both school and home.",
    conclusion:
      "Use this page as a practical starting point, then refine the final wording so it matches the pupil accurately. When you want faster first drafts for report comments and parent communication, try Zaza Draft free via the report comments tools and scenario builder.",
  };
}

export function getHowToKeywords() {
  return keywords;
}

export function getHowToKeyword(slug: string) {
  return keywords.find((item) => item.slug === slug) ?? null;
}

export function getHowToArticle(slug: string) {
  const keyword = getHowToKeyword(slug);

  if (!keyword) {
    return null;
  }

  const storedArticle = storedArticles.find((item) => item.slug === slug);
  return storedArticle?.article ?? buildFallbackArticle(keyword);
}
