import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { getSupabase } from "../../../lib/supabase";
import { COLLEGE_IMAGES, waLink, ACTIVE_SLUGS } from "../../../lib/constants";
import { WaIcon, WaButton } from "../../../components/WaButton";

const QUOTA_ORDER = ["management", "govt", "comedk", "nri"];
const QUOTA_LABELS = {
  management: "Management Quota",
  govt: "Government Quota (KCET)",
  comedk: "COMEDK Quota",
  nri: "NRI Quota",
};

function isMbaCourse(fee) {
  const degree = (fee.courses?.degree || "").toLowerCase();
  const name = (fee.courses?.name || "").toLowerCase();
  const short = (fee.courses?.short_name || "").toLowerCase();
  return degree.includes("mba") || name.includes("mba") || short.includes("mba");
}

function FeesTableSection({ fees, slug, showRvceNote }) {
  if (fees.length === 0) return null;
  return (
    <div className="info-box" style={{ padding: 0, overflow: "hidden", marginBottom: "8px" }}>
      <div style={{ overflowX: "auto" }}>
        <table className="fees-table">
          <thead>
            <tr>
              <th>Branch</th>
              <th>Degree</th>
              <th style={{ textAlign: "right" }}>Annual Tuition</th>
              <th style={{ textAlign: "right" }}>Hostel (Annual)</th>
              <th style={{ textAlign: "right" }}>Total Annual</th>
              <th style={{ textAlign: "right" }}>4-yr Estimate</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((fee, i) => {
              const total = (fee.tuition_fee || 0) + (fee.hostel_fee || 0) + (fee.other_fees || 0);
              return (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>
                    {fee.courses?.name || "—"}{" "}
                    {fee.courses?.short_name && <span style={{ color: "var(--muted-foreground)", fontSize: "12px" }}>({fee.courses.short_name})</span>}
                  </td>
                  <td style={{ color: "var(--muted-foreground)", fontSize: "13px" }}>{fee.courses?.degree || "B.E."}</td>
                  <td style={{ textAlign: "right" }} className="fees-highlight">
                    ₹{(fee.tuition_fee || 0).toLocaleString("en-IN")}
                  </td>
                  <td style={{ textAlign: "right", color: "var(--muted-foreground)" }}>
                    {fee.hostel_fee ? `₹${fee.hostel_fee.toLocaleString("en-IN")}` : "—"}
                  </td>
                  <td style={{ textAlign: "right", fontWeight: 600 }}>
                    ₹{(fee.total_fee || total).toLocaleString("en-IN")}
                  </td>
                  <td style={{ textAlign: "right", color: "var(--muted-foreground)" }}>
                    ₹{((fee.tuition_fee || 0) * 4).toLocaleString("en-IN")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{ padding: "10px 16px", borderTop: "1px solid var(--border)" }}>
        <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
          * 4-year estimate = annual tuition × 4. Actual total may vary.
        </p>
        {showRvceNote && slug === "rvce-bangalore" && (
          <p style={{ fontSize: "12px", color: "var(--primary)", fontWeight: 600, marginTop: "4px" }}>
            * For RVCE, Year 1 management quota fees differ from Years 2-4. The 4-year total above is an estimate.
            Contact our counsellor for the exact 2026-27 total.
          </p>
        )}
      </div>
    </div>
  );
}

function InactiveFeesPage({ college, slug }) {
  const shortName = college.short_name || college.name;
  const waMsg = `Hi, I want to know the fees at ${college.name}. Can you help?`;
  const canonicalUrl = `https://collegeandfees.com/colleges/${slug}/fees`;
  return (
    <>
      <Header />
      <div className="college-header-band">
        <div className="container">
          <div style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, lineHeight: 1.2, color: "var(--foreground)" }}>{college.name}</div>
          <p style={{ color: "var(--muted-foreground)", marginTop: "8px", fontSize: "14px" }}>{college.city}</p>
        </div>
      </div>
      <main style={{ paddingBottom: "80px" }}>
        <div className="container" style={{ paddingTop: "48px", maxWidth: "640px" }}>
          <nav className="breadcrumb" style={{ marginBottom: "24px" }}>
            <Link href="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <Link href={`/colleges/${slug}`}>{shortName}</Link>
            <span className="breadcrumb-sep">›</span>
            <span style={{ color: "var(--foreground)", fontWeight: 600 }}>Fees</span>
          </nav>
          <div className="glass-card" style={{ padding: "32px", textAlign: "center" }}>
            <p style={{ fontSize: "40px", marginBottom: "16px" }}>🔍</p>
            <h1 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "12px" }}>Fee Information Being Verified</h1>
            <p style={{ color: "var(--muted-foreground)", marginBottom: "24px", lineHeight: 1.6 }}>
              We are verifying the 2026-27 fee data for {college.name}. Our counsellor can share the latest confirmed figures on WhatsApp right now.
            </p>
            <WaButton href={waLink(waMsg)}>Get Confirmed Fees on WhatsApp</WaButton>
            <p style={{ marginTop: "20px" }}>
              <Link href={`/colleges/${slug}`} style={{ fontSize: "13px", color: "var(--muted-foreground)", textDecoration: "none" }}>
                ← View College Profile
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function CollegeFeesPage({ college, fees, content, ranking, slug }) {
  if (!college.is_active || !ACTIVE_SLUGS.has(slug)) {
    return (
      <>
        <Head>
          <title>{`${college.short_name || college.name} Fees 2026-27 — Fee Information Being Verified | CollegeAndFees`}</title>
          <meta name="description" content={`Fee details for ${college.short_name || college.name} are being verified. Contact our counsellor on WhatsApp for the latest confirmed figures.`} />
          <meta name="robots" content="noindex, nofollow" />
          <link rel="canonical" href={`https://collegeandfees.com/colleges/${slug}/fees`} />
        </Head>
        <InactiveFeesPage college={college} slug={slug} />
      </>
    );
  }

  const shortName = college.short_name || college.name;
  const waMsg = `Hi, I want to know the exact fees at ${college.name}. Can you help?`;

  const metaTitle = `${college.short_name || college.name} Fees 2026-27 — KCET, COMEDK and Management Quota`;
  const metaDesc = `${shortName} fees 2026-27. KCET quota, COMEDK quota and management quota fees for all branches. Verified figures from official sources.`;
  const canonicalUrl = `https://collegeandfees.com/colleges/${slug}/fees`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://collegeandfees.com" },
      { "@type": "ListItem", position: 2, name: college.name, item: `https://collegeandfees.com/colleges/${slug}` },
      { "@type": "ListItem", position: 3, name: "Fees", item: canonicalUrl },
    ],
  };

  const tabs = [
    { label: "Overview", href: `/colleges/${slug}` },
    { label: "Fees", href: `/colleges/${slug}/fees`, active: true },
  ];

  /* Group fees by quota */
  const quotaGroups = fees.reduce((acc, fee) => {
    const q = fee.quota || "other";
    if (!acc[q]) acc[q] = [];
    acc[q].push(fee);
    return acc;
  }, {});

  const orderedQuotas = [
    ...QUOTA_ORDER.filter((q) => quotaGroups[q]),
    ...Object.keys(quotaGroups).filter((q) => !QUOTA_ORDER.includes(q)),
  ];

  /* For comparison stats */
  const mgmtFees = quotaGroups["management"] || [];
  const govtFees = quotaGroups["govt"] || [];
  const comedk = quotaGroups["comedk"] || [];
  const cheapestMgmt = mgmtFees.length > 0 ? Math.min(...mgmtFees.map((f) => f.tuition_fee || 0)) : null;
  const cheapestGovt = govtFees.length > 0 ? Math.min(...govtFees.map((f) => f.tuition_fee || 0)) : null;
  const cheapestComedk = comedk.length > 0 ? Math.min(...comedk.map((f) => f.tuition_fee || 0)) : null;
  const maxMgmt = mgmtFees.length > 0 ? Math.max(...mgmtFees.map((f) => f.tuition_fee || 0)) : null;

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta name="robots" content={college.is_active ? "index, follow" : "noindex, nofollow"} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={COLLEGE_IMAGES[slug] || "https://collegeandfees.com/opengraph.jpg"} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      </Head>

      <Header />

      {/* Section 1: College Header Band */}
      <div className="college-header-band">
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
            <div>
              <p style={{ color: "var(--primary)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>Fees 2026-27</p>
              <div style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, lineHeight: 1.2, color: "var(--foreground)" }}>{college.name}</div>
              <p style={{ color: "var(--muted-foreground)", marginTop: "8px", fontSize: "14px" }}>
                {[college.city, college.established && `Estd. ${college.established}`, college.affiliation, college.naac_grade && `NAAC ${college.naac_grade}`].filter(Boolean).join(" | ")}
              </p>
            </div>
            <WaButton href={waLink(waMsg)} size="sm">Get Exact Fees on WhatsApp</WaButton>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      {COLLEGE_IMAGES[slug] && (
        <div style={{ overflow: "hidden", background: "var(--card)", height: "200px", position: "relative" }}>
          <Image src={COLLEGE_IMAGES[slug]} alt={`${college.name} campus, Bangalore`} fill style={{ objectFit: "cover", objectPosition: "center", opacity: 0.55 }} priority />
        </div>
      )}

      {/* Section 2: Tab Bar — Fees active */}
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
            <Link href={`/colleges/${slug}`}>{shortName}</Link>
            <span className="breadcrumb-sep">›</span>
            <span style={{ color: "var(--foreground)", fontWeight: 600 }}>Fees</span>
          </nav>

          {/* Section 3: H1 */}
          <h1 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 800, marginBottom: "28px" }}>
            {college.name} Fees 2026-27 — KCET, COMEDK and Management Quota
          </h1>

          {/* Section 4: Fee Tables per quota */}
          {fees.length > 0 ? (
            <>
              {orderedQuotas.map((quota, qi) => {
                const quotaFees = quotaGroups[quota] || [];
                const label = QUOTA_LABELS[quota] || quota;
                const isChrist = slug === "christ-university-bangalore";

                /* For Christ: split engineering vs MBA */
                const engFees = isChrist ? quotaFees.filter((f) => !isMbaCourse(f)) : quotaFees;
                const mbaFees = isChrist ? quotaFees.filter(isMbaCourse) : [];

                /* Top management fee for CTA */
                const topFee = quota === "management" && quotaFees.length > 0
                  ? Math.max(...quotaFees.map((f) => f.tuition_fee || 0))
                  : null;

                return (
                  <section key={quota} style={{ marginBottom: "40px" }} id={`fees-${quota}`}>
                    <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "6px" }}>
                      {label} — Branch-wise Fees
                    </h2>
                    <p style={{ fontSize: "13px", color: "var(--muted-foreground)", marginBottom: "14px" }}>
                      Academic year shown: 2026. 2026-27 figures may be higher.
                    </p>

                    {isChrist ? (
                      <>
                        {engFees.length > 0 && (
                          <div style={{ marginBottom: "20px" }}>
                            <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "10px", color: "var(--muted-foreground)" }}>
                              B.Tech / B.E. Courses
                            </h3>
                            <FeesTableSection fees={engFees} slug={slug} showRvceNote={quota === "management"} />
                          </div>
                        )}
                        {mbaFees.length > 0 && (
                          <div>
                            <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "10px", color: "var(--muted-foreground)" }}>
                              MBA / Postgraduate Fees
                            </h3>
                            <FeesTableSection fees={mbaFees} slug={slug} showRvceNote={false} />
                          </div>
                        )}
                      </>
                    ) : (
                      <FeesTableSection fees={quotaFees} slug={slug} showRvceNote={quota === "management"} />
                    )}

                    {/* Mid-content CTA after management quota */}
                    {quota === "management" && topFee && (
                      <div className="glass-card" style={{ padding: "20px 24px", marginTop: "16px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
                        <p style={{ fontWeight: 500, fontSize: "14px", color: "var(--foreground)", flex: 1 }}>
                          Is {shortName} management quota worth ₹{topFee.toLocaleString("en-IN")}?
                          Talk to our counsellor for an honest assessment.
                        </p>
                        <WaButton href={waLink(`Hi, I want to know if management quota at ${college.name} is worth it for ₹${topFee.toLocaleString("en-IN")}/year. Can you advise?`)} size="sm">
                          WhatsApp — Free Guidance
                        </WaButton>
                      </div>
                    )}
                  </section>
                );
              })}
            </>
          ) : (
            <div className="info-box" style={{ marginBottom: "32px" }}>
              <p style={{ color: "var(--muted-foreground)", marginBottom: "16px", fontSize: "15px" }}>
                Fee data for {college.name} is being verified. Contact counsellor for accurate 2026-27 figures.
              </p>
              <WaButton href={waLink(waMsg)} size="sm">Get Fee Details on WhatsApp</WaButton>
            </div>
          )}

          {/* Section 5: Fee Notes */}
          <section className="info-box" style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "14px" }}>Notes on the Fees Above</h2>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                "Fees shown are for the 2026 academic year. 2026-27 fees may be higher.",
                "Management quota fees for 2026-27 at RVCE have been officially announced. Contact our counsellor for confirmed 2026-27 figures at other colleges.",
                "Hostel fees are optional and not included in all course fee calculations.",
                "Other fees (lab, library, development) vary by college and are not always listed.",
                "Government quota (KCET) fees are regulated by the Karnataka Examinations Authority.",
                "NRI quota fees are typically in USD — consult the college directly.",
              ].map((note, i) => (
                <li key={i} style={{ display: "flex", gap: "10px", fontSize: "14px", color: "var(--muted-foreground)", lineHeight: "1.6" }}>
                  <span style={{ color: "var(--primary)", fontWeight: 800, flexShrink: 0, marginTop: "1px" }}>•</span>
                  {note}
                </li>
              ))}
            </ul>
          </section>

          {/* Section 6: Quick Comparison */}
          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "20px" }}>
              How {shortName} Fees Compare
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
              {[
                {
                  label: "KCET Quota",
                  sublabel: "Government regulated",
                  value: cheapestGovt ? `₹${cheapestGovt.toLocaleString("en-IN")}/yr` : "Contact for details",
                  color: "var(--accent-green)",
                  borderColor: "rgba(34,195,94,0.2)",
                  bg: "rgba(34,195,94,0.06)",
                },
                {
                  label: "COMEDK Quota",
                  sublabel: "Open to all India",
                  value: cheapestComedk ? `₹${cheapestComedk.toLocaleString("en-IN")}/yr` : "Contact for details",
                  color: "var(--primary)",
                  borderColor: "rgba(239,175,38,0.2)",
                  bg: "rgba(239,175,38,0.06)",
                },
                {
                  label: "Management Quota",
                  sublabel: "CSE, highest fee",
                  value: maxMgmt ? `₹${maxMgmt.toLocaleString("en-IN")}/yr` : "Contact for details",
                  color: "#F87171",
                  borderColor: "rgba(248,113,113,0.2)",
                  bg: "rgba(248,113,113,0.06)",
                },
              ].map((box) => (
                <div key={box.label} style={{ background: box.bg, border: `1px solid ${box.borderColor}`, borderRadius: "12px", padding: "20px", textAlign: "center" }}>
                  <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: box.color, marginBottom: "4px" }}>{box.label}</p>
                  <p style={{ fontSize: "11px", color: "var(--muted-foreground)", marginBottom: "12px" }}>{box.sublabel}</p>
                  <p style={{ fontSize: "20px", fontWeight: 800, color: box.color }}>{box.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: WhatsApp CTA */}
          <div className="glass-card" style={{ padding: "32px", textAlign: "center" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "10px" }}>
              Want the exact 2026-27 management quota fees for {shortName}?
            </h2>
            <p style={{ color: "var(--muted-foreground)", marginBottom: "20px", fontSize: "15px" }}>
              Our counsellor has confirmed figures — WhatsApp for free guidance.
            </p>
            <WaButton href={waLink(waMsg)}>
              WhatsApp for Free Guidance
            </WaButton>
          </div>

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
        fees: [], content: null, ranking: null,
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

    const [feesRes, contentRes, rankingRes] = await Promise.all([
      supabase
        .from("fees")
        .select("tuition_fee, hostel_fee, other_fees, total_fee, academic_year, quota, courses(id, name, short_name, degree)")
        .eq("college_id", college.id)
        .order("quota", { ascending: true })
        .order("tuition_fee", { ascending: false }),
      supabase.from("college_content").select("meta_title, meta_desc").eq("college_id", college.id).maybeSingle(),
      supabase.from("rankings").select("rank").eq("college_id", college.id).eq("source", "NIRF").order("year", { ascending: false }).limit(1).maybeSingle(),
    ]);

    return {
      props: {
        slug,
        college,
        fees: feesRes.data || [],
        content: contentRes.data || null,
        ranking: rankingRes.data || null,
      },
    };
  } catch (err) {
    console.error("[colleges/college-slug/fees] getServerSideProps error:", err.message);
    return { notFound: true };
  }
}
