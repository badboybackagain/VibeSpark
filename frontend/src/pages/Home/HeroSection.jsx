import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { 
  ArrowRight, 
  Code2, 
  TrendingUp, 
  Sparkles, 
  Cpu, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import ParticleCanvas from '../../components/animations/ParticleCanvas';

// High-tech cinematic assets
import heroWorkspaceImg from '../../assets/images/hero-developer-ai.jpg';
import heroCyberBg from '../../assets/images/hero-modern-cyber-bg.jpg';

export default function HeroSection() {
  const heroRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const heroVisualRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaGroupRef = useRef(null);
  const trustBadgeRef = useRef(null);

  // GSAP Cinematic Staggered Entrance
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Badge reveal
      tl.fromTo(
        '.gsap-hero-badge',
        { opacity: 0, y: -18, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55 }
      )
      // 2. Separate Line-by-Line Headline Entrance
      .fromTo(
        line1Ref.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.75 },
        '-=0.3'
      )
      .fromTo(
        line2Ref.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.75 },
        '-=0.55'
      )
      .fromTo(
        line3Ref.current,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.3)' },
        '-=0.55'
      )
      // 3. Supporting Description
      .fromTo(
        subtextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.65 },
        '-=0.45'
      )
      // 3.5 Value Deliverables Pills Cascade
      .fromTo(
        '.gsap-hero-pill',
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', clearProps: 'transform,opacity' },
        '-=0.35'
      )
      // 4. Action Buttons
      .fromTo(
        ctaGroupRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.45'
      )
      // 5. Trust Indicators
      .fromTo(
        trustBadgeRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.55 },
        '-=0.4'
      )
      // 6. Main Visual Reveal
      .fromTo(
        heroVisualRef.current,
        { opacity: 0, scale: 0.92, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=1.2'
      )
      // 7. Four Floating Glass Cards
      .fromTo(
        '.gsap-float-card',
        { opacity: 0, y: 18, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1, ease: 'power2.out' },
        '-=0.6'
      );
    }, heroRef.current || undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-0 lg:min-h-[85vh] xl:min-h-screen bg-gradient-to-b from-[#030517] via-brand-midnight to-[#06082A] text-white flex items-center pt-20 sm:pt-24 lg:pt-20 xl:pt-24 pb-8 sm:pb-10 lg:pb-8 overflow-hidden"
    >
      
      {/* ================= A. BACKGROUND LAYERS & CINEMATIC DEPTH ================= */}
      
      {/* 1. 3D Digital Perspective Floor Grid Lines */}
      <div className="absolute -bottom-16 left-0 right-0 h-80 perspective-grid pointer-events-none opacity-45 z-0" />

      {/* 3. Deep Navy with Electric Blue & Subtle Ambient Lighting */}
      <div className="absolute top-1/4 right-0 w-[650px] h-[650px] bg-brand-indigo/25 rounded-full blur-[150px] pointer-events-none animate-pulse" style={{ animationDuration: '9s' }} />
      <div className="absolute -bottom-24 left-0 w-[550px] h-[550px] bg-brand-orange/15 rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: '11s' }} />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-brand-indigo/12 rounded-full blur-[130px] pointer-events-none" />

      {/* 4. Orange & Blue Light Streaks matching VibeSpark Logo */}
      <div className="absolute -top-28 right-1/4 w-[750px] h-28 light-streak-orange pointer-events-none opacity-60 z-[1]" />
      <div className="absolute top-1/2 -left-20 w-[650px] h-24 light-streak-blue pointer-events-none opacity-40 z-[1]" />

      {/* 5. Modern Abstract 3D Cyber Tech Background (Clean Ambient Canvas - No Eye/Iris Camera Rims) */}
      <div className="absolute inset-0 pointer-events-none opacity-35 mix-blend-screen overflow-hidden z-[1]">
        <img
          src={heroCyberBg}
          alt="Cinematic 3D Cyber Light Background"
          width="1920"
          height="1080"
          decoding="async"
          className="w-full h-full object-cover object-center filter contrast-115 brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04061A] via-transparent to-[#04061A]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04061A]/85 via-transparent to-[#04061A]/85 pointer-events-none" />
      </div>

      {/* 6. Fine Cyber Coordinate Matrix Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,#000_60%,transparent_100%)] pointer-events-none z-[1]" />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* ================= LEFT COLUMN: C. TYPOGRAPHY & ACTIONS ================= */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-4.5 lg:space-y-3.5 xl:space-y-4.5 text-left">
            
            {/* Pill Badge */}
            <div className="gsap-hero-badge inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full bg-white/[0.08] border border-brand-orange/40 backdrop-blur-xl text-xs sm:text-sm font-medium text-slate-200 shadow-glow-orange/20 max-w-full">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
              </span>
              <span className="text-brand-lavender font-semibold text-[11px] sm:text-xs">Your Digital Growth Partner</span>
              <span className="text-white/30">•</span>
              <span className="text-brand-orange text-[10px] sm:text-xs font-bold uppercase tracking-wider shrink-0">Enterprise Engineering</span>
            </div>

            {/* C. TYPOGRAPHY: TIGHT HIGH-IMPACT HEADLINE */}
            <h1 className="text-[27px] xs:text-[31px] sm:text-4xl md:text-[40px] lg:text-[36px] xl:text-[44px] 2xl:text-[50px] font-extrabold tracking-tight leading-[1.08] sm:leading-[1.1] lg:leading-[1.12]">
              <span ref={line1Ref} className="block text-white font-extrabold">
                Build Your Digital Presence
              </span>
              <span ref={line2Ref} className="block mt-0.5 sm:mt-1 text-slate-100 font-extrabold">
                Grow Your Business with
              </span>
              <span ref={line3Ref} className="block mt-0.5 sm:mt-1">
                <span className="text-brand-orange font-black tracking-tight inline-block">
                  VibeSpark
                </span>
              </span>
            </h1>

            {/* Supporting description */}
            <p 
              ref={subtextRef} 
              className="text-sm sm:text-base lg:text-[14.5px] xl:text-base text-slate-300 max-w-xl leading-relaxed font-normal"
            >
              Innovative web solutions, smart digital marketing and technology-driven strategies to help your business grow.
            </p>

            {/* Value Deliverables: Listed vertically one by one on mobile, horizontal row on laptop/desktop to preserve vertical space */}
            <div className="flex flex-col lg:flex-row lg:flex-wrap items-start lg:items-center gap-2 pt-0.5 pb-0.5">
              <div className="gsap-hero-pill inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md text-[11px] sm:text-xs font-semibold text-slate-200 w-fit shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shadow-[0_0_8px_rgba(244,119,59,0.8)]"></span>
                <span>Modern Web Architecture</span>
              </div>
              <div className="gsap-hero-pill inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md text-[11px] sm:text-xs font-semibold text-slate-200 w-fit shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                <span>Top-Rank SEO Optimization</span>
              </div>
              <div className="gsap-hero-pill inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md text-[11px] sm:text-xs font-semibold text-slate-200 w-fit shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                <span>Dedicated SLA Support</span>
              </div>
            </div>

            {/* CTA Action: Focused high-impact primary button */}
            <div ref={ctaGroupRef} className="pt-1">
              <Link
                to="/services"
                className="w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-bold text-xs sm:text-sm tracking-wide text-white bg-gradient-to-r from-brand-orange to-[#FF6224] hover:from-[#FF6224] hover:to-brand-orange shadow-md shadow-brand-orange/30 hover:shadow-brand-orange/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shrink-0 group text-center"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            {/* Trust Indicator Area */}
            <div 
              ref={trustBadgeRef}
              className="pt-2.5 sm:pt-3.5 flex items-center gap-3 sm:gap-4 border-t border-white/10"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Overlapping Avatars */}
                <div className="flex -space-x-2 shrink-0 overflow-hidden">
                  <img
                    className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-brand-midnight object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Client avatar"
                    width="36"
                    height="36"
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-brand-midnight object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Client avatar"
                    width="36"
                    height="36"
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-brand-midnight object-cover"
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                    alt="Client avatar"
                    width="36"
                    height="36"
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-brand-midnight object-cover"
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                    alt="Client avatar"
                    width="36"
                    height="36"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div>
                  <p className="text-xs sm:text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                    <span>Trusted by 60+ Growing Brands</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange inline-block" />
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-brand-lavender/80">
                    Across India & Global Tech Markets
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: B. HERO IMAGE & D. SUBTLE FLOATING GLASS CARDS ================= */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 pt-8 sm:pt-12 lg:pt-8 xl:pt-10">
            
            {/* Highly Visible Tagline: "Your Ideas. Our Technology." (Shifted inward and upside on mobile to clear WhatsApp bubble) */}
            <div className="absolute -top-11 sm:-top-10 lg:-top-9 xl:-top-11 right-14 sm:right-2 lg:right-1 xl:right-2 z-30 text-right select-none pointer-events-none scale-85 sm:scale-95 lg:scale-100 origin-top-right">
              <div className="inline-block px-3 py-1 sm:px-4 sm:py-2 rounded-2xl bg-[#080B38]/92 backdrop-blur-md border border-[#403CFF]/30 shadow-2xl shadow-black/80">
                <span className="font-handwriting text-lg sm:text-2xl xl:text-3xl text-brand-lavender font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] block leading-none">
                  Your Ideas.
                </span>
                <span className="font-handwriting text-lg sm:text-2xl xl:text-3xl text-white font-extrabold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] block mt-0.5 sm:mt-1 leading-none">
                  Our <span className="text-brand-orange">Technology.</span>
                </span>
              </div>
              <svg 
                className="w-8 sm:w-12 h-4 sm:h-6 text-brand-orange ml-auto mt-0.5 transform rotate-6 drop-shadow-[0_0_8px_rgba(244,119,59,0.7)]" 
                viewBox="0 0 50 20" 
                fill="none"
              >
                <path d="M2 15C15 5 35 3 48 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M42 6L48 12L41 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Central Visual Wrapper */}
            <div ref={heroVisualRef} className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Radiant Glow Rings */}
              <div className="absolute -inset-2 bg-gradient-to-r from-brand-indigo via-brand-royal-blue to-brand-orange rounded-[32px] opacity-30 blur-2xl pointer-events-none" />
              <div className="absolute inset-0 bg-brand-indigo/25 rounded-3xl blur-xl pointer-events-none" />

              {/* B. MAIN IMAGE: CINEMATIC MULTI-MONITOR TECH WORKSPACE NATURAL BLEND */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 bg-[#04061A] shadow-2xl">
                <img
                  src={heroWorkspaceImg}
                  alt="VibeSpark Technologies Developer Multi-Monitor Software Workspace with AI Core"
                  width="800"
                  height="440"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-[220px] xs:h-[250px] sm:h-[320px] lg:h-[300px] xl:h-[360px] 2xl:h-[420px] object-cover object-center filter brightness-95 contrast-110"
                />

                {/* Ambient vignette blending edges into deep midnight navy */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#04061A] via-brand-midnight/20 to-transparent opacity-70 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#04061A]/40 via-transparent to-[#04061A]/40 pointer-events-none" />
              </div>

              {/* ================= D. FOUR SUBTLE FLOATING GLASS CARDS ================= */}

              {/* Card 1: Web Development (Top Left) */}
              <div className="gsap-float-card animate-subtle-1 absolute top-2 left-2 sm:top-4 sm:left-4 z-20 scale-[0.74] xs:scale-[0.85] sm:scale-100 origin-top-left">
                <Link
                  to="/services/web-development"
                  className="flex items-center gap-2 sm:gap-2.5 px-2.5 py-1.5 sm:px-3 sm:py-2.5 rounded-xl sm:rounded-2xl bg-brand-midnight/95 backdrop-blur-xl border border-[#403CFF]/30 shadow-xl shadow-black/50 hover:border-brand-orange/60 hover:bg-brand-midnight transition-all duration-300 group"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-brand-indigo/30 border border-brand-indigo/50 flex items-center justify-center text-brand-lavender group-hover:text-brand-orange group-hover:border-brand-orange/50 transition-colors">
                    <Code2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-bold text-white group-hover:text-brand-orange transition-colors">Web Development</p>
                    <p className="text-[8px] sm:text-[10px] text-slate-400">React & Next.js</p>
                  </div>
                  <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-500 group-hover:translate-x-1 group-hover:text-white transition-all ml-0.5" />
                </Link>
              </div>

              {/* Card 2: SEO & Growth (Top Right) */}
              <div className="gsap-float-card animate-subtle-2 absolute top-9 sm:top-16 right-2 sm:right-4 z-20 scale-[0.74] xs:scale-[0.85] sm:scale-100 origin-top-right">
                <Link
                  to="/services/seo"
                  className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-2 rounded-xl sm:rounded-2xl bg-brand-midnight/95 backdrop-blur-xl border border-[#403CFF]/30 shadow-xl shadow-black/50 hover:border-brand-orange/60 hover:bg-brand-midnight transition-all duration-300 group"
                >
                  <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors">
                    <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-bold text-white group-hover:text-brand-orange transition-colors">SEO & Growth</p>
                    <p className="text-[8px] sm:text-[10px] text-slate-400">Top 3 Google Rank</p>
                  </div>
                </Link>
              </div>

              {/* Card 3: Digital Marketing (Bottom Left) */}
              <div className="gsap-float-card animate-subtle-3 absolute bottom-2 left-2 sm:bottom-4 sm:left-4 z-20 scale-[0.74] xs:scale-[0.85] sm:scale-100 origin-bottom-left">
                <Link
                  to="/services/digital-marketing"
                  className="flex items-center gap-2 sm:gap-2.5 px-2.5 py-1.5 sm:px-3 sm:py-2.5 rounded-xl sm:rounded-2xl bg-brand-midnight/95 backdrop-blur-xl border border-[#403CFF]/30 shadow-xl shadow-black/50 hover:border-brand-orange/60 hover:bg-brand-midnight transition-all duration-300 group"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-brand-indigo/25 border border-brand-indigo/40 flex items-center justify-center text-brand-lavender group-hover:text-brand-orange transition-colors">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-bold text-white group-hover:text-brand-orange transition-colors">Digital Marketing</p>
                    <p className="text-[8px] sm:text-[10px] text-slate-400">Multi-Channel ROI</p>
                  </div>
                </Link>
              </div>

              {/* Card 4: Business Automation (Bottom Right) */}
              <div className="gsap-float-card animate-subtle-4 absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-20 scale-[0.74] xs:scale-[0.85] sm:scale-100 origin-bottom-right">
                <Link
                  to="/services/automation"
                  className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-2 rounded-xl sm:rounded-2xl bg-brand-midnight/95 backdrop-blur-xl border border-[#403CFF]/30 shadow-xl shadow-black/50 hover:border-brand-orange/60 hover:bg-brand-midnight transition-all duration-300 group"
                >
                  <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-brand-indigo/30 border border-brand-indigo/50 flex items-center justify-center text-brand-lavender group-hover:text-brand-orange transition-colors">
                    <Cpu className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-bold text-white group-hover:text-brand-orange transition-colors">Automation</p>
                    <p className="text-[8px] sm:text-[10px] text-slate-400">24/7 Cloud</p>
                  </div>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Cinematic bottom transition wave into section 2 */}
      <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-14 bg-brand-soft [clip-path:polygon(0_65%,100%_0%,100%_100%,0%_100%)] pointer-events-none" />

    </section>
  );
}
