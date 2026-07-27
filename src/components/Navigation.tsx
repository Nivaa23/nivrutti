"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";

export default function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const isExpandedRef = useRef(false);
  const navRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 284;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content");
      if (contentEl) {
        const topBar = 70;
        const padding = 24;
        const contentHeight = (contentEl as HTMLElement).scrollHeight;
        return topBar + contentHeight + padding;
      }
    }
    return 284;
  };

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpandedRef.current) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      isExpandedRef.current = true;
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      isExpandedRef.current = false;
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const closeMenu = () => {
    if (!isExpandedRef.current) return;
    setIsHamburgerOpen(false);
    isExpandedRef.current = false;
    tlRef.current?.eventCallback("onReverseComplete", () => setIsExpanded(false));
    tlRef.current?.reverse();
  };

  useEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    gsap.set(navEl, { height: isMobile ? 70 : 80, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.45,
      ease: "power3.out",
    });

    tl.to(
      cardsRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
        stagger: 0.08,
      },
      "-=0.15"
    );

    tlRef.current = tl;

    const handleResize = () => {
      if (!tlRef.current) return;
      if (isExpandedRef.current) {
        gsap.set(navEl, { height: calculateHeight() });
      } else {
        gsap.set(navEl, {
          height: window.matchMedia("(max-width: 768px)").matches ? 70 : 80,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      tl.kill();
      tlRef.current = null;
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Helper: build correct href for anchor links
  const anchorHref = (anchor: string) =>
    isHome ? anchor : `/${anchor}`;

  return (
    <header
      ref={navRef}
      className={`glossy-header ${isExpanded ? "open" : ""}`}
    >
      <div className="glossy-header-top">
        <Link
          href="/"
          aria-label="Home"
          className="logo font-podium tracking-wider uppercase"
          style={{ fontSize: "26px", letterSpacing: "0.05em" }}
        >
          ND.
        </Link>

        <div
          className={`hamburger-menu ${isHamburgerOpen ? "open" : ""}`}
          onClick={toggleMenu}
          role="button"
          aria-label={isExpanded ? "Close menu" : "Open menu"}
          aria-expanded={isExpanded}
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && toggleMenu()}
        >
          <div className="hamburger-line" />
          <div className="hamburger-line" />
        </div>
      </div>

      <div className="card-nav-content" aria-hidden={!isExpanded}>
        {/* Card 1 — Explore */}
        <div
          className="nav-card"
          ref={(el) => { if (el) cardsRef.current[0] = el; }}
          style={{ backgroundColor: "#1e1e1e", color: "#f4f1e8" }}
        >
          <div className="nav-card-label">Explore</div>
          <div className="nav-card-links">
            <a className="nav-card-link" href={anchorHref("#home")} onClick={closeMenu}>
              <ArrowUpRight size={14} /> Home
            </a>
            <a className="nav-card-link" href={anchorHref("#about")} onClick={closeMenu}>
              <ArrowUpRight size={14} /> About
            </a>
            <a className="nav-card-link" href={anchorHref("#skills")} onClick={closeMenu}>
              <ArrowUpRight size={14} /> Skills
            </a>
            <a className="nav-card-link" href={anchorHref("#contact")} onClick={closeMenu}>
              <ArrowUpRight size={14} /> Contact
            </a>
          </div>
        </div>

        {/* Card 2 — Work */}
        <div
          className="nav-card"
          ref={(el) => { if (el) cardsRef.current[1] = el; }}
          style={{ backgroundColor: "#2a2a2a", color: "#f4f1e8" }}
        >
          <div className="nav-card-label">Work</div>
          <div className="nav-card-links">
            <Link className="nav-card-link" href="/projects" onClick={closeMenu}>
              <ArrowUpRight size={14} /> All Projects
            </Link>
            <Link className="nav-card-link" href="/projects/cranial-space" onClick={closeMenu}>
              <ArrowUpRight size={14} /> Featured Case
            </Link>
          </div>
        </div>

        {/* Card 3 — Connect */}
        <div
          className="nav-card"
          ref={(el) => { if (el) cardsRef.current[2] = el; }}
          style={{ backgroundColor: "#3a3a3a", color: "#f4f1e8" }}
        >
          <div className="nav-card-label">Connect</div>
          <div className="nav-card-links">
            <a
              className="nav-card-link"
              href="https://www.linkedin.com/in/nivrutti-dandekar-71638768/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowUpRight size={14} /> LinkedIn
            </a>
            <a className="nav-card-link" href="mailto:nivrutti.dandekar@gmail.com" onClick={closeMenu}>
              <ArrowUpRight size={14} /> Email Me
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
