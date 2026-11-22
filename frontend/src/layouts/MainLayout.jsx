import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import ScrollToTop from '../components/common/ScrollToTop';
import WhatsAppBubble from '../components/common/WhatsAppBubble';
import { pageTransitionVariants } from '../animations/pageTransitions';
import usePageTransition from '../hooks/usePageTransition';

export default function MainLayout() {
  const location = useLocation();
  usePageTransition();

  return (
    <div className="min-h-screen flex flex-col bg-brand-soft text-slate-800 antialiased selection:bg-brand-orange selection:text-white">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppBubble />
    </div>
  );
}
