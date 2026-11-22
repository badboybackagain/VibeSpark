import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import servicesCardsReal from '../../assets/images/services-cards-real.jpg';

const serviceVisualBadges = [
  { techPill: "React & Next.js", metric: "Web Platforms" },
  { techPill: "Google 3-Pack", metric: "Search Visibility" },
  { techPill: "Meta & Google Ads", metric: "Growth Campaigns" },
  { techPill: "Cloud Architecture", metric: "Enterprise SaaS" },
  { techPill: "Shopify & Headless", metric: "Digital Stores" },
  { techPill: "Workflow Integrations", metric: "24/7 Operations" }
];

// 3 columns x 2 rows background positions for clean real photographs
const gridPositions = [
  '0% 0%',      // Web Dev
  '50% 0%',     // SEO
  '100% 0%',    // Digital Marketing
  '0% 100%',    // Custom Software
  '50% 100%',   // E-commerce
  '100% 100%',  // Automation
];

export default function ServiceCard({ service, index = 0 }) {
  // Determine icon component
  let IconComponent = LucideIcons.Sparkles;
  if (service.icon) {
    IconComponent = service.icon;
  } else if (service.iconName && LucideIcons[service.iconName]) {
    IconComponent = LucideIcons[service.iconName];
  }

  // Alternating themes (even = indigo, odd = orange)
  const isOrange = service.theme === "orange" || index % 2 === 1;
  const posIndex = index % 6;
  const bgPos = gridPositions[posIndex];
  const badgeInfo = serviceVisualBadges[posIndex];

  // Highlights or features
  const highlights = service.highlights || service.features || [];
  const description = service.description || service.shortDesc || "";

  return (
    <div className="gsap-service-card group relative bg-white rounded-[24px] border border-slate-200/90 shadow-[0_4px_20px_rgba(8,11,53,0.06)] hover:shadow-[0_24px_50px_-12px_rgba(8,11,53,0.18)] hover:-translate-y-2 hover:border-slate-300 transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden">
      
      {/* Top subtle illumination bar on hover */}
      <div 
        className={`absolute top-0 left-0 right-0 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 ${
          isOrange 
            ? 'bg-gradient-to-r from-brand-orange via-[#FF925C] to-brand-orange' 
            : 'bg-gradient-to-r from-brand-indigo via-brand-royal-blue to-brand-indigo'
        }`} 
      />

      {/* Card Header: Clean, Real Photograph Preview (Zero added blue tint or artificial filters) */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
        
        {/* Real Authentic Photograph Slice */}
        <div 
          className="absolute inset-0 bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-105"
          style={{
            backgroundImage: `url(${servicesCardsReal})`,
            backgroundSize: '300% 200%',
            backgroundPosition: bgPos
          }}
        />

        {/* Clean, Subtle Bottom Gradient for Gentle Transition (No Color Cast) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Clean Category Label on top left */}
        <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-semibold text-white tracking-wide">
          <span>{badgeInfo.metric}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-7 pt-4 flex-1 flex flex-col justify-between relative z-10 bg-white">
        
        <div>
          {/* Header row: Icon & Tag */}
          <div className="flex items-center justify-between mb-4 -mt-10 relative z-20">
            {/* Clean Icon Container */}
            <div 
              className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center p-3 shadow-lg border-2 border-white transition-all duration-300 group-hover:scale-105 ${
                isOrange
                  ? 'bg-gradient-to-br from-brand-orange to-[#FF6224] text-white shadow-brand-orange/25'
                  : 'bg-gradient-to-br from-brand-indigo to-brand-navy text-white shadow-brand-indigo/25'
              }`}
            >
              <IconComponent className="w-6 h-6 stroke-[2.2]" />
            </div>

            {/* Service Category Tag */}
            {service.tag && (
              <span 
                className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border transition-colors shadow-sm ${
                  isOrange
                    ? 'bg-orange-50 text-brand-orange border-orange-200/80 group-hover:bg-orange-100'
                    : 'bg-indigo-50 text-brand-indigo border-indigo-200/80 group-hover:bg-indigo-100'
                }`}
              >
                {service.tag}
              </span>
            )}
          </div>

          {/* Service Title */}
          <h3 className="text-xl font-bold text-brand-midnight group-hover:text-brand-navy transition-colors duration-200 mb-2 leading-snug">
            {service.title}
          </h3>

          {/* Short Description */}
          <p className="text-slate-600 text-sm leading-relaxed mb-5 font-normal">
            {description}
          </p>

          {/* Feature Highlights with Checkmarks */}
          {highlights.length > 0 && (
            <ul className="space-y-2 mb-6 pt-3.5 border-t border-slate-100">
              {highlights.slice(0, 3).map((item, idx) => (
                <li key={idx} className="flex items-center text-xs text-slate-600 gap-2 font-medium">
                  <CheckCircle2 
                    className={`w-3.5 h-3.5 shrink-0 stroke-[2.2] ${
                      isOrange ? 'text-brand-orange' : 'text-brand-indigo'
                    }`} 
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Card Footer: Learn More Link with Animated Arrow & Descriptive SEO Accessibility */}
        <div className="pt-2">
          <Link
            to={service.path}
            aria-label={`Explore ${service.title} engineering services`}
            className={`inline-flex items-center gap-2 text-sm font-bold transition-all duration-200 group/link ${
              isOrange 
                ? 'text-brand-midnight group-hover:text-brand-orange' 
                : 'text-brand-midnight group-hover:text-brand-indigo'
            }`}
          >
            <span>Learn More</span>
            <span className="sr-only"> about {service.title}</span>
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1.5 transition-transform duration-200" />
          </Link>
        </div>

      </div>

    </div>
  );
}
