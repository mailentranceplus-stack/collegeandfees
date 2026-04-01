import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CollegeCard from "../../components/CollegeCard";
import { getSupabase } from "../../lib/supabase";
import { ACTIVE_SLUGS, waLink } from "../../lib/constants";
import { WaIcon } from "../../components/WaButton";

const WA_GENERAL = waLink("Hi, I want to know about direct admission in Bangalore engineering colleges. Can you guide me?");

const PLACEHOLDER_COLLEGES = [
  { id: 1, slug: "rvce-bangalore", name: "RV College of Engineering", city: "Bangalore", naac_grade: "A+" },
  { id: 3, slug: "christ-university-bangalore", name: "Christ University – Faculty of Engineering", city: "Bangalore", naac_grade: "A+" },
];

const PLACEHOLDER_FAQS = [
  { id: 1, question: "What is direct admission in Bangalore engineering colleges?", answer: "Direct admission refers to admission through Management Quota seats — seats that colleges fill directly without KCET or COMEDK counselling. These seats are available at every private engineering college in Bangalore, typically 30-35% of total intake." },
  { id: 2, question: "What is the eligibility for direct admission?", answer: "You need a minimum of 45% marks in PCM (Physics, Chemistry, Mathematics) in Class 12. No minimum KCET/COMEDK rank is required for management quota seats." },
  { id: 3, question: "How much does direct admission cost in Bangalore?", answer: "Management quota fees range from ₹80,000/year at government-aided colleges to ₹3,50,000/year at top private colleges for CSE/IT branches. Contact our counsellor for exact 2026-27 figures." },
  { id: 4, question: "When does direct admission open in 2026?", answer: "Management quota applications typically open in June 2026 after KCET results are announced. The process continues through July 2026 until all seats are filled." },
];

function FaqAccordion({ faqs }) {
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

export default function BangalorePage({ colleges, faqs }) {
  const displayColleges = colleges.length > 0 ? colleges : PLACEHOLDER_COLLEGES;
  const displayFaqs = faqs.length > 0 ? faqs : PLACEHOLDER_FAQS;

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
      { "@type": "ListItem", position: 2, name: "Direct Admission", item: "https://collegeandfees.com/direct-admission" },
      { "@type": "ListItem", position: 3, name: "Bangalore", item: "https://collegeandfees.com/direct-admission/bangalore" },
    ],
  };

  return (
    <>
      <Head>
        <title>Direct Admission in Bangalore Engineering Colleges 2026 — Fees, Process and Guide</title>
        <meta
          name="description"
          content="Complete guide to direct admission in Bangalore engineering colleges 2026. Management quota fees, eligibility and process. Free counsellor guidance on WhatsApp."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://collegeandfees.com/direct-admission/bangalore" />
        <meta property="og:title" content="Direct Admission in Bangalore Engineering Colleges 2026" />
        <meta property="og:description" content="Complete guide to direct admission in Bangalore engineering colleges 2026. Management quota fees, eligibility and process." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://collegeandfees.com/direct-admission/bangalore" />
        <meta property="og:image" content="https://collegeandfees.com/opengraph.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </Head>

      <Header />

      <main>
        {/* Breadcrumb */}
        <div style={{ borderBottom: "1px solid var(--border)", padding: "12px 0" }}>
          <div className="container">
            <nav className="breadcrumb">
              <Link href="/">Home</Link>
              <span className="breadcrumb-sep">›</span>
              <span>Direct Admission</span>
              <span className="breadcrumb-sep">›</span>
              <span style={{ color: "var(--foreground)", fontWeight: 600 }}>Bangalore</span>
            </nav>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <h1 className="section-title" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
              Direct Admission in Bangalore Engineering Colleges 2026
            </h1>

            {/* Counsellor block */}
            <div className="counsellor-block" style={{ marginBottom: "48px", marginTop: "20px" }}>
              <p>
                &ldquo;Direct admission in Bangalore engineering colleges refers to admission through Management Quota seats — seats that colleges fill directly without KCET or COMEDK counselling. These seats are available at every private engineering college in Bangalore, typically 30–35% of total intake. As an RVCE alumnus who has counselled hundreds of students through this process, I can tell you: the fees vary wildly by branch and college. CSE at RVCE costs approximately ₹3.6 lakh/year; the same branch at a lesser-known college may cost ₹80,000/year. Getting the right seat at the right fee requires knowing which colleges have genuine vacancy — and that changes week to week. WhatsApp me and I&apos;ll give you an honest, unbiased picture within 24 hours.&rdquo;
              </p>
              <div style={{ marginTop: "20px" }}>
                <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" className="btn-whatsapp-sm">
                  <WaIcon />
                  Ask Counsellor on WhatsApp
                </a>
              </div>
            </div>

            {/* College Cards Grid */}
            <section style={{ marginBottom: "56px" }}>
              <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "24px" }}>
                Engineering Colleges with Direct Admission in Bangalore
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
                {displayColleges.map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>
            </section>

            {/* WhatsApp CTA Block */}
            <div className="glass-card" style={{ padding: "40px 32px", textAlign: "center", marginBottom: "56px" }}>
              <div className="badge" style={{ margin: "0 auto 12px" }}>Free Guidance</div>
              <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "10px" }}>
                Want direct admission in a top Bangalore engineering college?
              </h2>
              <p style={{ color: "var(--muted-foreground)", marginBottom: "24px", fontSize: "15px", lineHeight: "1.7" }}>
                Our counsellor is an RVCE alumnus — free guidance on WhatsApp. No fees, no obligation.
              </p>
              <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <WaIcon size={20} />
                WhatsApp Free Guidance Now
              </a>
            </div>

            {/* Key Facts */}
            <section style={{ marginBottom: "56px" }}>
              <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "24px" }}>Key Facts About Direct Admission</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
                {[
                  { icon: "🎓", fact: "Management quota: 30–35% of total seats at most private colleges" },
                  { icon: "📅", fact: "Open: June–July 2026 after KCET counselling" },
                  { icon: "📄", fact: "Documents: 10th, 12th marksheets, CET rank card" },
                  { icon: "✅", fact: "No KCET/COMEDK rank required for management quota" },
                ].map((item, i) => (
                  <div key={i} className="glass-card" style={{ padding: "24px 20px" }}>
                    <div style={{ fontSize: "32px", marginBottom: "12px" }}>{item.icon}</div>
                    <p style={{ fontSize: "14px", color: "var(--muted-foreground)", lineHeight: "1.6" }}>{item.fact}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section style={{ marginBottom: "24px" }}>
              <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "8px" }}>
                Frequently Asked Questions — Direct Admission Bangalore
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
      const [{ data: collegeData }, { data: feesData }, { data: faqData }] = await Promise.all([
        supabase
          .from("colleges")
          .select("id, slug, name, short_name, city, naac_grade, type")
          .eq("is_active", true)
          .order("name"),
        supabase
          .from("fees")
          .select("college_id, course_id, tuition_fee, courses(name, short_name)")
          .eq("quota", "management")
          .order("tuition_fee", { ascending: false }),
        supabase
          .from("faqs")
          .select("id, question, answer")
          .is("college_id", null)
          .eq("is_active", true)
          .order("sort_order")
          .limit(8),
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

      if (faqData) faqs = faqData;
    }
  } catch (err) {
    console.error("Supabase fetch error:", err.message);
  }

  return { props: { colleges, faqs } };
}
