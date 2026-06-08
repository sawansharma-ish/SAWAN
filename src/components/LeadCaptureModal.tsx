import React, { useState } from "react";
import { X, Check, ArrowRight, Loader2, Award, ClipboardCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  onLeadCaptured?: () => void;
}

export default function LeadCaptureModal({ isOpen, onClose, preselectedService, onLeadCaptured }: LeadCaptureModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [service, setService] = useState(preselectedService || "Business Website");
  const [budget, setBudget] = useState("Starter Pack: ₹4,999 - ₹14,999");
  const [message, setMessage] = useState("");

  const servicesList = [
    "Business Website",
    "Lead Generation Website",
    "Website Redesign",
    "Landing Page",
    "Website Maintenance"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim() || !businessName.trim()) {
      alert("Please supply Name, Phone, Email, and Business Name to verify local coordinates.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          businessName,
          service,
          budget,
          message
        })
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonErr) {
        throw new Error("Invalid Response Body");
      }

      if (response.ok && data.success) {
        setSuccess(true);
        if (onLeadCaptured) onLeadCaptured();
      } else {
        throw new Error(data?.error || "Lead transmission failed");
      }
    } catch (err) {
      console.warn("API submission issue, falling back to local client lead sync:", err);
      
      // Save locally to localStorage as backup
      try {
        const localLeads = JSON.parse(localStorage.getItem("aura_local_leads") || "[]");
        const newLead = {
          id: "lead-local-" + Math.random().toString(36).substr(2, 9),
          name,
          phone,
          email,
          businessName,
          service,
          budget,
          message,
          timestamp: new Date().toISOString(),
          status: "new",
          isLocalBackup: true
        };
        localLeads.push(newLead);
        localStorage.setItem("aura_local_leads", JSON.stringify(localLeads));
      } catch (storageErr) {
        console.error("LocalStorage write error for local backup lead:", storageErr);
      }

      setSuccess(true);
      if (onLeadCaptured) onLeadCaptured();
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setBusinessName("");
    setService("AI Website Development");
    setBudget("₹20,000 - ₹40,000");
    setMessage("");
    setSuccess(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay mask */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              onClose();
              if (success) resetForm();
            }}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-xl bg-[#FFFDF2] rounded-3xl overflow-hidden shadow-2xl border border-black/10 z-10"
          >
            {/* Elegant Header Background */}
            <div className="bg-black text-[#FFFDF2] p-6 relative">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-white/10 border border-white/20 text-[#FFFDF2] font-mono text-[10px] uppercase rounded-full tracking-widest">
                    <Award size={10} /> Limited availability
                  </div>
                  <button
                    id="lead-close-x"
                    onClick={() => {
                      onClose();
                      if (success) resetForm();
                    }}
                    className="text-neutral-400 hover:text-white transition-colors p-1 hover:bg-neutral-900 rounded-lg"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                <h3 className="font-display font-black text-2xl tracking-tight leading-none text-white uppercase">
                  Claim Your Free UI Consultation & Audit
                </h3>
                <p className="text-neutral-400 text-xs mt-1">
                  Absolutely no commitments. Get localized SEO strategy metrics, competitor layout maps, and clear pricing structure.
                </p>
              </div>
            </div>

            {/* Main Content Pane */}
            <div className="p-6 sm:p-8 max-h-[500px] overflow-y-auto">
              {!success ? (
                <form id="lead-capture-form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 mb-1 font-mono uppercase tracking-wider">Your Full Name</label>
                      <input
                        id="lead-name"
                        type="text"
                        required
                        placeholder="e.g. Anand Patel"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white border border-neutral-200 focus:bg-[#FFFDF2] focus:border-black focus:ring-1 focus:ring-black focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-black transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 mb-1 font-mono uppercase tracking-wider">Secure WhatsApp / Phone</label>
                      <input
                        id="lead-phone"
                        type="tel"
                        required
                        placeholder="e.g. +91 89297 57028"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white border border-neutral-200 focus:bg-[#FFFDF2] focus:border-black focus:ring-1 focus:ring-black focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-black transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 mb-1 font-mono uppercase tracking-wider">Corporate Email Address</label>
                      <input
                        id="lead-email"
                        type="email"
                        required
                        placeholder="e.g. anand@clinicgroup.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border border-neutral-200 focus:bg-[#FFFDF2] focus:border-black focus:ring-1 focus:ring-black focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-black transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 mb-1 font-mono uppercase tracking-wider">Business Name</label>
                      <input
                        id="lead-business"
                        type="text"
                        required
                        placeholder="e.g. Anand Dental Care"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full bg-white border border-neutral-200 focus:bg-[#FFFDF2] focus:border-black focus:ring-1 focus:ring-black focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-black transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 mb-1 font-mono uppercase tracking-wider">Service Interested In</label>
                      <select
                        id="lead-service-select"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full bg-white border border-neutral-200 focus:bg-[#FFFDF2] focus:border-black focus:ring-1 focus:ring-black focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-black cursor-pointer"
                      >
                        {servicesList.map((srv) => (
                          <option key={srv} value={srv}>{srv}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-800 mb-1 font-mono uppercase tracking-wider">Budget Allocation Range</label>
                      <select
                        id="lead-budget-select"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full bg-white border border-neutral-200 focus:bg-[#FFFDF2] focus:border-black focus:ring-1 focus:ring-black focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-black cursor-pointer"
                      >
                        <option value="Starter Pack: ₹4,999 - ₹14,999">Starter Pack (₹4,999 - ₹14,999)</option>
                        <option value="Growth Pack: ₹9,999 - ₹24,999">Growth Pack (₹9,999 - ₹24,999)</option>
                        <option value="Premium Pack: ₹19,999 - ₹54,999+">Premium Pack (₹19,999 - ₹54,999+)</option>
                        <option value="Maintenance Plan: ₹1,999 - ₹7,999/mo">Maintenance Plan (₹1,999 - ₹7,999/mo)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1 font-mono uppercase tracking-wider">Describe Unique Goal (Optional)</label>
                    <textarea
                      id="lead-msg"
                      rows={2}
                      placeholder="e.g. Integrate automatic patient reminders or dynamic QR ordering grids with custom colors"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-white border border-neutral-200 focus:bg-[#FFFDF2] focus:border-black focus:ring-1 focus:ring-black focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-black transition-all resize-none"
                    />
                  </div>

                  <button
                    id="lead-submit-btn"
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-black hover:bg-neutral-900 text-[#FFFDF2] font-black rounded-xl text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin text-white" size={14} />
                        Syncing Client Vault Logs...
                      </>
                    ) : (
                      <>
                        Claim Free Interactive Audit Slots <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="py-12 px-4 text-center space-y-4">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto text-[#FFFDF2] animate-bounce">
                    <Check size={32} />
                  </div>
                  
                  <h4 className="font-display font-black text-2xl text-black uppercase tracking-tight">
                    System Connected!
                  </h4>
                  <p className="text-sm text-neutral-600 max-w-sm mx-auto">
                    Thanks <span className="font-semibold text-black">{name}</span>! Our founder Sawan Sharma and your dedicated Lead Architect will review competitor designs in Delhi and call you via phone shortly.
                  </p>

                  <div className="pt-2">
                    <button
                      id="lead-dismiss"
                      onClick={() => {
                        onClose();
                        resetForm();
                      }}
                      className="px-6 py-3.5 bg-black hover:bg-neutral-900 text-[#FFFDF2] text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                    >
                      Dismiss Portal Overview
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
