/** @type {import('next').NextConfig} */

module.exports = {
    reactStrictMode: true,
    swcMinify: false,
    async redirects() {
        return [
          {
            source: '/cloudinfinite.vercel.app/app',
            destination: 'https://ufsdrive.com',
            permanent: true,
          },
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    serverRuntimeConfig: {
        // Increase the timeout for the POST route
        apiTimeout: 300000, // 5 minutes
    },
};