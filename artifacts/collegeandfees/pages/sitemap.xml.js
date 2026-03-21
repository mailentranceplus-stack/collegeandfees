import { getSupabase } from "../lib/supabase";

const SITE_URL = "https://collegeandfees.com";

function generateSiteMap(activeColleges) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${SITE_URL}/bangalore</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>${SITE_URL}/engineering-colleges/bangalore</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>${SITE_URL}/direct-admission/bangalore</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>${SITE_URL}/management-quota/bangalore</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  ${activeColleges
    .map(
      (college) => `
  <url><loc>${SITE_URL}/colleges/${college.slug}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${SITE_URL}/colleges/${college.slug}/fees</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${SITE_URL}/direct-admission/${college.slug}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${SITE_URL}/management-quota/${college.slug}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`
    )
    .join("")}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  let activeColleges = [];

  try {
    const supabase = getSupabase();
    if (supabase) {
      const { data } = await supabase
        .from("colleges")
        .select("slug")
        .eq("is_active", true);
      if (data) activeColleges = data;
    }
  } catch (err) {
    console.error("[sitemap.xml] error:", err.message);
  }

  const sitemap = generateSiteMap(activeColleges);

  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
