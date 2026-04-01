import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CollegeCard from "../components/CollegeCard";
import Testimonials from "../components/Testimonials";
import { getSupabase } from "../lib/supabase";
import { ACTIVE_SLUGS, waLink } from "../lib/constants";
import { WaIcon } from "../components/WaButton";

const WA_MSG_HOME = "Hi, I want to know about direct admission in Bangalore engineering colleges.";

const PLACEHOLDER_COLLEGES = [
  { id: 1, slug: "rvce-bangalore", name: "RV College of Engineering", city: "Bangalore", naac_grade: "A+", established: 1963, type: "Private" },
  { id: 3, slug: "christ-university-bangalore", name: "Christ University – Faculty of Engineering", city: "Bangalore", naac_grade: "A+", established: 1969, type: "Deemed" },
];

const FEES_DATA = [
  { type: "Government Colleges", gov: "₹15,000 – ₹50,000", mgmt: "₹50,000 – ₹80,000", nri: "₹3,00,000+" },
  { type: "Private Aided", gov: "₹50,000 – ₹90,000", mgmt: "₹1,00,000 – ₹1,50,000", nri: "₹5,00,000+" },
  { type: "Private Unaided", gov: "₹1,00,000 – ₹1,80,000", mgmt: "₹2,00,000 – ₹3,50,000", nri: "₹8,00,000+" },
  { type: "Deemed Universities", gov: "₹2,00,000 – ₹3,00,000", mgmt: "₹3,00,000 – ₹5,00,000", nri: "₹10,00,000+" },
];

const HOME_FAQS = [
  { id: 1, question: "What is management quota / direct admission in Bangalore?", answer: "Management quota refers to seats that private engineering colleges fill directly without KCET or COMEDK counselling. Typically 30–35% of total intake is reserved under management quota, and colleges admit students directly on payment of a higher fee." },
  { id: 2, question: "What is the minimum eligibility for direct admission?", answer: "You need a minimum of 45% aggregate marks in PCM (Physics, Chemistry, Mathematics) in Class 12 / PUC. No minimum KCET or COMEDK rank is required for management quota seats." },
  { id: 3, question: "How much does CSE direct admission cost at top Bangalore colleges?", answer: "CSE management quota fees vary by college. RVCE CSE is approximately ₹3,60,000/year (roughly ₹14-15 lakh total over 4 years). Christ University ranges from ₹3,00,000–₹5,00,000/year depending on branch. Contact our counsellor for confirmed 2026-27 figures for your target college." },
  { id: 4, question: "When does direct admission open for 2026?", answer: "Management quota applications typically open in June 2026 after KCET results are declared. The process continues through July 2026 until all management seats are filled. Apply early — seats go fast at top colleges." },
];

const ADMISSION_STEPS = [
  { title: "Appear for Entrance Exams", desc: "Register for KCET, JEE Main, or COMEDK UGET based on your target colleges." },
  { title: "Check Eligibility", desc: "Ensure you have minimum 45% in PCM (Physics, Chemistry, Maths) in Class 12." },
  { title: "KCET Counselling", desc: "Participate in KEA counselling for government quota seats." },
  { title: "COMEDK Counselling", desc: "Register for COMEDK counselling for private engineering colleges." },
  { title: "Document Verification", desc: "Submit 10th & 12th marksheets, caste certificate, domicile proof, and rank card." },
  { title: "Seat Confirmation & Fee Payment", desc: "Pay the first-year fee to confirm your seat and complete admission." },
];

