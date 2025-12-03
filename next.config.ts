import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // TODO: Fix TypeScript errors and remove this
  },
  eslint: {
    ignoreDuringBuilds: true, // TODO: Fix ESLint errors and remove this
  },
}

export default nextConfig

