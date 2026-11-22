// VibeSpark MySQL API Client

const API_BASE = '/api';

/**
 * Resilient fetch with automatic exponential backoff retry.
 * Handles transient proxy 502 Bad Gateway during backend server spin-up or reload.
 */
async function safeFetch(url, options = {}, retries = 2, delayMs = 350) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, options);
      if ((res.status === 502 || res.status === 503 || res.status === 504) && attempt < retries) {
        await new Promise((r) => setTimeout(r, delayMs * (attempt + 1)));
        continue;
      }
      return res;
    } catch (err) {
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, delayMs * (attempt + 1)));
        continue;
      }
      throw err;
    }
  }
}

export const api = {
  // Public blog endpoints (Direct MySQL)
  async getPublicBlogs(params = {}) {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'All') query.append('category', params.category);
    if (params.search) query.append('search', params.search);

    try {
      const res = await safeFetch(`${API_BASE}/public/blogs?${query.toString()}`);
      if (!res.ok) {
        return { blogs: [] };
      }
      return await res.json();
    } catch (err) {
      return { blogs: [] };
    }
  },

  async getPublicBlogBySlug(slug) {
    const clean = slug.replace(/^\/blog\//, '').replace(/^\//, '');
    try {
      const res = await safeFetch(`${API_BASE}/public/blogs/${clean}`);
      if (!res.ok) throw new Error('Article not found or not published');
      return await res.json();
    } catch (err) {
      throw err;
    }
  },

  // Admin authentication (Secure JWT, Solitary Admin)
  async adminLogin(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Authentication failed');
    return data;
  },

  async adminLogout() {
    return fetch(`${API_BASE}/auth/logout`, { method: 'POST' }).then(r => r.json());
  },

  async getAdminMe(token) {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Invalid or expired session');
    return res.json();
  },

  // Admin Blog CRUD (Stored in MySQL via Prisma)
  async getAdminBlogs(token) {
    const res = await fetch(`${API_BASE}/admin/blogs`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to retrieve blogs');
    return res.json();
  },

  async getAdminBlogById(id, token) {
    const res = await fetch(`${API_BASE}/admin/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Blog not found');
    return res.json();
  },

  async createAdminBlog(postData, token) {
    const res = await fetch(`${API_BASE}/admin/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(postData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create blog');
    return data;
  },

  async updateAdminBlog(id, postData, token) {
    const res = await fetch(`${API_BASE}/admin/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(postData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update blog');
    return data;
  },

  async deleteAdminBlog(id, token) {
    const res = await fetch(`${API_BASE}/admin/blogs/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete blog');
    return data;
  },

  async togglePublishBlog(id, token) {
    const res = await fetch(`${API_BASE}/admin/blogs/${id}/publish`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update publication status');
    return data;
  },

  async subscribeNewsletter(email) {
    const res = await fetch(`${API_BASE}/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Subscription failed');
    return data;
  },

  // ================= ENQUIRIES API =================
  async submitEnquiry(enquiryData) {
    const res = await fetch(`${API_BASE}/public/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiryData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to submit enquiry');
    return data;
  },

  async getAdminEnquiries(token) {
    const res = await fetch(`${API_BASE}/admin/enquiries`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch enquiries');
    return data;
  },

  async updateAdminEnquiryStatus(id, status, token) {
    const res = await fetch(`${API_BASE}/admin/enquiries/${id}/status`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update enquiry status');
    return data;
  },

  async deleteAdminEnquiry(id, token) {
    const res = await fetch(`${API_BASE}/admin/enquiries/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete enquiry');
    return data;
  }
};
