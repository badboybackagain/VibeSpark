export const siteConfig = {
  companyName: "VibeSpark Technologies",
  tagline: "Powering Ideas. Creating Digital Experiences.",
  headline: "Build Your Digital Presence Grow Your Business with VibeSpark",
  heroSubtext: "Innovative web solutions, smart digital marketing and technology-driven strategies to help your business grow.",
  email: "info@vibespark.org",
  phone: "+91 90284 46832",
  address: "Nyati Ethereal, Kharadi, Pune, Maharashtra 411014, India",
  copyrightYear: 2025,
};

export const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  {
    name: "Services",
    path: "/services",
    hasDropdown: true,
    children: [
      { name: "Web Development & Design", path: "/services/web-development", desc: "Modern, high-performance responsive web applications." },
      { name: "SEO & Local SEO", path: "/services/seo", desc: "Top organic rankings, Google My Business, and local visibility." },
      { name: "Digital Marketing & Social Media", path: "/services/digital-marketing", desc: "Multi-channel ROI-driven campaigns and brand growth." },
      { name: "Custom Software Development", path: "/services/software-development", desc: "Scalable enterprise architectures and SaaS systems." },
      { name: "E-commerce Solutions", path: "/services/ecommerce", desc: "High-converting online stores and secure payment funnels." },
      { name: "Automation & Website Support", path: "/services/automation", desc: "24/7 maintenance, cloud scaling, and workflow automations." },
    ]
  },
  {
    name: "Industries",
    path: "/industries",
    hasDropdown: true,
    children: [
      { name: "Education & EdTech", path: "/industries/education", desc: "LMS, student portals, and virtual learning platforms." },
      { name: "Healthcare & MedTech", path: "/industries/healthcare", desc: "HIPAA-compliant patient portals and telehealth systems." },
      { name: "Real Estate & PropTech", path: "/industries/real-estate", desc: "Property listings, virtual tours, and CRM integration." },
      { name: "Retail & E-commerce", path: "/industries/retail", desc: "Omnichannel retail platforms and POS connections." },
      { name: "Restaurants & Hospitality", path: "/industries/restaurants", desc: "Table booking, online ordering, and loyalty apps." },
      { name: "Startups & Emerging Tech", path: "/industries/startups", desc: "Rapid MVP development and scalable tech architectures." },
    ]
  },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Blog", path: "/blog" },
  { name: "Contact Us", path: "/contact" },
];

export const servicesData = [
  {
    id: "web-development",
    title: "Web Development & Design",
    shortDesc: "Custom web development, blazing-fast responsive designs, and robust CMS platforms built to convert visitors into customers.",
    iconName: "Monitor",
    path: "/services/web-development",
    tag: "Core Service",
    features: [
      "Modern React / Next.js Architectures",
      "Mobile-First Responsive Layouts",
      "Fast 95+ Google PageSpeed Scores",
      "Interactive UI/UX & Motion Design"
    ]
  },
  {
    id: "seo",
    title: "SEO & Local SEO",
    shortDesc: "Data-driven search engine optimization, on-page technical fixes, authority link building, and Google Business Profile rank mastery.",
    iconName: "Search",
    path: "/services/seo",
    tag: "Growth Engine",
    features: [
      "Keyword & Competitor Analysis",
      "Technical Core Web Vitals Optimization",
      "Local 3-Pack Map Dominance",
      "Content Strategy & Authority Backlinks"
    ]
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing & Social Media",
    shortDesc: "Targeted PPC campaigns, impactful social media strategies, and high-conversion funnels that drive measurable business ROI.",
    iconName: "TrendingUp",
    path: "/services/digital-marketing",
    tag: "High ROI",
    features: [
      "Meta & Google Ads Campaign Management",
      "Social Media Content & Community Growth",
      "Email Nurturing & Retargeting Funnels",
      "Real-Time Analytics & Attribution"
    ]
  },
  {
    id: "software-development",
    title: "Custom Software Development",
    shortDesc: "Scalable enterprise web apps, bespoke cloud solutions, and tailored CRM/ERP systems designed around your business workflows.",
    iconName: "Code2",
    path: "/services/software-development",
    tag: "Enterprise",
    features: [
      "Microservices & Cloud Architectures",
      "Secure RESTful & GraphQL APIs",
      "Role-Based Access Control (RBAC)",
      "Automated CI/CD Deployment Pipelines"
    ]
  },
  {
    id: "ecommerce",
    title: "E-commerce Solutions",
    shortDesc: "Turn-key online store development, seamless checkout experiences, payment gateway integrations, and inventory management.",
    iconName: "ShoppingCart",
    path: "/services/ecommerce",
    tag: "Sales Focused",
    features: [
      "Shopify, WooCommerce & Custom Stores",
      "Secure Multi-Currency Gateways",
      "Fast One-Page Checkout",
      "Abandoned Cart & Upsell Automations"
    ]
  },
  {
    id: "automation",
    title: "Automation & Support",
    shortDesc: "Continuous website maintenance, automated workflows, server optimization, and proactive 24/7 technical monitoring.",
    iconName: "Settings",
    path: "/services/automation",
    tag: "Peace of Mind",
    features: [
      "24/7 Uptime & Security Monitoring",
      "Workflow Integrations (Zapier, Make, APIs)",
      "Daily Backups & Instant Disaster Recovery",
      "Monthly Performance Audits"
    ]
  }
];

