import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Heart
} from 'lucide-react';
import { LinkedinIcon, TwitterIcon, YoutubeIcon, InstagramIcon } from '../common/SocialIcons';
import VibeSparkLogo from '../common/VibeSparkLogo';
import { siteConfig } from '../../data/siteData';

export default function Footer() {
  return (
    <footer className="relative bg-[#050722] text-white overflow-hidden pt-16 pb-8 border-t border-white/10">
      {/* Background High-Tech Digital Architecture Image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80"
          alt="Digital Network and Cloud Infrastructure"
          className="w-full h-full object-cover object-center opacity-20 filter brightness-75 contrast-125 mix-blend-screen"
        />
        {/* Deep Midnight Navy Gradient Overlays for Maximum Contrast & Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050722]/95 via-[#080B35]/85 to-[#030416]/98" />
        <div className="absolute inset-0 bg-[#050722]/50 backdrop-blur-[1px]" />
      </div>

      {/* Decorative gradient glow mesh */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-indigo/20 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Responsive 12-Column Grid (On mobile: Brand full width, Links 2-columns side-by-side, Contact full width) */}
        <div className="grid grid-cols-12 gap-y-10 gap-x-6 sm:gap-8 lg:gap-8 pb-12 sm:pb-14 border-b border-white/10">
          
          {/* Col 1: Brand & Socials (Full width on mobile, 4 cols on desktop) */}
          <div className="col-span-12 lg:col-span-4 space-y-4 sm:space-y-5">
            <VibeSparkLogo variant="dark" size="lg" />
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              Powering Ideas. Creating Digital Experiences. We help enterprises and high-growth brands design, develop, and scale modern web platforms.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-brand-indigo hover:border-brand-indigo transition-all duration-200"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-brand-indigo hover:border-brand-indigo transition-all duration-200"
                aria-label="Twitter / X"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#FF0000] hover:border-[#FF0000] transition-all duration-200"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#E1306C] hover:border-[#E1306C] transition-all duration-200"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (6 cols on mobile = 50% width, 2 cols on desktop) */}
          <div className="col-span-6 sm:col-span-6 lg:col-span-2 space-y-3.5 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-slate-300 font-medium">
              <li><Link to="/" className="hover:text-brand-orange transition-colors block py-0.5">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-orange transition-colors block py-0.5">About Us</Link></li>
              <li><Link to="/services" className="hover:text-brand-orange transition-colors block py-0.5">Services</Link></li>
              <li><Link to="/industries" className="hover:text-brand-orange transition-colors block py-0.5">Industries</Link></li>
              <li><Link to="/portfolio" className="hover:text-brand-orange transition-colors block py-0.5">Portfolio</Link></li>
              <li><Link to="/blog" className="hover:text-brand-orange transition-colors block py-0.5">Blog & News</Link></li>
              <li><Link to="/contact" className="hover:text-brand-orange transition-colors block py-0.5">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3: Services (6 cols on mobile = 50% width, 3 cols on desktop) */}
          <div className="col-span-6 sm:col-span-6 lg:col-span-3 space-y-3.5 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              Our Services
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-slate-300 font-medium">
              <li><Link to="/services/web-development" className="hover:text-brand-orange transition-colors block py-0.5">Web Development</Link></li>
              <li><Link to="/services/seo" className="hover:text-brand-orange transition-colors block py-0.5">SEO & Growth</Link></li>
              <li><Link to="/services/digital-marketing" className="hover:text-brand-orange transition-colors block py-0.5">Digital Marketing</Link></li>
              <li><Link to="/services/software-development" className="hover:text-brand-orange transition-colors block py-0.5">Custom Software</Link></li>
              <li><Link to="/services/ecommerce" className="hover:text-brand-orange transition-colors block py-0.5">E-commerce</Link></li>
              <li><Link to="/services/automation" className="hover:text-brand-orange transition-colors block py-0.5">Automation</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact details & CTA card (Full width on mobile, 3 cols on desktop) */}
          <div className="col-span-12 sm:col-span-12 lg:col-span-3 space-y-4 pt-2 lg:pt-0">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              Contact With Us
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-brand-orange mt-0.5 shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors break-all">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-orange mt-0.5 shrink-0" />
                <span>{siteConfig.address}</span>
              </li>
            </ul>

            {/* Orange CTA card */}
            <div className="mt-3 p-4 rounded-2xl bg-gradient-to-r from-brand-orange to-[#FF6224] text-white shadow-xl shadow-brand-orange/20 flex items-center justify-between group">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/90">Ready to Grow Your Business?</p>
                <p className="text-[11px] text-white/80 mt-0.5">Get a free consultation today!</p>
              </div>
              <Link 
                to="/contact" 
                className="w-8 h-8 rounded-full bg-white text-brand-orange flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform"
                aria-label="Contact VibeSpark"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4 text-center sm:text-left">
          <p>© {siteConfig.copyrightYear} {siteConfig.companyName}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link to="/privacy-policy" className="hover:text-slate-200 transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms-conditions" className="hover:text-slate-200 transition-colors">Terms & Conditions</Link>
            <span>•</span>
            <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="hover:text-slate-200 transition-colors">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
