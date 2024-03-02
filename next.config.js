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
    
    async headers() {
        return [
            {
                // Apply these headers to all routes in your application.
                source: "/api/reqdata",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "ufsdrive.com",
                    },
                ],
            },
        ];
    },
};