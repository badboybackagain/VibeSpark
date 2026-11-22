import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function BlogCard({ post }) {
  return (
    <article className="group bg-white rounded-[24px] overflow-hidden border border-brand-lavender/80 shadow-card-light hover:shadow-2xl hover:border-brand-indigo/40 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between relative">
      
      {/* Top radiant illumination bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-indigo via-brand-orange to-brand-royal-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      <div>
        {/* Thumbnail container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-brand-midnight">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-midnight/90 backdrop-blur-md text-white border border-white/15 shadow-sm">
            {post.category}
          </div>
        </div>

        {/* Content body */}
        <div className="p-7">
          <div className="flex items-center gap-4 text-xs text-slate-400 mb-3.5">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-brand-orange" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {post.readTime}
            </span>
          </div>

          <h3 className="text-xl font-bold text-brand-midnight group-hover:text-brand-indigo transition-colors line-clamp-2 mb-3">
            <Link to={post.slug}>
              {post.title}
            </Link>
          </h3>

          <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed font-normal">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Card Footer Link */}
      <div className="px-7 pb-7 pt-2">
        <Link
          to={post.slug}
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy group-hover:text-brand-orange transition-colors"
        >
          <span>Read Full Article</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
        </Link>
      </div>
    </article>
  );
}
