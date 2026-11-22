import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ChevronDown, 
  ChevronRight, 
  ShieldCheck, 
  Zap, 
  HelpCircle,
  Layers,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleCanvas from '../../components/animations/ParticleCanvas';
import SEOHead from '../../components/common/SEOHead';
import { serviceDetailsMap } from '../../data/serviceDetailsData';
import { servicesData } from '../../data/siteData';
import servicesHeroCinematic from '../../assets/images/services-hero-cinematic.jpg';
import useScrollReveal from '../../hooks/useScrollReveal';

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

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const service = serviceDetailsMap[serviceId];
  const [openFaq, setOpenFaq] = useState(null);

  const overviewRef = useScrollReveal({ distance: 30 });
  const featuresRef = useScrollReveal({ distance: 30 });
  const processRef = useScrollReveal({ distance: 30 });

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const relatedServices = servicesData.filter(s => s.id !== serviceId).slice(0, 3);

  // Dynamic Service & FAQ Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `https://vibespark.in/services/${serviceId}#service`,
        "name": service.title,
        "description": service.overview,
        "provider": {
          "@type": "Organization",
          "name": "VibeSpark Technologies",
          "url": "https://vibespark.in"
        },
        "areaServed": "Global",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": service.title,
          "itemListElement": service.features?.map((f, i) => ({
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": f.title,
              "description": f.desc
            }
          })) || []
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://vibespark.in/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://vibespark.in/services" },
          { "@type": "ListItem", "position": 3, "name": service.title, "item": `https://vibespark.in/services/${serviceId}` }
        ]
      },
      ...(service.faqs && service.faqs.length > 0 ? [{
        "@type": "FAQPage",
        "mainEntity": service.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }] : [])
    ]
  };

  return (
    <div className="pb-16 bg-brand-soft overflow-x-hidden">
      <SEOHead 
        title={`${service.title} Services in Pune | VibeSpark Technologies`}
        description={service.overview}
        canonicalUrl={`https://vibespark.in/services/${serviceId}`}
        keywords={`${service.title.toLowerCase()}, ${service.title.toLowerCase()} Pune, web agency services, enterprise technology, VibeSpark`}
        schema={serviceSchema}
      />
      
      {/* ================= CINEMATIC 3D HERO HEADER ================= */}
      <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 bg-[#050724] text-white overflow-hidden">
        
        {/* Animated Background Image - Simple Natural Ambient Motion */}
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
            className="absolute -inset-10 bg-cover bg-center bg-no-repeat opacity-50 mix-blend-screen"
            style={{ backgroundImage: `url(${servicesHeroCinematic})` }}
          />

          {/* Ambient Lighting Orbs */}
          <motion.div 
            animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[350px] bg-brand-indigo/30 rounded-full blur-[140px]" 
          />
          <motion.div 
            animate={{ opacity: [0.25, 0.45, 0.25], scale: [1.05, 0.95, 1.05] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-[450px] h-[300px] bg-brand-orange/25 rounded-full blur-[130px]" 
          />
        </div>

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050724]/85 via-[#06082A]/70 to-[#050724] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-brand-lavender/80 mb-6 font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-brand-orange font-semibold">{service.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Header with Coordinated Landing */}
            <motion.div 
              variants={heroLandingContainer}
              initial="hidden"
              animate="visible"
              className="lg:col-span-8 space-y-6"
            >
              <motion.div variants={heroLandingItem}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-xl border border-white/20 text-brand-lavender shadow-glow-indigo/20">
                  <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                  <span>{service.badge}</span>
                </div>
              </motion.div>

              <motion.h1 
                variants={heroLandingItem}
                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]"
              >
                {service.title}
              </motion.h1>

              <motion.p 
                variants={heroLandingItem}
                className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal"
              >
                {service.tagline}
              </motion.p>

              <motion.div variants={heroLandingItem} className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-brand-orange to-[#FF6224] hover:from-[#FF6224] hover:to-brand-orange shadow-lg shadow-brand-orange/30 hover:shadow-brand-orange/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <span>Get Started With This Service</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm text-slate-200 bg-white/10 border border-white/20 hover:bg-white/15 backdrop-blur-md transition-all duration-200"
                >
                  <span>Explore Key Features</span>
                </a>
              </motion.div>
            </motion.div>

            {/* Quick Deliverables Box with Entrance */}
            <motion.div 
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 p-7 rounded-3xl bg-white/[0.06] border border-white/20 backdrop-blur-xl shadow-2xl"
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-orange mb-4 flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Guaranteed Deliverables</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                {service.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ================= DETAILED OVERVIEW SECTION ================= */}
      <section ref={overviewRef} className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
              Strategic Capability
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-midnight leading-tight tracking-tight">
              Why Strategic Implementation Matters For Your Bottom Line
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              {service.overview}
            </p>
            <div className="p-5 rounded-2xl bg-white border border-brand-lavender shadow-sm text-xs text-slate-700 leading-relaxed flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-brand-indigo shrink-0 mt-0.5" />
              <div>
                <strong className="text-brand-midnight block mb-1">Enterprise Engineering Standard</strong>
                Every deployment undergoes rigorous code reviews, automated security scanning, and multi-device usability verification before production release.
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-brand-lavender shadow-2xl relative group">
              <img
                src={service.heroImage}
                alt={service.title}
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-midnight/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </section>

      {/* ================= KEY FEATURES & BENEFITS ================= */}
      <section ref={featuresRef} className="py-20 lg:py-24 bg-white border-y border-brand-lavender/60" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
              Engineered for Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-midnight mt-2 tracking-tight">
              Capabilities & Specialized Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.features.map((feat, idx) => (
              <div 
                key={idx} 
                className="p-8 rounded-3xl bg-brand-soft border border-brand-lavender/80 hover:border-brand-orange/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-navy text-white flex items-center justify-center mb-5 shadow-md">
                    <Zap className="w-6 h-6 text-brand-orange" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-midnight mb-2.5">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4-STEP PROCESS SECTION ================= */}
      <section ref={processRef} className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
            Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-midnight mt-2 tracking-tight">
            Our 4-Stage Execution Roadmap
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.process.map((step) => (
            <div key={step.step} className="p-7 rounded-3xl bg-white border border-brand-lavender/70 shadow-sm hover:shadow-xl hover:border-brand-orange/40 hover:-translate-y-2 transition-all duration-300 ease-out flex flex-col justify-between">
              <div>
                <span className="text-3xl font-black text-brand-orange mb-3 block">
                  {step.step}
                </span>
                <h3 className="text-lg font-bold text-brand-midnight mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FAQ ACCORDION SECTION ================= */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-20 bg-white border-t border-brand-lavender/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                Got Questions?
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-midnight mt-2 tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div 
                    key={idx}
                    className="border border-brand-lavender rounded-2xl overflow-hidden transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-brand-midnight hover:bg-brand-soft/50 transition-colors"
                    >
                      <span className="text-base">{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-brand-orange shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-brand-lavender/50 pt-3"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ================= RELATED SERVICES ================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
            Complementary Solutions
          </span>
          <h2 className="text-3xl font-extrabold text-brand-midnight mt-2">
            Related Digital Capabilities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedServices.map((rel) => (
            <Link
              key={rel.id}
              to={`/services/${rel.id}`}
              className="p-6 rounded-3xl bg-white border border-brand-lavender/80 shadow-sm hover:shadow-xl hover:border-brand-orange/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block mb-2">{rel.category}</span>
                <h3 className="text-lg font-bold text-brand-midnight group-hover:text-brand-orange transition-colors mb-2">
                  {rel.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {rel.shortDesc}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-brand-lavender/40 flex items-center gap-1.5 text-xs font-bold text-brand-midnight group-hover:text-brand-orange">
                <span>View Solution</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
