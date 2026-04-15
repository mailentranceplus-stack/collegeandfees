import { getSupabase } from "../../lib/supabase";

const INDEXNOW_KEY = "2d063111ca6f49dcac0717ebeb2845ae";
const HOST = "collegeandfees.com";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const supabase = getSupabase();
    const urlList = [];

    urlList.push(`https://${HOST}`);
    urlList.push(`https://${HOST}/engineering-colleges/bangalore`);
    urlList.push(`https://${HOST}/management-quota/bangalore`);
    urlList.push(`https://${HOST}/direct-admission/bangalore`);

    if (supabase) {
      const { data: colleges } = await supabase
        .from("colleges")
        .select("slug")
        .eq("is_active", true);

      if (colleges) {
        for (const c of colleges) {
          urlList.push(`https://${HOST}/colleges/${c.slug}`);
          urlList.push(`https://${HOST}/colleges/${c.slug}/fees`);
          urlList.push(`https://${HOST}/management-quota/${c.slug}`);
          urlList.push(`https://${HOST}/direct-admission/${c.slug}`);
        }
      }
    }

    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
      urlList: urlList.slice(0, 10000),
    };

    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    return res.status(200).json({
      submitted: urlList.length,
      indexNowStatus: response.status,
      indexNowStatusText: response.statusText,
    });
  } catch (err) {
    console.error("[api/indexnow] error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
