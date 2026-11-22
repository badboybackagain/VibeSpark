-- ==========================================
-- VibeSpark PostgreSQL Schema & Seed for Supabase
-- Run this in Supabase Dashboard -> SQL Editor
-- ==========================================

-- 1. Admins Table
CREATE TABLE IF NOT EXISTS "admins" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "email" TEXT NOT NULL UNIQUE,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Posts Table (CMS)
CREATE TABLE IF NOT EXISTS "posts" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "slug" TEXT NOT NULL UNIQUE,
    "title" VARCHAR(500) NOT NULL,
    "subtitle" TEXT,
    "summary" TEXT,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Web Development',
    "badge" TEXT DEFAULT 'Insights',
    "date" TEXT NOT NULL DEFAULT '',
    "readTime" TEXT NOT NULL DEFAULT '5 min read',
    "image" TEXT NOT NULL,
    "imageAlt" VARCHAR(500),
    "published" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 0,
    "authorName" TEXT NOT NULL DEFAULT 'VibeSpark Squad',
    "authorRole" TEXT NOT NULL DEFAULT 'Engineering Practice',
    "authorAvatar" TEXT,
    "seoTitle" VARCHAR(500),
    "metaDescription" TEXT,
    "focusKeyword" VARCHAR(255),
    "canonicalUrl" VARCHAR(500),
    "primaryKeyword" VARCHAR(255),
    "secondaryKeywords" VARCHAR(500),
    "takeawaysJson" TEXT,
    "sectionsJson" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Enquiries Table
CREATE TABLE IF NOT EXISTS "enquiries" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(100) NOT NULL,
    "company" VARCHAR(255) DEFAULT '',
    "service" VARCHAR(255) NOT NULL,
    "budget" VARCHAR(255) NOT NULL,
    "message" TEXT,
    "status" VARCHAR(50) NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS "newsletter_subscribers" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "email" TEXT NOT NULL UNIQUE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Seed Default Admin
INSERT INTO "admins" ("email", "passwordHash", "name", "updatedAt")
VALUES ('admin@vibespark.in', '$2b$10$UpVMg6rvAOYoclod5AXeDOgjTyCi/N44JDlwEP.P77v4Idcv3FNZy', 'VibeSpark Admin', CURRENT_TIMESTAMP)
ON CONFLICT ("email") DO UPDATE SET "passwordHash" = EXCLUDED."passwordHash";

-- Seed Initial High-Performance Blog Articles
INSERT INTO "posts" (
    "id", "slug", "title", "subtitle", "summary", "content", 
    "category", "badge", "date", "readTime", "image", "imageAlt", 
    "published", "views", "authorName", "authorRole", "authorAvatar",
    "seoTitle", "metaDescription", "focusKeyword", "canonicalUrl",
    "takeawaysJson", "sectionsJson"
) VALUES 
(
    'google-ranking-2025',
    'google-ranking-2025',
    'How to Improve Your Google Ranking in 2025?',
    'A modern engineering playbook for Core Web Vitals, AI search overviews, and structured semantic authority.',
    'As Google transitions to generative search overviews (SGE) and strict Interaction to Next Paint (INP) benchmarks, organic visibility is no longer just about keywords. It requires sub-second server responses, schema-rich structured graphs, and high-authority contextual entities.',
    '<h2>1. The Evolution: From Keywords to Entity Graph Authority</h2><p>Search engines in 2025 evaluate websites through multidimensional entity relationships rather than isolated keywords. Google''s Knowledge Graph connects your brand, leadership team, publications, and customer sentiment into a single authoritative index.</p><h2>2. Cracking Interaction to Next Paint (INP)</h2><p>Interaction to Next Paint has officially replaced First Input Delay (FID) as a primary Core Web Vital. INP measures the latency of every single user interaction across the page lifecycle.</p><h2>3. Semantic JSON-LD Architecture for AI Overviews</h2><p>When Google''s AI synthesizes search responses, it pulls directly from pages with clear, unambiguous structured data.</p>',
    'SEO & Growth',
    'Search Architecture',
    '12 Sep 2025',
    '5 min read',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    'Google SEO Analytics Dashboard and Keyword Optimization Strategy',
    true,
    142,
    'VibeSpark Team',
    'Editorial & Engineering Team',
    '/vibespark-logo.png',
    'How to Improve Your Google Ranking in 2025 | VibeSpark SEO Guide',
    'Master Core Web Vitals, INP scores, schema markup, and entity-based topical authority with VibeSpark''s 2025 engineering search playbook.',
    'Google ranking 2025',
    'https://vibespark.in/blog/google-ranking-2025',
    '["Master Interaction to Next Paint (INP) to maintain top-tier Core Web Vitals scoring.","Implement deep JSON-LD Schema graphs to earn citations in AI generative overviews.","Shift from keyword density to entity-based semantic clusters."]',
    '[{"heading":"1. The Evolution: From Keywords to Entity Graph Authority","content":"Search engines evaluate websites through entity relationships."},{"heading":"2. Cracking Interaction to Next Paint (INP)","content":"INP measures the latency of user interactions."}]'
),
(
    'top-10-website-features',
    'top-10-website-features',
    'Top 10 Website Features Every High-Converting Business Needs',
    'From frictionless mobile checkouts to micro-interactions, the essential architectural features that convert visitors into revenue.',
    'Conversion rate optimization begins at the infrastructure level. Explore the 10 must-have features that transform passive website visitors into qualified pipeline leads and paying customers.',
    '<h2>1. Sub-Second Time-to-Interactive (TTI)</h2><p>Studies show a 100ms delay in website load speeds can drop conversion rates by 7%. Modern businesses require optimized client bundles and aggressive edge caching.</p><h2>2. Frictionless Mobile-First Experience</h2><p>With over 60% of web traffic originating on mobile screens, mobile experience must receive priority.</p>',
    'Web Development',
    'UI/UX Engineering',
    '05 Sep 2025',
    '7 min read',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    'Modern conversion-optimized web dashboard interface',
    true,
    89,
    'VibeSpark Squad',
    'UI/UX & Product Design',
    '/vibespark-logo.png',
    'Top 10 High-Converting Website Features | VibeSpark Guide',
    'Discover the top 10 essential website features that drive higher conversions, engagement, and revenue for modern digital businesses.',
    'high-converting website features',
    'https://vibespark.in/blog/top-10-website-features',
    '["Sub-second Time-to-Interactive directly increases conversions.","Mobile-first checkout and interactive navigation minimize bounce rates.","Clear, prominent CTA hierarchies drive predictable lead flows."]',
    '[{"heading":"1. Sub-Second Time-to-Interactive","content":"Modern web architecture delivers speed and high conversion."}]'
)
ON CONFLICT ("slug") DO NOTHING;
