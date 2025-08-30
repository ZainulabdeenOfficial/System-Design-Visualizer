/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  // Enable experimental features if needed
  experimental: {
    // Remove deprecated appDir option
  },
}

module.exports = nextConfig
