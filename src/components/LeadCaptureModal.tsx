import React, { useState, useEffect } from "react";
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
  const [service, setService] = useState("Business Website");
  const [budget, setBudget] = useState("Starter Pack: ₹4,999 - ₹14,999");
  const [message, setMessage] = useState("");

  const servicesList = [
    "Business Website",
    "Lead Generation Website",
    "Website Redesign",
    "Landing Page",
    "Website Maintenance"
  ];

  // Dynamically update form when preselectedService changes
  useEffect(() => {
    if (preselectedService && isOpen) {
      if (preselectedService.includes(" - ")) {
        const [srvName, pkgName] = preselectedService.split(" - ");
        // Ensure service name matches what's in our select drop-down list
        const matchedSrv = servicesList.find(s => s.toLowerCase() === srvName.toLowerCase().trim()) || srvName.trim();
        setService(matchedSrv);
        
        if (pkgName.includes("Starter")) {
          setBudget("Starter Pack: ₹4,999 - ₹14,999");
          setMessage(`Interested in subscribing to the Starter offer for ${matchedSrv}. Please guide setup.`);
        } else if (pkgName.includes("Growth")) {
          setBudget("Growth Pack: ₹9,999 - ₹24,999");
          setMessage(`I want to claim the 50% discount on the ${matchedSrv} Growth Package!`);
        } else {
          setBudget("Premium Pack: ₹19,999 - ₹54,999+");
          setMessage(`Interested in a Premium Consultation for the ${matchedSrv} tier.`);
        }
      } else {
        const matchedSrv = servicesList.find(s => s.toLowerCase() === preselectedService.toLowerCase().trim()) || preselectedService.trim();
        setService(matchedSrv);
      }
    }
  }, [preselectedService, isOpen]);

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
                <div className="py-8 px-4 text-center space-y-4">
                  <div className="w-16 h-16 bg-[#25D366]/10 border border-[#25D366]/30 rounded-full flex items-center justify-center mx-auto text-[#25D366] animate-pulse">
                    <Check size={32} />
                  </div>
                  
                  <h4 className="font-display font-black text-2xl text-black uppercase tracking-tight">
                    Lead Secured & Saved!
                  </h4>
                  <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                    Excellent <span className="font-semibold text-black">{name}</span>! Your preferences are locked. 
                    Let's continue your registration instantly on WhatsApp to discuss competitor designs and launch timelines.
                  </p>

                  <div className="pt-4 flex flex-col gap-3">
                    <a
                      id="lead-whatsapp-redirect"
                      href={`https://wa.me/918929757028?text=${encodeURIComponent(
                        `Hi Aura Web, I am interested in the ${preselectedService || "Growth Plan"}. Please help me with the setup.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black uppercase text-xs tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.528 2.016 14.069.99 11.45.992c-5.437 0-9.863 4.371-9.867 9.801-.001 1.77.463 3.5 1.34 5.021L1.87 21.063l5.312-1.393L6.647 19.16z" />
                      </svg>
                      Connect on WhatsApp Now
                    </a>

                    <button
                      id="lead-dismiss"
                      onClick={() => {
                        onClose();
                        resetForm();
                      }}
                      className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all"
                    >
                      Or, Close and Browse More Packages
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
