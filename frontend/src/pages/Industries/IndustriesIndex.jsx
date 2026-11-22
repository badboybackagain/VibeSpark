import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, Shield, Zap, TrendingUp, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '../../components/common/SectionHeading';
import IndustryCard from '../../components/cards/IndustryCard';
import ScrollReveal from '../../components/common/ScrollReveal';
import ParticleCanvas from '../../components/animations/ParticleCanvas';
import SEOHead from '../../components/common/SEOHead';
import { industriesData } from '../../data/siteData';
import servicesHeroCinematic from '../../assets/images/services-hero-cinematic.jpg';

const categories = ["All Industries", "Enterprise Tech", "Commerce & Hospitality", "Regulated & Health"];

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

export default function IndustriesIndex() {
  const [selectedCategory, setSelectedCategory] = useState("All Industries");

  const filteredIndustries = industriesData.filter((item) => {
    if (selectedCategory === "All Industries") return true;
    if (selectedCategory === "Enterprise Tech") {
      return ["startups", "professional-services", "manufacturing"].includes(item.id);
    }
    if (selectedCategory === "Commerce & Hospitality") {
      return ["retail", "restaurants", "real-estate"].includes(item.id);
    }
    if (selectedCategory === "Regulated & Health") {
      return ["healthcare", "education", "manufacturing"].includes(item.id);
    }
    return true;
  });

  return (
    <div className="pb-16 bg-brand-soft overflow-x-hidden">
      <SEOHead 
        title="Specialized Industry Digital Solutions & Blueprints | VibeSpark"
        description="Purpose-engineered digital platforms for specialized industries: EdTech, Healthcare, Real Estate, Retail, Restaurants, and Startups. HIPAA, SOC2 & GDPR compliant architecture."
        canonicalUrl="https://vibespark.in/industries"
        keywords="industry software solutions, healthcare web development, real estate proptech, edtech learning platforms, retail ecommerce software Pune"
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Specialized Industry Solutions",
          "url": "https://vibespark.in/industries",
          "description": "Enterprise digital architectures tailored to vertical sector compliance and customer economics."
        }}
      />
      
      {/* ================= CINEMATIC PANORAMIC SECTOR HERO ================= */}
      <section className="relative pt-32 pb-20 sm:pt-36 sm:pb-24 bg-[#03051A] text-white overflow-hidden">
        
        {/* Clean, Crisp Normal Corporate Architecture Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
            alt="Global Enterprise Architectural Towers"
            className="absolute inset-0 w-full h-full object-cover opacity-50 filter brightness-105 contrast-110"
          />
        </div>

        {/* Clean Balanced Scrim (Allows background animation to shine strictly through) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#03051A]/70 via-[#03051A]/50 to-[#03051A]/85 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Centered Editorial Heading with Coordinated Landing */}
          <motion.div 
            variants={heroLandingContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto text-center space-y-4"
          >
            <motion.div variants={heroLandingItem}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-xl border border-white/20 text-brand-lavender shadow-glow-indigo/20">
                <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                <span>Vertical Sector Intelligence</span>
              </div>
            </motion.div>

            <motion.h1 
              variants={heroLandingItem}
              className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight leading-[1.12]"
            >
              Purpose-Engineered Digital Solutions for{' '}
              <span className="bg-gradient-to-r from-brand-orange via-[#FF8E56] to-brand-orange bg-clip-text text-transparent drop-shadow-sm">
                Specialized Industries
              </span>
            </motion.h1>

            <motion.p 
              variants={heroLandingItem}
              className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal"
            >
              From HIPAA-compliant clinical systems and ultra-fast headless retail stores to automated proptech portals, we build vertical architectures tailored to industry compliance and customer economics.
            </motion.p>

            {/* Credibility Chips */}
            <motion.div 
              variants={heroLandingItem}
              className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-slate-300 font-semibold"
            >
              <span className="px-3.5 py-1.5 rounded-full bg-white/[0.07] backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-brand-orange" />
                <span>HIPAA, SOC2 & GDPR Certified</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/[0.07] backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-brand-indigo" />
                <span>Sub-Second Page Latency</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/[0.07] backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-brand-orange" />
                <span>High-Conversion User Journeys</span>
              </span>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ================= PREMIUM INDUSTRY CARDS GRID SECTION ================= */}
      <section id="industry-catalog" className="py-20 lg:py-26 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Intro & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-lavender/40 border border-brand-lavender text-xs font-bold uppercase tracking-wider text-brand-navy mb-3 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span>SPECIALIZED SECTORS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-midnight tracking-tight">
              Enterprise Platforms Crafted for Your Vertical
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/30'
                    : 'bg-white border border-brand-lavender/80 text-brand-midnight hover:bg-brand-soft hover:border-brand-orange/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Balanced Responsive Modern Grid: 1 col on mobile, 2 on tablet, 3 on laptop, 4 on wide desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
          {filteredIndustries.map((industry, indIdx) => (
            <ScrollReveal 
              key={industry.id} 
              variant="fadeUp" 
              distance={24} 
              delay={(indIdx % 4) * 0.08}
            >
              <IndustryCard 
                industry={industry} 
                isGrid={true} 
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Enterprise Bottom Guarantee */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-brand-lavender text-xs font-semibold text-slate-700 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-brand-orange" />
            <span>Dedicated vertical solutions architects assigned to every deployment</span>
          </div>
        </div>

      </section>

      {/* ================= VALUE PROP BANNER ================= */}
      <section className="py-20 bg-white border-y border-brand-lavender/60 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-midnight tracking-tight mb-4">
            Don't See Your Specific Industry?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Our architectural foundation and full-stack capabilities adapt seamlessly to specialized vertical markets, government workflows, and high-concurrency SaaS ecosystems.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-brand-orange to-[#FF6224] hover:from-[#FF6224] hover:to-brand-orange shadow-lg shadow-brand-orange/30 hover:shadow-brand-orange/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
          >
            <span>Consult With An Industry Specialist</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
