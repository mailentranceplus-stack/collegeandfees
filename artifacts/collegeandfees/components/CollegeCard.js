import Link from "next/link";

function formatINR(amount) {
  if (!amount && amount !== 0) return null;
  return "\u20B9" + Number(amount).toLocaleString("en-IN");
}

const COLLEGE_IMAGES = {
  "rvce-bangalore":              "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=600&q=80",
  "christ-university-bangalore": "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=600&q=80",
  "bms-college-of-engineering":  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80",
  "pes-university-bangalore":    "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=600&q=80",
  "msrit-bangalore":             "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&q=80",
};

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80";

export default function CollegeCard({ college }) {
  const feeDisplay = college.top_fee ? formatINR(college.top_fee) : null;
  const courseName = college.top_course || "CSE";
  const photo = COLLEGE_IMAGES[college.slug] || FALLBACK_IMAGE;

  return (
    <Link href={`/direct-admission/${college.slug}`} className="college-card">
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