export const whyChooseData = [
  {
    id: "innovation",
    title: "Innovation First",
    desc: "Leveraging cutting-edge modern tech stacks and AI-driven tooling for future-proof scalability.",
    iconName: "Rocket"
  },
  {
    id: "results",
    title: "Result Driven",
    desc: "Every line of code and marketing campaign is tuned to achieve concrete, measurable business growth.",
    iconName: "Handshake"
  },
  {
    id: "team",
    title: "Expert Team",
    desc: "Senior full-stack developers, creative UI designers, and certified marketing specialists.",
    iconName: "Users"
  },
  {
    id: "support",
    title: "Dedicated Support",
    desc: "Transparent communication, continuous maintenance, and dedicated account managers.",
    iconName: "ShieldCheck"
  }
];

export const industriesData = [
  {
    id: "education",
    title: "Education",
    subtitle: "Modern LMS, student portals & virtual learning environments.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    path: "/industries/education"
  },
  {
    id: "healthcare",
    title: "Healthcare",
    subtitle: "Telehealth, appointment booking & HIPAA compliance.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80",
    path: "/industries/healthcare"
  },
  {
    id: "real-estate",
    title: "Real Estate",
    subtitle: "Interactive property portals & virtual walkthroughs.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    path: "/industries/real-estate"
  },
  {
    id: "retail",
    title: "Retail & E-commerce",
    subtitle: "High-speed storefronts & omnichannel retail engines.",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=900&q=80",
    path: "/industries/retail"
  },
  {
    id: "restaurants",
    title: "Restaurants & Hospitality",
    subtitle: "Direct ordering, table reservations & loyalty apps.",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=900&q=80",
    path: "/industries/restaurants"
  },
  {
    id: "startups",
    title: "Startups & Emerging Tech",
    subtitle: "Rapid MVP prototyping & venture-ready web apps.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80",
    path: "/industries/startups"
  },
  {
    id: "professional-services",
    title: "Professional Services",
    subtitle: "Law firms, consultancies & financial advisory portals.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    path: "/industries/professional-services"
  },
  {
    id: "manufacturing",
    title: "Manufacturing & Automation",
    subtitle: "Supply chain dashboards & B2B distributor catalogs.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
    path: "/industries/manufacturing"
  }
];

