/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/en",
        destination: "/",
        permanent: true,
      },
      {
        source: "/en/:path*",
        destination: "/:path*",
        permanent: true,
      },
      {
        source: "/draft",
        destination: "/products/draft",
        permanent: true,
      },
      {
        source: "/de/draft",
        destination: "/de/products/draft",
        permanent: true,
      },
      {
        source: "/teach",
        destination: "/products/teach",
        permanent: true,
      },
      {
        source: "/de/teach",
        destination: "/de/products/teach",
        permanent: true,
      },
      {
        source: "/early-access",
        destination: "/pricing",
        permanent: true,
      },
      {
        source: "/de/early-access",
        destination: "/de/pricing",
        permanent: true,
      },
      {
        source: "/waitlist",
        destination: "/pricing",
        permanent: true,
      },
      {
        source: "/de/waitlist",
        destination: "/de/pricing",
        permanent: true,
      },
      {
        source: "/join-the-waitlist",
        destination: "/pricing",
        permanent: true,
      },
      {
        source: "/de/join-the-waitlist",
        destination: "/de/pricing",
        permanent: true,
      },
      {
        source: "/it",
        destination: "/",
        permanent: true,
      },
      {
        source: "/fr",
        destination: "/",
        permanent: true,
      },
      {
        source: "/es/pricing",
        destination: "/pricing",
        permanent: true,
      },
      {
        source: "/about-founder",
        destination: "/about/founder",
        permanent: true,
      },
      {
        source: "/about/greg",
        destination: "/about/founder",
        permanent: true,
      },
      {
        source: "/blog/tag/:slug",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/expanded/5-ai-report-writing-hacks",
        destination: "/blog/5-ai-report-writing-hacks",
        permanent: true,
      },
      {
        source:
          "/expanded/honest-but-kind-report-comments-for-struggling-students",
        destination:
          "/blog/honest-but-kind-report-comments-for-struggling-students",
        permanent: true,
      },
      {
        source: "/expanded/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
      {
        source: "/uk/parents-evening-email-template-for-teachers",
        destination: "/uk/parents-evening-email-templates",
        permanent: true,
      },
      {
        source: "/uk/behaviour-letter-home/:yearGroup([^/]+)-article-jsonld",
        destination: "/uk/behaviour-letter-home/:yearGroup",
        permanent: true,
      },
      {
        source:
          "/report-comments/:studentType/:subject/:phase([^/]+)-article-jsonld",
        destination: "/report-comments/:studentType/:subject/:phase",
        permanent: true,
      },
      {
        source:
          "/report-comments/:studentType/:subject/:phase([^/]+)-software-jsonld",
        destination: "/report-comments/:studentType/:subject/:phase",
        permanent: true,
      },
      {
        source:
          "/report-comments/:studentType/:subject/:phase([^/]+)-breadcrumb-jsonld",
        destination: "/report-comments/:studentType/:subject/:phase",
        permanent: true,
      },
      {
        source: "/scenario/:phase/:issue/:yearGroup([^/]+)-article-jsonld",
        destination: "/scenario/:phase/:issue/:yearGroup",
        permanent: true,
      },
      {
        source: "/scenario/:phase/:issue/:yearGroup([^/]+)-software-jsonld",
        destination: "/scenario/:phase/:issue/:yearGroup",
        permanent: true,
      },
      {
        source: "/scenario/:phase/:issue/:yearGroup([^/]+)-breadcrumb-jsonld",
        destination: "/scenario/:phase/:issue/:yearGroup",
        permanent: true,
      },
      {
        source: "/scenario/secondary",
        destination: "/scenario-combinations",
        permanent: true,
      },
      {
        source: "/scenario/secondary/sen-support",
        destination: "/scenario-combinations",
        permanent: true,
      },
      {
        source:
          "/report-comments/anxious-eal-pupil/:subject(english|maths|science|all-subjects)/:phase",
        destination: "/report-comments/anxious-eal/:subject/:phase",
        permanent: true,
      },
      {
        source: "/report-comments/anxious-eal-pupil/:subject/:phase",
        destination: "/report-comment-builder",
        permanent: true,
      },
      {
        source:
          "/report-comments/high-attaining-but-disorganised/:subject(english|maths|science|all-subjects)/:phase",
        destination:
          "/report-comments/high-attaining-disorganised/:subject/:phase",
        permanent: true,
      },
      {
        source:
          "/report-comments/high-attaining-but-disorganised/:subject/:phase",
        destination: "/report-comment-builder",
        permanent: true,
      },
      {
        source:
          "/report-comments/sen-support-needs/:subject(english|maths|science|all-subjects)/:phase",
        destination: "/report-comments/sen-needs/:subject/:phase",
        permanent: true,
      },
      {
        source: "/report-comments/sen-support-needs/:subject/:phase",
        destination: "/report-comment-builder",
        permanent: true,
      },
      {
        source:
          "/report-comments/struggling-student-behaviour/:subject(english|maths|science|all-subjects)/:phase",
        destination: "/report-comments/struggling/:subject/:phase",
        permanent: true,
      },
      {
        source: "/report-comments/struggling-student-behaviour/:subject/:phase",
        destination: "/report-comment-builder",
        permanent: true,
      },
      {
        source: "/report-comments/attendance-concern/:subject/:phase",
        destination: "/report-comment-builder",
        permanent: true,
      },
      {
        source: "/report-comments/returning-after-absence/:subject/:phase",
        destination: "/report-comment-builder",
        permanent: true,
      },
      {
        source:
          "/report-comments/behaviour-and-attention-needs/:subject/:phase",
        destination: "/report-comment-builder",
        permanent: true,
      },
      {
        source: "/report-comments/quiet-but-capable/:subject/:phase",
        destination: "/report-comment-builder",
        permanent: true,
      },
      {
        source: "/report-comments/exam-anxious-pupil/:subject/:phase",
        destination: "/report-comment-builder",
        permanent: true,
      },
      {
        source:
          "/report-comments/low-attainment-low-confidence/:subject/:phase",
        destination: "/report-comment-builder",
        permanent: true,
      },
      {
        source: "/report-comments/bright-but-inconsistent/:subject/:phase",
        destination: "/report-comment-builder",
        permanent: true,
      },
      {
        source: "/report-comments/:studentType/all-subjects/:phase",
        destination: "/report-comment-builder",
        permanent: true,
      },
      {
        source: "/report-comments/:studentType/:subject/fe",
        destination: "/report-comment-builder",
        permanent: true,
      },
      {
        source: "/report-comments/:studentType/:subject/post-16",
        destination: "/report-comment-builder",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600",
          },
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=3600",
          },
        ],
      },
      {
        source: "/sitemap-longtail.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=3600",
          },
        ],
      },
      {
        source: "/staging/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
      {
        source: "/preview/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
      {
        source: "/dashboard/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
      {
        source: "/app/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
      {
        source: "/admin/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
      {
        source: "/auth/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
      {
        source: "/settings/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
      {
        source: "/onboarding/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
      {
        source: "/internal/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
