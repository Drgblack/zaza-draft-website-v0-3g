/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ensure folder-based static output (e.g. /ai-literacy/index.html)
  // to avoid 404s on hosts that don't map 
  // "/ai-literacy/" to "/ai-literacy.html" automatically.
  trailingSlash: true,
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
      { source: '/signup', destination: '/pricing', permanent: false },
      { source: '/signup/', destination: '/pricing', permanent: false },
      { source: '/state-of-ai-report', destination: '/state-of-ai-education', permanent: false },
      { source: '/state-of-ai-report/', destination: '/state-of-ai-education', permanent: false },
    ]
  },
}

export default nextConfig


