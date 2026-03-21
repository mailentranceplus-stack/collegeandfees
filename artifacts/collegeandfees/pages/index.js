import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CollegeCard from "../components/CollegeCard";
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

const ADMISSION_STEPS = [
  { title: "Appear for Entrance Exams", desc: "Register for KCET, JEE Main, or COMEDK UGET based on your target colleges." },
  { title: "Check Eligibility", desc: "Ensure you have minimum 45% in PCM (Physics, Chemistry, Maths) in Class 12." },
  { title: "KCET Counselling", desc: "Participate in KEA counselling for government quota seats." },
  { title: "COMEDK Counselling", desc: "Register for COMEDK counselling for private engineering colleges." },
  { title: "Document Verification", desc: "Submit 10th & 12th marksheets, caste certificate, domicile proof, and rank card." },
  { title: "Seat Confirmation & Fee Payment", desc: "Pay the first-year fee to confirm your seat and complete admission." },
];

export default function Home({ colleges }) {
  const displayColleges = colleges.length > 0 ? colleges : PLACEHOLDER_COLLEGES;

  return (
    <>
      <Head>
        <title>Engineering Colleges in Bangalore — Fees, Direct Admission & Rankings 2026</title>
        <meta name="description" content="Comprehensive guide to engineering colleges in Bangalore. Compare fees, direct admission process, rankings, and courses for top colleges in Bangalore 2026." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Engineering Colleges in Bangalore — Fees & Direct Admission Guide" />
        <meta property="og:description" content="Find the best engineering colleges in Bangalore. Compare fees, seats, and direct admission info." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://collegeandfees.com/" />
      </Head>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        {/* Hero */}
        <section className="bg-gradient-to-br from-[#1a3c6e] via-blue-700 to-blue-500 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Engineering Colleges in Bangalore
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Your complete guide to direct admission, fees, and rankings for top engineering colleges in Bangalore 2026.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/direct-admission/bangalore"
                className="bg-white text-[#1a3c6e] font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Direct Admission Guide
              </Link>
              <a
                href={WA_GENERAL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25d366] text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-500 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Free Counsellor Guidance
              </a>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "Engineering Colleges", value: "200+" },
              { label: "Branches Available", value: "50+" },
              { label: "Total Seats", value: "80,000+" },
              { label: "NAAC Accredited", value: "150+" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-[#1a3c6e]">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Direct Admission CTA Banner */}
        <section className="bg-[#f0f7ff] border-y border-blue-100 py-10 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                Looking for Direct Admission in Bangalore? 2026 seats are filling fast.
              </h2>
              <p className="text-gray-600 text-sm">
                Management quota seats available at RVCE, BMS, MSRIT, PES, Christ and more. Free counsellor guidance.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                href="/direct-admission/bangalore"
                className="inline-block bg-[#1a3c6e] text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-900 transition-colors text-sm text-center"
              >
                View All Colleges →
              </Link>
              <a
                href={WA_GENERAL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25d366] text-white font-semibold px-6 py-3 rounded-full hover:bg-green-500 transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Now
              </a>
            </div>
          </div>
        </section>

        <main className="flex-1">
          {/* Colleges Section */}
          <section className="max-w-7xl mx-auto px-4 py-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Top Engineering Colleges in Bangalore
            </h2>
            <p className="text-gray-500 mb-10">
              Click any college to see direct admission fees, process, and seat availability.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayColleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/direct-admission/bangalore"
                className="inline-block bg-[#1a3c6e] text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-900 transition-colors"
              >
                View All Direct Admission Colleges →
              </Link>
            </div>
          </section>

          {/* Fees Section */}
          <section className="bg-white py-14">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Engineering College Fees in Bangalore 2026
              </h2>
              <p className="text-gray-500 mb-10">
                Fee structures vary by college type and branch. Here&apos;s an overview.
              </p>
              <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                <table className="w-full text-sm text-left">
                  <thead className="bg-[#1a3c6e] text-white">
                    <tr>
                      <th className="px-6 py-4 font-semibold">College Type</th>
                      <th className="px-6 py-4 font-semibold">Government Quota</th>
                      <th className="px-6 py-4 font-semibold">Management Quota</th>
                      <th className="px-6 py-4 font-semibold">NRI Quota</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {FEES_DATA.map((row) => (
                      <tr key={row.type} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">{row.type}</td>
                        <td className="px-6 py-4">{row.gov}</td>
                        <td className="px-6 py-4 text-[#1a3c6e] font-semibold">{row.mgmt}</td>
                        <td className="px-6 py-4">{row.nri}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Admissions Section */}
          <section className="py-14">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Engineering Admissions in Bangalore 2026
              </h2>
              <p className="text-gray-500 mb-10">
                Step-by-step guide to securing your engineering seat in Bangalore.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {ADMISSION_STEPS.map((step, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-50 text-[#1a3c6e] rounded-full flex items-center justify-center font-bold text-lg">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-sm text-gray-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 text-center">
                <Link
                  href="/direct-admission/bangalore"
                  className="inline-block bg-[#1a3c6e] text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-900 transition-colors mr-4"
                >
                  Direct Admission Guide
                </Link>
                <a
                  href={WA_GENERAL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25d366] text-white font-semibold px-8 py-3 rounded-full hover:bg-green-500 transition-colors"
                >
                  Ask Counsellor on WhatsApp
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
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
