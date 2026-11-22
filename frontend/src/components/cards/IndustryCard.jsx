import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const industryTags = {
  education: "EdTech & LMS",
  healthcare: "HIPAA & Telehealth",
  "real-estate": "MLS & 3D Tours",
  retail: "Omnichannel POS",
  restaurants: "Table & Orders",
  startups: "MVP & Scalability",
  "professional-services": "Portals & Billing",
  manufacturing: "IoT & Supply Chain"
};

export default function IndustryCard({ 
  industry, 
  isActive = false, 
  isGrid = false,
  onClick 
}) {
  const tag = industryTags[industry.id] || "Enterprise Tech";

  // Grid presentation (used on /industries index page)
  if (isGrid) {
    return (
      <Link
        to={industry.path}
        className="group relative block rounded-[28px] overflow-hidden aspect-[4/5] bg-[#080B35] shadow-lg hover:shadow-[0_24px_55px_-10px_rgba(8,11,53,0.35)] hover:-translate-y-2 border border-brand-lavender/40 hover:border-brand-orange/70 transition-all duration-300"
      >
        {/* Top Radiant Illumination Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-orange via-[#FF925C] to-brand-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

        {/* Crisp High-Res Image with Smooth Zoom */}
        <img
          src={industry.image}
          alt={industry.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Multi-Stop Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050724] via-[#050724]/60 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-300" />

        {/* Top Left Tag Pill */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white shadow-md">
          <Sparkles className="w-3 h-3 text-brand-orange" />
          <span>{tag}</span>
        </div>

        {/* Top Right Action Arrow */}
        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white group-hover:rotate-45 group-hover:bg-brand-orange group-hover:border-brand-orange transition-all duration-300 shadow-md z-20">
          <ArrowUpRight className="w-4 h-4" />
        </div>

        {/* Bottom Content Area */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
          <h4 className="text-xl font-bold group-hover:text-brand-orange transition-colors duration-200">
            {industry.title}
          </h4>
          
          {industry.subtitle && (
            <p className="text-xs text-brand-lavender/95 mt-1.5 line-clamp-2 leading-relaxed font-normal">
              {industry.subtitle}
            </p>
          )}

          <div className="mt-3.5 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-bold text-brand-orange group-hover:translate-x-1 transition-transform">
            <span>Explore Solutions</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </Link>
    );
  }

  // Carousel presentation (used on Homepage carousel)
  return (
    <div
      onClick={onClick}
      className={`group relative block rounded-[28px] overflow-hidden aspect-[4/5] bg-[#080B35] cursor-pointer select-none transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        isActive
          ? 'scale-[1.10] sm:scale-[1.14] -translate-y-4 sm:-translate-y-5 z-30 border-2 border-brand-orange shadow-[0_30px_70px_-10px_rgba(8,11,53,0.4),0_0_35px_rgba(244,119,59,0.35)] ring-4 ring-brand-orange/30'
          : 'scale-[0.88] sm:scale-[0.90] opacity-65 hover:opacity-95 hover:scale-[0.93] z-10 border border-brand-lavender/30 shadow-md'
      }`}
    >
      {/* Top Radiant Illumination Bar */}
      <div 
        className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-orange via-[#FF925C] to-brand-orange transition-opacity duration-300 z-20 ${
          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`} 
      />

      {/* Clean Modern Image with Smooth Zoom */}
      <img
        src={industry.image}
        alt={industry.title}
        loading="lazy"
        className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out ${
          isActive ? 'scale-110' : 'group-hover:scale-105'
        }`}
      />

      {/* Multi-Stop Dark Gradient Overlay for Supreme Text Legibility */}
      <div className={`absolute inset-0 bg-gradient-to-t from-[#050724] via-[#050724]/65 to-transparent transition-opacity duration-300 ${
        isActive ? 'opacity-90' : 'opacity-85 group-hover:opacity-90'
      }`} />

      {/* Top Left Active Status Badge (Pops up with the center card) */}
      {isActive && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange text-white text-[10px] font-bold uppercase tracking-wider shadow-lg animate-fade-in">
          <Sparkles className="w-3 h-3" />
          <span>Active Focus</span>
        </div>
      )}

      {/* Top Right Action Arrow */}
      <div className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md z-20 ${
        isActive 
          ? 'bg-brand-orange text-white rotate-45 border border-brand-orange opacity-100 scale-105 shadow-brand-orange/40' 
          : 'bg-white/15 backdrop-blur-md border border-white/25 text-white opacity-0 group-hover:opacity-100 group-hover:rotate-45 group-hover:bg-brand-orange group-hover:border-brand-orange'
      }`}>
        <ArrowUpRight className="w-4 h-4" />
      </div>

      {/* Bottom Content Area */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white z-20">
        <h4 className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${
          isActive ? 'text-brand-orange' : 'group-hover:text-brand-orange text-white'
        }`}>
          {industry.title}
        </h4>
        
        {industry.subtitle && (
          <p className="text-xs text-brand-lavender/95 mt-1.5 line-clamp-2 leading-relaxed font-normal">
            {industry.subtitle}
          </p>
        )}

        {/* View Details Link for Active Center Card */}
        {isActive && (
          <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-between">
            <Link
              to={industry.path}
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-bold text-white hover:text-brand-orange inline-flex items-center gap-1 group/btn"
            >
              <span>Explore Industry Solutions</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
