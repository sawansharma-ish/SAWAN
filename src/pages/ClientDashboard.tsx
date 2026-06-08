import React, { useState, useEffect } from "react";
import { FolderGit2, Send, UploadCloud, RefreshCw, Layers, Sparkles, MessageSquare, Briefcase, FileDown, PlusCircle, Check, Loader2, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ClientDashboardProps {
  user: any;
  onUpdateProfile: (updated: any) => void;
}

export default function ClientDashboard({ user, onUpdateProfile }: ClientDashboardProps) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProj, setSelectedProj] = useState<any | null>(null);

  // New blueprint forms state
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newService, setNewService] = useState("AI Website Development");
  const [newBudget, setNewBudget] = useState("₹40,000 - ₹60,000");
  const [newTimeline, setNewTimeline] = useState("4 Weeks");
  const [creatingProj, setCreatingProj] = useState(false);

  // Chat message input
  const [messageText, setMessageText] = useState("");
  const [sendingMsg, setSendingMsg] = useState(false);

  // Profile update fields
  const [profName, setProfName] = useState(user?.name || "");
  const [profPhone, setProfPhone] = useState(user?.phone || "");
  const [updatingProfile, setUpdatingProfile] = useState(false);

  useEffect(() => {
    fetchUserProjects();
  }, [user]);

  const fetchUserProjects = async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`/api/projects/user/${user.id}`);
      const data = await res.json();
      if (data.projects) {
        setProjects(data.projects);
        // Automatically select first if populated
        if (data.projects.length > 0 && !selectedProj) {
          setSelectedProj(data.projects[0]);
        } else if (data.projects.length > 0) {
          // Sync changes
          const active = data.projects.find((p: any) => p.id === selectedProj.id);
          if (active) setSelectedProj(active);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) {
      alert("Please designate Title and detailed requirements notes.");
      return;
    }

    setCreatingProj(true);
    try {
      const response = await fetch("/api/projects/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          userName: user.name,
          userEmail: user.email,
          title: newTitle,
          description: newDesc,
          serviceType: newService,
          budget: newBudget,
          timeline: newTimeline
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setShowCreateForm(false);
        setNewTitle("");
        setNewDesc("");
        await fetchUserProjects();
        if (data.project) setSelectedProj(data.project);
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCreatingProj(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedProj) return;

    setSendingMsg(true);
    try {
      const response = await fetch("/api/projects/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: selectedProj.id,
          sender: "user",
          text: messageText.trim()
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setMessageText("");
        await fetchUserProjects();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSendingMsg(false);
    }
  };

  const simulateFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedProj) return;

    try {
      const response = await fetch("/api/projects/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: selectedProj.id,
          fileName: file.name,
          fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        })
      });

      if (response.ok) {
        alert(`Document '${file.name}' mapped securely inside project vaults files logs.`);
        await fetchUserProjects();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdatingProfile(true);
    try {
      const response = await fetch("/api/auth/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          name: profName,
          phone: profPhone
        })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        alert("Personal profile dimensions refreshed successfully.");
        onUpdateProfile(data.user);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingProfile(false);
    }
  };

  return (
    <div className="bg-slate-50 font-sans min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="space-y-1 content-neutral relative z-10">
            <div className="flex items-center gap-2 text-violet-300 font-mono text-[10px] uppercase tracking-wider">
              <Sparkles size={12} className="text-[#5DFF94]" /> AURA WEB Client Portal Suite
            </div>
            <h1 className="font-display font-extrabold text-2xl tracking-tight text-white leading-none">
              Welcome Back, {user?.name}!
            </h1>
            <p className="text-slate-400 text-xs">Manage active blueprints projects, verify deliverable files, and message solutions architects.</p>
          </div>

          <button
            id="dash-new-blueprint-btn"
            onClick={() => setShowCreateForm(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-violet-500/10 relative z-10"
          >
            <PlusCircle size={14} /> Submit New Web Project
          </button>
        </div>

        {/* Create Project Request Modal container */}
        <AnimatePresence>
          {showCreateForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div onClick={() => setShowCreateForm(false)} className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-6 sm:p-8 relative z-10 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              >
                <h3 className="font-display font-black text-xl text-slate-950 mb-1">Index New Agency Project Solution</h3>
                <p className="text-slate-500 text-xs mb-6">Describe requirement coordinates so architects can analyze design assets and create custom boards.</p>

                <form onSubmit={handleCreateProject} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Project Web Title</label>
                    <input
                      id="proj-form-title"
                      type="text"
                      required
                      placeholder="e.g. Indiranagar Branch Aesthetic Web"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none transition-all placeholder-slate-400 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Design Specifications / Description Notes</label>
                    <textarea
                      id="proj-form-desc"
                      rows={3}
                      required
                      placeholder="Describe target stylists listings, products checkout mechanics, or dental scheduling timings required."
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none transition-all resize-none text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Core System Service</label>
                      <select
                        id="proj-form-service"
                        value={newService}
                        onChange={(e) => setNewService(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 cursor-pointer"
                      >
                        <option value="AI Website Development">AI Website Development</option>
                        <option value="Local Service Platforms">Local Service Platforms</option>
                        <option value="Clinical Booking Setup">Clinical Booking Setup</option>
                        <option value="Complete Redesign Upgrade">Complete Redesign Upgrade</option>
                        <option value="Corporate Custom Dashboards">Corporate Custom Dashboards</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1 font-sans">Timeline Constraint</label>
                      <select
                        id="proj-form-timeline"
                        value={newTimeline}
                        onChange={(e) => setNewTimeline(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 cursor-pointer text-slate-900"
                      >
                        <option value="2 Weeks">2 Weeks (Accelerated)</option>
                        <option value="4 Weeks">4 Weeks (Standard Core)</option>
                        <option value="6 Weeks">6 Weeks (Detailed Systems)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <button
                      id="proj-create-cancel"
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="w-1/3 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      id="proj-create-submit"
                      type="submit"
                      disabled={creatingProj}
                      className="flex-1 py-3 bg-slate-900 hover:bg-slate-850 text-white font-bold rounded-xl text-xs transition-transform flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {creatingProj && <Loader2 className="animate-spin" size={14} />}
                      Verify & Submit Blueprint
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Dashboard Panels Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Projects selector list & profile parameters */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Active projects box selection */}
            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">
              <h3 className="font-display font-bold text-sm text-slate-900 flex items-center gap-1.5 uppercase font-mono tracking-wider">
                <Briefcase size={14} className="text-violet-600" /> Active System Projects
              </h3>

              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <RefreshCw className="animate-spin text-slate-300" size={24} />
                </div>
              ) : projects.length > 0 ? (
                <div className="space-y-2">
                  {projects.map((p) => (
                    <button
                      key={p.id}
                      id={`project-select-${p.id}`}
                      onClick={() => setSelectedProj(p)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                        selectedProj?.id === p.id
                          ? "bg-slate-900 border-slate-900 text-white"
                          : "bg-slate-50 border-slate-100 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div>
                        <h4 className="text-xs font-bold truncate max-w-[180px]">{p.title}</h4>
                        <span className="text-[9px] opacity-75 font-mono block mt-0.5">{p.serviceType}</span>
                      </div>
                      <span className="bg-violet-600/20 text-violet-300 text-[8px] font-mono px-2 py-0.5 rounded uppercase">
                        {p.status}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-slate-400 space-y-2">
                  <FolderGit2 className="mx-auto" size={32} />
                  <p className="text-xs">No active indexed projects.</p>
                </div>
              )}
            </div>

            {/* Client Bio updating card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">
              <h3 className="font-display font-bold text-sm text-slate-900 flex items-center gap-1.5 uppercase font-mono tracking-wider">
                <User size={14} className="text-violet-600" /> Client Bio Parameters
              </h3>

              <form onSubmit={handleUpdateProfile} className="space-y-3">
                <div>
                  <label className="block text-[10px] text-slate-400 font-mono mb-1">REPLICATED FULL NAME</label>
                  <input
                    id="profile-name"
                    type="text"
                    required
                    value={profName}
                    onChange={(e) => setProfName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-150 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 font-mono mb-1">SECURE WHATSAPP CONTACT</label>
                  <input
                    id="profile-phone"
                    type="tel"
                    required
                    value={profPhone}
                    onChange={(e) => setProfPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-150 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 text-slate-900"
                  />
                </div>
                <button
                  id="profile-update-btn"
                  type="submit"
                  disabled={updatingProfile}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs transition-transform cursor-pointer"
                >
                  {updatingProfile ? "Updating Details..." : "Secure Update Profiles"}
                </button>
              </form>
            </div>

          </div>

          {/* Right Block: Active project details progress tracking & messengers */}
          <div className="lg:col-span-8 space-y-6">
            
            {selectedProj ? (
              <div className="space-y-6 font-sans">
                
                {/* 1. Progress Timeline Tracker card */}
                <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <div>
                      <span className="text-[9px] text-violet-600 font-mono font-bold uppercase">Milestones Progress Tracking</span>
                      <h2 className="font-display font-extrabold text-xl text-slate-900 mt-1">{selectedProj.title}</h2>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 font-mono">STATUS:</span>
                      <span className="text-xs font-mono font-bold text-slate-900 ml-1.5 uppercase bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-250">
                        {selectedProj.status}
                      </span>
                    </div>
                  </div>

                  {/* Visual Tracker Bar */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                      <span>Development Stage Index</span>
                      <span className="font-mono text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">{selectedProj.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-violet-600 to-cyan-400 h-full transition-all duration-700" style={{ width: `${selectedProj.progress}%` }}></div>
                    </div>
                  </div>

                  {/* Flow Stages labels */}
                  <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono text-slate-400 font-semibold uppercase">
                    <span className={selectedProj.progress >= 20 ? "text-violet-600 font-bold" : ""}>Intake</span>
                    <span className={selectedProj.progress >= 40 ? "text-violet-600 font-bold" : ""}>Design</span>
                    <span className={selectedProj.progress >= 70 ? "text-violet-600 font-bold" : ""}>Develop</span>
                    <span className={selectedProj.progress >= 100 ? "text-violet-600 font-bold" : ""}>Review</span>
                  </div>
                </div>

                {/* 2. Messages & Document Upload Split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                  
                  {/* Chat logs with assigned Solutions Architects */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex flex-col justify-between h-[400px]">
                    <div className="space-y-3.5 mb-4">
                      <h3 className="font-display font-bold text-sm text-slate-900 flex items-center gap-1.5 border-b border-slate-50 pb-2 uppercase font-mono tracking-wider">
                        <MessageSquare size={14} className="text-violet-600" /> Architects Message Board
                      </h3>

                      {/* Chat messages lists scrollable */}
                      <div className="space-y-3.5 overflow-y-auto max-h-[290px] pr-1 flex flex-col pt-1">
                        {selectedProj.messages?.map((msg: any, mIdx: number) => (
                          <div
                            key={mIdx}
                            className={`p-3 rounded-2xl text-xs leading-normal max-w-[85%] ${
                              msg.sender === "user"
                                ? "bg-slate-900 text-white rounded-tr-none ml-auto"
                                : "bg-slate-50 border border-slate-100 text-slate-700 rounded-tl-none mr-auto"
                            }`}
                          >
                            <p className="font-medium text-slate-200">{msg.text}</p>
                            <span className="text-[8px] opacity-60 font-mono block mt-1 text-right">
                              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <form onSubmit={handleSendMessage} className="flex gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-150">
                      <input
                        id="chat-input-text"
                        type="text"
                        placeholder="Message your lead architect..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        className="flex-1 bg-transparent px-3 text-xs focus:outline-none text-slate-900"
                      />
                      <button
                        id="chat-send-btn"
                        type="submit"
                        disabled={sendingMsg}
                        className="bg-slate-900 hover:bg-slate-800 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center transition-colors"
                      >
                        <Send size={12} />
                      </button>
                    </form>
                  </div>

                  {/* Upload documents & Download active files logs */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex flex-col justify-between h-[400px]">
                    <div className="space-y-4">
                      <h3 className="font-display font-bold text-sm text-slate-900 flex items-center gap-1.5 border-b border-slate-50 pb-2 uppercase font-mono tracking-wider">
                        <UploadCloud size={14} className="text-violet-600" /> Collaterals & Blueprints Vault
                      </h3>

                      {/* Manual upload buttons */}
                      <div className="relative border-2 border-dashed border-slate-250 hover:border-violet-600 hover:bg-slate-50 rounded-2xl p-5 text-center transition-colors cursor-pointer group flex flex-col items-center justify-center">
                        <UploadCloud className="text-slate-400 group-hover:text-violet-600 transition-colors" size={24} />
                        <span className="text-xs font-semibold text-slate-700 mt-2 block">Upload Asset Specs Sheets</span>
                        <span className="text-[10px] text-slate-400 mt-0.5">JPEG, PDF, XLSX (5MB Max)</span>
                        <input
                          id="file-upload-input"
                          type="file"
                          onChange={simulateFileUpload}
                          className="absolute inset-x-0 inset-y-0 opacity-0 cursor-pointer"
                        />
                      </div>

                      {/* Display active files registered inside coordinates */}
                      <div className="space-y-1.5 overflow-y-auto max-h-[160px] pr-1">
                        <span className="text-[9px] text-slate-400 font-mono tracking-wider uppercase block mb-1">SECURED DOCUMENTS REGISTERED:</span>
                        {selectedProj.files && selectedProj.files.length > 0 ? (
                          selectedProj.files.map((fl: any, fIdx: number) => (
                            <div key={fIdx} className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-xs flex justify-between items-center text-slate-700">
                              <div className="truncate max-w-[150px]">
                                <p className="font-semibold truncate">{fl.name}</p>
                                <span className="text-[9px] opacity-70 font-mono block mt-0.5">{fl.size} • {new Date(fl.uploadedAt).toLocaleDateString()}</span>
                              </div>
                              <button
                                id={`download-doc-${fIdx}`}
                                onClick={() => {
                                  alert(`Retrieving secure workspace package document payload: ${fl.name}`);
                                }}
                                className="text-slate-500 hover:text-slate-900 p-1.5 hover:bg-slate-200 rounded-lg transition-colors"
                                title="Download Deliverable"
                              >
                                <FileDown size={14} />
                              </button>
                            </div>
                          ))
                        ) : (
                          <p className="text-[10px] text-slate-400 italic">No blueprints assets uploaded. Drag specs files here.</p>
                        )}
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            ) : (
              <div className="bg-white border border-slate-100 p-16 text-center rounded-3xl text-slate-400 space-y-4">
                <Briefcase size={48} className="text-slate-300 mx-auto" />
                <h4 className="font-display font-bold text-lg text-slate-900">Get Started with Your Solution Architect</h4>
                <p className="text-xs max-w-sm mx-auto">
                  Click 'Submit New Web Project' or configure layouts specifications to lock in your custom maps mapping and design milestones tracker.
                </p>
                <div className="pt-2">
                  <button
                    id="dash-create-proj-cta"
                    onClick={() => setShowCreateForm(true)}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all"
                  >
                    Index Initial Blueprint Now
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