function HomeFaqAccordion({ faqs }) {
  const [openId, setOpenId] = useState(null);
  return (
    <div>
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id} className="faq-item">
            <button
              className="faq-question"
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              aria-expanded={isOpen}
            >
              <span>{faq.question}</span>
              <span style={{
                flexShrink: 0,
                width: "28px",
                height: "28px",
                border: "1px solid var(--border)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--primary)",
                fontSize: "18px",
                fontWeight: 700,
                transform: isOpen ? "rotate(45deg)" : "none",
                transition: "transform 0.2s",
              }}>+</span>
            </button>
            {isOpen && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Home({ colleges }) {
  const displayColleges = colleges.length > 0 ? colleges : PLACEHOLDER_COLLEGES;

  return (
    <>
      <Head>
        <title>Bangalore Engineering Admissions 2026 — Fees, Cutoffs and Direct Admission Guide</title>
        <meta name="description" content="Expert guidance on management quota fees, KCET cutoffs and direct admission for Bangalore engineering colleges 2026. Free counsellor on WhatsApp." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Bangalore Engineering Admissions 2026 — Fees, Cutoffs and Direct Admission Guide" />
        <meta property="og:description" content="Management quota fees, KCET cutoffs, COMEDK cutoffs and direct admission guidance for Bangalore engineering colleges 2026." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://collegeandfees.com" />
        <meta property="og:image" content="https://collegeandfees.com/opengraph.jpg" />
        <link rel="canonical" href="https://collegeandfees.com" />
        <script key="schema-website" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "CollegeAndFees.com",
          "url": "https://collegeandfees.com",
          "description": "Management quota fees and direct admission guidance for Bangalore engineering colleges",
        }) }} />
        <script key="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: HOME_FAQS.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }) }} />
      </Head>

      <Header />

      {/* Hero */}
      <section className="hero">
        <Image
          src="https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center", opacity: 0.18, pointerEvents: "none", userSelect: "none", zIndex: 1 }}
          aria-hidden="true"
          priority
        />
        <div className="hero-content">
          <div className="hero-trust">
            <span style={{ color: "var(--primary)" }}>★★★★★</span>
            Trusted by 500+ families for direct admission guidance
          </div>
          <h1 className="hero-title">
            Management Quota Fees<br />
            in <span className="text-gold">Bangalore</span>
          </h1>
          <p className="hero-subtitle">
            Expert counselling on management quota fees, seat availability, and admission process for top Bangalore engineering colleges 2026.
          </p>
          <div className="hero-actions">
            <a href={waLink(WA_MSG_HOME)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <WaIcon />
              Free Counsellor Guidance
            </a>
            <Link href="/direct-admission/bangalore" className="btn-outline">
              View All Colleges →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="section-sm" style={{ background: "var(--navy-light)" }}>
        <div className="container">
          <div className="stats-bar">
            {[
              { label: "Families Guided", value: "500+" },
              { label: "Yrs in Admissions", value: "10+" },
              { label: "Counselling Fee", value: "Free" },
              { label: "WhatsApp Response", value: "< 5 min" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="stat-number">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Admission CTA Banner */}
      <section style={{ padding: "40px 0", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>
            <div style={{ flex: 1, minWidth: "280px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "6px" }}>
                Looking for Direct Admission in Bangalore? 2026 seats are filling fast.
              </h2>
              <p style={{ color: "var(--muted-foreground)", fontSize: "14px" }}>
                Management quota seats available at RVCE and Christ University. Free counsellor guidance.
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/direct-admission/bangalore" className="btn-outline-sm">
                View All Colleges →
              </Link>
              <a href={waLink(WA_MSG_HOME)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp-sm">
                <WaIcon />
                WhatsApp Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Management Quota CTA Banner */}
      <section style={{ padding: "40px 0", borderBottom: "1px solid var(--border)", background: "var(--navy-light)" }}>
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>
            <div style={{ flex: 1, minWidth: "280px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "6px" }}>
                Management Quota Seats 2026 — No KCET rank required.
              </h2>
              <p style={{ color: "var(--muted-foreground)", fontSize: "14px" }}>
                Branch-wise management quota fees, seat availability and admission process for RVCE and Christ University.
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/management-quota/bangalore" className="btn-outline-sm">
                View MQ Colleges →
              </Link>
              <a href={waLink(WA_MSG_HOME)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp-sm">
                <WaIcon />
                WhatsApp Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Colleges Section */}
      <section className="section">
        <div className="container">
          <div className="badge">Top Picks 2026</div>
          <h2 className="section-title">Top Engineering Colleges in Bangalore</h2>
          <p className="section-subtitle">
            Click any college to see direct admission fees, process, and seat availability.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "20px" }}>
            {displayColleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
          <div style={{ marginTop: "36px", textAlign: "center" }}>
            <Link href="/direct-admission/bangalore" className="btn-outline">
              View All Direct Admission Colleges →
            </Link>
          </div>
        </div>
      </section>

      {/* Fees Section */}
      <section className="section" style={{ background: "var(--navy-light)" }}>
        <div className="container">
          <div className="badge">Fee Overview</div>
          <h2 className="section-title">Engineering College Fees in Bangalore 2026</h2>
          <p className="section-subtitle">
            Fee structures vary by college type and branch. Here&apos;s an overview.
          </p>
          <div style={{ overflowX: "auto", borderRadius: "12px", border: "1px solid var(--border)" }}>
            <table className="fees-table">
              <thead>
                <tr>
                  <th>College Type</th>
                  <th>Government Quota</th>
                  <th>Management Quota</th>
                  <th>NRI Quota</th>
                </tr>
              </thead>
              <tbody>
                {FEES_DATA.map((row) => (
                  <tr key={row.type}>
                    <td style={{ fontWeight: 600 }}>{row.type}</td>
                    <td style={{ color: "var(--muted-foreground)" }}>{row.gov}</td>
                    <td className="fees-highlight">{row.mgmt}</td>
                    <td style={{ color: "var(--muted-foreground)" }}>{row.nri}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Admissions Steps Section */}
      <section className="section">
        <div className="container">
          <div className="badge">Step by Step</div>
          <h2 className="section-title">Engineering Admissions in Bangalore 2026</h2>
          <p className="section-subtitle">
            Step-by-step guide to securing your engineering seat in Bangalore.
          </p>
          <div className="steps-grid">
            {ADMISSION_STEPS.map((step, i) => (
              <div key={i} className="step-card">
                <div className="step-number">{i + 1}</div>
                <div className="step-title">{step.title}</div>
                <div className="step-desc">{step.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "40px", display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/direct-admission/bangalore" className="btn-outline">
              Direct Admission Guide
            </Link>
            <a href={waLink(WA_MSG_HOME)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <WaIcon />
              Ask Counsellor on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ Section */}
      <section className="section" style={{ background: "var(--navy-light)" }}>
        <div className="container">
          <div className="badge">Common Questions</div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Quick answers about direct admission and management quota fees in Bangalore engineering colleges.
          </p>
          <HomeFaqAccordion faqs={HOME_FAQS} />
        </div>
      </section>

      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  let colleges = [];
  try {
    const supabase = getSupabase();
    if (supabase) {
      const [{ data: collegeData }, { data: feesData }] = await Promise.all([
        supabase
          .from("colleges")
          .select("id, slug, name, short_name, city, established, type, naac_grade")
          .eq("is_active", true)
          .order("name")
          .limit(6),
        supabase
          .from("fees")
          .select("college_id, course_id, tuition_fee, courses(name, short_name)")
          .eq("quota", "management")
          .order("tuition_fee", { ascending: false }),
      ]);

      if (collegeData) {
        const feeMap = {};
        (feesData || []).forEach((fee) => {
          const cid = fee.college_id;
          if (!feeMap[cid]) {
            feeMap[cid] = { top_fee: fee.tuition_fee, top_course: fee.courses?.short_name || "CSE" };
          } else if (fee.course_id === 1) {
            feeMap[cid] = { top_fee: fee.tuition_fee, top_course: "CSE" };
          }
        });
        colleges = collegeData
          .filter((c) => ACTIVE_SLUGS.has(c.slug))
          .map((c) => ({ ...c, ...(feeMap[c.id] || {}) }));
      }
    }
  } catch (err) {
    console.error("Failed to fetch colleges:", err.message);
  }
  return { props: { colleges } };
}
