import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Search, 
  ArrowLeft, 
  FileText, 
  Tag, 
  Image as ImageIcon, 
  X,
  ExternalLink,
  Save,
  AlertCircle,
  Lock,
  LogOut,
  CheckCircle,
  Globe,
  Sparkles,
  Layers,
  Calendar,
  Clock,
  User,
  ShieldCheck,
  RefreshCw,
  Database,
  BookOpen,
  LayoutDashboard,
  MessageSquare,
  Mail,
  Phone,
  Building2,
  CheckCircle2,
  Filter,
  Check,
  Inbox,
  ChevronRight,
  IndianRupee
} from 'lucide-react';
import { api } from '../../lib/api';
import TipTapEditor from '../../components/admin/TipTapEditor';
import VibeSparkLogo from '../../components/common/VibeSparkLogo';

const CATEGORIES = [
  'SEO & Growth',
  'Web Development',
  'Marketing Strategy',
  'E-commerce & SaaS',
  'AI & Automation',
  'Cloud & Security'
];

export default function BlogCMS() {
  // Authentication State
  const [token, setToken] = useState(() => localStorage.getItem('vibespark_admin_token') || '');
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const stored = localStorage.getItem('vibespark_admin_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Dashboard Tab ('blogs' | 'enquiries')
  const [activeTab, setActiveTab] = useState('blogs');

  // Blog Management State
  const [blogs, setBlogs] = useState([]);
  const [stats, setStats] = useState({ total: 0, publishedCount: 0, draftCount: 0, totalViews: 0 });
  const [filter, setFilter] = useState('all'); // 'all' | 'published' | 'draft'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Enquiries Management State
  const [enquiries, setEnquiries] = useState([]);
  const [enquiryFilter, setEnquiryFilter] = useState('all'); // 'all' | 'new' | 'contacted' | 'resolved'
  const [enquirySearch, setEnquirySearch] = useState('');
  const [isEnquiriesLoading, setIsEnquiriesLoading] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [enquiryDeleteConfirmId, setEnquiryDeleteConfirmId] = useState(null);

  // Editor Modal / Drawer State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  // Confirmation Delete State
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const showNotification = (msg, type = 'success') => {
    setNotification({ text: msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Verify Auth on mount
  useEffect(() => {
    if (token) {
      api.getAdminMe(token)
        .then(res => {
          setAdminUser(res.admin);
          loadAdminBlogs(token);
          loadAdminEnquiries(token);
        })
        .catch(() => {
          handleLogout();
        });
    }
  }, [token]);

  const loadAdminBlogs = async (authToken = token) => {
    if (!authToken) return;
    setIsLoading(true);
    try {
      const data = await api.getAdminBlogs(authToken);
      setBlogs(data.blogs || []);
      setStats(data.stats || { total: 0, publishedCount: 0, draftCount: 0, totalViews: 0 });
    } catch (err) {
      showNotification('Failed to sync blogs from MySQL', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const loadAdminEnquiries = async (authToken = token) => {
    if (!authToken) return;
    setIsEnquiriesLoading(true);
    try {
      const data = await api.getAdminEnquiries(authToken);
      setEnquiries(data.enquiries || []);
    } catch (err) {
      console.error('Failed to sync enquiries from MySQL', err);
    } finally {
      setIsEnquiriesLoading(false);
    }
  };

  const handleUpdateEnquiryStatus = async (id, newStatus) => {
    try {
      await api.updateAdminEnquiryStatus(id, newStatus, token);
      showNotification(`Enquiry marked as "${newStatus}"`);
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry(prev => ({ ...prev, status: newStatus }));
      }
      loadAdminEnquiries();
    } catch (err) {
      showNotification(err.message || 'Failed to update status', 'error');
    }
  };

  const handleDeleteEnquiry = async (id) => {
    try {
      await api.deleteAdminEnquiry(id, token);
      showNotification('Enquiry deleted permanently from database');
      setEnquiryDeleteConfirmId(null);
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry(null);
      }
      loadAdminEnquiries();
    } catch (err) {
      showNotification(err.message || 'Failed to delete enquiry', 'error');
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const res = await api.adminLogin(loginEmail, loginPassword);
      setToken(res.token);
      setAdminUser(res.admin);
      localStorage.setItem('vibespark_admin_token', res.token);
      localStorage.setItem('vibespark_admin_user', JSON.stringify(res.admin));
      showNotification(`Welcome back, ${res.admin.name}`);
      loadAdminBlogs(res.token);
      loadAdminEnquiries(res.token);
    } catch (err) {
      setLoginError(err.message || 'Invalid admin credentials');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setToken('');
    setAdminUser(null);
    localStorage.removeItem('vibespark_admin_token');
    localStorage.removeItem('vibespark_admin_user');
    api.adminLogout().catch(() => {});
  };

  // Open Editor for New Post
  const handleCreateNew = () => {
    setEditingPost({
      id: '',
      title: '',
      subtitle: '',
      slug: '',
      category: 'Web Development',
      badge: 'Insights',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      imageAlt: '',
      summary: '',
      content: '<h2>1. Core Architectural Foundation</h2><p>Provide detailed breakdown of the technical implementation, benchmarks, and production outcomes...</p>',
      readTime: '5 min read',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      published: false,
      authorName: 'VibeSpark Team',
      authorRole: 'Editorial & Engineering Team',
      authorAvatar: '/vibespark-logo.png',
      seoTitle: '',
      metaDescription: '',
      focusKeyword: '',
      canonicalUrl: '',
      takeaways: [''],
      sections: [{ heading: '', content: '' }]
    });
    setIsEditorOpen(true);
  };

  // Open Editor for Existing Post
  const handleEdit = (post) => {
    setEditingPost({
      ...post,
      takeaways: post.takeaways?.length ? post.takeaways : [''],
      sections: post.sections?.length ? post.sections : [{ heading: '', content: '' }]
    });
    setIsEditorOpen(true);
  };

  // Toggle Publish / Draft directly from table
  const handleTogglePublish = async (post) => {
    try {
      const res = await api.togglePublishBlog(post.id, token);
      showNotification(
        res.post.published 
          ? `Published "${res.post.title}" to public website` 
          : `Reverted "${res.post.title}" to draft mode`
      );
      loadAdminBlogs();
    } catch (err) {
      showNotification(err.message, 'error');
    }
  };

  // Delete Blog Post
  const handleDelete = async (id) => {
    try {
      await api.deleteAdminBlog(id, token);
      showNotification('Article permanently deleted from database');
      setDeleteConfirmId(null);
      loadAdminBlogs();
    } catch (err) {
      showNotification(err.message, 'error');
    }
  };

  // Save Blog Post (Draft or Publish)
  const handleSave = async (publishStatus) => {
    if (!editingPost.title.trim()) {
      showNotification('Article title is mandatory', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        ...editingPost,
        published: publishStatus !== undefined ? publishStatus : editingPost.published,
        takeaways: editingPost.takeaways.filter(t => t.trim()),
        sections: editingPost.sections.filter(s => s.heading.trim() || s.content.trim())
      };

      if (editingPost.id) {
        await api.updateAdminBlog(editingPost.id, payload, token);
        showNotification(
          payload.published 
            ? `Successfully updated and published "${payload.title}"` 
            : `Saved draft for "${payload.title}"`
        );
      } else {
        await api.createAdminBlog(payload, token);
        showNotification(
          payload.published 
            ? `Successfully created and published "${payload.title}"` 
            : `Created new draft "${payload.title}"`
        );
      }

      setIsEditorOpen(false);
      setEditingPost(null);
      loadAdminBlogs();
    } catch (err) {
      showNotification(err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const generateSlugFromTitle = (title) => {
    return title
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  const filteredBlogs = blogs.filter(b => {
    const matchesStatus = 
      filter === 'all' ? true :
      filter === 'published' ? b.published :
      !b.published;

    const matchesCategory = 
      categoryFilter === 'all' ? true : b.category === categoryFilter;

    const query = searchTerm.toLowerCase();
    const matchesSearch = 
      !searchTerm.trim() ||
      b.title.toLowerCase().includes(query) ||
      (b.focusKeyword && b.focusKeyword.toLowerCase().includes(query)) ||
      (b.summary && b.summary.toLowerCase().includes(query));

    return matchesStatus && matchesCategory && matchesSearch;
  });

  const filteredEnquiries = enquiries.filter(enq => {
    const matchesStatus = 
      enquiryFilter === 'all' ? true : enq.status === enquiryFilter;

    const term = enquirySearch.toLowerCase().trim();
    const matchesSearch = 
      !term ||
      (enq.name && enq.name.toLowerCase().includes(term)) ||
      (enq.email && enq.email.toLowerCase().includes(term)) ||
      (enq.phone && enq.phone.toLowerCase().includes(term)) ||
      (enq.company && enq.company.toLowerCase().includes(term)) ||
      (enq.service && enq.service.toLowerCase().includes(term)) ||
      (enq.message && enq.message.toLowerCase().includes(term));

    return matchesStatus && matchesSearch;
  });

  // ==============================================================
  // 1. ADMIN LOGIN VIEW
  // ==============================================================
  if (!token) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 selection:bg-slate-700 font-sans">
        <div className="w-full max-w-md relative z-10">
          
          <div className="text-center mb-8 flex flex-col items-center">
            <VibeSparkLogo variant="dark" size="lg" className="mb-4 hover:scale-105 transition-transform" />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono uppercase tracking-wider text-slate-300">
              <Lock className="w-3 h-3 text-brand-orange" />
              <span>Editorial CMS & Leads Portal</span>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
            
            <div className="pb-4 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Single Verified Administrator</span>
              </span>
              <span>MySQL 8.0</span>
            </div>

            {loginError && (
              <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@vibespark.in"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-widest rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
              >
                {isLoggingIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Connecting to MySQL...</span>
                  </>
                ) : (
                  <span>Access CMS Dashboard →</span>
                )}
              </button>
            </form>

            <div className="pt-2 text-center">
              <Link 
                to="/" 
                className="text-xs font-mono text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Public Website</span>
              </Link>
            </div>

          </div>

          <p className="text-[11px] font-mono text-slate-500 text-center mt-6">
            MySQL vibespark_db • Environment Variable Protected
          </p>

        </div>
      </div>
    );
  }

  // ==============================================================
  // 2. MODERN DASHBOARD: BLACK SIDEBAR + WHITE DASHBOARD CANVAS
  // ==============================================================
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl bg-slate-900 text-white shadow-2xl text-xs font-medium animate-in fade-in slide-in-from-top-4">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{notification.text}</span>
          <button onClick={() => setNotification(null)} className="ml-2 text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ========================================================= */}
      {/* LEFT SIDEBAR: STRICTLY IN SLEEK BLACK / DARK ZINC        */}
      {/* ========================================================= */}
      <aside className="w-64 bg-zinc-950 text-white shrink-0 flex flex-col justify-between border-r border-zinc-800/80 min-h-screen sticky top-0">
        
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-zinc-800/80 flex items-center justify-between">
            <VibeSparkLogo variant="dark" size="sm" showTagline={false} />
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-brand-orange">
              CMS
            </span>
          </div>

          {/* Navigation Items - STRICTLY TWO SETTINGS: BLOG ARTICLES & ENQUIRIES */}
          <div className="p-4 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 px-3 block mb-2">
              Management
            </span>
            
            <button
              type="button"
              onClick={() => setActiveTab('blogs')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-colors shadow-sm text-left ${
                activeTab === 'blogs'
                  ? 'bg-white text-black'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className={`w-4 h-4 ${activeTab === 'blogs' ? 'text-black' : 'text-zinc-400'}`} />
                <span>Blog Articles</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                activeTab === 'blogs' ? 'bg-zinc-100 text-zinc-800 font-bold' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {blogs.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('enquiries');
                loadAdminEnquiries();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-colors shadow-sm text-left ${
                activeTab === 'enquiries'
                  ? 'bg-white text-black'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className={`w-4 h-4 ${activeTab === 'enquiries' ? 'text-black' : 'text-zinc-400'}`} />
                <span>Enquiries</span>
              </div>
              {enquiries.filter(e => e.status === 'new').length > 0 ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-black animate-pulse">
                  {enquiries.filter(e => e.status === 'new').length} NEW
                </span>
              ) : (
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  activeTab === 'enquiries' ? 'bg-zinc-100 text-zinc-800 font-bold' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {enquiries.length}
                </span>
              )}
            </button>
          </div>

          {/* Database Connection Status Card */}
          <div className="mx-4 mt-6 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>MySQL Database</span>
            </div>
            <p className="text-[11px] font-mono text-zinc-400">
              vibespark_db (Port 3306)
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Prisma ORM Active</span>
            </div>
          </div>
        </div>

        {/* Bottom of Sidebar: Live Website option directly ABOVE admin logout */}
        <div className="p-4 border-t border-zinc-800/80 space-y-3">
          
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-zinc-300 hover:text-white bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 text-xs font-semibold transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-emerald-400 group-hover:rotate-45 transition-transform" />
              <span>Live Website</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
          </Link>

          {/* Admin Profile & Logout */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/60">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-white shrink-0">
                {adminUser?.name ? adminUser.name.charAt(0) : 'A'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">
                  {adminUser?.name || 'Administrator'}
                </p>
                <p className="text-[10px] font-mono text-zinc-400 truncate">
                  {adminUser?.email || 'admin@vibespark.in'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors shrink-0"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* ========================================================= */}
      {/* RIGHT MAIN DASHBOARD CANVAS: CLEAN CRISP WHITE CANVAS     */}
      {/* ========================================================= */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        
        {/* ========================================================= */}
        {/* VIEW 1: BLOG ARTICLES MANAGEMENT                         */}
        {/* ========================================================= */}
        {activeTab === 'blogs' && (
          <>
            {/* Top Header Bar */}
            <header className="bg-white border-b border-slate-200 px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-30 shadow-sm">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Publication Management
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Create, curate, edit, and publish verified technical articles directly to MySQL
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => loadAdminBlogs()}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
              title="Refresh from MySQL"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <button
              type="button"
              onClick={handleCreateNew}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Create Article</span>
            </button>
          </div>
        </header>

        {/* Dashboard Content Container */}
        <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
          
          {/* Summary Metric Cards (Crisp White with High-Contrast Typography) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Total Articles
              </span>
              <p className="text-3xl font-black text-slate-900">{stats.total}</p>
              <span className="text-[11px] text-slate-500">All Database Records</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Live Published
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <p className="text-3xl font-black text-slate-900">{stats.publishedCount}</p>
              <span className="text-[11px] text-emerald-600 font-medium">Visible to public</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Draft Workspaces
              </span>
              <p className="text-3xl font-black text-slate-900">{stats.draftCount}</p>
              <span className="text-[11px] text-amber-600 font-medium">Hidden from visitors</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Total Readership
              </span>
              <p className="text-3xl font-black text-slate-900">{stats.totalViews}</p>
              <span className="text-[11px] text-slate-500">Verified view events</span>
            </div>

          </div>

          {/* Filter & Search Toolbar */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Status Pills */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200/80 w-full sm:w-auto">
              <button
                onClick={() => setFilter('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filter === 'all'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({stats.total})
              </button>
              <button
                onClick={() => setFilter('published')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filter === 'published'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Published ({stats.publishedCount})
              </button>
              <button
                onClick={() => setFilter('draft')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filter === 'draft'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Drafts ({stats.draftCount})
              </button>
            </div>

            {/* Search Input & Category Dropdown */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search articles or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-slate-900 focus:bg-white"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Clean White Table */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                
                <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3.5 px-6">Article & Slug</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4 text-center">Views</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredBlogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400 font-mono">
                        No blog records found matching current query.
                      </td>
                    </tr>
                  ) : (
                    filteredBlogs.map((post) => (
                      <tr key={post.id} className="hover:bg-slate-50/80 transition-colors">
                        
                        {/* Title & Slug */}
                        <td className="py-4 px-6 max-w-md">
                          <div className="flex items-center gap-3">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0 bg-slate-100"
                            />
                            <div>
                              <p className="font-bold text-slate-900 text-sm line-clamp-1">
                                {post.title}
                              </p>
                              <p className="font-mono text-[11px] text-slate-400 line-clamp-1">
                                /blog/{post.slug}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-4">
                          <span className="font-semibold text-[11px] px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                            {post.category}
                          </span>
                        </td>

                        {/* Status Toggle */}
                        <td className="py-4 px-4">
                          <button
                            type="button"
                            onClick={() => handleTogglePublish(post)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                              post.published
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                                : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                            }`}
                            title="Click to toggle publication"
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${post.published ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                            <span>{post.published ? 'Published' : 'Draft'}</span>
                          </button>
                        </td>

                        {/* Date */}
                        <td className="py-4 px-4 text-slate-500">
                          {post.date || 'Recent'}
                        </td>

                        {/* Views */}
                        <td className="py-4 px-4 font-mono text-center font-semibold text-slate-800">
                          {post.views || 0}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right">
                          <div className="inline-flex items-center gap-2">
                            
                            <Link
                              to={`/blog/${post.slug}`}
                              target="_blank"
                              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                              title="Preview Public Page"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </Link>

                            <button
                              type="button"
                              onClick={() => handleEdit(post)}
                              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                              title="Edit Article & SEO"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            {deleteConfirmId === post.id ? (
                              <div className="inline-flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => handleDelete(post.id)}
                                  className="px-2 py-1 rounded bg-rose-600 text-white text-[10px] font-bold"
                                >
                                  Confirm
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeleteConfirmId(null)}
                                  className="px-1.5 py-1 text-slate-400 hover:text-slate-700 text-[10px]"
                                >
                                  ✕
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setDeleteConfirmId(post.id)}
                                className="p-2 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                                title="Delete Article"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}

                          </div>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>

              </table>
            </div>

          </div>

        </div>
      </>
    )}

    {/* ===================================================== */}
      {/* VIEW 2: CLIENT ENQUIRIES MANAGEMENT                   */}
      {/* ===================================================== */}
      {activeTab === 'enquiries' && (
        <>
          {/* Top Header Bar */}
          <header className="bg-white border-b border-slate-200 px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-30 shadow-sm">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                <span>Client Enquiries</span>
                {enquiries.filter(e => e.status === 'new').length > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 animate-pulse">
                    {enquiries.filter(e => e.status === 'new').length} New Leads
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Direct project submissions from website contact forms, synced strictly to MySQL
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => loadAdminEnquiries()}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors flex items-center gap-2 text-xs font-semibold"
                title="Refresh from MySQL"
              >
                <RefreshCw className={`w-4 h-4 ${isEnquiriesLoading ? 'animate-spin' : ''}`} />
                <span>Refresh Enquiries</span>
              </button>
            </div>
          </header>

          {/* Dashboard Content Container */}
          <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
            
            {/* Summary Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Total Inquiries
                </span>
                <p className="text-3xl font-black text-slate-900">{enquiries.length}</p>
                <span className="text-[11px] text-slate-500">All Database Records</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    New Leads
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <p className="text-3xl font-black text-emerald-600">
                  {enquiries.filter(e => e.status === 'new').length}
                </p>
                <span className="text-[11px] text-emerald-600 font-medium">Awaiting First Response</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Contacted
                </span>
                <p className="text-3xl font-black text-blue-600">
                  {enquiries.filter(e => e.status === 'contacted').length}
                </p>
                <span className="text-[11px] text-blue-600 font-medium">In Discussion / Scoping</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Resolved / Closed
                </span>
                <p className="text-3xl font-black text-slate-700">
                  {enquiries.filter(e => e.status === 'resolved').length}
                </p>
                <span className="text-[11px] text-slate-500 font-medium">Completed Discussions</span>
              </div>

            </div>

            {/* Filter & Search Toolbar */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Status Filter Pills */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200/80 w-full sm:w-auto overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setEnquiryFilter('all')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    enquiryFilter === 'all'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All ({enquiries.length})
                </button>
                <button
                  type="button"
                  onClick={() => setEnquiryFilter('new')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    enquiryFilter === 'new'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  New ({enquiries.filter(e => e.status === 'new').length})
                </button>
                <button
                  type="button"
                  onClick={() => setEnquiryFilter('contacted')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    enquiryFilter === 'contacted'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Contacted ({enquiries.filter(e => e.status === 'contacted').length})
                </button>
                <button
                  type="button"
                  onClick={() => setEnquiryFilter('resolved')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    enquiryFilter === 'resolved'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Resolved ({enquiries.filter(e => e.status === 'resolved').length})
                </button>
              </div>

              {/* Search Input */}
              <div className="relative w-full sm:w-80">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by client, company, email, phone..."
                  value={enquirySearch}
                  onChange={(e) => setEnquirySearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
                />
              </div>

            </div>

            {/* Enquiries Data Table */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[11px] tracking-wider">
                      <th className="py-4 px-6">Client / Company</th>
                      <th className="py-4 px-6">Direct Contact</th>
                      <th className="py-4 px-6">Service Requested</th>
                      <th className="py-4 px-6">Budget (INR)</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6">Date</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEnquiries.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="py-12 text-center text-slate-400">
                          <Inbox className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm font-semibold text-slate-600">No enquiries found</p>
                          <p className="text-xs text-slate-400 mt-1">
                            {enquiries.length === 0 
                              ? 'Client contact form submissions from /contact will appear here automatically.' 
                              : 'No inquiries match your current search/filter criteria.'}
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredEnquiries.map((enq) => (
                        <tr key={enq.id} className="hover:bg-slate-50/80 transition-colors">
                          {/* Client / Company */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 font-bold flex items-center justify-center text-xs shrink-0 border border-orange-200">
                                {enq.name ? enq.name.charAt(0).toUpperCase() : 'C'}
                              </div>
                              <div className="min-w-0">
                                <p className="font-bold text-slate-900 text-sm">{enq.name || 'Anonymous'}</p>
                                {enq.company ? (
                                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                                    <Building2 className="w-3 h-3 text-slate-400" />
                                    <span>{enq.company}</span>
                                  </p>
                                ) : (
                                  <span className="text-[10px] text-slate-400">Individual Client</span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Direct Contact */}
                          <td className="py-4 px-6">
                            <div className="space-y-1">
                              {enq.email && (
                                <a 
                                  href={`mailto:${enq.email}`}
                                  className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-orange-600 font-medium transition-colors"
                                >
                                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                  <span>{enq.email}</span>
                                </a>
                              )}
                              {enq.phone && (
                                <a 
                                  href={`tel:${enq.phone}`}
                                  className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-orange-600 font-medium transition-colors"
                                >
                                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                  <span>{enq.phone}</span>
                                </a>
                              )}
                            </div>
                          </td>

                          {/* Service Requested */}
                          <td className="py-4 px-6">
                            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium text-[11px] border border-slate-200 inline-block">
                              {enq.service || 'General Consultation'}
                            </span>
                          </td>

                          {/* Budget */}
                          <td className="py-4 px-6">
                            <span className="font-semibold text-slate-900 text-xs">
                              {enq.budget || 'Custom INR'}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="py-4 px-6">
                            <div className="relative inline-block">
                              <select
                                value={enq.status || 'new'}
                                onChange={(e) => handleUpdateEnquiryStatus(enq.id, e.target.value)}
                                className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border appearance-none pr-6 cursor-pointer focus:outline-none transition-colors ${
                                  enq.status === 'contacted'
                                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                                    : enq.status === 'resolved'
                                    ? 'bg-slate-100 text-slate-700 border-slate-300'
                                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                }`}
                              >
                                <option value="new">● New Lead</option>
                                <option value="contacted">● Contacted</option>
                                <option value="resolved">● Resolved</option>
                              </select>
                              <span className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-[8px] text-slate-400">
                                ▼
                              </span>
                            </div>
                          </td>

                          {/* Date */}
                          <td className="py-4 px-6 text-slate-500 text-[11px] whitespace-nowrap">
                            {enq.createdAt 
                              ? new Date(enq.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                              : 'Recent'}
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-6 text-right">
                            <div className="inline-flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setSelectedEnquiry(enq)}
                                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                                title="View Full Enquiry Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              {enquiryDeleteConfirmId === enq.id ? (
                                <div className="inline-flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteEnquiry(enq.id)}
                                    className="px-2 py-1 rounded bg-rose-600 text-white text-[10px] font-bold"
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEnquiryDeleteConfirmId(null)}
                                    className="px-1.5 py-1 text-slate-400 hover:text-slate-700 text-[10px]"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setEnquiryDeleteConfirmId(enq.id)}
                                  className="p-2 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                                  title="Delete Enquiry"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </>
      )}

      </main>

      {/* ========================================================= */}
      {/* 3. CLEAN LIGHT MODAL FOR ARTICLE & SEO EDITOR             */}
      {/* ========================================================= */}
      {isEditorOpen && editingPost && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto p-4 sm:p-6 lg:p-8 flex justify-center">
          
          <div className="w-full max-w-5xl bg-white border border-slate-300 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl relative my-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-200">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {editingPost.id ? 'Edit Publication' : 'New Publication'}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {editingPost.title || 'Untitled Article'}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Primary Content (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Publication Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPost.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      setEditingPost(prev => ({
                        ...prev,
                        title: newTitle,
                        slug: prev.slug ? prev.slug : generateSlugFromTitle(newTitle),
                        seoTitle: prev.seoTitle ? prev.seoTitle : `${newTitle} | VibeSpark Technologies`
                      }));
                    }}
                    placeholder="e.g. How to Improve Your Google Ranking in 2025?"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-base font-bold placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors"
                  />
                </div>

                {/* Subtitle / Excerpt */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Subtitle / Summary Deck
                  </label>
                  <textarea
                    rows={2}
                    value={editingPost.subtitle}
                    onChange={(e) => setEditingPost(prev => ({ ...prev, subtitle: e.target.value }))}
                    placeholder="A concise one-paragraph summary of the article's core takeaway..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors"
                  />
                </div>

                {/* TipTap Rich Text Editor */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Article Rich-Text Body (TipTap Editor)
                    </label>
                    <span className="text-[11px] font-mono text-slate-400">HTML Storage</span>
                  </div>
                  <TipTapEditor
                    content={editingPost.content}
                    onChange={(html) => setEditingPost(prev => ({ ...prev, content: html }))}
                  />
                </div>

                {/* Executive Briefing Summary */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Executive Briefing Callout
                  </label>
                  <textarea
                    rows={3}
                    value={editingPost.summary}
                    onChange={(e) => setEditingPost(prev => ({ ...prev, summary: e.target.value }))}
                    placeholder="High-level technical brief displayed in the highlighted callout..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors"
                  />
                </div>

              </div>

              {/* Sidebar Metadata & SEO (4 cols) */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Publishing Controls */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <Save className="w-4 h-4 text-slate-900" />
                    <span>Publishing Controls</span>
                  </h3>

                  <div className="flex items-center justify-between text-xs text-slate-700">
                    <span>Current Status:</span>
                    <span className={`font-semibold uppercase text-[11px] px-2.5 py-0.5 rounded-full ${
                      editingPost.published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {editingPost.published ? 'Published' : 'Draft'}
                    </span>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={() => handleSave(true)}
                      className="w-full py-3 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Publish Live to Website</span>
                    </button>

                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={() => handleSave(false)}
                      className="w-full py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save as Draft</span>
                    </button>
                  </div>
                </div>

                {/* Taxonomy Attributes */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-xs">
                  <h3 className="font-bold uppercase tracking-wider text-slate-700">
                    Article Taxonomy
                  </h3>

                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">Category</label>
                    <select
                      value={editingPost.category}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:border-slate-900"
                    >
                      {CATEGORIES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">Read Time</label>
                    <input
                      type="text"
                      value={editingPost.readTime}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, readTime: e.target.value }))}
                      placeholder="e.g. 6 min read"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">Publication Date</label>
                    <input
                      type="text"
                      value={editingPost.date}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, date: e.target.value }))}
                      placeholder="e.g. 12 Sep 2025"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800"
                    />
                  </div>
                </div>

                {/* Featured Image & Alt */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                  <h3 className="font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Featured Image & Alt</span>
                  </h3>

                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">Image URL</label>
                    <input
                      type="url"
                      value={editingPost.image}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 text-[11px]"
                    />
                  </div>

                  {editingPost.image && (
                    <div className="rounded-lg overflow-hidden border border-slate-200 aspect-video bg-slate-200">
                      <img
                        src={editingPost.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">Image Alt Text (SEO)</label>
                    <input
                      type="text"
                      value={editingPost.imageAlt}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, imageAlt: e.target.value }))}
                      placeholder="Descriptive alt text for image search..."
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800"
                    />
                  </div>
                </div>

                {/* SEO Architecture Card */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <h3 className="font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" />
                      <span>Search Engine Optimization</span>
                    </h3>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                      <span>URL Slug *</span>
                      <button
                        type="button"
                        onClick={() => setEditingPost(prev => ({ ...prev, slug: generateSlugFromTitle(prev.title) }))}
                        className="text-slate-900 font-semibold hover:underline"
                      >
                        Auto-generate
                      </button>
                    </div>
                    <div className="flex items-center bg-white border border-slate-300 rounded-lg px-2.5">
                      <span className="text-slate-400 font-mono text-[11px]">/blog/</span>
                      <input
                        type="text"
                        required
                        value={editingPost.slug}
                        onChange={(e) => setEditingPost(prev => ({ ...prev, slug: generateSlugFromTitle(e.target.value) }))}
                        className="w-full py-2 bg-transparent text-slate-900 font-mono text-[11px] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                      <span>SEO Title Tag</span>
                      <span>{(editingPost.seoTitle || '').length} / 60</span>
                    </div>
                    <input
                      type="text"
                      value={editingPost.seoTitle}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, seoTitle: e.target.value }))}
                      placeholder="Title tag displayed in Google..."
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                      <span>Meta Description</span>
                      <span>{(editingPost.metaDescription || '').length} / 160</span>
                    </div>
                    <textarea
                      rows={3}
                      value={editingPost.metaDescription}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, metaDescription: e.target.value }))}
                      placeholder="Snippet shown under title in search results..."
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">Focus Keyword</label>
                    <input
                      type="text"
                      value={editingPost.focusKeyword}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, focusKeyword: e.target.value }))}
                      placeholder="e.g. Google ranking 2025"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">Canonical URL</label>
                    <input
                      type="url"
                      value={editingPost.canonicalUrl}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, canonicalUrl: e.target.value }))}
                      placeholder={`https://vibespark.in/blog/${editingPost.slug || 'slug'}`}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-[11px]"
                    />
                  </div>

                  {/* Google Search Snippet Preview */}
                  <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1 shadow-sm">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Google Snippet Preview</span>
                    <p className="text-xs text-emerald-700 font-mono line-clamp-1">https://vibespark.in › blog › {editingPost.slug || 'slug'}</p>
                    <p className="text-sm font-bold text-blue-700 line-clamp-1">{editingPost.seoTitle || editingPost.title || 'Page Title'}</p>
                    <p className="text-[11px] text-slate-600 line-clamp-2">{editingPost.metaDescription || editingPost.subtitle || 'Article meta description...'}</p>
                  </div>

                </div>

              </div>

            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-semibold uppercase tracking-wider transition-all"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isSaving}
                onClick={() => handleSave(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 border border-slate-300 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Draft</span>
              </button>

              <button
                type="button"
                disabled={isSaving}
                onClick={() => handleSave(true)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{editingPost.id ? 'Save & Publish' : 'Publish Article'}</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* 4. CLEAN LIGHT MODAL FOR CLIENT ENQUIRY DETAILS           */}
      {/* ========================================================= */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto p-4 sm:p-6 lg:p-8 flex justify-center items-center">
          <div className="w-full max-w-2xl bg-white border border-slate-300 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative my-auto animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md border border-orange-200">
                  Client Enquiry Details
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2">
                  {selectedEnquiry.name || 'Anonymous Client'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedEnquiry.company ? `Company: ${selectedEnquiry.company}` : 'Direct Individual Inquiry'} • Received on {selectedEnquiry.createdAt ? new Date(selectedEnquiry.createdAt).toLocaleString('en-GB') : 'Recently'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact & Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                  Email Address
                </span>
                <a 
                  href={`mailto:${selectedEnquiry.email}`}
                  className="text-xs font-bold text-slate-900 hover:text-orange-600 flex items-center gap-2 break-all transition-colors"
                >
                  <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>{selectedEnquiry.email || 'Not Provided'}</span>
                </a>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                  Phone Number
                </span>
                <a 
                  href={`tel:${selectedEnquiry.phone}`}
                  className="text-xs font-bold text-slate-900 hover:text-orange-600 flex items-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>{selectedEnquiry.phone || 'Not Provided'}</span>
                </a>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                  Service Requested
                </span>
                <p className="text-xs font-bold text-slate-900">
                  {selectedEnquiry.service || 'General Consultation'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                  Budget Range
                </span>
                <p className="text-xs font-bold text-slate-900">
                  {selectedEnquiry.budget || 'Custom INR'}
                </p>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
                Project Scope & Requirements
              </span>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed max-h-60 overflow-y-auto whitespace-pre-wrap font-sans">
                {selectedEnquiry.message || 'No project description provided.'}
              </div>
            </div>

            {/* Status & Actions Footer */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-slate-500 font-medium">Status:</span>
                <select
                  value={selectedEnquiry.status || 'new'}
                  onChange={(e) => handleUpdateEnquiryStatus(selectedEnquiry.id, e.target.value)}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 cursor-pointer"
                >
                  <option value="new">New Lead</option>
                  <option value="contacted">Contacted</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {selectedEnquiry.phone && (
                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Client</span>
                  </a>
                )}
                {selectedEnquiry.email && (
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Client</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
