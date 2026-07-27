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
            <Link href="/" className="logo font-podium uppercase text-2xl" style={{ color: "#ffffff" }}>
              ND.
            </Link>
            <div className="footer-status-indicator">
              <span className="status-pulse-dot" />
              <span>Available for Q3/Q4 Projects</span>
            </div>
          </div>

          <p className="caption" style={{ color: "#94a3b8" }}>
            &copy; {new Date().getFullYear()} Nivrutti Dandekar. Crafted with precision & purposeful intent.
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}

