import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CollegeCard from "../components/CollegeCard";
import Testimonials from "../components/Testimonials";
import { getSupabase } from "../lib/supabase";

const WA_GENERAL = "https://wa.me/917975193033?text=Hi%2C%20I%20want%20to%20know%20about%20direct%20admission%20in%20Bangalore%20engineering%20colleges.";

const PLACEHOLDER_COLLEGES = [
  { id: 1, slug: "rvce-bangalore", name: "RV College of Engineering", city: "Bangalore", naac_grade: "A+", established: 1963, type: "Private" },
  { id: 2, slug: "bms-college-of-engineering", name: "BMS College of Engineering", city: "Bangalore", naac_grade: "A", established: 1946, type: "Private" },
  { id: 3, slug: "christ-university-bangalore", name: "Christ University – Faculty of Engineering", city: "Bangalore", naac_grade: "A+", established: 1969, type: "Deemed" },
  { id: 4, slug: "msrit-bangalore", name: "MS Ramaiah Institute of Technology", city: "Bangalore", naac_grade: "A+", established: 1962, type: "Private" },
  { id: 5, slug: "pes-university-bangalore", name: "PES University", city: "Bangalore", naac_grade: "A", established: 1988, type: "Deemed" },
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
  { id: 3, question: "How much does CSE direct admission cost at top Bangalore colleges?", answer: "CSE management quota fees range from ₹1,60,000/year at RVCE to ₹3,00,000–₹5,00,000/year at deemed universities such as PES and Christ. Contact our counsellor for confirmed 2026-27 fee figures." },
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

function WaIcon() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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
        <meta name="description" content="Management quota fees, KCET cutoffs, COMEDK cutoffs and direct admission guidance for Bangalore engineering colleges 2026. Counselled by an RVCE alumnus. Free WhatsApp guidance." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Bangalore Engineering Admissions 2026 — Fees, Cutoffs and Direct Admission Guide" />
        <meta property="og:description" content="Management quota fees, KCET cutoffs, COMEDK cutoffs and direct admission guidance for Bangalore engineering colleges 2026." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://collegeandfees.com" />
        <link rel="canonical" href="https://collegeandfees.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "CollegeAndFees.com",
          "url": "https://collegeandfees.com",
          "description": "Management quota fees and direct admission guidance for Bangalore engineering colleges",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://collegeandfees.com/engineering-colleges/bangalore?q={search_term}",
            "query-input": "required name=search_term"
          }
        }) }} />
      </Head>

      <Header />

      {/* Hero */}
      <section className="hero">
        <img
          src="https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80"
          alt=""
          className="hero-bg"
          aria-hidden="true"
        />
        <div className="hero-content">
          <div className="hero-trust">
            <span style={{ color: "var(--primary)" }}>★★★★★</span>
            Trusted by 500+ families for direct admission guidance
          </div>
          <h1 className="hero-title">
            Engineering Colleges<br />
            in <span className="text-gold">Bangalore</span>
          </h1>
          <p className="hero-subtitle">
            Your complete guide to direct admission, fees, and rankings for top engineering colleges in Bangalore 2026.
          </p>
          <div className="hero-actions">
            <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
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
              { label: "Engineering Colleges", value: "200+" },
              { label: "Branches Available", value: "50+" },
              { label: "Total Seats", value: "80,000+" },
              { label: "NAAC Accredited", value: "150+" },
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
                Management quota seats available at RVCE, BMS, MSRIT, PES, Christ and more. Free counsellor guidance.
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/direct-admission/bangalore" className="btn-outline-sm">
                View All Colleges →
              </Link>
              <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" className="btn-whatsapp-sm">
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
            <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
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
        colleges = collegeData.map((c) => ({ ...c, ...(feeMap[c.id] || {}) }));
      }
    }
  } catch (err) {
    console.error("Failed to fetch colleges:", err.message);
  }
  return { props: { colleges } };
}