export const processSteps = [
  {
    number: "01",
    step: "Discover",
    tagline: "Understand your needs and goals",
    desc: "In-depth discovery workshop to analyze your business objectives, target audience, and competitive landscape.",
    iconName: "Search"
  },
  {
    number: "02",
    step: "Strategize",
    tagline: "Plan the right strategy for your business",
    desc: "Architecting the technical blueprint, visual user experience wireframes, and conversion-focused growth plan.",
    iconName: "Lightbulb"
  },
  {
    number: "03",
    step: "Develop",
    tagline: "Build with best technologies",
    desc: "Writing clean, modular, scalable code with modern frameworks, rigorous security testing, and smooth animations.",
    iconName: "Code2"
  },
  {
    number: "04",
    step: "Launch",
    tagline: "Go live with confidence",
    desc: "Exhaustive QA across devices, technical SEO validation, SSL certification, and zero-downtime deployment.",
    iconName: "Rocket"
  },
  {
    number: "05",
    step: "Grow",
    tagline: "Scale your success together",
    desc: "Ongoing optimization, traffic acquisition, conversion rate enhancement, and proactive 24/7 system support.",
    iconName: "TrendingUp"
  }
];

export const testimonialsData = [
  {
    id: "t1",
    quote: "I am writing to share my excellent experience. Mr. Abhishek's expertise helped us to get a niche website. He and his team are cooperative and understood our needs very well, providing helpful ideas and guidance. We are very happy with the user-friendly CRM and are recommending them to our friends and contacts for any website development needs.",
    name: "Shivika Lalchandani",
    role: "Client & Business Owner",
    company: "Verified Google Review",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    metrics: "Verified 5.0 Google Rating",
    service: "Custom Website Development & CRM"
  },
  {
    id: "t2",
    quote: "Working with the team completely transformed how my business shows up online. Their expertise in local SEO made a huge difference — my visibility skyrocketed almost immediately. What stood out was their personalized approach; they really took the time to understand my specific goals and delivered a strategy that worked perfectly.",
    name: "Bhushan Patil",
    role: "Business Founder",
    company: "Verified Google Review",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    metrics: "Top 3 Google Maps Ranking",
    service: "Local SEO & Google Business Profile"
  },
  {
    id: "t3",
    quote: "A big thank you to the engineering team for delivering an outstanding website that perfectly reflects our brand identity. The development speed, clear communication, and intuitive user interface exceeded our expectations from day one.",
    name: "Riddhi Panchal",
    role: "Managing Director",
    company: "Verified Google Review",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    metrics: "100% On-Time Delivery",
    service: "Full-Stack Brand & Web Engineering"
  },
  {
    id: "t4",
    quote: "They completely transformed how I approach social media and digital growth for my business. Their SMM strategies, ad targeting, and content production took our online presence to the next level with consistent qualified leads.",
    name: "Rahul Sarda",
    role: "Marketing Director",
    company: "Verified Google Review",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    metrics: "3.4x Lead Volume Surge",
    service: "Social Media Marketing & Paid Growth"
  },
  {
    id: "t5",
    quote: "The team has been instrumental in elevating our brand's visual presence. Their graphic design, UI/UX refinement, and cohesive digital assets delivered exactly what we needed to stand out in a competitive market.",
    name: "Jayesh Waghela",
    role: "Creative Director",
    company: "Verified Google Review",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    metrics: "Full Brand Modernization",
    service: "UI/UX & Digital Brand Identity"
  },
  {
    id: "t6",
    quote: "A fantastic digital partner that truly understands the technical depth of local SEO and search visibility. Highly knowledgeable, responsive, and accountable for real commercial outcomes.",
    name: "Subodh Gathade",
    role: "Enterprise Client",
    company: "Verified Google Review",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    metrics: "#1 Organic Search Dominance",
    service: "Technical SEO & Organic Visibility"
  }
];

