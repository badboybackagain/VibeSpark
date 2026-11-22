import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ExternalLink, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Award, 
  TrendingUp,
  Database,
  Search,
  Video,
  MapPin,
  Activity,
  Gauge,
  Code2
} from 'lucide-react';
import { motion } from 'framer-motion';
import SEOHead from '../../components/common/SEOHead';
import ScrollReveal from '../../components/common/ScrollReveal';
import servicesHeroCinematic from '../../assets/images/services-hero-cinematic.jpg';
import useScrollReveal from '../../hooks/useScrollReveal';

// Dedicated Tech Icon Component - Small authentic icons instead of bulky rectangular boxes
function TechIcon({ name }) {
  const n = (name || '').toLowerCase();
  
  if (n.includes('react')) {
    return (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-3.5 h-3.5 text-[#00D8FF] fill-none stroke-current" strokeWidth="1.3">
        <circle r="2" fill="currentColor" />
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </svg>
    );
  }
  if (n.includes('next')) {
    return (
      <svg viewBox="0 0 180 180" className="w-3.5 h-3.5 fill-current text-slate-900">
        <circle cx="90" cy="90" fill="currentColor" r="90" />
        <path d="M149.5 157.4L69.1 54H54v72h12.1V69.4l73.9 95.4c3.3-2.2 6.5-4.7 9.5-7.4z" fill="white" />
        <rect fill="white" height="72" width="12" x="115" y="54" />
      </svg>
    );
  }
  if (n.includes('tailwind')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-[#38BDF8]">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
      </svg>
    );
  }
  if (n.includes('node')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-[#68A063]">
        <path d="M12 2l9 5.2v10.4L12 22.8 3 17.6V7.2L12 2zm0 2.3L5 8.3v7.4l7 4 7-4V8.3l-7-4z" />
      </svg>
    );
  }
  if (n.includes('aws') || n.includes('cloud')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-[#FF9900]">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
      </svg>
    );
  }
  if (n.includes('shopify')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-[#95BF47]">
        <path d="M15.33 3.67c-.03-.27-.2-.5-.45-.61l-5.6-2.5a.69.69 0 0 0-.63.05l-4.1 2.82c-.2.14-.3.38-.28.62l1.62 16.5c.03.3.26.54.56.57l9.46.95a.69.69 0 0 0 .74-.55l2.06-16.85c.03-.27-.1-.53-.33-.67l-2.05-.38z" />
      </svg>
    );
  }
  if (n.includes('graphql')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-[#E10098]">
        <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2zm0 2.3L5.34 8.15v7.7L12 19.7l6.66-3.85v-7.7L12 4.3z" />
      </svg>
    );
  }
  if (n.includes('python') || n.includes('fastapi')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-[#009688]">
        <path d="M12 2l-7 12h5l-1 8 8-12h-5l2-8z" />
      </svg>
    );
  }
  if (n.includes('postgres') || n.includes('sql') || n.includes('database')) {
    return <Database className="w-3.5 h-3.5 text-[#336791]" />;
  }
  if (n.includes('docker')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-[#0db7ed]">
        <path d="M22.5 10.5c-.3-.2-1.7-.3-2.5.3-.5-.7-1.3-1.1-2.2-1.1-.3 0-.6.1-.9.2V8.5c0-.3-.2-.5-.5-.5h-2.5c-.3 0-.5.2-.5.5v1H11v-1c0-.3-.2-.5-.5-.5H8c-.3 0-.5.2-.5.5v1H5v-1c0-.3-.2-.5-.5-.5H2c-.3 0-.5.2-.5.5v3.8c0 3.8 3.1 7.2 8.5 7.2 5.3 0 9.5-3 10-7.7.9-.1 2-.7 2.5-1.8z" />
      </svg>
    );
  }
  if (n.includes('algolia') || n.includes('search')) {
    return <Search className="w-3.5 h-3.5 text-[#003DFF]" />;
  }
  if (n.includes('webrtc') || n.includes('video')) {
    return <Video className="w-3.5 h-3.5 text-[#FF4500]" />;
  }
  if (n.includes('gsap') || n.includes('motion')) {
    return <Sparkles className="w-3.5 h-3.5 text-[#0AE448]" />;
  }
  if (n.includes('mapbox') || n.includes('map')) {
    return <MapPin className="w-3.5 h-3.5 text-[#4264FB]" />;
  }
  if (n.includes('socket')) {
    return <Activity className="w-3.5 h-3.5 text-slate-800" />;
  }
  if (n.includes('seo')) {
    return <TrendingUp className="w-3.5 h-3.5 text-[#FF6224]" />;
  }
  if (n.includes('vitals') || n.includes('core')) {
    return <Gauge className="w-3.5 h-3.5 text-[#00C49F]" />;
  }
  if (n.includes('content') || n.includes('strategy')) {
    return <Layers className="w-3.5 h-3.5 text-[#8884D8]" />;
  }

  return <Code2 className="w-3.5 h-3.5 text-brand-orange" />;
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

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const gridRef = useScrollReveal({ distance: 30 });

  const categories = ['All', 'Web Development', 'E-commerce', 'Custom Software', 'SEO & Growth'];

  const projects = [
    {
      id: 1,
      title: "Sahara Seats - Custom Seat Manufacturer Portal",
      client: "Sahara Seats India (saharaseats.com)",
      category: "E-commerce",
      metrics: "4.8x Online Sales Surge",
      desc: "High-performance custom automotive seating e-commerce portal featuring interactive seat visualizers, multi-variant catalogs, and seamless Razorpay/Stripe checkout funnels.",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
      tags: ["Shopify / Custom React", "Node.js", "Payment Gateway", "Tailwind CSS"],
      highlights: ["Interactive 3D Product Visualizer", "+68% Mobile Checkout Boost"],
      timeline: "Verified Production Deployment"
    },
    {
      id: 2,
      title: "Travel Saga Dubai - Tour & Excursion Booking Engine",
      client: "Travel Saga Tourism LLC (travelsaga.com)",
      category: "Custom Software",
      metrics: "10k+ Monthly Bookings",
      desc: "Enterprise travel booking engine with real-time tour scheduling, multi-currency processing, dynamic WhatsApp ticket delivery, and automated dispatch workflows.",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
      tags: ["React / Next.js", "REST APIs", "AWS Cloud", "WhatsApp Gateway"],
      highlights: ["Sub-Second Global Search", "Automated WhatsApp Voucher Dispatch"],
      timeline: "Enterprise Retainer"
    },
    {
      id: 3,
      title: "Solitaire Luxury Living & Business Hub Portals",
      client: "Solitaire Group (solitairehomes.in)",
      category: "Web Development",
      metrics: "+185% Qualified Buyer Leads",
      desc: "Architectural real estate presentation platform with interactive master layouts, virtual floor plan walkthroughs, and automated sales CRM dispatch.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      tags: ["Next.js", "GSAP Motion", "Tailwind CSS", "CRM Integration"],
      highlights: ["Ultra-Smooth Micro-Animations", "Instant Agent Notification Webhooks"],
      timeline: "Verified Production Deployment"
    },
    {
      id: 4,
      title: "Kerala Ayurved - Clinical Portal & Consultation Suite",
      client: "Kerala Ayurved Pune (keralaayurvedpune.com)",
      category: "Custom Software",
      metrics: "3,500+ Monthly Appointments",
      desc: "Holistic wellness clinic web application with automated doctor scheduling, treatment consultation booking, and personalized patient intake workflows.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
      tags: ["React.js", "Node.js", "PostgreSQL", "SMS/WhatsApp Alerts"],
      highlights: ["Automated Appointment Reminders", "Zero-Wait Queue Management"],
      timeline: "Verified Production Deployment"
    },
    {
      id: 5,
      title: "AIMS Institute - Academic Curriculum & Admission Suite",
      client: "AIMS Institute (aimsinstitute.in / dbhs.edu.in)",
      category: "Web Development",
      metrics: "+140% Online Student Admissions",
      desc: "Next-generation institutional education platform featuring digitized course catalogs, fee payment gateways, and student registration portals.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      tags: ["Next.js", "Tailwind CSS", "Cloud Hosting", "Student CRM"],
      highlights: ["100/100 Core Web Vitals Score", "Instant Document Upload Verification"],
      timeline: "Verified Production Deployment"
    },
    {
      id: 6,
      title: "Google Maps 3-Pack & Local Search Domination",
      client: "Pune Commercial & Healthcare Network",
      category: "SEO & Growth",
      metrics: "#1 Rank for 35+ High-Intent Keywords",
      desc: "Full-scale local SEO transformation combining Google Business Profile optimization, citation engineering, review velocity workflows, and geo-targeted schema.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      tags: ["Local SEO", "Google My Business", "Pinnacle Assist", "Schema Markup"],
      highlights: ["3.8x Phone Call Velocity", "Zero-Ad Spend Organic Dominance"],
      timeline: "Ongoing Retainer"
    },
    {
      id: 7,
      title: "Migrare - Global Immigration & Visa Consultation Suite",
      client: "Migrare (migrare.in)",
      category: "Custom Software",
      metrics: "250% Inbound Lead Velocity",
      desc: "Comprehensive overseas immigration guidance portal featuring visa eligibility calculators, encrypted document vaults, and CRM pipeline automation.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      tags: ["React.js", "Python FastAPI", "Docker", "Tailwind CSS"],
      highlights: ["Automated Eligibility Calculator", "Bank-Grade Encryption Protocols"],
      timeline: "Verified Production Deployment"
    },
    {
      id: 8,
      title: "Aura Nest - Luxury Interior Architecture Portfolio",
      client: "Aura Nest Interiors (auranestinteriors.com)",
      category: "Web Development",
      metrics: "99.4% Visual Retention Rate",
      desc: "Visual-first interior design showcase engineered with high-definition masonry project galleries, material specification breakdowns, and consultation dispatch.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
      tags: ["Next.js", "GSAP Motion", "CDN Image Pipeline", "Responsive UI"],
      highlights: ["Ultra-Crisp Responsive Gallery", "1-Click WhatsApp Design Consult"],
      timeline: "Verified Production Deployment"
    }
  ];

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="pb-16 bg-brand-soft overflow-x-hidden">
      <SEOHead 
        title="Enterprise Case Studies & Digital Engineering Portfolio | VibeSpark"
        description="Browse VibeSpark's track record of verified production deployments, high-performance web systems, custom SaaS applications, and organic search growth case studies."
        canonicalUrl="https://vibespark.in/portfolio"
        keywords="web development portfolio, digital agency case studies Pune, software development track record, client results India"
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "VibeSpark Production Showcase & Case Studies",
          "url": "https://vibespark.in/portfolio",
          "description": "Verified production deliveries, custom SaaS applications, and high-velocity commerce systems."
        }}
      />
      
      {/* ================= CINEMATIC 3D PRODUCTION SHOWCASE HERO ================= */}
      <section className="relative pt-32 pb-20 sm:pt-36 sm:pb-28 bg-[#040624] text-white overflow-hidden">
        
        {/* Clean, Crisp Normal Production Studio Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
            alt="Digital Product Engineering Studio"
            className="absolute inset-0 w-full h-full object-cover opacity-50 filter brightness-105 contrast-110"
          />
        </div>

        {/* Clean Balanced Scrim (Allows background animation to shine strictly through) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#040624]/70 via-[#040624]/50 to-[#040624]/85 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column (7 cols): Typography, Track Record & Actions with Coordinated Landing */}
            <motion.div 
              variants={heroLandingContainer}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 space-y-6 text-left"
            >
              <motion.div variants={heroLandingItem}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-xl border border-white/20 text-brand-lavender shadow-glow-indigo/20">
                  <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Verified Production Deliveries</span>
                </div>
              </motion.div>

              <motion.h1 
                variants={heroLandingItem}
                className="text-3xl sm:text-5xl lg:text-[50px] font-extrabold tracking-tight leading-[1.14]"
              >
                High-Impact Digital Products Engineered for{' '}
                <span className="bg-gradient-to-r from-brand-orange via-[#FF8E56] to-brand-orange bg-clip-text text-transparent drop-shadow-sm">
                  Market Leaders
                </span>
              </motion.h1>

              <motion.p 
                variants={heroLandingItem}
                className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl font-normal"
              >
                Explore verified enterprise deployments, custom SaaS applications, and high-velocity commerce systems engineered by VibeSpark. Every solution delivers measurable commercial impact.
              </motion.p>

              {/* Action Buttons */}
              <motion.div variants={heroLandingItem} className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#projects-catalog"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-brand-orange to-[#FF6224] hover:from-[#FF6224] hover:to-brand-orange shadow-lg shadow-brand-orange/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Explore Case Studies</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider text-slate-200 bg-white/10 border border-white/20 hover:bg-white/15 backdrop-blur-md transition-all"
                >
                  <span>Architecture Review</span>
                </Link>
              </motion.div>

              {/* Verified Metrics Badges */}
              <motion.div variants={heroLandingItem} className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 max-w-lg">
                <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-center sm:text-left">
                  <div className="text-xl sm:text-2xl font-black text-brand-orange">500+</div>
                  <div className="text-[11px] text-slate-300 font-medium mt-0.5">Platforms Shipped</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-center sm:text-left">
                  <div className="text-xl sm:text-2xl font-black text-cyan-400">$25M+</div>
                  <div className="text-[11px] text-slate-300 font-medium mt-0.5">Capital Raised</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-center sm:text-left">
                  <div className="text-xl sm:text-2xl font-black text-emerald-400">99.99%</div>
                  <div className="text-[11px] text-slate-300 font-medium mt-0.5">Guaranteed SLA</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column (5 cols): Multi-Device Staggered Production Stage with Entrance */}
            <motion.div 
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Glowing Halo Backlight */}
                <div className="absolute -inset-4 bg-gradient-to-r from-brand-indigo/40 via-brand-orange/20 to-brand-royal-blue/25 rounded-3xl blur-2xl pointer-events-none" />

                {/* Main Laptop Production Card */}
                <motion.div 
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-3xl bg-[#090C36]/90 border border-white/20 backdrop-blur-2xl p-4 sm:p-5 shadow-2xl overflow-hidden group"
                >
                  {/* Browser Mock Header */}
                  <div className="flex items-center justify-between pb-3 px-2 border-b border-white/10 mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                    </div>
                    <div className="text-[11px] font-mono text-slate-300 bg-white/5 px-3 py-0.5 rounded-full border border-white/10">
                      https://client.vibespark.tech/production
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  </div>

                  {/* Flagship Case Study Image Frame */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-[#050720]">
                    <img 
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" 
                      alt="EduNext Flagship Production Platform" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050720]/90 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand-midnight/90 border border-white/20 backdrop-blur-md text-[10px] font-bold text-white flex items-center gap-1.5 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>FLAGSHIP // EduNext Virtual Academy</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                      <div>
                        <div className="text-[10px] text-slate-300 font-medium">Verified Commercial Impact</div>
                        <div className="text-xs font-black text-white">+140% Student Admissions Surge</div>
                      </div>
                      <div className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-mono font-bold text-emerald-300">
                        100/100 Core Vitals
                      </div>
                    </div>
                  </div>

                  {/* Secondary Telemetry Strip */}
                  <div className="mt-4 p-3 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center text-brand-orange font-bold text-xs">
                        ⚡
                      </div>
                      <div>
                        <div className="text-white font-bold">Nexus Omni-Commerce</div>
                        <div className="text-[10px] text-slate-300">3.2x Revenue Velocity • 0.3s Checkout</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/30">
                      Shopify Plus
                    </span>
                  </div>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= FILTER TABS ================= */}
      <section id="projects-catalog" className="py-8 bg-white/95 border-b border-brand-lavender/60 sticky top-16 z-30 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/30 scale-105'
                    : 'bg-brand-soft border border-brand-lavender/70 text-brand-midnight hover:bg-brand-lavender/40 hover:border-brand-orange/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROJECTS GRID: HORIZONTAL FLAGSHIP SPREADS ================= */}
      <section ref={gridRef} className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 sm:space-y-10">
          {filteredProjects.map((p, pIdx) => (
            <ScrollReveal 
              key={p.id} 
              variant="fadeUp" 
              distance={28} 
              delay={(pIdx % 2) * 0.08}
            >
              <div 
                className="group bg-white rounded-[28px] overflow-hidden border border-slate-200/90 shadow-[0_4px_24px_rgba(8,11,53,0.06)] hover:shadow-2xl hover:border-brand-orange/40 hover:-translate-y-2 transition-all duration-300 ease-out grid grid-cols-1 lg:grid-cols-12 items-stretch relative"
              >
              {/* Top Accent Gradient Bar on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-brand-orange via-[#FF925C] to-brand-orange z-20" />

              {/* Left Column (5 cols): High-Resolution Image Frame */}
              <div className="lg:col-span-5 relative min-h-[220px] sm:min-h-[260px] lg:min-h-full overflow-hidden bg-brand-midnight">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Category Pill */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/15 shadow-sm">
                  {p.category}
                </div>

                {/* Verified Live Pill */}
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 backdrop-blur-md border border-emerald-400/30 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Live Production</span>
                </div>
              </div>

              {/* Right Column (7 cols): Horizontal Compact Content */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-9 flex flex-col justify-between bg-white relative z-10">
                <div>
                  {/* Top Meta Row: Metric Badge & Client */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/90 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{p.metrics}</span>
                    </span>

                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <span>Client: <strong className="text-slate-800 font-semibold">{p.client}</strong></span>
                      <span>•</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 font-semibold">{p.timeline}</span>
                    </div>
                  </div>

                  {/* Headline */}
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-midnight group-hover:text-brand-orange transition-colors mb-2.5 leading-snug">
                    {p.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 max-w-2xl">
                    {p.desc}
                  </p>

                  {/* Key Highlights Strip (Horizontal compact) */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700 py-2.5 px-3.5 rounded-xl bg-slate-50 border border-slate-200/70 mb-5">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                      <span>{p.highlights[0]}</span>
                    </div>
                    <span className="text-slate-300 hidden sm:inline">•</span>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{p.highlights[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Tech Stack & CTA Button Aligned Horizontally */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  {/* Tech Languages with Small Colored Icons */}
                  <div className="flex flex-wrap items-center gap-2">
                    {p.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-50 hover:bg-white text-slate-700 border border-slate-200/90 hover:border-brand-orange/40 hover:text-slate-900 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                      >
                        <TechIcon name={tag} />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>

                  {/* Action CTA Button */}
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-brand-midnight via-[#0B0F3B] to-brand-midnight group-hover:from-brand-orange group-hover:to-[#FF6224] shadow-md group-hover:shadow-brand-orange/30 transition-all duration-300 shrink-0 group/btn"
                  >
                    <span>Build Similar Solution</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1.5 transition-transform" />
                  </Link>
                </div>

              </div>
            </div>
          </ScrollReveal>
        ))}
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-20 bg-white border-y border-brand-lavender/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-midnight tracking-tight mb-4">
            Ready to Build Your Next Digital Flagship?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            From technical specifications to cloud deployment, we deliver solutions on time and engineered to scale.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-brand-orange to-[#FF6224] hover:from-[#FF6224] hover:to-brand-orange shadow-lg shadow-brand-orange/30 hover:shadow-brand-orange/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
          >
            <span>Discuss Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
