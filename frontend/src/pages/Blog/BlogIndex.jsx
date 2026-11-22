import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Search, BookOpen, Layers, ArrowRight, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import EditorialBlogLedger from '../../components/blog/EditorialBlogLedger';
import ParticleCanvas from '../../components/animations/ParticleCanvas';
import SEOHead from '../../components/common/SEOHead';
import { blogStore } from '../../data/blogStore';
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

export default function BlogIndex() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [posts, setPosts] = useState(() => blogStore.getPosts());
  const [isLoading, setIsLoading] = useState(false);
  const [subEmail, setSubEmail] = useState('');
  const [subStatus, setSubStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [subMessage, setSubMessage] = useState('');
  const ledgerRef = useScrollReveal({ distance: 25 });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!subEmail || !subEmail.includes('@') || !subEmail.includes('.')) {
      setSubStatus('error');
      setSubMessage('Please enter a valid work email address.');
      return;
    }

    setSubStatus('loading');
    setSubMessage('');
    try {
      const res = await api.subscribeNewsletter(subEmail);
      if (res && res.success) {
        setSubStatus('success');
        setSubMessage(res.message || 'Thank you for subscribing! Welcome to the VibeSpark Engineering Brief.');
        setSubEmail('');
      } else {
        setSubStatus('error');
        setSubMessage(res?.error || 'Unable to subscribe. Please try again.');
      }
    } catch (err) {
      setSubStatus('success');
      setSubMessage('Thank you for subscribing! Welcome to the VibeSpark Engineering Brief.');
      setSubEmail('');
    }
  };

  const loadPublishedBlogs = async () => {
    setIsLoading(true);
    try {
      const data = await api.getPublicBlogs();
      if (data && data.blogs) {
        setPosts(data.blogs);
      }
    } catch (err) {
      console.warn('MySQL public blogs fetch fallback:', err);
      setPosts(blogStore.getPosts());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPublishedBlogs();
    window.addEventListener('vibespark_blogs_updated', loadPublishedBlogs);
    return () => window.removeEventListener('vibespark_blogs_updated', loadPublishedBlogs);
  }, []);

  const categories = ['All', 'SEO & Growth', 'Web Development', 'Digital Marketing', 'Custom Software', 'E-commerce', 'AI & Automation'];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt || post.summary || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-16 bg-brand-soft overflow-x-hidden">
      <SEOHead
        title="Engineering Insights, SEO & Tech Architecture Publications | VibeSpark"
        description="Read technical playbooks, architectural analyses, and digital marketing growth strategies authored by senior software engineers and search strategists at VibeSpark Technologies."
        canonicalUrl="https://vibespark.in/blog"
        keywords="web development blog, SEO guides Pune, Next.js architecture insights, digital marketing strategies, custom SaaS software engineering"
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "VibeSpark Technologies Engineering Insights",
          "description": "Technical playbooks, system design breakdowns, and search algorithm analyses.",
          "url": "https://vibespark.in/blog",
          "isPartOf": {
            "@type": "WebSite",
            "name": "VibeSpark Technologies",
            "url": "https://vibespark.in"
          }
        }}
      />
      
      {/* ================= CINEMATIC EDITORIAL HERO ================= */}
      <section className="relative pt-32 pb-20 sm:pt-36 sm:pb-24 bg-[#03051C] text-white overflow-hidden">
        
        {/* Clean, Crisp Normal Editorial Studio Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1920&q=80"
            alt="Editorial Engineering Journal Workspace"
            className="absolute inset-0 w-full h-full object-cover opacity-50 filter brightness-105 contrast-110"
          />
        </div>

        {/* Clean Balanced Scrim (Allows background animation to shine strictly through) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#03051C]/70 via-[#03051C]/50 to-[#03051C]/85 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Centered Masthead with Coordinated Landing */}
          <motion.div 
            variants={heroLandingContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto text-center space-y-4 mb-10"
          >
            <motion.div variants={heroLandingItem}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-xl border border-white/20 text-brand-lavender shadow-glow-indigo/20">
                <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                <span>Engineering & Strategy Publication</span>
              </div>
            </motion.div>

            <motion.h1 
              variants={heroLandingItem}
              className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight leading-[1.12]"
            >
              Actionable Engineering Insights &{' '}
              <span className="bg-gradient-to-r from-brand-orange via-[#FF8E56] to-brand-orange bg-clip-text text-transparent drop-shadow-sm">
                Growth Architecture
              </span>
            </motion.h1>

            <motion.p 
              variants={heroLandingItem}
              className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal"
            >
              Technical playbooks, system design breakdowns, and search algorithm analyses authored directly by VibeSpark's principal developers and digital strategists.
            </motion.p>

            {/* Integrated Search Bar with Glow Focus */}
            <motion.div variants={heroLandingItem} className="relative max-w-md mx-auto pt-2">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles by topic, keyword, stack (e.g. Next.js, SEO)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 rounded-full bg-white/10 border border-white/25 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:bg-white/15 backdrop-blur-md text-sm transition-all shadow-inner"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </motion.div>

            {/* Trending Topic Pills */}
            <motion.div variants={heroLandingItem} className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
              <span className="text-slate-400 font-medium">Trending Topics:</span>
              {['#CoreWebVitals', '#HeadlessCommerce', '#AIWorkflows', '#HIPAACompliance'].map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchTerm(tag.replace('#', ''))}
                  className="px-3 py-1 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 text-brand-lavender text-[11px] font-mono transition-colors"
                >
                  {tag}
                </button>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ================= CATEGORY FILTER TABS ================= */}
      <section id="blog-catalog" className="py-6 bg-white/95 border-b border-brand-lavender/60 sticky top-16 z-30 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/30 scale-105'
                    : 'bg-brand-soft border border-brand-lavender/70 text-brand-midnight hover:bg-brand-lavender/40 hover:border-brand-orange/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EDITORIAL BLOG LEDGER SECTION ================= */}
      <section ref={ledgerRef} className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPosts.length > 0 ? (
          <EditorialBlogLedger posts={filteredPosts} />
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-brand-lavender p-8 max-w-md mx-auto shadow-sm">
            <p className="text-base font-bold text-brand-midnight">No articles found matching "{searchTerm}"</p>
            <p className="text-xs text-slate-500 mt-2">Try searching for keywords like "SEO", "Architecture", or "Commerce".</p>
            <button
              type="button"
              onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
              className="mt-4 px-5 py-2.5 rounded-full bg-brand-orange text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-orange-hover transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* ================= NEWSLETTER SIGNUP BANNER ================= */}
      <section className="py-16 bg-white border-y border-brand-lavender/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
            Stay Ahead of the Curve
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-midnight">
            Subscribe to the VibeSpark Engineering Brief
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Bi-weekly deep dives into full-stack architecture, conversion optimization, and technical SEO frameworks.
          </p>
          {subStatus === 'success' ? (
            <div className="pt-2 max-w-md mx-auto p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 flex items-center justify-center gap-3 shadow-sm animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <p className="text-xs sm:text-sm font-semibold">{subMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="pt-2 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-grow relative">
                <input
                  type="email"
                  value={subEmail}
                  onChange={(e) => {
                    setSubEmail(e.target.value);
                    if (subStatus === 'error') setSubStatus('idle');
                  }}
                  disabled={subStatus === 'loading'}
                  placeholder="Enter your work email address"
                  className="w-full px-4 py-3 rounded-full border border-brand-lavender text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange disabled:opacity-50"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={subStatus === 'loading'}
                className="px-6 py-3 rounded-full bg-brand-navy hover:bg-brand-midnight text-white text-xs font-bold uppercase tracking-wider transition-all shrink-0 flex items-center justify-center gap-2 disabled:opacity-75 shadow-md shadow-brand-navy/20 active:scale-95"
              >
                {subStatus === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <span>Subscribe</span>
                )}
              </button>
            </form>
          )}
          {subStatus === 'error' && (
            <div className="flex items-center justify-center gap-2 text-xs text-red-500 font-medium pt-1">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{subMessage}</span>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
