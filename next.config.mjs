/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [256, 384, 480],
    /* Tilføj hostname her når nye feeds/domæner kommer ind */
    remotePatterns: [
      { protocol: "https", hostname: "www.festkassen.dk", pathname: "/**" },
      { protocol: "https", hostname: "www.kelz0r.dk", pathname: "/**" },
      { protocol: "https", hostname: "www.shopdyner.dk", pathname: "/**" },
      { protocol: "https", hostname: "www.proshop.dk", pathname: "/**" },
      { protocol: "https", hostname: "proshop.dk", pathname: "/**" },
      { protocol: "https", hostname: "www.wouldbe.dk", pathname: "/**" },
      { protocol: "http", hostname: "www.wouldbe.dk", pathname: "/**" },
      { protocol: "https", hostname: "www.nextlevelgames.dk", pathname: "/**" },
      { protocol: "https", hostname: "pandasia.dk", pathname: "/**" },
      { protocol: "https", hostname: "sokkeposten.dk", pathname: "/**" },
      { protocol: "https", hostname: "dingadget.dk", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      // Gammel slug med danske tegn i URL — nogle browsere/miljøer gav 404
      {
        source: "/guider/sådan-undgår-du-at-koebe-det-forkerte",
        destination: "/guider/sadan-undgar-du-at-koebe-det-forkerte",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
