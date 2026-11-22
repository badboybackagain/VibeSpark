import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

const initialPosts = [
  {
    id: "google-ranking-2025",
    slug: "google-ranking-2025",
    title: "How to Improve Your Google Ranking in 2025?",
    subtitle: "A modern engineering playbook for Core Web Vitals, AI search overviews, and structured semantic authority.",
    category: "SEO & Growth",
    badge: "Search Architecture",
    date: "12 Sep 2025",
    readTime: "5 min read",
    authorName: "VibeSpark Team",
    authorRole: "Editorial & Engineering Team",
    authorAvatar: "/vibespark-logo.png",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Google SEO Analytics Dashboard and Keyword Optimization Strategy",
    summary: "As Google transitions to generative search overviews (SGE) and strict Interaction to Next Paint (INP) benchmarks, organic visibility is no longer just about keywords. It requires sub-second server responses, schema-rich structured graphs, and high-authority contextual entities.",
    seoTitle: "How to Improve Your Google Ranking in 2025 | VibeSpark SEO Guide",
    metaDescription: "Master Core Web Vitals, INP scores, schema markup, and entity-based topical authority with VibeSpark's 2025 engineering search playbook.",
    focusKeyword: "Google ranking 2025",
    canonicalUrl: "https://vibespark.in/blog/google-ranking-2025",
    published: true,
    takeawaysJson: JSON.stringify([
      "Master Interaction to Next Paint (INP) to maintain top-tier Core Web Vitals scoring.",
      "Implement deep JSON-LD Schema graphs to earn citations in AI generative overviews.",
      "Shift from keyword density to entity-based semantic clusters.",
      "Prioritize mobile viewport rendering and zero cumulative layout shifts (CLS)."
    ]),
    sectionsJson: JSON.stringify([
      {
        heading: "1. The Evolution: From Keywords to Entity Graph Authority",
        content: "Search engines in 2025 evaluate websites through multidimensional entity relationships rather than isolated keywords. Google's Knowledge Graph connects your brand, leadership team, publications, and customer sentiment into a single authoritative index. To rank for competitive high-intent terms, your domain must establish verifiable topic clusters that thoroughly solve user problems from first principles."
      },
      {
        heading: "2. Cracking Interaction to Next Paint (INP)",
        content: "Interaction to Next Paint has officially replaced First Input Delay (FID) as a primary Core Web Vital. INP measures the latency of every single user interaction—clicks, taps, and keypresses—across the entire page lifecycle. Sites with unoptimized JavaScript main-thread bottlenecks now suffer severe algorithmic penalties. At VibeSpark, we decouple heavy DOM manipulation into Web Workers and leverage selective React hydrate strategies to achieve INP scores under 120ms."
      },
      {
        heading: "3. Semantic JSON-LD Architecture for AI Overviews",
        content: "When Google's AI synthesizes search responses, it pulls directly from pages with clear, unambiguous structured data. Utilizing comprehensive schema markup—including TechArticle, Organization, FAQPage, and Review types—ensures your platform's data points are accurately interpreted by generative crawlers."
      }
    ]),
    content: `<h2>1. The Evolution: From Keywords to Entity Graph Authority</h2><p>Search engines in 2025 evaluate websites through multidimensional entity relationships rather than isolated keywords. Google's Knowledge Graph connects your brand, leadership team, publications, and customer sentiment into a single authoritative index. To rank for competitive high-intent terms, your domain must establish verifiable topic clusters that thoroughly solve user problems from first principles.</p><h2>2. Cracking Interaction to Next Paint (INP)</h2><p>Interaction to Next Paint has officially replaced First Input Delay (FID) as a primary Core Web Vital. INP measures the latency of every single user interaction—clicks, taps, and keypresses—across the entire page lifecycle. Sites with unoptimized JavaScript main-thread bottlenecks now suffer severe algorithmic penalties. At VibeSpark, we decouple heavy DOM manipulation into Web Workers and leverage selective React hydrate strategies to achieve INP scores under 120ms.</p><h2>3. Semantic JSON-LD Architecture for AI Overviews</h2><p>When Google's AI synthesizes search responses, it pulls directly from pages with clear, unambiguous structured data. Utilizing comprehensive schema markup—including TechArticle, Organization, FAQPage, and Review types—ensures your platform's data points are accurately interpreted by generative crawlers.</p>`
  },
  {
    id: "top-10-website-features",
    slug: "top-10-website-features",
    title: "Top 10 Website Features Every High-Converting Business Needs",
    subtitle: "From frictionless mobile checkouts to micro-interactions, the essential architectural features that convert visitors into revenue.",
    category: "Web Development",
    badge: "UI/UX Engineering",
    date: "05 Sep 2025",
    readTime: "7 min read",
    authorName: "VibeSpark Team",
    authorRole: "Editorial & Engineering Team",
    authorAvatar: "/vibespark-logo.png",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "High-Performance Modern Web Design and Conversion Interface",
    summary: "A modern commercial website is an automated conversion engine. If your site lacks sub-second page loads, intuitive mobile micro-interactions, or transparent trust signals, over 60% of potential leads bounce before taking action.",
    seoTitle: "Top 10 High-Converting Website Features | VibeSpark Web Guide",
    metaDescription: "Discover the 10 vital website design & engineering features that maximize user conversion, reduce bounce rates, and drive enterprise sales.",
    focusKeyword: "high-converting website features",
    canonicalUrl: "https://vibespark.in/blog/top-10-website-features",
    published: true,
    takeawaysJson: JSON.stringify([
      "Sub-second First Contentful Paint (<0.8s) directly correlates with higher purchase rates.",
      "Frictionless 1-click mobile checkout reduces cart abandonment by up to 35%.",
      "Dynamic social proof and real-time trust badges increase inquiry completion.",
      "Clear visual hierarchy and sticky floating CTAs remove navigational fatigue."
    ]),
    sectionsJson: JSON.stringify([
      {
        heading: "1. Lightning-Fast Page Load Velocity",
        content: "Every 100-millisecond delay in mobile website loading drops conversion rates by up to 7%. Implementing modern asset optimization, edge CDN caching, and modern image formats (AVIF/WebP) ensures instant rendering across all network conditions."
      },
      {
        heading: "2. Contextual Sticky Navigation with High-Contrast Action",
        content: "Users should never have to search for how to contact you or make a purchase. A smart sticky navigation header that adjusts transparency on scroll while keeping primary action buttons visible keeps engagement high throughout long-form content."
      },
      {
        heading: "3. Purposeful Micro-Animations & Tactile Feedback",
        content: "Micro-animations aren't just aesthetic flourishes—they guide user attention, confirm button clicks, and reassure customers that the system is responsive and reliable. Using hardware-accelerated transforms prevents layout thrashing."
      }
    ]),
    content: `<h2>1. Lightning-Fast Page Load Velocity</h2><p>Every 100-millisecond delay in mobile website loading drops conversion rates by up to 7%. Implementing modern asset optimization, edge CDN caching, and modern image formats (AVIF/WebP) ensures instant rendering across all network conditions.</p><h2>2. Contextual Sticky Navigation with High-Contrast Action</h2><p>Users should never have to search for how to contact you or make a purchase. A smart sticky navigation header that adjusts transparency on scroll while keeping primary action buttons visible keeps engagement high throughout long-form content.</p><h2>3. Purposeful Micro-Animations & Tactile Feedback</h2><p>Micro-animations aren't just aesthetic flourishes—they guide user attention, confirm button clicks, and reassure customers that the system is responsive and reliable. Using hardware-accelerated transforms prevents layout thrashing.</p>`
  },
  {
    id: "digital-marketing-strategies",
    slug: "digital-marketing-strategies",
    title: "Full-Funnel Digital Marketing Frameworks for Modern Startups",
    subtitle: "How ambitious brands outmaneuver legacy incumbents using lean performance marketing and data-driven creative testing.",
    category: "Marketing Strategy",
    badge: "Growth Playbook",
    date: "28 Aug 2025",
    readTime: "6 min read",
    authorName: "VibeSpark Team",
    authorRole: "Editorial & Engineering Team",
    authorAvatar: "/vibespark-logo.png",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Full-Funnel Digital Marketing Frameworks and Growth Strategy",
    summary: "Burning venture capital on broad spray-and-pray advertising is dead. Today's most profitable digital marketing strategies combine hyper-targeted high-intent paid search with algorithmic organic content and automated lead nurturing.",
    seoTitle: "Full-Funnel Digital Marketing Frameworks | VibeSpark Growth",
    metaDescription: "Scale your revenue pipeline with lean performance marketing, CAPI tracking, and automated email nurturing designed for high-growth startups.",
    focusKeyword: "digital marketing strategies for startups",
    canonicalUrl: "https://vibespark.in/blog/digital-marketing-strategies",
    published: true,
    takeawaysJson: JSON.stringify([
      "Build high-intent landing pages tailored specifically to incoming search intent.",
      "Use automated email drip sequences to turn cold leads into qualified pipeline.",
      "Track full-funnel CAC to LTV metrics instead of vanity vanity clicks.",
      "Diversify customer acquisition across organic search, LinkedIn, and direct outreach."
    ]),
    sectionsJson: JSON.stringify([
      {
        heading: "1. The High-Intent Search Funnel",
        content: "Rather than targeting generic keywords with astronomical cost-per-click rates, successful startups dominate long-tail commercial queries where prospects have explicit buying intent. Custom landing pages engineered for single-offer clarity consistently convert at 12–18%."
      },
      {
        heading: "2. Omnichannel Attribution & Multi-Touch Modeling",
        content: "Customers rarely convert on their first visit. By establishing cross-domain server-side conversion tracking (CAPI) and clean UTM parameters, marketing leaders can accurately allocate budget to top-performing acquisition channels."
      }
    ]),
    content: `<h2>1. The High-Intent Search Funnel</h2><p>Rather than targeting generic keywords with astronomical cost-per-click rates, successful startups dominate long-tail commercial queries where prospects have explicit buying intent. Custom landing pages engineered for single-offer clarity consistently convert at 12–18%.</p><h2>2. Omnichannel Attribution & Multi-Touch Modeling</h2><p>Customers rarely convert on their first visit. By establishing cross-domain server-side conversion tracking (CAPI) and clean UTM parameters, marketing leaders can accurately allocate budget to top-performing acquisition channels.</p>`
  },
  {
    id: "headless-commerce-guide",
    slug: "headless-commerce-guide",
    title: "The Architectural Shift to Headless Commerce & Sub-Second Speed",
    subtitle: "Why decoupling Shopify and commerce backends from Next.js frontends yields 3x conversion velocity and global multi-region scalability.",
    category: "E-commerce & SaaS",
    badge: "Cloud Architecture",
    date: "18 Aug 2025",
    readTime: "8 min read",
    authorName: "VibeSpark Team",
    authorRole: "Editorial & Engineering Team",
    authorAvatar: "/vibespark-logo.png",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Headless E-commerce Architecture and Sub-Second Storefront",
    summary: "Monolithic e-commerce storefronts struggle with sluggish template bloat and rigid designs. By decoupling the frontend presentation layer via modern React frameworks and GraphQL APIs, brands gain complete design autonomy and sub-second page loads.",
    seoTitle: "The Architectural Shift to Headless Commerce | VibeSpark",
    metaDescription: "Learn how decoupling frontend storefronts from commerce backends unlocks sub-second loading speeds, higher conversions, and omnichannel scale.",
    focusKeyword: "headless commerce guide",
    canonicalUrl: "https://vibespark.in/blog/headless-commerce-guide",
    published: true,
    takeawaysJson: JSON.stringify([
      "Decoupled architectures isolate backend business logic from frontend user experience.",
      "Edge caching and static generation render catalog pages in under 300ms.",
      "Seamless integration with headless CMS, Algolia search, and modern payment gateways.",
      "Zero downtime deployments and multi-market localization capabilities."
    ]),
    sectionsJson: JSON.stringify([
      {
        heading: "1. Why Monoliths Hit a Growth Ceiling",
        content: "Traditional monolithic e-commerce platforms intertwine backend databases, checkout mechanics, and visual themes into a single codebase. Over time, app plugins and third-party scripts drag down performance, driving bounce rates upward."
      },
      {
        heading: "2. The Modern Headless Stack",
        content: "By connecting a high-speed React or Next.js frontend to Shopify Plus, Medusa, or custom Node microservices via GraphQL, storefronts achieve instant page transitions, bespoke UI interactions, and uncompromised security."
      }
    ]),
    content: `<h2>1. Why Monoliths Hit a Growth Ceiling</h2><p>Traditional monolithic e-commerce platforms intertwine backend databases, checkout mechanics, and visual themes into a single codebase. Over time, app plugins and third-party scripts drag down performance, driving bounce rates upward.</p><h2>2. The Modern Headless Stack</h2><p>By connecting a high-speed React or Next.js frontend to Shopify Plus, Medusa, or custom Node microservices via GraphQL, storefronts achieve instant page transitions, bespoke UI interactions, and uncompromised security.</p>`
  },
  {
    id: "ai-in-web-development",
    slug: "ai-in-web-development",
    title: "Orchestrating AI Assistants & Real-Time Agents into Web Workflows",
    subtitle: "How forward-thinking engineering squads integrate LLM endpoints, automated pipelines, and intelligent search into consumer-facing platforms.",
    category: "AI & Automation",
    badge: "Emerging Tech",
    date: "10 Aug 2025",
    readTime: "6 min read",
    authorName: "VibeSpark Team",
    authorRole: "Editorial & Engineering Team",
    authorAvatar: "/vibespark-logo.png",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "AI Assistants and Intelligent Web Automation Pipelines",
    summary: "AI has transitioned from simple chatbots into intelligent background agents capable of real-time search, code analysis, customer triage, and automated personalization.",
    seoTitle: "Integrating AI Agents into Web Platforms | VibeSpark Insights",
    metaDescription: "Discover how modern teams integrate LLMs, vector search, and streaming interfaces to automate enterprise workflows and elevate user experience.",
    focusKeyword: "AI in web development",
    canonicalUrl: "https://vibespark.in/blog/ai-in-web-development",
    published: true,
    takeawaysJson: JSON.stringify([
      "Implement streaming SSE responses for zero perceived latency in chat interfaces.",
      "Leverage vector embeddings for semantic document search and intelligent Q&A.",
      "Protect user privacy with client-side guardrails and tokenized API proxies.",
      "Automate repetitive support inquiries to accelerate team throughput."
    ]),
    sectionsJson: JSON.stringify([
      {
        heading: "1. Beyond Scripted Chatbots",
        content: "Traditional keyword-matching bots frustrated users with repetitive canned replies. Modern agentic workflows combine retrieval-augmented generation (RAG) with live company data to deliver accurate, contextual assistance 24 hours a day."
      },
      {
        heading: "2. Streaming Interfaces & UX Latency",
        content: "Waiting 5 seconds for a model to finish generation destroys user momentum. Implementing Server-Sent Events (SSE) allows characters to stream into view instantaneously, replicating a natural conversational cadence."
      }
    ]),
    content: `<h2>1. Beyond Scripted Chatbots</h2><p>Traditional keyword-matching bots frustrated users with repetitive canned replies. Modern agentic workflows combine retrieval-augmented generation (RAG) with live company data to deliver accurate, contextual assistance 24 hours a day.</p><h2>2. Streaming Interfaces & UX Latency</h2><p>Waiting 5 seconds for a model to finish generation destroys user momentum. Implementing Server-Sent Events (SSE) allows characters to stream into view instantaneously, replicating a natural conversational cadence.</p>`
  },
  {
    id: "enterprise-security-hipaa",
    slug: "enterprise-security-hipaa",
    title: "Engineering Compliant Architectures: Navigating HIPAA, SOC2 & GDPR",
    subtitle: "A comprehensive developer guide to data encryption at rest, tokenized auth flows, and automated audit logging in high-concurrency apps.",
    category: "Cloud & Security",
    badge: "Enterprise Security",
    date: "02 Aug 2025",
    readTime: "9 min read",
    authorName: "VibeSpark Team",
    authorRole: "Editorial & Engineering Team",
    authorAvatar: "/vibespark-logo.png",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Enterprise Security Compliance Architecture HIPAA SOC2 GDPR",
    summary: "For healthcare, fintech, and enterprise software, security compliance is an indispensable requirement. Building with zero-trust principles from day one prevents catastrophic data leaks and regulatory penalties.",
    seoTitle: "Engineering Compliant Architectures: HIPAA, SOC2 & GDPR | VibeSpark",
    metaDescription: "Enterprise security architecture guide: Zero-trust principles, AES-256 encryption, immutable audit logging, and automated compliance pipelines.",
    focusKeyword: "enterprise security HIPAA SOC2 GDPR",
    canonicalUrl: "https://vibespark.in/blog/enterprise-security-hipaa",
    published: true,
    takeawaysJson: JSON.stringify([
      "Enforce end-to-end AES-256 encryption at rest and TLS 1.3 in transit.",
      "Role-based access control (RBAC) with cryptographic session verification.",
      "Immutable audit logs tracking every access event and database modification.",
      "Automated vulnerability scanning integrated into CI/CD deployment pipelines."
    ]),
    sectionsJson: JSON.stringify([
      {
        heading: "1. The Zero-Trust Architectural Principle",
        content: "In a modern zero-trust network, every service, user, and background worker must be explicitly authenticated and authorized before granting data access. Microservice communication is segmented and mutual TLS ensures uncompromised transport."
      },
      {
        heading: "2. Compliance as Automated Code",
        content: "Rather than scrambling for annual audits, automated security linters and continuous cloud posture managers ensure that infrastructure drift is detected and rectified immediately."
      }
    ]),
    content: `<h2>1. The Zero-Trust Architectural Principle</h2><p>In a modern zero-trust network, every service, user, and background worker must be explicitly authenticated and authorized before granting data access. Microservice communication is segmented and mutual TLS ensures uncompromised transport.</p><h2>2. Compliance as Automated Code</h2><p>Rather than scrambling for annual audits, automated security linters and continuous cloud posture managers ensure that infrastructure drift is detected and rectified immediately.</p>`
  }
];

