import Link from "next/link";

function formatINR(amount) {
  if (!amount && amount !== 0) return null;
  return "\u20B9" + Number(amount).toLocaleString("en-IN");
}

export default function CollegeCard({ college }) {
  const feeDisplay = college.top_fee ? formatINR(college.top_fee) : null;
  const courseName = college.top_course || "CSE";

  return (
    <Link
      href={`/direct-admission/${college.slug}`}
      className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-[#1a3c6e] transition-all group flex flex-col"
    >
      <div className="flex items-start justify-between mb-3">
        {college.naac_grade && (
          <span className="inline-block bg-blue-50 text-[#1a3c6e] text-xs font-bold px-2.5 py-1 rounded-full border border-blue-100">
            NAAC {college.naac_grade}
          </span>
        )}
        {college.type && (
          <span className="text-xs text-gray-400">{college.type}</span>
        )}
      </div>

      <h3 className="font-semibold text-gray-900 group-hover:text-[#1a3c6e] transition-colors leading-snug mb-1">
        {college.name}
      </h3>

      {college.city && (
        <p className="text-xs text-gray-400 mb-3">{college.city}</p>
      )}

      {feeDisplay ? (
        <div className="bg-[#f0f7ff] rounded-lg px-4 py-3 mb-3 border border-blue-100">
          <p className="text-xs text-gray-500 mb-0.5 font-medium">{courseName} &middot; Management Quota</p>
          <p className="text-2xl font-extrabold text-[#1a3c6e] leading-tight">
            {feeDisplay}
            <span className="text-sm font-normal text-gray-500">/yr</span>
          </p>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg px-4 py-3 mb-3 border border-gray-100">
          <p className="text-xs text-gray-500 mb-0.5">Management Quota</p>
          <p className="text-sm font-semibold text-gray-600">Contact for fee details</p>
        </div>
      )}

      <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
        <span className="inline-block bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full border border-green-100">
          Seats Available 2026
        </span>
        <span className="text-xs text-[#1a3c6e] font-medium group-hover:underline">
          View Fees &amp; Process &rarr;
        </span>
      </div>
    </Link>
  );
}
