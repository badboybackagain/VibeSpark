import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Rocket, 
  Handshake, 
  Users, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Zap,
  TrendingUp,
  Award,
  Clock
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const whyChooseCards = [
  {
    id: "innovation",
    title: "Innovation First",
    desc: "Leveraging cutting-edge modern tech stacks and AI-driven tooling for future-proof scalability.",
    icon: Rocket,
    tag: "10x Velocity",
    metric: "AI-Powered Architecture",
    theme: "orange"
  },
  {
    id: "results",
    title: "Result Driven",
    desc: "Every line of code and marketing campaign is tuned to achieve concrete, measurable business growth.",
    icon: TrendingUp,
    tag: "High ROI",
    metric: "99.4% Delivery Success",
    theme: "indigo"
  },
  {
    id: "team",
    title: "Expert Team",
    desc: "Senior full-stack developers, creative UI designers, and certified marketing specialists.",
    icon: Users,
    tag: "Senior Staff",
    metric: "Top 3% Tech Talent",
    theme: "indigo"
  },
  {
    id: "support",
    title: "Dedicated Support",
    desc: "Transparent communication, continuous maintenance, and dedicated account managers.",
    icon: ShieldCheck,
    tag: "24/7 SLA",
    metric: "< 15-Min Response Time",
    theme: "orange"
  }
];

