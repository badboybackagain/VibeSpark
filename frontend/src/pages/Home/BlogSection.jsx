import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading';
import EditorialBlogLedger from '../../components/blog/EditorialBlogLedger';
import ScrollReveal from '../../components/common/ScrollReveal';
import { blogPostsData } from '../../data/siteData';
import { api } from '../../lib/api';

export default function BlogSection() {
  const [posts, setPosts] = useState(() => blogPostsData.slice(0, 3));

  useEffect(() => {
    let isMounted = true;
    api.getPublicBlogs()
      .then((data) => {
        if (isMounted && data && Array.isArray(data.blogs) && data.blogs.length > 0) {
          setPosts(data.blogs.slice(0, 3));
        }
      })
      .catch(() => {
        // Retains pre-rendered static articles if MySQL is cold or restarting
      });
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-brand-soft relative overflow-hidden" id="insights">
      
      {/* Ambient background glow & subtle perspective grid */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[350px] bg-brand-indigo/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6">
          <SectionHeading
            badge="Engineering & Strategy Publication"
            title="Latest Insights &"
            highlight="Industry Trends"
            description="Expert playbooks, algorithm analyses, and architectural frameworks from our senior engineers."
            className="mb-0"
          />

          <div className="shrink-0">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-orange hover:text-brand-orange-hover hover:underline group"
            >
              <span>Explore Complete Publication</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ================= INTERACTIVE EDITORIAL SHOWCASE ================= */}
        <ScrollReveal variant="fadeUp" distance={24} duration={0.7}>
          <EditorialBlogLedger posts={posts} />
        </ScrollReveal>

        {/* ================= BOTTOM PUBLICATION CALLOUT ================= */}
        <ScrollReveal variant="fadeUp" distance={16} delay={0.15}>
          <div className="mt-14 text-center">
            <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white border border-brand-lavender text-xs font-semibold text-slate-700 shadow-sm">
              <Sparkles className="w-4 h-4 text-brand-orange" />
              <span>Updated weekly with peer-reviewed technology and growth breakdowns</span>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
