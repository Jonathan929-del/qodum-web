/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'img.clerk.com',
                port: ''
            }
        ],
        domains:['qodum.s3.amazonaws.com']
    }
}

module.exports = nextConfig;