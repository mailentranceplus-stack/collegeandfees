import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getSupabase } from "../../lib/supabase";
import { COLLEGE_IMAGES, FALLBACK_IMAGE, waLink, ACTIVE_SLUGS } from "../../lib/constants";
import { WaIcon, WaButton } from "../../components/WaButton";

const WA_MSG = "Hi, I need help choosing an engineering college in Bangalore. Can you guide me?";

const PLACEHOLDER_COLLEGES = [
  { id: 1, slug: "rvce-bangalore", name: "RV College of Engineering", short_name: "RVCE", city: "Bangalore", type: "Private Autonomous", established: 1963, naac_grade: "A+", is_active: true, rankings: [{ rank: 99, source: "NIRF", year: 2024 }] },
  { id: 2, slug: "bms-college-of-engineering", name: "BMS College of Engineering", short_name: "BMSCE", city: "Bangalore", type: "Private Autonomous", established: 1946, naac_grade: "A", is_active: false, rankings: [] },
  { id: 3, slug: "christ-university-bangalore", name: "Christ University – Faculty of Engineering", short_name: "Christ", city: "Bangalore", type: "Deemed University", established: 1969, naac_grade: "A+", is_active: true, rankings: [] },
  { id: 4, slug: "msrit-bangalore", name: "MS Ramaiah Institute of Technology", short_name: "MSRIT", city: "Bangalore", type: "Private Autonomous", established: 1962, naac_grade: "A+", is_active: false, rankings: [] },
  { id: 5, slug: "pes-university-bangalore", name: "PES University", short_name: "PESU", city: "Bangalore", type: "Deemed University", established: 1972, naac_grade: "A", is_active: false, rankings: [] },
];

const PLACEHOLDER_FAQS = [
  { id: 1, question: "Which are the top engineering colleges in Bangalore?", answer: "RVCE (NIRF #82), BMS College of Engineering, MS Ramaiah Institute of Technology, PES University, and Christ University are consistently ranked among the top engineering colleges in Bangalore. RVCE is considered the best overall for CSE placements and research output." },
  { id: 2, question: "What is the fee range for engineering colleges in Bangalore?", answer: "Fees range from ₹50,000-2,00,000/year for KCET (government quota) seats to ₹1,50,000-3,60,000/year for management quota at top private colleges. Government engineering colleges charge ₹15,000-50,000/year." },
  { id: 3, question: "Can I get into RVCE without KCET rank?", answer: "Yes. RVCE offers management quota seats (about 30-35% of total intake) that do not require a KCET rank. You need minimum 45% in PCM in Class 12. Contact our counsellor for current management quota availability and fees." },
  { id: 4, question: "Which Bangalore engineering college has the best placements?", answer: "RVCE consistently has the highest placement rates and packages among Bangalore engineering colleges, with CSE students receiving offers from top MNCs. BMS and MSRIT also have strong placement records, particularly for CSE and ECE branches." },
];

