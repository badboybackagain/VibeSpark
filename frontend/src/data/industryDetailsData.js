export const industryDetailsMap = {
  "education": {
    slug: "education",
    title: "Education & EdTech Solutions",
    badge: "EdTech Engineering",
    tagline: "Empowering universities, schools, and edtech startups with modern virtual learning platforms and automated student admission suites.",
    heroImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    overview: "We architect interactive Learning Management Systems (LMS), student enrollment portals, virtual classrooms, and examination engines that engage students and simplify administrative workflows.",
    challenges: [
      "Clunky legacy student information systems with severe mobile usability flaws",
      "Low student engagement in remote/hybrid courses due to buffering video players",
      "Inefficient manual fee collection, paper-based forms, and admission drop-offs",
      "Severe server crashes and downtime during examination windows and admission result releases"
    ],
    solutions: [
      {
        title: "Modern Custom LMS",
        desc: "Intuitive course creation, gamified student progress tracking, interactive quizzes, and mobile-friendly zero-latency video streaming."
      },
      {
        title: "Seamless Admission Funnels",
        desc: "Automated digital application workflows, instant document uploads, and integrated payment gateways that increase student enrollment."
      },
      {
        title: "Auto-Scaling Cloud Infrastructure",
        desc: "High-concurrency serverless architecture capable of handling tens of thousands of concurrent students taking exams simultaneously."
      }
    ],
    stats: [
      { value: "2.5x", label: "Increase in Online Admissions", desc: "Across verified university portals" },
      { value: "99.98%", label: "Uptime During Exam Windows", desc: "Zero downtime under peak exam stress" },
      { value: "65%", label: "Reduction in Admin Overhead", desc: "Automated digital fee & form processing" }
    ],
    deliverables: [
      {
        title: "Custom LMS & Student Portal",
        desc: "Interactive course modules, student progress tracking, mobile lesson playback, and personalized dashboards.",
        icon: "BookOpen"
      },
      {
        title: "Automated Admissions & Fee Engine",
        desc: "Digitized application forms, document upload verification, instant UPI/card fee processing, and ERP ledger sync.",
        icon: "CreditCard"
      },
      {
        title: "Online Examination & Proctoring",
        desc: "Secure test environments, automated grading rubrics, timed quizzes, and instant score certificate generation.",
        icon: "Award"
      },
      {
        title: "Parent-Student Communication Suite",
        desc: "Automated WhatsApp and SMS notifications for fee deadlines, attendance logs, exam schedules, and circulars.",
        icon: "MessageSquare"
      }
    ],
    caseStudy: {
      client: "AIMS Institute & DBHS Portals",
      domain: "aimsinstitute.in / dbhs.edu.in",
      metric: "+140% Online Student Admissions",
      headline: "Institutional Digital Transformation & Admissions Acceleration",
      summary: "Delivered a complete institutional digital overhaul with sub-0.4s load speed, dynamic syllabus explorer, and seamless admission fee processing for thousands of active students.",
      tags: ["Next.js", "Node.js", "AWS Cloud", "Student CRM", "100/100 Web Vitals"]
    },
    techStack: ["Next.js", "React.js", "Node.js", "PostgreSQL", "AWS S3 & CloudFront", "Tailwind CSS", "WhatsApp Gateway"],
    faqs: [
      {
        q: "Can your education platform integrate with our existing school ERP?",
        a: "Yes. We build custom REST and GraphQL connectors to synchronize student data, fee ledgers, and attendance records with your existing ERP seamlessly."
      },
      {
        q: "How does the system handle massive traffic during admission or exam results?",
        a: "We deploy auto-scaling serverless and cloud container clusters that effortlessly scale to handle tens of thousands of simultaneous users without latency or crashes."
      },
      {
        q: "Is the portal easily accessible for students on mobile devices?",
        a: "Every portal is developed mobile-first and can be compiled into a Progressive Web App (PWA) for fast, app-like performance on iOS and Android devices."
      }
    ]
  },

  "healthcare": {
    slug: "healthcare",
    title: "Healthcare & MedTech Platforms",
    badge: "Medical-Grade Technology",
    tagline: "Secure, HIPAA-compliant, and patient-centered digital health solutions for hospitals, clinical networks, and wellness providers.",
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    overview: "Deliver exceptional patient care and streamline clinical operations. We develop HIPAA-compliant telehealth portals, doctor appointment scheduling systems, EHR integrations, and patient communication apps.",
    challenges: [
      "Strict data privacy regulations (HIPAA, GDPR, local clinical compliance) requiring audit logging",
      "High patient no-show rates causing severe physician idle time and revenue leakage",
      "Fragmented electronic medical records and delayed lab diagnostic reporting",
      "Confusing patient navigation causing support desk call overload"
    ],
    solutions: [
      {
        title: "Compliant Telehealth & Booking",
        desc: "End-to-end encrypted video consultations, integrated prescription sharing, and instant appointment reminders via SMS/WhatsApp."
      },
      {
        title: "Secure Patient Portals",
        desc: "Self-service test result access, past treatment histories, and transparent online bill payments."
      },
      {
        title: "Doctor Roster & EHR Integration",
        desc: "Seamless connectivity between hospital administrative databases and front-facing patient booking calendars."
      }
    ],
    stats: [
      { value: "48%", label: "Reduction in Patient No-Shows", desc: "Driven by automated WhatsApp reminders" },
      { value: "100%", label: "HIPAA Compliant Architecture", desc: "Bank-grade 256-bit AES encryption at rest" },
      { value: "3.2x", label: "Growth in Telehealth Consults", desc: "Frictionless in-browser video suite" }
    ],
    deliverables: [
      {
        title: "HIPAA Telehealth Consultation Suite",
        desc: "Browser-based encrypted video consultations with integrated digital prescription writing and clinical notes.",
        icon: "Video"
      },
      {
        title: "Doctor Scheduling & Intake Engine",
        desc: "Real-time physician availability rosters, multi-clinic booking, and automated intake questionnaires.",
        icon: "Calendar"
      },
      {
        title: "Encrypted Patient Health Records",
        desc: "Secure self-service patient portals for diagnostic reports, treatment histories, and digital billing receipts.",
        icon: "ShieldCheck"
      },
      {
        title: "Automated Appointment Alerts",
        desc: "Multi-channel reminders via WhatsApp and SMS that guide patients to on-time arrivals and virtual check-ins.",
        icon: "Bell"
      }
    ],
    caseStudy: {
      client: "Kerala Ayurved Pune & Clinical Suite",
      domain: "keralaayurvedpune.com",
      metric: "3,500+ Monthly Patient Bookings",
      headline: "Authentic Clinical Portal & Teleconsultation Scheduling",
      summary: "Engineered a patient-first holistic healthcare portal with automated doctor consultations, personalized intake, and 48% reduction in appointment no-shows.",
      tags: ["React", "FastAPI", "WebRTC", "PostgreSQL", "WhatsApp API", "HIPAA Vault"]
    },
    techStack: ["React", "FastAPI", "WebRTC", "PostgreSQL", "Docker", "Tailwind CSS", "HIPAA Security"],
    faqs: [
      {
        q: "How do you ensure patient data privacy and clinical compliance?",
        a: "All healthcare applications implement 256-bit AES encryption at rest, TLS 1.3 in transit, granular role-based access control, and complete immutable audit logs."
      },
      {
        q: "Can patients attend video consultations without downloading an app?",
        a: "Yes. Our WebRTC consultation engine operates directly inside mobile browsers (Chrome, Safari) without requiring patient app downloads or registration friction."
      },
      {
        q: "Does the system support clinic branch management?",
        a: "Yes, multi-location clinics can manage centralized physician rosters, department availability, and shared patient medical files across different physical branches."
      }
    ]
  },

  "real-estate": {
    slug: "real-estate",
    title: "Real Estate & PropTech Portals",
    badge: "PropTech Innovation",
    tagline: "Showcase residential & commercial projects, capture high-value buyer inquiries, and accelerate real estate sales velocity.",
    heroImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    overview: "Elevate your property portfolio. We build dynamic MLS-integrated property portals, interactive 360-degree virtual tour showcases, mortgage calculation tools, and automated buyer lead capture pipelines.",
    challenges: [
      "Sluggish property catalogs and clunky geospatial maps causing buyer drop-off",
      "Stale or unverified property listings eroding customer trust and agency reputation",
      "Lost high-intent buyer leads due to delayed sales agent response times",
      "Inability to showcase luxury properties immersively to overseas and non-local investors"
    ],
    solutions: [
      {
        title: "Interactive Map & Faceted Search",
        desc: "High-speed filtering by neighborhood, price bracket, amenities, floor plans, and nearby transit links."
      },
      {
        title: "Virtual Tours & 3D Walkthroughs",
        desc: "Engaging 3D matterport and video embeds that allow overseas and out-of-town buyers to inspect properties remotely."
      },
      {
        title: "Instant Lead Dispatch to Agents",
        desc: "Real-time CRM integration that instantly alerts your sales reps via WhatsApp and email when an inquiry is submitted."
      }
    ],
    stats: [
      { value: "+185%", label: "Qualified Buyer Inquiries", desc: "Targeted landing pages & instant CRM sync" },
      { value: "< 2 min", label: "Agent Response Velocity", desc: "Automated instant lead notification webhooks" },
      { value: "4.8/5", label: "Client Satisfaction Rating", desc: "Based on verified real estate deployments" }
    ],
    deliverables: [
      {
        title: "3D Virtual Tour & Walkthrough Engine",
        desc: "High-definition 360-degree virtual tours, interactive master layouts, and unit-by-unit walk-in animations.",
        icon: "Camera"
      },
      {
        title: "Geospatial Map & Neighborhood Search",
        desc: "Fast location-based property discovery, proximity calculators (schools, metro, airport), and commute filters.",
        icon: "MapPin"
      },
      {
        title: "Instant Agent CRM Lead Dispatch",
        desc: "Sub-second webhook pipelines delivering buyer inquiries directly to sales reps' WhatsApp and CRM.",
        icon: "Zap"
      },
      {
        title: "Dynamic Floor Plans & Unit Inventory",
        desc: "Interactive architectural floor plans displaying real-time unit availability, area metrics, and price sheets.",
        icon: "Layers"
      }
    ],
    caseStudy: {
      client: "Solitaire Group Real Estate Hub",
      domain: "solitairehomes.in",
      metric: "+185% Qualified Buyer Inquiries",
      headline: "Luxury Living & Commercial Hub Showcase Engine",
      summary: "Architected modern property showcase portals with interactive floor plans, virtual property tours, and sub-2-minute lead dispatch across premium residential and business developments.",
      tags: ["Next.js", "GSAP Motion", "Mapbox", "Tailwind CSS", "Sales CRM"]
    },
    techStack: ["Next.js", "GSAP Motion", "Mapbox GL", "Node.js", "AWS Cloud", "Tailwind CSS"],
    faqs: [
      {
        q: "Can we showcase 3D virtual walkthroughs on mobile phones?",
        a: "Yes. Our WebGL and 360-degree virtual tour embeds are optimized for smooth 60fps rendering across modern smartphones without heavy data drain."
      },
      {
        q: "How fast do sales agents receive buyer inquiries?",
        a: "Our instant webhook pipelines deliver buyer contact info and property preferences to your sales team's WhatsApp and CRM within seconds."
      },
      {
        q: "Can our marketing team update unit availability and pricing internally?",
        a: "Yes, we integrate an intuitive admin CMS so your team can mark units as sold, adjust pricing, or launch new towers in minutes."
      }
    ]
  },

  "retail": {
    slug: "retail",
    title: "Retail & Omnichannel E-commerce",
    badge: "Modern Commerce",
    tagline: "Bridging the physical and digital retail divide with high-velocity shopping experiences and real-time inventory synchronization.",
    heroImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    overview: "From indie boutique brands to large enterprise distribution networks, we engineer omnichannel commerce ecosystems connecting physical point-of-sale systems with lightning-fast digital storefronts.",
    challenges: [
      "Checkout friction and cart abandonment rates hovering above 70%",
      "Inventory discrepancies between retail stores and online warehouse ledgers",
      "Slow mobile loading speeds driving away prospective buyers on 4G connections",
      "Lack of personalized customer loyalty rewards and automated post-purchase funnels"
    ],
    solutions: [
      {
        title: "Sub-Second Mobile Storefronts",
        desc: "Headless e-commerce architecture optimized for mobile conversion with one-click payment flows."
      },
      {
        title: "Unified Inventory & ERP Sync",
        desc: "Real-time stock ledger synchronization that eliminates accidental overselling and stockouts."
      },
      {
        title: "Retention & Loyalty Engines",
        desc: "Automated VIP tiers, customer points, and personalized post-purchase email/SMS sequences."
      }
    ],
    stats: [
      { value: "4.8x", label: "Online Sales Velocity", desc: "Driven by sub-second page loads & 1-click checkout" },
      { value: "0.8s", label: "Average Mobile Page Load", desc: "Ultra-fast headless React/Next.js architectures" },
      { value: "-42%", label: "Cart Abandonment Drop", desc: "Streamlined single-step payment funnels" }
    ],
    deliverables: [
      {
        title: "Headless Next.js Storefront",
        desc: "Ultra-fast catalog browsing, instant multi-filter search, and lightning sub-second product page loads.",
        icon: "ShoppingBag"
      },
      {
        title: "Interactive Product Customizer",
        desc: "Real-time 3D and variant selectors allowing customers to customize colors, materials, and specifications.",
        icon: "Sliders"
      },
      {
        title: "Unified Inventory & POS Sync",
        desc: "Automated bidirectional synchronization between physical retail stores, warehouse stock, and online orders.",
        icon: "RefreshCw"
      },
      {
        title: "Abandoned Cart WhatsApp Recovery",
        desc: "Automated conversational recovery messages with customized checkout discounts that win back lost sales.",
        icon: "MessageCircle"
      }
    ],
    caseStudy: {
      client: "Sahara Seats - Automotive Manufacturer",
      domain: "saharaseats.com",
      metric: "4.8x Online Sales Surge",
      headline: "Custom Seat Manufacturing E-Commerce & Interactive Visualizer",
      summary: "Engineered a high-performance custom seat manufacturing portal with multi-variant selectors, 1-step checkout funnels, and real-time inventory ledger.",
      tags: ["Shopify Plus", "React", "Razorpay / Stripe", "Node.js", "Tailwind CSS"]
    },
    techStack: ["Shopify Plus", "Next.js", "GraphQL", "Algolia Search", "Razorpay", "Tailwind CSS"],
    faqs: [
      {
        q: "How does headless e-commerce improve sales conversions?",
        a: "By separating the customer-facing frontend from the backend ledger, pages load under 0.8 seconds, eliminating bounce rates and increasing checkout completion by up to 40%."
      },
      {
        q: "Can we connect our existing ERP or warehouse accounting software?",
        a: "Yes, we engineer custom API integrations to keep orders, taxes, stock levels, and invoices synchronized automatically without manual reconciliation."
      },
      {
        q: "What payment gateways are supported?",
        a: "We support Razorpay, Cashfree, Stripe, PayU, and international multi-currency gateways with instant UPI, card, and net banking checkout."
      }
    ]
  },

  "restaurants": {
    slug: "restaurants",
    title: "Restaurants & Hospitality Systems",
    badge: "Hospitality Technology",
    tagline: "Direct table reservations, contactless digital ordering, zero-commission delivery funnels, and automated guest loyalty ecosystems.",
    heroImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    overview: "Liberate your venue from high aggregator commission fees. We build custom branded digital ordering engines, real-time table management dashboards, and automated guest remarketing systems.",
    challenges: [
      "Heavy 25-30% aggregator platform commissions eroding bottom-line food margins",
      "Unsynchronized POS causing double-bookings during peak weekend dining rushes",
      "Zero direct guest data ownership for repeat remarketing and promotional campaigns",
      "Delayed digital ticket printing creating kitchen dispatch errors"
    ],
    solutions: [
      {
        title: "Direct Digital Ordering Engine",
        desc: "Commission-free ordering with instant UPI, card, and net banking integration."
      },
      {
        title: "Smart Table Reservation Suite",
        desc: "Visual floor plan seat allocation with automated SMS/WhatsApp confirmations."
      },
      {
        title: "Guest CRM & Loyalty Program",
        desc: "Automated birthday offers, repeat-visit discounts, and feedback collection."
      }
    ],
    stats: [
      { value: "0%", label: "Third-Party Order Commission", desc: "100% of direct customer revenue is yours" },
      { value: "+45%", label: "Repeat Dine-In Visits", desc: "Automated WhatsApp loyalty incentives" },
      { value: "10k+", label: "Monthly Digital Bookings", desc: "Proven high-concurrency booking engines" }
    ],
    deliverables: [
      {
        title: "Commission-Free Ordering Engine",
        desc: "Custom branded web ordering menu with direct UPI/card payments and zero percentage cuts taken by aggregators.",
        icon: "Utensils"
      },
      {
        title: "Visual Table Booking & Floor Plans",
        desc: "Interactive dining floor maps with real-time seat reservation and automated WhatsApp confirmation tickets.",
        icon: "CalendarCheck"
      },
      {
        title: "Kitchen Display System (KDS)",
        desc: "Live order routing from customer tables directly to kitchen screens and thermal order printers.",
        icon: "Monitor"
      },
      {
        title: "Guest Loyalty & Remarketing",
        desc: "Automated post-dining review requests, milestone anniversary discounts, and targeted weekend promos.",
        icon: "Heart"
      }
    ],
    caseStudy: {
      client: "Travel Saga Dubai & Tourism Portal",
      domain: "travelsaga.com",
      metric: "10,000+ Monthly Direct Bookings",
      headline: "High-Volume UAE Excursion & Hospitality Booking Engine",
      summary: "Engineered high-concurrency tour and restaurant reservation engines with multi-currency checkout, dynamic ticket delivery, and WhatsApp voucher dispatch.",
      tags: ["React", "REST APIs", "AWS Cloud", "WhatsApp Gateway", "Multi-Currency"]
    },
    techStack: ["React", "Node.js", "Socket.io", "PostgreSQL", "WhatsApp API", "Tailwind CSS"],
    faqs: [
      {
        q: "Are there any hidden transaction commissions on direct orders?",
        a: "None. You only pay standard bank/payment gateway processing fees (e.g., standard 1.9% Razorpay/Stripe rates), keeping 100% of food revenue in your business."
      },
      {
        q: "Can guests order food directly from their table via QR code?",
        a: "Yes, guests can scan a table-specific QR code, browse high-resolution digital menus, place orders, and pay instantly without waiting for a waiter."
      },
      {
        q: "How does the system prevent table double-bookings during rush hours?",
        a: "Our real-time allocation engine locks table slots instantly across in-house and online requests, guaranteeing zero double-bookings during peak hours."
      }
    ]
  },

  "startups": {
    slug: "startups",
    title: "Startups & Emerging Tech Ecosystems",
    badge: "Venture Ready",
    tagline: "Rapid MVP prototyping, investor-ready UI design, and scalable cloud foundations for ambitious founders.",
    heroImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    overview: "We partner with visionary founders to turn disruptive concepts into production-ready SaaS architectures. From wireframes to launch-ready MVPs within 6 weeks, built to withstand rapid scaling and investor scrutiny.",
    challenges: [
      "Lengthy development cycles burning runway before early market validation",
      "Spaghetti codebases that require complete rewrites after seed funding",
      "Sub-optimal UI/UX failing to convert early pilot customers",
      "Security vulnerabilities failing enterprise customer procurement audits"
    ],
    solutions: [
      {
        title: "6-Week Rapid MVP Delivery",
        desc: "Laser-focused feature scope engineered with scalable React, Node, and AWS primitives."
      },
      {
        title: "Production Architecture",
        desc: "Modular microservices and clean schemas ready for institutional due-diligence."
      },
      {
        title: "High-Converting Investor Demos",
        desc: "Polished aesthetic motion design and interactive product walkthroughs."
      }
    ],
    stats: [
      { value: "6 Wks", label: "Average MVP Launch Velocity", desc: "From wireframes to production deployment" },
      { value: "$25M+", label: "Valuation of Partner Startups", desc: "Proven architecture supporting venture scale" },
      { value: "100%", label: "Source Code IP Ownership", desc: "Turnkey delivery with complete intellectual property" }
    ],
    deliverables: [
      {
        title: "Rapid MVP Sprint Engineering",
        desc: "Full-stack development taking your core value proposition from Figma prototypes to live code in 6 weeks.",
        icon: "Rocket"
      },
      {
        title: "Multi-Tenant SaaS Architecture",
        desc: "Robust tenant isolation, role-based permissions (RBAC), and clean REST/GraphQL APIs ready for scale.",
        icon: "Layers"
      },
      {
        title: "Recurring Billing & Stripe Integration",
        desc: "Turnkey subscription management, usage-based pricing meters, and customer self-serve billing portals.",
        icon: "CreditCard"
      },
      {
        title: "CI/CD & Automated Cloud Scaling",
        desc: "Docker containerization, auto-scaling AWS infrastructure, and automated testing pipelines.",
        icon: "Cloud"
      }
    ],
    caseStudy: {
      client: "CXP Lab & Sparrow CX Platform",
      domain: "cxplab.com",
      metric: "$25M+ Institutional Valuation",
      headline: "Enterprise Customer Experience Analytics SaaS Suite",
      summary: "Engineered scalable customer experience analytics platform capable of processing millions of event streams with sub-second dashboard rendering and automated alert webhooks.",
      tags: ["React", "TypeScript", "Node.js", "Docker", "AWS Cloud", "Redis"]
    },
    techStack: ["React / Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS ECS"],
    faqs: [
      {
        q: "Do we retain 100% full ownership of the source code and IP?",
        a: "Yes. Upon project milestone delivery, all code repositories, database schemas, and intellectual property belong exclusively to your company with zero vendor lock-in."
      },
      {
        q: "How quickly can you take our MVP from concept to launch?",
        a: "Our structured sprint methodology typically delivers a functional, user-tested production MVP in 4 to 6 weeks."
      },
      {
        q: "Is the architecture ready for investor due-diligence?",
        a: "Absolutely. We write clean, typed TypeScript and modular architectures with automated testing, role-based access control, and complete API documentation."
      }
    ]
  }
};
