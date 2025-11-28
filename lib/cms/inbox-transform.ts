// Transforms inbox drafts into BlogPost format

export type InboxBlock = { en: string; de?: string };

export type BlogPost = {
  id: number | string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  contentDe?: string;
  publishedAt: string;
  category?: string;
  tags: string[];
  ogImage?: string;
};

export function toBlogPosts(
  drafts: any[],
  meta: Array<Partial<BlogPost>>,
): BlogPost[] {
  return drafts.map((d, i) => {
    const block: InboxBlock = d?.blogPostContent
      ? d.blogPostContent
      : d?.en
        ? d
        : null;

    if (!block) {
      throw new Error(
        "Inbox draft has wrong shape; expected { blogPostContent: { en, de? } } or { en, de? }",
      );
    }

    const m = meta[i] ?? {};

    if (!block.en) {
      throw new Error("Inbox draft missing `en`");
    }

    return {
      id: (m.id ?? `draft-${i + 1}`) as BlogPost["id"],
      title: String(m.title ?? `Draft ${i + 1}`),
      slug: String(m.slug ?? `draft-${i + 1}`),
      excerpt: String(m.excerpt ?? "Draft post (inbox)."),
      content: String.raw`${block.en}`,
      contentDe: block.de ? String.raw`${block.de}` : undefined,
      publishedAt: String(
        m.publishedAt ?? new Date().toISOString().slice(0, 10),
      ),
      category: m.category ? String(m.category) : undefined,
      tags: Array.isArray(m.tags) ? m.tags : [],
    };
  });
}
