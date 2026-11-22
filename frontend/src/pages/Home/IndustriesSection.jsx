import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading';
import IndustryCard from '../../components/cards/IndustryCard';
import ScrollReveal from '../../components/common/ScrollReveal';
import { industriesData } from '../../data/siteData';

const N = industriesData.length; // 8

// 5 cloned sets for truly seamless, continuous infinite circular scrolling without any rewind or jump
const infiniteIndustries = [0, 1, 2, 3, 4].flatMap((setIdx) =>
  industriesData.map((item) => ({ ...item, uniqueKey: `set${setIdx}-${item.id}` }))
);

export default function IndustriesSection() {
  // Start in middle set (index 2 * N = 16)
  const [virtualIndex, setVirtualIndex] = useState(2 * N);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive card dimensions
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cardWidth = isMobile ? 275 : 320;
  const cardGap = isMobile ? 20 : 28;

  // Real active index for pagination dots and highlight (0 to N-1)
  const activeRealIndex = ((virtualIndex % N) + N) % N;

  // Seamless boundary normalization: reset to middle set without any rewind animation
  const handleTransitionEnd = () => {
    if (virtualIndex >= 3 * N) {
      setIsTransitioning(false);
      setVirtualIndex((prev) => prev - N);
    } else if (virtualIndex < N) {
      setIsTransitioning(false);
      setVirtualIndex((prev) => prev + N);
    }
  };

  // Double-rAF ensures DOM finishes paint at normalized index before transition is re-enabled
  useEffect(() => {
    if (!isTransitioning) {
      let raf2;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
      return () => {
        cancelAnimationFrame(raf1);
        if (raf2) cancelAnimationFrame(raf2);
      };
    }
  }, [isTransitioning]);

  // Continuous forward circular auto-scroll: starts promptly within 600ms, then advances smoothly every 2.2s
  useEffect(() => {
    if (isHovered) return;

    const initialTimer = setTimeout(() => {
      setIsTransitioning(true);
      setVirtualIndex((prev) => prev + 1);
    }, 600);

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setVirtualIndex((prev) => prev + 1);
    }, 2200);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(timer);
    };
  }, [isHovered]);

  // Arrow controls
  const handleNext = () => {
    setIsTransitioning(true);
    setVirtualIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setVirtualIndex((prev) => prev - 1);
  };

  // Pagination dot jump
  const handleDotClick = (targetRealIndex) => {
    const diff = targetRealIndex - activeRealIndex;
    setIsTransitioning(true);
    setVirtualIndex((prev) => prev + diff);
  };

  return (
    <section className="py-20 lg:py-28 bg-brand-soft overflow-hidden" id="industries">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= HEADER ROW ================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6">
          <SectionHeading
            badge="Industries We Serve"
            title="Tailored Solutions for"
            highlight="Every Industry"
            description="We understand your industry's unique challenges and deliver solutions that drive real growth."
            className="mb-0"
          />

          <div className="shrink-0">
            <Link
              to="/industries"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-orange hover:text-brand-orange-hover hover:underline group"
            >
              <span>Explore All Industries</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>

      </div>

      {/* ================= 100% DEAD-CENTER INFINITE CAROUSEL STAGE ================= */}
      <ScrollReveal variant="fadeUp" distance={24} duration={0.7}>
        <div 
          className="relative w-full overflow-hidden py-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left & Right Edge Fade Gradients for Seamless Depth */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-brand-soft via-brand-soft/80 to-transparent z-40" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-brand-soft via-brand-soft/80 to-transparent z-40" />

          {/* Dynamic Centering Sliding Track - Never rewinds! Continues infinitely in circular motion */}
          <div
            onTransitionEnd={handleTransitionEnd}
            className="flex items-center"
            style={{
              gap: `${cardGap}px`,
              transition: isTransitioning ? 'transform 700ms cubic-bezier(0.25, 1, 0.35, 1)' : 'none',
              transform: `translateX(calc(50% - ${virtualIndex * (cardWidth + cardGap) + cardWidth / 2}px))`
            }}
          >
            {infiniteIndustries.map((industry, index) => {
              const isActive = index === virtualIndex;

              return (
                <div
                  key={industry.uniqueKey}
                  style={{ width: `${cardWidth}px` }}
                  className="shrink-0 transition-transform duration-500"
                >
                  <IndustryCard 
                    industry={industry} 
                    isActive={isActive}
                    onClick={() => {
                      setIsTransitioning(true);
                      setVirtualIndex(index);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* ================= BOTTOM CONTROLS: < . . . > ================= */}
      <ScrollReveal variant="fadeUp" distance={16} delay={0.12}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="flex items-center justify-center gap-5 sm:gap-6">
            
            {/* Left Arrow Button */}
            <button
              type="button"
              onClick={handlePrev}
              className="w-11 h-11 rounded-full bg-white border border-brand-lavender/80 flex items-center justify-center text-brand-midnight hover:bg-brand-midnight hover:text-white hover:border-brand-midnight shadow-sm hover:scale-105 active:scale-95 transition-all duration-200"
              aria-label="Previous industry"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* Central Pagination Dots */}
            <div className="flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 rounded-full bg-white/70 border border-brand-lavender/40 backdrop-blur-sm shadow-sm">
              {industriesData.map((ind, dotIdx) => (
                <button
                  key={ind.id}
                  onClick={() => handleDotClick(dotIdx)}
                  className={`transition-all duration-300 rounded-full ${
                    dotIdx === activeRealIndex
                      ? 'w-8 h-2.5 bg-brand-orange shadow-md scale-105'
                      : 'w-2.5 h-2.5 bg-brand-lavender hover:bg-brand-indigo/50'
                  }`}
                  aria-label={`Jump to ${ind.title}`}
                />
              ))}
            </div>

            {/* Right Arrow Button */}
            <button
              type="button"
              onClick={handleNext}
              className="w-11 h-11 rounded-full bg-white border border-brand-lavender/80 flex items-center justify-center text-brand-midnight hover:bg-brand-midnight hover:text-white hover:border-brand-midnight shadow-sm hover:scale-105 active:scale-95 transition-all duration-200"
              aria-label="Next industry"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.2]" />
            </button>

          </div>
        </div>
      </ScrollReveal>

    </section>
  );
}
