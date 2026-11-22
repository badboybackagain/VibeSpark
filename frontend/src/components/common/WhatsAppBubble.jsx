import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { siteConfig } from '../../data/siteData';

export default function WhatsAppBubble() {
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Default clean phone number formatted for wa.me URL
  const rawPhone = (siteConfig?.phone || '+91 90284 46832').replace(/[^0-9]/g, '');
  const encodedMessage = encodeURIComponent(
    "Hello VibeSpark Technologies! I visited your website and would like to learn more about your services."
  );
  const whatsappUrl = `https://wa.me/${rawPhone}?text=${encodedMessage}`;

  // Subtle reveal after initial mount & scroll awareness
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setHasScrolled(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside 
      aria-label="WhatsApp quick contact"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3 select-none"
    >
      {/* Floating Prompt Pill / Tooltip (Desktop & Tablet) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="hidden sm:flex items-center gap-2.5 pl-3.5 pr-2 py-2 rounded-full bg-slate-950/90 text-white backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/40 group cursor-pointer"
            onClick={() => window.open(whatsappUrl, '_blank', 'noopener,noreferrer')}
          >
            {/* Live Green Status Pulse */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>

            <div className="text-left leading-tight pr-1">
              <p className="text-[10px] text-slate-300 font-medium">Quick Consultation</p>
              <p className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                Chat on WhatsApp
              </p>
            </div>

            {/* Close tooltip button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white flex items-center justify-center transition-colors ml-1"
              aria-label="Dismiss WhatsApp badge"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp Circular Action Bubble */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with VibeSpark Technologies on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-gradient-to-tr from-[#1EBE5D] via-[#25D366] to-[#34E07B] text-white flex items-center justify-center shadow-[0_10px_35px_-5px_rgba(37,211,102,0.55)] hover:shadow-[0_15px_45px_-5px_rgba(37,211,102,0.7)] transition-shadow duration-300 group border-2 border-white/30"
      >
        {/* Radar ping ring to draw subtle attention */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-60 pointer-events-none" />

        {/* Glossy top reflective highlight */}
        <span className="absolute top-1 left-2 right-2 h-3 rounded-full bg-white/25 pointer-events-none blur-[0.5px]" />

        {/* Official WhatsApp Icon */}
        <FaWhatsapp className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-md relative z-10 transition-transform duration-300 group-hover:rotate-6" />

        {/* Small Active Badge Dot (Mobile) */}
        <span className="sm:hidden absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-900 shadow-sm" />
      </motion.a>
    </aside>
  );
}
