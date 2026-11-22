import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiGreensock,
  SiNodedotjs,
  SiGraphql,
  SiPython,
  SiDocker,
  SiPostgresql,
  SiGoogleanalytics,
  SiShopify
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa6';

import ServiceCard from '../../components/cards/ServiceCard';
import ParticleCanvas from '../../components/animations/ParticleCanvas';
import SEOHead from '../../components/common/SEOHead';
import ScrollReveal from '../../components/common/ScrollReveal';
import { servicesData } from '../../data/siteData';
import servicesHeroCinematic from '../../assets/images/services-hero-cinematic.jpg';

// Row 1: Frontend & Application Frameworks
const techRow1 = [
  { 
    name: "React.js", 
    category: "Frontend UI", 
    icon: SiReact, 
    brandColor: "#00D8FF",
    glowColor: "rgba(0, 216, 255, 0.45)"
  },
  { 
    name: "Next.js", 
    category: "Full-Stack SSR", 
    icon: SiNextdotjs, 
    brandColor: "#080B35",
    glowColor: "rgba(64, 60, 255, 0.4)"
  },
  { 
    name: "Tailwind CSS", 
    category: "Modern Styling", 
    icon: SiTailwindcss, 
    brandColor: "#06B6D4",
    glowColor: "rgba(6, 182, 212, 0.45)"
  },
  { 
    name: "TypeScript", 
    category: "Type Safety", 
    icon: SiTypescript, 
    brandColor: "#3178C6",
    glowColor: "rgba(49, 120, 198, 0.45)"
  },
  { 
    name: "GSAP Motion", 
    category: "Cinematic FX", 
    icon: SiGreensock, 
    brandColor: "#88CE02",
    glowColor: "rgba(136, 206, 2, 0.45)"
  },
  { 
    name: "Node.js", 
    category: "Cloud Runtime", 
    icon: SiNodedotjs, 
    brandColor: "#22C55E",
    glowColor: "rgba(34, 197, 94, 0.45)"
  },
  { 
    name: "GraphQL", 
    category: "API Architecture", 
    icon: SiGraphql, 
    brandColor: "#E10098",
    glowColor: "rgba(225, 0, 152, 0.45)"
  }
];

// Row 2: Cloud, Data, AI & E-Commerce
const techRow2 = [
  { 
    name: "Python", 
    category: "AI & Automation", 
    icon: SiPython, 
    brandColor: "#3776AB",
    glowColor: "rgba(55, 118, 171, 0.45)"
  },
  { 
    name: "Docker", 
    category: "Containers", 
    icon: SiDocker, 
    brandColor: "#0284C7",
    glowColor: "rgba(2, 132, 199, 0.45)"
  },
  { 
    name: "AWS Cloud", 
    category: "Global Infra", 
    icon: FaAws, 
    brandColor: "#FF9900",
    glowColor: "rgba(255, 153, 0, 0.5)"
  },
  { 
    name: "PostgreSQL", 
    category: "Enterprise DB", 
    icon: SiPostgresql, 
    brandColor: "#336791",
    glowColor: "rgba(51, 103, 145, 0.45)"
  },
  { 
    name: "Google Analytics 4", 
    category: "BI & Tracking", 
    icon: SiGoogleanalytics, 
    brandColor: "#EA580C",
    glowColor: "rgba(234, 88, 12, 0.5)"
  },
  { 
    name: "Shopify Plus", 
    category: "E-Commerce", 
    icon: SiShopify, 
    brandColor: "#84CC16",
    glowColor: "rgba(132, 204, 22, 0.45)"
  }
];

