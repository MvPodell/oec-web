
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          hostname: 'firebasestorage.googleapis.com',
        }
      ],
    },
    experimental: {
      missingSuspenseWithCSRBailout: false,
    },
    async redirects() {
      return [
        // Basic redirect
        {
          source: '/',
          destination: '/dashboard',
          permanent: true,
        },
        // Wildcard path matching
      ]
    },
};

export default nextConfig;
