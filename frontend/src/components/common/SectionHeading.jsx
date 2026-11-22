import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function SectionHeading({
  badge,
  title,
  highlight,
  description,
  align = 'left',
  theme = 'light',
  className = '',
  action = null
}) {
  const isDark = theme === 'dark';
  const isCenter = align === 'center';
  const shouldReduceMotion = useReducedMotion();

  const luxuryEase = [0.16, 1, 0.3, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: luxuryEase }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.94, y: shouldReduceMotion ? 0 : -8 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: luxuryEase }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: '-40px' }}
      variants={containerVariants}
      className={`mb-10 sm:mb-12 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'} ${className}`}
    >
      {/* Badge with accent dot */}
      {badge && (
        <motion.div 
          variants={badgeVariants}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3.5 ${
            isDark 
              ? 'bg-brand-indigo/25 text-brand-lavender border border-brand-indigo/30' 
              : 'bg-brand-lavender/40 text-brand-navy border border-brand-lavender'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
          <span>{badge}</span>
        </motion.div>
      )}

      {/* Main Heading */}
      <motion.h2 
        variants={itemVariants}
        className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight ${
          isDark ? 'text-white' : 'text-brand-midnight'
        }`}
      >
        {title}{' '}
        {highlight && (
          <span className="text-brand-orange inline-block">
            {highlight}
          </span>
        )}
      </motion.h2>

      {/* Description & Action */}
      <div className={`mt-3.5 flex flex-col sm:flex-row ${isCenter ? 'items-center justify-center' : 'items-start justify-between'} gap-4`}>
        {description && (
          <motion.p 
            variants={itemVariants}
            className={`text-base sm:text-lg leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {description}
          </motion.p>
        )}
        {action && (
          <motion.div 
            variants={itemVariants}
            className="shrink-0 pt-1"
          >
            {action}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
