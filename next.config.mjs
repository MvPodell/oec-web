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
};

export default nextConfig;
