import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  Clock, 
  Share2, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight,
  BookOpen,
  Bookmark
} from 'lucide-react';
import { motion } from 'framer-motion';
import SEOHead from '../../components/common/SEOHead';
import { blogStore } from '../../data/blogStore';
import { blogDetailsMap } from '../../data/blogDetailsData';
import { blogPostsData } from '../../data/siteData';

import { api } from '../../lib/api';

export default function BlogDetail() {
  const { blogId } = useParams();
  
  // Clean blogId to avoid double /blog/ prefix issues
  const cleanId = (blogId || '').replace(/^\/blog\//, '').replace(/^\//, '');

  const [post, setPost] = useState(() => {
    return (
      blogStore.getPostBySlug(cleanId) || 
      blogStore.getPostBySlug(blogId) || 
      blogDetailsMap[cleanId] || 
      blogDetailsMap[blogId] || 
      blogPostsData.find(p => p.id === cleanId || p.slug === cleanId || p.slug === `/blog/${cleanId}` || p.id === blogId)
    );
  });

  // Fetch directly from MySQL database!
  useEffect(() => {
    let isMounted = true;
    api.getPublicBlogBySlug(cleanId)
      .then(res => {
        if (isMounted && res.blog) {
          setPost(res.blog);
        }
      })
      .catch(err => {
        console.warn('MySQL live blog fetch note:', err);
      });
    return () => { isMounted = false; };
  }, [cleanId]);

  const [scrollProgress, setScrollProgress] = useState(0);

  // Automatically scroll to the top of the page when opening any article!
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [blogId, cleanId]);

  // Track window scroll reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Related articles (exclude current)
  const allPosts = blogStore.getPosts();
  const relatedArticles = allPosts.filter(p => p.id !== post.id && p.slug !== post.slug).slice(0, 3);

  // Rich JSON-LD Article & Breadcrumb Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `https://vibespark.in/blog/${post.slug || post.id}#article`,
        "isPartOf": {
          "@type": "WebPage",
          "@id": `https://vibespark.in/blog/${post.slug || post.id}`
        },
        "headline": post.title,
        "description": post.metaDescription || post.summary || post.excerpt,
        "image": post.image,
        "datePublished": "2025-09-12T08:00:00+05:30",
        "dateModified": "2026-11-21T10:00:00+05:30",
        "author": {
          "@type": "Person",
          "name": post.author?.name || "VibeSpark Technical Squad",
          "jobTitle": post.author?.role || "Principal Architect"
        },
        "publisher": {
          "@type": "Organization",
          "name": "VibeSpark Technologies",
          "url": "https://vibespark.in",
          "logo": {
            "@type": "ImageObject",
            "url": "https://vibespark.in/assets/logos/vibespark-logo.png"
          }
        },
        "mainEntityOfPage": `https://vibespark.in/blog/${post.slug || post.id}`
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://vibespark.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://vibespark.in/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": `https://vibespark.in/blog/${post.slug || post.id}`
          }
        ]
      }
    ]
  };

  return (
    <div className="pb-20 bg-brand-soft overflow-x-hidden min-h-screen">
      <SEOHead
        title={post.seoTitle || `${post.title} | VibeSpark Insights`}
        description={post.metaDescription || post.summary || post.excerpt}
        canonicalUrl={`https://vibespark.in/blog/${post.slug || post.id}`}
        ogType="article"
        ogImage={post.image}
        keywords={`${post.primaryKeyword || post.category}, ${post.secondaryKeywords || 'web development, SEO, software engineering'}`}
        schema={articleSchema}
        article={{
          publishedTime: "2025-09-12T08:00:00+05:30",
          author: post.author?.name || "VibeSpark Technical Squad",
          section: post.category
        }}
      />
      
      {/* ================= TOP READING PROGRESS BAR ================= */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-brand-lavender/30 z-[100] pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-brand-orange via-[#FF8E56] to-brand-orange transition-all duration-100 ease-out shadow-sm"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ================= ARTICLE HERO BANNER (INTEGRATED EDITORIAL 2-COL) ================= */}
      <section className="relative pt-32 pb-14 sm:pt-36 sm:pb-16 bg-[#050724] text-white overflow-hidden border-b border-white/10">
        
        {/* Subtle ambient atmospheric lighting */}
        <div className="absolute top-0 right-0 w-[550px] h-[450px] bg-brand-indigo/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[450px] h-[350px] bg-brand-orange/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumbs & Back Link */}
          <div className="flex items-center justify-between mb-8 text-xs text-brand-lavender/80">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 hover:text-white transition-colors group font-semibold"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-brand-orange" />
              <span>Back to All Publications</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-brand-orange font-semibold">{post.category}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Metadata & Title (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-xl border border-white/20 text-brand-lavender shadow-glow-indigo/20">
                <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                <span>{post.category}</span>
              </div>

              {/* Main Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight leading-[1.2]">
                {post.title}
              </h1>

              {/* Subtitle / Excerpt */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal max-w-2xl">
                {post.subtitle || post.excerpt}
              </p>

              {/* Author & Meta Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/10 text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-brand-orange p-1.5 flex items-center justify-center shrink-0 shadow-md">
                    <img
                      src={post.author?.avatar || "/vibespark-logo.png"}
                      alt={post.author?.name || "VibeSpark Team"}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/vibespark-logo.png";
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-bold text-white text-xs sm:text-sm">{post.author?.name || "VibeSpark Team"}</p>
                    <p className="text-[11px] text-brand-lavender/80">{post.author?.role || "Editorial & Engineering Team"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-300 font-semibold text-xs">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                    <span>{post.date}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-brand-indigo" />
                    <span>{post.readTime}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Featured Image Integrated in Header (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-2xl aspect-[16/10] lg:aspect-[4/3] bg-brand-midnight group">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= 2-COLUMN LUXURY EDITORIAL GRID ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Main Article Content (8 cols) */}
          <article className="lg:col-span-8 space-y-10">
            
            {/* Executive Summary Box */}
            {post.summary && (
              <div className="p-7 sm:p-9 rounded-3xl bg-white border border-brand-lavender shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 bottom-0 w-2 bg-gradient-to-b from-brand-orange to-[#FF6224]" />
                <span className="text-xs font-bold uppercase tracking-wider text-brand-orange block mb-2">
                  Executive Briefing
                </span>
                <p className="text-base sm:text-lg text-brand-midnight font-medium leading-relaxed">
                  {post.summary}
                </p>
              </div>
            )}

            {/* Key Takeaways Callout Box */}
            {post.takeaways && post.takeaways.length > 0 && (
              <div className="p-7 sm:p-9 rounded-3xl bg-[#060826] text-white border border-brand-indigo/30 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brand-orange" />
                  <span>Key Architectural Takeaways</span>
                </h3>
                <ul className="space-y-3.5">
                  {post.takeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-200 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-1" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* TipTap Rich Text Article Content (Direct from MySQL) */}
            {post.content && (
              <div 
                className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-5 font-normal pt-2 [&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:font-extrabold [&>h2]:text-brand-midnight [&>h2]:tracking-tight [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-brand-midnight [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>blockquote]:border-l-4 [&>blockquote]:border-brand-orange [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-slate-600"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            )}

            {/* Deep Dive Sections (Fallback if content is missing) */}
            {!post.content && post.sections && post.sections.map((sec, idx) => (
              <div key={idx} id={`section-${idx}`} className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-orange uppercase tracking-wider">
                  <span>Part 0{idx + 1} //</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-midnight tracking-tight leading-snug">
                  {sec.heading}
                </h2>
                <div className="p-1 text-base text-slate-700 leading-relaxed space-y-4">
                  <p>{sec.content}</p>
                </div>
              </div>
            ))}

            {/* In-Article Enterprise Consultation Banner */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#060826] to-[#04061F] text-white my-14 space-y-5 border border-brand-indigo/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-brand-lavender border border-white/15">
                <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                <span>Enterprise Engineering Advisory</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Ready to Implement These Capabilities in Your Business?
              </h3>
              <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
                Our full-stack engineers and search growth strategists build custom digital platforms engineered for verified commercial returns.
              </p>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-brand-orange to-[#FF6224] hover:from-[#FF6224] hover:to-brand-orange shadow-lg shadow-brand-orange/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Schedule Free Strategy Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </article>

          {/* Sticky Editorial Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-8 sticky top-24">
            
            {/* Table of Contents Card */}
            {post.sections && post.sections.length > 0 && (
              <div className="p-6 rounded-3xl bg-white border border-brand-lavender/90 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-navy mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-brand-orange" />
                  <span>In This Publication</span>
                </h4>
                <nav className="space-y-2.5">
                  {post.sections.map((sec, idx) => (
                    <a
                      key={idx}
                      href={`#section-${idx}`}
                      className="block text-xs font-semibold text-slate-600 hover:text-brand-orange hover:translate-x-1 transition-all py-1 border-l-2 border-slate-100 hover:border-brand-orange pl-3 line-clamp-1"
                    >
                      {sec.heading}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Author Spotlight Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-brand-lavender/90 shadow-sm space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange block">
                Editorial Review
              </span>
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-slate-900 p-2 border-2 border-brand-orange shadow-md flex items-center justify-center shrink-0">
                  <img
                    src={post.author?.avatar || "/vibespark-logo.png"}
                    alt={post.author?.name || "VibeSpark Team"}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/vibespark-logo.png";
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-midnight">
                    {post.author?.name || "VibeSpark Team"}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {post.author?.role || "Editorial & Engineering Team"}
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Authored by the engineering and digital growth specialists at VibeSpark Technologies specializing in high-concurrency web systems and technical SEO algorithms.
              </p>
            </div>

            {/* Quick Strategy Consultation CTA Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#060826] text-white border border-brand-indigo/30 shadow-xl space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/20 rounded-full blur-2xl pointer-events-none" />
              <div className="w-10 h-10 rounded-xl bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center text-brand-orange font-bold text-sm">
                ⚡
              </div>
              <h4 className="font-bold text-base text-white">
                Need Custom Architectural Implementation?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect directly with our lead architects in Pune for a 30-minute system assessment.
              </p>
              <Link
                to="/contact"
                className="w-full py-3 rounded-full bg-gradient-to-r from-brand-orange to-[#FF6224] hover:from-[#FF6224] hover:to-brand-orange text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/30 active:scale-95 transition-all"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </aside>

        </div>
      </div>

      {/* ================= RELATED ARTICLES ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-brand-lavender/60">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange block mb-1">
              Further Reading
            </span>
            <h3 className="text-2xl font-extrabold text-brand-midnight">
              Related Engineering Insights
            </h3>
          </div>
          <Link
            to="/blog"
            className="text-xs font-bold text-brand-orange hover:underline flex items-center gap-1.5"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((rel) => (
            <Link
              key={rel.id}
              to={`/blog/${rel.id}`}
              className="group bg-white rounded-2xl overflow-hidden border border-brand-lavender/80 shadow-sm hover:shadow-xl hover:border-brand-orange/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-brand-midnight">
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange block mb-1.5">
                    {rel.category}
                  </span>
                  <h4 className="text-base font-bold text-brand-midnight group-hover:text-brand-orange transition-colors line-clamp-2 mb-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {rel.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between text-xs text-slate-400 font-semibold border-t border-brand-lavender/40 mt-2">
                <span>{rel.readTime}</span>
                <span className="text-brand-midnight font-bold group-hover:text-brand-orange flex items-center gap-1">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