export const blogPostsData = [
  {
    id: "google-ranking-2025",
    title: "How to Improve Your Google Ranking in 2025?",
    excerpt: "Discover the latest algorithm shifts, AI overview optimizations, and technical Core Web Vitals strategies that drive organic traffic.",
    category: "SEO & Growth",
    date: "12 Sep 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    slug: "google-ranking-2025"
  },
  {
    id: "top-10-website-features",
    title: "Top 10 Website Features Every High-Converting Business Needs",
    excerpt: "Essential frontend components, trust signals, micro-animations, and fast checkout flows that convert casual visitors into long-term clients.",
    category: "Web Development",
    date: "05 Sep 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    slug: "top-10-website-features"
  },
  {
    id: "digital-marketing-strategies",
    title: "Full-Funnel Digital Marketing Frameworks for Modern Startups",
    excerpt: "Actionable, budget-conscious PPC, local SEO, and content marketing blueprints designed to outrank enterprise incumbents.",
    category: "Marketing Strategy",
    date: "28 Aug 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
    slug: "digital-marketing-strategies"
  },
  {
    id: "headless-commerce-guide",
    title: "The Architectural Shift to Headless Commerce & Sub-Second Speed",
    excerpt: "Why decoupling Shopify and backend ledgers from Next.js frontends yields 3x conversion velocity and global multi-region scalability.",
    category: "E-commerce & SaaS",
    date: "18 Aug 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    slug: "headless-commerce-guide"
  },
  {
    id: "ai-in-web-development",
    title: "Orchestrating AI Assistants & Real-Time Agents into Web Workflows",
    excerpt: "How forward-thinking engineering squads integrate LLM endpoints, automated pipelines, and intelligent search into consumer-facing platforms.",
    category: "AI & Automation",
    date: "10 Aug 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    slug: "ai-in-web-development"
  },
  {
    id: "enterprise-security-hipaa",
    title: "Engineering Compliant Architectures: Navigating HIPAA, SOC2 & GDPR",
    excerpt: "A comprehensive developer guide to data encryption at rest, tokenized auth flows, and automated audit logging in high-concurrency apps.",
    category: "Cloud & Security",
    date: "02 Aug 2025",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    slug: "enterprise-security-hipaa"
  }
];

export const statsData = [
  { value: 60, suffix: "+", label: "Production Platforms", desc: "Live commercial portals & custom web apps deployed" },
  { value: 98, suffix: "%", label: "Client Success Rate", desc: "Long-term engineering & digital growth retainers" },
  { value: 10, suffix: "+", label: "Years Combined Mastery", desc: "Full-stack development, cloud infrastructure & SEO" },
];

export const productsData = [
  {
    id: "whatsapp-gateway",
    name: "WhatsApp API Gateway",
    tagline: "Official WhatsApp messaging with zero per-message markup",
    description: "Connect your existing phone numbers, automate order updates, dispatch lead alerts, and trigger interactive multi-channel conversational bots without template rejections or hidden subscription costs.",
    badge: "API Solution",
    features: [
      "No Per-Message Cost Markup",
      "Native Webhook & REST API Integration",
      "Multi-Agent Support & Auto-Responder",
      "Zero Downtime Cloud Routing"
    ],
    path: "/services/automation"
  },
  {
    id: "pinnacle-blast",
    name: "Pinnacle Blast",
    tagline: "Ultra-low-cost bulk email campaigns via Amazon SES",
    description: "Enterprise bulk newsletter and transactional dispatch engine powered directly by AWS SES infrastructure. Achieve 99.8% inbox deliverability at up to 100x lower cost than traditional marketing platforms.",
    badge: "Email Engine",
    features: [
      "Direct Amazon SES Infrastructure",
      "Dedicated IP & Warm-Up Protocols",
      "Automated Bounce & Complaint Handling",
      "Visual Drag-and-Drop Template Builder"
    ],
    path: "/services/digital-marketing"
  },
  {
    id: "pinnacle-assist",
    name: "Pinnacle Assist",
    tagline: "AI-Powered Google review generation & local reputation engine",
    description: "Empower happy customers to submit rich, keyword-optimized Google reviews that systematically propel your Google Maps Local 3-Pack rankings and build unbreakable consumer trust.",
    badge: "Local SEO AI",
    features: [
      "AI Review Prompt Generator",
      "NFC & QR Code Review Stations",
      "Sentiment Tracking & Auto-Alerts",
      "Local 3-Pack Rank Velocity Engine"
    ],
    path: "/services/seo"
  }
];
