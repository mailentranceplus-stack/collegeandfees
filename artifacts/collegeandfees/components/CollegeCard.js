import Link from "next/link";
import Image from "next/image";
import { getCollegeImage } from "../lib/constants";

function formatINR(amount) {
  if (!amount && amount !== 0) return null;
  return "\u20B9" + Number(amount).toLocaleString("en-IN");
}

export default function CollegeCard({ college }) {
  const feeDisplay = college.top_fee ? formatINR(college.top_fee) : null;
  const courseName = college.top_course || "CSE";
  const photo = getCollegeImage(college);

  return (
    <Link href={`/colleges/${college.slug}`} className="college-card">
      <div style={{ overflow: "hidden", flexShrink: 0, position: "relative", height: "192px" }}>
        <Image
          src={photo}
          alt={`${college.name} campus`}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes="(max-width: 768px) 100vw, 290px"
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
            View Profile &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
