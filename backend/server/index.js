import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'vibespark_super_secure_jwt_secret_key_2026';

// Supabase PostgreSQL Client Configuration
const supabaseUrl = process.env.SUPABASE_URL || 'https://eekdilddobesizuiimhk.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_dgEQtv-hJiTSmSJ89Ma7OQ_0xLcA-KC';
const supabase = createClient(supabaseUrl, supabaseKey);

// CORS configuration - allow Vite frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// Helper function to create clean SEO slug
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// Format blog post JSON fields safely
function formatBlogPost(b) {
  if (!b) return null;
  return {
    ...b,
    takeaways: b.takeawaysJson ? (typeof b.takeawaysJson === 'string' ? JSON.parse(b.takeawaysJson) : b.takeawaysJson) : [],
    sections: b.sectionsJson ? (typeof b.sectionsJson === 'string' ? JSON.parse(b.sectionsJson) : b.sectionsJson) : [],
    author: {
      name: b.authorName || 'VibeSpark Squad',
      role: b.authorRole || 'Engineering Practice',
      avatar: b.authorAvatar || '/vibespark-logo.png'
    }
  };
}

// Authentication Middleware
const authenticateAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const { data: admin, error } = await supabase
      .from('admins')
      .select('id, email, name')
      .eq('id', decoded.id)
      .maybeSingle();

    if (error || !admin) {
      return res.status(401).json({ error: 'Unauthorized: Admin not found' });
    }

    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
};

// ==========================================
// 1. AUTHENTICATION ROUTES
// ==========================================

// Login: Verify Admin credentials against Supabase
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const { data: admin, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', cleanEmail)
      .maybeSingle();

    if (error || !admin) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, name: admin.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Authentication failed' });
  }
});

// Logout: Informs client to clear token
app.post('/api/auth/logout', (req, res) => {
  return res.json({ success: true, message: 'Logged out successfully' });
});

// Get Current Logged-in Admin Profile
app.get('/api/auth/me', authenticateAdmin, (req, res) => {
  return res.json({ admin: req.admin });
});

// ==========================================
// 2. PUBLIC BLOG ROUTES (SUPABASE POSTGRESQL)
// ==========================================

// Get all published blogs
app.get('/api/public/blogs', async (req, res) => {
  try {
    const { category, search } = req.query;
    
    let query = supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('createdAt', { ascending: false });

    if (category && category !== 'All') {
      query = query.eq('category', category);
    }

    if (search && search.trim()) {
      query = query.ilike('title', `%${search.trim()}%`);
    }

    const { data: blogs, error } = await query;

    if (error) {
      console.error('Supabase fetch blogs error:', error);
      return res.status(500).json({ error: 'Failed to fetch blogs' });
    }

    const formatted = (blogs || []).map(formatBlogPost);
    return res.json({ blogs: formatted });
  } catch (err) {
    console.error('Fetch public blogs error:', err);
    return res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// Get single published blog by slug & increment views
app.get('/api/public/blogs/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const cleanSlug = slug.replace(/^\/blog\//, '').replace(/^\//, '');

    const { data: blog, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', cleanSlug)
      .eq('published', true)
      .maybeSingle();

    if (error || !blog) {
      return res.status(404).json({ error: 'Article not found or not published' });
    }

    // Increment view count asynchronously
    supabase
      .from('posts')
      .update({ views: (blog.views || 0) + 1 })
      .eq('id', blog.id)
      .then();

    return res.json({ blog: formatBlogPost(blog) });
  } catch (err) {
    console.error('Fetch single blog error:', err);
    return res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// ==========================================
// 3. ADMIN BLOG CRUD ROUTES (PROTECTED)
// ==========================================

// Get all blogs (drafts + published) with analytics
app.get('/api/admin/blogs', authenticateAdmin, async (req, res) => {
  try {
    const { data: blogs, error } = await supabase
      .from('posts')
      .select('*')
      .order('updatedAt', { ascending: false });

    if (error) {
      return res.status(500).json({ error: 'Failed to retrieve blogs' });
    }

    const list = blogs || [];
    const total = list.length;
    const publishedCount = list.filter(b => b.published).length;
    const draftCount = total - publishedCount;
    const totalViews = list.reduce((acc, b) => acc + (b.views || 0), 0);

    const formatted = list.map(formatBlogPost);

    return res.json({
      blogs: formatted,
      stats: {
        total,
        publishedCount,
        draftCount,
        totalViews
      }
    });
  } catch (err) {
    console.error('Admin fetch blogs error:', err);
    return res.status(500).json({ error: 'Failed to retrieve blogs' });
  }
});

// Get single blog for editing (admin)
app.get('/api/admin/blogs/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { data: blog, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error || !blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    return res.json({ blog: formatBlogPost(blog) });
  } catch (err) {
    console.error('Admin get blog error:', err);
    return res.status(500).json({ error: 'Failed to retrieve blog' });
  }
});

// Create new blog post
app.post('/api/admin/blogs', authenticateAdmin, async (req, res) => {
  try {
    const data = req.body;
    if (!data.title) {
      return res.status(400).json({ error: 'Article title is required' });
    }

    let finalSlug = data.slug ? slugify(data.slug) : slugify(data.title);
    
    // Check existing slug
    const { data: existing } = await supabase
      .from('posts')
      .select('id')
      .eq('slug', finalSlug)
      .maybeSingle();

    if (existing) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    const newPost = {
      title: data.title,
      slug: finalSlug,
      subtitle: data.subtitle || '',
      summary: data.summary || '',
      content: data.content || '',
      category: data.category || 'Web Development',
      badge: data.badge || 'Insights',
      date: data.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      readTime: data.readTime || '5 min read',
      image: data.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      imageAlt: data.imageAlt || data.title,
      published: Boolean(data.published),
      views: 0,
      authorName: data.authorName || 'VibeSpark Squad',
      authorRole: data.authorRole || 'Engineering Practice',
      authorAvatar: data.authorAvatar || '/vibespark-logo.png',
      seoTitle: data.seoTitle || data.title,
      metaDescription: data.metaDescription || data.summary || '',
      focusKeyword: data.focusKeyword || '',
      canonicalUrl: data.canonicalUrl || `https://vibespark.in/blog/${finalSlug}`,
      primaryKeyword: data.primaryKeyword || data.focusKeyword || '',
      secondaryKeywords: data.secondaryKeywords || '',
      takeawaysJson: Array.isArray(data.takeaways) ? JSON.stringify(data.takeaways) : (data.takeawaysJson || '[]'),
      sectionsJson: Array.isArray(data.sections) ? JSON.stringify(data.sections) : (data.sectionsJson || '[]')
    };

    const { data: post, error } = await supabase
      .from('posts')
      .insert([newPost])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert post error:', error);
      return res.status(500).json({ error: 'Failed to create blog post' });
    }

    return res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      post: formatBlogPost(post)
    });
  } catch (err) {
    console.error('Create blog error:', err);
    return res.status(500).json({ error: 'Failed to create blog post' });
  }
});

