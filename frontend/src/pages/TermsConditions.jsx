import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ChevronRight } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';
import { siteConfig } from '../data/siteData';

export default function TermsConditions() {
  return (
    <div className="pb-16 bg-brand-soft overflow-x-hidden">
      <SEOHead 
        title="Terms & Conditions | VibeSpark Technologies"
        description="Terms and conditions governing web development, software engineering, and digital marketing services provided by VibeSpark Technologies."
        canonicalUrl="https://vibespark.in/terms-conditions"
      />
      
      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-brand-midnight text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-brand-lavender/70 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-brand-orange font-semibold">Terms & Conditions</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-xs text-brand-lavender/80 mt-2">
            Effective Date: November 2025 • VibeSpark Technologies
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-lavender/80 shadow-sm space-y-8 text-slate-700 text-sm leading-relaxed">
          
          <div>
            <h2 className="text-xl font-bold text-brand-midnight mb-3">1. Engagement & Services</h2>
            <p>
              By accessing or using the services provided by {siteConfig.companyName}, you agree to abide by these terms. Specific engineering, design, and marketing deliverables are defined in individual Statements of Work (SOW) executed between the parties.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-midnight mb-3">2. Intellectual Property Rights</h2>
            <p>
              Upon final settlement of project fees, 100% of bespoke code, designs, and digital assets developed exclusively for the client become the proprietary property of the client, excluding pre-existing open-source libraries and frameworks.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-midnight mb-3">3. Mutual Non-Disclosure & Confidentiality</h2>
            <p>
              Both parties agree to hold proprietary business plans, technical architectures, and financial data in strict confidence and shall not disclose such materials without prior written consent.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-midnight mb-3">4. Limitation of Liability</h2>
            <p>
              VibeSpark Technologies provides digital solutions on a professional basis. In no event shall VibeSpark Technologies be liable for indirect, incidental, or consequential damages resulting from third-party hosting downtime or external API outages.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-midnight mb-3">5. Governing Law</h2>
            <p>
              These terms shall be governed and construed in accordance with the laws of India, with primary legal jurisdiction in Pune, Maharashtra.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
