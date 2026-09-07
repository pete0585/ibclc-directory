/** @type {import('next').NextConfig} */
const nextConfig = {
  // Include static city page folders so sitemap.ts can discover them at runtime
  experimental: {
    outputFileTracingIncludes: {
      '/sitemap.xml': ['./app/best/**/page.tsx'],
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co', pathname: '/storage/v1/object/public/**' },
    ],
  },
  async redirects() {
    return [
      // Canonical www redirect — non-www → www (308 preserves method for POST)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'lactationconsultantdirectory.com' }],
        destination: 'https://www.lactationconsultantdirectory.com/:path*',
        permanent: true,
      },
      {
        source: '/ibclc/:slug',
        destination: '/lactation-consultant/:slug',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}
export default nextConfig