// Update existing blog post
app.put('/api/admin/blogs/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    let finalSlug = undefined;
    if (data.slug) {
      finalSlug = slugify(data.slug);
      const { data: conflict } = await supabase
        .from('posts')
        .select('id')
        .eq('slug', finalSlug)
        .neq('id', id)
        .maybeSingle();

      if (conflict) {
        return res.status(400).json({ error: 'Slug is already used by another article' });
      }
    }

    const updatePayload = {
      ...(data.title !== undefined && { title: data.title }),
      ...(finalSlug !== undefined && { slug: finalSlug }),
      ...(data.subtitle !== undefined && { subtitle: data.subtitle }),
      ...(data.summary !== undefined && { summary: data.summary }),
      ...(data.content !== undefined && { content: data.content }),
      ...(data.category !== undefined && { category: data.category }),
      ...(data.badge !== undefined && { badge: data.badge }),
      ...(data.date !== undefined && { date: data.date }),
      ...(data.readTime !== undefined && { readTime: data.readTime }),
      ...(data.image !== undefined && { image: data.image }),
      ...(data.imageAlt !== undefined && { imageAlt: data.imageAlt }),
      ...(data.published !== undefined && { published: Boolean(data.published) }),
      ...(data.authorName !== undefined && { authorName: data.authorName }),
      ...(data.authorRole !== undefined && { authorRole: data.authorRole }),
      ...(data.authorAvatar !== undefined && { authorAvatar: data.authorAvatar }),
      ...(data.seoTitle !== undefined && { seoTitle: data.seoTitle }),
      ...(data.metaDescription !== undefined && { metaDescription: data.metaDescription }),
      ...(data.focusKeyword !== undefined && { focusKeyword: data.focusKeyword }),
      ...(data.canonicalUrl !== undefined && { canonicalUrl: data.canonicalUrl }),
      ...(data.primaryKeyword !== undefined && { primaryKeyword: data.primaryKeyword }),
      ...(data.secondaryKeywords !== undefined && { secondaryKeywords: data.secondaryKeywords }),
      ...(data.takeaways !== undefined && { takeawaysJson: JSON.stringify(data.takeaways) }),
      ...(data.sections !== undefined && { sectionsJson: JSON.stringify(data.sections) }),
      updatedAt: new Date().toISOString()
    };

    const { data: updated, error } = await supabase
      .from('posts')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase update error:', error);
      return res.status(500).json({ error: 'Failed to update blog post' });
    }

    return res.json({
      success: true,
      message: 'Blog post updated successfully',
      post: formatBlogPost(updated)
    });
  } catch (err) {
    console.error('Update blog error:', err);
    return res.status(500).json({ error: 'Failed to update blog post' });
  }
});

