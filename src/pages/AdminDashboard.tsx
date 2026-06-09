import React, { useState, useEffect } from "react";
import { Users, FileText, Clipboard, HeartHandshake, ShieldAlert, Check, X, RefreshCw, BarChart3, ChevronRight, MessageSquare, Trash2, Edit2, Play, Eye, Compass, LayoutGrid, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AdminDashboardProps {
  onLogout?: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"metrics" | "leads" | "projects" | "blogs" | "telemetry">("metrics");
  const [loading, setLoading] = useState(true);

  // Administrative States
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  // Blog Editor states
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("Lead Generation");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogReadTime, setBlogReadTime] = useState("4 min read");
  const [blogImage, setBlogImage] = useState("");

  useEffect(() => {
    fetchAdminDatasets();
  }, []);

  // Helper function to get auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("aura_auth_token");
    return {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {})
    };
  };

  const fetchAdminDatasets = async () => {
    setLoading(true);
    let loadedLeads: any[] = [];
    let loadedProjects: any[] = [];
    let loadedBlogs: any[] = [];
    let loadedAnalytics: any[] = [];

    // Attempt to load from localStorage first for offline/Vercel recovery
    try {
      const savedLocalLeads = JSON.parse(localStorage.getItem("aura_local_leads") || "[]");
      const savedLocalInquiries = JSON.parse(localStorage.getItem("aura_local_inquiries") || "[]");
      // Map local inquiries to leads for unified views
      const inquiriesAsLeads = savedLocalInquiries.map((inq: any) => ({
        id: inq.id,
        name: inq.name,
        phone: inq.phone,
        email: inq.email,
        businessName: "Direct Inquiry",
        service: "General Consultation",
        budget: "Flexible",
        message: inq.message,
        timestamp: inq.timestamp,
        status: inq.replied ? "converted" : "new",
        isLocalBackup: true
      }));
      loadedLeads = [...savedLocalLeads, ...inquiriesAsLeads];
    } catch (e) {
      console.warn("Could not read local backup leads/inquiries:", e);
    }

    try {
      // 1. Fetch leads from server
      try {
        const leadsRes = await fetch("/api/admin/leads", {
          method: "GET",
          headers: getAuthHeaders()
        });
        const leadsData = await leadsRes.json();
        if (leadsData.leads) {
          // De-duplicate any items if they exist
          const apiLeads = leadsData.leads;
          const apiLeadIds = new Set(apiLeads.map((l: any) => l.id));
          const filteredLocal = loadedLeads.filter(l => !apiLeadIds.has(l.id));
          loadedLeads = [...filteredLocal, ...apiLeads];
        }
      } catch (err) {
        console.warn("Could not fetch database leads from API, using client local backups:", err);
      }
      
      // Sort leads by timestamp descending
      loadedLeads.sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setLeads(loadedLeads);

      // 2. Fetch projects
      try {
        const projRes = await fetch("/api/admin/projects", {
          method: "GET",
          headers: getAuthHeaders()
        });
        const projData = await projRes.json();
        if (projData.projects) loadedProjects = projData.projects;
      } catch (err) {
        console.warn("Could not fetch database projects from API:", err);
      }
      setProjects(loadedProjects);

      // 3. Fetch blogs
      try {
        const blogsRes = await fetch("/api/blogs", {
          method: "GET",
          headers: getAuthHeaders()
        });
        const blogsData = await blogsRes.json();
        if (blogsData.blogs) loadedBlogs = blogsData.blogs;
      } catch (err) {
        console.warn("Could not fetch blogs from API:", err);
      }
      setBlogs(loadedBlogs);

      // 4. Fetch telemetry analytics
      try {
        const telemetryRes = await fetch("/api/analytics/summary", {
          method: "GET",
          headers: getAuthHeaders()
        });
        const telemetryData = await telemetryRes.json();
        if (telemetryData.analytics) loadedAnalytics = telemetryData.analytics;
      } catch (err) {
        console.warn("Could not fetch telemetry records from API:", err);
      }
      setAnalytics(loadedAnalytics);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 1. Leads Controllers
  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to dismiss this lead?")) return;
    
    const isLocalLead = id.startsWith("lead-local-");
    const isLocalInquiry = id.startsWith("inq-local-") || id.startsWith("fallback-");

    if (isLocalLead || isLocalInquiry) {
      try {
        if (isLocalLead) {
          const localLeads = JSON.parse(localStorage.getItem("aura_local_leads") || "[]");
          const filtered = localLeads.filter((l: any) => l.id !== id);
          localStorage.setItem("aura_local_leads", JSON.stringify(filtered));
        } else {
          const localInquiries = JSON.parse(localStorage.getItem("aura_local_inquiries") || "[]");
          const filtered = localInquiries.filter((l: any) => l.id !== id);
          localStorage.setItem("aura_local_inquiries", JSON.stringify(filtered));
        }
        setLeads(leads.filter((l) => l.id !== id));
        return;
      } catch (err) {
        console.error("Error deleting local backup lead:", err);
      }
    }

    try {
      const res = await fetch("/api/admin/leads/delete", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        setLeads(leads.filter((l) => l.id !== id));
      } else {
        setLeads(leads.filter((l) => l.id !== id));
      }
    } catch (err) {
      console.error(err);
      setLeads(leads.filter((l) => l.id !== id));
    }
  };

  // 2. Projects milestones selectors controllers
  const handleUpdateMilestone = async (id: string, progress: number, status: string) => {
    try {
      const res = await fetch("/api/admin/projects/update", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ id, progress, status })
      });
      if (res.ok) {
        alert("Milestone parameters refreshed inside active project archives.");
        await fetchAdminDatasets();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 3. Blog post builder controllers
  const handleSaveBlogPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle.trim() || !blogExcerpt.trim() || !blogContent.trim()) {
      alert("Designated titles, content body blocks copy required.");
      return;
    }

    const payload = {
      id: editingBlog ? editingBlog.id : `blog-${Date.now()}`,
      title: blogTitle,
      category: blogCategory,
      excerpt: blogExcerpt,
      content: blogContent,
      readTime: blogReadTime,
      image: blogImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
      publishedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      author: "Sawan Sharma, Founder & Lead Architect"
    };

    try {
      const URL = editingBlog ? "/api/admin/blogs/edit" : "/api/admin/blogs/add";
      const response = await fetch(URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        alert("Growth Insights Database indexes compiled successfully.");
        setShowBlogForm(false);
        setEditingBlog(null);
        await fetchAdminDatasets();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const initBlogForm = (blog: any | null = null) => {
    if (blog) {
      setEditingBlog(blog);
      setBlogTitle(blog.title);
      setBlogCategory(blog.category);
      setBlogExcerpt(blog.excerpt);
      setBlogContent(blog.content);
      setBlogReadTime(blog.readTime);
      setBlogImage(blog.image);
    } else {
      setEditingBlog(null);
      setBlogTitle("");
      setBlogCategory("Lead Generation");
      setBlogExcerpt("");
      setBlogContent("");
      setBlogReadTime("4 min read");
      setBlogImage("");
    }
    setShowBlogForm(true);
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to purge this growth article?")) return;
    try {
      const res = await fetch("/api/admin/blogs/delete", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        setBlogs(blogs.filter((b) => b.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalPageViews = analytics.length;
  const uniqueIpMap = new Set(analytics.map((a) => a.ip));
  const uniqueVisitors = uniqueIpMap.size;

  return (
    <div className="bg-slate-50 font-sans min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Hub Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          
          <div className="space-y-1 relative z-10">
            <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Compass size={12} /> APEX CORE SECURITY CONTROLLERS
            </span>
            <h1 className="font-display font-black text-2xl tracking-tight text-white leading-none">
              Agency Master Operations Panel
            </h1>
            <p className="text-slate-400 text-xs">Verify generated inbounds leads, coordinate client milestones, structure SEO posts, and review IP telemetry logs.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 relative z-10 w-full sm:w-auto">
            <button
              id="admin-refresh-btn"
              onClick={fetchAdminDatasets}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw size={12} className={loading ? "animate-spin" : ""} /> Refresh Systems Channels
            </button>

            {onLogout && (
              <button
                id="admin-logout-btn"
                onClick={onLogout}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-red-950/40 hover:bg-red-900/50 text-red-200 border border-red-900/30 hover:border-red-800/40 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogOut size={12} /> Exit Panel (Sign Out)
              </button>
            )}
          </div>
        </div>

        {/* Categories navigation tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-white border border-slate-100 p-2.5 rounded-2xl shadow-sm">
          {[
            { id: "metrics", label: "Overview Metrics", icon: <BarChart3 size={14} /> },
            { id: "leads", label: `Leads Vault (${leads.length})`, icon: <Clipboard size={14} /> },
            { id: "projects", label: `Clients Progress (${projects.length})`, icon: <Users size={14} /> },
            { id: "blogs", label: `Insights Editor (${blogs.length})`, icon: <FileText size={14} /> },
            { id: "telemetry", label: `Uptime Telemetry (${analytics.length})`, icon: <ShieldAlert size={14} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              id={`admin-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer uppercase ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Interactive panels space */}
        {loading ? (
          <div className="bg-white border border-slate-100 rounded-3xl p-20 flex justify-center items-center shadow-sm">
            <RefreshCw className="animate-spin text-indigo-600" size={32} />
          </div>
        ) : (
          <div className="min-h-[450px]">
            <AnimatePresence mode="wait">
              
              {/* Tab 1: METRICS AND ANALYTICS */}
              {activeTab === "metrics" && (
                <motion.div
                  key="metrics"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                      <span className="text-[10px] text-slate-400 font-mono block">TOTAL INBOUND LEADS INDEXED</span>
                      <span className="text-3xl font-extrabold text-slate-950 block mt-1">{leads.length}</span>
                      <p className="text-[10px] text-emerald-600 font-semibold uppercase font-mono mt-1">● ACTIVE DIRECT DEPLOY</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                      <span className="text-[10px] text-slate-400 font-mono block">SECURED PIPELINE PROJECTS</span>
                      <span className="text-3xl font-extrabold text-slate-950 block mt-1">{projects.length}</span>
                      <p className="text-[10px] text-[#06B6D4] font-semibold uppercase font-mono mt-1">● WORK IN PROGRESS</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                      <span className="text-[10px] text-slate-400 font-mono block">TOTAL PAGE VIEWS LOGGED</span>
                      <span className="text-3xl font-extrabold text-slate-950 block mt-1">{totalPageViews}</span>
                      <p className="text-[10px] text-slate-400 font-mono block mt-1">Uptime telemetry tracing</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                      <span className="text-[10px] text-slate-400 font-mono block">UNIQUE IP VISITORS CONSTRAINTS</span>
                      <span className="text-3xl font-extrabold text-slate-950 block mt-1">{uniqueVisitors}</span>
                      <p className="text-[10px] text-slate-400 font-mono block mt-1">Geographic coordinates logs</p>
                    </div>
                  </div>

                  {/* Operational Guides Box */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-display font-extrabold text-lg text-slate-990 flex items-center gap-2">
                       Aesthetic Compliance Guidelines
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed text-justify">
                      Ensure every project deliverable satisfies the design philosophy guidelines. Never append unrequested debug features, terminal loops lines, or fake telemetry credentials lines inside public panels (to avoid looking like low-quality AI output). Make pure, clean layouts.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Tab 2: LEADS TABLE VIEW */}
              {activeTab === "leads" && (
                <motion.div
                  key="leads"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4"
                >
                  <h3 className="font-display font-extrabold text-lg text-slate-950">Inbound Leads Registered</h3>
                  
                  {leads.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-slate-100 text-slate-400 font-mono text-[10px] uppercase">
                            <th className="py-3 px-4">Contact Profile</th>
                            <th className="py-3 px-4">Business Details</th>
                            <th className="py-3 px-4">Service & Budget</th>
                            <th className="py-3 px-4">Captured Message</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                          {leads.map((l) => (
                            <tr key={l.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-3.5 px-4">
                                <p className="font-bold text-slate-950">{l.name}</p>
                                <span className="text-[10px] text-slate-400 block font-mono">{l.email} | {l.phone}</span>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="font-bold text-slate-950">{l.businessName}</span>
                              </td>
                              <td className="py-3.5 px-4 text-xs font-semibold">
                                <span className="text-violet-600 block">{l.service}</span>
                                <span className="text-slate-400 block">{l.budget}</span>
                              </td>
                              <td className="py-3.5 px-4 max-w-[200px] truncate">
                                <p className="truncate text-slate-500 whitespace-pre-wrap">{l.message || "No spec notes."}</p>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <button
                                  id={`delete-lead-${l.id}`}
                                  onClick={() => handleDeleteLead(l.id)}
                                  className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                  title="Dismiss Lead Profile"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 text-center py-10">No leads registered matching coordinates.</p>
                  )}
                </motion.div>
              )}

              {/* Tab 3: CLIENT PROJECTS MILESTONES UPDATES */}
              {activeTab === "projects" && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4"
                >
                  <h3 className="font-display font-extrabold text-lg text-slate-950">Milestone Phase Controllers</h3>

                  {projects.length > 0 ? (
                    <div className="space-y-4">
                      {projects.map((p) => (
                        <div key={p.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
                          <div className="space-y-0.5">
                            <h4 className="font-extrabold text-slate-950 text-sm">{p.title}</h4>
                            <p className="text-[10px] text-slate-400 font-mono block">Client: {p.userName} ({p.userEmail})</p>
                            <span className="text-[9px] bg-slate-200 border text-slate-600 px-2.5 py-0.5 rounded font-mono uppercase font-bold inline-block mt-1">
                              PROG: {p.progress}% • STATUS: {p.status}
                            </span>
                          </div>

                          {/* Quick Actions Milestones dials buttons */}
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              id={`proj-set-design-${p.id}`}
                              onClick={() => handleUpdateMilestone(p.id, 40, "design")}
                              className="px-2.5 py-1 bg-white hover:bg-slate-250 border border-slate-200 text-slate-700 font-bold rounded text-[9px] uppercase cursor-pointer"
                            >
                              Set Design (40%)
                            </button>
                            <button
                              id={`proj-set-dev-${p.id}`}
                              onClick={() => handleUpdateMilestone(p.id, 70, "development")}
                              className="px-2.5 py-1 bg-white hover:bg-slate-250 border border-slate-200 text-slate-700 font-bold rounded text-[9px] uppercase cursor-pointer"
                            >
                              Set Develop (70%)
                            </button>
                            <button
                              id={`proj-set-rev-${p.id}`}
                              onClick={() => handleUpdateMilestone(p.id, 100, "review")}
                              className="px-2.5 py-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded text-[9px] uppercase cursor-pointer shadow"
                            >
                              Mark Completed (100%)
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 text-center py-10">No active matching projects.</p>
                  )}
                </motion.div>
              )}

              {/* Tab 4: BLOGS & GROWTH INSIGHTS CREATOR */}
              {activeTab === "blogs" && (
                <motion.div
                  key="blogs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
                    <h3 className="font-display font-extrabold text-base text-slate-900">Growth Insights Publishing Suite</h3>
                    <button
                      id="create-new-blog-post-btn"
                      onClick={() => initBlogForm(null)}
                      className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      Write New Insight Manual
                    </button>
                  </div>

                  {/* Blog Form Modal Drawer */}
                  <AnimatePresence>
                    {showBlogForm && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div onClick={() => {
                          setShowBlogForm(false);
                          setEditingBlog(null);
                        }} className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
                        
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-6 sm:p-8 relative z-10 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
                        >
                          <h3 className="font-display font-black text-xl text-slate-950 mb-4">
                            {editingBlog ? "Edit Growth Manual" : "Compose Insight Blueprint"}
                          </h3>

                          <form onSubmit={handleSaveBlogPost} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Article Title</label>
                                <input
                                  id="blog-form-title"
                                  type="text"
                                  required
                                  placeholder="e.g. 5 Local SEO Tweaks for Dentists"
                                  value={blogTitle}
                                  onChange={(e) => setBlogTitle(e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none transition-all placeholder-slate-400 text-slate-900"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Topic Category</label>
                                <select
                                  id="blog-form-category"
                                  value={blogCategory}
                                  onChange={(e) => setBlogCategory(e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 cursor-pointer"
                                >
                                  <option value="Lead Generation">Lead Generation</option>
                                  <option value="Local SEO">Local SEO</option>
                                  <option value="Business Automation">Business Automation</option>
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1 font-sans">Read Duration Estimated</label>
                                <input
                                  id="blog-form-readtime"
                                  type="text"
                                  required
                                  placeholder="e.g. 5 min read"
                                  value={blogReadTime}
                                  onChange={(e) => setBlogReadTime(e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 text-slate-900"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Banner Image URL</label>
                                <input
                                  id="blog-form-image"
                                  type="text"
                                  placeholder="https://images.unsplash.com/photo-..."
                                  value={blogImage}
                                  onChange={(e) => setBlogImage(e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 text-slate-900"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-slate-700 mb-1">Brief Excerpt</label>
                              <input
                                id="blog-form-excerpt"
                                type="text"
                                required
                                value={blogExcerpt}
                                onChange={(e) => setBlogExcerpt(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 text-slate-900"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-slate-700 mb-1">Main Article Content Body</label>
                              <textarea
                                id="blog-form-content"
                                rows={8}
                                required
                                placeholder="Write detailed growth recommendations. Use ## for headers, and listing lines starts with * values."
                                value={blogContent}
                                onChange={(e) => setBlogContent(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none transition-all resize-none text-slate-900"
                              />
                            </div>

                            <div className="flex gap-2 pt-2">
                              <button
                                id="blog-form-cancel"
                                type="button"
                                onClick={() => {
                                  setShowBlogForm(false);
                                  setEditingBlog(null);
                                }}
                                className="w-1/3 py-3 bg-slate-100 hover:bg-slate-200 text-slate-750 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                id="blog-form-submit"
                                type="submit"
                                className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                              >
                                Publish Manual
                              </button>
                            </div>
                          </form>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>

                  {/* List of active blogs handles */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                    {blogs.map((b) => (
                      <div key={b.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center text-xs">
                        <div>
                          <span className="text-[9px] font-mono text-indigo-600 block">{b.category} • {b.readTime}</span>
                          <h4 className="font-bold text-slate-950 mt-0.5">{b.title}</h4>
                        </div>
                        <div className="flex gap-2">
                          <button
                            id={`edit-blog-${b.id}`}
                            onClick={() => initBlogForm(b)}
                            className="text-slate-500 hover:text-slate-900 p-1.5 hover:bg-slate-200 rounded-lg transition-all"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            id={`delete-blog-${b.id}`}
                            onClick={() => handleDeleteBlog(b.id)}
                            className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Tab 5: SECURITY TELEMETRY LOGGER */}
              {activeTab === "telemetry" && (
                <motion.div
                  key="telemetry"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <h3 className="font-display font-extrabold text-lg text-slate-950">Security IP Telemetry</h3>
                      <p className="text-xs text-slate-400">Continuous logs of active coordinate sessions mapping page paths, browsers, and country origins.</p>
                    </div>
                  </div>

                  {analytics.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-mono text-[10px] text-slate-500 border-collapse">
                        <thead>
                          <tr className="border-b border-slate-100 text-slate-400 uppercase">
                            <th className="py-2 px-3">IP Coordinates</th>
                            <th className="py-2 px-3">Path Page</th>
                            <th className="py-2 px-3">Browser / AGENT</th>
                            <th className="py-2 px-3">Trace Stamp</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {analytics.map((log) => (
                            <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-2 px-3 font-semibold text-slate-900">{log.ip}</td>
                              <td className="py-2 px-3 text-violet-600">{log.path}</td>
                              <td className="py-2 px-3 truncate max-w-[200px]">{log.userAgent}</td>
                              <td className="py-2 px-3 text-slate-400">{new Date(log.timestamp).toLocaleTimeString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 text-center py-10">No active telemetry sessions logged.</p>
                  )}
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        )}

      </div>
    </div>
  );
}
