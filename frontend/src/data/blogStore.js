import { blogPostsData } from './siteData';
import { blogDetailsMap } from './blogDetailsData';

const STORAGE_KEY = 'vibespark_cms_blogs';

// Initial baseline sync
function getInitialPosts() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Unable to access localStorage for blogs:', e);
  }

  // Merge blogPostsData with deep details
  const baseline = blogPostsData.map((post) => {
    const detail = blogDetailsMap[post.id] || {};
    return {
      id: post.id,
      slug: post.id,
      title: post.title,
      subtitle: detail.subtitle || post.excerpt,
      excerpt: post.excerpt,
      category: post.category,
      tags: detail.tags || [post.category, 'Technology', 'VibeSpark'],
      status: 'published', // 'published' | 'draft'
      date: post.date,
      readTime: post.readTime,
      image: post.image,
      imageAlt: `${post.title} — VibeSpark Technical Publication`,
      author: detail.author || {
        name: "VibeSpark Team",
        role: "Editorial & Engineering Team",
        avatar: "/vibespark-logo.png"
      },
      summary: detail.summary || post.excerpt,
      takeaways: detail.takeaways || [
        "Architectural scalability directly fuels organic conversion rates.",
        "Sub-second page speeds reduce user bounce rate across mobile devices.",
        "High-intent semantic structure powers top search engine rankings."
      ],
      sections: detail.sections || [
        {
          heading: "1. Core Architectural Foundation",
          content: "Modern enterprise systems must prioritize sub-second Time to Interactive (TTI) and low cumulative layout shifts. By leveraging modern micro-frontend frameworks, organizations maintain high development velocity without sacrificing Core Web Vitals performance."
        },
        {
          heading: "2. Strategic Conversion Mechanics",
          content: "Traffic acquisition is merely half the journey. Aligning content with user transaction journeys, frictionless single-click checkouts, and clean trust signals leads to verifiable conversion rate optimization."
        }
      ],
      seoTitle: `${post.title} | VibeSpark Insights`,
      metaDescription: post.excerpt,
      canonicalUrl: `https://vibespark.in/blog/${post.id}`,
      primaryKeyword: post.category,
      secondaryKeywords: "digital engineering, tech architecture, website optimization"
    };
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(baseline));
  } catch (e) {
    // Ignore storage quota errors in restricted environments
  }

  return baseline;
}

export const blogStore = {
  getPosts(includeDrafts = false) {
    const posts = getInitialPosts();
    if (includeDrafts) return posts;
    return posts.filter(p => p.status === 'published');
  },

  getPostBySlug(slug) {
    const posts = getInitialPosts();
    return posts.find(p => p.slug === slug || p.id === slug);
  },

  savePost(postData) {
    const posts = getInitialPosts();
    const slug = postData.slug 
      ? postData.slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      : postData.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const record = {
      ...postData,
      id: postData.id || slug,
      slug,
      date: postData.date || new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      readTime: postData.readTime || `${Math.max(3, Math.ceil((postData.summary?.length || 500) / 180))} min read`,
      image: postData.image || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
      imageAlt: postData.imageAlt || `${postData.title} | VibeSpark`,
      canonicalUrl: postData.canonicalUrl || `https://vibespark.in/blog/${slug}`,
      status: postData.status || 'published'
    };

    const existingIndex = posts.findIndex(p => p.id === record.id || p.slug === record.slug);
    let updated;
    if (existingIndex >= 0) {
      updated = [...posts];
      updated[existingIndex] = record;
    } else {
      updated = [record, ...posts];
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('vibespark_blogs_updated'));
    } catch (e) {
      console.error('Failed to save post to storage:', e);
    }

    return record;
  },

  deletePost(id) {
    const posts = getInitialPosts();
    const updated = posts.filter(p => p.id !== id && p.slug !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('vibespark_blogs_updated'));
    } catch (e) {
      console.error('Failed to delete post:', e);
    }
    return updated;
  },

  toggleStatus(id) {
    const posts = getInitialPosts();
    const updated = posts.map(p => {
      if (p.id === id || p.slug === id) {
        return { ...p, status: p.status === 'published' ? 'draft' : 'published' };
      }
      return p;
    });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('vibespark_blogs_updated'));
    } catch (e) {
      console.error('Failed to toggle status:', e);
    }
    return updated;
  }
};
