import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  PhoneCall, 
  ShieldCheck, 
  Zap, 
  Code2, 
  TrendingUp, 
  Layers, 
  ShoppingBag,
  Clock
} from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';

const projectTypes = [
  { id: 'web', label: 'Web Development', icon: Code2, timeline: '3 - 6 Weeks' },
  { id: 'seo', label: 'SEO & Growth', icon: TrendingUp, timeline: 'Ongoing / 90 Days' },
  { id: 'software', label: 'Custom Software', icon: Layers, timeline: '6 - 10 Weeks' },
  { id: 'ecommerce', label: 'E-Commerce', icon: ShoppingBag, timeline: '4 - 8 Weeks' }
];

export default function FinalCTASection() {
  const [selectedType, setSelectedType] = useState(projectTypes[0]);

  return (
    <section className="py-20 sm:py-24 bg-brand-soft relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-brand-indigo/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Rounded Deep Midnight Container (Kept in the box as requested) */}
        <ScrollReveal variant="zoomIn" distance={20} duration={0.75}>
          <div className="relative rounded-3xl bg-gradient-to-br from-[#06082A] via-[#080B35] to-[#04061F] p-5 sm:p-10 lg:p-14 text-white overflow-hidden shadow-2xl border border-white/15">
          
          {/* Internal atmospheric glow orbs */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-indigo/30 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-orange/20 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Clean & Punchy Value Message (7 cols) */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-brand-lavender shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                <span>Let's Build Together</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Have a Project in Mind?{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-[#FFA270] to-brand-orange">
                  Let's Make It Happen.
                </span>
              </h2>

              <p className="text-xs sm:text-base text-slate-300 max-w-lg leading-relaxed font-normal">
                From high-speed web apps to digital marketing and custom software, we help ambitious businesses turn bold ideas into high-performing reality.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-brand-orange to-[#FF6224] hover:from-[#FF6224] hover:to-brand-orange shadow-lg shadow-brand-orange/30 hover:scale-[1.02] active:scale-95 transition-all group text-center"
                >
                  <span>Get a Free Consultation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="tel:+919028446832"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider text-slate-200 bg-white/5 border border-white/15 hover:bg-white/10 hover:text-white transition-all group text-center"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-brand-orange group-hover:rotate-12 transition-transform" />
                  <span>Call +91 90284 46832</span>
                </a>
              </div>

              {/* Clean Single-Line Trust Markers */}
              <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-2.5 sm:gap-4 text-[11px] sm:text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Free Technical Audit</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                  <span>24h Response SLA</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Strict NDA Protected</span>
                </span>
              </div>

            </div>

            {/* Right Column: Minimal Project Discovery Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white/[0.06] backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl relative space-y-5">
                
                {/* Status Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                  <div className="flex items-center gap-2 text-emerald-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Available for New Projects</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Q1/Q2 Sprints</span>
                </div>

                {/* Project Selection Tabs */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                    What are you looking to build?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {projectTypes.map((opt) => {
                      const Icon = opt.icon;
                      const isSelected = selectedType.id === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedType(opt)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                            isSelected
                              ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/30'
                              : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
                          }`}
                        >
                          <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-brand-orange'}`} />
                          <span className="truncate">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Scope Timeline Note */}
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Zap className="w-3.5 h-3.5 text-brand-orange" />
                    <span className="font-semibold text-white">{selectedType.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-brand-lavender bg-white/10 px-2.5 py-0.5 rounded-md">
                    <Clock className="w-3 h-3 text-brand-orange" />
                    <span>{selectedType.timeline}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  to="/contact"
                  className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-brand-midnight bg-white hover:bg-slate-100 shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all group"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-orange group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Location & Guarantee note */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Nyati Ethereal, Kharadi, Pune</span>
                  <span className="text-brand-lavender font-semibold">100% On-Time Delivery</span>
                </div>

              </div>
            </div>

          </div>

        </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
