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
                source: "/api/reqdata",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET, DELETE, PATCH, POST, PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            },
        ];
    },
};