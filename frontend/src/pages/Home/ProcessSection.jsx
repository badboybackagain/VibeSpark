import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Lightbulb, 
  Code2, 
  Rocket, 
  TrendingUp, 
  ArrowRight,
  Infinity as InfinityIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '../../components/common/SectionHeading';
import ScrollReveal from '../../components/common/ScrollReveal';
import { processSteps } from '../../data/siteData';

export default function ProcessSection() {
  const iconMap = {
    Search,
    Lightbulb,
    Code2,
    Rocket,
    TrendingUp
  };

  return (
    <section className="py-20 lg:py-28 bg-brand-soft relative overflow-hidden" id="process">
      {/* Subtle background ambient mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-brand-indigo/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <SectionHeading
            badge="Our Process"
            title="A Simple &"
            highlight="Transparent Process"
            description="From idea to impact — engineered through a continuous infinity delivery lifecycle."
            className="mb-0"
          />

          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-orange hover:text-brand-orange-hover hover:underline group"
          >
            <span>Learn More About Our Methodology</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ================= TRUE INFINITY LOOP STAGE (DESKTOP) ================= */}
        <ScrollReveal variant="fadeUp" distance={28} duration={0.8}>
          <div className="relative hidden lg:block min-h-[520px]">
          
          {/* SINGLE ANIMATION OVER THE SHAPE: Smooth Glowing Laser Traveling along Infinity Curve */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <svg 
              viewBox="0 0 1000 480" 
              className="w-full h-full overflow-visible"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Subtle base track gradient */}
                <linearGradient id="infinityBaseTrack" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#403CFF" stopOpacity="0.25" />
                  <stop offset="50%" stopColor="#F4773B" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#403CFF" stopOpacity="0.25" />
                </linearGradient>

                {/* The single traveling photon laser beam */}
                <linearGradient id="singleLaserBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#403CFF" stopOpacity="0" />
                  <stop offset="50%" stopColor="#F4773B" stopOpacity="1" />
                  <stop offset="100%" stopColor="#FFA066" stopOpacity="0" />
                </linearGradient>

                <filter id="cleanGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Static Figure-8 Infinity Track */}
              <path 
                d="M 500,240 C 680,60 880,60 880,240 C 880,420 680,420 500,240 C 320,60 120,60 120,240 C 120,420 320,420 500,240 Z" 
                stroke="url(#infinityBaseTrack)" 
                strokeWidth="3" 
                strokeDasharray="6 8"
              />

              {/* ONLY ONE ANIMATION: The flowing energy pulse over the infinity shape */}
              <motion.path 
                d="M 500,240 C 680,60 880,60 880,240 C 880,420 680,420 500,240 C 320,60 120,60 120,240 C 120,420 320,420 500,240 Z" 
                stroke="url(#singleLaserBeam)" 
                strokeWidth="5" 
                filter="url(#cleanGlow)"
                strokeDasharray="220 860"
                animate={{
                  strokeDashoffset: [0, -1080]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Clean static junction center */}
              <circle cx="500" cy="240" r="5" fill="#F4773B" />
            </svg>
          </div>

          {/* 5 Process Steps Placed along the Figure-8 Infinity Path with Clear Visible Numbers */}
          <div className="relative w-full h-[520px]">
            
            {/* Step 01: Discover (Top Left Lobe) */}
            <div 
              style={{ left: '16%', top: '4%' }}
              className="absolute -translate-x-1/2 w-64 text-center group select-none z-20"
            >
              <div className="flex flex-col items-center">
                {/* Clear, Prominent Step Number Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange text-white text-xs font-black shadow-md border-2 border-white mb-2.5">
                  <span>STEP 01</span>
                </div>

                <div className="w-20 h-20 rounded-full bg-white border-2 border-brand-lavender/90 text-brand-navy shadow-card-light flex items-center justify-center group-hover:border-brand-orange group-hover:text-brand-orange group-hover:scale-105 transition-all duration-300 mb-3">
                  <Search className="w-8 h-8 stroke-[2]" />
                </div>
                
                <h3 className="text-base font-bold text-brand-midnight group-hover:text-brand-indigo transition-colors">
                  Discover
                </h3>
                <p className="text-[11px] font-semibold text-brand-orange mt-0.5">Understand needs & goals</p>
                <p className="text-[11px] text-slate-500 mt-1 max-w-[200px] leading-relaxed">Discovery workshops to analyze objectives & target landscape.</p>
              </div>
            </div>

            {/* Step 02: Strategize (Bottom Left Lobe) */}
            <div 
              style={{ left: '16%', top: '56%' }}
              className="absolute -translate-x-1/2 w-64 text-center group select-none z-20"
            >
              <div className="flex flex-col items-center">
                {/* Clear, Prominent Step Number Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange text-white text-xs font-black shadow-md border-2 border-white mb-2.5">
                  <span>STEP 02</span>
                </div>

                <div className="w-20 h-20 rounded-full bg-white border-2 border-brand-lavender/90 text-brand-navy shadow-card-light flex items-center justify-center group-hover:border-brand-orange group-hover:text-brand-orange group-hover:scale-105 transition-all duration-300 mb-3">
                  <Lightbulb className="w-8 h-8 stroke-[2]" />
                </div>
                
                <h3 className="text-base font-bold text-brand-midnight group-hover:text-brand-indigo transition-colors">
                  Strategize
                </h3>
                <p className="text-[11px] font-semibold text-brand-orange mt-0.5">Plan conversion blueprints</p>
                <p className="text-[11px] text-slate-500 mt-1 max-w-[200px] leading-relaxed">Technical architecture wireframing and growth roadmaps.</p>
              </div>
            </div>

            {/* Step 03: Develop (Central Core Intersection) */}
            <div 
              style={{ left: '50%', top: '24%' }}
              className="absolute -translate-x-1/2 w-72 text-center group select-none z-30"
            >
              <div className="flex flex-col items-center">
                {/* Clear, Prominent Step Number Badge */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-navy text-white text-xs font-black shadow-md border-2 border-white mb-2.5">
                  <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                  <span>STEP 03 // CORE</span>
                </div>

                <div className="w-24 h-24 rounded-full bg-white border-[3px] border-[#403CFF]/60 text-brand-indigo shadow-xl flex items-center justify-center group-hover:border-brand-orange group-hover:text-brand-orange group-hover:scale-105 transition-all duration-300 mb-3">
                  <Code2 className="w-10 h-10 stroke-[2.2]" />
                </div>
                
                <h3 className="text-lg font-extrabold text-brand-midnight group-hover:text-brand-orange transition-colors">
                  Develop & Build
                </h3>
                <p className="text-xs font-bold text-brand-orange mt-0.5">Core Engineering Nexus</p>
                <p className="text-[11px] text-slate-600 mt-1 max-w-[230px] leading-relaxed font-medium">Clean, modular, production-ready code with sub-second speeds.</p>
              </div>
            </div>

            {/* Step 04: Launch (Top Right Lobe) */}
            <div 
              style={{ left: '84%', top: '4%' }}
              className="absolute -translate-x-1/2 w-64 text-center group select-none z-20"
            >
              <div className="flex flex-col items-center">
                {/* Clear, Prominent Step Number Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange text-white text-xs font-black shadow-md border-2 border-white mb-2.5">
                  <span>STEP 04</span>
                </div>

                <div className="w-20 h-20 rounded-full bg-white border-2 border-brand-lavender/90 text-brand-navy shadow-card-light flex items-center justify-center group-hover:border-brand-orange group-hover:text-brand-orange group-hover:scale-105 transition-all duration-300 mb-3">
                  <Rocket className="w-8 h-8 stroke-[2]" />
                </div>
                
                <h3 className="text-base font-bold text-brand-midnight group-hover:text-brand-indigo transition-colors">
                  Launch
                </h3>
                <p className="text-[11px] font-semibold text-brand-orange mt-0.5">Zero-Downtime Go Live</p>
                <p className="text-[11px] text-slate-500 mt-1 max-w-[200px] leading-relaxed">Rigorous multi-device QA, SSL encryption, and high-availability deploy.</p>
              </div>
            </div>

            {/* Step 05: Grow (Bottom Right Lobe) */}
            <div 
              style={{ left: '84%', top: '56%' }}
              className="absolute -translate-x-1/2 w-64 text-center group select-none z-20"
            >
              <div className="flex flex-col items-center">
                {/* Clear, Prominent Step Number Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange text-white text-xs font-black shadow-md border-2 border-white mb-2.5">
                  <span>STEP 05</span>
                </div>

                <div className="w-20 h-20 rounded-full bg-white border-2 border-brand-lavender/90 text-brand-navy shadow-card-light flex items-center justify-center group-hover:border-brand-orange group-hover:text-brand-orange group-hover:scale-105 transition-all duration-300 mb-3">
                  <TrendingUp className="w-8 h-8 stroke-[2]" />
                </div>
                
                <h3 className="text-base font-bold text-brand-midnight group-hover:text-brand-indigo transition-colors">
                  Scale & Grow
                </h3>
                <p className="text-[11px] font-semibold text-brand-orange mt-0.5">Continuous Infinity Optimization</p>
                <p className="text-[11px] text-slate-500 mt-1 max-w-[200px] leading-relaxed">Iterative performance enhancements feeding continuously into Discover.</p>
              </div>
            </div>

          </div>
        </div>
        </ScrollReveal>

        {/* ================= MOBILE / TABLET ADAPTIVE FLOW (< 1024px) ================= */}
        <ScrollReveal variant="fadeUp" distance={20} duration={0.6}>
          <div className="lg:hidden relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
            {processSteps.map((step, sIdx) => {
              const IconComp = iconMap[step.iconName] || Search;

              return (
                <ScrollReveal key={step.number} variant="fadeUp" distance={20} delay={sIdx * 0.08}>
                  <div 
                    className="p-6 rounded-3xl bg-white border border-brand-lavender flex items-start gap-4 shadow-sm hover:shadow-lg hover:-translate-y-1.5 hover:border-brand-orange/40 transition-all duration-300 ease-out"
                  >
                    <div className="relative shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-brand-soft text-brand-navy flex items-center justify-center">
                        <IconComp className="w-7 h-7 stroke-[2]" />
                      </div>
                      <span className="absolute -top-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-brand-orange text-white text-[10px] font-black border border-white">
                        {step.number}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange">
                        Step {step.number}
                      </span>
                      <h3 className="text-base font-bold text-brand-midnight">{step.step}</h3>
                      <p className="text-xs font-semibold text-brand-navy mt-0.5">{step.tagline}</p>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* Bottom Clean Infinity Badge */}
      <ScrollReveal variant="fadeUp" distance={14} delay={0.15}>
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-brand-lavender text-xs font-semibold text-slate-700 shadow-sm">
            <InfinityIcon className="w-4 h-4 text-brand-orange" />
            <span>Perpetual Continuous Delivery & Optimization Cycle</span>
          </div>
        </div>
      </ScrollReveal>

      </div>
    </section>
  );
}
