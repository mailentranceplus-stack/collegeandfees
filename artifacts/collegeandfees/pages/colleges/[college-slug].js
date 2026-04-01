import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getSupabase } from "../../lib/supabase";
import { COLLEGE_IMAGES, waLink } from "../../lib/constants";
import { WaIcon, WaButton } from "../../components/WaButton";

/* ─────────────────────────────────────────────
   INACTIVE PLACEHOLDER
───────────────────────────────────────────── */
function InactivePage({ college, slug, similarColleges }) {
  const tabs = [
    { label: "Overview", href: `/colleges/${slug}`, active: true },
    { label: "Fees", href: `/colleges/${slug}/fees` },
  ];

  const waMsg = `Hi, I want guidance about admission to ${college.name}. Can you help me?`;

  return (
    <>
      <Head>
        <title>{college.short_name || college.name} — Fees, Cutoffs, Placements and Admission 2026</title>
        <meta name="description" content={`${college.name} fees 2026, KCET cutoff, COMEDK cutoff, management quota fees, placements and direct admission process.`} />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={`https://collegeandfees.com/colleges/${slug}`} />
      </Head>
      <Header />

      <div className="college-header-band">
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
            <div>
              <p style={{ color: "var(--primary)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>Engineering College · Bangalore</p>
              <h1 style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 800 }}>{college.name}</h1>
              <p style={{ color: "var(--muted-foreground)", marginTop: "6px", fontSize: "14px" }}>
                {[college.city, college.established && `Estd. ${college.established}`, college.affiliation, college.naac_grade && `NAAC ${college.naac_grade}`].filter(Boolean).join(" | ")}
              </p>
            </div>
            <WaButton href={waLink(waMsg)} size="sm">Ask Counsellor</WaButton>
          </div>
        </div>
      </div>

      <div className="tab-bar">
        <div className="tab-bar-inner">
          {tabs.map((t) => (
            <Link key={t.label} href={t.href} className={`tab-item${t.active ? " active" : ""}`}>{t.label}</Link>
          ))}
        </div>
      </div>

      <main style={{ padding: "48px 0" }}>
        <div className="container">
          <div className="glass-card" style={{ padding: "48px 32px", textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📋</div>
            <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "12px" }}>Information Being Verified</h2>
            <p style={{ color: "var(--muted-foreground)", marginBottom: "28px", lineHeight: "1.7" }}>
              Full details for {college.name} are being verified by our counsellor. For accurate fees, cutoffs and admission information, contact us directly on WhatsApp.
            </p>
            <WaButton href={waLink(waMsg)}>Get Free Guidance on WhatsApp</WaButton>
          </div>

          {similarColleges.length > 0 && (
            <section style={{ marginTop: "56px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "20px" }}>Similar Engineering Colleges in Bangalore</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
                {similarColleges.map((c) => (
                  <Link key={c.id} href={`/colleges/${c.slug}`} className="mini-card">
                    {c.naac_grade && (
                      <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, color: "var(--primary)", border: "1px solid rgba(239,175,38,0.3)", borderRadius: "999px", padding: "2px 8px", marginBottom: "8px" }}>
                        NAAC {c.naac_grade}
                      </span>
                    )}
                    <h3 style={{ fontWeight: 600, fontSize: "14px", lineHeight: "1.4", marginBottom: "8px" }}>{c.name}</h3>
                    <p style={{ fontSize: "12px", color: "var(--primary)", fontWeight: 600 }}>View Details →</p>
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
export default function CollegeOverviewPage({ college, content, placements, ranking, fees, courses, facilities, faqs, similarColleges, slug }) {
  const [phone, setPhone] = useState("");
  const [openFaqId, setOpenFaqId] = useState(null);

  if (!college.is_active) {
    return <InactivePage college={college} slug={slug} similarColleges={similarColleges} />;
  }

  const shortName = college.short_name || college.name;
  const waMsg = `Hi, I want guidance about admission to ${college.name}. Can you help me?`;

  const metaTitle = content?.meta_title || `${college.name} — Fees, Cutoffs, Placements and Admission 2026`;
  const metaDesc = content?.meta_desc || `${college.name} fees 2026, KCET cutoff, COMEDK cutoff, management quota fees, placements and direct admission process. Free counsellor guidance on WhatsApp.`;
  const canonicalUrl = `https://collegeandfees.com/colleges/${slug}`;

  const tabs = [
    { label: "Overview", href: `/colleges/${slug}`, active: true },
    { label: "Fees", href: `/colleges/${slug}/fees` },
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
      { "@type": "ListItem", position: 2, name: "Engineering Colleges Bangalore", item: "https://collegeandfees.com/engineering-colleges/bangalore" },
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

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />        {COLLEGE_IMAGES[slug] && <meta property="og:image" content={COLLEGE_IMAGES[slug]} />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      </Head>

      <Header />

      {/* Section 1: College Header Band */}
      <div className="college-header-band">
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
            <div>
              <p style={{ color: "var(--primary)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>
                Engineering College · Bangalore
              </p>
              <div style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, lineHeight: 1.2, color: "var(--foreground)" }}>{college.name}</div>
              <p style={{ color: "var(--muted-foreground)", marginTop: "8px", fontSize: "14px" }}>
                {[college.city, college.established && `Estd. ${college.established}`, college.affiliation, college.naac_grade && `NAAC ${college.naac_grade}`].filter(Boolean).join(" | ")}
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href={`/direct-admission/${slug}`} className="btn-outline-sm">Direct Admission</Link>
              <WaButton href={waLink(waMsg)} size="sm">WhatsApp Now</WaButton>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      {COLLEGE_IMAGES[slug] && (
        <div style={{ overflow: "hidden", background: "var(--card)", height: "260px", position: "relative" }}>
          <Image src={COLLEGE_IMAGES[slug]} alt={`${college.name} campus, Bangalore`} fill style={{ objectFit: "cover", objectPosition: "center", opacity: 0.55 }} priority />
        </div>
      )}

      {/* Section 2: Tab Bar */}
      <div className="tab-bar">
        <div className="tab-bar-inner">
          {tabs.map((t) => (
            <Link key={t.label} href={t.href} className={`tab-item${t.active ? " active" : ""}`}>{t.label}</Link>
          ))}
        </div>
      </div>

      <main style={{ paddingBottom: "80px" }}>
        <div className="container" style={{ paddingTop: "32px" }}>

          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <Link href="/engineering-colleges/bangalore">Engineering Colleges Bangalore</Link>
            <span className="breadcrumb-sep">›</span>
            <span style={{ color: "var(--foreground)", fontWeight: 600 }}>{shortName}</span>
          </nav>

          {/* Section 3: H1 + Lead Strip */}
          <h1 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 800, marginBottom: "20px" }}>
            {college.name} — Fees, Cutoffs, Placements and Admission 2026
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
                const msg = phone ? `Hi, I want guidance about ${college.name}. Please call me on ${phone}.` : waMsg;
                window.open(waLink(msg), "_blank");
              }}
              className="btn-whatsapp-sm"
            >
              <WaIcon size={14} /> Get Free Guidance
            </button>
          </div>

          {/* Section 4: Key Stats */}
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

          {/* Section 5: About */}
          <section className="info-box" style={{ marginBottom: "32px" }} id="about">
            <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}>About {college.name}</h2>
            <p style={{ color: "var(--muted-foreground)", lineHeight: "1.8", fontSize: "15px" }}>
              {content?.about || `${college.name} is a ${college.type || "private"} engineering college in ${college.city}${college.established ? `, established in ${college.established}` : ""}. Affiliated to ${college.affiliation || "VTU"}${college.naac_grade ? `, the college holds a NAAC grade of ${college.naac_grade}` : ""}. It offers undergraduate and postgraduate engineering programmes.`}
            </p>
            {content?.highlights?.length > 0 && (
              <div style={{ marginTop: "20px" }}>
                <p style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--primary)", marginBottom: "12px" }}>Key Highlights</p>
                <ul className="doc-list">
                  {content.highlights.map((h, i) => (
                    <li key={i} className="doc-item">
                      <span style={{ color: "var(--primary)", fontWeight: 800, flexShrink: 0 }}>•</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Section 6: Fees Summary */}
          <section style={{ marginBottom: "32px" }} id="fees">
            <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}>
              Management Quota Fees at {shortName} 2026-27
            </h2>
            {fees.length > 0 ? (
              <div className="info-box" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ overflowX: "auto" }}>
                  <table className="fees-table">
                    <thead>
                      <tr>
                        <th>Branch</th>
                        <th style={{ textAlign: "right" }}>Annual Fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fees.map((fee, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 600 }}>{fee.courses?.name || `Branch ${i + 1}`}</td>
                          <td style={{ textAlign: "right" }} className="fees-highlight">
                            ₹{fee.tuition_fee?.toLocaleString("en-IN")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                  <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>* Top 5 branches shown. 2026-27 fees may vary.</p>
                  <Link href={`/colleges/${slug}/fees`} style={{ fontSize: "13px", color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
                    See all branch-wise fees →
                  </Link>
                </div>
              </div>
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

          {/* Mid-content CTA */}
          <div className="glass-card" style={{ padding: "24px", marginBottom: "32px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
            <p style={{ fontWeight: 500, fontSize: "15px", color: "var(--foreground)", flex: 1 }}>
              Is {shortName} worth it for your budget? Our counsellor can tell you in 5 minutes — WhatsApp now.
            </p>
            <WaButton href={waLink(waMsg)} size="sm">Ask on WhatsApp</WaButton>
          </div>

          {/* Section 7: Courses */}
          {courses.length > 0 && (
            <section style={{ marginBottom: "32px" }} id="courses">
              <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}>Courses at {college.name}</h2>
              <div className="info-box" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ overflowX: "auto" }}>
                  <table className="fees-table">
                    <thead>
                      <tr>
                        <th>Course</th>
                        <th>Degree</th>
                        <th style={{ textAlign: "right" }}>Total Seats</th>
                        <th style={{ textAlign: "right" }}>Mgmt Quota</th>
                        <th style={{ textAlign: "right" }}>Govt Quota</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((c, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 600 }}>{c.courses?.name || "—"}</td>
                          <td style={{ color: "var(--muted-foreground)", fontSize: "13px" }}>{c.courses?.degree || "B.E."}</td>
                          <td style={{ textAlign: "right" }}>{c.total_seats || "—"}</td>
                          <td style={{ textAlign: "right", color: "var(--primary)", fontWeight: 600 }}>{c.mgmt_quota_seats || "—"}</td>
                          <td style={{ textAlign: "right", color: "var(--muted-foreground)" }}>{c.govt_quota_seats || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* Section 8: Placements */}
          <section className="info-box" style={{ marginBottom: "32px" }} id="placements">
            <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}>
              Placements at {shortName}{placements ? ` — ${placements.year}` : ""}
            </h2>
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
                    <p style={{ fontSize: "13px", fontWeight: 700, marginBottom: "10px" }}>Top Recruiters</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {placements.top_recruiters.map((r) => (
                        <span key={r} style={{ background: "var(--muted)", color: "var(--muted-foreground)", fontSize: "12px", padding: "4px 12px", borderRadius: "999px" }}>{r}</span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div>
                <p style={{ color: "var(--muted-foreground)", fontSize: "14px", marginBottom: "16px" }}>
                  Placement data is being updated. Contact counsellor for latest figures.
                </p>
                <WaButton href={waLink(`Hi, what are the latest placement stats for ${college.name}?`)} size="sm">
                  Get Placement Data on WhatsApp
                </WaButton>
              </div>
            )}
          </section>

          {/* Section 9: Facilities */}
          {facilities.length > 0 && (
            <section className="info-box" style={{ marginBottom: "32px" }} id="facilities">
              <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}>Facilities at {college.name}</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "12px" }}>
                {facilities.map((f, i) => {
                  const facility = f.facilities || f;
                  return (
                    <div key={i} style={{ background: "rgba(239,175,38,0.06)", border: "1px solid rgba(239,175,38,0.15)", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
                      {facility.icon && <div style={{ fontSize: "24px", marginBottom: "6px" }}>{facility.icon}</div>}
                      <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--foreground)" }}>{facility.name}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Section 10: Admission Process */}
          <section className="info-box" style={{ marginBottom: "32px" }} id="admission">
            <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}>
              Admission to {shortName} — How it Works
            </h2>
            {content?.admission_process ? (
              <p style={{ color: "var(--muted-foreground)", lineHeight: "1.8", fontSize: "15px", whiteSpace: "pre-wrap" }}>
                {content.admission_process}
              </p>
            ) : (
              <div>
                <p style={{ color: "var(--muted-foreground)", lineHeight: "1.8", fontSize: "15px", marginBottom: "16px" }}>
                  {college.name} offers admission through three routes:
                </p>
                <ol style={{ listStyle: "none", padding: 0 }}>
                  {[
                    "KCET Quota — for Karnataka students with KCET rank",
                    "COMEDK Quota — open to students across India",
                    "Management Quota — direct admission, no entrance rank required",
                  ].map((step, i) => (
                    <li key={i} className="process-step">
                      <span className="process-step-num">{i + 1}</span>
                      <span className="process-step-text">{step}</span>
                    </li>
                  ))}
                </ol>
                <p style={{ fontSize: "14px", color: "var(--muted-foreground)", marginTop: "16px" }}>
                  For management quota admission, contact our counsellor for the current process and fee structure.
                </p>
              </div>
            )}
            <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid var(--border)", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href={`/direct-admission/${slug}`} className="btn-outline-sm">Direct Admission →</Link>
              <Link href={`/management-quota/${slug}`} className="btn-outline-sm">Management Quota →</Link>
            </div>
          </section>

          {/* Section 11: Similar Colleges */}
          {similarColleges.length > 0 && (
            <section style={{ marginBottom: "32px" }} id="similar">
              <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "20px" }}>
                Other Engineering Colleges in Bangalore
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
                {similarColleges.map((c) => (
                  <Link key={c.id} href={`/colleges/${c.slug}`} className="mini-card">
                    {c.naac_grade && (
                      <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, color: "var(--primary)", border: "1px solid rgba(239,175,38,0.3)", borderRadius: "999px", padding: "2px 8px", marginBottom: "8px" }}>
                        NAAC {c.naac_grade}
                      </span>
                    )}
                    <h3 style={{ fontWeight: 600, fontSize: "14px", lineHeight: "1.4", marginBottom: "8px" }}>{c.name}</h3>
                    <p style={{ fontSize: "12px", color: "var(--primary)", fontWeight: 600 }}>View College →</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Section 12: FAQs */}
          {faqs.length > 0 && (
            <section style={{ marginBottom: "32px" }} id="faqs">
              <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px" }}>
                Frequently Asked Questions — {shortName}
              </h2>
              <p style={{ color: "var(--muted-foreground)", marginBottom: "24px", fontSize: "14px" }}>
                Common questions from students and parents.
              </p>
              <div>
                {faqs.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div key={faq.id} className="faq-item">
                      <button className="faq-question" onClick={() => setOpenFaqId(isOpen ? null : faq.id)} aria-expanded={isOpen}>
                        <span>{faq.question}</span>
                        <span style={{ flexShrink: 0, width: "28px", height: "28px", border: "1px solid var(--border)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)", fontSize: "18px", fontWeight: 700, transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
                      </button>
                      {isOpen && <div className="faq-answer">{faq.answer}</div>}
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

export async function getServerSideProps({ params }) {
  const slug = params["college-slug"];
  const supabase = getSupabase();

  if (!supabase) {
    return {
      props: {
        slug,
        college: { id: 0, slug, name: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), short_name: null, city: "Bangalore", established: null, affiliation: null, type: "Private", naac_grade: null, is_active: false },
        content: null, placements: null, ranking: null, fees: [], courses: [], facilities: [], faqs: [], similarColleges: [],
      },
    };
  }

  try {
    const { data: college, error: collegeError } = await supabase
      .from("colleges")
      .select("*")
      .eq("slug", slug)
      .single();

    if (collegeError || !college) return { notFound: true };

    const [contentRes, placementsRes, rankingRes, feesRes, coursesRes, facilitiesRes, faqsRes, similarRes] = await Promise.all([
      supabase.from("college_content").select("*").eq("college_id", college.id).maybeSingle(),
      supabase.from("placements").select("*").eq("college_id", college.id).order("year", { ascending: false }).limit(1).maybeSingle(),
      supabase.from("rankings").select("rank, year").eq("college_id", college.id).eq("source", "NIRF").order("year", { ascending: false }).limit(1).maybeSingle(),
      supabase.from("fees").select("tuition_fee, quota, courses(name, short_name)").eq("college_id", college.id).eq("quota", "management").order("tuition_fee", { ascending: false }).limit(5),
      supabase.from("college_courses").select("total_seats, mgmt_quota_seats, govt_quota_seats, courses(name, short_name, degree)").eq("college_id", college.id),
      supabase.from("college_facilities").select("facilities(name, icon)").eq("college_id", college.id),
      supabase.from("faqs").select("id, question, answer").eq("college_id", college.id).eq("is_active", true).order("sort_order").limit(6),
      supabase.from("colleges").select("id, slug, name, short_name, naac_grade").eq("city", college.city).eq("is_active", true).neq("id", college.id).limit(4),
    ]);

    return {
      props: {
        slug,
        college,
        content: contentRes.data || null,
        placements: placementsRes.data || null,
        ranking: rankingRes.data || null,
        fees: feesRes.data || [],
        courses: coursesRes.data || [],
        facilities: facilitiesRes.data || [],
        faqs: faqsRes.data || [],
        similarColleges: similarRes.data || [],
      },
    };
  } catch (err) {
    console.error("[colleges/college-slug] getServerSideProps error:", err.message);
    return { notFound: true };
  }
}
