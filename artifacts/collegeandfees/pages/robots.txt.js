export async function getServerSideProps({ req, res }) {
  const host = req.headers.host || "";
  const isProduction = host.includes("collegeandfees.com");

  const content = isProduction
    ? [
        "User-agent: *",
        "Allow: /",
        "Disallow: /api/",
        "",
        "Sitemap: https://collegeandfees.com/sitemap.xml",
      ].join("\n")
    : ["User-agent: *", "Disallow: /"].join("\n");

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.write(content);
  res.end();

  return { props: {} };
}

export default function RobotsPage() {
  return null;
}
