import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getSupabase } from "../../lib/supabase";

const WA_NUMBER = "917975193033";
const WA_GENERAL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi, I want to know about management quota seats in Bangalore engineering colleges. Can you guide me?")}`;

const COLLEGE_IMAGES = {
  "rvce-bangalore":              "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=600&q=80",
  "christ-university-bangalore": "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=600&q=80",
  "bms-college-of-engineering":  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80",
  "pes-university-bangalore":    "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=600&q=80",
  "msrit-bangalore":             "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&q=80",
};
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80";

const PLACEHOLDER_COLLEGES = [
  { id: 1, slug: "rvce-bangalore", name: "RV College of Engineering", city: "Bangalore", naac_grade: "A+" },
  { id: 2, slug: "bms-college-of-engineering", name: "BMS College of Engineering", city: "Bangalore", naac_grade: "A" },
  { id: 3, slug: "christ-university-bangalore", name: "Christ University – Faculty of Engineering", city: "Bangalore", naac_grade: "A+" },
  { id: 4, slug: "msrit-bangalore", name: "MS Ramaiah Institute of Technology", city: "Bangalore", naac_grade: "A+" },
  { id: 5, slug: "pes-university-bangalore", name: "PES University", city: "Bangalore", naac_grade: "A" },
];

const PLACEHOLDER_FAQS = [
  { id: 1, question: "What is management quota in engineering colleges?", answer: "Management quota refers to seats filled directly by the college management — outside KCET and COMEDK counselling. Typically 30-35% of seats in every private engineering college in Bangalore are management quota. These seats come with higher fees than government quota seats but offer admission certainty." },
  { id: 2, question: "Do I need a KCET/COMEDK rank for management quota?", answer: "No. Management quota does not require a KCET or COMEDK rank. You only need to meet the basic eligibility: minimum 45% marks in PCM (Physics, Chemistry, Mathematics) in Class 12. The admission is at the discretion of the college management." },
  { id: 3, question: "How much are management quota fees in Bangalore engineering colleges?", answer: "Management quota fees vary significantly: from ₹1.5 lakh/year at some private colleges to ₹3.6 lakh/year at top colleges like RVCE for CSE. Contact our counsellor for exact 2026-27 fee details for specific colleges and branches." },
  { id: 4, question: "When does management quota admission open in 2026?", answer: "Management quota seats become available in phases. Some seats open before KCET/COMEDK counselling (April-May), but most management quota seats open after KCET counselling ends (July-August 2026). Availability changes daily — contact our counsellor for current status." },
];

const KEY_FACTS = [
  { icon: "🏛️", fact: "Management quota seats: 30-35% of total intake at most Bangalore private engineering colleges" },
  { icon: "💰", fact: "Fees: Typically 3–10x higher than KCET government quota fees, varies by college and branch" },
  { icon: "✅", fact: "No entrance rank required: Management quota does not need KCET or COMEDK rank" },
  { icon: "📅", fact: "Seats available after counselling: Remaining management quota seats are available after KCET/COMEDK rounds end" },
];

