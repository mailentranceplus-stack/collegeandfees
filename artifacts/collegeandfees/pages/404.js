import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

const WA_NUMBER = "917975193033";
const WA_MSG = "Hi, I was looking for college information on your website but couldn't find it. Can you help me?";
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

const QUICK_LINKS = [
  { label: "Engineering Colleges Bangalore", href: "/engineering-colleges/bangalore" },
  { label: "Direct Admission Bangalore", href: "/direct-admission/bangalore" },
  { label: "Management Quota Bangalore", href: "/management-quota/bangalore" },
];

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>Page Not Found — CollegeAndFees.com</title>
        <meta name="description" content="The page you are looking for does not exist. Find engineering college fees, direct admission and management quota information at CollegeAndFees.com." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Header />

      <main>
        <section className="section">
          <div className="container" style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>

            <div style={{ fontSize: "80px", lineHeight: 1, marginBottom: "24px" }}>🔍</div>

            <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, marginBottom: "12px" }}>
              Page Not Found — But We Can Help
            </h1>
            <p style={{ color: "var(--muted-foreground)", fontSize: "16px", lineHeight: "1.7", marginBottom: "32px" }}>
              The page you are looking for does not exist. You can find the right engineering college in Bangalore using the links below — or ask our counsellor directly on WhatsApp.
            </p>

            {/* WhatsApp CTA */}
            <div className="glass-card" style={{ padding: "28px 24px", marginBottom: "32px" }}>
              <p style={{ fontWeight: 600, fontSize: "15px", marginBottom: "16px" }}>
                Can&apos;t find what you need? Our counsellor can help you in one conversation.
              </p>
              <a href={waLink(WA_MSG)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <WaIcon size={18} /> WhatsApp Our Counsellor — Free Help
              </a>
            </div>

            {/* Quick links */}
            <div style={{ marginBottom: "48px" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "16px" }}>
                Or browse these pages
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {QUICK_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "10px", textDecoration: "none", color: "var(--foreground)", fontWeight: 600, fontSize: "15px" }}
                  >
                    {link.label}
                    <span style={{ color: "var(--primary)", fontSize: "18px" }}>→</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/" style={{ fontSize: "14px", color: "var(--muted-foreground)", textDecoration: "none" }}>
              ← Back to home
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
