import React, { useState, useEffect } from 'react';
import { Star, Sparkles, Quote, CheckCircle2, ChevronLeft, ChevronRight, Award, ShieldCheck } from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';
import { testimonialsData } from '../../data/siteData';

const N = testimonialsData.length; // 6

// 5 cloned sets for seamless, continuous infinite circular scrolling without rewind or jump
const infiniteReviews = [0, 1, 2, 3, 4].flatMap((setIdx) =>
  testimonialsData.map((item, idx) => ({ ...item, uniqueKey: `set${setIdx}-${item.id || idx}` }))
);

export default function TestimonialsSection() {
  // Start in middle set (index 2 * N = 12)
  const [virtualIndex, setVirtualIndex] = useState(2 * N);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [cardWidth, setCardWidth] = useState(380);
  const [cardGap, setCardGap] = useState(24);

  // Responsive dimensions
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setCardWidth(Math.min(w - 48, 320));
        setCardGap(16);
      } else if (w < 1024) {
        setCardWidth(360);
        setCardGap(20);
      } else {
        setCardWidth(400);
        setCardGap(24);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Real active index (0 to N-1) for pagination indicators and highlighting
  const activeRealIndex = ((virtualIndex % N) + N) % N;

  // Boundary normalization: reset to middle set without any visible animation jump
  const handleTransitionEnd = () => {
    if (virtualIndex >= 3 * N) {
      setIsTransitioning(false);
      setVirtualIndex((prev) => prev - N);
    } else if (virtualIndex < N) {
      setIsTransitioning(false);
      setVirtualIndex((prev) => prev + N);
    }
  };

  // Re-enable smooth transition after DOM paint at normalized index
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

  // Continuous forward circular auto-scroll: starts immediately (250ms) and advances swiftly (1.9s)
  useEffect(() => {
    if (isHovered) return;

    const initialTimer = setTimeout(() => {
      setIsTransitioning(true);
      setVirtualIndex((prev) => prev + 1);
    }, 250);

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setVirtualIndex((prev) => prev + 1);
    }, 1900);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(timer);
    };
  }, [isHovered]);

  // Arrow controls: scroll one by one
  const handleNext = () => {
    setIsTransitioning(true);
    setVirtualIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setVirtualIndex((prev) => prev - 1);
  };

  // Jump via indicator dot
  const handleDotClick = (targetRealIndex) => {
    const diff = targetRealIndex - activeRealIndex;
    setIsTransitioning(true);
    setVirtualIndex((prev) => prev + diff);
  };

  // Track translation: centers the active review card horizontally in viewport
  const trackOffset = -(virtualIndex * (cardWidth + cardGap) + cardWidth / 2);

  return (
    <section 
      className="relative bg-gradient-to-br from-[#050724] via-[#080B35] to-[#03051A] text-white overflow-hidden py-24 sm:py-32 lg:py-36 border-y border-white/10" 
      id="testimonials"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 2. Full-Width Ambient Lighting & Radiant Glow Meshes */}
      <div className="absolute -top-32 right-1/4 w-[650px] h-[650px] bg-brand-indigo/25 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-32 left-10 w-[600px] h-[600px] bg-brand-orange/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(64,60,255,0.15),transparent_70%)] pointer-events-none" />

      {/* 3. Full-Width Fine Cyber Coordinate Matrix Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

      {/* 4. Section Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal variant="fadeUp" distance={24} duration={0.7}>
          <div className="mb-12 sm:mb-16">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/[0.08] border border-white/15 text-brand-lavender shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                <span>Client Validation</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
                Trusted by Modern{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-[#FF925C] to-brand-orange drop-shadow-sm">
                  Industry Leaders
                </span>
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
                Real feedback and verified outcomes from founders and enterprises who partner with VibeSpark.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* 5. Continuous Horizontal Sliding Track (Scrolls reviews one after another) */}
      <ScrollReveal variant="fadeUp" distance={20} delay={0.12}>
        <div className="relative w-full overflow-hidden py-4 z-10">
        <div
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translate3d(calc(50vw + ${trackOffset}px), 0, 0)`,
            transition: isTransitioning ? 'transform 420ms cubic-bezier(0.2, 0.9, 0.3, 1)' : 'none',
            display: 'flex',
            gap: `${cardGap}px`,
            willChange: 'transform'
          }}
          className="items-stretch"
        >
          {infiniteReviews.map((t, idx) => {
            const isCenterActive = idx === virtualIndex;

            return (
              <div
                key={t.uniqueKey}
                onClick={() => {
                  const diff = idx - virtualIndex;
                  setIsTransitioning(true);
                  setVirtualIndex((prev) => prev + diff);
                }}
                style={{ width: `${cardWidth}px` }}
                className={`shrink-0 relative p-7 sm:p-8 rounded-[30px] transition-all duration-500 flex flex-col justify-between cursor-pointer select-none overflow-hidden ${
                  isCenterActive
                    ? 'bg-gradient-to-b from-[#0E1342] via-[#090C33] to-[#060826] border-2 border-brand-orange shadow-[0_20px_60px_-10px_rgba(244,119,59,0.35)] ring-4 ring-brand-orange/20 scale-[1.02] z-20'
                    : 'bg-gradient-to-b from-[#0A0D36] to-[#060824] border border-[#1C2363]/80 shadow-xl opacity-75 hover:opacity-100 hover:scale-[0.99] hover:border-brand-indigo/60 z-10'
                }`}
              >
                {/* Top Subtle Radiant Illumination Accent */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-1.5 transition-opacity duration-300 ${
                    isCenterActive 
                      ? 'opacity-100 bg-gradient-to-r from-brand-orange via-[#FFA07A] to-brand-orange' 
                      : 'opacity-0'
                  }`} 
                />

                {/* Decorative Subtle Watermark Quote in the Background */}
                <div className="absolute top-5 right-6 text-white/[0.03] group-hover:text-brand-orange/[0.06] pointer-events-none transition-colors duration-300">
                  <Quote className="w-20 h-20 fill-current rotate-180" />
                </div>

                <div className="relative z-10">
                  {/* Rating Stars & Metric Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-1 text-brand-orange">
                        {[...Array(t.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current drop-shadow-[0_0_8px_rgba(244,119,59,0.55)]" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-white ml-1">5.0</span>
                    </div>

                    {/* Metric pill */}
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-md shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      <span>{t.metrics}</span>
                    </span>
                  </div>

                  {/* Project Scope Pill */}
                  <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#12174B] border border-[#242E7A] text-[11px] font-medium text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                    <span>{t.service || 'Full-Stack Architecture'}</span>
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-slate-100 text-sm leading-relaxed mb-6 font-normal min-h-[72px]">
                    "{t.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="relative z-10 flex items-center justify-between pt-5 border-t border-white/[0.08] mt-2">
                  <div className="flex items-center gap-3.5">
                    <div className="relative shrink-0">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className={`w-12 h-12 rounded-full object-cover transition-all duration-300 ${
                          isCenterActive 
                            ? 'ring-2 ring-brand-orange shadow-md' 
                            : 'ring-2 ring-white/20'
                        }`}
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-brand-midnight text-white flex items-center justify-center border-2 border-brand-midnight shadow-sm">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-brand-orange transition-colors">
                        {t.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5 font-medium">
                        {t.role}, <span className="font-semibold text-slate-200">{t.company}</span>
                      </p>
                    </div>
                  </div>

                  {/* Verified Project Badge */}
                  <div className="hidden sm:flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-orange" />
                    <span>Verified</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
      </ScrollReveal>

      {/* 6. Indicator Pills & Bottom Proof Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Interactive Indicator Pills Flanked by Nav Controls: < .... > */}
        <div className="flex justify-center items-center gap-4 sm:gap-6 mt-8 sm:mt-10">
          <button
            type="button"
            onClick={handlePrev}
            className="w-9 h-9 rounded-full bg-white/[0.08] border border-white/15 hover:border-brand-orange hover:bg-brand-orange hover:text-white text-slate-200 flex items-center justify-center transition-all shadow-md active:scale-95 group"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <div className="flex items-center gap-2">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeRealIndex === idx 
                    ? 'w-8 bg-brand-orange shadow-sm shadow-brand-orange/50' 
                    : 'w-2 bg-white/20 hover:bg-brand-orange/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="w-9 h-9 rounded-full bg-white/[0.08] border border-white/15 hover:border-brand-orange hover:bg-brand-orange hover:text-white text-slate-200 flex items-center justify-center transition-all shadow-md active:scale-95 group"
            aria-label="Next review"
          >
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Enhanced Bottom Trust & Social Proof Bar (Dark Glassmorphic) */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto">
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-2xl flex flex-col sm:flex-row items-center justify-around gap-4 text-center">
            
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 border border-amber-400/30 flex items-center justify-center shrink-0">
                <Star className="w-4 h-4 fill-current text-brand-orange" />
              </div>
              <span><strong className="text-white">4.9 / 5.0</strong> Clutch & Google Reviews</span>
            </div>

            <div className="hidden sm:block w-px h-6 bg-white/10" />

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
              </div>
              <span><strong className="text-white">100%</strong> On-Time Production Deployments</span>
            </div>

            <div className="hidden sm:block w-px h-6 bg-white/10" />

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 text-brand-orange border border-orange-400/30 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4 text-brand-orange" />
              </div>
              <span><strong className="text-white">500+</strong> Happy Enterprise Clients</span>
            </div>

          </div>
        </div>
      </div>

      {/* 7. Cinematic Bottom Transition Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-14 bg-brand-soft [clip-path:polygon(0_65%,100%_0%,100%_100%,0%_100%)] pointer-events-none z-20" />
    </section>
  );
}
