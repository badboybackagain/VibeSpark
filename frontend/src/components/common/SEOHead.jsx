import { useEffect } from 'react';

/**
 * Dynamic SEO Engine Component
 * Manages Title, Meta Tags, Open Graph, Twitter Cards, Canonical Links & JSON-LD Schemas
 */
export default function SEOHead({
  title = "VibeSpark Technologies — Powering Ideas. Creating Digital Experiences.",
  description = "VibeSpark Technologies is a premier digital engineering and growth agency in Pune, India. Custom web development, algorithmic SEO, SaaS architectures, and digital marketing.",
  keywords = "VibeSpark Technologies, web development Pune, SEO company Pune, custom software development, Next.js agency, digital marketing agency India",
  canonicalUrl = "https://vibespark.in",
  ogType = "website",
  ogImage = "https://vibespark.in/assets/images/hero-developer-ai.jpg",
  schema = null,
  article = null
}) {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper to update or create meta tags
    const updateMetaTag = (attribute, attributeValue, content) => {
      let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', keywords);
    updateMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateMetaTag('name', 'author', 'VibeSpark Technologies');

    // 3. Open Graph Tags
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:type', ogType);
    updateMetaTag('property', 'og:url', canonicalUrl);
    updateMetaTag('property', 'og:image', ogImage);
    updateMetaTag('property', 'og:site_name', 'VibeSpark Technologies');
    updateMetaTag('property', 'og:locale', 'en_US');

    // 4. Twitter Card Tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', ogImage);

    // 5. Article Tags if present
    if (article) {
      if (article.publishedTime) updateMetaTag('property', 'article:published_time', article.publishedTime);
      if (article.modifiedTime) updateMetaTag('property', 'article:modified_time', article.modifiedTime);
      if (article.author) updateMetaTag('property', 'article:author', article.author);
      if (article.section) updateMetaTag('property', 'article:section', article.section);
    }

    // 6. Canonical URL Tag
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute('href', canonicalUrl);

    // 7. Inject JSON-LD Schema
    const scriptId = 'vibespark-dynamic-schema';
    let schemaScript = document.getElementById(scriptId);

    // Default global organization & website schema
    const defaultSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://vibespark.in/#organization",
          "name": "VibeSpark Technologies",
          "url": "https://vibespark.in",
          "logo": {
            "@type": "ImageObject",
            "url": "https://vibespark.in/assets/logos/vibespark-logo.png",
            "caption": "VibeSpark Technologies Logo"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Nyati Ethereal, Kharadi",
            "addressLocality": "Pune",
            "addressRegion": "Maharashtra",
            "postalCode": "411014",
            "addressCountry": "IN"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-90284-46832",
            "contactType": "Customer Support",
            "areaServed": ["IN", "US", "GB", "AE"],
            "availableLanguage": ["English", "Hindi", "Marathi"]
          },
          "sameAs": [
            "https://www.linkedin.com/company/vibespark-technologies",
            "https://twitter.com/vibesparktech",
            "https://github.com/vibespark"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://vibespark.in/#website",
          "url": "https://vibespark.in",
          "name": "VibeSpark Technologies",
          "description": "Enterprise Web Development, Algorithmic SEO & Digital Solutions Agency",
          "publisher": {
            "@id": "https://vibespark.in/#organization"
          }
        }
      ]
    };

    const finalSchema = schema || defaultSchema;

    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = scriptId;
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(finalSchema);

    // Cleanup on unmount (optional, keeps last valid schema)
    return () => {};
  }, [title, description, keywords, canonicalUrl, ogType, ogImage, schema, article]);

  return null;
}
