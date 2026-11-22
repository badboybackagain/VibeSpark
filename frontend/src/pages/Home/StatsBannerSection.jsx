import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Building2, Briefcase, Award } from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';
import { statsData } from '../../data/siteData';

export default function StatsBannerSection() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState(statsData.map(() => 0));
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          statsData.forEach((stat, index) => {
            const target = stat.value;
            const duration = 1800; // ms
            const stepTime = 25;
            const steps = Math.ceil(duration / stepTime);
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              setCounts((prev) => {
                const next = [...prev];
                next[index] = Math.floor(current);
                return next;
              });
            }, stepTime);
          });
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const statIcons = [Briefcase, Building2, Award];

  return (
    <section 
      ref={sectionRef} 
      className="relative py-24 lg:py-28 bg-gradient-to-b from-[#04061A] via-brand-midnight to-[#06082A] text-white overflow-hidden"
    >
      {/* Background City Skyline & Perspective Lighting */}
      <div 
        className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1600&q=80')`
        }}
      />

      {/* Atmospheric lighting orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[350px] bg-brand-indigo/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[450px] h-[350px] bg-brand-orange/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Cyber Grid Lines Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Stats Grid (7 cols) */}
          <div className="lg:col-span-7">
            <ScrollReveal variant="fadeUp" distance={24} duration={0.65}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
                {statsData.map((stat, idx) => {
                  const Icon = statIcons[idx % statIcons.length];

                  return (
                    <ScrollReveal key={idx} variant="fadeUp" distance={24} delay={idx * 0.1}>
                      <div 
                        className="p-6 rounded-2xl bg-[#080B33]/90 border border-white/10 hover:border-brand-orange/50 hover:bg-[#0C1042] hover:-translate-y-2 hover:shadow-[0_16px_36px_-8px_rgba(244,119,59,0.25)] transition-all duration-300 ease-out space-y-3 group"
                      >
                        <div className="flex items-center justify-center sm:justify-start gap-2.5 text-brand-orange">
                          <div className="w-8 h-8 rounded-lg bg-brand-orange/15 flex items-center justify-center border border-brand-orange/30 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-3xl sm:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-black text-white tracking-tight">
                            {counts[idx]}
                            <span className="text-brand-orange">{stat.suffix}</span>
                          </span>
                        </div>

                        <h4 className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-brand-orange transition-colors">
                          {stat.label}
                        </h4>

                        <p className="text-xs text-brand-lavender/70 leading-relaxed">
                          {stat.desc}
                        </p>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Message & Action (5 cols) */}
          <div className="lg:col-span-5">
            <ScrollReveal variant="fadeLeft" distance={20} delay={0.15}>
              <div className="flex flex-col xl:flex-row items-center lg:items-start xl:items-center lg:justify-end gap-6 text-center sm:text-left pl-0 lg:pl-6">
                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                    Scalable Partnership
                  </span>
                  <p className="text-xl sm:text-2xl xl:text-3xl font-extrabold text-white tracking-tight leading-snug">
                    Let's Build Something Great Together
                  </p>
                  <p className="text-xs text-brand-lavender/80">
                    Consult with our digital architects & strategy team.
                  </p>
                </div>

                <Link
                  to="/contact"
                  className="shrink-0 inline-flex items-center gap-2.5 px-6 py-3.5 sm:px-7 sm:py-4 rounded-full font-bold text-sm text-white bg-gradient-to-r from-brand-orange to-[#FF6224] hover:from-[#FF6224] hover:to-brand-orange shadow-lg shadow-brand-orange/35 hover:scale-105 active:scale-95 transition-all"
                >
                  <span>Get in Touch</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
