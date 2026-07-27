"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  Crown, 
  X, 
  Award, 
  ArrowUpRight, 
  ChevronRight, 
  Mail, 
  FileText, 
  MessageCircle,
  Layers,
  Search,
  GitCommit,
  Network,
  Palette,
  Smartphone,
  PenTool,
  Image as ImageIcon,
  BookOpen,
  Zap,
  Bot,
  Heart,
  Compass,
  Eye,
  Activity,
  FastForward,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Globe,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/Footer";

// Marquee items config matching the user's specific skills list
const marqueeItems = [
  { name: "UI/UX Design", icon: "Layers", gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)" },
  { name: "User Research & Usability Testing", icon: "Search", gradient: "linear-gradient(135deg, #facc15 0%, #ca8a04 100%)" },
  { name: "Wireframing & Prototyping", icon: "GitCommit", gradient: "linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)" },
  { name: "Interaction & Information Architecture", icon: "Network", gradient: "linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)" },
  { name: "Design Systems & Visual Design", icon: "Palette", gradient: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)" },
  { name: "Responsive & Mobile-first Design", icon: "Smartphone", gradient: "linear-gradient(135deg, #84cc16 0%, #4d7c0f 100%)" },
  { name: "Figma", icon: "Layers", gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)" },
  { name: "Adobe Illustrator", icon: "PenTool", gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)" },
  { name: "Adobe Photoshop", icon: "Image", gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)" },
  { name: "Notion", icon: "BookOpen", gradient: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)" },
  { name: "Antigravity", icon: "Zap", gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)" },
  { name: "ChatGPT / Gemini", icon: "Bot", gradient: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)" },
  { name: "Lovable", icon: "Heart", gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)" },
  { name: "Human-Centered Design Thinking", icon: "Compass", gradient: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)" },
  { name: "Accessibility (WCAG AA)", icon: "Eye", gradient: "linear-gradient(135deg, #06b6d4 0%, #0f766e 100%)" },
  { name: "Motion & Micro-Interactions", icon: "Activity", gradient: "linear-gradient(135deg, #a855f7 0%, #6b21a8 100%)" },
  { name: "Rapid Prototyping", icon: "FastForward", gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)" }
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "Layers": return <Layers className="marquee-card-icon" size={20} />;
    case "Search": return <Search className="marquee-card-icon" size={20} />;
    case "GitCommit": return <GitCommit className="marquee-card-icon" size={20} />;
    case "Network": return <Network className="marquee-card-icon" size={20} />;
    case "Palette": return <Palette className="marquee-card-icon" size={20} />;
    case "Smartphone": return <Smartphone className="marquee-card-icon" size={20} />;
    case "PenTool": return <PenTool className="marquee-card-icon" size={20} />;
    case "Image": return <ImageIcon className="marquee-card-icon" size={20} />;
    case "BookOpen": return <BookOpen className="marquee-card-icon" size={20} />;
    case "Zap": return <Zap className="marquee-card-icon" size={20} />;
    case "Bot": return <Bot className="marquee-card-icon" size={20} />;
    case "Heart": return <Heart className="marquee-card-icon" size={20} />;
    case "Compass": return <Compass className="marquee-card-icon" size={20} />;
    case "Eye": return <Eye className="marquee-card-icon" size={20} />;
    case "Activity": return <Activity className="marquee-card-icon" size={20} />;
    case "FastForward": return <FastForward className="marquee-card-icon" size={20} />;
    default: return <Zap className="marquee-card-icon" size={20} />;
  }
};

