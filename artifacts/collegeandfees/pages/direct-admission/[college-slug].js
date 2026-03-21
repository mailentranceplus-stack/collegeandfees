import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getSupabase } from "../../lib/supabase";

const WA_NUMBER = "917975193033";

function waLink(msg) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function WaIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function WaButton({ href, children, className = "" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-[#25d366] text-white font-semibold px-5 py-2.5 rounded-full hover:bg-green-500 transition-colors ${className}`}
    >
      <WaIcon />
      {children}
    </a>
  );
}

const DEFAULT_DATES = [
  { event: "KCET 2026 Results", date: "May 2026" },
  { event: "Management Quota Applications Open", date: "June 2026" },
  { event: "Document Verification", date: "June–July 2026" },
  { event: "Seat Confirmation & Fee Payment", date: "July 2026" },
  { event: "Classes Begin", date: "August 2026" },
];

/* ─────────────────────────────────────────────
   INACTIVE PLACEHOLDER PAGE
───────────────────────────────────────────── */
function InactivePage({ college, slug, similarColleges }) {
  const name = college.name;
  const waMsg = `Hi, I want to know about direct admission in ${name}. Is it available?`;

  const tabs = [
    { label: "Overview", href: `/colleges/${slug}` },
    { label: "Fees", href: `/colleges/${slug}/fees` },
    { label: "Placements", href: `/colleges/${slug}/placements` },
    { label: "Cutoff", href: `/colleges/${slug}/cutoff` },
    { label: "Admission", href: `/direct-admission/${slug}`, active: true },
    { label: "Hostel", href: `/colleges/${slug}/hostel` },
    { label: "Courses", href: `/colleges/${slug}/courses` },
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://collegeandfees.com" },
      { "@type": "ListItem", position: 2, name: "Direct Admission Bangalore", item: "https://collegeandfees.com/direct-admission/bangalore" },
      { "@type": "ListItem", position: 3, name: name, item: `https://collegeandfees.com/direct-admission/${slug}` },
    ],
  };

  return (
    <>
      <Head>
        <title>Direct Admission {name} 2026 — Fees & Process</title>
        <meta name="description" content={`Direct admission in ${name} 2026. Contact counsellor for fee and process details.`} />
        <meta name="robots" content="noindex, nofollow" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      </Head>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        {/* College Header Band */}
        <div className="bg-[#1a3c6e] text-white py-8 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold">{name}</h1>
              <p className="text-blue-200 mt-1 text-sm">
                {[college.city, college.established && `Estd. ${college.established}`, college.affiliation, college.naac_grade && `NAAC ${college.naac_grade}`].filter(Boolean).join(" | ")}
              </p>
            </div>
            <WaButton href={waLink(waMsg)}>Ask Counsellor</WaButton>
          </div>
        </div>
        {/* Sticky Tab Bar — 7 tabs */}
        <div className="sticky top-16 z-30 bg-white border-b border-gray-200 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 flex">
            {tabs.map((tab) => (
              <Link key={tab.label} href={tab.href}
                className={`whitespace-nowrap px-4 py-3 text-sm font-medium border-b-2 transition-colors ${tab.active ? "border-[#1a3c6e] text-[#1a3c6e] font-bold" : "border-transparent text-gray-500 hover:text-gray-800"}`}>
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center max-w-2xl mx-auto">
            <div className="text-5xl mb-4">📋</div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Information Being Verified</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Detailed direct admission information for {name} is being verified. For accurate 2026 fees and process, contact our counsellor on WhatsApp — free, no obligation.
            </p>
            <WaButton href={waLink(waMsg)} className="text-base px-8 py-3">Get Free Guidance on WhatsApp</WaButton>
          </div>
          {similarColleges.length > 0 && (
            <section className="mt-14">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Other Colleges with Direct Admission in Bangalore</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {similarColleges.map((c) => (
                  <Link key={c.id} href={`/direct-admission/${c.slug}`}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md hover:border-[#1a3c6e] transition-all group">
                    {c.naac_grade && <span className="inline-block bg-blue-50 text-[#1a3c6e] text-xs font-bold px-2 py-0.5 rounded-full mb-2">NAAC {c.naac_grade}</span>}
                    <h3 className="font-semibold text-gray-900 text-sm group-hover:text-[#1a3c6e] transition-colors leading-snug">{c.name}</h3>
                    <p className="text-xs text-[#1a3c6e] mt-2 group-hover:underline">View Admission →</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   ACTIVE COLLEGE PAGE — 12 SECTIONS
───────────────────────────────────────────── */
export default function CollegeSlugPage({ college, fees, admissions, content, placements, ranking, faqs, similarColleges, slug }) {
  const [phone, setPhone] = useState("");

  if (!college.is_active) {
    return <InactivePage college={college} slug={slug} similarColleges={similarColleges} />;
  }

  const shortName = college.short_name || college.name;
  const waMsg = `Hi, I want to know about direct admission in ${college.name}. What are the fees and process for 2026?`;

  const metaTitle = content?.meta_title || `Direct Admission in ${college.name} 2026 — Fees, Process and Seats`;
  const metaDesc = content?.meta_desc || `Direct admission in ${shortName} 2026. Management quota fees, seat availability, documents, and step-by-step admission process. Free counsellor on WhatsApp.`;
  const canonicalUrl = `https://collegeandfees.com/direct-admission/${slug}`;

  const tabs = [
    { label: "Overview", href: `/colleges/${slug}` },
    { label: "Fees", href: `/colleges/${slug}/fees` },
    { label: "Placements", href: `/colleges/${slug}/placements` },
    { label: "Cutoff", href: `/colleges/${slug}/cutoff` },
    { label: "Admission", href: `/direct-admission/${slug}`, active: true },
    { label: "Hostel", href: `/colleges/${slug}/hostel` },
    { label: "Courses", href: `/colleges/${slug}/courses` },
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
      { "@type": "ListItem", position: 2, name: "Direct Admission Bangalore", item: "https://collegeandfees.com/direct-admission/bangalore" },
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

  // Build important dates from admissions or fallback
  const importantDates = admissions?.important_dates
    ? Object.entries(admissions.important_dates).map(([event, date]) => ({ event, date }))
    : DEFAULT_DATES;

  const documents = admissions?.documents_required?.length > 0
    ? admissions.documents_required
    : ["10th Marksheet (original + 2 copies)", "12th/PUC Marksheet (original + 2 copies)", "KCET / COMEDK Rank Card (if applicable)", "Transfer Certificate", "Migration Certificate (if from another board)", "Category Certificate (SC/ST/OBC if applicable)", "6 Passport-size Photographs", "Aadhar Card copy"];

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
        <meta property="og:type" content="website" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      </Head>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        {/* ── SECTION 1: College Header Band ── */}
        <div className="bg-[#1a3c6e] text-white py-8 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-blue-300 text-sm font-medium mb-1">Direct Admission 2026</p>
              <h1 className="text-2xl md:text-3xl font-extrabold leading-tight">{college.name}</h1>
              <p className="text-blue-200 mt-2 text-sm">
                {[college.city, college.established && `Estd. ${college.established}`, college.affiliation, college.naac_grade && `NAAC ${college.naac_grade}`].filter(Boolean).join(" | ")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a href={waLink(`Hi, I want to know: will I get admission in ${college.name}? What is my chance?`)} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white text-white font-semibold px-5 py-2.5 rounded-full hover:bg-white hover:text-[#1a3c6e] transition-colors text-sm">
                Will I Get In? Ask Counsellor
              </a>
              <WaButton href={waLink(waMsg)} className="text-sm">WhatsApp Now</WaButton>
            </div>
          </div>
        </div>

        {/* ── SECTION 2: Sticky Tab Bar — 7 tabs ── */}
        <div className="sticky top-16 z-30 bg-white border-b border-gray-200 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 flex">
            {tabs.map((tab) => (
              <Link key={tab.label} href={tab.href}
                className={`whitespace-nowrap px-4 py-3 text-sm font-medium border-b-2 transition-colors ${tab.active ? "border-[#1a3c6e] text-[#1a3c6e] font-bold" : "border-transparent text-gray-500 hover:text-gray-800"}`}>
                {tab.label}
              </Link>
            ))}
          </div>
        </div>

        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-[#1a3c6e]">Home</Link>
              <span>›</span>
              <Link href="/direct-admission/bangalore" className="hover:text-[#1a3c6e]">Direct Admission Bangalore</Link>
              <span>›</span>
              <span className="text-gray-800 font-medium">{shortName}</span>
            </nav>

            {/* ── SECTION 3: H1 + Quick Lead Strip ── */}
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
              Direct Admission in {college.name} 2026 — Fees, Process and Seats
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <span className="text-sm text-gray-500 whitespace-nowrap font-medium">{shortName}</span>
              <input
                type="tel"
                placeholder="Enter your mobile number for callback"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 min-w-0 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#25d366]"
              />
              <button
                onClick={() => {
                  const msg = phone
                    ? `Hi, I want guidance about direct admission to ${college.name}. Please call me on ${phone}.`
                    : waMsg;
                  window.open(waLink(msg), "_blank");
                }}
                className="flex-shrink-0 flex items-center gap-2 bg-[#25d366] text-white font-semibold px-5 py-2.5 rounded-full hover:bg-green-500 transition-colors text-sm"
              >
                <WaIcon />
                Get Free Guidance
              </button>
            </div>

            {/* ── SECTION 4: Key Stats ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { label: "NAAC Grade", value: college.naac_grade || "—" },
                { label: "NIRF Rank", value: ranking ? `#${ranking.rank}` : "Not Ranked" },
                { label: "Highest Package", value: placements ? `${placements.highest_package_lpa} LPA` : "Data Awaited" },
                { label: "Management Quota", value: "Available ✓" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                  <p className="text-2xl font-bold text-[#1a3c6e]">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* ── SECTION 5: Fees Table ── */}
            <section className="mb-4" id="fees">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Direct Admission Fees at {shortName} 2026-27 (Management Quota)
              </h2>
              {fees.length > 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-[#1a3c6e] text-white">
                        <tr>
                          <th className="px-5 py-3 text-left font-semibold">Branch</th>
                          <th className="px-5 py-3 text-right font-semibold">Tuition Fee/yr</th>
                          <th className="px-5 py-3 text-right font-semibold">Hostel Fee/yr</th>
                          <th className="px-5 py-3 text-right font-semibold">Total/yr</th>
                          <th className="px-5 py-3 text-right font-semibold">4-yr Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {fees.map((fee, i) => (
                          <tr key={i} className="hover:bg-gray-50">
                            <td className="px-5 py-4 font-medium text-gray-900">
                              {fee.course_name} <span className="text-gray-400 text-xs ml-1">({fee.course_short})</span>
                            </td>
                            <td className="px-5 py-4 text-right text-[#1a3c6e] font-semibold">
                              ₹{fee.tuition_fee?.toLocaleString("en-IN")}
                            </td>
                            <td className="px-5 py-4 text-right text-gray-600">
                              {fee.hostel_fee ? `₹${fee.hostel_fee.toLocaleString("en-IN")}` : "—"}
                            </td>
                            <td className="px-5 py-4 text-right text-gray-700 font-medium">
                              ₹{fee.total_fee?.toLocaleString("en-IN")}
                            </td>
                            <td className="px-5 py-4 text-right text-gray-600">
                              ₹{(fee.tuition_fee * 4)?.toLocaleString("en-IN")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-400 px-5 py-3 border-t border-gray-100">
                    * Fees shown are for academic year {fees[0]?.academic_year || "2024-25"}. 2026-27 fees may vary by 5–10%. Contact counsellor for confirmed figures.
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                  <p className="text-gray-600 mb-4">Fee data for {college.name} is being verified. Contact counsellor for accurate 2026-27 figures.</p>
                  <WaButton href={waLink(`Hi, what is the management quota fee for ${college.name} in 2026?`)}>
                    Get Fee Details on WhatsApp
                  </WaButton>
                </div>
              )}
            </section>

            {/* Mid-page CTA */}
            <div className="bg-[#e8f5e9] rounded-xl p-6 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-gray-800 font-medium">
                Is {shortName} worth it for your budget? Our counsellor can give you an honest picture in 5 minutes.
              </p>
              <WaButton href={waLink(waMsg)} className="flex-shrink-0">Ask on WhatsApp</WaButton>
            </div>

            {/* ── SECTION 6: Admission Process ── */}
            <section className="mb-10" id="process">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                How to Get Direct Admission in {shortName} — Step by Step
              </h2>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                {admissions?.mgmt_quota_process ? (
                  <>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-4">{admissions.mgmt_quota_process}</p>
                    {admissions.contact_phone && (
                      <p className="text-sm text-gray-500">
                        Admissions contact: <span className="font-medium text-gray-800">{admissions.contact_phone}</span>
                        {admissions.contact_email && ` · ${admissions.contact_email}`}
                      </p>
                    )}
                  </>
                ) : (
                  <ol className="space-y-3 text-gray-700 text-sm">
                    {[
                      `Contact the ${college.name} admissions office directly or reach out to our counsellor.`,
                      "Submit academic documents: 10th and 12th marksheets, CET scorecard.",
                      "Pay the initial registration fee to block your seat.",
                      "Complete document verification at the college campus.",
                      "Pay first year fees to confirm the seat allotment.",
                    ].map((step, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="flex-shrink-0 w-7 h-7 bg-[#1a3c6e] text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                        <span className="leading-relaxed pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                )}
                <div className="mt-5 pt-5 border-t border-gray-100">
                  <WaButton href={waLink(`Hi, what is the exact 2026 direct admission process for ${college.name}?`)}>
                    Get Exact 2026 Process on WhatsApp
                  </WaButton>
                </div>
              </div>
            </section>

            {/* ── SECTION 7: Documents Required ── */}
            <section className="mb-10" id="documents">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Documents Required for Direct Admission</h2>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <ul className="grid sm:grid-cols-2 gap-2">
                  {documents.map((doc, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-[#25d366] mt-0.5 flex-shrink-0 font-bold">✓</span>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* ── SECTION 8: Important Dates ── */}
            <section className="mb-10" id="dates">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Important Dates — Direct Admission {college.name} 2026</h2>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-5 py-3 text-left font-semibold text-gray-700">Event</th>
                      <th className="px-5 py-3 text-left font-semibold text-gray-700">Expected Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {importantDates.map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-5 py-3 text-gray-800">{row.event}</td>
                        <td className="px-5 py-3 text-gray-600">{row.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-gray-400 px-5 py-3 border-t border-gray-100">
                  * Exact dates to be announced. Contact counsellor for real-time updates.
                </p>
              </div>
            </section>

            {/* ── SECTION 9: About the College ── */}
            <section className="mb-10" id="about">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About {college.name}</h2>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  {content?.about || `${college.name} is a ${college.type || "private"} engineering college in ${college.city}, established in ${college.established || "Karnataka"}. Affiliated to ${college.affiliation || "VTU"}, the college holds a NAAC grade of ${college.naac_grade || "A"}. It offers undergraduate and postgraduate engineering programmes.`}
                </p>
                {content?.highlights?.length > 0 && (
                  <ul className="grid sm:grid-cols-2 gap-2 mt-4">
                    {content.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-[#1a3c6e] mt-0.5 flex-shrink-0 font-bold">•</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>

            {/* ── SECTION 10: Placements ── */}
            <section className="mb-10" id="placements">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Placements at {shortName}</h2>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                {placements ? (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
                      {[
                        { label: "Avg Package", value: `${placements.avg_package_lpa} LPA` },
                        { label: "Highest Package", value: `${placements.highest_package_lpa} LPA` },
                        { label: "Placement %", value: `${placements.placement_pct}%` },
                      ].map((s) => (
                        <div key={s.label} className="text-center bg-blue-50 rounded-lg p-4">
                          <p className="text-2xl font-bold text-[#1a3c6e]">{s.value}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{s.label} ({placements.year})</p>
                        </div>
                      ))}
                    </div>
                    {placements.top_recruiters?.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Top Recruiters</p>
                        <div className="flex flex-wrap gap-2">
                          {placements.top_recruiters.map((r) => (
                            <span key={r} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">{r}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-gray-500 text-sm">Placement data is being updated. Contact counsellor for latest figures.</p>
                )}
              </div>
            </section>

            {/* ── SECTION 11: Similar Colleges ── */}
            {similarColleges.length > 0 && (
              <section className="mb-10" id="similar">
                <h2 className="text-xl font-bold text-gray-900 mb-5">Other Colleges with Direct Admission in Bangalore</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {similarColleges.map((c) => (
                    <Link key={c.id} href={`/direct-admission/${c.slug}`}
                      className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md hover:border-[#1a3c6e] transition-all group">
                      {c.naac_grade && <span className="inline-block bg-blue-50 text-[#1a3c6e] text-xs font-bold px-2 py-0.5 rounded-full mb-2">NAAC {c.naac_grade}</span>}
                      <h3 className="font-semibold text-gray-900 text-sm group-hover:text-[#1a3c6e] transition-colors leading-snug">{c.name}</h3>
                      <p className="text-xs text-[#1a3c6e] mt-2 group-hover:underline">View Admission →</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* ── SECTION 12: FAQs ── */}
            {faqs.length > 0 && (
              <section className="mb-10" id="faqs">
                <h2 className="text-xl font-bold text-gray-900 mb-5">FAQs — Direct Admission {shortName}</h2>
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                      <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>

        <Footer />
      </div>
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
    // 1. Fetch college by slug
    const { data: college, error: collegeError } = await supabase
      .from("colleges")
      .select("id, slug, name, short_name, city, established, affiliation, type, naac_grade, is_active")
      .eq("slug", slug)
      .single();

    if (collegeError || !college) {
      return { notFound: true };
    }

    // 2. Run all remaining queries in parallel
    const [feesResult, admissionsResult, contentResult, placementsResult, rankingResult, collegeFaqsResult, generalFaqsResult, similarResult] = await Promise.all([
      // Fees — join courses table for branch name; quota stored as "management" (lowercase)
      supabase
        .from("fees")
        .select("course_id, academic_year, quota, tuition_fee, hostel_fee, other_fees, total_fee, courses(name, short_name)")
        .eq("college_id", college.id)
        .eq("quota", "management")
        .order("tuition_fee", { ascending: false }),

      // Admissions process, documents, dates
      supabase.from("admissions").select("mgmt_quota_process, documents_required, important_dates, contact_phone, contact_email").eq("college_id", college.id).maybeSingle(),

      // Content — about, highlights, meta
      supabase.from("college_content").select("about, highlights, meta_title, meta_desc").eq("college_id", college.id).maybeSingle(),

      // Placements — latest year
      supabase.from("placements").select("year, avg_package_lpa, highest_package_lpa, placement_pct, top_recruiters").eq("college_id", college.id).order("year", { ascending: false }).limit(1).maybeSingle(),

      // Rankings — NIRF latest
      supabase.from("rankings").select("source, year, rank").eq("college_id", college.id).eq("source", "NIRF").order("year", { ascending: false }).limit(1).maybeSingle(),

      // College-specific FAQs
      supabase.from("faqs").select("id, question, answer").eq("college_id", college.id).eq("is_active", true).order("sort_order").limit(6),

      // General FAQs (no college)
      supabase.from("faqs").select("id, question, answer").is("college_id", null).eq("is_active", true).order("sort_order").limit(3),

      // Similar colleges in same city
      supabase.from("colleges").select("id, slug, name, naac_grade").eq("city", college.city).eq("is_active", true).neq("id", college.id).limit(4),
    ]);

    // Flatten fees with course name
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

    // Merge FAQs (college first, then general, max 8)
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
    console.error("[college-slug] getServerSideProps error:", err.message);
    return { notFound: true };
  }
}
