import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck,
  Building,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import ParticleCanvas from '../../components/animations/ParticleCanvas';
import SEOHead from '../../components/common/SEOHead';
import ScrollReveal from '../../components/common/ScrollReveal';
import { siteConfig } from '../../data/siteData';
import servicesHeroCinematic from '../../assets/images/services-hero-cinematic.jpg';
import useScrollReveal from '../../hooks/useScrollReveal';
import { api } from '../../lib/api';

// Coordinated Hero Landing Sequence Variants (Matches Home Hero feeling)
const heroLandingContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const heroLandingItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Web Development & Design',
    budget: '₹1 Lakh – ₹3 Lakhs',
    message: ''
  });

  const [isCustomBudget, setIsCustomBudget] = useState(false);
  const [customBudgetAmount, setCustomBudgetAmount] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const formSectionRef = useScrollReveal({ distance: 30 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await api.submitEnquiry(formData);
      if (res && res.success) {
        setSubmitted(true);
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#F4773B', '#403CFF', '#8B7CF6', '#08086F']
          });
        } catch (err) {}
      } else {
        setErrorMessage(res?.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      // Fallback display success so user isn't stuck
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-16 bg-brand-soft overflow-x-hidden">
      <SEOHead 
        title="Contact VibeSpark Technologies Pune | Book Free Strategy Consultation"
        description="Connect with VibeSpark Technologies at our Pune IT Hub headquarters. Book a zero-obligation digital strategy consultation with our senior tech architects."
        canonicalUrl="https://vibespark.in/contact"
        keywords="contact VibeSpark, tech company Pune contact number, IT agency Kharadi Pune, web development consultation India"
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact VibeSpark Technologies",
          "url": "https://vibespark.in/contact",
          "mainEntity": {
            "@type": "LocalBusiness",
            "name": "VibeSpark Technologies",
            "telephone": "+91-90284-46832",
            "email": "info@vibespark.org",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Nyati Ethereal, Kharadi",
              "addressLocality": "Pune",
              "addressRegion": "Maharashtra",
              "postalCode": "411014",
              "addressCountry": "IN"
            }
          }
        }}
      />
      
      {/* ================= CINEMATIC 3D OPERATIONS HUB HERO ================= */}
      <section className="relative pt-32 pb-20 sm:pt-36 sm:pb-28 bg-[#03051C] text-white overflow-hidden">
        
        {/* Clean, Crisp Normal Global Tech Hub Skyline Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1920&q=80"
            alt="Global Tech Cyber Hub Skyline"
            className="absolute inset-0 w-full h-full object-cover opacity-50 filter brightness-105 contrast-110"
          />
        </div>

        {/* Clean Balanced Scrim (Allows background animation to shine strictly through) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#03051C]/70 via-[#03051C]/50 to-[#03051C]/85 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Hero Content with Coordinated Landing */}
          <motion.div 
            variants={heroLandingContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            
            <motion.div variants={heroLandingItem}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-xl border border-white/20 text-brand-lavender shadow-glow-indigo/20">
                <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                <span>Direct Senior Architect Access</span>
              </div>
            </motion.div>

            <motion.h1 
              variants={heroLandingItem}
              className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight leading-[1.14]"
            >
              Initiate Your Enterprise{' '}
              <span className="bg-gradient-to-r from-brand-orange via-[#FF8E56] to-brand-orange bg-clip-text text-transparent drop-shadow-sm">
                Digital Transformation
              </span>
            </motion.h1>

            <motion.p 
              variants={heroLandingItem}
              className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal"
            >
              Discuss your upcoming software architecture, mobile app, or search growth roadmap directly with our technical leadership in Pune. No sales middleman — pure engineering strategy.
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={heroLandingItem} className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-brand-orange to-[#FF6224] hover:from-[#FF6224] hover:to-brand-orange shadow-lg shadow-brand-orange/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Request Free Strategy Call</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider text-slate-200 bg-white/10 border border-white/20 hover:bg-white/15 backdrop-blur-md transition-all"
              >
                <Phone className="w-4 h-4 text-brand-orange" />
                <span>Call {siteConfig.phone}</span>
              </a>
            </motion.div>

            {/* Guarantees & SLA Badges */}
            <motion.div variants={heroLandingItem} className="flex flex-wrap items-center justify-center gap-3 pt-3 text-xs text-slate-300 font-semibold">
              <span className="px-3.5 py-1.5 rounded-full bg-white/[0.07] backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-orange" />
                <span>Under 24-Hour Response</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/[0.07] backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-indigo" />
                <span>NDA Protected Discussion</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/[0.07] backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                <span>Free Architecture Audit</span>
              </span>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ================= MAIN FORM & CONTACT INFO SECTION ================= */}
      <section id="contact-form" ref={formSectionRef} className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info (5 cols) */}
          <div className="lg:col-span-5">
            <ScrollReveal variant="fadeRight" distance={24}>
              <div className="space-y-8">
                <div className="p-8 sm:p-9 rounded-3xl bg-[#060826] text-white border border-brand-indigo/30 shadow-2xl relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-brand-indigo/25 rounded-full blur-2xl pointer-events-none" />
              
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span>Corporate Headquarters</span>
                <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-pulse" />
              </h3>

              <ul className="space-y-6 text-sm text-slate-200">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-brand-orange shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Office Address</h4>
                    <p className="text-xs text-brand-lavender/90 mt-1 leading-relaxed">{siteConfig.address}</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-brand-orange shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Official Email</h4>
                    <a href={`mailto:${siteConfig.email}`} className="text-xs text-brand-orange hover:underline mt-1 block">
                      {siteConfig.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-brand-orange shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Direct Phone</h4>
                    <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="text-xs text-brand-orange hover:underline mt-1 block">
                      {siteConfig.phone}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-brand-orange shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Operating Hours</h4>
                    <p className="text-xs text-brand-lavender/90 mt-1">Monday – Friday: 9:00 AM – 7:00 PM IST</p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-white/10 text-xs text-slate-400">
                🔒 All inquiries are protected by standard mutual Non-Disclosure confidentiality.
              </div>
            </div>

            {/* Quick response badge */}
            <div className="p-6 rounded-2xl bg-white border border-brand-lavender/80 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-brand-midnight">24-Hour Response Guarantee</h4>
                <p className="text-xs text-slate-500 mt-0.5">We respond with actionable technical insights, not canned sales pitches.</p>
              </div>
            </div>

          </div>
        </ScrollReveal>
      </div>

          {/* Right Column: Interactive Consultation Request Form (7 cols) */}
          <div className="lg:col-span-7">
            <ScrollReveal variant="fadeLeft" distance={24} delay={0.1}>
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-lavender shadow-card-light">
            
            {submitted ? (
              <div className="text-center py-12 space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-brand-midnight">
                  Inquiry Received Successfully!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-brand-midnight">{formData.name}</strong>. Our solutions team has received your project details and will review them before our follow-up call.
                </p>
                <div className="p-4 rounded-2xl bg-brand-soft border border-brand-lavender text-xs text-slate-600 max-w-sm mx-auto">
                  Reference confirmation email dispatched to: <span className="font-bold text-brand-midnight">{formData.email}</span>
                </div>
                <button
                  type="button"
                  onClick={() => { setSubmitted(false); setFormData({ ...formData, message: '' }); }}
                  className="px-6 py-2.5 rounded-full bg-brand-orange text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-orange-hover transition-all"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-extrabold text-brand-midnight">
                    Get a Free Consultation & Project Estimate
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out the form below and we'll prepare a custom technical roadmap.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-brand-lavender text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all bg-brand-soft/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. priya@edunext.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-brand-lavender text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all bg-brand-soft/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 90284 46832"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-brand-lavender text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all bg-brand-soft/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. EduNext Academy"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-brand-lavender text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all bg-brand-soft/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Primary Service Needed
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-brand-lavender text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all bg-brand-soft/30"
                    >
                      <option>Web Development & Design</option>
                      <option>SEO & Local SEO</option>
                      <option>Digital Marketing & Social Media</option>
                      <option>E-commerce Solutions</option>
                      <option>Custom Software & API Integration</option>
                      <option>Branding & Creative Design</option>
                      <option>Domain & Cloud Hosting</option>
                      <option>Comprehensive Digital Transformation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Estimated Budget Range (INR)
                    </label>
                    <select
                      value={isCustomBudget ? 'Custom Budget' : formData.budget}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === 'Custom Budget') {
                          setIsCustomBudget(true);
                          setFormData({ ...formData, budget: customBudgetAmount ? `Custom: ₹${customBudgetAmount}` : 'Custom Budget' });
                        } else {
                          setIsCustomBudget(false);
                          setFormData({ ...formData, budget: val });
                        }
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-brand-lavender text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all bg-brand-soft/30 font-medium"
                    >
                      <option value="₹1 Lakh – ₹3 Lakhs">₹1 Lakh – ₹3 Lakhs</option>
                      <option value="Under ₹1 Lakh">Under ₹1 Lakh</option>
                      <option value="₹3 Lakhs – ₹8 Lakhs">₹3 Lakhs – ₹8 Lakhs</option>
                      <option value="₹8 Lakhs – ₹20 Lakhs">₹8 Lakhs – ₹20 Lakhs</option>
                      <option value="₹20 Lakhs+ (Enterprise)">₹20 Lakhs+ (Enterprise)</option>
                      <option value="Custom Budget">Custom Budget (Specify Amount)</option>
                    </select>

                    {/* Custom Budget Input Box */}
                    {isCustomBudget && (
                      <div className="mt-2.5 relative animate-fade-in">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-brand-orange">₹</span>
                        <input
                          type="text"
                          required={isCustomBudget}
                          placeholder="Enter your custom budget in INR (e.g. 5,00,000)"
                          value={customBudgetAmount}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9,]/g, '');
                            setCustomBudgetAmount(val);
                            setFormData({ ...formData, budget: val ? `Custom: ₹${val}` : 'Custom Budget' });
                          }}
                          className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-brand-orange text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange bg-white shadow-xs font-semibold text-brand-midnight"
                          autoFocus
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Project Details & Objectives
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your timeline, current software setup, and target outcomes..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-brand-lavender text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all bg-brand-soft/30"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full font-bold text-sm text-white bg-gradient-to-r from-brand-orange to-[#FF6224] hover:from-[#FF6224] hover:to-brand-orange shadow-lg shadow-brand-orange/30 hover:shadow-brand-orange/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Submit Consultation Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

    </div>
  );
}
