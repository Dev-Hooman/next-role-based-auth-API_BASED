/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["mongoose"],

  },
  images: {
    domains: ["firebasestorage.googleapis.com",
  
    "localhost",
    "avatars.githubusercontent.com",
    "pbs.twimg.com",
    "platform-lookaside.fbsbx.com",
    'github.com', 'lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
