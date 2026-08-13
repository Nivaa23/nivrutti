"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MessageCircle, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";

// Filter categories
const categories = [
  { id: "all", label: "All" },
  { id: "concept", label: "Concept / Experimental" },
  { id: "dashboard", label: "Dashboard & Enterprise Tools" },
  { id: "product", label: "Product Design" },
  { id: "ux", label: "UX Case Studies - Redesign" },
  { id: "web", label: "Web Platforms & Websites" }
];

// Mapping of project ID to its HTML data-categories
const projectCategoryMap: Record<string, string[]> = {
  "bombay-spices": ["dashboard", "product"],
  "cranial-space": ["concept", "product"],
  "fama-agriculture": ["web"],
  "happihosts": ["web"],
  "hotspot-mobile": ["concept", "product"],
  "kotak-redesign": ["ux"],
  "novance-ai": ["product"],
  "parul-university": ["dashboard", "ux"],
  "punccrt": ["web"],
  "snackstop-erp": ["dashboard", "product"],
  "utility-pay": ["concept", "product"]
};

// Project short description / captions for the card listing page
const projectCaptions: Record<string, string> = {
  "bombay-spices": "A multi-store grocery brand focused on enhancing customer loyalty and increasing sales through data-driven promotions.",
  "cranial-space": "A collaborative platform designed to help UI/UX Designers grow through community critique.",
  "fama-agriculture": "Modern web platform built to promote sustainable agriculture.",
  "happihosts": "A seamless platform for creating beautiful digital invitations.",
  "hotspot-mobile": "A nightlife discovery app that helps users find nearby bars with real-time tracking.",
  "kotak-redesign": "A secure and user-friendly mobile banking login experience.",
  "novance-ai": "An AI-powered platform focused on simplifying complex workflows.",
  "parul-university": "Redesigned university portal aimed at improving usability.",
  "punccrt": "Informative conference website designed for seamless registration.",
  "snackstop-erp": "Comprehensive analytics dashboard providing real-time insights.",
  "utility-pay": "Mobile-first fintech app for billing management in one simple dashboard."
};

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const gridRef = useRef<HTMLDivElement>(null);

  // Filter projects based on active state
  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;
    const projectCats = projectCategoryMap[project.id] || [];
    return projectCats.includes(activeFilter);
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial load animations
    gsap.from(".reveal-up", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    });

    ScrollTrigger.refresh();
  }, []);

  // Animate filtering transitions
  const handleFilterClick = (filterId: string) => {
    if (filterId === activeFilter) return;

    const cards = gridRef.current?.querySelectorAll(".project-card");
    if (!cards || cards.length === 0) {
      setActiveFilter(filterId);
      return;
    }

    // Fade out
    gsap.to(cards, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => {
        // Change state
        setActiveFilter(filterId);

        // NextJS renders new list. Wait a tick to animate fade-in
        setTimeout(() => {
          const newCards = gridRef.current?.querySelectorAll(".project-card");
          if (newCards) {
            gsap.fromTo(
              newCards,
              { opacity: 0, y: 30, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.08,
                ease: "back.out(1.5)",
                clearProps: "opacity, y, scale",
              }
            );
          }
          ScrollTrigger.refresh();
        }, 50);
      },
    });
  };

  // Determine Bento Span Class dynamically to ensure layout integrity
  const getBentoClass = (index: number, count: number) => {
    if (count === 1) return "p-bento-span-12";
    if (count === 2) return index === 0 ? "p-bento-span-8" : "p-bento-span-4";
    if (count === 3) return index === 0 ? "bento-3-featured" : "bento-3-small";
    if (count === 4) {
      const spans = ["p-bento-span-8", "p-bento-span-4", "p-bento-span-4", "p-bento-span-8"];
      return spans[index];
    }
    if (count === 5) {
      const spans = ["p-bento-span-8", "p-bento-span-4", "p-bento-span-4", "p-bento-span-4", "p-bento-span-4"];
      return spans[index];
    }
    if (count === 6) {
      const spans = ["p-bento-span-8", "p-bento-span-4", "p-bento-span-4", "p-bento-span-8", "p-bento-span-6", "p-bento-span-6"];
      return spans[index];
    }
    if (count === 7) {
      const spans = [
        "p-bento-span-8", "p-bento-span-4",
        "p-bento-span-4", "p-bento-span-8",
        "p-bento-span-4", "p-bento-span-4", "p-bento-span-4"
      ];
      return spans[index];
    }
    if (count === 8) {
      const spans = [
        "p-bento-span-8", "p-bento-span-4",
        "p-bento-span-4", "p-bento-span-8",
        "p-bento-span-6", "p-bento-span-6",
        "p-bento-span-8", "p-bento-span-4"
      ];
      return spans[index];
    }
    if (count === 9) {
      const spans = [
        "p-bento-span-8", "p-bento-span-4",
        "p-bento-span-4", "p-bento-span-8",
        "p-bento-span-6", "p-bento-span-6",
        "p-bento-span-4", "p-bento-span-4", "p-bento-span-4"
      ];
      return spans[index];
    }
    if (count === 10) {
      const spans = [
        "p-bento-span-8", "p-bento-span-4",
        "p-bento-span-4", "p-bento-span-8",
        "p-bento-span-6", "p-bento-span-6",
        "p-bento-span-4", "p-bento-span-4", "p-bento-span-4",
        "p-bento-span-12"
      ];
      return spans[index];
    }

    const defaultSpans = [
      "p-bento-span-8",  // Bombay Spices (default index 0)
      "p-bento-span-4",  // Cranial Space (default index 1)
      "p-bento-span-4",  // FAMA (default index 2)
      "p-bento-span-8",  // Happihosts (default index 3)
      "p-bento-span-6",  // HotSpot Mobile (default index 4)
      "p-bento-span-6",  // Kotak Redesign (default index 5)
      "p-bento-span-4",  // Novance AI (default index 6)
      "p-bento-span-4",  // Parul University (default index 7)
      "p-bento-span-4",  // PUNCCRT (default index 8)
      "p-bento-span-8",  // Snack Stop (default index 9)
      "p-bento-span-4"   // Utility Pay (default index 10)
    ];

    return defaultSpans[index % defaultSpans.length];
  };

  return (
    <div style={{ background: "#E4E4E4", minHeight: "100vh" }}>
      <Navigation />

      {/* Page Hero Header */}
      <section style={{
        background: "#E4E4E4",
        paddingTop: "160px",
        paddingBottom: "80px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Subtle grid texture */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.025,
          backgroundImage: "linear-gradient(#191919 1px, transparent 1px), linear-gradient(90deg, #191919 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }} />

        <div className="container reveal-up" style={{ position: "relative", zIndex: 2 }}>
          <Link href="/" className="back-btn" style={{ justifyContent: "center", marginBottom: "32px" }}>
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>

          {/* Label */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 16px", borderRadius: "9999px",
            background: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.08)",
            color: "#475569", fontSize: "13px", fontWeight: 500,
            marginBottom: "24px", backdropFilter: "blur(8px)",
          }}>
            ✦ Innovation Archive
          </div>

          <h1 style={{
            fontSize: "clamp(48px, 7vw, 80px)", fontWeight: 800,
            color: "#191919", letterSpacing: "-0.03em", lineHeight: 1.08,
            marginBottom: "24px",
          }}>
            All Projects
          </h1>

          <p style={{
            fontSize: "18px", color: "#64748b", maxWidth: "560px",
            margin: "0 auto 48px", lineHeight: 1.7,
          }}>
            A curated archive spanning product design, user research and experimental interfaces.
          </p>

          {/* Filter Pills */}
          <div className="filter-container">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleFilterClick(cat.id)}
                className={`filter-pill ${activeFilter === cat.id ? "active" : ""}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Bento Grid */}
      <section style={{ background: "#E4E4E4", paddingBottom: "120px" }}>
        <div className="container">
          <div ref={gridRef} className="all-projects-grid reveal-up">
            {filteredProjects.map((project, index) => {
              const spanClass = getBentoClass(index, filteredProjects.length);
              const caption = projectCaptions[project.id] || project.tagline;

              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className={`project-card ${spanClass}`}
                >
                  <Image
                    src={project.thumbnail}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="project-card-image"
                  />
                  <div className="project-card-info">
                    <h3>{project.name}</h3>
                    <p className="caption">
                      {caption}
                    </p>
                    <div className="project-type-pills">
                      {project.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span key={tagIndex} className="type-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="card-arrow">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" style={{
        background: "#E4E4E4",
        padding: "120px 0",
        borderTop: "1px solid rgba(0,0,0,0.07)",
        textAlign: "center",
      }}>
        <div className="container">
          <div className="reveal-up" style={{
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.8)",
            borderRadius: "40px",
            padding: "80px 60px",
            boxShadow: "0 30px 80px -20px rgba(0,0,0,0.08)",
            maxWidth: "800px",
            margin: "0 auto",
          }}>
            {/* Label */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "6px 16px", borderRadius: "9999px",
              background: "rgba(71,70,229,0.08)", border: "1px solid rgba(71,70,229,0.18)",
              color: "#4746E5", fontSize: "13px", fontWeight: 600,
              marginBottom: "28px", letterSpacing: "0.08em", textTransform: "uppercase",
            }}>
              ✦ Let&apos;s Collaborate
            </div>

            <h2 style={{
              fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800,
              color: "#191919", letterSpacing: "-0.02em", lineHeight: 1.15,
              marginBottom: "20px",
            }}>
              Let&apos;s create something amazing together
            </h2>

            <p style={{
              fontSize: "18px", color: "#64748b", lineHeight: 1.7,
              marginBottom: "40px", maxWidth: "500px", margin: "0 auto 40px",
            }}>
              I&apos;m currently available for freelance projects and open to discussing new opportunities.
            </p>

            <a
              href="https://www.linkedin.com/in/nivrutti-dandekar-71638768/"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}
            >
              Say Hello <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
