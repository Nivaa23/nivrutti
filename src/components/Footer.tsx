"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-redesign">
      <div className="container">
        <div className="footer-inner-flex">
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/" className="logo font-podium uppercase text-2xl" style={{ color: "#191919" }}>
              ND.
            </Link>
            <div className="footer-status-indicator">
              <span className="status-pulse-dot" />
              <span>Available for Q3/Q4 Projects</span>
            </div>
          </div>

          <p className="caption" style={{ color: "#64748b" }}>
            &copy; {new Date().getFullYear()} Nivrutti Dandekar. Crafted with precision &amp; purposeful intent.
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            style={{
              background: "rgba(255, 255, 255, 0.6)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#191919",
              cursor: "pointer",
              transition: "all 0.3s ease",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.95)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.6)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
