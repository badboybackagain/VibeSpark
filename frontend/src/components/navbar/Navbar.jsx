import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight, 
  Sparkles
} from 'lucide-react';
import VibeSparkLogo from '../common/VibeSparkLogo';
import { navLinks, siteConfig } from '../../data/siteData';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null);
  const location = useLocation();

  // Scroll listener for dynamic glass morphing
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const toggleMobileSection = (name) => {
    setMobileExpandedSection(prev => (prev === name ? null : name));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      
      {/* Outer Shell: Pure smooth transition with zero white outline or layout flash */}
      <div 
        className={`pointer-events-auto transition-all duration-300 ease-out ${
          isScrolled || mobileMenuOpen
            ? 'w-full py-3 px-4 sm:px-8 bg-[#050726]/95 backdrop-blur-xl border-b border-[#403CFF]/30 shadow-2xl shadow-black/80' 
            : 'max-w-7xl mx-auto mt-3 sm:mt-4 px-4 sm:px-6'
        }`}
      >
        <div 
          className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled || mobileMenuOpen
              ? 'max-w-7xl mx-auto' 
              : 'py-2.5 px-5 sm:px-6 rounded-full bg-[#080B38]/95 backdrop-blur-xl border border-[#403CFF]/30 shadow-xl shadow-black/40'
          }`}
        >
          
          {/* ================= 1. CLICKABLE LOGO ================= */}
          <div className="flex items-center transition-transform duration-200 hover:scale-[1.03] cursor-pointer relative z-30 pointer-events-auto">
            <VibeSparkLogo 
              variant="dark" 
              size="md" 
              onClick={() => {
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>

          {/* ================= 2. DESKTOP NAVIGATION ================= */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((item) => {
              if (item.hasDropdown) {
                const isOpen = activeDropdown === item.name;
                const isCurrentCategory = location.pathname.startsWith(item.path);

                return (
                  <div 
                    key={item.name}
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors duration-200 outline-none focus:outline-none select-none ${
                        isCurrentCategory 
                          ? 'text-brand-orange font-bold' 
                          : 'text-slate-200 hover:text-white'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown 
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-orange' : 'text-slate-400'}`} 
                      />
                    </button>

                    {/* Animated Dropdown Menu */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.16, ease: 'easeOut' }}
                          style={{ backgroundColor: '#060826' }}
                          className="absolute left-0 mt-2 w-[360px] p-3 rounded-2xl bg-[#060826] border border-[#403CFF]/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] z-[100]"
                        >
                          <div className="grid gap-1">
                            {item.children.map((subItem) => (
                              <Link
                                key={subItem.path}
                                to={subItem.path}
                                onClick={() => setActiveDropdown(null)}
                                className="group/item flex items-start p-2.5 rounded-xl hover:bg-white/[0.07] transition-all duration-150 outline-none focus:outline-none"
                              >
                                <div className="p-2 rounded-lg bg-[#0E1245] border border-brand-indigo/40 text-brand-lavender group-hover/item:text-brand-orange group-hover/item:border-brand-orange/50 group-hover/item:bg-brand-orange/15 mr-3 transition-colors mt-0.5 shrink-0">
                                  <Sparkles className="w-3.5 h-3.5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-bold text-white group-hover/item:text-brand-orange group-hover/item:translate-x-0.5 transition-all">
                                    {subItem.name}
                                  </div>
                                  <p className="text-xs text-slate-300 line-clamp-1 mt-0.5 font-normal">
                                    {subItem.desc}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                          
                          <div className="mt-2.5 pt-2.5 border-t border-white/10 px-2.5 py-1 flex items-center justify-between text-xs text-brand-lavender">
                            <span>Explore all {item.name.toLowerCase()}</span>
                            <Link 
                              to={item.path} 
                              onClick={() => setActiveDropdown(null)}
                              className="text-brand-orange font-bold hover:underline inline-flex items-center gap-1 group/viewall"
                            >
                              <span>View catalog</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover/viewall:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3.5 py-2 text-sm font-semibold transition-colors duration-200 relative outline-none focus:outline-none select-none ${
                      isActive 
                        ? 'text-white font-bold' 
                        : 'text-slate-300 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{item.name}</span>
                      {isActive && (
                        <span 
                          className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-orange rounded-full shadow-[0_0_8px_rgba(244,119,59,0.8)]"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* ================= 3. RIGHT ACTION: ORANGE CTA BUTTON ================= */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/contact"
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs tracking-wider uppercase text-white bg-gradient-to-r from-brand-orange to-[#FF6224] hover:from-[#FF6224] hover:to-brand-orange shadow-lg shadow-brand-orange/30 hover:shadow-brand-orange/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* ================= 4. MOBILE HAMBURGER BUTTON ================= */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/contact"
              className="px-3 py-1.5 rounded-full text-xs font-bold text-white bg-brand-orange shadow-sm sm:hidden"
            >
              Consult
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* ================= 5. MOBILE DRAWER MENU ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ backgroundColor: '#050726' }}
            className="pointer-events-auto lg:hidden bg-[#050726] border-b border-[#403CFF]/40 px-5 pt-3 pb-8 max-h-[85vh] overflow-y-auto shadow-2xl shadow-black/95 text-white"
          >
            <div className="flex flex-col space-y-1 pt-2">
              {navLinks.map((item) => {
                if (item.hasDropdown) {
                  const isExpanded = mobileExpandedSection === item.name;
                  return (
                    <div key={item.name} className="border-b border-white/10 pb-1">
                      <button
                        type="button"
                        onClick={() => toggleMobileSection(item.name)}
                        className="w-full flex items-center justify-between py-3 text-base font-bold text-white hover:text-brand-orange transition-colors"
                      >
                        <span className="text-white">{item.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-brand-orange' : 'text-slate-400'}`} />
                      </button>

                      {isExpanded && (
                        <div className="pl-3 pr-2 py-2 space-y-1 bg-[#090D3D] border border-white/10 rounded-xl mb-3 shadow-inner">
                          <Link
                            to={item.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-2 text-xs font-bold text-brand-orange uppercase tracking-wider hover:underline"
                          >
                            Explore All {item.name} →
                          </Link>
                          {item.children.map((sub) => (
                            <Link
                              key={sub.path}
                              to={sub.path}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-2 text-sm font-semibold text-slate-100 hover:text-brand-orange hover:translate-x-1 transition-all border-t border-white/5"
                            >
                              <span>{sub.name}</span>
                              {sub.desc && <p className="text-xs text-slate-400 line-clamp-1 mt-0.5 font-normal">{sub.desc}</p>}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-3 text-base font-bold transition-colors border-b border-white/10 ${
                        isActive ? 'text-brand-orange' : 'text-white hover:text-brand-orange'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                );
              })}

              {/* Mobile CTA & Quick Details */}
              <div className="pt-4 space-y-3">
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-[#FF6224] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Get a Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="text-center text-xs text-slate-300 font-medium pt-2">
                  <p>Nyati Ethereal, Kharadi, Pune • {siteConfig.phone}</p>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
