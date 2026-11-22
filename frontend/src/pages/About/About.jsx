import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Target, 
  Eye, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  HeartHandshake,
  Award,
  Building2,
  Users,
  Layers,
  Cpu
} from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '../../components/common/SectionHeading';
import ScrollReveal from '../../components/common/ScrollReveal';
import ParticleCanvas from '../../components/animations/ParticleCanvas';
import SEOHead from '../../components/common/SEOHead';
import aboutHeroCinematic from '../../assets/images/about-hero-cinematic.jpg';

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

export default function About() {
  const values = [
    {
      badge: "Modern Tech Stack",
      title: "Innovation Without Gimmicks",
      desc: "We adopt modern technologies (React, Next.js, Cloud architectures) because they yield measurable speed and reliability, not just buzz.",
      icon: Zap,
      theme: "orange",
      pillBg: "bg-orange-500/10 text-brand-orange border-orange-500/25",
      iconBg: "bg-brand-orange/15 text-brand-orange border-brand-orange/30 group-hover:bg-brand-orange group-hover:text-white",
      barGradient: "bg-gradient-to-r from-brand-orange via-[#FF925C] to-brand-orange",
      checkColor: "text-brand-orange"
    },
    {
      badge: "Cost Effective & Honest",
      title: "Integrity & Transparency",
      desc: "No hidden fees, no opaque roadmaps, and no fabricated metrics. We operate with open communication and deliver on our promises.",
      icon: ShieldCheck,
      theme: "indigo",
      pillBg: "bg-indigo-500/10 text-brand-indigo border-indigo-500/25",
      iconBg: "bg-brand-indigo/15 text-brand-indigo border-brand-indigo/30 group-hover:bg-brand-indigo group-hover:text-white",
      barGradient: "bg-gradient-to-r from-brand-indigo via-brand-royal-blue to-brand-indigo",
      checkColor: "text-brand-indigo"
    },
    {
      badge: "Result Driven",
      title: "Obsession with Client ROI",
      desc: "Beautiful UI is table stakes. We architect websites and campaigns specifically engineered to turn traffic into qualified revenue.",
      icon: Target,
      theme: "emerald",
      pillBg: "bg-emerald-500/10 text-emerald-600 border-emerald-500/25",
      iconBg: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30 group-hover:bg-emerald-600 group-hover:text-white",
      barGradient: "bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500",
      checkColor: "text-emerald-600"
    },
    {
      badge: "Scalable Solutions",
      title: "Cloud-Native Scalability",
      desc: "Engineered from day one for sub-second page loads, automated zero-downtime failover, and high-concurrency peak traffic resilience.",
      icon: Layers,
      theme: "cyan",
      pillBg: "bg-cyan-500/10 text-cyan-600 border-cyan-500/25",
      iconBg: "bg-cyan-500/15 text-cyan-600 border-cyan-500/30 group-hover:bg-cyan-600 group-hover:text-white",
      barGradient: "bg-gradient-to-r from-cyan-500 via-sky-400 to-cyan-500",
      checkColor: "text-cyan-600"
    },
    {
      badge: "Expert Team",
      title: "Senior In-House Engineering",
      desc: "Collaborate directly with senior developers and solution architects with battle-tested expertise—no juniors or outsourced handoffs.",
      icon: Users,
      theme: "purple",
      pillBg: "bg-purple-500/10 text-purple-600 border-purple-500/25",
      iconBg: "bg-purple-500/15 text-purple-600 border-purple-500/30 group-hover:bg-purple-600 group-hover:text-white",
      barGradient: "bg-gradient-to-r from-purple-500 via-violet-400 to-purple-500",
      checkColor: "text-purple-600"
    },
    {
      badge: "Long-Term Partnership",
      title: "Continuous Digital Moat",
      desc: "We don't abandon you after launch. Our ongoing support, maintenance, and growth advisory protect and expand your digital advantage.",
      icon: HeartHandshake,
      theme: "rose",
      pillBg: "bg-rose-500/10 text-rose-600 border-rose-500/25",
      iconBg: "bg-rose-500/15 text-rose-600 border-rose-500/30 group-hover:bg-rose-600 group-hover:text-white",
      barGradient: "bg-gradient-to-r from-rose-500 via-pink-400 to-rose-500",
      checkColor: "text-rose-600"
    }
  ];

  return (
    <div className="pb-16 bg-brand-soft overflow-x-hidden">
      <SEOHead 
        title="About VibeSpark Technologies | Mission, Leadership & Engineering Culture"
        description="Learn about VibeSpark Technologies — an elite digital engineering & SEO growth agency in Pune. Discover our people-first ethos, technical standards, and delivery track record."
        canonicalUrl="https://vibespark.in/about"
        keywords="about VibeSpark Technologies, Pune tech agency team, digital engineering leadership, software development Pune, tech agency philosophy"
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About VibeSpark Technologies",
          "url": "https://vibespark.in/about",
          "description": "Learn about VibeSpark Technologies' mission, engineering principles, and senior development team.",
          "mainEntity": {
            "@type": "Organization",
            "name": "VibeSpark Technologies",
            "url": "https://vibespark.in"
          }
        }}
      />
      
      {/* ================= CINEMATIC 3D ABOUT HERO SECTION ================= */}
      <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 bg-[#050724] text-white overflow-hidden">
        
        {/* Animated Cinematic 3D Background Visual */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1.02, 1.08, 1.02],
              x: [0, 14, -12, 0],
              y: [0, -8, 6, 0]
            }}
            transition={{ 
              duration: 18, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute -inset-10 bg-cover bg-center bg-no-repeat opacity-55"
            style={{ backgroundImage: `url(${aboutHeroCinematic})` }}
          />

          {/* Clean Glassmorphic Scrim (Zero heavy dark mud) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050724]/70 via-[#050724]/50 to-[#050724]/85" />

          {/* Ambient Glowing Atmospheric Pulses */}
          <motion.div 
            animate={{ 
              x: [0, 30, -20, 0], 
              y: [0, -20, 15, 0],
              opacity: [0.35, 0.55, 0.35] 
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[400px] bg-brand-indigo/35 rounded-full blur-[140px]" 
          />
          <motion.div 
            animate={{ 
              x: [0, -25, 20, 0], 
              y: [0, 18, -15, 0],
              opacity: [0.25, 0.45, 0.25] 
            }}
            transition={{ 
              duration: 14, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1 
            }}
            className="absolute bottom-1/4 right-1/4 w-[450px] h-[350px] bg-brand-orange/30 rounded-full blur-[130px]" 
          />
        </div>

        {/* Ambient Dark Gradient Overlays for Maximum Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050724]/85 via-[#06082A]/70 to-[#050724] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-indigo/15 via-transparent to-transparent pointer-events-none" />

        {/* Perspective Matrix Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />

        {/* Hero Content with Smooth Coordinated Landing */}
        <motion.div 
          variants={heroLandingContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
        >
          
          {/* Badge */}
          <motion.div variants={heroLandingItem}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-xl border border-white/20 text-brand-lavender mb-6 shadow-glow-indigo/20">
              <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
              <span>About VibeSpark Technologies</span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={heroLandingItem}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] mb-6"
          >
            Powering Ideas.{' '}
            <span className="bg-gradient-to-r from-brand-orange via-[#FF8E56] to-brand-orange bg-clip-text text-transparent drop-shadow-sm">
              Creating Digital Experiences.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={heroLandingItem}
            className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-normal"
          >
            We are a team of passionate software engineers, digital strategists, and creative designers dedicated to building high-performance web solutions that fuel sustainable business growth.
          </motion.p>

          {/* Call to Actions */}
          <motion.div 
            variants={heroLandingItem}
            className="flex flex-wrap items-center justify-center gap-4 mb-10"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-brand-orange to-[#FF6224] hover:from-[#FF6224] hover:to-brand-orange shadow-lg shadow-brand-orange/30 hover:shadow-brand-orange/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all"
            >
              <span>View Case Studies</span>
            </Link>
          </motion.div>

          {/* Quick Credibility Pills */}
          <motion.div 
            variants={heroLandingItem}
            className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300 font-semibold"
          >
            <span className="px-3.5 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-brand-orange" />
              <span>Nyati Ethereal, Kharadi, Pune</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-brand-indigo" />
              <span>60+ Production Deployments</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-brand-orange" />
              <span>100% In-House Engineering</span>
            </span>
          </motion.div>

        </motion.div>
      </section>

      {/* ================= MISSION & PURPOSE SECTION ================= */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute top-1/2 left-0 w-[450px] h-[350px] bg-brand-indigo/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-[400px] h-[300px] bg-brand-orange/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
          
          {/* Left Team Photo Showcase */}
          <ScrollReveal variant="fadeRight" distance={24}>
            <div className="relative">
              <div className="relative rounded-[32px] overflow-hidden border border-brand-lavender/80 shadow-2xl bg-white group">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                  alt="VibeSpark Team Collaboration"
                  className="w-full h-[400px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-midnight/80 via-transparent to-transparent pointer-events-none" />
              </div>
              
              {/* Floating Glass Stats Pod */}
              <div className="absolute -bottom-6 right-2 sm:-right-4 lg:-right-6 p-5 sm:p-6 rounded-2xl bg-[#080B35]/95 backdrop-blur-xl text-white border border-[#403CFF]/30 shadow-2xl max-w-[260px] sm:max-w-xs">
                <p className="text-3xl sm:text-4xl font-extrabold text-brand-orange">10+</p>
                <p className="text-xs font-semibold text-white mt-1">Years of Combined Technical Expertise</p>
                <p className="text-[11px] text-slate-300 mt-1">Full-stack web engineering & digital marketing</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Content */}
          <ScrollReveal variant="fadeLeft" distance={24} delay={0.1}>
            <div className="space-y-8">
              <SectionHeading
                badge="Our Purpose"
                title="Transforming Vision Into"
                highlight="Measurable Reality"
                description="From local enterprises to international brands, we craft digital products that look stunning and perform reliably under real-world pressure."
                className="mb-0"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                
                {/* Mission Card */}
                <ScrollReveal variant="fadeUp" distance={20} delay={0.08}>
                  <div className="p-6 sm:p-7 rounded-[24px] bg-white border border-brand-lavender/80 shadow-card-light hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group h-full flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-brand-navy/10 text-brand-navy flex items-center justify-center mb-4 group-hover:bg-brand-navy group-hover:text-white transition-colors duration-300 shadow-sm">
                        <Target className="w-6 h-6 stroke-[2.2]" />
                      </div>
                      <h3 className="text-lg font-bold text-brand-midnight mb-2 group-hover:text-brand-navy transition-colors">
                        Our Mission
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        To democratize enterprise-grade web engineering and ROI-focused marketing for ambitious businesses of all sizes.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Vision Card */}
                <ScrollReveal variant="fadeUp" distance={20} delay={0.16}>
                  <div className="p-6 sm:p-7 rounded-[24px] bg-white border border-brand-lavender/80 shadow-card-light hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group h-full flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-brand-orange/15 text-brand-orange flex items-center justify-center mb-4 group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300 shadow-sm">
                        <Eye className="w-6 h-6 stroke-[2.2]" />
                      </div>
                      <h3 className="text-lg font-bold text-brand-midnight mb-2 group-hover:text-brand-orange transition-colors">
                        Our Vision
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        To be India's premier digital technology partner recognized for innovation, technical integrity, and uncompromising client satisfaction.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ================= CORE VALUES SECTION ================= */}
      <section className="py-20 lg:py-26 bg-white border-y border-brand-lavender/60 relative overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-indigo/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="The VibeSpark Code"
            title="Our Core Values"
            highlight="Drive Everything We Build"
            align="center"
          />

          {/* Cascading Staggered Falling Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {values.map((v, i) => {
              const IconComp = v.icon;

              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 28, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.16, 1, 0.3, 1], 
                    delay: (i % 3) * 0.1 
                  }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02, 
                    transition: { duration: 0.25, ease: "easeOut" } 
                  }}
                  className="group relative p-7 rounded-[28px] bg-gradient-to-b from-white to-slate-50/70 border border-brand-lavender/90 shadow-[0_10px_30px_-10px_rgba(8,11,53,0.06)] hover:shadow-[0_25px_50px_-12px_rgba(8,11,53,0.16)] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default"
                >
                  {/* Top Edge Illumination Bar */}
                  <div 
                    className={`absolute top-0 left-0 right-0 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${v.barGradient}`} 
                  />

                  <div>
                    {/* Top Row: Icon Container + Colorful Badge Pill (Like Reference Cards) */}
                    <div className="flex items-center justify-between mb-5">
                      <div 
                        className={`w-13 h-13 rounded-2xl flex items-center justify-center p-3 shadow-md border transition-transform duration-300 group-hover:scale-110 ${v.iconBg}`}
                      >
                        <IconComp className="w-6 h-6 stroke-[2.2]" />
                      </div>

                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border shadow-xs ${v.pillBg}`}>
                        {v.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-brand-midnight group-hover:text-brand-orange transition-colors duration-200 mb-2.5">
                      {v.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {v.desc}
                    </p>
                  </div>

                  {/* Bottom Verification Checkmark */}
                  <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                    <span className="flex items-center gap-1.5 group-hover:text-brand-midnight transition-colors">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${v.checkColor}`} />
                      <span>Core Principle Verified</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">0{i + 1}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
