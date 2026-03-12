/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/learning-centre',
        destination: '/ai-literacy',
        permanent: true,
      },
      {
        source: '/de/learning-centre',
        destination: '/de/ai-literacy',
        permanent: true,
      },
      {
        source: '/communication-diagnosis',
        destination: '/diagnosis',
        permanent: true,
      },
      {
        source: '/how-to-reply-angry-parent',
        destination: '/diagnosis?issue=angry-parent-email&tone=de-escalate',
        permanent: true,
      },
      {
        source: '/behaviour-email-diagnosis',
        destination:
          '/diagnosis?issue=behaviour-concern&phase=primary&studentContext=behaviour-issues&tone=professional-but-empathetic',
        permanent: true,
      },
      {
        source: '/parent-ignores-email-help',
        destination:
          '/diagnosis?issue=parent-ignores-email&studentContext=behaviour-issues&tone=quick-reply',
        permanent: true,
      },
      {
        source: '/report-writing-stress-help',
        destination:
          '/diagnosis?issue=report-writing-stress&studentContext=struggling-academically&tone=detailed-report&phase=ks2',
        permanent: true,
      },
      {
        source: '/slt-documentation-help',
        destination:
          '/diagnosis?issue=documentation-for-slt&studentContext=behaviour-issues&tone=professional-but-empathetic',
        permanent: true,
      },
      {
        source: '/legal/privacy',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/state-of-ai-report',
        destination: '/state-of-ai-education',
        permanent: true,
      },
      {
        source: '/de/ambassadors',
        destination: '/ambassadors',
        permanent: true,
      },
      {
        source: '/de/state-of-ai-education',
        destination: '/state-of-ai-education',
        permanent: true,
      },
      {
        source: '/de/best-ai-writing-tools-for-teachers-2025',
        destination: '/best-ai-writing-tools-for-teachers-2025',
        permanent: true,
      },
      {
        source: '/uk/parents-evening-email-template-for-teachers',
        destination: '/uk/parents-evening-email-templates',
        permanent: true,
      },
      {
        source: '/report-comments/:studentType/all-subjects/:phase',
        destination: '/report-comment-builder',
        permanent: true,
      },
      {
        source: '/report-comments/:studentType/:subject/fe',
        destination: '/report-comment-builder',
        permanent: true,
      },
      {
        source: '/report-comments/:studentType/:subject/post-16',
        destination: '/report-comment-builder',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
      {
        source: '/sitemap-longtail.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
      {
        source: '/staging/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive',
          },
        ],
      },
      {
        source: '/preview/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
