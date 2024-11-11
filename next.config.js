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
                hostname: 's3.ap-south-1.amazonaws.com',
                port: ''
            }
        ],
        domains:['qodum.s3.amazonaws.com', 's3.ap-south-1.amazonaws.com', 'www.unitedagents.co.uk', 'qodum.s3.us-east-1.amazonaws.com']
    }
}

module.exports = nextConfig;