/** @type {import('next').NextConfig} */

module.exports = {
    reactStrictMode: true,
    swcMinify: false,
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