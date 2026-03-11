export const siteConfig = {
  name: "Zaza Draft",
  legalName: "Zaza Technologies",
  slogan: "Zaza - Just Teach.",
  url: "https://zazadraft.com",
  supportEmail: "hello@zazatechnologies.com",
  logoPath: "/zaza-logo.png",
  iconPath: "/z-logo.png",
  defaultOgImage: "/hero/teacher.jpg",
  sameAs: [
    "https://www.linkedin.com/company/zaza-technologies",
    "https://x.com/zazateachapp",
    "https://www.tiktok.com/@zazatechnologies",
    "https://www.youtube.com/@zazadraft",
  ],
  founder: {
    name: "Dr Greg Blackburn",
    honorificSuffix: "PhD",
    jobTitle: "Founder",
    description:
      "Founder of Zaza Technologies and teacher-first AI advocate focused on calm, professional school communication.",
  },
} as const;

export function absoluteUrl(path = "/") {
  if (!path) {
    return siteConfig.url;
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
