import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { waLink } from "../lib/constants";
import { WaIcon } from "../components/WaButton";

const WA_MSG = "Hi, I was looking for college information on your website but couldn't find it. Can you help me?";

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
