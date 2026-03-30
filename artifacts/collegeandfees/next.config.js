/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      // College slug changes (old site -> new site)
      { source: '/colleges/rvce', destination: '/colleges/rvce-bangalore', permanent: true },
      { source: '/colleges/bmsce', destination: '/colleges/bms-college-of-engineering', permanent: true },
      { source: '/colleges/pesit', destination: '/colleges/pes-university-bangalore', permanent: true },
      { source: '/colleges/msrit', destination: '/colleges/msrit-bangalore', permanent: true },
      { source: '/colleges/christu', destination: '/colleges/christ-university-bangalore', permanent: true },
      // Category page path changes
      { source: '/engineering-colleges-in-bangalore', destination: '/engineering-colleges/bangalore', permanent: true },
      // Blog redirects to best-match pages
      { source: '/blog/rvce-fees-explained', destination: '/colleges/rvce-bangalore', permanent: true },
      { source: '/blog/best-engineering-colleges-in-bangalore', destination: '/engineering-colleges/bangalore', permanent: true },
      // Catch-all redirects for old pages with no equivalent on new site
      { source: '/colleges/iimb', destination: '/', permanent: true },
      { source: '/colleges/dsce', destination: '/engineering-colleges/bangalore', permanent: true },
      { source: '/colleges/nmit', destination: '/engineering-colleges/bangalore', permanent: true },
      { source: '/colleges/cbit', destination: '/', permanent: true },
      { source: '/engineering', destination: '/engineering-colleges/bangalore', permanent: true },
      { source: '/mba', destination: '/', permanent: true },
      { source: '/courses', destination: '/', permanent: true },
      { source: '/cities', destination: '/', permanent: true },
      { source: '/exams', destination: '/', permanent: true },
      { source: '/blog', destination: '/', permanent: true },
      { source: '/blog/:slug', destination: '/', permanent: true },
      { source: '/chennai', destination: '/', permanent: true },
      { source: '/delhi', destination: '/', permanent: true },
      { source: '/hyderabad', destination: '/', permanent: true },
      { source: '/pune', destination: '/', permanent: true },
      { source: '/mba-colleges-in-bangalore', destination: '/', permanent: true },
      { source: '/engineering-colleges-in-:city', destination: '/', permanent: true },
      { source: '/mba-colleges-in-:city', destination: '/', permanent: true },
      { source: '/about-us', destination: '/', permanent: true },
      { source: '/privacy-policy', destination: '/', permanent: true },
      { source: '/terms', destination: '/', permanent: true },
      { source: '/contact', destination: '/', permanent: true },
    ];
  },
};

module.exports = nextConfig;
