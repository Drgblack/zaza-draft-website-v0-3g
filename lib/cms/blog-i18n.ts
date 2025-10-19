export function extractFirstH2(html: string): string | undefined {
  const m = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  return m ? stripTags(m[1]).trim() : undefined;
}

export function extractFirstP(html: string): string | undefined {
  const m = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  return m ? stripTags(m[1]).trim() : undefined;
}

function stripTags(s: string) {
  return s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ");
}

/** Returns localized title/excerpt if lang === "de", else falls back to post fields */
export function localizeHero(post: { title: string; excerpt: string; contentDe: string }, lang: string) {
  if (lang === "de") {
    const t = extractFirstH2(post.contentDe) ?? post.title;
    const e = extractFirstP(post.contentDe) ?? post.excerpt;
    return { title: t, excerpt: e };
  }
  return { title: post.title, excerpt: post.excerpt };
}
