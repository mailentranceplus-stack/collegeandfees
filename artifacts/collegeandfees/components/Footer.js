import Link from "next/link";
import { waLink } from "../lib/constants";
import { WaIcon } from "./WaButton";

const WA_LINK = waLink("Hi, I want free guidance on direct admission in Bangalore engineering colleges.");

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="logo" style={{ display: "inline-block", marginBottom: "12px" }}>
              College<span className="text-gold">And</span>Fees
            </Link>
            <p style={{ fontSize: "14px", color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "20px" }}>
              Your trusted resource for engineering college admissions, direct admission guidance, and fee information in Bangalore, Karnataka.
            </p>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp-sm">
              <WaIcon size={16} />
              Free WhatsApp Guidance
            </a>
          </div>

          <div>
            <p className="footer-heading">Quick Links</p>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/direct-admission/bangalore">Direct Admission Bangalore</Link></li>
              <li><Link href="/direct-admission/rvce-bangalore">RVCE Direct Admission</Link></li>
              <li><Link href="/management-quota/bangalore">Management Quota Colleges</Link></li>
              <li><Link href="/colleges/rvce-bangalore/fees">RVCE Fees 2026</Link></li>
            </ul>
          </div>

          <div>
            <p className="footer-heading">Entrance Exams</p>
            <ul className="footer-links">
              <li><span>KCET (Karnataka CET)</span></li>
              <li><span>JEE Main</span></li>
              <li><span>COMEDK UGET</span></li>
              <li><span>PESSAT</span></li>
              <li><span>Management Quota (Direct)</span></li>
            </ul>
          </div>

          <div>
            <p className="footer-heading">Get in Touch</p>
            <ul className="footer-links">
              <li>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                  WhatsApp: +91 79751 93033
                </a>
              </li>
              <li><span style={{ color: "var(--muted-foreground)", fontSize: "14px" }}>Free counsellor guidance</span></li>
              <li><span style={{ color: "var(--muted-foreground)", fontSize: "14px" }}>No fees · No obligation</span></li>
              <li><span style={{ color: "var(--muted-foreground)", fontSize: "14px" }}>Response within 24 hours</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} CollegeAndFees.com — Engineering college admissions in Bangalore. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
