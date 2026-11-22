import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Monitor, 
  Search, 
  TrendingUp, 
  Code2, 
  ShoppingCart, 
  Cpu, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServiceCard from '../../components/cards/ServiceCard';

gsap.registerPlugin(ScrollTrigger);

export const servicesList = [
  {
    id: "web-dev",
    title: "Web Development & Design",
    description: "Modern, responsive and high-performance websites designed to turn visitors into customers.",
    path: "/services/web-development",
    icon: Monitor,
    theme: "indigo",
    tag: "Core Engineering",
    highlights: ["React & Next.js Platforms", "Mobile-First Design", "Sub-Second Speed"]
  },
  {
    id: "seo",
    title: "SEO & Local SEO",
    description: "Improve your Google visibility, attract relevant traffic and reach customers searching for your services.",
    path: "/services/seo",
    icon: Search,
    theme: "orange",
    tag: "Organic Growth",
    highlights: ["Google 3-Pack Maps", "Technical Core Vitals", "Authority Backlinks"]
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing & Social Media",
    description: "Build your brand presence through strategic digital campaigns and engaging social media experiences.",
    path: "/services/digital-marketing",
    icon: TrendingUp,
    theme: "indigo",
    tag: "High ROI",
    highlights: ["Meta & Google Ads", "Multi-Channel Funnels", "Brand Engagement"]
  },
  {
    id: "custom-software",
    title: "Custom Software Development",
    description: "Scalable business applications and custom software designed around your operational needs.",
    path: "/services/software-development",
    icon: Code2,
    theme: "orange",
    tag: "Enterprise SaaS",
    highlights: ["Microservices Architecture", "Cloud APIs & DBs", "Role-Based Access"]
  },
  {
    id: "ecommerce",
    title: "E-commerce Solutions",
    description: "Create powerful online stores with seamless shopping experiences and business-focused functionality.",
    path: "/services/ecommerce",
    icon: ShoppingCart,
    theme: "indigo",
    tag: "Sales Conversion",
    highlights: ["Shopify & Headless", "1-Click Checkout", "Inventory Sync"]
  },
  {
    id: "automation",
    title: "Automation & Support",
    description: "Simplify business processes with smart automation, integrations and reliable website support.",
    path: "/services/automation",
    icon: Cpu,
    theme: "orange",
    tag: "24/7 Reliability",
    highlights: ["Workflow Automations", "Cloud Backups & SLAs", "Security Auditing"]
  }
];

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Heading Stagger Reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 35 },
        {
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          clearProps: "transform,opacity"
        }
      );

      // 2. Staggered Cards Reveal (3 columns x 2 rows)
      const cards = gsap.utils.toArray('.gsap-service-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 45, scale: 0.96 },
        {
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse"
          },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.12,
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
      className="relative py-20 lg:py-28 bg-brand-soft overflow-hidden" 
      id="services"
    >
      {/* Background ambient lighting connecting with hero */}
      <div className="absolute -top-16 left-1/4 w-[500px] h-[350px] bg-brand-indigo/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-[450px] h-[450px] bg-brand-orange/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[300px] bg-brand-indigo/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle background tech matrix */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#08086f05_1px,transparent_1px),linear-gradient(to_bottom,#08086f05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_50%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= SECTION INTRODUCTION ================= */}
        <div 
          ref={headingRef} 
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 lg:mb-16 gap-6"
        >
          <div className="max-w-3xl space-y-3.5">
            
            {/* Small Label: OUR SERVICES */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-lavender/40 border border-brand-lavender text-xs font-bold uppercase tracking-wider text-brand-navy shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span>OUR SERVICES</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.18] text-brand-midnight">
              Comprehensive Digital Solutions for{' '}
              <span className="text-brand-orange">
                Modern Businesses
              </span>
            </h2>

            {/* Description */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal pt-1">
              From stunning websites to powerful marketing strategies, we deliver technology-driven solutions that help businesses establish their digital presence and accelerate growth.
            </p>
          </div>

          {/* View All Services Link */}
          <div className="shrink-0 pt-2 lg:pt-0">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-orange hover:text-brand-orange-hover hover:underline transition-all group"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
            </Link>
          </div>
        </div>

        {/* ================= SIX PREMIUM SERVICE CARDS GRID ================= */}
        {/* Responsive: Desktop 3 cols, Tablet 2 cols, Mobile 1 col */}
        <div 
          ref={cardsContainerRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {servicesList.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}
