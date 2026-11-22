import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Core Landing Page loaded directly for zero-latency instant LCP
import Home from './pages/Home/Home';

// Lazy-loaded routes for ultra-fast initial bundle and high Lighthouse score
const About = lazy(() => import('./pages/About/About'));
const ServicesIndex = lazy(() => import('./pages/Services/ServicesIndex'));
const ServiceDetail = lazy(() => import('./pages/Services/ServiceDetail'));
const IndustriesIndex = lazy(() => import('./pages/Industries/IndustriesIndex'));
const IndustryDetail = lazy(() => import('./pages/Industries/IndustryDetail'));
const Portfolio = lazy(() => import('./pages/Portfolio/Portfolio'));
const BlogIndex = lazy(() => import('./pages/Blog/BlogIndex'));
const BlogDetail = lazy(() => import('./pages/Blog/BlogDetail'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const BlogCMS = lazy(() => import('./pages/Admin/BlogCMS'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Clean minimal loading spinner for page route transitions
function PageLoadingFallback() {
  return (
    <div className="min-h-[70vh] bg-transparent flex items-center justify-center">
      <div className="relative flex flex-col items-center gap-3">
        <div className="w-9 h-9 rounded-full border-2 border-brand-orange/20 border-t-brand-orange animate-spin" />
        <span className="text-[11px] uppercase font-bold tracking-widest text-slate-400">Loading VibeSpark...</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoadingFallback />}>
        <Routes>
          {/* Dedicated Admin CMS Dashboard (No Website Navbar or Footer) */}
          <Route path="/admin" element={<BlogCMS />} />
          <Route path="/admin/blog" element={<BlogCMS />} />

          {/* Public Website with Navbar & Footer */}
          <Route path="/" element={<MainLayout />}>
            {/* Homepage (Direct Instant Render) */}
            <Route index element={<Home />} />

            {/* About */}
            <Route path="about" element={<About />} />

            {/* Services */}
            <Route path="services" element={<ServicesIndex />} />
            <Route path="services/:serviceId" element={<ServiceDetail />} />

            {/* Industries */}
            <Route path="industries" element={<IndustriesIndex />} />
            <Route path="industries/:industryId" element={<IndustryDetail />} />

            {/* Portfolio & Blog */}
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="blog" element={<BlogIndex />} />
            <Route path="blog/:blogId" element={<BlogDetail />} />

            {/* Contact */}
            <Route path="contact" element={<Contact />} />

            {/* Legal Pages */}
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-conditions" element={<TermsConditions />} />

            {/* 404 Catch-All */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