function WaIcon() {
  return (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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

function MqCollegeCard({ college }) {
  const photo = COLLEGE_IMAGES[college.slug] || FALLBACK_IMAGE;
  const feeDisplay = college.top_fee ? ("₹" + Number(college.top_fee).toLocaleString("en-IN")) : null;
  const courseName = college.top_course || "CSE";

  return (
    <Link href={`/management-quota/${college.slug}`} className="college-card">
      <div style={{ overflow: "hidden", flexShrink: 0 }}>
        <img
          src={photo}
          alt={college.name}
          className="college-card-image"
          loading="lazy"
        />
      </div>
      <div className="college-card-body">
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
          {college.naac_grade && (
            <span style={{
              display: "inline-block",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "var(--primary)",
              border: "1px solid rgba(239,175,38,0.3)",
              borderRadius: "999px",
              padding: "3px 10px",
            }}>
              NAAC {college.naac_grade}
            </span>
          )}
          {college.type && (
            <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>{college.type}</span>
          )}
        </div>
        <h3 style={{ fontWeight: 700, fontSize: "16px", color: "var(--foreground)", lineHeight: "1.3", marginBottom: "4px" }}>
          {college.name}
        </h3>
        {college.city && (
          <p style={{ fontSize: "12px", color: "var(--muted-foreground)", marginBottom: "14px" }}>{college.city}</p>
        )}
        {feeDisplay ? (
          <div style={{
            background: "rgba(239,175,38,0.08)",
            border: "1px solid rgba(239,175,38,0.2)",
            borderRadius: "10px",
            padding: "12px 16px",
            marginBottom: "14px",
          }}>
            <p style={{ fontSize: "11px", color: "var(--muted-foreground)", marginBottom: "4px", fontWeight: 600, letterSpacing: "0.05em" }}>
              {courseName} &middot; Management Quota
            </p>
            <p className="fees-highlight" style={{ fontSize: "22px", lineHeight: 1.2 }}>
              {feeDisplay}
              <span style={{ fontSize: "13px", fontWeight: 400, color: "var(--muted-foreground)" }}>/yr</span>
            </p>
          </div>
        ) : (
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            padding: "12px 16px",
            marginBottom: "14px",
          }}>
            <p style={{ fontSize: "11px", color: "var(--muted-foreground)", marginBottom: "4px" }}>Management Quota</p>
            <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--muted-foreground)" }}>Contact for fee details</p>
          </div>
        )}
        <div style={{ marginTop: "auto", paddingTop: "12px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "11px", color: "var(--accent-green)", fontWeight: 700, letterSpacing: "0.06em" }}>
            SEATS AVAILABLE 2026
          </span>
          <span style={{ fontSize: "12px", color: "var(--primary)", fontWeight: 600 }}>
            View Fees &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function MgmtQuotaBangalorePage({ colleges, faqs }) {
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
      { "@type": "ListItem", position: 2, name: "Management Quota", item: "https://collegeandfees.com/management-quota" },
      { "@type": "ListItem", position: 3, name: "Bangalore", item: "https://collegeandfees.com/management-quota/bangalore" },
    ],
  };

  return (
    <>
      <Head>
        <title>Management Quota Engineering Colleges Bangalore 2026 — Fees, Seats and Process</title>
        <meta
          name="description"
          content="Complete guide to management quota admission in Bangalore engineering colleges 2026. College-wise fees, seats available, eligibility and process. Free counsellor guidance on WhatsApp."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://collegeandfees.com/management-quota/bangalore" />
        <meta property="og:title" content="Management Quota Engineering Colleges Bangalore 2026 — Fees, Seats and Process" />
        <meta property="og:description" content="Complete guide to management quota admission in Bangalore engineering colleges 2026. College-wise fees, seats available, eligibility and process." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://collegeandfees.com/management-quota/bangalore" />
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
              <span>Management Quota</span>
              <span className="breadcrumb-sep">›</span>
              <span style={{ color: "var(--foreground)", fontWeight: 600 }}>Bangalore</span>
            </nav>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <h1 className="section-title" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
              Management Quota Engineering Colleges in Bangalore 2026
            </h1>

            {/* Counsellor block */}
            <div className="counsellor-block" style={{ marginBottom: "48px", marginTop: "20px" }}>
              <p>
                &ldquo;Management quota in engineering colleges refers to seats filled directly by the college management — outside the KCET and COMEDK counselling process. At most private engineering colleges in Bangalore, 30-35% of seats are management quota.
              </p>
              <p style={{ marginTop: "14px" }}>
                These seats come with significantly higher fees than government quota seats. But they offer admission certainty — students who know their academic profile will not secure a KCET or COMEDK seat can lock in a good college through management quota, provided they can manage the fees.
              </p>
              <p style={{ marginTop: "14px" }}>
                As an RVCE alumnus who has guided hundreds of families through this decision, I can tell you: the single most important thing is having the correct branch-wise fee before you commit. Colleges rarely publish this clearly. The figures on this page are verified from official sources and direct contact with admissions offices.&rdquo;
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
                Engineering Colleges with Management Quota in Bangalore
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
                {displayColleges.map((college) => (
                  <MqCollegeCard key={college.id} college={college} />
                ))}
              </div>
            </section>

            {/* WhatsApp CTA Block */}
            <div className="glass-card" style={{ padding: "40px 32px", textAlign: "center", marginBottom: "56px" }}>
              <div className="badge" style={{ margin: "0 auto 12px" }}>Free Guidance</div>
              <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "10px" }}>
                Want to know if management quota is worth it for your child?
              </h2>
              <p style={{ color: "var(--muted-foreground)", marginBottom: "24px", fontSize: "15px", lineHeight: "1.7" }}>
                Our counsellor is an RVCE alumnus — free guidance on WhatsApp. No fees, no obligation.
              </p>
              <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Free Guidance Now
              </a>
            </div>

            {/* Key Facts */}
            <section style={{ marginBottom: "56px" }}>
              <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "24px" }}>Key Facts About Management Quota</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
                {KEY_FACTS.map((item, i) => (
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
                Frequently Asked Questions — Management Quota Bangalore
              </h2>
              <p style={{ color: "var(--muted-foreground)", marginBottom: "32px", fontSize: "15px" }}>
                Answers to the most common questions from students and parents about management quota.
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
        colleges = collegeData.map((c) => ({ ...c, ...(feeMap[c.id] || {}) }));
      }

      if (faqData) faqs = faqData;
    }
  } catch (err) {
    console.error("Supabase fetch error:", err.message);
  }

  return { props: { colleges, faqs } };
}
