/** @type {import("next").NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.rainnny.club",
            },
        ],
    },
};

export default nextConfig;
