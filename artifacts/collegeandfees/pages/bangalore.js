import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getSupabase } from "../lib/supabase";

const WA_NUMBER = "917975193033";
const WA_MSG = "Hi, I need help with engineering college admission in Bangalore 2026. Can you guide me?";
function waLink(msg) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function WaIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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
              Bangalore is home to India&apos;s highest concentration of top engineering colleges. From RVCE (NIRF #99) to newer institutions, every major stream and budget range is represented. This guide covers engineering colleges, MBA colleges, fees, cutoffs and direct admission options across Bangalore.
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
