import Link from "next/link";
import { useState } from "react";
import { waLink } from "../lib/constants";
import { WaIcon } from "./WaButton";

const WA_LINK = waLink("Hi, I want to know about direct admission in Bangalore engineering colleges.");

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="logo">
          College<span className="text-gold">And</span>Fees
        </Link>

        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/engineering-colleges/bangalore">Colleges</Link>
          <Link href="/management-quota/bangalore">Fees</Link>
          <Link href="/direct-admission/bangalore">Direct Admission</Link>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="nav-cta">
            <WaIcon />
            WhatsApp Counsellor
          </a>
        </nav>

        <button
          className="md:hidden"
          style={{ background: "none", border: "1px solid var(--border)", borderRadius: "8px", cursor: "pointer", color: "var(--muted-foreground)", padding: "6px 10px", fontSize: "18px" }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/engineering-colleges/bangalore" onClick={() => setMenuOpen(false)}>Colleges</Link>
          <Link href="/management-quota/bangalore" onClick={() => setMenuOpen(false)}>Fees</Link>
          <Link href="/direct-admission/bangalore" onClick={() => setMenuOpen(false)}>Direct Admission</Link>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="btn-whatsapp-sm"
            style={{ marginTop: "8px", display: "inline-flex" }}
          >
            <WaIcon />
            WhatsApp Counsellor
          </a>
        </div>
      )}
    </header>
  );
}
