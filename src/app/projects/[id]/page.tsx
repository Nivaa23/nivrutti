"use client";

import React, { use, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";

export default function ProjectCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    // Custom Cursor tracking
    const cursor = cursorRef.current;
    if (cursor) {
      const onMouseMove = (e: MouseEvent) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out",
        });
      };
      document.addEventListener("mousemove", onMouseMove);

      const hoverElements = document.querySelectorAll("a, button, .project-card");
      hoverElements.forEach((el) => {
        el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
      });

      return () => {
        document.removeEventListener("mousemove", onMouseMove);
      };
    }
  }, [project]);

  useEffect(() => {
    if (!project) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero Animations
      gsap.from(".reveal-up-hero", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Section animations
      const scrollSections = document.querySelectorAll(".cs-content-section.reveal-up-sec");
      scrollSections.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none"
            },
          }
        );
      });
    }, containerRef);

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div style={{ background: "#E4E4E4", minHeight: "100vh" }}>
        <Navigation />
        <main className="container" style={{ padding: "180px 0", textAlign: "center", minHeight: "80vh" }}>
          <h1 className="h1">Project Not Found</h1>
          <p className="body-large" style={{ margin: "24px 0" }}>
            The case study you are looking for does not exist.
          </p>
          <Link href="/projects" className="btn btn-primary">
            Back to Projects
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ background: "#E4E4E4", minHeight: "100vh" }}>
      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor"></div>

      <Navigation />

      <main style={{ background: "#E4E4E4" }}>
        {/* Case Study Hero */}
        <section className="cs-hero" style={{ padding: "180px 0 100px 0" }}>
          <div className="cs-bg" style={{ background: project.gradient }}></div>
          <div className="container">
            <Link href="/projects" className="back-btn reveal-up-hero" style={{ color: "#fff", display: "inline-flex" }}>
              <ArrowLeft size={16} /> Back to Projects
            </Link>
            <h1 className="cs-title reveal-up-hero" style={{ color: "#fff" }}>
              {project.name}
            </h1>
            <p className="cs-tagline reveal-up-hero" style={{ color: "rgba(255,255,255,0.9)" }}>
              {project.tagline}
            </p>

            <div className="cs-meta reveal-up-hero">
              <div className="cs-meta-item">
                <span className="cs-meta-label">Role</span>
                <span className="cs-meta-value">{project.role}</span>
              </div>
              <div className="cs-meta-item">
                <span className="cs-meta-label">Type</span>
                <span className="cs-meta-value">{project.projectType}</span>
              </div>
              <div className="cs-meta-item">
                <span className="cs-meta-label">Duration</span>
                <span className="cs-meta-value">{project.duration}</span>
              </div>
              <div className="cs-meta-item">
                <span className="cs-meta-label">Tools</span>
                <span className="cs-meta-value">{project.tools.join(", ")}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study Sections */}
        {project.sections.map((section, secIndex) => {
          if (section.type === "bento") {
            return (
              <section key={secIndex} className="cs-content-section container reveal-up-sec">
                <div className="cs-grid" style={{ gridTemplateColumns: "1fr" }}>
                  <div>
                    <h3 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
                      {section.title}
                    </h3>
                    {section.content && <p className="body" style={{ color: "var(--text-secondary)" }}>{section.content}</p>}
                  </div>
                </div>

                {section.layoutType === "bento-5" && section.images && (
                  <div className={`final-bento-5 ${section.variantClass || ""}`}>
                    <div className="main-img" style={{ position: "relative" }}>
                      <Image
                        src={section.images[0]}
                        alt={`${project.name} Main Mockup`}
                        fill
                        sizes="100vw"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    {section.images.slice(1, 5).map((img, imgIndex) => (
                      <div key={imgIndex} className="sub-img" style={{ position: "relative" }}>
                        <Image
                          src={img}
                          alt={`${project.name} Sub Image ${imgIndex + 1}`}
                          fill
                          sizes="50vw"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {section.layoutType === "bento-3" && section.images && (
                  <div className={`final-bento-3 ${section.variantClass || ""}`}>
                    <div className="main-img" style={{ position: "relative" }}>
                      <Image
                        src={section.images[0]}
                        alt={`${project.name} Main Mockup`}
                        fill
                        sizes="100vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    {section.images.slice(1, 3).map((img, imgIndex) => (
                      <div key={imgIndex} className="sub-img" style={{ position: "relative" }}>
                        <Image
                          src={img}
                          alt={`${project.name} Sub Image ${imgIndex + 1}`}
                          fill
                          sizes="50vw"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {section.layoutType === "single" && section.images && (
                  <div className="cs-mockup glass-panel">
                    <div style={{ width: "100%", height: "550px", display: "flex", alignItems: "center", justifyContent: "center", background: project.gradient, position: "relative" }}>
                      <Image
                        src={section.images[0]}
                        alt={`${project.name} Final Mockup`}
                        fill
                        sizes="100vw"
                        style={{ objectFit: "contain", padding: "40px" }}
                      />
                    </div>
                  </div>
                )}
              </section>
            );
          }

          // Check if there is a sidebar block for dual-column format
          if (section.sidebar) {
            return (
              <section key={secIndex} className="cs-content-section container reveal-up-sec">
                <div className="cs-content-grid">
                  <div className="cs-text-col">
                    <h3 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
                      {section.title}
                    </h3>
                    {section.content && (
                      <p className="body-large" style={{ marginBottom: "24px", color: "var(--text-secondary)" }}>
                        {section.content}
                      </p>
                    )}
                    {section.items && (
                      <ul className="skill-list body">
                        {section.items.map((item, i) => (
                          <li key={i} dangerouslySetInnerHTML={{ __html: item }}></li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="cs-sidebar-col">
                    <div className="impact-card">
                      <h4>{section.sidebar.title}</h4>
                      <p className="body" style={{ color: "var(--text-secondary)" }}>{section.sidebar.text}</p>
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          // Default section layout
          return (
            <section key={secIndex} className="cs-content-section container reveal-up-sec">
              <div className="cs-grid">
                <div className="cs-sidebar">
                  <h3>{section.title}</h3>
                </div>
                <div className="cs-bodytext">
                  {section.content && <p style={{ marginBottom: section.items ? "24px" : "0" }}>{section.content}</p>}
                  {section.items && (
                    <ul className="cs-list">
                      {section.items.map((item, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: item }}></li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </section>
          );
        })}

        {/* Next Project Nav Banner */}
        <Link href={`/projects/${project.nextProjectId}`} className="next-project reveal-up-sec">
          <div className="container">
            <h4>Next Project</h4>
            <h2>{project.nextProjectName}</h2>
          </div>
        </Link>

        {/* Footer CTA Section */}
        <section id="contact" style={{
          background: "#E4E4E4",
          padding: "120px 0",
          borderTop: "1px solid rgba(0,0,0,0.07)",
          textAlign: "center",
        }}>
          <div className="container">
            <div className="reveal-up-sec" style={{
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
              <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, color: "#191919", letterSpacing: "-0.02em", marginBottom: "20px" }}>
                Let&apos;s create something amazing together
              </h2>
              <p className="body-large" style={{ color: "#64748b", maxWidth: "480px", margin: "0 auto 40px" }}>
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
      </main>

      <Footer />
    </div>
  );
}
