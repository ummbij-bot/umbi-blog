import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // rewrites 부분은 삭제했습니다. 이제 필요 없습니다!
};

export default nextConfig;