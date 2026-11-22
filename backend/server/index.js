import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'vibespark_super_secure_jwt_secret_key_2026';

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

// Authentication Middleware
const authenticateAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, name: true }
    });

    if (!admin) {
      return res.status(401).json({ error: 'Unauthorized: Admin not found' });
    }

    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
};

// ==========================================
// 1. AUTHENTICATION ROUTES (NO PUBLIC REGISTRATION)
// ==========================================

// Login: Only existing verified Admin can authenticate
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const admin = await prisma.admin.findUnique({
      where: { email: email.trim().toLowerCase() }
    });

    if (!admin) {
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
// 2. PUBLIC BLOG ROUTES (DIRECT MYSQL INTEGRATION)
// ==========================================

// Get all published blogs
app.get('/api/public/blogs', async (req, res) => {
  try {
    const { category, search } = req.query;
    
    const where = { published: true };
    if (category && category !== 'All') {
      where.category = category;
    }
    if (search && search.trim()) {
      where.OR = [
        { title: { contains: search.trim() } },
        { summary: { contains: search.trim() } },
        { focusKeyword: { contains: search.trim() } }
      ];
    }

    const blogs = await prisma.post.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    // Parse JSON fields safely
    const formatted = blogs.map(b => ({
      ...b,
      takeaways: b.takeawaysJson ? JSON.parse(b.takeawaysJson) : [],
      sections: b.sectionsJson ? JSON.parse(b.sectionsJson) : [],
      author: {
        name: b.authorName,
        role: b.authorRole,
        avatar: b.authorAvatar
      }
    }));

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

    const blog = await prisma.post.findFirst({
      where: {
        slug: cleanSlug,
        published: true
      }
    });

    if (!blog) {
      return res.status(404).json({ error: 'Article not found or not published' });
    }

    // Increment view count asynchronously
    await prisma.post.update({
      where: { id: blog.id },
      data: { views: { increment: 1 } }
    }).catch(() => {});

    const formatted = {
      ...blog,
      takeaways: blog.takeawaysJson ? JSON.parse(blog.takeawaysJson) : [],
      sections: blog.sectionsJson ? JSON.parse(blog.sectionsJson) : [],
      author: {
        name: blog.authorName,
        role: blog.authorRole,
        avatar: blog.authorAvatar
      }
    };

    return res.json({ blog: formatted });
  } catch (err) {
    console.error('Fetch single blog error:', err);
    return res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// ==========================================
// 3. ADMIN BLOG CRUD ROUTES (PROTECTED)
// ==========================================

// Get all blogs (drafts + published) with dashboard analytics
app.get('/api/admin/blogs', authenticateAdmin, async (req, res) => {
  try {
    const blogs = await prisma.post.findMany({
      orderBy: { updatedAt: 'desc' }
    });

    const total = blogs.length;
    const publishedCount = blogs.filter(b => b.published).length;
    const draftCount = total - publishedCount;
    const totalViews = blogs.reduce((acc, b) => acc + (b.views || 0), 0);

    const formatted = blogs.map(b => ({
      ...b,
      takeaways: b.takeawaysJson ? JSON.parse(b.takeawaysJson) : [],
      sections: b.sectionsJson ? JSON.parse(b.sectionsJson) : [],
      author: {
        name: b.authorName,
        role: b.authorRole,
        avatar: b.authorAvatar
      }
    }));

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
    const blog = await prisma.post.findUnique({
      where: { id }
    });

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    const formatted = {
      ...blog,
      takeaways: blog.takeawaysJson ? JSON.parse(blog.takeawaysJson) : [],
      sections: blog.sectionsJson ? JSON.parse(blog.sectionsJson) : [],
      author: {
        name: blog.authorName,
        role: blog.authorRole,
        avatar: blog.authorAvatar
      }
    };

    return res.json({ blog: formatted });
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
    
    // Ensure slug uniqueness
    let existing = await prisma.post.findUnique({ where: { slug: finalSlug } });
    if (existing) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    const post = await prisma.post.create({
      data: {
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
        authorName: data.authorName || 'VibeSpark Squad',
        authorRole: data.authorRole || 'Engineering Practice',
        authorAvatar: data.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
        seoTitle: data.seoTitle || `${data.title} | VibeSpark Technologies`,
        metaDescription: data.metaDescription || data.summary || data.subtitle || '',
        focusKeyword: data.focusKeyword || '',
        canonicalUrl: data.canonicalUrl || `https://vibespark.in/blog/${finalSlug}`,
        takeawaysJson: data.takeaways ? JSON.stringify(data.takeaways) : '[]',
        sectionsJson: data.sections ? JSON.stringify(data.sections) : '[]'
      }
    });

    return res.status(201).json({ success: true, post });
  } catch (err) {
    console.error('Create blog error:', err);
    return res.status(500).json({ error: 'Failed to create blog post' });
  }
});

// Update blog post
app.put('/api/admin/blogs/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    let finalSlug = existing.slug;
    if (data.slug && data.slug !== existing.slug) {
      finalSlug = slugify(data.slug);
      const conflict = await prisma.post.findFirst({
        where: { slug: finalSlug, NOT: { id } }
      });
      if (conflict) {
        return res.status(400).json({ error: 'Slug is already in use by another article' });
      }
    }

    const updated = await prisma.post.update({
      where: { id },
      data: {
        title: data.title !== undefined ? data.title : existing.title,
        slug: finalSlug,
        subtitle: data.subtitle !== undefined ? data.subtitle : existing.subtitle,
        summary: data.summary !== undefined ? data.summary : existing.summary,
        content: data.content !== undefined ? data.content : existing.content,
        category: data.category !== undefined ? data.category : existing.category,
        badge: data.badge !== undefined ? data.badge : existing.badge,
        date: data.date !== undefined ? data.date : existing.date,
        readTime: data.readTime !== undefined ? data.readTime : existing.readTime,
        image: data.image !== undefined ? data.image : existing.image,
        imageAlt: data.imageAlt !== undefined ? data.imageAlt : existing.imageAlt,
        published: data.published !== undefined ? Boolean(data.published) : existing.published,
        authorName: data.authorName !== undefined ? data.authorName : existing.authorName,
        authorRole: data.authorRole !== undefined ? data.authorRole : existing.authorRole,
        authorAvatar: data.authorAvatar !== undefined ? data.authorAvatar : existing.authorAvatar,
        seoTitle: data.seoTitle !== undefined ? data.seoTitle : existing.seoTitle,
        metaDescription: data.metaDescription !== undefined ? data.metaDescription : existing.metaDescription,
        focusKeyword: data.focusKeyword !== undefined ? data.focusKeyword : existing.focusKeyword,
        canonicalUrl: data.canonicalUrl !== undefined ? data.canonicalUrl : `https://vibespark.in/blog/${finalSlug}`,
        takeawaysJson: data.takeaways ? JSON.stringify(data.takeaways) : existing.takeawaysJson,
        sectionsJson: data.sections ? JSON.stringify(data.sections) : existing.sectionsJson
      }
    });

    return res.json({ success: true, post: updated });
  } catch (err) {
    console.error('Update blog error:', err);
    return res.status(500).json({ error: 'Failed to update blog' });
  }
});

// Delete blog post
app.delete('/api/admin/blogs/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.post.delete({ where: { id } });
    return res.json({ success: true, message: 'Article deleted successfully' });
  } catch (err) {
    console.error('Delete blog error:', err);
    return res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

// Toggle publish status (Publish / Unpublish)
app.patch('/api/admin/blogs/:id/publish', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    const updated = await prisma.post.update({
      where: { id },
      data: { published: !existing.published }
    });

    return res.json({ success: true, post: updated });
  } catch (err) {
    console.error('Toggle publish error:', err);
    return res.status(500).json({ error: 'Failed to update publish status' });
  }
});

// ==========================================
// 4. NEWSLETTER SUBSCRIPTION (PUBLIC)
// ==========================================
app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@') || !email.includes('.')) {
      return res.status(400).json({ error: 'Please enter a valid work email address.' });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Persist newsletter subscriber via Prisma Client (PostgreSQL / Supabase compatible)
    try {
      await prisma.subscriber.upsert({
        where: { email: cleanEmail },
        update: {},
        create: { email: cleanEmail }
      });
    } catch (dbErr) {
      console.warn('Newsletter DB insert note:', dbErr.message);
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
// 5. CLIENT ENQUIRIES API (SUPABASE POSTGRESQL / PRISMA)
// ==========================================

// Public: Submit new enquiry
app.post('/api/public/enquiries', async (req, res) => {
  try {
    const { name, email, phone, company, service, budget, message } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone number are required.' });
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        company: (company || '').trim(),
        service: service || 'General Inquiry',
        budget: budget || 'Custom Budget',
        message: (message || '').trim(),
        status: 'new'
      }
    });

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
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.json({ success: true, enquiries });
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
    await prisma.enquiry.update({
      where: { id },
      data: { status }
    });
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
    await prisma.enquiry.delete({
      where: { id }
    });
    return res.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (err) {
    console.error('Delete enquiry error:', err);
    return res.status(500).json({ error: 'Failed to delete enquiry' });
  }
});

// ==========================================
// 6. DYNAMIC XML SITEMAP (AUTO-UPDATES ON PUBLISH)
// ==========================================
app.get('/api/sitemap.xml', async (req, res) => {
  try {
    const publishedBlogs = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true }
    });

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

    // Static pages
    staticRoutes.forEach(route => {
      xml += `  <url>\n`;
      xml += `    <loc>https://vibespark.in${route}</loc>\n`;
      xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>${route === '' ? '1.0' : '0.8'}</priority>\n`;
      xml += `  </url>\n`;
    });

    // Dynamic Published Blogs
    publishedBlogs.forEach(post => {
      const date = post.updatedAt ? post.updatedAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
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

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return res.json({ status: 'ok', database: 'connected', timestamp: new Date() });
  } catch (err) {
    return res.status(500).json({ status: 'error', database: 'disconnected', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`[VibeSpark API] Server running on http://127.0.0.1:${PORT}`);
});
