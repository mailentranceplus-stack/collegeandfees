import Head from "next/head";

export default function Home({ colleges }) {
  return (
    <>
      <Head>
        <title>
          Engineering Colleges in Bangalore - Fees, Admissions & Rankings 2024
        </title>
        <meta
          name="description"
          content="Comprehensive guide to engineering colleges in Bangalore. Compare fees, admission requirements, rankings, and courses for top engineering colleges in Bangalore."
        />
        <meta
          name="keywords"
          content="engineering colleges bangalore, engineering college fees bangalore, bangalore engineering admissions, top engineering colleges bangalore"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Engineering Colleges in Bangalore - Fees & Admissions Guide" />
        <meta
          property="og:description"
          content="Find the best engineering colleges in Bangalore. Compare fees, seats, and admission cutoffs."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://collegeandfees.com/" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary-700">
                CollegeAndFees
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              <a href="#colleges" className="hover:text-primary-600 transition-colors">
                Colleges
              </a>
              <a href="#fees" className="hover:text-primary-600 transition-colors">
                Fees
              </a>
              <a href="#admissions" className="hover:text-primary-600 transition-colors">
                Admissions
              </a>
              <a href="#contact" className="hover:text-primary-600 transition-colors">
                Contact
              </a>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-900 via-primary-700 to-primary-500 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Engineering Colleges in Bangalore
            </h1>
            <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Your complete guide to engineering college admissions, fees
              structures, rankings, and cutoffs in Bangalore for 2024–25.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#colleges"
                className="bg-white text-primary-700 font-semibold px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors"
              >
                Explore Colleges
              </a>
              <a
                href="#admissions"
                className="border border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors"
              >
                Admission Guide
              </a>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "Engineering Colleges", value: "200+" },
              { label: "Courses Available", value: "50+" },
              { label: "Total Seats", value: "80,000+" },
              { label: "Top Ranked Institutes", value: "15" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-primary-700">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Colleges Section */}
        <section id="colleges" className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Top Engineering Colleges in Bangalore
          </h2>
          <p className="text-gray-500 mb-10">
            Explore leading engineering institutions with NAAC & NBA accreditation
          </p>

          {colleges && colleges.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {colleges.map((college) => (
                <div
                  key={college.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {college.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{college.location}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-primary-600 font-medium">
                      ₹{college.fees_per_year?.toLocaleString("en-IN")}/yr
                    </span>
                    <span className="text-gray-400">{college.type}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {placeholderColleges.map((college) => (
                <div
                  key={college.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-block bg-primary-50 text-primary-700 text-xs font-medium px-2.5 py-1 rounded-full">
                      {college.rank}
                    </span>
                    <span className="text-xs text-gray-400">{college.type}</span>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">
                    {college.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{college.location}</p>
                  <div className="border-t border-gray-100 pt-4 flex justify-between text-sm">
                    <div>
                      <p className="text-gray-400 text-xs">Fees/Year</p>
                      <p className="text-primary-700 font-semibold">{college.fees}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-xs">KCET Cutoff</p>
                      <p className="text-gray-700 font-medium">{college.cutoff}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Fees Section */}
        <section id="fees" className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Engineering College Fees in Bangalore
            </h2>
            <p className="text-gray-500 mb-10">
              Fee structures vary by college type and branch. Here&apos;s an overview.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-primary-50 text-primary-800 font-semibold">
                  <tr>
                    <th className="px-6 py-4">College Type</th>
                    <th className="px-6 py-4">Government Quota</th>
                    <th className="px-6 py-4">Management Quota</th>
                    <th className="px-6 py-4">NRI Quota</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {feesData.map((row) => (
                    <tr key={row.type} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{row.type}</td>
                      <td className="px-6 py-4">{row.gov}</td>
                      <td className="px-6 py-4">{row.mgmt}</td>
                      <td className="px-6 py-4">{row.nri}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Admissions Section */}
        <section id="admissions" className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Engineering Admissions in Bangalore 2024
            </h2>
            <p className="text-gray-500 mb-10">
              Step-by-step guide to securing your engineering seat in Bangalore
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {admissionSteps.map((step, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-lg">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="bg-gray-900 text-gray-400 py-12">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-3">
                CollegeAndFees
              </h3>
              <p className="text-sm">
                Your trusted resource for engineering college admissions and fee
                information in Bangalore, Karnataka.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#colleges" className="hover:text-white transition-colors">
                    Top Colleges
                  </a>
                </li>
                <li>
                  <a href="#fees" className="hover:text-white transition-colors">
                    Fee Structure
                  </a>
                </li>
                <li>
                  <a href="#admissions" className="hover:text-white transition-colors">
                    Admission Process
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Entrance Exams</h4>
              <ul className="space-y-2 text-sm">
                <li>KCET (Karnataka CET)</li>
                <li>JEE Main</li>
                <li>COMEDK UGET</li>
                <li>PESSAT</li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-sm text-center">
            © 2024 CollegeAndFees. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}

const placeholderColleges = [
  {
    id: 1,
    name: "Indian Institute of Science (IISc)",
    location: "Malleshwaram, Bangalore",
    type: "Autonomous",
    rank: "#1 in Bangalore",
    fees: "₹35,000/yr",
    cutoff: "Rank < 100",
  },
  {
    id: 2,
    name: "RV College of Engineering",
    location: "Mysore Road, Bangalore",
    type: "Private",
    rank: "#2 in Bangalore",
    fees: "₹1,60,000/yr",
    cutoff: "Rank < 2,000",
  },
  {
    id: 3,
    name: "BMS College of Engineering",
    location: "Bull Temple Road, Bangalore",
    type: "Private",
    rank: "#3 in Bangalore",
    fees: "₹1,55,000/yr",
    cutoff: "Rank < 3,000",
  },
  {
    id: 4,
    name: "PES University",
    location: "Banashankari, Bangalore",
    type: "Deemed",
    rank: "#4 in Bangalore",
    fees: "₹2,60,000/yr",
    cutoff: "PESSAT Score",
  },
  {
    id: 5,
    name: "MS Ramaiah Institute of Technology",
    location: "Mathikere, Bangalore",
    type: "Private",
    rank: "#5 in Bangalore",
    fees: "₹1,40,000/yr",
    cutoff: "Rank < 5,000",
  },
  {
    id: 6,
    name: "Bangalore Institute of Technology",
    location: "VV Puram, Bangalore",
    type: "Private",
    rank: "#6 in Bangalore",
    fees: "₹80,000/yr",
    cutoff: "Rank < 8,000",
  },
];

const feesData = [
  {
    type: "Government Colleges",
    gov: "₹15,000 – ₹50,000",
    mgmt: "₹50,000 – ₹80,000",
    nri: "₹3,00,000+",
  },
  {
    type: "Private Aided",
    gov: "₹50,000 – ₹90,000",
    mgmt: "₹1,00,000 – ₹1,50,000",
    nri: "₹5,00,000+",
  },
  {
    type: "Private Unaided",
    gov: "₹1,00,000 – ₹1,80,000",
    mgmt: "₹2,00,000 – ₹3,50,000",
    nri: "₹8,00,000+",
  },
  {
    type: "Deemed Universities",
    gov: "₹2,00,000 – ₹3,00,000",
    mgmt: "₹3,00,000 – ₹5,00,000",
    nri: "₹10,00,000+",
  },
];

const admissionSteps = [
  {
    title: "Appear for Entrance Exams",
    desc: "Register and appear for KCET, JEE Main, or COMEDK UGET based on your target colleges.",
  },
  {
    title: "Check Eligibility",
    desc: "Ensure you meet the minimum 45% in PCM (Physics, Chemistry, Mathematics) in Class 12.",
  },
  {
    title: "KCET Counselling",
    desc: "Participate in Karnataka Examination Authority (KEA) counselling for government quota seats.",
  },
  {
    title: "COMEDK Counselling",
    desc: "Register for COMEDK counselling for private engineering colleges across Karnataka.",
  },
  {
    title: "Document Verification",
    desc: "Submit Class 10 & 12 mark sheets, caste certificate (if applicable), domicile proof, and entrance rank card.",
  },
  {
    title: "Seat Confirmation & Fee Payment",
    desc: "Pay the first-year fee to confirm your seat and complete the college admission process.",
  },
];

export async function getServerSideProps(context) {
  let colleges = [];

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const { data, error } = await supabase
        .from("colleges")
        .select("*")
        .order("rank", { ascending: true })
        .limit(9);

      if (!error && data) {
        colleges = data;
      }
    }
  } catch (err) {
    console.error("Failed to fetch colleges from Supabase:", err);
  }

  return {
    props: {
      colleges,
    },
  };
}