async function seed() {
  console.log('--- Starting Database Seed for VibeSpark CMS ---');

  // 1. Ensure EXACTLY ONE Admin account
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@vibespark.in';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const adminName = process.env.ADMIN_NAME || 'VibeSpark Admin';

  const existingAdminCount = await prisma.admin.count();
  if (existingAdminCount === 0) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(adminPassword, salt);
    const admin = await prisma.admin.create({
      data: {
        email: adminEmail,
        passwordHash,
        name: adminName
      }
    });
    console.log(`[SEED] Created solitary Admin account: ${admin.email}`);
  } else {
    console.log(`[SEED] Admin account already exists (count: ${existingAdminCount}). Preserving existing admin.`);
  }

  // 2. Seed all verified existing blog articles
  for (const post of initialPosts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        subtitle: post.subtitle,
        summary: post.summary,
        content: post.content,
        category: post.category,
        badge: post.badge,
        date: post.date,
        readTime: post.readTime,
        image: post.image,
        imageAlt: post.imageAlt,
        authorName: post.authorName,
        authorRole: post.authorRole,
        authorAvatar: post.authorAvatar,
        seoTitle: post.seoTitle,
        metaDescription: post.metaDescription,
        focusKeyword: post.focusKeyword,
        canonicalUrl: post.canonicalUrl,
        published: post.published,
        takeawaysJson: post.takeawaysJson,
        sectionsJson: post.sectionsJson
      },
      create: post
    });
    console.log(`[SEED] Synced blog article: "${post.title}" (${post.slug})`);
  }

  console.log('--- Database Seed Completed Successfully ---');
}

seed()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