function TechCircularPod({ tech }) {
  const IconComp = tech.icon;

  return (
    <div className="group relative flex flex-col items-center justify-center cursor-pointer px-4 select-none shrink-0">
      
      {/* Ambient Illuminated Halo Behind Circular Pod (Soft glow always on, intensifies on hover) */}
      <div 
        className="absolute top-1 w-24 h-24 rounded-full blur-xl opacity-40 group-hover:opacity-95 transition-all duration-300 scale-90 group-hover:scale-130 pointer-events-none"
        style={{ background: tech.glowColor }}
      />

      {/* Luminous Circular Highlighted Pod (Bright, crisp, and elevated - never dark) */}
      <div className="relative z-10 w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-b from-white via-white to-slate-50 border border-slate-200/90 shadow-[0_8px_24px_-4px_rgba(8,11,53,0.12),0_0_0_1px_rgba(255,255,255,0.95)] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-white group-hover:shadow-[0_14px_35px_-5px_rgba(8,11,53,0.18)]">
        <IconComp 
          className="w-10 h-10 sm:w-11 sm:h-11 transition-all duration-300 group-hover:scale-110 drop-shadow-sm"
          style={{ color: tech.brandColor }}
        />
      </div>

      {/* Tech Name - High contrast & bold */}
      <span className="mt-3 text-xs sm:text-sm font-bold text-brand-midnight group-hover:text-brand-orange transition-colors duration-200 text-center tracking-tight whitespace-nowrap">
        {tech.name}
      </span>

      {/* Subtitle Role Tag */}
      <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 group-hover:text-slate-700 transition-colors text-center whitespace-nowrap">
        {tech.category}
      </span>
    </div>
  );
}

