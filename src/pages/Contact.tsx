import React, { useState } from "react";
import { Phone, Mail, MapPin, Loader2, Check, MessageSquare, Clock, Globe } from "lucide-react";
import { motion } from "motion/react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
      } else {
        alert(data.error || "Form deployment issue. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network disruption mapping. Retry form payload submission.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenWhatsApp = () => {
    window.open("https://wa.me/918929757028?text=Hi%20Aura%20Web%20Studio!%20Interested%20in%20booking%20consultation.", "_blank");
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

                <button
                  id="contact-form-submit"
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs transition-transform flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-violet-500/10"
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
              <div className="py-16 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check size={28} />
                </div>
                <h4 className="font-display font-extrabold text-xl text-slate-950">Inquiry Authenticated</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Your inquiry indices were written safely to our databases files. A representative will connect on your email or phone shortly.
                </p>
                <div className="pt-2">
                  <button
                    id="reset-form-success"
                    onClick={() => {
                      setSuccess(false);
                      setName("");
                      setEmail("");
                      setPhone("");
                      setMessage("");
                    }}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
                  >
                    Send Another message
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
    </div>
  );
}