export default function HomePage() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const containerRef = useRef<HTMLDivElement>(null);
  const revealImgRef = useRef<HTMLDivElement>(null);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const isExpandedRef = useRef(false);
  const navRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 284;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content');
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
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  // CardNav animation layout setup
  useEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    gsap.set(navEl, { height: isMobile ? 70 : 80, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.45,
      ease: "power3.out"
    });

    tl.to(cardsRef.current, { 
      y: 0, 
      opacity: 1, 
      duration: 0.4, 
      ease: "power3.out", 
      stagger: 0.08 
    }, '-=0.15');

    tlRef.current = tl;

    const handleResize = () => {
      if (!tlRef.current) return;
      if (isExpandedRef.current) {
        gsap.set(navEl, { height: calculateHeight() });
      } else {
        gsap.set(navEl, { height: window.matchMedia('(max-width: 768px)').matches ? 70 : 80 });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      tl.kill();
      tlRef.current = null;
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Setup scroll trigger reveal animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial state for all revealable elements outside the hero
    gsap.set(".reveal-up-sec", { y: 60, opacity: 0 });

    const ctx = gsap.context(() => {
      const revealElements = document.querySelectorAll(".reveal-up-sec");
      revealElements.forEach((el) => {
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });
      });
    }, containerRef);

    // Refresh ScrollTrigger to catch bounding heights
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => ctx.revert();
  }, []);

  // Spotlight mouse track reveal loop
  useEffect(() => {
    const imgLayer = revealImgRef.current;
    if (!imgLayer) return;

    const SPOTLIGHT_R = 260;
    const mouse = { x: -999, y: -999 };
    const smooth = { x: -999, y: -999 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let frameId: number;

    const loop = () => {
      if (smooth.x === -999) {
        smooth.x = mouse.x;
        smooth.y = mouse.y;
      } else {
        smooth.x += (mouse.x - smooth.x) * 0.12;
        smooth.y += (mouse.y - smooth.y) * 0.12;
      }

      if (smooth.x !== -999) {
        const mask = `radial-gradient(circle ${SPOTLIGHT_R}px at ${smooth.x}px ${smooth.y}px, black 0%, black 40%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.12) 88%, transparent 100%)`;
        imgLayer.style.maskImage = mask;
        imgLayer.style.webkitMaskImage = mask;
        imgLayer.style.maskSize = "100% 100%";
        imgLayer.style.webkitMaskSize = "100% 100%";
      }

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  // Split words for text reveal staggered delays
  const headlineText = "I craft meaningful, intuitive and beautiful digital experiences.";
  const words = headlineText.split(" ");

  return (
    <div ref={containerRef} style={{ backgroundColor: "#f9fafb" }}>
      {/* SPLASH OVERLAY */}
      <div className="splash" id="splash">
        <div className="splash-row splash-row-top">
          <div className="splash-box"></div>
          <div className="splash-box"></div>
          <div className="splash-box"></div>
          <div className="splash-box"></div>
          <div className="splash-box"></div>
        </div>
        <div className="splash-row splash-row-bottom">
          <div className="splash-box"></div>
          <div className="splash-box"></div>
          <div className="splash-box"></div>
          <div className="splash-box"></div>
          <div className="splash-box"></div>
        </div>
      </div>

      {/* GLOSSY TRANSPARENT HEADER BAR */}
      <header ref={navRef} className={`glossy-header ${isExpanded ? 'open' : ''}`}>
        <div className="glossy-header-top">
          <Link href="/" aria-label="Home" className="logo font-podium tracking-wider uppercase text-2xl sm:text-3xl">
            ND.
          </Link>
          
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            aria-expanded={isExpanded}
            tabIndex={0}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {/* Card 1 */}
          <div className="nav-card" ref={el => { if (el) cardsRef.current[0] = el }} style={{ backgroundColor: "#1e1e1e", color: "#f4f1e8" }}>
            <div className="nav-card-label">Explore</div>
            <div className="nav-card-links">
              <a className="nav-card-link" href="#home" onClick={toggleMenu}><ArrowUpRight size={14} /> Home</a>
              <a className="nav-card-link" href="#about" onClick={toggleMenu}><ArrowUpRight size={14} /> About</a>
              <a className="nav-card-link" href="#skills" onClick={toggleMenu}><ArrowUpRight size={14} /> Skills</a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="nav-card" ref={el => { if (el) cardsRef.current[1] = el }} style={{ backgroundColor: "#2a2a2a", color: "#f4f1e8" }}>
            <div className="nav-card-label">Work</div>
            <div className="nav-card-links">
              <Link className="nav-card-link" href="/projects" onClick={toggleMenu}><ArrowUpRight size={14} /> All Projects</Link>
              <Link className="nav-card-link" href="/projects/cranial-space" onClick={toggleMenu}><ArrowUpRight size={14} /> Featured Case</Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="nav-card" ref={el => { if (el) cardsRef.current[2] = el }} style={{ backgroundColor: "#3a3a3a", color: "#f4f1e8" }}>
            <div className="nav-card-label">Connect</div>
            <div className="nav-card-links">
              <a className="nav-card-link" href="https://www.linkedin.com/in/nivrutti-dandekar-71638768/" target="_blank" rel="noopener noreferrer"><ArrowUpRight size={14} /> LinkedIn</a>
              <a className="nav-card-link" href="mailto:nivrutti.dandekar@gmail.com" onClick={toggleMenu}><ArrowUpRight size={14} /> Email Me</a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Fullscreen Spotlight Reveal Hero Section */}
        <section id="home" className="hero-spotlight">
          {/* Big background text behind image */}
          <div className="hero-big-text creator-text-animate">
            <h2>Nivrutti</h2>
          </div>

          {/* Base image */}
          <div 
            className="hero-base-img hero-image-animate"
            style={{ backgroundImage: "url('https://soft-zoom-63098134.figma.site/_assets/v11/5c9f982199fde1d9b85a20e5396f0fa7bacaf9a3.png?w=2560')" }}
          ></div>

          {/* Reveal layer */}
          <div 
            ref={revealImgRef}
            className="hero-reveal-img" 
            style={{ backgroundImage: "url('https://soft-zoom-63098134.figma.site/_assets/v11/6be2165e31648955b4e071f4cf2a50bc572b9bfd.png?w=1536')" }}
          ></div>

          {/* Overlaid Content */}
          <div className="hero-content-spotlight">
            <div className="hero-content-inner">
              <h1 className="hero-headline" id="headline">
                {words.map((word, i) => (
                  <span 
                    key={i} 
                    className="word-reveal" 
                    style={{ animationDelay: `${1 + i * 0.06}s` }}
                  >
                    {word}
                  </span>
                ))}
              </h1>
              
              <button 
                className="cta-btn-wrapper cta-animate"
                onClick={() => {
                  const el = document.getElementById("projects");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="cta-btn-bg"></span>
                <span className="cta-btn-text">Start a project now</span>
                <span className="cta-btn-circle">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13L13 5M13 5H6M13 5V12" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Redesigned About Section */}
        <section id="about" className="about-redesign-wrapper">
          <div className="container">
            <div className="about-redesign-card reveal-up-sec">
              <div className="about-grid-container">
                {/* Left Text & Story Cards Column */}
                <div>
                  <div className="about-header-pill">
                    <Sparkles size={14} /> About Me
                  </div>
                  <h2 className="about-headline">
                    Designing with Purpose <span className="about-gradient-text">&amp; Empathy</span>
                  </h2>

                  <div className="about-story-grid">
                    <div className="about-story-item">
                      <div className="about-story-num">01 / The Journey</div>
                      <h3 className="about-story-title">Curiosity &amp; Digital Interaction</h3>
                      <p className="about-story-desc">
                        My journey into UI/UX Design began with a deep curiosity about how people interact with
                        digital products. I’m passionate about designing experiences that feel intuitive, meaningful and effortless
                        for users.
                      </p>
                    </div>

                    <div className="about-story-item">
                      <div className="about-story-num">02 / The Craft</div>
                      <h3 className="about-story-title">Thoughtful &amp; User-Centered Design</h3>
                      <p className="about-story-desc">
                        Currently pursuing my Bachelors degree, I complement my academic learning with hands-on
                        project experience, focusing on solving real problems through thoughtful and user-centered design. I enjoy
                        balancing aesthetics with functionality to create interfaces that are both visually engaging and highly usable.
                      </p>
                    </div>

                    <div className="about-story-item">
                      <div className="about-story-num">03 / The Inspiration</div>
                      <h3 className="about-story-title">Precision, Structure &amp; Experience</h3>
                      <p className="about-story-desc">
                        Outside of design, I draw inspiration from modern architecture, travel and Formula One;
                        interests that shape the way I think about structure, precision and experience design.
                      </p>
                    </div>
                  </div>

                  <div className="about-pills-bar">
                    <span className="about-tag-badge">🎯 User-Centered</span>
                    <span className="about-tag-badge">🏎️ F1 Precision</span>
                    <span className="about-tag-badge">🏛️ Architecture Mindset</span>
                    <span className="about-tag-badge">⚡ WCAG AA Accessible</span>
                    <span className="about-tag-badge">✨ Motion &amp; Micro-Interactions</span>
                  </div>
                </div>

                {/* Right Portrait & Floating Status Card Column */}
                <div>
                  <div className="about-portrait-card" style={{ position: "relative" }}>
                    <Image 
                      src="/assets/images/profile.jpg" 
                      alt="Nivrutti Dandekar" 
                      fill 
                      sizes="(max-width: 1024px) 100vw, 400px"
                      className="about-portrait-img"
                      priority
                    />
                    <div className="about-portrait-overlay">
                      <div className="status-badge-live">
                        <span className="status-pulse-dot" />
                        <span>Open to Opportunities</span>
                      </div>
                      <div className="portrait-info-box">
                        <h3 className="portrait-name">Nivrutti Dandekar</h3>
                        <p className="portrait-role">UI/UX Specialist &amp; Product Designer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand New Mid Section (Vanguard Container + Marquee Scroller) */}
        <section className="container" style={{ padding: "80px 0" }}>
          {/* Card Container with Video Background */}
          <div className="mid-container">
            <div className="mid-video-layer">
              <video
                className="mid-video"
                autoPlay
                muted
                loop
                playsInline
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260505_101331_74f9b798-3f00-4e86-8a01-377aa16ffeaa.mp4"
              />
            </div>

            <div className="mid-content-wrapper">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ position: "relative", zIndex: 10 }}
              >
                <h2 className="mid-headline">
                  Foundation of the
                  <br />
                  new digital epoch
                </h2>
                <p className="mid-subheadline">
                  Designing products, powering ecosystems and laying the foundation of a decentralized web for enterprises, builders and communities alike.
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-contact-dark"
                  onClick={() => {
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Contact Us
                </motion.button>
              </motion.div>
            </div>

            {/* Floating Bottom Navbar */}
            <motion.nav 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="floating-bottom-nav"
            >
              <div className="circular-nav-logo">✦</div>
              <button 
                className="nav-text-btn"
                onClick={() => {
                  const el = document.getElementById("projects");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Products
              </button>
              <button 
                className="nav-text-btn"
                onClick={() => {
                  const el = document.getElementById("skills");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Docs
              </button>
              <button 
                className="btn-nav-touch"
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Get in touch <ChevronRight size={14} />
              </button>
            </motion.nav>
          </div>

          {/* Seamless Infinite Marquee Scroller */}
          <div className="marquee-wrapper">
            <div className="marquee-track">
              {/* Double render to loop seamlessly */}
              {[...marqueeItems, ...marqueeItems].map((item, index) => (
                <div key={index} className="marquee-card group">
                  {/* Absolute gradient overlay on hover */}
                  <div 
                    className="marquee-card-gradient" 
                    style={{ background: item.gradient }}
                  ></div>
                  
                  {/* Render the icon and text */}
                  {getIcon(item.icon)}
                  <span className="marquee-card-text">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Redesigned Skills Section */}
        <section id="skills" className="skills-redesign-section">
          <div className="skills-bg-glow" />
          <div className="container" style={{ position: "relative", zIndex: 5 }}>
            <div className="skills-header-block reveal-up-sec">
              <span className="about-header-pill">
                <Zap size={14} /> EXPERTISE &amp; TOOLKIT
              </span>
              <h2 className="skills-title">
                Creative Toolkit &amp; Mastery
              </h2>
              <p className="skills-subtitle-text">
                A look at my design and technical toolkit, workflow drivers, and core methodologies.
              </p>
            </div>

            <div className="skills-bento-grid">
              {/* Card 1 */}
              <div className="skill-bento-card reveal-up-sec">
                <div>
                  <div className="skill-card-icon-badge">
                    <Palette size={24} />
                  </div>
                  <h3 className="skill-card-title">Core Skills</h3>
                  <span className="skill-card-subtitle">Design &amp; Strategy</span>
                  <div className="skill-chip-container">
                    <span className="skill-interactive-chip"><Layers size={14} /> UI/UX Design</span>
                    <span className="skill-interactive-chip"><Search size={14} /> User Research &amp; Usability</span>
                    <span className="skill-interactive-chip"><GitCommit size={14} /> Wireframing &amp; Prototyping</span>
                    <span className="skill-interactive-chip"><Network size={14} /> Interaction Architecture</span>
                    <span className="skill-interactive-chip"><Palette size={14} /> Design Systems &amp; Visuals</span>
                    <span className="skill-interactive-chip"><Smartphone size={14} /> Responsive &amp; Mobile-First</span>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="skill-bento-card reveal-up-sec">
                <div>
                  <div className="skill-card-icon-badge" style={{ color: "#a855f7", background: "rgba(168, 85, 247, 0.12)", borderColor: "rgba(168, 85, 247, 0.3)" }}>
                    <PenTool size={24} />
                  </div>
                  <h3 className="skill-card-title">Tools &amp; Software</h3>
                  <span className="skill-card-subtitle" style={{ color: "#c084fc" }}>My Daily Drivers</span>
                  <div className="tools-grid-icons">
                    <div className="tool-brand-item">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" className="tool-brand-icon" />
                      <span className="tool-brand-name">Figma</span>
                    </div>
                    <div className="tool-brand-item">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" alt="Illustrator" className="tool-brand-icon" />
                      <span className="tool-brand-name">Illustrator</span>
                    </div>
                    <div className="tool-brand-item">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" alt="Photoshop" className="tool-brand-icon" />
                      <span className="tool-brand-name">Photoshop</span>
                    </div>
                    <div className="tool-brand-item">
                      <BookOpen size={18} style={{ color: "#818cf8" }} />
                      <span className="tool-brand-name">Notion</span>
                    </div>
                    <div className="tool-brand-item">
                      <Zap size={18} style={{ color: "#34d399" }} />
                      <span className="tool-brand-name">Antigravity</span>
                    </div>
                    <div className="tool-brand-item">
                      <Bot size={18} style={{ color: "#fb7185" }} />
                      <span className="tool-brand-name">Gemini / GPT</span>
                    </div>
                    <div className="tool-brand-item" style={{ gridColumn: "span 2" }}>
                      <Heart size={18} style={{ color: "#c084fc" }} />
                      <span className="tool-brand-name">Lovable Prototyping</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="skill-bento-card reveal-up-sec">
                <div>
                  <div className="skill-card-icon-badge" style={{ color: "#34d399", background: "rgba(52, 211, 153, 0.12)", borderColor: "rgba(52, 211, 153, 0.3)" }}>
                    <Sparkles size={24} />
                  </div>
                  <h3 className="skill-card-title">Additional Strengths</h3>
                  <span className="skill-card-subtitle" style={{ color: "#34d399" }}>Beyond the Pixels</span>
                  <div className="strength-list-wrapper">
                    <div className="strength-item-row">
                      <Compass size={18} style={{ color: "#34d399" }} />
                      <span>Human-Centered Design Thinking</span>
                    </div>
                    <div className="strength-item-row">
                      <Eye size={18} style={{ color: "#38bdf8" }} />
                      <span>Accessibility (WCAG AA)</span>
                    </div>
                    <div className="strength-item-row">
                      <Activity size={18} style={{ color: "#c084fc" }} />
                      <span>Motion &amp; Micro-Interactions</span>
                    </div>
                    <div className="strength-item-row">
                      <FastForward size={18} style={{ color: "#60a5fa" }} />
                      <span>Rapid Prototyping &amp; Iteration</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Redesigned Work Highlights Section */}
        <section id="projects" className="work-redesign-section">
          <div className="container">
            <div className="work-header-flex reveal-up-sec">
              <div>
                <span className="about-header-pill">
                  <Award size={14} /> FEATURED WORK
                </span>
                <h2 className="work-header-title">
                  Work Highlights
                </h2>
                <p className="work-header-sub">
                  A curated selection of my best design projects &amp; case studies
                </p>
              </div>
              <Link href="/projects" className="btn btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                View All Projects <ArrowUpRight size={18} />
              </Link>
            </div>

            <div className="work-bento-layout reveal-up-sec">
              {/* Bento 1: Cranial Space */}
              <Link href="/projects/cranial-space" className="work-bento-card w-bento-8 group">
                <div className="work-card-img-wrapper" style={{ position: "relative" }}>
                  <Image 
                    src="/assets/images/projects/cranial-center.png" 
                    alt="Cranial Space" 
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="work-card-img"
                  />
                  <div className="work-arrow-circle">
                    <ArrowUpRight size={20} />
                  </div>
                  <div className="work-card-overlay-gradient">
                    <h3 className="work-card-title">Cranial Space</h3>
                    <div className="work-pills-row">
                      <span className="work-tag-pill">Platform</span>
                      <span className="work-tag-pill">Web App</span>
                      <span className="work-tag-pill">Featured Case</span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Bento 2: HotSpot Mobile */}
              <Link href="/projects/hotspot-mobile" className="work-bento-card w-bento-4 group">
                <div className="work-card-img-wrapper" style={{ position: "relative" }}>
                  <Image 
                    src="/assets/images/projects/hotspot-mobile.png" 
                    alt="HotSpot Mobile" 
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="work-card-img"
                  />
                  <div className="work-arrow-circle">
                    <ArrowUpRight size={20} />
                  </div>
                  <div className="work-card-overlay-gradient">
                    <h3 className="work-card-title">HotSpot Mobile</h3>
                    <div className="work-pills-row">
                      <span className="work-tag-pill">Social</span>
                      <span className="work-tag-pill">Mobile App</span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Bento 3: FAMA Agriculture */}
              <Link href="/projects/fama-agriculture" className="work-bento-card w-bento-4 group">
                <div className="work-card-img-wrapper" style={{ position: "relative" }}>
                  <Image 
                    src="/assets/images/projects/fama-center.png" 
                    alt="FAMA Agriculture" 
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="work-card-img"
                  />
                  <div className="work-arrow-circle">
                    <ArrowUpRight size={20} />
                  </div>
                  <div className="work-card-overlay-gradient">
                    <h3 className="work-card-title">FAMA Agriculture</h3>
                    <div className="work-pills-row">
                      <span className="work-tag-pill">Agrotech</span>
                      <span className="work-tag-pill">Web App</span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Bento 4: Bombay Spices */}
              <Link href="/projects/bombay-spices" className="work-bento-card w-bento-4 group">
                <div className="work-card-img-wrapper" style={{ position: "relative" }}>
                  <Image 
                    src="/assets/images/projects/bombay-spices.png" 
                    alt="Bombay Spices" 
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="work-card-img"
                  />
                  <div className="work-arrow-circle">
                    <ArrowUpRight size={20} />
                  </div>
                  <div className="work-card-overlay-gradient">
                    <h3 className="work-card-title">Bombay Spices</h3>
                    <div className="work-pills-row">
                      <span className="work-tag-pill">Dashboard</span>
                      <span className="work-tag-pill">Web App</span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Bento 5: Happihosts */}
              <Link href="/projects/happihosts" className="work-bento-card w-bento-4 group">
                <div className="work-card-img-wrapper" style={{ position: "relative" }}>
                  <Image 
                    src="/assets/images/projects/happihosts-cover.png" 
                    alt="Happihosts" 
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="work-card-img"
                  />
                  <div className="work-arrow-circle">
                    <ArrowUpRight size={20} />
                  </div>
                  <div className="work-card-overlay-gradient">
                    <h3 className="work-card-title">Happihosts</h3>
                    <div className="work-pills-row">
                      <span className="work-tag-pill">Event Management</span>
                      <span className="work-tag-pill">Web App</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Redesigned Contact / Footer CTA Section */}
        <section id="contact" className="cta-redesign-wrapper">
          <div className="cta-glow-bg" />
          <div className="container">
            <div className="cta-redesign-box reveal-up-sec">
              <span className="about-header-pill" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.2)", color: "#75C5DE" }}>
                <MessageCircle size={14} /> GET IN TOUCH
              </span>
              <h2 className="cta-redesign-headline">
                Let’s create something <span className="about-gradient-text">amazing together</span>
              </h2>
              <p className="cta-redesign-sub">
                I’m currently available for freelance projects and open to discussing new opportunities.
                Feel free to reach out if you want to collaborate!
              </p>

              <div className="cta-actions-group">
                <a 
                  href="https://www.linkedin.com/in/nivrutti-dandekar-71638768/" 
                  className="btn btn-primary flex items-center gap-3 text-lg py-4 px-8" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ background: "#75C5DE", color: "#0f172a", borderRadius: "9999px" }}
                >
                  Say Hello <MessageCircle size={20} />
                </a>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText("nivrutti.dandekar@gmail.com");
                    setCopiedEmail(true);
                    setTimeout(() => setCopiedEmail(false), 3000);
                  }}
                  className="cta-email-copy-btn"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={18} className="text-green-400" />
                      <span className="text-green-400">Email Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={18} />
                      <span>nivrutti.dandekar@gmail.com</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
