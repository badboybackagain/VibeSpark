import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';

// Reliable blog URL helper: ensures clean /blog/:id without double slashes
function getBlogUrl(post) {
  if (!post) return '/blog';
  const rawId = post.slug || post.id || '';
  const cleanId = String(rawId).replace(/^\/blog\//, '').replace(/^\//, '');
  return `/blog/${cleanId}`;
}

export default function EditorialBlogLedger({ posts = [] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
      {posts.map((post, pIdx) => {
        const url = getBlogUrl(post);

        return (
          <ScrollReveal 
            key={post.id || post.slug} 
            variant="fadeUp" 
            distance={24} 
            delay={(pIdx % 3) * 0.08}
          >
            <article
              className="group bg-white rounded-[26px] overflow-hidden border border-slate-200/90 shadow-[0_4px_20px_rgba(8,11,53,0.06)] hover:shadow-[0_24px_50px_-10px_rgba(8,11,53,0.18)] hover:border-brand-orange/50 hover:-translate-y-2 transition-all duration-300 ease-out flex flex-col justify-between h-full"
            >
            <div>
              {/* Thumbnail Image Frame (Clickable) */}
              <Link to={url} className="block relative aspect-[16/10] overflow-hidden bg-brand-midnight">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Category Pill */}
                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/15 shadow-sm">
                  {post.category}
                </div>
              </Link>

              {/* Card Content */}
              <div className="p-6 sm:p-7">
                {/* Date & Read time */}
                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-3">
                  <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                  <span>{post.date}</span>
                  <span>•</span>
                  <Clock className="w-3.5 h-3.5 text-brand-indigo" />
                  <span>{post.readTime || '5 min read'}</span>
                </div>

                {/* Headline (Clickable) */}
                <h3 className="text-lg sm:text-xl font-bold text-brand-midnight group-hover:text-brand-orange transition-colors leading-snug mb-3">
                  <Link to={url}>
                    {post.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt || post.summary}
                </p>
              </div>
            </div>

            {/* Author & Read Full Action Button */}
            <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700/60 p-1 flex items-center justify-center shrink-0 shadow-sm">
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
                  <h4 className="text-xs font-bold text-brand-midnight">
                    {post.author?.name || "VibeSpark Team"}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-medium">
                    {post.author?.role || "Editorial Team"}
                  </p>
                </div>
              </div>

              {/* Read Full Button */}
              <Link
                to={url}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-brand-midnight to-[#0B0F3B] hover:from-brand-orange hover:to-[#FF6224] shadow-sm transition-all group/btn"
              >
                <span>Read Full</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        </ScrollReveal>
        );
      })}
    </div>
  );
}
