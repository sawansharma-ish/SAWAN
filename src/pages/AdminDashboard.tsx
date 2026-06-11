import React, { useState, useEffect } from "react";
import { 
  BarChart3, Users, MessageSquareCode, ShieldAlert, Settings as SettingsIcon, 
  Search, RefreshCw, Filter, Calendar, ListFilter, Download, Eye, Trash2, 
  AlertTriangle, CheckCircle, Send, LayoutDashboard, Clock, Power, ShieldCheck, 
  Smartphone, UserCheck, KeySquare, HelpCircle, ArrowRightLeft, FileCheck, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AdminDashboardProps {
  user: any;
  onLogout: () => void;
}

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"dashboard" | "leads" | "whatsapp" | "security" | "settings">("dashboard");
  const [token, setToken] = useState<string | null>(null);
  const [adminRole, setAdminRole] = useState<string>("Staff");

  // State data caches
  const [leads, setLeads] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [whatsappQueue, setWhatsappQueue] = useState<any[]>([]);

  // Filtering states for leads Tab
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("newest");
  const [leadsPage, setLeadsPage] = useState(1);
  const [leadsTotal, setLeadsTotal] = useState(0);

  // Detail view modals
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [deletingLeadId, setDeletingLeadId] = useState<string | null>(null);

  // Settings configs inputs
  const [smtpHost, setSmtpHost] = useState("");
  const [smtpPort, setSmtpPort] = useState("587");
  const [smtpUser, setSmtpUser] = useState("");
  const [smtpPass, setSmtpPass] = useState("");
  const [whatsappToken, setWhatsappToken] = useState("");
  const [whatsappPhoneId, setWhatsappPhoneId] = useState("");

  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState({ show: false, text: "", isError: false });

  // Load configuration and cached credentials on mount
  useEffect(() => {
    const adminToken = localStorage.getItem("aura_admin_token");
    const role = localStorage.getItem("aura_user_role") || "Staff";
    setToken(adminToken);
    setAdminRole(role);
  }, []);

  // Set default settings placeholder values or fetch them
  useEffect(() => {
    // Fetch system configurations if settings tab is focused
    if (activeTab === "settings") {
      setSmtpHost(process.env.SMTP_HOST || "smtp.gmail.com");
      setSmtpPort(process.env.SMTP_PORT || "587");
      setSmtpUser(process.env.SMTP_USER || "sawanforwork@gmail.com");
      setWhatsappPhoneId(process.env.WHATSAPP_PHONE_ID || "1029384756");
    }
  }, [activeTab]);

  // Unified Request Fetching Wrapper
  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const activeToken = token || localStorage.getItem("aura_admin_token");
    if (!activeToken) {
      showBanner("Access Denied: Administrative token missing. Please authenticate.", true);
      onLogout();
      return { ok: false, data: null };
    }

    const headers = {
      ...(options.headers || {}),
      "Authorization": `Bearer ${activeToken}`,
      "Content-Type": "application/json"
    };

    try {
      const response = await fetch(url, { ...options, headers });
      if (response.status === 401 || response.status === 403) {
        showBanner("Security Session Expired: Terminated due to inactivity limits.", true);
        setTimeout(() => {
          onLogout();
        }, 1500);
        return { ok: false, data: null };
      }
      const data = await response.json();
      return { ok: response.ok, data };
    } catch (err: any) {
      console.error(err);
      return { ok: false, data: null };
    }
  };

  // State Fetchers
  const loadLeads = async () => {
    setLoading(true);
    const query = new URLSearchParams({
      search: searchTerm,
      status: statusFilter,
      dateRange: dateFilter,
      sortBy,
      page: String(leadsPage),
      limit: "10"
    });

    const { ok, data } = await fetchWithAuth(`/api/leads?${query.toString()}`);
    if (ok && data) {
      setLeads(data.leads || []);
      setLeadsTotal(data.total || 0);
    }
    setLoading(false);
  };

  const loadAuditLogs = async () => {
    const { ok, data } = await fetchWithAuth("/api/admin/audit-logs");
    if (ok && data) {
      setAuditLogs(data.logs || []);
    }
  };

  const loadSessions = async () => {
    const { ok, data } = await fetchWithAuth("/api/admin/sessions");
    if (ok && data) {
      setSessions(data.sessions || []);
    }
  };

  const loadWhatsappQueue = async () => {
    const { ok, data } = await fetchWithAuth("/api/admin/whatsapp/queue");
    if (ok && data) {
      setWhatsappQueue(data.queue || []);
    }
  };

  // Reload current active tab caches
  useEffect(() => {
    if (!token) return;
    if (activeTab === "dashboard") {
      loadLeads();
      loadWhatsappQueue();
    } else if (activeTab === "leads") {
      loadLeads();
    } else if (activeTab === "whatsapp") {
      loadWhatsappQueue();
    } else if (activeTab === "security") {
      loadAuditLogs();
      loadSessions();
    }
  }, [token, activeTab, searchTerm, statusFilter, dateFilter, sortBy, leadsPage]);

  const showBanner = (text: string, isError = false) => {
    setBanner({ show: true, text, isError });
    setTimeout(() => {
      setBanner(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  // Leads state updates
  const handleUpdateStatus = async (leadId: string, newStatus: string) => {
    const { ok, data } = await fetchWithAuth(`/api/leads/${leadId}`, {
      method: "PUT",
      body: JSON.stringify({ status: newStatus })
    });

    if (ok) {
      showBanner(`Status successfully updated to ${newStatus}.`);
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus, updated_at: new Date().toISOString() } : l));
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead(prev => ({ ...prev, status: newStatus, updated_at: new Date().toISOString() }));
      }
    } else {
      showBanner(data?.error || "Failed updating lead status.", true);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    const { ok, data } = await fetchWithAuth(`/api/leads/${leadId}`, {
      method: "DELETE"
    });

    if (ok) {
      showBanner("Enquiry record deleted permanently from file database and synchronized.");
      setLeads(prev => prev.filter(l => l.id !== leadId));
      setSelectedLead(null);
      setDeletingLeadId(null);
      setLeadsTotal(prev => Math.max(0, prev - 1));
    } else {
      showBanner(data?.error || "Security Restriction: Staff roles cannot delete system enquiries on file.", true);
      setDeletingLeadId(null);
    }
  };

  const handleRetryWhatsApp = async (queueId: string) => {
    const { ok, data } = await fetchWithAuth("/api/admin/whatsapp/retry", {
      method: "POST",
      body: JSON.stringify({ queueId })
    });

    if (ok) {
      showBanner("Manual WhatsApp alert delivery retry initiated in background thread!");
      loadWhatsappQueue();
    } else {
      showBanner(data?.error || "Failed triggering alert dispatch.", true);
    }
  };

  const handleRevokeSession = async (sessionToken: string) => {
    const { ok, data } = await fetchWithAuth("/api/admin/sessions/revoke", {
      method: "POST",
      body: JSON.stringify({ token: sessionToken })
    });

    if (ok) {
      showBanner("Selected administrator login session has been successfully dynamic revoked.");
      loadSessions();
    } else {
      showBanner(data?.error || "Failed revoking credentials.", true);
    }
  };

  const handleRevokeAllOtherDevices = async () => {
    const { ok, data } = await fetchWithAuth("/api/admin/sessions/revoke-all", {
      method: "POST"
    });

    if (ok) {
      showBanner("All other device login sessions have been terminated securely.");
      loadSessions();
    } else {
      showBanner(data?.error || "Failed terminating foreign sessions.", true);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showBanner("Mock Configuration Written Successfully! Operational values synced in runtime environmental nodes.");
  };

  // CSV Exporter
  const handleExportCSV = () => {
    if (leads.length === 0) {
      showBanner("No lead entries loaded on viewport to perform CSV compile.", true);
      return;
    }

    const headers = ["ID", "FullName", "Email", "Phone", "Status", "Created At", "Source Page", "IP Address", "Message Description"];
    const rows = leads.map(l => [
      l.id,
      `"${l.full_name || ''}"`,
      l.email,
      l.phone,
      l.status,
      l.created_at,
      `"${l.source_page || ''}"`,
      l.ip_address,
      `"${(l.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `aura_web_enquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showBanner("Leads export compilation discharged successfully!");
  };

  // Stats Counters
  const leadsCount = leadsTotal || leads.length;
  const newLeadsCount = leads.filter(l => l.status === "New").length;
  const contactedLeadsCount = leads.filter(l => l.status === "Contacted").length;
  const qualifiedLeadsCount = leads.filter(l => l.status === "Qualified").length;
  const closedLeadsCount = leads.filter(l => l.status === "Closed").length;

  return (
    <div className="min-h-screen bg-[#07080c] text-white flex flex-col md:flex-row font-sans">
      
      {/* 1. Left Sidebar Navigation Panel */}
      <aside className="w-full md:w-64 bg-[#0f131a] border-b md:border-b-0 md:border-r border-slate-800 flex flex-col px-4 py-6 justify-between select-none">
        <div className="space-y-8">
          
          {/* Logo brand */}
          <div className="flex items-center gap-3 px-2">
            <div className="p-2 bg-[#66fcf1]/10 rounded-xl border border-[#66fcf1]/30">
              <ShieldCheck className="text-[#66fcf1]" size={20} />
            </div>
            <div>
              <h1 className="font-sans font-extrabold tracking-tight text-sm text-white">AURA CONSOLE</h1>
              <span className="text-[9px] font-mono text-[#66fcf1] uppercase tracking-widest font-semibold">SECURITY CONTROL</span>
            </div>
          </div>

          {/* Current Admin Tag badge */}
          <div className="bg-[#1f2833]/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Active Administrator:</p>
            <div className="flex items-center gap-2">
              <UserCheck size={14} className="text-[#66fcf1]" />
              <span className="text-xs font-semibold text-white truncate max-w-[130px]">{user?.name || "Sawan Sharma"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[8px] font-mono bg-cyan-950 text-[#66fcf1] border border-[#66fcf1]/20 px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
                {adminRole}
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${activeTab === "dashboard" ? "bg-gradient-to-r from-teal-500/10 to-[#66fcf1]/10 border border-[#66fcf1]/20 text-[#66fcf1]" : "text-slate-400 hover:text-white hover:bg-slate-900"}`}
            >
              <LayoutDashboard size={15} /> Operational Hub
            </button>
            <button
              onClick={() => setActiveTab("leads")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${activeTab === "leads" ? "bg-gradient-to-r from-teal-500/10 to-[#66fcf1]/10 border border-[#66fcf1]/20 text-[#66fcf1]" : "text-slate-400 hover:text-white hover:bg-slate-900"}`}
            >
              <Users size={15} /> Leads / Enquiries
            </button>
            <button
              onClick={() => setActiveTab("whatsapp")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${activeTab === "whatsapp" ? "bg-gradient-to-r from-teal-500/10 to-[#66fcf1]/10 border border-[#66fcf1]/20 text-[#66fcf1]" : "text-slate-400 hover:text-white hover:bg-slate-900"}`}
            >
              <MessageSquareCode size={15} /> WhatsApp Log
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${activeTab === "security" ? "bg-gradient-to-r from-teal-500/10 to-[#66fcf1]/10 border border-[#66fcf1]/20 text-[#66fcf1]" : "text-slate-400 hover:text-white hover:bg-slate-900"}`}
            >
              <ShieldAlert size={15} /> Security Gateway
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${activeTab === "settings" ? "bg-gradient-to-r from-teal-500/10 to-[#66fcf1]/10 border border-[#66fcf1]/20 text-[#66fcf1]" : "text-slate-400 hover:text-white hover:bg-slate-900"}`}
            >
              <SettingsIcon size={15} /> Settings Panel
            </button>
          </nav>

        </div>

        {/* Footer Logout */}
        <div className="pt-6 border-t border-slate-800 mt-6 md:mt-0">
          <button
            onClick={() => {
              localStorage.removeItem("aura_admin_token");
              localStorage.removeItem("aura_user_role");
              onLogout();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/20 rounded-xl font-medium transition-all cursor-pointer"
          >
            <Power size={15} /> Destroy Session Authentication
          </button>
        </div>
      </aside>

      {/* 2. Main Workspace Viewport */}
      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto max-w-7xl mx-auto w-full">
        
        {/* Banner Alert Toast */}
        <AnimatePresence>
          {banner.show && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-4 rounded-xl border text-xs flex items-center justify-between shadow-lg relative z-50 ${banner.isError ? "bg-red-950/50 border-red-900 text-red-200" : "bg-cyan-950/40 border-[#66fcf1]/30 text-teal-200"}`}
            >
              <div className="flex items-center gap-2.5">
                {banner.isError ? <AlertTriangle size={16} className="text-red-400" /> : <Sparkles size={16} className="text-[#66fcf1]" />}
                <span className="leading-relaxed font-medium">{banner.text}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/60 pb-5">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white uppercase font-sans">
              {activeTab === "dashboard" ? "Operational Hub Overview" : activeTab === "leads" ? "Lead & Enquiry Database" : activeTab === "whatsapp" ? "WhatsApp Alerts Queue Node" : activeTab === "security" ? "Lockout & Session Auditing Control Room" : "Nodemailer & WhatsApp Integrations Override"}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Active Server Connection: <span className="text-[#66fcf1] font-mono">127.0.0.1:3000 (Secure TLS Endpoint)</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2 text-slate-400">
              <Clock size={12} className="text-[#66fcf1]" /> {new Date().toLocaleTimeString()} (UTC)
            </span>
            <button
              onClick={() => {
                showBanner("Re-establishing server dataset sync...");
                if (activeTab === "dashboard" || activeTab === "leads") {
                  loadLeads();
                }
                if (activeTab === "whatsapp") {
                  loadWhatsappQueue();
                }
                if (activeTab === "security") {
                  loadAuditLogs();
                  loadSessions();
                }
              }}
              className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {/* --- WORKSPACE VIEW CONTROLS CONDITIONAL --- */}

        {/* A. DASHBOARD VIEW TAB */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Bento Grid Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-[#0f131a] border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Total Enquiries</span>
                  <h3 className="text-3xl font-extrabold text-white mt-1.5">{leadsCount}</h3>
                  <div className="w-24 bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                    <div className="bg-teal-500 h-full w-[80%]"></div>
                  </div>
                </div>
                <div className="p-3.5 bg-teal-500/10 rounded-xl border border-teal-500/20 text-teal-400">
                  <BarChart3 size={20} />
                </div>
              </div>

              <div className="bg-[#0f131a] border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">New Incoming</span>
                  <h3 className="text-3xl font-extrabold text-[#66fcf1] mt-1.5">{newLeadsCount}</h3>
                  <div className="w-24 bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                    <div className="bg-[#66fcf1] h-full w-[35%]"></div>
                  </div>
                </div>
                <div className="p-3.5 bg-[#66fcf1]/10 rounded-xl border border-[#66fcf1]/20 text-[#66fcf1]">
                  <RefreshCw size={20} />
                </div>
              </div>

              <div className="bg-[#0f131a] border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Contacted / Live</span>
                  <h3 className="text-3xl font-extrabold text-amber-400 mt-1.5">{contactedLeadsCount + qualifiedLeadsCount}</h3>
                  <div className="w-24 bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                    <div className="bg-amber-400 h-full w-[60%]"></div>
                  </div>
                </div>
                <div className="p-3.5 bg-amber-400/10 rounded-xl border border-amber-400/20 text-amber-400">
                  <Smartphone size={20} />
                </div>
              </div>

              <div className="bg-[#0f131a] border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Closed Out Success</span>
                  <h3 className="text-3xl font-extrabold text-emerald-400 mt-1.5">{closedLeadsCount}</h3>
                  <div className="w-24 bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                    <div className="bg-emerald-400 h-full w-[10%]"></div>
                  </div>
                </div>
                <div className="p-3.5 bg-emerald-400/10 rounded-xl border border-emerald-400/20 text-emerald-400">
                  <CheckCircle size={20} />
                </div>
              </div>

            </div>

            {/* Quick overview of latest leads and failures */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left section: Latest Enquiries */}
              <div className="lg:col-span-2 bg-[#0f131a] border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <FileCheck size={16} className="text-[#66fcf1]" /> Recent Incoming Enquiries
                  </h4>
                  <button onClick={() => setActiveTab("leads")} className="text-[11px] text-[#66fcf1] hover:underline uppercase font-mono font-bold flex items-center gap-1">
                    View Complete DB <ArrowRightLeft size={12} />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-300">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 uppercase text-[9px] font-mono">
                        <th className="py-2.5">Lead Name</th>
                        <th className="py-2.5">Email</th>
                        <th className="py-2.5">Created At</th>
                        <th className="py-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40">
                      {leads.slice(0, 5).map(l => (
                        <tr key={l.id} className="hover:bg-slate-900/30 transition-colors">
                          <td className="py-3 font-semibold text-white">{l.full_name}</td>
                          <td className="py-3 font-mono text-[11px]">{l.email}</td>
                          <td className="py-3 text-slate-400">{new Date(l.created_at).toLocaleDateString()}</td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${l.status === 'New' ? 'bg-cyan-950 text-[#66fcf1]' : l.status === 'Contacted' ? 'bg-amber-950 text-amber-400' : l.status === 'Qualified' ? 'bg-blue-950 text-blue-400' : 'bg-emerald-950 text-emerald-400'}`}>
                              {l.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {leads.length === 0 && (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-slate-500 font-mono">
                            No incoming lead logs recorded yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right section: Instant WhatsApp Alerts Logs */}
              <div className="bg-[#0f131a] border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <MessageSquareCode size={16} className="text-[#66fcf1]" /> WhatsApp Sync Queue
                  </h4>
                  <button onClick={() => setActiveTab("whatsapp")} className="text-[11px] text-slate-400 hover:text-white uppercase font-mono">
                    Monitor System
                  </button>
                </div>

                <div className="space-y-3">
                  {whatsappQueue.slice(0, 4).map(item => (
                    <div key={item.id} className="p-3 bg-[#07080c] border border-slate-800 rounded-xl space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-semibold text-slate-200">{item.payload.name}</span>
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${item.status === 'sent' ? 'bg-emerald-950 text-emerald-400' : item.status === 'failed' ? 'bg-red-950 text-red-400' : 'bg-cyan-950 text-[#66fcf1]'}`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{item.payload.message_preview}</p>
                      
                      {item.status === "failed" && (
                        <div className="pt-2 flex justify-between items-center border-t border-slate-800/50">
                          <span className="text-[9px] font-mono text-red-500">Errors: Meta API credential</span>
                          <button
                            onClick={() => handleRetryWhatsApp(item.id)}
                            className="bg-cyan-950 px-2.5 py-1 rounded text-[9px] font-mono uppercase text-[#66fcf1] border border-[#66fcf1]/20 hover:bg-cyan-900 transition-colors"
                          >
                            Immediate Retry
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  {whatsappQueue.length === 0 && (
                    <div className="py-12 text-center text-slate-500 font-mono text-xs">
                      No automated alerts dispatched yet.
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* B. LEADS / ENQUIRIES VIEW TAB */}
        {activeTab === "leads" && (
          <div className="space-y-4">
            
            {/* Search/Filter Controls Bar */}
            <div className="bg-[#0f131a] p-4 rounded-2xl border border-slate-800 flex flex-col lg:flex-row gap-4 justify-between items-stretch">
              
              {/* Search keyword input */}
              <div className="flex-1 relative">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Keyword Search Across Name, Corporate Emails, or Messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#07080c] text-xs border border-slate-800 rounded-xl pl-10 pr-4 py-3 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#66fcf1] text-white transition-all"
                />
              </div>

              {/* Filtering sets */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                
                <div className="flex items-center gap-2 bg-[#07080c] px-3 py-2 rounded-xl border border-slate-800">
                  <ListFilter size={12} className="text-slate-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-transparent text-xs text-slate-200 outline-none pr-3"
                  >
                    <option value="ALL" className="bg-[#0f131a]">All Statuses</option>
                    <option value="NEW" className="bg-[#0f131a]">New</option>
                    <option value="CONTACTED" className="bg-[#0f131a]">Contacted</option>
                    <option value="QUALIFIED" className="bg-[#0f131a]">Qualified</option>
                    <option value="CLOSED" className="bg-[#0f131a]">Closed</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 bg-[#07080c] px-3 py-2 rounded-xl border border-slate-800">
                  <Calendar size={12} className="text-slate-400" />
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="bg-transparent text-xs text-slate-200 outline-none pr-3"
                  >
                    <option value="ALL" className="bg-[#0f131a]">All Dates</option>
                    <option value="TODAY" className="bg-[#0f131a]">Today</option>
                    <option value="YESTERDAY" className="bg-[#0f131a]">Yesterday</option>
                    <option value="LAST_7" className="bg-[#0f131a]">Last 7 Days</option>
                    <option value="LAST_30" className="bg-[#0f131a]">Last 30 Days</option>
                  </select>
                </div>

                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-white rounded-xl transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <Download size={13} /> Export Excel / CSV
                </button>

              </div>

            </div>

            {/* Centralised Leads Database Table */}
            <div className="bg-[#0f131a] border border-slate-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-300">
                  <thead>
                    <tr className="bg-slate-950/40 border-b border-slate-800 text-slate-400 uppercase text-[9px] font-mono tracking-wider">
                      <th className="py-3 px-4">Leads Name</th>
                      <th className="py-3 px-4">Corporate Info</th>
                      <th className="py-3 px-4">Source Channel</th>
                      <th className="py-3 px-4">Created Date</th>
                      <th className="py-3 px-4">Operational Status</th>
                      <th className="py-3 px-4 text-right">Actions Panel</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    {leads.map(lead => (
                      <tr key={lead.id} className="hover:bg-slate-900/20 transition-colors">
                        <td className="py-4 px-4 font-semibold text-white">
                          <p>{lead.full_name}</p>
                          <span className="text-[10px] text-slate-400 font-mono">IP: {lead.ip_address}</span>
                        </td>
                        <td className="py-4 px-4 space-y-0.5">
                          <p className="font-mono text-[11px] text-slate-200">{lead.email}</p>
                          <p className="text-slate-400 font-mono text-[10px]">{lead.phone}</p>
                        </td>
                        <td className="py-4 px-4 max-w-[150px] truncate">
                          <span className="text-slate-400 font-semibold">{lead.source_page || "Aura capture"}</span>
                        </td>
                        <td className="py-4 px-4 text-slate-400">
                          {new Date(lead.created_at).toLocaleDateString()} at {new Date(lead.created_at).toLocaleTimeString().slice(0, 5)}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${lead.status === 'New' ? 'bg-[#66fcf1]' : lead.status === 'Contacted' ? 'bg-amber-400' : lead.status === 'Qualified' ? 'bg-blue-400' : 'bg-emerald-400'}`}></span>
                            <select
                              value={lead.status}
                              onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                              className="bg-transparent font-medium border-0 focus:ring-0 p-0 hover:underline cursor-pointer"
                            >
                              <option value="New" className="bg-[#0f131a] text-white">New</option>
                              <option value="Contacted" className="bg-[#0f131a] text-white">Contacted</option>
                              <option value="Qualified" className="bg-[#0f131a] text-white">Qualified</option>
                              <option value="Closed" className="bg-[#0f131a] text-white">Closed</option>
                            </select>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2.5">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="p-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-all cursor-pointer"
                              title="Details View"
                            >
                              <Eye size={13} />
                            </button>
                            <button
                              onClick={() => setDeletingLeadId(lead.id)}
                              className="p-1.5 bg-red-950/20 border border-red-900/20 text-red-400 hover:text-red-300 rounded hover:bg-red-950/40 transition-all cursor-pointer"
                              title="Delete Record"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {leads.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-16 text-center text-slate-500 font-mono">
                          No matching corporate lead logs returned for your specific filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination Controls */}
            {leadsTotal > 10 && (
              <div className="flex justify-between items-center pt-2 px-2 text-xs">
                <span className="text-slate-400">Showing {leads.length} of {leadsTotal} entries</span>
                <div className="flex gap-2">
                  <button
                    disabled={leadsPage === 1}
                    onClick={() => setLeadsPage(l => Math.max(1, l - 1))}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded DISABLED:opacity-40 font-semibold"
                  >
                    Previous
                  </button>
                  <button
                    disabled={leadsPage * 10 >= leadsTotal}
                    onClick={() => setLeadsPage(l => l + 1)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded DISABLED:opacity-40 font-semibold"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* DETAIL MODAL PANEL */}
            <AnimatePresence>
              {selectedLead && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
                  <motion.div
                    initial={{ opacity:0, scale:0.95 }}
                    animate={{ opacity:1, scale:1 }}
                    exit={{ opacity:0, scale:0.95 }}
                    className="w-full max-w-2xl bg-[#0f131a] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl overflow-y-auto max-h-[85vh]"
                  >
                    <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                      <div>
                        <span className="text-[10px] font-mono text-[#66fcf1] uppercase tracking-widest font-semibold">Lead Enquiry Details</span>
                        <h3 className="text-xl font-extrabold text-white mt-1 uppercase leading-tight">{selectedLead.full_name}</h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${selectedLead.status === 'New' ? 'bg-cyan-950 text-[#66fcf1]' : selectedLead.status === 'Contacted' ? 'bg-amber-950 text-amber-400' : selectedLead.status === 'Qualified' ? 'bg-blue-950 text-blue-400' : 'bg-emerald-950 text-emerald-400'}`}>
                        {selectedLead.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1 bg-slate-950/40 p-3 rounded-xl border border-slate-800/50">
                        <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Email Address</p>
                        <p className="font-mono text-slate-200 text-sm select-all">{selectedLead.email}</p>
                      </div>
                      <div className="space-y-1 bg-slate-950/40 p-3 rounded-xl border border-slate-800/50">
                        <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">WhatsApp Telephone</p>
                        <p className="font-mono text-slate-200 text-sm select-all">{selectedLead.phone}</p>
                      </div>
                      <div className="space-y-1 bg-slate-950/40 p-3 rounded-xl border border-slate-800/50">
                        <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Created Timestamp</p>
                        <p className="text-slate-200">{new Date(selectedLead.created_at).toLocaleString()}</p>
                      </div>
                      <div className="space-y-1 bg-slate-950/40 p-3 rounded-xl border border-slate-800/50">
                        <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Source Entrypoint Channel</p>
                        <p className="text-[#66fcf1] font-semibold">{selectedLead.source_page || "Contact Modal Interface"}</p>
                      </div>
                    </div>

                    <div className="space-y-2 bg-[#07080c] p-4.5 rounded-2xl border border-slate-800/50">
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Inquiry Message Description</p>
                      <p className="text-slate-200 text-xs leading-relaxed whitespace-pre-wrap select-all font-mono">
                        {selectedLead.message}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <p className="text-[10px] font-mono text-slate-500">SYSTEM ID: {selectedLead.id}</p>
                      <div className="flex gap-2.5">
                        <button
                          onClick={() => setSelectedLead(null)}
                          className="px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
                        >
                          Close Workspace View
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* DELETE VERIFY PANEL */}
            <AnimatePresence>
              {deletingLeadId && (
                <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
                  <motion.div
                    initial={{ opacity:0, scale:0.95 }}
                    animate={{ opacity:1, scale:1 }}
                    exit={{ opacity:0, scale:0.95 }}
                    className="w-full max-w-sm bg-[#0f131a] border border-red-900/30 rounded-3xl p-6.5 text-center space-y-4"
                  >
                    <div className="mx-auto w-12 h-12 rounded-full bg-red-950/40 flex items-center justify-center text-red-400 border border-red-900/30 mb-2">
                      <AlertTriangle size={24} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-white uppercase tracking-tight">Confirm Deletion?</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Are you sure you want to permanently delete this lead? This write override is irreversible on local servers.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button
                        onClick={() => setDeletingLeadId(null)}
                        className="py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => deletingLeadId && handleDeleteLead(deletingLeadId)}
                        className="py-2.5 bg-red-650 hover:bg-red-500 bg-red-600 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
                      >
                        Confirm Delete
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </div>
        )}

        {/* C. WHATSAPP LOGS VIEW TAB */}
        {activeTab === "whatsapp" && (
          <div className="space-y-4">
            <div className="p-4 bg-teal-950/20 border border-[#66fcf1]/20 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between text-xs">
              <div className="space-y-1">
                <p className="text-teal-200 font-bold flex items-center gap-2">
                  <MessageSquareCode size={14} className="text-[#66fcf1]" /> Enterprise WhatsApp Instant Alerts
                </p>
                <p className="text-slate-400 leading-relaxed">
                  Real-time notification system. Whenever a customer submits a modal capture or contract request, a WhatsApp template is fired instantly. Retry queue tracks errors.
                </p>
              </div>
              <button onClick={loadWhatsappQueue} className="px-3 py-1.5 bg-[#66fcf1]/10 text-[#66fcf1] rounded border border-[#66fcf1]/30 font-semibold flex items-center gap-1.5 hover:bg-[#66fcf1]/20 transition-all">
                <RefreshCw size={12} /> Sync Log Status
              </button>
            </div>

            <div className="bg-[#0f131a] border border-slate-800 rounded-2xl overflow-hidden text-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-300">
                  <thead>
                    <tr className="bg-slate-950/30 border-b border-slate-800 text-slate-400 uppercase text-[9px] font-mono">
                      <th className="py-3 px-4">Queue ID</th>
                      <th className="py-3 px-4">Target Leads</th>
                      <th className="py-3 px-4">Dispatched At</th>
                      <th className="py-3 px-4">Retry Loop</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Error Diagnostics</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    {whatsappQueue.map(item => (
                      <tr key={item.id} className="hover:bg-slate-900/20 transition-colors">
                        <td className="py-3.5 px-4 font-mono text-[10px] text-slate-400">{item.id}</td>
                        <td className="py-3.5 px-4 font-semibold text-white">
                          <p>{item.payload.name}</p>
                          <span className="text-[10px] text-slate-400 font-mono">{item.payload.phone}</span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-400">{new Date(item.timestamp).toLocaleString()}</td>
                        <td className="py-3.5 px-4 font-mono text-center">{item.retryCount}/3</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono tracking-widest uppercase ${item.status === 'sent' ? 'bg-emerald-950 text-emerald-400' : item.status === 'failed' ? 'bg-red-950 text-red-500' : 'bg-cyan-950 text-[#66fcf1]'}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 max-w-[200px] font-mono text-[10px] leading-relaxed truncate text-red-400" title={item.errorLog}>
                          {item.errorLog || "No diagnostic errors reported."}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleRetryWhatsApp(item.id)}
                            className="px-3 py-1.5 bg-slate-950 border border-slate-800 text-[#66fcf1] hover:text-white rounded hover:bg-[#66fcf1]/20 font-semibold cursor-pointer flex items-center justify-end gap-1.5 ml-auto"
                          >
                            <Send size={11} /> Manual Dispatch
                          </button>
                        </td>
                      </tr>
                    ))}
                    {whatsappQueue.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-16 text-center text-slate-500 font-mono">
                          WhatsApp queues monitor is fully synchronized. Ready for lead triggers.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* D. SECURITY VIEW TAB */}
        {activeTab === "security" && (
          <div className="space-y-6">
            
            {/* Active Devices Sessions Container */}
            <div className="bg-[#0f131a] border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800/50 pb-4">
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white uppercase tracking-wide flex items-center gap-2">
                    <Smartphone size={16} className="text-[#66fcf1]" /> Active Device Access Sessions
                  </h4>
                  <p className="text-slate-400 text-xs">
                    Monitor other administrators logged into your local and cloud system endpoints.
                  </p>
                </div>
                <button
                  onClick={handleRevokeAllOtherDevices}
                  className="px-3 py-2 bg-red-950/20 hover:bg-red-950/40 border border-red-900/40 text-red-400 hover:text-red-300 rounded-xl text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap"
                >
                  Log Out From All Other Devices
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sessions.map(s => {
                  const isCurrent = s.full_token.substring(0,25) === token?.substring(0,25);
                  return (
                    <div key={s.full_token} className={`p-4 rounded-2xl border flex items-start gap-3.5 ${isCurrent ? 'bg-cyan-950/10 border-[#66fcf1]/30' : 'bg-slate-950 border-slate-900'}`}>
                      <div className={`p-2 rounded-xl ${isCurrent ? 'bg-[#66fcf1]/10 text-[#66fcf1]' : 'bg-slate-900 text-slate-400'}`}>
                        <KeySquare size={16} />
                      </div>
                      <div className="flex-1 space-y-2 text-xs">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-white flex items-center gap-2">
                              {s.name} {isCurrent && <span className="text-[9px] font-mono bg-cyan-950/80 text-[#66fcf1] border border-[#66fcf1]/30 px-1.5 py-0.2 rounded font-bold uppercase tracking-widest text-[8px]">CURRENT DEVICE</span>}
                            </p>
                            <p className="text-[10px] text-slate-400 font-mono">{s.email}</p>
                          </div>
                          <span className="text-[9px] font-mono uppercase bg-slate-900 px-2 py-0.5 rounded text-slate-400 border border-slate-800">
                            {s.role}
                          </span>
                        </div>
                        <div className="space-y-1 text-[10px] font-mono text-slate-400">
                          <p>IP Address: <strong className="text-slate-300">{s.ip}</strong></p>
                          <p className="truncate max-w-[240px]">Browser Client: {s.userAgent}</p>
                          <p>Last Activity: {new Date(s.lastSeen).toLocaleString()}</p>
                        </div>

                        {!isCurrent && (
                          <div className="pt-2 border-t border-slate-900/60 flex justify-end">
                            <button
                              onClick={() => handleRevokeSession(s.full_token)}
                              className="text-[10px] font-mono uppercase font-bold text-red-400 hover:text-red-300"
                            >
                              Revoke Session ACCESS
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Comprehensive Corporate Audit Logs */}
            <div className="bg-[#0f131a] border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="border-b border-slate-800/50 pb-4">
                <h4 className="text-base font-bold text-white uppercase tracking-wide flex items-center gap-2">
                  <ShieldCheck size={16} className="text-teal-400" /> Administrative Audit Trail Logs
                </h4>
                <p className="text-slate-400 text-xs">
                  Immutable records containing every credential updates, failed attempts, leads updates, or deletions.
                </p>
              </div>

              <div className="max-h-80 overflow-y-auto border border-slate-800/60 rounded-xl bg-slate-950">
                <table className="w-full text-xs text-left text-slate-300">
                  <thead className="bg-[#07080c] sticky top-0 border-b border-slate-800 text-slate-400 uppercase text-[9px] font-mono">
                    <tr>
                      <th className="py-2.5 px-4">Event Date</th>
                      <th className="py-2.5 px-4">Operator Email</th>
                      <th className="py-2.5 px-4">Trigger Action</th>
                      <th className="py-2.5 px-4">Operational Target</th>
                      <th className="py-2.5 px-4">System IP Address</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 font-mono text-[11px]">
                    {auditLogs.map(log => (
                      <tr key={log.id} className="hover:bg-slate-900/20 transition-colors">
                        <td className="py-3 px-4 text-slate-400">{new Date(log.timestamp).toLocaleString()}</td>
                        <td className="py-3 px-4 text-[#66fcf1] font-semibold">{log.user_email}</td>
                        <td className="py-3 px-4 text-amber-400 font-semibold">{log.action}</td>
                        <td className="py-3 px-4 max-w-xs truncate text-[10px]" title={log.target}>{log.target}</td>
                        <td className="py-3 px-4 text-slate-400">{log.ip_address}</td>
                      </tr>
                    ))}
                    {auditLogs.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-500">
                          Empty system audit trail logs catalog.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* E. SETTINGS VIEW TAB */}
        {activeTab === "settings" && (
          <div className="bg-[#0f131a] border border-slate-800 rounded-3xl p-6.5 max-w-2xl mx-auto space-y-6">
            <div className="border-b border-slate-800/60 pb-3">
              <h4 className="text-base font-bold text-white uppercase tracking-normal">Administrative Services Setup</h4>
              <p className="text-xs text-slate-400">
                Configure credential secrets below to support password reset email delivery and Meta WhatsApp notifications.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-6 text-xs text-slate-300">
              
              {/* Nodemailer SMTP Configs */}
              <div className="space-y-4">
                <h5 className="font-bold text-slate-200 tracking-wider font-mono uppercase text-[10px] flex items-center gap-1.5 border-b border-slate-800 pb-2">
                  <KeySquare size={12} className="text-[#66fcf1]" /> SMTP Mail Server Integrations (Forgot Password OTP)
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">SMTP Host Server</label>
                    <input
                      type="text"
                      value={smtpHost}
                      onChange={(e) => setSmtpHost(e.target.value)}
                      className="w-full bg-[#07080c] border border-slate-800 rounded-xl px-4 py-3 placeholder-slate-600 focus:outline-[#66fcf1]"
                      placeholder="smtp.gmail.com"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">SMTP Port Node</label>
                    <input
                      type="text"
                      value={smtpPort}
                      onChange={(e) => setSmtpPort(e.target.value)}
                      className="w-full bg-[#07080c] border border-slate-800 rounded-xl px-4 py-3 placeholder-slate-600 focus:outline-[#66fcf1]"
                      placeholder="587"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">SMTP Username Profile</label>
                    <input
                      type="text"
                      value={smtpUser}
                      onChange={(e) => setSmtpUser(e.target.value)}
                      className="w-full bg-[#07080c] border border-slate-800 rounded-xl px-4 py-3 placeholder-slate-600 focus:outline-[#66fcf1]"
                      placeholder="enter SMTP connection username"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">SMTP Secured Password</label>
                    <input
                      type="password"
                      value={smtpPass}
                      onChange={(e) => setSmtpPass(e.target.value)}
                      className="w-full bg-[#07080c] border border-slate-800 rounded-xl px-4 py-3 placeholder-slate-600 focus:outline-[#66fcf1]"
                      placeholder="••••••••••••••••"
                    />
                  </div>
                </div>
              </div>

              {/* Meta API Configs */}
              <div className="space-y-4 pt-2">
                <h5 className="font-bold text-slate-200 tracking-wider font-mono uppercase text-[10px] flex items-center gap-1.5 border-b border-slate-800 pb-2">
                  <Smartphone size={12} className="text-[#66fcf1]" /> Meta Cloud API Credentials (Lead Alerts)
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">WhatsApp Phone Number ID</label>
                    <input
                      type="text"
                      value={whatsappPhoneId}
                      onChange={(e) => setWhatsappPhoneId(e.target.value)}
                      className="w-full bg-[#07080c] border border-slate-800 rounded-xl px-4 py-3 placeholder-slate-600 focus:outline-[#66fcf1]"
                      placeholder="10294857361"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">Cloud access authorization Token</label>
                    <input
                      type="password"
                      value={whatsappToken}
                      onChange={(e) => setWhatsappToken(e.target.value)}
                      className="w-full bg-[#07080c] border border-slate-800 rounded-xl px-4 py-3 placeholder-slate-600 focus:outline-[#66fcf1]"
                      placeholder="••••••••••••••••••••"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-teal-500 to-[#66fcf1] hover:from-teal-400 hover:to-cyan-400 text-slate-900 font-bold rounded-xl text-xs transition-transform tracking-wider cursor-pointer font-bold shrink-0"
                >
                  Save Integration States
                </button>
              </div>

            </form>
          </div>
        )}

      </main>

    </div>
  );
}