function FaqAccordion({ faqs }) {
  const [openId, setOpenId] = useState(null);
  return (
    <div>
      {faqs.map((faq, i) => {
        const id = faq.id || i;
        const isOpen = openId === id;
        return (
          <div key={id} className="faq-item">
            <button className="faq-question" onClick={() => setOpenId(isOpen ? null : id)} aria-expanded={isOpen}>
              <span>{faq.question}</span>
              <span style={{ flexShrink: 0, width: "28px", height: "28px", border: "1px solid var(--border)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)", fontSize: "18px", fontWeight: 700, transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
            </button>
            {isOpen && <div className="faq-answer">{faq.answer}</div>}
          </div>
        );
      })}
    </div>
  );
}

export default function BangaloreEngineeringColleges({ colleges, faqs }) {
  const displayColleges = colleges.length > 0 ? colleges : PLACEHOLDER_COLLEGES;
  const displayFaqs = faqs.length > 0 ? faqs : PLACEHOLDER_FAQS;
  const activeColleges = displayColleges.filter((c) => ACTIVE_SLUGS.has(c.slug));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: displayFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://collegeandfees.com" },
      { "@type": "ListItem", position: 2, name: "Engineering Colleges", item: "https://collegeandfees.com/engineering-colleges" },
      { "@type": "ListItem", position: 3, name: "Bangalore", item: "https://collegeandfees.com/engineering-colleges/bangalore" },
    ],
  };

  return (
    <>
      <Head>
        <title>Engineering Colleges in Bangalore 2026 — Fees, Cutoffs and Rankings</title>
        <meta name="description" content="Complete list of engineering colleges in Bangalore 2026 — fees, KCET cutoffs, NIRF rankings and management quota info. Free counsellor guidance." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://collegeandfees.com/engineering-colleges/bangalore" />
        <meta property="og:title" content="Engineering Colleges in Bangalore 2026 — Fees, Cutoffs and Rankings" />
        <meta property="og:description" content="Complete list of engineering colleges in Bangalore 2026 with fees, KCET cutoffs, NIRF rankings and management quota information." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://collegeandfees.com/engineering-colleges/bangalore" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      </Head>

      <Header />

      <main>
        {/* Breadcrumb */}
        <div style={{ borderBottom: "1px solid var(--border)", padding: "12px 0" }}>
          <div className="container">
            <nav className="breadcrumb">
              <Link href="/">Home</Link>
              <span className="breadcrumb-sep">›</span>
              <span>Engineering Colleges</span>
              <span className="breadcrumb-sep">›</span>
              <span style={{ color: "var(--foreground)", fontWeight: 600 }}>Bangalore</span>
            </nav>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <h1 className="section-title" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
              Engineering Colleges in Bangalore 2026 — Fees, Rankings and Admission Guide
            </h1>

            {/* Intro */}
            <p style={{ color: "var(--muted-foreground)", fontSize: "16px", lineHeight: "1.8", marginBottom: "48px", maxWidth: "820px" }}>
              Bangalore has over 60 engineering colleges affiliated to VTU Belagavi and several deemed universities. The range is wide — from RVCE (NIRF #82) to smaller colleges with single-digit rankings. This page lists every engineering college in Bangalore with verified fee information, NIRF rankings, and direct links to management quota and direct admission guidance.
            </p>

            {/* Featured Colleges */}
            {activeColleges.length > 0 && (
              <section style={{ marginBottom: "64px" }}>
                <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px" }}>
                  Top Engineering Colleges in Bangalore 2026
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
                  {activeColleges.map((college) => {
                    const nirf = college.rankings?.find?.((r) => r.source === "NIRF");
                    const photo = COLLEGE_IMAGES[college.slug] || FALLBACK_IMAGE;
                    return (
                      <div key={college.id} className="glass-card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
                        <div style={{ overflow: "hidden", height: "160px", position: "relative" }}>
                          <Image src={photo} alt={`${college.name} campus, Bangalore`} fill style={{ objectFit: "cover", objectPosition: "center" }} sizes="(max-width: 768px) 100vw, 340px" />
                        </div>
                        <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", flexWrap: "wrap" }}>
                            {college.naac_grade && (
                              <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--primary)", border: "1px solid rgba(239,175,38,0.3)", borderRadius: "999px", padding: "3px 10px" }}>
                                NAAC {college.naac_grade}
                              </span>
                            )}
                            {nirf && (
                              <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--accent-green)", border: "1px solid rgba(34,195,94,0.3)", borderRadius: "999px", padding: "3px 10px" }}>
                                NIRF #{nirf.rank}
                              </span>
                            )}
                          </div>
                          <Link href={`/colleges/${college.slug}`} style={{ fontWeight: 700, fontSize: "16px", color: "var(--foreground)", lineHeight: "1.3", marginBottom: "4px", textDecoration: "none" }}>
                            {college.name}
                          </Link>
                          <p style={{ fontSize: "12px", color: "var(--muted-foreground)", marginBottom: "6px" }}>{college.type}</p>
                          {college.established && (
                            <p style={{ fontSize: "12px", color: "var(--muted-foreground)", marginBottom: "16px" }}>Est. {college.established}</p>
                          )}
                          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "auto", paddingTop: "14px", borderTop: "1px solid var(--border)" }}>
                            <Link href={`/colleges/${college.slug}`} className="btn-outline-sm" style={{ fontSize: "12px", padding: "6px 12px" }}>Overview</Link>
                            <Link href={`/colleges/${college.slug}/fees`} className="btn-outline-sm" style={{ fontSize: "12px", padding: "6px 12px" }}>Fees</Link>
                            <Link href={`/direct-admission/${college.slug}`} className="btn-outline-sm" style={{ fontSize: "12px", padding: "6px 12px" }}>Direct Admission</Link>
                            <Link href={`/management-quota/${college.slug}`} className="btn-outline-sm" style={{ fontSize: "12px", padding: "6px 12px" }}>Management Quota</Link>
                          </div>
                          <div style={{ marginTop: "10px" }}>
                            <a href={waLink(WA_MSG)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp-sm" style={{ fontSize: "12px", padding: "7px 14px", width: "100%", justifyContent: "center" }}>
                              <WaIcon size={13} /> Ask Counsellor
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Complete table */}
            <section style={{ marginBottom: "56px" }}>
              <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "20px" }}>
                All Engineering Colleges in Bangalore — Complete List
              </h2>
              <div className="info-box" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ overflowX: "auto" }}>
                  <table className="fees-table">
                    <thead>
                      <tr>
                        <th>College Name</th>
                        <th>Type</th>
                        <th>NAAC</th>
                        <th style={{ textAlign: "right" }}>NIRF</th>
                        <th style={{ textAlign: "center" }}>Mgmt Quota</th>
                        <th style={{ textAlign: "right" }}>More Info</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeColleges.map((college) => {
                        const nirf = college.rankings?.find?.((r) => r.source === "NIRF");
                        const totalMgmtSeats = (college.college_courses || []).reduce((sum, cc) => sum + (cc.mgmt_quota_seats || 0), 0);
                        return (
                          <tr key={college.id}>
                            <td style={{ fontWeight: 600 }}>
                              <Link href={`/colleges/${college.slug}`} style={{ color: "var(--foreground)", textDecoration: "none" }}>
                                {college.name}
                              </Link>
                              {!college.is_active && (
                                <span style={{ fontSize: "11px", color: "var(--muted-foreground)", marginLeft: "8px" }}>• Info pending</span>
                              )}
                            </td>
                            <td style={{ color: "var(--muted-foreground)", fontSize: "13px" }}>{college.type || "Private"}</td>
                            <td>
                              {college.naac_grade ? (
                                <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--primary)", border: "1px solid rgba(239,175,38,0.3)", borderRadius: "999px", padding: "2px 8px" }}>
                                  {college.naac_grade}
                                </span>
                              ) : "—"}
                            </td>
                            <td style={{ textAlign: "right", color: "var(--muted-foreground)", fontSize: "14px" }}>
                              {nirf ? `#${nirf.rank}` : "—"}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {totalMgmtSeats > 0 ? (
                                <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--accent-green)" }}>Available</span>
                              ) : (
                                <span style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>Check</span>
                              )}
                            </td>
                            <td style={{ textAlign: "right" }}>
                              <Link href={`/colleges/${college.slug}`} style={{ fontSize: "12px", color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
                                View Details →
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* WhatsApp CTA */}
            <div className="glass-card" style={{ padding: "40px 32px", textAlign: "center", marginBottom: "56px" }}>
              <div className="badge" style={{ margin: "0 auto 12px" }}>Free Guidance</div>
              <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "10px" }}>
                Confused about which Bangalore engineering college is right for your rank and budget?
              </h2>
              <p style={{ color: "var(--muted-foreground)", marginBottom: "24px", fontSize: "15px", lineHeight: "1.7" }}>
                Our counsellor is an RVCE alumnus — free guidance on WhatsApp. No fees, no obligation.
              </p>
              <a href={waLink(WA_MSG)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <WaIcon size={20} /> WhatsApp Free Guidance Now
              </a>
            </div>

            {/* FAQ */}
            <section style={{ marginBottom: "24px" }}>
              <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "8px" }}>
                Frequently Asked Questions — Engineering Colleges Bangalore
              </h2>
              <p style={{ color: "var(--muted-foreground)", marginBottom: "32px", fontSize: "15px" }}>
                Answers to the most common questions from students and parents.
              </p>
              <FaqAccordion faqs={displayFaqs} />
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  let colleges = [];
  let faqs = [];

  try {
    const supabase = getSupabase();
    if (supabase) {
      const [{ data: collegeData }, { data: faqData }] = await Promise.all([
        supabase
          .from("colleges")
          .select("id, slug, name, short_name, city, established, type, naac_grade, is_active, rankings(rank, source, year), placements(avg_package_lpa, highest_package_lpa, year), college_courses(mgmt_quota_seats, govt_quota_seats, total_seats)")
          .eq("city", "Bangalore")
          .eq("is_active", true)
          .order("is_active", { ascending: false }),
        supabase
          .from("faqs")
          .select("id, question, answer")
          .is("college_id", null)
          .eq("is_active", true)
          .order("sort_order")
          .limit(6),
      ]);

      if (collegeData) colleges = collegeData;
      if (faqData) faqs = faqData;
    }
  } catch (err) {
    console.error("[engineering-colleges/bangalore] getServerSideProps error:", err.message);
  }

  return { props: { colleges, faqs } };
}
