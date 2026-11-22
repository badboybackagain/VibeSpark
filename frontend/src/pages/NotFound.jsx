import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Compass } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';
import VibeSparkLogo from '../components/common/VibeSparkLogo';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-24 pb-16 px-4 bg-brand-soft text-center">
      <SEOHead 
        title="404 — Page Not Found | VibeSpark Technologies"
        description="The requested page could not be located on VibeSpark Technologies."
        canonicalUrl="https://vibespark.in/404"
      />
      <div className="max-w-md mx-auto p-8 rounded-3xl bg-white border border-brand-lavender shadow-xl space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-brand-navy/10 text-brand-navy flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8 text-brand-orange animate-spin" style={{ animationDuration: '6s' }} />
        </div>

        <h1 className="text-4xl font-extrabold text-brand-midnight">
          404
        </h1>

        <h2 className="text-xl font-bold text-slate-800">
          Page Not Found
        </h2>

        <p className="text-slate-600 text-sm leading-relaxed">
          The requested page could not be located. It may have been moved, renamed, or is currently undergoing an upgrade.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-brand-orange hover:bg-brand-orange-hover shadow-md transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            to="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-xs text-slate-700 bg-brand-soft border border-brand-lavender hover:bg-brand-lavender/40 transition-all"
          >
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
