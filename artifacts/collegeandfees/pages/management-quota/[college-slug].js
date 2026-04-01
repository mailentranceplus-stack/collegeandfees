import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getSupabase } from "../../lib/supabase";
import { COLLEGE_IMAGES, waLink } from "../../lib/constants";
import { WaIcon, WaButton } from "../../components/WaButton";

const DEFAULT_DATES = [
  { event: "KCET 2026 Results", date: "May 2026" },
  { event: "Management Quota Applications Open", date: "June 2026" },
  { event: "Document Verification", date: "June–July 2026" },
  { event: "Seat Confirmation & Fee Payment", date: "July 2026" },
  { event: "Classes Begin", date: "August 2026" },
];

function isMbaCourse(fee) {
  const name = (fee.course_name || "").toLowerCase();
  const short = (fee.course_short || "").toLowerCase();
  return name.includes("mba") || short.includes("mba");
}

function FeesTable({ fees, slug }) {
  return (
    <div className="info-box" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table className="fees-table">
          <thead>
            <tr>
              <th>Branch</th>
              <th style={{ textAlign: "right" }}>Tuition Fee/yr</th>
              <th style={{ textAlign: "right" }}>Hostel Fee/yr</th>
              <th style={{ textAlign: "right" }}>Total/yr</th>
              <th style={{ textAlign: "right" }}>4-yr Total</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((fee, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>
                  {fee.course_name}{" "}
                  <span style={{ color: "var(--muted-foreground)", fontSize: "12px" }}>({fee.course_short})</span>
                </td>
                <td style={{ textAlign: "right" }} className="fees-highlight">
                  ₹{fee.tuition_fee?.toLocaleString("en-IN")}
                </td>
                <td style={{ textAlign: "right", color: "var(--muted-foreground)" }}>
                  {fee.hostel_fee ? `₹${fee.hostel_fee.toLocaleString("en-IN")}` : "—"}
                </td>
                <td style={{ textAlign: "right", fontWeight: 600 }}>
                  ₹{((fee.tuition_fee || 0) + (fee.hostel_fee || 0)).toLocaleString("en-IN")}
                </td>
                <td style={{ textAlign: "right", color: "var(--muted-foreground)" }}>
                  ₹{((fee.tuition_fee || 0) * 4).toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)" }}>
        <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
          * Fees shown are for academic year {fees[0]?.academic_year || "2024-25"}. 2026-27 fees may vary by 5–10%. Contact counsellor for confirmed figures.
        </p>
        {slug === "rvce-bangalore" && (
          <p style={{ fontSize: "12px", color: "var(--primary)", marginTop: "6px", fontWeight: 600 }}>
            * For RVCE, Year 1 management quota fees are higher than subsequent years. The 4-year total shown is confirmed for 2026-27. Year 1 fee is higher; Years 2–4 are lower.
          </p>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   INACTIVE PLACEHOLDER PAGE
───────────────────────────────────────────── */
function InactivePage({ college, slug, similarColleges }) {
  const name = college.short_name || college.name;
  const waMsg = `Hi, I want to know about management quota seats at ${college.name}. Can you guide me?`;

  const tabs = [
    { label: "Overview", href: `/colleges/${slug}` },
    { label: "Fees", href: `/colleges/${slug}/fees` },
  ];

  return (
    <>
      <Header />

      {/* College Header Band */}
      <div className="college-header-band">
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
            <div>
              <p style={{ color: "var(--primary)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>
                Management Quota 2026
              </p>
              <h1 style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 800 }}>{name}</h1>
              <p style={{ color: "var(--muted-foreground)", marginTop: "6px", fontSize: "14px" }}>
                {[college.city, college.established && `Estd. ${college.established}`, college.affiliation, college.naac_grade && `NAAC ${college.naac_grade}`].filter(Boolean).join(" | ")}
              </p>
            </div>
            <WaButton href={waLink(waMsg)} size="sm">Ask Counsellor</WaButton>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="tab-bar">
        <div className="tab-bar-inner">
          {tabs.map((tab) => (
            <Link key={tab.label} href={tab.href} className={`tab-item${tab.active ? " active" : ""}`}>
              {tab.label}
            </Link>
          ))}
        </div>
      </div>

      <main style={{ padding: "48px 0" }}>
        <div className="container">
          <div className="glass-card" style={{ padding: "48px 32px", textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📋</div>
            <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "12px" }}>Information Being Verified</h2>
            <p style={{ color: "var(--muted-foreground)", marginBottom: "28px", lineHeight: "1.7" }}>
              Detailed management quota information for {name} is being verified. For accurate 2026 fees and process, contact our counsellor on WhatsApp — free, no obligation.
            </p>
            <WaButton href={waLink(waMsg)}>Get Free Guidance on WhatsApp</WaButton>
          </div>

          {similarColleges.length > 0 && (
            <section style={{ marginTop: "56px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "20px" }}>Other Colleges with Management Quota in Bangalore</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
                {similarColleges.map((c) => (
                  <Link key={c.id} href={`/management-quota/${c.slug}`} className="mini-card">
                    {c.naac_grade && (
                      <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, color: "var(--primary)", border: "1px solid rgba(239,175,38,0.3)", borderRadius: "999px", padding: "2px 8px", marginBottom: "8px" }}>
                        NAAC {c.naac_grade}
                      </span>
                    )}
                    <h3 style={{ fontWeight: 600, fontSize: "14px", lineHeight: "1.4", marginBottom: "8px" }}>{c.name}</h3>
                    <p style={{ fontSize: "12px", color: "var(--primary)", fontWeight: 600 }}>View Management Quota →</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

/* ─────────────────────────────────────────────
   ACTIVE COLLEGE PAGE
───────────────────────────────────────────── */
export default function MgmtQuotaCollegePage({ college, fees, admissions, content, placements, ranking, faqs, similarColleges, slug }) {
  const [phone, setPhone] = useState("");
  const [openFaqId, setOpenFaqId] = useState(null);

  if (!college.is_active) {
    return (
      <>
        <Head>
          <title>{`Management Quota ${college.short_name || college.name} 2026 — Fees & Process | CollegeAndFees`}</title>
          <meta name="description" content={`Management quota admission in ${college.short_name || college.name} 2026. Contact counsellor for fee and process details.`} />
          <meta name="robots" content="noindex, nofollow" />
          <link rel="canonical" href={`https://collegeandfees.com/management-quota/${slug}`} />
        </Head>
        <InactivePage college={college} slug={slug} similarColleges={similarColleges} />
      </>
    );
  }

  const shortName = college.short_name || college.name;
  const waMsg = `Hi, I want to know about management quota seats at ${college.name}. Can you guide me?`;

  const metaTitle = `${college.short_name || college.name} Management Quota Fees 2026 — Seats and Admission Process`;
  const metaDesc = `Management quota admission in ${shortName} 2026. Branch-wise fees, seat availability, documents, and step-by-step process. Free counsellor on WhatsApp.`;
  const canonicalUrl = `https://collegeandfees.com/management-quota/${slug}`;

  const tabs = [
    { label: "Overview", href: `/colleges/${slug}` },
    { label: "Fees", href: `/colleges/${slug}/fees` },
    { label: "MQ Fees", href: `/management-quota/${slug}`, active: true },
  ];

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: college.name,
    address: { "@type": "PostalAddress", addressLocality: college.city, addressCountry: "IN" },
    url: canonicalUrl,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://collegeandfees.com" },
      { "@type": "ListItem", position: 2, name: "Management Quota Bangalore", item: "https://collegeandfees.com/management-quota/bangalore" },
      { "@type": "ListItem", position: 3, name: college.name, item: canonicalUrl },
    ],
  };

  const faqJsonLd = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  } : null;

  const importantDates = admissions?.important_dates
    ? Object.entries(admissions.important_dates).map(([event, date]) => ({ event, date }))
    : DEFAULT_DATES;

  const documents = admissions?.documents_required?.length > 0
    ? admissions.documents_required
    : [
        "10th Marksheet (original + 2 copies)",
        "12th/PUC Marksheet (original + 2 copies)",
        "KCET / COMEDK Rank Card (if applicable)",
        "Transfer Certificate",
        "Migration Certificate (if from another board)",
        "Category Certificate (SC/ST/OBC if applicable)",
        "6 Passport-size Photographs",
        "Aadhar Card copy",
      ];

  const isChrist = slug === "christ-university-bangalore";
  const mbaFees = isChrist ? fees.filter(isMbaCourse) : [];
  const engineeringFees = isChrist ? fees.filter((f) => !isMbaCourse(f)) : fees;

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content={canonicalUrl} /> <meta property="og:image" content={COLLEGE_IMAGES[slug] || "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80"} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} key="schema-org" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} key="schema-breadcrumb" />
        {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} key="schema-faq" />}
      </Head>

      <Header />

      {/* ── SECTION 1: College Header Band ── */}
      <div className="college-header-band">
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
            <div>
              <p style={{ color: "var(--primary)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>
                Management Quota 2026
              </p>
              <div style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, lineHeight: 1.2, color: "var(--foreground)" }}>{college.name}</div>
              <p style={{ color: "var(--muted-foreground)", marginTop: "8px", fontSize: "14px" }}>
                {[college.city, college.established && `Estd. ${college.established}`, college.affiliation, college.naac_grade && `NAAC ${college.naac_grade}`].filter(Boolean).join(" | ")}
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a
                href={waLink(`Hi, I want to know: will I get management quota at ${college.name}? What are the fees?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-sm"
              >
                Check Seat Availability
              </a>
              <WaButton href={waLink(waMsg)} size="sm">WhatsApp Now</WaButton>
            </div>
          </div>
        </div>
      </div>

      {/* ── Hero Banner Image ── */}
      {COLLEGE_IMAGES[slug] && (
        <div style={{ overflow: "hidden", background: "var(--card)", height: "260px", position: "relative" }}>
          <Image src={COLLEGE_IMAGES[slug]} alt={`${college.name} campus, Bangalore`} fill style={{ objectFit: "cover", objectPosition: "center", opacity: 0.55 }} priority />
        </div>
      )}

      {/* ── SECTION 2: Sticky Tab Bar ── */}
      <div className="tab-bar">
        <div className="tab-bar-inner">
          {tabs.map((tab) => (
            <Link key={tab.label} href={tab.href} className={`tab-item${tab.active ? " active" : ""}`}>
              {tab.label}
            </Link>
          ))}
        </div>
      </div>

      <main style={{ paddingBottom: "80px" }}>
        <div className="container" style={{ paddingTop: "32px" }}>

          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <Link href="/management-quota/bangalore">Management Quota Bangalore</Link>
            <span className="breadcrumb-sep">›</span>
            <span style={{ color: "var(--foreground)", fontWeight: 600 }}>{shortName}</span>
          </nav>
          <p style={{ marginBottom: "16px" }}>
            <Link href={`/colleges/${slug}`} style={{ fontSize: "13px", color: "var(--muted-foreground)", textDecoration: "none" }}>
              View Full College Profile →
            </Link>
          </p>

          {/* ── SECTION 3: H1 + Lead Capture Strip ── */}
          <h1 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 800, marginBottom: "20px" }}>
            {college.short_name || college.name} Management Quota Fees 2026 — Seats and Admission Process
          </h1>
          <div className="cta-strip">
            <span className="cta-strip-text" style={{ fontWeight: 500, color: "var(--foreground)" }}>{shortName}</span>
            <input
              type="tel"
              placeholder="Enter your mobile number for callback"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="phone-input"
            />
            <button
              onClick={() => {
                const msg = phone
                  ? `Hi, I want guidance about management quota at ${college.name}. Please call me on ${phone}.`
                  : waMsg;
                window.open(waLink(msg), "_blank");
              }}
              className="btn-whatsapp-sm"
            >
              <WaIcon size={14} />
              Get Free Guidance
            </button>
          </div>

          {/* ── SECTION 4: Key Stats ── */}
          <div className="key-stats" style={{ marginBottom: "32px" }}>
            {[
              { label: "NAAC Grade", value: college.naac_grade || "—" },
              { label: "NIRF Rank", value: ranking ? `#${ranking.rank}` : "Not Ranked" },
              { label: "Highest Package", value: placements ? `${placements.highest_package_lpa} LPA` : "Data Awaited" },
              { label: "Management Quota", value: "Available ✓" },
            ].map((stat) => (
              <div key={stat.label} className="key-stat">
                <div className="key-stat-value">{stat.value}</div>
                <div className="key-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* ── SECTION 5: Fees Table ── */}
          <section style={{ marginBottom: "32px" }} id="fees">
            <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "12px" }}>
              Management Quota Fees at {shortName} 2026-27
            </h2>

            {/* Note above fees table */}
            <div style={{
              background: "rgba(239,175,38,0.06)",
              border: "1px solid rgba(239,175,38,0.2)",
              borderRadius: "10px",
              padding: "14px 18px",
              marginBottom: "16px",
              fontSize: "14px",
              color: "var(--muted-foreground)",
              lineHeight: "1.7",
            }}>
              Management quota seats are allocated by the college management directly — not through KCET or COMEDK counselling. These seats are typically 30-35% of total intake. The fees below are significantly higher than government quota fees.
            </div>

            {fees.length > 0 ? (
              isChrist ? (
                <>
                  {engineeringFees.length > 0 && (
                    <div style={{ marginBottom: "24px" }}>
                      <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "12px" }}>B.Tech / B.E. Management Quota Fees</h3>
                      <FeesTable fees={engineeringFees} slug={slug} />
                    </div>
                  )}
                  {mbaFees.length > 0 && (
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "12px" }}>MBA Management Quota Fees</h3>
                      <FeesTable fees={mbaFees} slug={slug} />
                    </div>
                  )}
                  {engineeringFees.length === 0 && mbaFees.length === 0 && (
                    <div className="info-box">
                      <p style={{ color: "var(--muted-foreground)", marginBottom: "16px", fontSize: "15px" }}>
                        Fee data for {college.name} is being verified. Contact counsellor for accurate 2026-27 figures.
                      </p>
                      <WaButton href={waLink(`Hi, what is the management quota fee for ${college.name} in 2026?`)} size="sm">
                        Get Fee Details on WhatsApp
                      </WaButton>
                    </div>
                  )}
                </>
              ) : (
                <FeesTable fees={fees} slug={slug} />
              )
            ) : (
              <div className="info-box">
                <p style={{ color: "var(--muted-foreground)", marginBottom: "16px", fontSize: "15px" }}>
                  Fee data for {college.name} is being verified. Contact counsellor for accurate 2026-27 figures.
                </p>
                <WaButton href={waLink(`Hi, what is the management quota fee for ${college.name} in 2026?`)} size="sm">
                  Get Fee Details on WhatsApp
                </WaButton>
              </div>
            )}
          </section>

          {/* Mid-page CTA */}
          <div className="glass-card" style={{ padding: "24px", marginBottom: "32px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
            <p style={{ fontWeight: 500, fontSize: "15px", color: "var(--foreground)", flex: 1 }}>
              Is management quota at {shortName} worth it for your budget? Our counsellor can give you an honest picture in 5 minutes.
            </p>
            <WaButton href={waLink(waMsg)} size="sm">Ask on WhatsApp</WaButton>
          </div>

          {/* ── SECTION 6: Admission Process ── */}
          <section className="info-box" style={{ marginBottom: "32px" }} id="process">
            <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}>
              Management Quota Admission Process at {shortName}
            </h2>
            {admissions?.mgmt_quota_process ? (
              <>
                <p style={{ color: "var(--muted-foreground)", lineHeight: "1.8", whiteSpace: "pre-wrap", marginBottom: "16px", fontSize: "15px" }}>
                  {admissions.mgmt_quota_process}
                </p>
                {admissions.contact_phone && (
                  <p style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>
                    Admissions contact:{" "}
                    <span style={{ fontWeight: 600, color: "var(--foreground)" }}>{admissions.contact_phone}</span>
                    {admissions.contact_email && ` · ${admissions.contact_email}`}
                  </p>
                )}
              </>
            ) : (
              <>
                <p style={{ color: "var(--muted-foreground)", lineHeight: "1.8", marginBottom: "16px", fontSize: "15px" }}>
                  The management quota admission process at {college.name} typically involves:
                </p>
                <ol style={{ listStyle: "none", padding: 0 }}>
                  {[
                    `Contacting the college admissions office directly (not through KCET/COMEDK counselling)`,
                    "Expressing interest and getting on the college's informal waiting list",
                    "Submitting academic documents and paying a registration deposit",
                    "Receiving a seat offer once your academic profile is reviewed",
                    "Completing document verification within 48 hours of seat offer",
                    `Paying the first-year management quota fees (significant amount — confirm total before accepting)`,
                  ].map((step, i) => (
                    <li key={i} className="process-step">
                      <span className="process-step-num">{i + 1}</span>
                      <span className="process-step-text">{step}</span>
                    </li>
                  ))}
                </ol>
                <div style={{
                  marginTop: "20px",
                  padding: "14px 18px",
                  background: "rgba(239,175,38,0.06)",
                  border: "1px solid rgba(239,175,38,0.2)",
                  borderRadius: "10px",
                  fontSize: "14px",
                  color: "var(--muted-foreground)",
                  lineHeight: "1.7",
                }}>
                  <strong style={{ color: "var(--primary)" }}>Important:</strong> Management quota seats move quickly. Students who are prepared with documents and funds ready get the seats. Delays of even 24-48 hours can result in losing a seat to another student.
                </div>
                <p style={{ marginTop: "14px", fontSize: "14px", color: "var(--muted-foreground)" }}>
                  Contact our counsellor to understand the exact current situation at {college.name} for 2026.
                </p>
              </>
            )}
            <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid var(--border)" }}>
              <WaButton href={waLink(`Hi, what is the exact 2026 management quota process for ${college.name}?`)} size="sm">
                Get Exact 2026 Process on WhatsApp
              </WaButton>
            </div>
          </section>

          {/* ── SECTION 7: Documents Required ── */}
          <section className="info-box" style={{ marginBottom: "32px" }} id="documents">
            <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}>Documents Required for Management Quota Admission</h2>
            <ul className="doc-list">
              {documents.map((doc, i) => (
                <li key={i} className="doc-item">
                  <span className="doc-check">✓</span>
                  {doc}
                </li>
              ))}
            </ul>
          </section>

          {/* ── SECTION 8: Important Dates ── */}
          <section style={{ marginBottom: "32px" }} id="dates">
            <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}>
              Important Dates — Management Quota {college.name} 2026
            </h2>
            <div className="info-box" style={{ padding: 0, overflow: "hidden" }}>
              <table className="fees-table">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Expected Date</th>
                  </tr>
                </thead>
                <tbody>
                  {importantDates.map((row, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 500 }}>{row.event}</td>
                      <td style={{ color: "var(--muted-foreground)" }}>{row.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ fontSize: "12px", color: "var(--muted-foreground)", padding: "12px 16px", borderTop: "1px solid var(--border)" }}>
                * Exact dates to be announced. Contact counsellor for real-time updates.
              </p>
            </div>
          </section>

          {/* ── SECTION 9: About the College ── */}
          <section className="info-box" style={{ marginBottom: "32px" }} id="about">
            <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}>About {college.name}</h2>
            <p style={{ color: "var(--muted-foreground)", lineHeight: "1.8", marginBottom: "16px", fontSize: "15px" }}>
              {content?.about || `${college.name} is a ${college.type || "private"} engineering college in ${college.city}, established in ${college.established || "Karnataka"}. Affiliated to ${college.affiliation || "VTU"}, the college holds a NAAC grade of ${college.naac_grade || "A"}. It offers undergraduate and postgraduate engineering programmes.`}
            </p>
            {content?.highlights?.length > 0 && (
              <ul className="doc-list" style={{ marginTop: "16px" }}>
                {content.highlights.map((h, i) => (
                  <li key={i} className="doc-item">
                    <span style={{ color: "var(--primary)", fontWeight: 800, flexShrink: 0 }}>•</span>
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* ── SECTION 10: Placements ── */}
          <section className="info-box" style={{ marginBottom: "32px" }} id="placements">
            <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}>Placements at {shortName}</h2>
            {placements ? (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "16px", marginBottom: "20px" }}>
                  {[
                    { label: "Avg Package", value: `${placements.avg_package_lpa} LPA` },
                    { label: "Highest Package", value: `${placements.highest_package_lpa} LPA` },
                    { label: "Placement %", value: `${placements.placement_pct}%` },
                  ].map((s) => (
                    <div key={s.label} style={{ background: "rgba(239,175,38,0.08)", border: "1px solid rgba(239,175,38,0.2)", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
                      <p style={{ fontSize: "20px", fontWeight: 800, color: "var(--primary)" }}>{s.value}</p>
                      <p style={{ fontSize: "12px", color: "var(--muted-foreground)", marginTop: "4px" }}>{s.label} ({placements.year})</p>
                    </div>
                  ))}
                </div>
                {placements.top_recruiters?.length > 0 && (
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 700, marginBottom: "10px", color: "var(--foreground)" }}>Top Recruiters</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {placements.top_recruiters.map((r) => (
                        <span key={r} style={{ background: "var(--muted)", color: "var(--muted-foreground)", fontSize: "12px", padding: "4px 12px", borderRadius: "999px" }}>{r}</span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p style={{ color: "var(--muted-foreground)", fontSize: "14px" }}>
                Placement data is being updated. Contact counsellor for latest figures.
              </p>
            )}
          </section>

          {/* ── SECTION 11: Similar Colleges ── */}
          {similarColleges.length > 0 && (
            <section style={{ marginBottom: "32px" }} id="similar">
              <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "20px" }}>
                Other Colleges with Management Quota in Bangalore
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
                {similarColleges.map((c) => (
                  <Link key={c.id} href={`/management-quota/${c.slug}`} className="mini-card">
                    {c.naac_grade && (
                      <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, color: "var(--primary)", border: "1px solid rgba(239,175,38,0.3)", borderRadius: "999px", padding: "2px 8px", marginBottom: "8px" }}>
                        NAAC {c.naac_grade}
                      </span>
                    )}
                    <h3 style={{ fontWeight: 600, fontSize: "14px", lineHeight: "1.4", marginBottom: "8px" }}>{c.name}</h3>
                    <p style={{ fontSize: "12px", color: "var(--primary)", fontWeight: 600 }}>View Management Quota →</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ── SECTION 12: FAQs ── */}
          {faqs.length > 0 && (
            <section style={{ marginBottom: "32px" }} id="faqs">
              <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px" }}>
                Frequently Asked Questions — Management Quota at {shortName}
              </h2>
              <p style={{ color: "var(--muted-foreground)", marginBottom: "24px", fontSize: "14px" }}>
                Common questions from students and parents about management quota admission.
              </p>
              <div>
                {faqs.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div key={faq.id} className="faq-item">
                      <button
                        className="faq-question"
                        onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
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
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

/* ─────────────────────────────────────────────
   getServerSideProps — NOT getStaticProps
───────────────────────────────────────────── */
export async function getServerSideProps({ params }) {
  const slug = params["college-slug"];
  const supabase = getSupabase();

  if (!supabase) {
    return {
      props: {
        slug,
        college: { id: 0, slug, name: slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()), short_name: null, city: "Bangalore", established: null, affiliation: null, type: "Private", naac_grade: null, is_active: false },
        fees: [], admissions: null, content: null, placements: null, ranking: null, faqs: [], similarColleges: [],
        _noSupabase: true,
      },
    };
  }

  try {
    const { data: college, error: collegeError } = await supabase
      .from("colleges")
      .select("id, slug, name, short_name, city, established, affiliation, type, naac_grade, is_active")
      .eq("slug", slug)
      .single();

    if (collegeError || !college) {
      return { notFound: true };
    }

    const [feesResult, admissionsResult, contentResult, placementsResult, rankingResult, collegeFaqsResult, generalFaqsResult, similarResult] = await Promise.all([
      supabase
        .from("fees")
        .select("course_id, academic_year, quota, tuition_fee, hostel_fee, other_fees, total_fee, courses(name, short_name)")
        .eq("college_id", college.id)
        .eq("quota", "management")
        .order("tuition_fee", { ascending: false }),
      supabase.from("admissions").select("mgmt_quota_process, documents_required, important_dates, contact_phone, contact_email").eq("college_id", college.id).maybeSingle(),
      supabase.from("college_content").select("about, highlights, meta_title, meta_desc").eq("college_id", college.id).maybeSingle(),
      supabase.from("placements").select("year, avg_package_lpa, highest_package_lpa, placement_pct, top_recruiters").eq("college_id", college.id).order("year", { ascending: false }).limit(1).maybeSingle(),
      supabase.from("rankings").select("source, year, rank").eq("college_id", college.id).eq("source", "NIRF").order("year", { ascending: false }).limit(1).maybeSingle(),
      supabase.from("faqs").select("id, question, answer").eq("college_id", college.id).eq("is_active", true).order("sort_order").limit(6),
      supabase.from("faqs").select("id, question, answer").is("college_id", null).eq("is_active", true).order("sort_order").limit(3),
      supabase.from("colleges").select("id, slug, name, naac_grade").eq("city", college.city).eq("is_active", true).neq("id", college.id).limit(4),
    ]);

    const fees = (feesResult.data || []).map((f) => ({
      course_id: f.course_id,
      course_name: f.courses?.name || `Branch ${f.course_id}`,
      course_short: f.courses?.short_name || "",
      academic_year: f.academic_year,
      tuition_fee: f.tuition_fee,
      hostel_fee: f.hostel_fee,
      other_fees: f.other_fees,
      total_fee: f.total_fee,
    }));

    const allFaqs = [...(collegeFaqsResult.data || []), ...(generalFaqsResult.data || [])].slice(0, 8);

    return {
      props: {
        slug,
        college,
        fees,
        admissions: admissionsResult.data || null,
        content: contentResult.data || null,
        placements: placementsResult.data || null,
        ranking: rankingResult.data || null,
        faqs: allFaqs,
        similarColleges: similarResult.data || [],
      },
    };
  } catch (err) {
    console.error("[management-quota/college-slug] getServerSideProps error:", err.message);
    return { notFound: true };
  }
}
