import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp,
  AlertCircle,
  Award,
  ExternalLink,
  Layers,
  Zap,
  Check,
  HelpCircle,
  Code2,
  Building2,
  ChevronDown,
  Phone,
  Mail,
  Star,
  BookOpen,
  CreditCard,
  MessageSquare,
  Video,
  Calendar,
  Bell,
  Camera,
  MapPin,
  ShoppingBag,
  Sliders,
  RefreshCw,
  MessageCircle,
  Utensils,
  CalendarCheck,
  Monitor,
  Heart,
  Rocket,
  Cloud
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEOHead from '../../components/common/SEOHead';
import ScrollReveal from '../../components/common/ScrollReveal';
import { industryDetailsMap } from '../../data/industryDetailsData';
import servicesHeroCinematic from '../../assets/images/services-hero-cinematic.jpg';
import useScrollReveal from '../../hooks/useScrollReveal';

// Dynamic Icon Resolver
function DeliverableIcon({ name }) {
  const iconProps = { className: "w-5 h-5 text-brand-orange" };
  switch (name) {
    case 'BookOpen': return <BookOpen {...iconProps} />;
    case 'CreditCard': return <CreditCard {...iconProps} />;
    case 'Award': return <Award {...iconProps} />;
    case 'MessageSquare': return <MessageSquare {...iconProps} />;
    case 'Video': return <Video {...iconProps} />;
    case 'Calendar': return <Calendar {...iconProps} />;
    case 'ShieldCheck': return <ShieldCheck {...iconProps} />;
    case 'Bell': return <Bell {...iconProps} />;
    case 'Camera': return <Camera {...iconProps} />;
    case 'MapPin': return <MapPin {...iconProps} />;
    case 'Zap': return <Zap {...iconProps} />;
    case 'Layers': return <Layers {...iconProps} />;
    case 'ShoppingBag': return <ShoppingBag {...iconProps} />;
    case 'Sliders': return <Sliders {...iconProps} />;
    case 'RefreshCw': return <RefreshCw {...iconProps} />;
    case 'MessageCircle': return <MessageCircle {...iconProps} />;
    case 'Utensils': return <Utensils {...iconProps} />;
    case 'CalendarCheck': return <CalendarCheck {...iconProps} />;
    case 'Monitor': return <Monitor {...iconProps} />;
    case 'Heart': return <Heart {...iconProps} />;
    case 'Rocket': return <Rocket {...iconProps} />;
    case 'Cloud': return <Cloud {...iconProps} />;
    default: return <Sparkles {...iconProps} />;
  }
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

export default function IndustryDetail() {
  const { industryId } = useParams();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const industry = industryDetailsMap[industryId] || industryDetailsMap['education'];
  
  const challengesRef = useScrollReveal({ distance: 30 });
  const deliverablesRef = useScrollReveal({ distance: 30 });
  const caseStudyRef = useScrollReveal({ distance: 30 });

  return (
    <div className="pb-16 bg-[#FAFAFC] overflow-x-hidden font-sans">
      <SEOHead 
        title={`${industry.title} | Specialized Engineering Solutions | VibeSpark`}
        description={industry.overview}
        canonicalUrl={`https://vibespark.in/industries/${industryId}`}
        keywords={`${industry.title.toLowerCase()}, digital engineering Pune, custom software India, ${industryId} web architecture, enterprise development`}
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": industry.title,
          "description": industry.overview,
          "provider": {
            "@type": "Organization",
            "name": "VibeSpark Technologies",
            "url": "https://vibespark.in",
            "telephone": "+91-90284-46832",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Nyati Ethereal, Kharadi",
              "addressLocality": "Pune",
              "postalCode": "411014",
              "addressCountry": "IN"
            }
          }
        }}
      />
      
      {/* ================= 1. CINEMATIC 3D HERO HEADER ================= */}
      <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 bg-[#050724] text-white overflow-hidden">
        
        {/* Animated Background Image */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1.02, 1.08, 1.02],
              x: [0, 14, -12, 0],
              y: [0, -8, 6, 0]
            }}
            transition={{ 
              duration: 22, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute -inset-10 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen"
            style={{ backgroundImage: `url(${servicesHeroCinematic})` }}
          />

          {/* Ambient Lighting Orbs */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[350px] bg-brand-indigo/25 rounded-full blur-[140px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[300px] bg-brand-orange/20 rounded-full blur-[130px]" />
        </div>

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050724]/85 via-[#06082A]/70 to-[#050724] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-brand-lavender/80 mb-6 font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <Link to="/industries" className="hover:text-white transition-colors">Industries</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-brand-orange font-semibold">{industry.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column (7 cols): Typography, Badges & CTA */}
            <motion.div 
              variants={heroLandingContainer}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 space-y-6"
            >
              <motion.div variants={heroLandingItem}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-xl border border-white/20 text-brand-lavender shadow-glow-indigo/20">
                  <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                  <span>{industry.badge}</span>
                </div>
              </motion.div>

              <motion.h1 
                variants={heroLandingItem}
                className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.12]"
              >
                {industry.title}
              </motion.h1>

              <motion.p 
                variants={heroLandingItem}
                className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal"
              >
                {industry.tagline}
              </motion.p>

              {/* Credibility Badges */}
              <motion.div variants={heroLandingItem} className="flex flex-wrap items-center gap-2.5 pt-1 text-xs text-slate-300 font-semibold">
                <span className="px-3 py-1 rounded-full bg-white/[0.08] border border-white/10 flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Full Code & IP Ownership</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-white/[0.08] border border-white/10 flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>99.98% High-Availability SLA</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-white/[0.08] border border-white/10 flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Turnkey Deployment</span>
                </span>
              </motion.div>

              <motion.div variants={heroLandingItem} className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-brand-orange to-[#FF6224] hover:from-[#FF6224] hover:to-brand-orange shadow-lg shadow-brand-orange/30 hover:shadow-brand-orange/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <span>Request Architecture Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {industry.caseStudy && (
                  <a
                    href="#case-study"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm text-slate-200 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 backdrop-blur-md transition-all duration-200"
                  >
                    <span>Explore Case Study</span>
                    <ChevronRight className="w-4 h-4 text-brand-orange" />
                  </a>
                )}
              </motion.div>
            </motion.div>

            {/* Right Column (5 cols): 3D Glass Interactive Telemetry Showcase Pod */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative mt-6 lg:mt-0"
            >
              {/* Outer Radiant Ambient Glows */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-brand-indigo via-brand-royal-blue to-brand-orange rounded-3xl opacity-35 blur-2xl pointer-events-none" />
              <div className="absolute -top-10 -right-10 w-44 h-44 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />

              {/* Glass Frame Container */}
              <div className="relative rounded-2xl sm:rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.12] via-slate-900/80 to-[#04061A]/95 backdrop-blur-2xl shadow-2xl overflow-hidden p-3.5 sm:p-4">
                
                {/* Header status bar inside the card */}
                <div className="flex items-center justify-between pb-3 px-1 border-b border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-slate-300 font-semibold tracking-wide text-[11px] sm:text-xs">Tier-1 Production Stack</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-indigo/30 border border-brand-indigo/50 text-[10px] font-bold text-brand-lavender uppercase tracking-wider">
                    {industry.badge}
                  </span>
                </div>

                {/* Visual Image Preview with dynamic gradient vignette */}
                <div className="relative mt-3 rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 group aspect-[16/10]">
                  <img
                    src={industry.heroImage || servicesHeroCinematic}
                    alt={`${industry.title} Enterprise Architecture`}
                    className="w-full h-full object-cover object-center filter contrast-105 brightness-95 group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                    fetchpriority="high"
                    decoding="async"
                    width="640"
                    height="400"
                  />
                  {/* Subtle vignette overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04061A] via-[#04061A]/30 to-transparent pointer-events-none" />

                  {/* Floating Telemetry Metric Over Image: Top Left */}
                  {industry.stats?.[0] && (
                    <div className="absolute top-3 left-3 px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/20 shadow-lg flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                      <div>
                        <p className="text-[10px] text-slate-300 font-medium leading-none">{industry.stats[0].label}</p>
                        <p className="text-sm font-extrabold text-white leading-tight mt-0.5">{industry.stats[0].value}</p>
                      </div>
                    </div>
                  )}

                  {/* Floating Telemetry Metric Over Image: Bottom Right */}
                  {industry.caseStudy?.metric && (
                    <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 shadow-lg flex items-center gap-2">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-xs font-bold text-emerald-300">{industry.caseStudy.metric}</span>
                    </div>
                  )}
                </div>

                {/* Bottom Spec Sheet / Telemetry Grid */}
                <div className="mt-3.5 space-y-2.5 px-1">
                  {industry.caseStudy && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Verified Case:</span>
                      <span className="text-white font-semibold truncate max-w-[220px]">{industry.caseStudy.client}</span>
                    </div>
                  )}

                  {/* Mini Tech Stack Pills */}
                  {industry.techStack && (
                    <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mr-1">Stack:</span>
                      {industry.techStack.slice(0, 4).map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-white/[0.07] border border-white/10 text-[10px] font-semibold text-slate-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Compliance Guarantee Bar */}
                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      100% Code & IP Ownership
                    </span>
                    <span className="text-slate-400 text-[10px]">Zero-Lockin Guarantee</span>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ================= 2. ENHANCED IMPACT STATS RIBBON ================= */}
      {industry.stats && (
        <section className="bg-white border-b border-slate-200 py-10 shadow-sm relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {industry.stats.map((s, idx) => (
                <ScrollReveal key={idx} variant="fadeUp" distance={20} delay={idx * 0.1}>
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-xl hover:border-brand-orange/40 hover:-translate-y-2 transition-all duration-300 ease-out group h-full flex flex-col justify-center">
                    <p className="text-3xl sm:text-5xl font-black text-brand-orange tracking-tight group-hover:scale-105 transition-transform">
                      {s.value}
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 mt-2 uppercase tracking-wider">
                      {s.label}
                    </p>
                    {s.desc && (
                      <p className="text-[11px] text-slate-500 mt-1">
                        {s.desc}
                      </p>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= 3. PROBLEM VS ENGINEERED SOLUTION COMPARISON ================= */}
      <section ref={challengesRef} className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-200 inline-block mb-3">
            Strategic Alignment
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Eliminating Bottlenecks. Engineering Growth.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            How our sector-focused engineering methodology replaces legacy roadblocks with high-converting digital infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Challenges Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider mb-4">
                <AlertCircle className="w-4 h-4" />
                <span>Sector Bottlenecks We Eliminate</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-6">
                Common Industry Roadblocks
              </h3>
              <ul className="space-y-4">
                {industry.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed p-3 rounded-xl bg-rose-50/50 border border-rose-100/60">
                    <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
              ⚠️ Legacy systems drain up to 35% of operational efficiency and cause customer churn.
            </div>
          </div>

          {/* Solutions Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#060826] text-white border border-[#403CFF]/40 shadow-2xl space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-brand-orange font-bold text-xs uppercase tracking-wider mb-4">
                <ShieldCheck className="w-4 h-4" />
                <span>The VibeSpark Solution</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-6">
                Engineered Strategic Framework
              </h3>
              <div className="space-y-4">
                {industry.solutions.map((s, i) => (
                  <div key={i} className="p-4 sm:p-5 rounded-2xl bg-white/[0.06] border border-white/10 hover:border-brand-orange/50 transition-colors">
                    <div className="flex items-center gap-2 mb-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <h4 className="text-sm sm:text-base font-bold text-white">{s.title}</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs text-slate-400">
              ⚡ Guaranteed turn-key architecture with 100% intellectual property & source-code ownership.
            </div>
          </div>

        </div>
      </section>

      {/* ================= 4. CORE DELIVERABLES & TECHNICAL MODULES ================= */}
      {industry.deliverables && (
        <section ref={deliverablesRef} className="py-20 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-200 inline-block mb-3">
                Full-Stack Architecture
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Specialized Technical Deliverables
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Bespoke digital modules engineered to integrate seamlessly with your operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industry.deliverables.map((item, index) => (
                <ScrollReveal 
                  key={index} 
                  variant="fadeUp" 
                  distance={22} 
                  delay={(index % 4) * 0.08}
                >
                  <div 
                    className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/90 hover:bg-white hover:border-brand-orange/40 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out flex flex-col justify-between group h-full"
                  >
                    <div>
                      <div className="w-11 h-11 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-brand-orange group-hover:text-white transition-all shadow-sm">
                        <DeliverableIcon name={item.icon} />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-brand-orange transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <div className="pt-5 mt-4 border-t border-slate-200/60 flex items-center text-[11px] font-bold text-brand-orange">
                      <span>Enterprise Verified</span>
                      <Check className="w-3 h-3 ml-1 text-emerald-500" />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ================= 5. REAL CLIENT CASE STUDY SPOTLIGHT ================= */}
      {industry.caseStudy && (
        <section id="case-study" ref={caseStudyRef} className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="p-8 sm:p-12 rounded-3xl bg-[#070928] text-white border border-[#403CFF]/40 shadow-2xl relative overflow-hidden">
            {/* Ambient Lighting Orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/20 text-xs font-bold text-brand-orange">
                  <Award className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Verified Production Case Study</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {industry.caseStudy.client}
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  Live Deployment: {industry.caseStudy.domain}
                </p>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl pt-2">
                  {industry.caseStudy.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {industry.caseStudy.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/10 text-[11px] font-medium text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metric Card */}
              <div className="lg:col-span-4 p-6 rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/15 text-center space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                  Verified Outcome
                </span>
                <p className="text-3xl sm:text-4xl font-black text-brand-orange">
                  {industry.caseStudy.metric}
                </p>
                <p className="text-xs text-slate-300 font-medium">
                  {industry.caseStudy.headline}
                </p>
                <div className="pt-3">
                  <Link
                    to="/portfolio"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-white transition-colors"
                  >
                    <span>View in Showcase Portfolio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </section>
      )}

      {/* ================= 6. TECHNOLOGY STACK ECOSYSTEM ================= */}
      {industry.techStack && (
        <section className="py-16 bg-white border-b border-slate-200 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Verified Technology Foundation
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-6">
              Modern Tech Stacks Powering This Sector
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
              {industry.techStack.map((tech, i) => (
                <span 
                  key={i}
                  className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 shadow-sm hover:border-brand-orange hover:text-brand-orange transition-colors flex items-center gap-2"
                >
                  <Code2 className="w-3.5 h-3.5 text-brand-orange" />
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= 7. SECTOR FAQS ACCORDION ================= */}
      {industry.faqs && (
        <section className="py-16 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-200 inline-block mb-3">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Sector Implementation Insights
            </h2>
          </div>

          <div className="space-y-3.5">
            {industry.faqs.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div 
                  key={i}
                  className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : i)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-brand-orange transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-orange' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
}