// Coordinated Hero Landing Sequence Variants (Matches Home Hero feeling)
const heroLandingContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const heroLandingItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function ServicesIndex() {
  const [isPausedRow1, setIsPausedRow1] = useState(false);
  const [isPausedRow2, setIsPausedRow2] = useState(false);

  return (
    <div className="pb-16 bg-brand-soft overflow-x-hidden">
      <SEOHead 
        title="Enterprise Digital Services & Engineering Capabilities | VibeSpark"
        description="Explore VibeSpark's full suite of enterprise digital engineering services: Next.js Web Development, Algorithmic SEO, Custom Cloud SaaS, Digital Marketing, and 24/7 AMC Support."
        canonicalUrl="https://vibespark.in/services"
        keywords="digital engineering services, web development company Pune, SEO services agency, custom SaaS software development, ecommerce website solutions India"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Digital Engineering & Technology Solutions",
          "provider": {
            "@type": "Organization",
            "name": "VibeSpark Technologies",
            "url": "https://vibespark.in"
          },
          "areaServed": "Global",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Digital Transformation Solutions",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Development & Design" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO & Local SEO" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Digital Marketing & Social Media" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Software Development" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "E-commerce Solutions" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Automation & AMC Support" } }
            ]
          }
        }}
      />
      
      {/* ================= CINEMATIC 3D ARCHITECTURAL SERVICES HERO ================= */}
      <section className="relative pt-32 pb-20 sm:pt-36 sm:pb-28 bg-[#050724] text-white overflow-hidden">
        
        {/* Clean, Crisp Normal Photographic Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=80"
            alt="Cybernetic Digital Engineering Infrastructure"
            className="absolute inset-0 w-full h-full object-cover opacity-50 filter brightness-105 contrast-110"
          />
        </div>

        {/* Clean Balanced Scrim (Allows background animation to shine strictly through) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050724]/70 via-[#050724]/50 to-[#050724]/85 pointer-events-none" />

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column (7 cols): Typography, Actions & Trust Pills with Coordinated Landing */}
            <motion.div 
              variants={heroLandingContainer}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 space-y-6 text-left"
            >
              <motion.div variants={heroLandingItem}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-xl border border-white/20 text-brand-lavender shadow-glow-indigo/20">
                  <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Full-Suite Digital Capabilities</span>
                </div>
              </motion.div>

              <motion.h1 
                variants={heroLandingItem}
                className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight leading-[1.12]"
              >
                End-to-End Digital Engineering &{' '}
                <span className="bg-gradient-to-r from-brand-orange via-[#FF8E56] to-brand-orange bg-clip-text text-transparent drop-shadow-sm">
                  Growth Solutions
                </span>
              </motion.h1>

              <motion.p 
                variants={heroLandingItem}
                className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl font-normal"
              >
                From modern responsive web design to algorithmic SEO and enterprise SaaS architectures, we build technologies that fuel sustainable online expansion.
              </motion.p>

              {/* Action Buttons */}
              <motion.div variants={heroLandingItem} className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#services-grid"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-brand-orange to-[#FF6224] hover:from-[#FF6224] hover:to-brand-orange shadow-lg shadow-brand-orange/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Explore Solutions Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider text-slate-200 bg-white/10 border border-white/20 hover:bg-white/15 backdrop-blur-md transition-all"
                >
                  <span>Free Consultation</span>
                </Link>
              </motion.div>

              {/* Capability Badges */}
              <motion.div variants={heroLandingItem} className="flex flex-wrap items-center gap-3 pt-3 text-xs text-slate-300 font-semibold">
                <span className="px-3.5 py-1.5 rounded-full bg-white/[0.07] backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                  <span className="text-brand-orange">⚡</span>
                  <span>Sub-Second Page Experience</span>
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/[0.07] backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                  <span className="text-brand-indigo">🛡️</span>
                  <span>Enterprise Security Protocols</span>
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/[0.07] backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                  <span className="text-brand-orange">📈</span>
                  <span>Data-Driven Commercial ROI</span>
                </span>
              </motion.div>
            </motion.div>

            {/* Right Column (5 cols): Interactive 3D Architectural Engine */}
            <div className="lg:col-span-5 relative">
              <ScrollReveal variant="fadeLeft" distance={24}>
                <div className="relative mx-auto max-w-md lg:max-w-none space-y-4">
                  
                  {/* Holographic Glowing Backlight */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-brand-indigo/30 via-brand-royal-blue/20 to-brand-orange/30 rounded-3xl blur-2xl pointer-events-none" />

                  {/* Layer 1: Frontend & UI Engine */}
                  <motion.div 
                    whileHover={{ scale: 1.02, x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 rounded-2xl bg-[#080B38]/90 backdrop-blur-xl border border-cyan-400/30 shadow-xl relative overflow-hidden group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-black text-cyan-400 tracking-wider uppercase">Layer 01 // Presentation Core</span>
                      <span className="px-2 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-[10px] font-mono text-cyan-300">60 FPS Fluid</span>
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      React & Next.js Micro-Frontends
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">Zero-latency page transitions with hardware-accelerated animations.</p>
                  </motion.div>

                  {/* Layer 2: Cloud API & Scalable Backend */}
                  <motion.div 
                    whileHover={{ scale: 1.02, x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 rounded-2xl bg-[#080B38]/90 backdrop-blur-xl border border-brand-indigo/40 shadow-xl relative overflow-hidden group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-black text-brand-lavender tracking-wider uppercase">Layer 02 // Cloud & Infrastructure</span>
                      <span className="px-2 py-0.5 rounded-full bg-brand-indigo/20 border border-brand-indigo/40 text-[10px] font-mono text-brand-lavender">99.99% Uptime</span>
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-brand-orange transition-colors">
                      Distributed Microservices & Edge APIs
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">Dockerized Node and Python engines scaling across multi-region AWS.</p>
                  </motion.div>

                  {/* Layer 3: Growth & Intelligence Core */}
                  <motion.div 
                    whileHover={{ scale: 1.02, x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 rounded-2xl bg-[#080B38]/90 backdrop-blur-xl border border-brand-orange/40 shadow-xl relative overflow-hidden group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-black text-brand-orange tracking-wider uppercase">Layer 03 // Growth & SEO Engine</span>
                      <span className="px-2 py-0.5 rounded-full bg-brand-orange/15 border border-brand-orange/40 text-[10px] font-mono text-brand-orange">+240% Growth</span>
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-brand-orange transition-colors">
                      Algorithmic Search & Conversion Pipelines
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">Structured semantic data, automated funnels, and high-retention tracking.</p>
                  </motion.div>

                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* ================= GRID OF ALL 6 CORE SERVICES ================= */}
      <div id="services-grid" />
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Intro */}
        <ScrollReveal variant="fadeUp" distance={20}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-lavender/40 border border-brand-lavender text-xs font-bold uppercase tracking-wider text-brand-navy mb-3.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span>SOLUTIONS CATALOG</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-midnight tracking-tight">
              Engineered for High Impact & Measurable Growth
            </h2>
            <p className="text-slate-600 text-base mt-3 max-w-2xl mx-auto">
              Explore our full suite of digital capabilities. Each service is custom-tailored to solve enterprise challenges and accelerate ROI.
            </p>
          </div>
        </ScrollReveal>

        {/* 6 Unified Cinematic Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.map((service, index) => (
            <ScrollReveal 
              key={service.id} 
              variant="fadeUp" 
              distance={24} 
              delay={(index % 3) * 0.08}
            >
              <ServiceCard 
                service={service} 
                index={index} 
              />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ================= ROUND SCROLLING TECH MARKS (HIGHLIGHTED CIRCULAR PODS) ================= */}
      <section className="py-20 lg:py-26 bg-gradient-to-b from-white via-brand-soft to-white border-y border-brand-lavender/60 relative overflow-hidden">
        
        {/* Subtle Ambient Glows */}
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[350px] bg-brand-indigo/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-[450px] h-[350px] bg-brand-orange/8 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
          
          {/* Section Introduction */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-lavender/40 border border-brand-lavender text-xs font-bold uppercase tracking-wider text-brand-navy mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span>VERIFIED TECH ECOSYSTEM</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-midnight tracking-tight leading-tight mb-4">
              Built on Industry-Standard{' '}
              <span className="text-brand-orange">Technologies</span>
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              We reject obsolete frameworks and lock-in templates. Every solution is engineered using modular, maintainable, modern tech stacks.
            </p>
          </div>
        </div>

        {/* Round Scrolling Carousel Tracks with Smooth Infinite Looping */}
        <div className="relative w-full overflow-hidden py-4 space-y-10">
          
          {/* Left and Right Edge Fade Gradients for Smooth Seamless Looping */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-44 bg-gradient-to-r from-white via-white/80 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-44 bg-gradient-to-l from-white via-white/80 to-transparent z-20" />

          {/* Track 1: Smooth Leftward Scrolling */}
          <div 
            className="flex overflow-hidden"
            onMouseEnter={() => setIsPausedRow1(true)}
            onMouseLeave={() => setIsPausedRow1(false)}
          >
            <motion.div
              animate={{ x: isPausedRow1 ? undefined : ["0%", "-50%"] }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: "linear"
              }}
              className="flex items-center gap-8 sm:gap-12 w-max"
            >
              {[...techRow1, ...techRow1].map((tech, idx) => (
                <TechCircularPod key={`${tech.name}-row1-${idx}`} tech={tech} />
              ))}
            </motion.div>
          </div>

          {/* Track 2: Smooth Rightward Scrolling */}
          <div 
            className="flex overflow-hidden"
            onMouseEnter={() => setIsPausedRow2(true)}
            onMouseLeave={() => setIsPausedRow2(false)}
          >
            <motion.div
              animate={{ x: isPausedRow2 ? undefined : ["-50%", "0%"] }}
              transition={{
                duration: 26,
                repeat: Infinity,
                ease: "linear"
              }}
              className="flex items-center gap-8 sm:gap-12 w-max"
            >
              {[...techRow2, ...techRow2].map((tech, idx) => (
                <TechCircularPod key={`${tech.name}-row2-${idx}`} tech={tech} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Enterprise Guarantee Pill */}
        <div className="mt-14 text-center relative z-10 px-4">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-brand-lavender text-xs font-semibold text-slate-700 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-brand-orange" />
            <span>Full source-code IP ownership, zero vendor lock-in & enterprise SLAs</span>
          </div>
        </div>

      </section>

      {/* ================= BOTTOM CTA ================= */}
      <section className="py-20 text-center max-w-3xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-midnight mb-4">
          Need a Tailored Technical Solution?
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
          Schedule a technical discovery session with our senior engineers to scope your project requirements.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-brand-orange to-[#FF6224] hover:from-[#FF6224] hover:to-brand-orange shadow-lg shadow-brand-orange/30 hover:shadow-brand-orange/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
        >
          <span>Request Custom Quote</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

    </div>
  );
}
