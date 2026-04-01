import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getSupabase } from "../lib/supabase";
import { waLink } from "../lib/constants";
import { WaIcon } from "../components/WaButton";

const WA_MSG = "Hi, I need help with engineering college admission in Bangalore 2026. Can you guide me?";

const SECTION_CARDS = [
  {
    title: "Engineering Colleges in Bangalore",
    desc: "Complete list with NIRF rankings, NAAC grades, fees and direct links to management quota information.",
    href: "/engineering-colleges/bangalore",
    icon: "🎓",
    cta: "View Colleges →",
    color: "rgba(239,175,38,0.08)",
    border: "rgba(239,175,38,0.2)",
  },
  {
    title: "Direct Admission in Bangalore",
    desc: "Branch-wise management quota fees, seat availability and step-by-step direct admission process.",
    href: "/direct-admission/bangalore",
    icon: "📋",
    cta: "Direct Admission Guide →",
    color: "rgba(34,195,94,0.06)",
    border: "rgba(34,195,94,0.2)",
  },
  {
    title: "Management Quota in Bangalore",
    desc: "All management quota options explained — fees, eligibility, process and college-wise comparison.",
    href: "/management-quota/bangalore",
    icon: "💼",
    cta: "Management Quota Info →",
    color: "rgba(99,102,241,0.06)",
    border: "rgba(99,102,241,0.2)",
  },
];

export default function BangalorePage({ activeCount }) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://collegeandfees.com" },
      { "@type": "ListItem", position: 2, name: "Bangalore", item: "https://collegeandfees.com/bangalore" },
    ],
  };

  return (
    <>
      <Head>
        <title>Engineering and MBA Colleges in Bangalore 2026 — Fees and Admission Guide</title>
        <meta name="description" content="Complete guide to colleges in Bangalore 2026 — engineering, MBA, fees, cutoffs and direct admission. Free counsellor guidance on WhatsApp." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://collegeandfees.com/bangalore" />
        <meta property="og:title" content="Engineering and MBA Colleges in Bangalore 2026 — Fees and Admission Guide" />
        <meta property="og:description" content="Complete guide to colleges in Bangalore 2026 — engineering, MBA, fees, cutoffs and direct admission." />
        <meta property="og:url" content="https://collegeandfees.com/bangalore" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      </Head>

      <Header />

      <div style={{ borderBottom: "1px solid var(--border)", padding: "12px 0" }}>
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <span style={{ color: "var(--foreground)", fontWeight: 600 }}>Bangalore</span>
          </nav>
        </div>
      </div>

      <main>
        <section className="section">
          <div className="container">
            <h1 className="section-title" style={{ fontSize: "clamp(26px, 4vw, 38px)" }}>
              Colleges in Bangalore 2026 — Engineering and MBA Admission Guide
            </h1>

            <p style={{ color: "var(--muted-foreground)", fontSize: "16px", lineHeight: "1.8", marginBottom: "48px", maxWidth: "720px" }}>
              Bangalore is home to India&apos;s highest concentration of top engineering colleges. From RVCE (NIRF #82) to newer institutions, every major stream and budget range is represented. This guide covers engineering colleges, MBA colleges, fees, cutoffs and direct admission options across Bangalore.
              {activeCount > 0 && ` Currently tracking ${activeCount} colleges with verified fee data.`}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px", marginBottom: "56px" }}>
              {SECTION_CARDS.map((card) => (
                <Link key={card.href} href={card.href} style={{ textDecoration: "none" }}>
                  <div style={{ background: card.color, border: `1px solid ${card.border}`, borderRadius: "14px", padding: "28px", height: "100%", transition: "transform 0.15s, box-shadow 0.15s", cursor: "pointer" }}>
                    <div style={{ fontSize: "32px", marginBottom: "12px" }}>{card.icon}</div>
                    <h2 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "10px", color: "var(--foreground)" }}>{card.title}</h2>
                    <p style={{ fontSize: "14px", color: "var(--muted-foreground)", lineHeight: "1.6", marginBottom: "16px" }}>{card.desc}</p>
                    <p style={{ fontSize: "13px", color: "var(--primary)", fontWeight: 700 }}>{card.cta}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="glass-card" style={{ padding: "36px 32px", textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
              <div className="badge" style={{ margin: "0 auto 12px" }}>Free Guidance</div>
              <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "10px" }}>
                Need help choosing the right Bangalore college?
              </h2>
              <p style={{ color: "var(--muted-foreground)", marginBottom: "20px", fontSize: "14px", lineHeight: "1.7" }}>
                Our counsellor is an RVCE alumnus — honest advice on fees, process and which college fits your rank and budget.
              </p>
              <a href={waLink(WA_MSG)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <WaIcon size={18} /> WhatsApp Free Guidance
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  let activeCount = 0;
  try {
    const supabase = getSupabase();
    if (supabase) {
      const { count } = await supabase
        .from("colleges")
        .select("id", { count: "exact", head: true })
        .eq("is_active", true);
      if (count) activeCount = count;
    }
  } catch (err) {
    console.error("[bangalore] getServerSideProps error:", err.message);
  }
  return { props: { activeCount } };
}
