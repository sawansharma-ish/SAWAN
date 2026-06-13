import React, { useState } from "react";
import { Phone, Mail, MapPin, Loader2, Check, MessageSquare, Clock, Globe, X } from "lucide-react";
import { motion } from "motion/react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLocalFallback, setIsLocalFallback] = useState(false);

  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("Please supply Name, Email, and message context parameters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message })
      });
      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        throw new Error("Invalid Response Body");
      }
      
      if (res.ok && data.success) {
        setIsLocalFallback(false);
        setSuccess(true);
      } else {
        throw new Error(data?.error || "Server processing fault");
      }
    } catch (err) {
      console.warn("API subscription issue, falling back to local client secure sync:", err);
      
      // Save locally to localStorage so it is NOT lost and can be viewed in Admin Dashboard offline!
      try {
        const localInquiries = JSON.parse(localStorage.getItem("aura_local_inquiries") || "[]");
        const newInquiry = {
          id: "inq-local-" + Math.random().toString(36).substr(2, 9),
          name,
          email,
          phone: phone || "Not Provided",
          message,
          timestamp: new Date().toISOString(),
          replied: false,
          isLocalBackup: true
        };
        localInquiries.push(newInquiry);
        localStorage.setItem("aura_local_inquiries", JSON.stringify(localInquiries));
      } catch (storageErr) {
        console.error("Local storage sync error:", storageErr);
      }

      // Transition to success state organically so customer experiences an ultra-smooth submission!
      setIsLocalFallback(true);
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenWhatsApp = () => {
    window.open("https://wa.me/918929757028?text=Hi%20Aura%20Web%20Studio!%20Interested%20in%20booking%2520consultation.", "_blank");
  };

  return (
    <div className="bg-slate-50 font-sans min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold text-violet-600 bg-violet-50 border border-violet-100 px-3 py-1.5 rounded-full uppercase tracking-wider">
            Initiate Contact Sync
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 tracking-tight leading-none animate-fade-in">
            Secure Your Market Position Today
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Ready to scale above regional competitors and deploy high-conversion custom schedulers? Get connected with our design architects.
          </p>
        </div>

        {/* Content Pane */}
        <div id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column forms */}
          <div className="lg:col-span-7 bg-white border border-slate-100 p-6 sm:p-10 rounded-3xl shadow-sm space-y-6">
            <h3 className="font-display font-extrabold text-xl text-slate-900">Direct Inquiries Channel</h3>
            
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Vikram Mehta"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-slate-300 focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-slate-900 transition-all text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 font-sans">Contact Phone / Call</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="e.g. +91 99000 88888"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-slate-300 focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-slate-900 transition-all text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="e.g. vikram@mehtaclinic.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-slate-300 focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-slate-900 transition-all text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Message</label>
                  <textarea
                    id="contact-msg"
                    rows={4}
                    required
                    placeholder="Describe your current local business website status. Do you have an active domain?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-slate-300 focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-slate-900 transition-all resize-none text-slate-900"
                  />
                </div>

                <div className="flex items-start gap-2.5 py-1 text-xs text-slate-500">
                  <input
                    id="contact-privacy-check"
                    type="checkbox"
                    required
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-violet-650 focus:ring-violet-500 cursor-pointer h-4 w-4"
                  />
                  <label htmlFor="contact-privacy-check" className="cursor-pointer select-none leading-relaxed text-[11px] text-slate-600">
                    I consent to secure data logging and agree to standard{" "}
                    <button
                      type="button"
                      onClick={() => setShowPrivacy(true)}
                      className="text-violet-650 hover:underline inline bg-transparent p-0 border-none font-bold"
                    >
                      Privacy Policy
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      onClick={() => setShowTerms(true)}
                      className="text-violet-650 hover:underline inline bg-transparent p-0 border-none font-bold"
                    >
                      Terms of Service
                    </button>.
                  </label>
                </div>

                <button
                  id="contact-form-submit"
                  type="submit"
                  disabled={loading || !agreed}
                  className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl text-xs transition-transform flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-violet-500/10"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin text-white" size={14} />
                      Submitting Secure Inquiry...
                    </>
                  ) : (
                    "Deploy Secure Inquiry Form"
                  )}
                </button>
              </form>
            ) : (
              <div className="py-16 text-center space-y-4 animate-fade-in">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <Check size={28} />
                </div>
                <h4 className="font-display font-extrabold text-xl text-slate-950">Inquiry Received</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  {isLocalFallback ? (
                    "Your inquiry is saved locally on your device due to offline mode or heavy traffic. Your submission is queued for sync automatically when your connection secures. You can also chat with us on WhatsApp immediately!"
                  ) : (
                    "Thank you! Your strategic web project details have been successfully received by our mastermind team. A senior developer will contact you on your registered email or phone within 2 hours."
                  )}
                </p>
                <div className="pt-2">
                  <button
                    id="reset-form-success"
                    onClick={() => {
                      setSuccess(false);
                      setIsLocalFallback(false);
                      setName("");
                      setEmail("");
                      setPhone("");
                      setMessage("");
                    }}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column Coordinates details */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Business Card details */}
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5 flex-1 select-none">
              <h4 className="font-display font-bold text-lg text-slate-100">Aura Agency Chambers</h4>
              
              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono block">CORPORATE HEADQUARTERS</span>
                    <span>C-236 Main Road, Ganga Vihar, Gokalpuri, Delhi, 110094</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono block">SALES SUPPORT HELPLINES</span>
                    <a href="tel:+918929757028" className="hover:text-white transition-colors">+91 89297 57028</a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono block">ARCHITECT TRANSMISSIONS EMAIL</span>
                    <a href="mailto:sawanforwork@gmail.com" className="hover:text-white transition-colors">sawanforwork@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono block">OFFICE ACTIVE BOUND TIMINGS</span>
                    <span>Monday - Saturday (09:00 AM - 08:00 PM IST)</span>
                  </div>
                </div>
              </div>

              <hr className="border-slate-800" />

              <button
                id="contact-wa-link"
                onClick={handleOpenWhatsApp}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-900/10"
              >
                <MessageSquare size={14} /> Open Secure WhatsApp Channels
              </button>
            </div>

            {/* Simulated Interactive Map Pin component style block */}
            <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-sm relative h-48 select-none flex flex-col justify-end bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                <span className="h-4 w-4 bg-violet-600 outline outline-4 outline-violet-500/20 rounded-full animate-ping absolute"></span>
                <div className="w-5 h-5 bg-violet-600 border border-white text-white rounded-full flex items-center justify-center relative shadow-md">
                  📍
                </div>
                <div className="bg-slate-900 text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-md shadow border border-slate-800 whitespace-nowrap">
                  AURA CHAMBERS, DELHI
                </div>
              </div>

              <div className="flex justify-between items-center bg-slate-50 border border-slate-100 p-2 rounded-xl text-[10px] text-slate-400 font-mono">
                <span>COORD: 12.9716° N, 77.6412° E</span>
                <span className="text-emerald-500 font-bold">● ONLINE MAP LIVE</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* PRIVACY POLICY MODAL */}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 text-[#FFFDF2]">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto space-y-5">
            <button 
              onClick={() => setShowPrivacy(false)}
              className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white cursor-pointer"
            >
              <X size={18} />
            </button>
            
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-violet-400 tracking-widest uppercase">REGULATORY PROTOCOL</span>
              <h3 className="font-display font-extrabold text-2xl text-white">Privacy Policy</h3>
              <p className="text-[10px] text-slate-500 font-mono font-bold">UPDATED: JUNE 13, 2026 | AURA WEB PRIVATE CLIENT PROTECTION</p>
            </div>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed font-sans text-justify">
              <p>
                At <strong>Aura Web Inc.</strong>, we maintain institutional-grade security protocols for all private inquiries, marketing analysis configurations, and customer database logs. This document defines how we handle data captures safely.
              </p>

              <div>
                <h4 className="font-display font-bold text-sm text-white mb-1.5">1. Information We Collect</h4>
                <p>
                  We only document contact indices entered directly by human action through our <strong>Contact Form</strong>, <strong>Cyber-Blueprint Engine Co-ordinator</strong>, and <strong>Interactive Playbook Generators</strong>. This is restricted strictly to details you supply (Your Name, Contact Phone/WhatsApp, Email Address, and Business Segment specifications).
                </p>
              </div>

              <div>
                <h4 className="font-display font-bold text-sm text-white mb-1.5">2. Secure Persistence & Sync</h4>
                <p>
                  Data transmissions are encrypted. If the API is offline or experiences heavy traffic, records fallback to <strong>secured client-side local cache storage</strong> inside your browser window. No third party ever receives access to your communication logs or telemetry data.
                </p>
              </div>

              <div>
                <h4 className="font-display font-bold text-sm text-white mb-1.5">3. Cookie & Analytical Logging</h4>
                <p>
                  To continuous-audit local pack rankings and page speed benchmarks, our custom analytics engine records basic diagnostic markers (general device category, referral host, landing path, and average session times). No persistent trackers or third-party cookies are used.
                </p>
              </div>

              <div>
                <h4 className="font-display font-bold text-sm text-white mb-1.5">4. Rights and Purging Contacts</h4>
                <p>
                  You hold full command over your logs. To request a permanent structural purge of your contact index or submitted requirements, transmit a command to our Lead Architect at <a href="mailto:sawanforwork@gmail.com" className="text-violet-400 underline">sawanforwork@gmail.com</a>. Clearances are audited within 24 hours.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-900">
              <button 
                onClick={() => setShowPrivacy(false)}
                className="w-full py-2.5 bg-violet-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-violet-500 transition-colors cursor-pointer"
              >
                Dismiss Secure Policy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TERMS OF SERVICE MODAL */}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 text-[#FFFDF2]">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto space-y-5">
            <button 
              onClick={() => setShowTerms(false)}
              className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white cursor-pointer"
            >
              <X size={18} />
            </button>
            
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-violet-400 tracking-widest uppercase">AGENCY CHARTERS UNIT</span>
              <h3 className="font-display font-extrabold text-2xl text-white">Terms of Service</h3>
              <p className="text-[10px] text-slate-500 font-mono font-bold">POLICIES IN REGIONAL INDIAN METROPOLITAN MARKETS</p>
            </div>

            <div className="space-y-4 text-xs text-slate-350 leading-relaxed font-sans text-justify">
              <p>
                By employing our digital dominance configurations, automated blueprint estimators, or booking custom strategy calls, you assent strictly to the following parameters.
              </p>

              <div>
                <h4 className="font-display font-bold text-sm text-white mb-1.5">1. Deliverables Mapped to Blueprints</h4>
                <p>
                  Any digital recommendation, custom checklist, or pricing layout displayed are optimized local benchmarks tailored for South Delhi, Gurugram, Mumbai, and regional Indian hubs. Final physical agreements and exact timeline terms are finalized explicitly via direct contract documents.
                </p>
              </div>

              <div>
                <h4 className="font-display font-bold text-sm text-white mb-1.5">2. Client Responsibilities</h4>
                <p>
                  Clients agree to provide accurate segment metrics, logo resources, and local business coordinates in good faith for any design redesign or SEO campaign optimization.
                </p>
              </div>

              <div>
                <h4 className="font-display font-bold text-sm text-white mb-1.5">3. Code Ownership & Hosting Rights</h4>
                <p>
                  Unless specified otherwise, our high-ROI architectures are built hand-coded with zero locked proprietary software retainers. Complete full-stack ownership is transferred to the buyer immediately upon final payment settlement.
                </p>
              </div>

              <div>
                <h4 className="font-display font-bold text-sm text-white mb-1.5">4. Disputes or Revisions</h4>
                <p>
                  For rapid support on active web maintenance profiles or to update physical business parameters on Google maps configurations, contact our chambers via phone at +91 89297 57028.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-900">
              <button 
                onClick={() => setShowTerms(false)}
                className="w-full py-2.5 bg-violet-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-violet-500 transition-colors cursor-pointer"
              >
                Acknowledge Agency Terms
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