// Delete blog post
app.delete('/api/admin/blogs/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: 'Failed to delete blog' });
    }

    return res.json({ success: true, message: 'Article permanently deleted' });
  } catch (err) {
    console.error('Delete blog error:', err);
    return res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

// ==========================================
// 4. NEWSLETTER SUBSCRIPTION API (SUPABASE)
// ==========================================
app.post('/api/public/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@') || !email.includes('.')) {
      return res.status(400).json({ error: 'Please enter a valid work email address.' });
    }

    const cleanEmail = email.trim().toLowerCase();

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email: cleanEmail }]);

    if (error && !error.message.includes('unique')) {
      console.warn('Newsletter subscribe note:', error.message);
    }

    return res.json({
      success: true,
      message: 'Thank you for subscribing! Welcome to the VibeSpark Engineering Brief.'
    });
  } catch (err) {
    console.error('Newsletter error:', err);
    return res.status(500).json({ error: 'Unable to process subscription right now.' });
  }
});

// ==========================================
// 5. CLIENT ENQUIRIES API (SUPABASE POSTGRESQL)
// ==========================================

// Public: Submit new enquiry
app.post('/api/public/enquiries', async (req, res) => {
  try {
    const { name, email, phone, company, service, budget, message } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone number are required.' });
    }

    const enquiryPayload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      company: (company || '').trim(),
      service: service || 'General Inquiry',
      budget: budget || 'Custom Budget',
      message: (message || '').trim(),
      status: 'new'
    };

    const { data: enquiry, error } = await supabase
      .from('enquiries')
      .insert([enquiryPayload])
      .select()
      .single();

    if (error) {
      console.error('Supabase enquiry insert error:', error);
      return res.status(500).json({ error: 'Failed to submit enquiry. Please try again.' });
    }

    return res.json({
      success: true,
      message: 'Your inquiry has been received. Our solutions team will contact you shortly.',
      id: enquiry.id
    });
  } catch (err) {
    console.error('Submit enquiry error:', err);
    return res.status(500).json({ error: 'Failed to submit enquiry. Please try again.' });
  }
});

// Protected: Admin get all enquiries
app.get('/api/admin/enquiries', authenticateAdmin, async (req, res) => {
  try {
    const { data: enquiries, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch enquiries' });
    }

    return res.json({ success: true, enquiries: enquiries || [] });
  } catch (err) {
    console.error('Fetch enquiries error:', err);
    return res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
});

// Protected: Admin update enquiry status
app.patch('/api/admin/enquiries/:id/status', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const { error } = await supabase
      .from('enquiries')
      .update({ status })
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: 'Failed to update enquiry status' });
    }

    return res.json({ success: true, message: 'Status updated successfully' });
  } catch (err) {
    console.error('Update enquiry status error:', err);
    return res.status(500).json({ error: 'Failed to update enquiry status' });
  }
});

// Protected: Admin delete enquiry
app.delete('/api/admin/enquiries/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('enquiries')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: 'Failed to delete enquiry' });
    }

    return res.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (err) {
    console.error('Delete enquiry error:', err);
    return res.status(500).json({ error: 'Failed to delete enquiry' });
  }
});

// ==========================================
// 6. DYNAMIC XML SITEMAP
// ==========================================
app.get('/api/sitemap.xml', async (req, res) => {
  try {
    const { data: publishedBlogs } = await supabase
      .from('posts')
      .select('slug, updatedAt')
      .eq('published', true);

    const staticRoutes = [
      '',
      '/about',
      '/services',
      '/portfolio',
      '/blog',
      '/contact'
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    staticRoutes.forEach(route => {
      xml += `  <url>\n`;
      xml += `    <loc>https://vibespark.in${route}</loc>\n`;
      xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>${route === '' ? '1.0' : '0.8'}</priority>\n`;
      xml += `  </url>\n`;
    });

    (publishedBlogs || []).forEach(post => {
      const date = post.updatedAt ? post.updatedAt.split('T')[0] : new Date().toISOString().split('T')[0];
      xml += `  <url>\n`;
      xml += `    <loc>https://vibespark.in/blog/${post.slug}</loc>\n`;
      xml += `    <lastmod>${date}</lastmod>\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `    <priority>0.9</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    return res.send(xml);
  } catch (err) {
    console.error('Sitemap error:', err);
    return res.status(500).send('Error generating sitemap');
  }
});

// ==========================================
// 7. HEALTH CHECK
// ==========================================
app.get('/api/health', async (req, res) => {
  try {
    const { count, error } = await supabase
      .from('posts')
      .select('id', { count: 'exact', head: true });

    if (error) throw error;
    return res.json({
      status: 'ok',
      database: 'connected (Supabase PostgreSQL)',
      postsCount: count,
      timestamp: new Date()
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      database: 'disconnected',
      error: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`[VibeSpark API] Server running on http://127.0.0.1:${PORT} (Powered by Supabase PostgreSQL)`);
});
