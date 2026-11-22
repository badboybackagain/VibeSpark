import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';
import { siteConfig } from '../data/siteData';

export default function PrivacyPolicy() {
  return (
    <div className="pb-16 bg-brand-soft overflow-x-hidden">
      <SEOHead 
        title="Privacy Policy | VibeSpark Technologies"
        description="VibeSpark Technologies privacy policy regarding data collection, confidentiality, NDA protocols, and user data protection."
        canonicalUrl="https://vibespark.in/privacy-policy"
      />
      
      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-brand-midnight text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-brand-lavender/70 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-brand-orange font-semibold">Privacy Policy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-brand-lavender/80 mt-2">
            Last Updated: November 2025 • VibeSpark Technologies
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-lavender/80 shadow-sm space-y-8 text-slate-700 text-sm leading-relaxed">
          
          <div>
            <h2 className="text-xl font-bold text-brand-midnight mb-3">1. Information We Collect</h2>
            <p>
              At {siteConfig.companyName}, we value your privacy. We collect information you directly provide when inquiring about our engineering and marketing services, including your name, corporate email address, phone number, company name, and project scope requirements.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-midnight mb-3">2. How We Use Information</h2>
            <p>
              Information submitted through our website is used strictly to prepare project proposals, deliver software development and marketing services, and provide technical support. We do not sell, rent, or trade your personal or business data to third-party data brokers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-midnight mb-3">3. Data Security & Storage</h2>
            <p>
              We implement industry-standard technical safeguards, including SSL/TLS encryption for all data in transit, strict access control, and secure cloud storage protocols to protect your confidential information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-midnight mb-3">4. Cookies & Analytics</h2>
            <p>
              Our website uses basic analytics cookies to measure page performance, traffic sources, and user experience. You can configure your browser to reject cookies if preferred.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-midnight mb-3">5. Contact Regarding Privacy</h2>
            <p>
              If you have any questions about this Privacy Policy, please email our data protection officer at <a href={`mailto:${siteConfig.email}`} className="text-brand-orange font-semibold">{siteConfig.email}</a>.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
