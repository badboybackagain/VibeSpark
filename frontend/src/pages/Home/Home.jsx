import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEOHead from '../../components/common/SEOHead';

import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import WhyChooseSection from './WhyChooseSection';
import IndustriesSection from './IndustriesSection';
import StatsBannerSection from './StatsBannerSection';
import ProcessSection from './ProcessSection';
import TestimonialsSection from './TestimonialsSection';
import BlogSection from './BlogSection';
import FinalCTASection from './FinalCTASection';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const homeRef = useRef(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Smooth fade-up reveals for sections
      const sections = gsap.utils.toArray('.gsap-fade-section');
      sections.forEach((sec) => {
        gsap.from(sec, {
          scrollTrigger: {
            trigger: sec,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 40,
          duration: 0.85,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
        });
      });
    }, homeRef.current || undefined);

    return () => ctx.revert(); // GSAP cleanup to avoid memory leaks or duplicate triggers
  }, []);

  return (
    <div ref={homeRef} className="overflow-x-hidden">
      <SEOHead 
        title="VibeSpark Technologies — Powering Ideas. Creating Digital Experiences."
        description="VibeSpark Technologies is a premier digital technology agency in Pune, India. We engineer custom web platforms, algorithmic SEO growth, SaaS architectures, and digital marketing."
        canonicalUrl="https://vibespark.in/"
        keywords="digital solutions agency Pune, web development company Pune, SEO services India, custom software development, Next.js web agency, VibeSpark Technologies"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "LocalBusiness",
              "@id": "https://vibespark.in/#localbusiness",
              "name": "VibeSpark Technologies",
              "image": "https://vibespark.in/assets/logos/vibespark-logo.png",
              "telephone": "+91-90284-46832",
              "email": "info@vibespark.org",
              "url": "https://vibespark.in",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Nyati Ethereal, Kharadi",
                "addressLocality": "Pune",
                "addressRegion": "Maharashtra",
                "postalCode": "411014",
                "addressCountry": "IN"
              },
              "priceRange": "$$",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:30",
                "closes": "18:30"
              }
            },
            {
              "@type": "WebSite",
              "@id": "https://vibespark.in/#website",
              "url": "https://vibespark.in",
              "name": "VibeSpark Technologies",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://vibespark.in/blog?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          ]
        }}
      />
      {/* 1. Cinematic Hero Section */}
      <HeroSection />

      {/* 2. Our Services Section */}
      <ServicesSection />

      {/* 3. Why Choose VibeSpark Section (has internal ScrollTrigger for cards sliding in from outside) */}
      <WhyChooseSection />

      {/* 4. Industries We Serve Section */}
      <div className="gsap-fade-section">
        <IndustriesSection />
      </div>

      {/* 5. Stats and Business CTA Banner */}
      <div className="gsap-fade-section">
        <StatsBannerSection />
      </div>

      {/* 6. Our Work Process Section */}
      <div className="gsap-fade-section">
        <ProcessSection />
      </div>

      {/* 7. Testimonials Section */}
      <div className="gsap-fade-section">
        <TestimonialsSection />
      </div>

      {/* 8. Latest Insights / Blog Section */}
      <div className="gsap-fade-section">
        <BlogSection />
      </div>

      {/* 9. Final CTA Section */}
      <div className="gsap-fade-section">
        <FinalCTASection />
      </div>
    </div>
  );
}
