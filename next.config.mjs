/** @type {import('next').NextConfig} */
const nextConfig = {
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
