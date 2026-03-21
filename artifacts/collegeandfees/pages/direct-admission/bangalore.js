import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getSupabase } from "../../lib/supabase";

const WA_NUMBER = "917975193033";
const WA_GENERAL = `https://wa.me/${WA_NUMBER}?text=Hi%2C%20I%20want%20to%20know%20about%20direct%20admission%20in%20Bangalore%20engineering%20colleges.%20Can%20you%20guide%20me%3F`;

const PLACEHOLDER_COLLEGES = [
  { id: 1, slug: "rvce-bangalore", name: "RV College of Engineering", city: "Bangalore", naac_grade: "A+" },
  { id: 2, slug: "bms-college-of-engineering", name: "BMS College of Engineering", city: "Bangalore", naac_grade: "A" },
  { id: 3, slug: "christ-university-bangalore", name: "Christ University – Faculty of Engineering", city: "Bangalore", naac_grade: "A+" },
  { id: 4, slug: "msrit-bangalore", name: "MS Ramaiah Institute of Technology", city: "Bangalore", naac_grade: "A+" },
  { id: 5, slug: "pes-university-bangalore", name: "PES University", city: "Bangalore", naac_grade: "A" },
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
    <div className="space-y-2">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none"
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
              <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-gray-200 text-[#1a3c6e] transition-transform ${isOpen ? "rotate-45" : ""}`}>
                +
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-5">
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </Head>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Breadcrumb */}
          <div className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <nav className="flex items-center gap-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-[#1a3c6e]">Home</Link>
                <span>›</span>
                <span>Direct Admission</span>
                <span>›</span>
                <span className="text-gray-800 font-medium">Bangalore</span>
              </nav>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* H1 */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
              Direct Admission in Bangalore Engineering Colleges 2026
            </h1>

            {/* Counsellor Intro Block */}
            <div className="border-l-4 border-[#1a3c6e] bg-blue-50 px-6 py-5 mb-10 rounded-r-lg">
              <p className="text-gray-700 italic leading-relaxed">
                "Direct admission in Bangalore engineering colleges refers to admission through Management Quota seats — seats that colleges fill directly without KCET or COMEDK counselling. These seats are available at every private engineering college in Bangalore, typically 30–35% of total intake. As an RVCE alumnus who has counselled hundreds of students through this process, I can tell you: the fees vary wildly by branch and college. CSE at RVCE costs nearly ₹1.6 lakh/year; the same branch at a lesser-known college may cost ₹80,000/year. Getting the right seat at the right fee requires knowing which colleges have genuine vacancy — and that changes week to week. WhatsApp me and I'll give you an honest, unbiased picture within 24 hours."
              </p>
              <a
                href={WA_GENERAL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 bg-[#25d366] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-green-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Ask Counsellor on WhatsApp
              </a>
            </div>

            {/* College Cards Grid */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Engineering Colleges with Direct Admission in Bangalore
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayColleges.map((college) => (
                  <Link
                    key={college.id}
                    href={`/direct-admission/${college.slug}`}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-[#1a3c6e] transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      {college.naac_grade && (
                        <span className="inline-block bg-blue-50 text-[#1a3c6e] text-xs font-bold px-2.5 py-1 rounded-full border border-blue-100">
                          NAAC {college.naac_grade}
                        </span>
                      )}
                      <span className="inline-block bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full border border-green-100">
                        Management Quota Available
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#1a3c6e] transition-colors leading-snug">
                      {college.name}
                    </h3>
                    {college.city && (
                      <p className="text-sm text-gray-400 mt-1">{college.city}</p>
                    )}
                    <p className="text-sm text-[#1a3c6e] font-medium mt-3 group-hover:underline">
                      View Fees & Process →
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            {/* WhatsApp CTA Block */}
            <div className="bg-[#f0f7ff] border border-blue-100 rounded-xl p-8 mb-12 text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Want direct admission in a top Bangalore engineering college?
              </h2>
              <p className="text-gray-600 mb-5">
                Our counsellor is an RVCE alumnus — free guidance on WhatsApp. No fees, no obligation.
              </p>
              <a
                href={WA_GENERAL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25d366] text-white font-semibold px-8 py-3 rounded-full hover:bg-green-500 transition-colors text-base"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Free Guidance Now
              </a>
            </div>

            {/* Key Facts */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Facts About Direct Admission</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: "🎓", fact: "Management quota: 30–35% of total seats at most private colleges" },
                  { icon: "📅", fact: "Open: June–July 2026 after KCET counselling" },
                  { icon: "📄", fact: "Documents: 10th, 12th marksheets, CET rank card" },
                  { icon: "✅", fact: "No KCET/COMEDK rank required for management quota" },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <p className="text-sm text-gray-700 leading-relaxed">{item.fact}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs — Accordion */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions — Direct Admission Bangalore
              </h2>
              <FaqAccordion faqs={displayFaqs} />
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  let colleges = [];
  let faqs = [];

  try {
    const supabase = getSupabase();
    if (supabase) {
      const { data: collegeData } = await supabase
        .from("colleges")
        .select("id, slug, name, short_name, city, naac_grade, type")
        .eq("is_active", true)
        .order("name");
      if (collegeData) colleges = collegeData;

      const { data: faqData } = await supabase
        .from("faqs")
        .select("id, question, answer")
        .is("college_id", null)
        .eq("is_active", true)
        .order("sort_order")
        .limit(8);
      if (faqData) faqs = faqData;
    }
  } catch (err) {
    console.error("Supabase fetch error:", err.message);
  }

  return { props: { colleges, faqs } };
}
