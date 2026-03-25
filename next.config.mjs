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
        source: '/uk/parents-evening-email-template-for-teachers',
        destination: '/uk/parents-evening-email-templates',
        permanent: true,
      },
      {
        source: '/early-access',
        destination: '/pricing',
        permanent: true,
      },
      {
        source: '/de/early-access',
        destination: '/de/pricing',
        permanent: true,
      },
      {
        source: '/waitlist',
        destination: '/pricing',
        permanent: true,
      },
      {
        source: '/de/waitlist',
        destination: '/de/pricing',
        permanent: true,
      },
      {
        source: '/join-the-waitlist',
        destination: '/pricing',
        permanent: true,
      },
      {
        source: '/de/join-the-waitlist',
        destination: '/de/pricing',
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