export default function WhyChooseSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsGridRef = useRef(null);
  const rightImageRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Header fade up promptly as soon as section approaches
      gsap.fromTo(
        '.why-choose-header',
        {
          y: 25,
          opacity: 0
        },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          clearProps: "transform,opacity"
        }
      );

      // 2. Fast, silky-smooth slide-in for the 4 feature cards (Zero lag, starts immediately as cards enter view)
      const cards = gsap.utils.toArray('.why-choose-card');
      gsap.fromTo(
        cards,
        {
          x: -60,
          y: 15,
          opacity: 0,
          scale: 0.96
        },
        {
          scrollTrigger: {
            trigger: cardsGridRef.current,
            start: "top 90%", // Trigger immediately when cards enter viewport
            toggleActions: "play none none reverse"
          },
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.65,
          stagger: 0.08, // Quick, crisp ripple instead of long delays
          ease: "power2.out",
          clearProps: "transform,opacity" // Cleans up so hover transforms are 100% responsive
        }
      );

      // 3. Fast, smooth slide-in for the team image card in parallel
      gsap.fromTo(
        rightImageRef.current,
        {
          x: 60,
          y: 15,
          opacity: 0,
          scale: 0.96
        },
        {
          scrollTrigger: {
            trigger: cardsGridRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          },
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
          clearProps: "transform,opacity"
        }
      );

    }, sectionRef.current || undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-gradient-to-br from-[#050724] via-[#080B35] to-[#03051A] text-white overflow-hidden py-24 sm:py-32 lg:py-36 border-y border-white/10"
      id="why-choose-us"
    >
      {/* 1. Cinematic Top Transition Wave from previous light section */}
      <div className="absolute top-0 left-0 right-0 h-10 sm:h-14 bg-brand-soft [clip-path:polygon(0_0,100%_0,100%_0%,0_100%)] pointer-events-none z-20" />

      {/* 2. Full-Width Ambient Lighting & Glow Meshes */}
      <div className="absolute -top-32 right-1/4 w-[650px] h-[650px] bg-brand-indigo/25 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-32 left-10 w-[600px] h-[600px] bg-brand-orange/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(64,60,255,0.15),transparent_70%)] pointer-events-none" />

      {/* 3. Full-Width Fine Cyber Coordinate Matrix Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

      {/* 4. Main Content Container (Full Width Edge-to-Edge Canvas with Centered Content) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Top Row: Header & Intro + CTA */}
        <div className="why-choose-header grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-12 sm:pb-16 border-b border-white/10">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/[0.08] border border-white/15 text-brand-lavender shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
              <span>The VibeSpark Advantage</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Why Choose{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-[#FF925C] to-brand-orange drop-shadow-sm">
                VibeSpark?
              </span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed font-normal">
              We blend creativity, enterprise engineering and digital strategy to deliver measurable results that propel your business ahead of the competition.
            </p>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <Link
              to="/about"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-brand-orange to-[#FF6224] hover:from-[#FF6224] hover:to-brand-orange shadow-lg shadow-brand-orange/30 hover:shadow-brand-orange/50 hover:scale-[1.03] active:scale-[0.98] transition-all group"
            >
              <span>Learn More About Us</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Bottom Grid: 4 Feature Cards (Slide in promptly) + Team Showcase Card (Slide in promptly) */}
        <div ref={cardsGridRef} className="pt-12 sm:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* 4 Feature Cards (7 cols) - Silky smooth glide from left */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {whyChooseCards.map((item) => {
              const IconComp = item.icon;
              const isOrange = item.theme === "orange";

              return (
                <div
                  key={item.id}
                  className="why-choose-card group relative p-6 sm:p-7 rounded-[26px] bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/15 hover:border-white/30 hover:bg-white/[0.12] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg shadow-black/30 hover:-translate-y-2 hover:shadow-2xl will-change-transform"
                  style={{ transform: 'translateZ(0)' }}
                >
                  {/* Top Edge Illumination Bar */}
                  <div 
                    className={`absolute top-0 left-0 right-0 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      isOrange 
                        ? 'bg-gradient-to-r from-brand-orange via-[#FF925C] to-brand-orange' 
                        : 'bg-gradient-to-r from-brand-indigo via-brand-royal-blue to-brand-indigo'
                    }`} 
                  />

                  {/* Ambient Corner Flare on Hover */}
                  <div 
                    className={`absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none ${
                      isOrange ? 'bg-brand-orange' : 'bg-brand-indigo'
                    }`} 
                  />

                  <div>
                    {/* Top Row: Icon Container & Floating Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div 
                        className={`w-13 h-13 rounded-2xl flex items-center justify-center p-3 shadow-lg transition-transform duration-300 group-hover:scale-110 ${
                          isOrange
                            ? 'bg-gradient-to-br from-brand-orange to-[#FF6224] text-white shadow-brand-orange/30'
                            : 'bg-gradient-to-br from-brand-indigo to-brand-royal-blue text-white shadow-brand-indigo/30'
                        }`}
                      >
                        <IconComp className="w-6 h-6 stroke-[2.2]" />
                      </div>

                      {/* Top Tag Pill */}
                      <span 
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border transition-colors ${
                          isOrange 
                            ? 'bg-brand-orange/15 text-brand-orange border-brand-orange/30' 
                            : 'bg-brand-indigo/20 text-brand-lavender border-brand-indigo/35'
                        }`}
                      >
                        {item.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white group-hover:text-brand-orange transition-colors duration-200 mb-2">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Deliverable Pill */}
                  <div className="pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                    <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isOrange ? 'text-brand-orange' : 'text-brand-indigo'}`} />
                    <span>{item.metric}</span>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Team Showcase Card (5 cols) - Silky smooth glide from right */}
          <div 
            ref={rightImageRef} 
            className="lg:col-span-5 relative will-change-transform"
            style={{ transform: 'translateZ(0)' }}
          >
            {/* Outer Glow Halo */}
            <div className="absolute -inset-2 bg-gradient-to-r from-brand-orange/20 via-brand-indigo/25 to-brand-royal-blue/15 rounded-[34px] blur-xl opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* Main Photo Container */}
            <div className="relative rounded-[30px] overflow-hidden border border-white/20 bg-brand-midnight shadow-2xl group">
              
              {/* Floating Top Status Badge Breaking Out */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[11px] font-bold text-white shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for New Projects</span>
              </div>

              <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-full bg-brand-orange/90 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider shadow-md">
                Pune Tech Hub
              </div>

              {/* Team Photograph with Smooth Zoom on Hover */}
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80"
                alt="VibeSpark Senior Tech Team Collaboration"
                className="w-full h-[320px] sm:h-[370px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Gradient Blend */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#04061F] via-[#04061F]/40 to-transparent opacity-90 pointer-events-none" />

              {/* Floating Glass Information Pod at Bottom */}
              <div className="absolute bottom-4 left-4 right-4 p-4 sm:p-5 rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/20 text-left flex items-center justify-between shadow-2xl">
                <div>
                  <p className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-brand-orange fill-brand-orange" />
                    Senior Engineering Squad
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Full-Stack Engineers, AI Architects & UI Designers
                  </p>
                </div>
                
                <div className="text-right shrink-0 pl-3">
                  <span className="text-xs font-bold text-brand-orange block">
                    100% In-House
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    Zero Outsourcing
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* 5. Cinematic Bottom Transition Wave into next light section (Industries) */}
      <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-14 bg-brand-soft [clip-path:polygon(0_65%,100%_0%,100%_100%,0%_100%)] pointer-events-none z-20" />
    </section>
  );
}
