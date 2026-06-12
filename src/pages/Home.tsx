import React, { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle, BarChart3, TrendingUp, Users, ArrowUpRight, Check, Award, Eye, Clock, MessageSquare } from "lucide-react";
import { motion } from "motion/react";
import AiBlueprintBuilder from "../components/AiBlueprintBuilder";

interface HomeProps {
  setCurrentPage: (page: string) => void;
  openQuote: (service?: string) => void;
}

export default function Home({ setCurrentPage, openQuote }: HomeProps) {
  // Mini FAQ Accordion states
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Before & After visualizer slider state
  const [beforeAfterMode, setBeforeAfterMode] = useState<"before" | "after">("after");

  // Lead Magnet states
  const [playbookEmail, setPlaybookEmail] = useState("");
  const [playbookName, setPlaybookName] = useState("");
  const [playbookNiche, setPlaybookNiche] = useState("Clinics");
  const [isSubmittingPlaybook, setIsSubmittingPlaybook] = useState(false);
  const [playbookResult, setPlaybookResult] = useState<any | null>(null);

  const stats = [
    { num: "120+", label: "Projects Delivered" },
    { num: "99.8%", label: "Client Satisfaction" },
    { num: "15+", label: "Industries Served" },
    { num: "Delhi-NCR", label: "Top-Ranked Local SEO" }
  ];

  const highlights = [
    {
      title: "AI Website Development",
      desc: "Intelligent, smart features, personalized pipelines, and integrated Gemini / GPT responsive capabilities.",
      icon: "🤖",
      cta: "Configure AI Module"
    },
    {
      title: "Business Websites",
      desc: "High-end corporate identity, rich SVG vector layouts, and premium interactive brand value markers.",
      icon: "💼",
      cta: "Deploy Business Web"
    },
    {
      title: "Lead Generation Websites",
      desc: "Architected to turn anonymous clicks into immediate consultation reservations & pipeline entries.",
      icon: "⚡",
      cta: "Activate Lead Engine"
    },
    {
      title: "Website Redesign",
      desc: "Upgrade slow legacy templates with premium Custom CSS, high-speed loading assets, and Playfair typography.",
      icon: "🎨",
      cta: "Initiate Redesign"
    },
    {
      title: "SEO Optimization",
      desc: "Regional location JSON-LD schema, map positioning, GK-II, Gurugram & Delhi-NCR keywords domination.",
      icon: "📈",
      cta: "Launch SEO Campaign"
    },
    {
      title: "Website Maintenance",
      desc: "60fps animations, robust security shielding, weekly database updates, and live uptime monitoring.",
      icon: "🛠️",
      cta: "Secure Maintenance"
    }
  ];

  const faqs = [
    {
      q: "How does the Strategic Proposal & Blueprint system work?",
      a: "Our website includes an on-demand Solution Blueprint creator. Guided by our strategic parameters, it parses your local industry, target coordinates, and budget selection to formulate concrete recommendations, design themes, and conversion elements immediately."
    },
    {
      q: "Are the custom Booking systems compatible with WhatsApp?",
      a: "Yes! We deploy dedicated WhatsApp Business API integration packages. When local clients hit your landing page or booking form, your team receives a synchronized lead alert, and the user receives a confirmation text directly in WhatsApp."
    },
    {
      q: "Do you configure Google Maps and Local SEO schema?",
      a: "Yes, 100%. We believe code is only as good as its discoverability. Every website is built with highly compliant JSON-LD structured data and is pinned directly into regional Google Local Pack keywords so your clinics, gyms, or bistros rank above competitors."
    },
    {
      q: "Can clients monitor their project timelines and files?",
      a: "Absolutely. When you initiate a project with us, you receive a client login portal activation. In the Client Dashboard, you track status milestones (UI/UX Design, Development, Testing), message your assigned Lead Architect, upload requirements documents, and download final files."
    }
  ];

  return (
    <div className="bg-secondary-ivory font-sans text-charcoal">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-primary-navy text-secondary-ivory pt-24 pb-20 px-4 sm:px-6 lg:px-8 rounded-b-[2rem] sm:rounded-b-[3rem] shadow-2xl">
        {/* Ambient Subtle background lighting */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none -mr-48 -mt-24"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neutral-900 rounded-full blur-3xl pointer-events-none -ml-48 -mb-24"></div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Brief */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-charcoal/80 border border-slate/40 rounded-full text-xs text-secondary-ivory/80 font-mono tracking-widest uppercase">
              <Sparkles size={14} className="text-accent-gold animate-pulse" />
              ELITE CRO & WEB ARCHITECTS FOR LOCAL LEADERS
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight leading-tight text-white">
              Web Experiences That Turn <span className="font-serif italic text-accent-gold underline decoration-accent-gold/40 underline-offset-8">Visitors Into Customers</span>.
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              No generic slow templates or amateur freelancer code. We design ultra-premium, high-conversion custom systems, stylized scheduling modules, WhatsApp CRM pipelines, and dominant regional Map SEO. Complete source code ownership.
            </p>

            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  id="hero-primary-cta"
                  onClick={() => openQuote()}
                  className="w-full sm:w-auto px-8 py-4 bg-accent-gold hover:bg-accent-gold/90 text-white font-black rounded-xl text-xs uppercase tracking-widest transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-md cursor-pointer"
                >
                  Get Started
                </button>
                <button
                  id="hero-secondary-cta"
                  onClick={() => setCurrentPage("portfolio")}
                  className="w-full sm:w-auto px-8 py-4 bg-primary-navy border border-white/20 text-[#FFFDF2] hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-950 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  View Our Work <ArrowRight size={14} />
                </button>
              </div>
              <p className="text-[11px] font-mono text-accent-gold/90 text-center lg:text-left tracking-wide">
                ⚠️ LIMITED CAPACITY: Only 3 custom blueprint spots remaining for this week.
              </p>
            </div>

            {/* Micro proof badges */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-mono text-slate-400 pt-4 justify-center lg:justify-start border-t border-neutral-900">
              <span className="font-bold tracking-wider">LOCAL AUDIT TARGETS:</span>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1">
                <span className="text-[#FFFDF2]">📍 GK-II South Delhi</span>
                <span className="text-neutral-800">•</span>
                <span className="text-[#FFFDF2]">📍 Gurugram Sector 49</span>
                <span className="text-neutral-800">•</span>
                <span className="text-[#FFFDF2]">📍 Noida Sector 62</span>
                <span className="text-neutral-800">•</span>
                <span className="text-[#FFFDF2] font-semibold text-emerald-400">🌍 Metro India Active</span>
              </div>
            </div>
          </div>

          {/* Hero Right Interactive Mock Case */}
          <div className="lg:col-span-5 bg-neutral-950 border border-neutral-900 p-6 rounded-3xl relative">
            <div className="absolute top-4 left-4 h-2 w-2 rounded-full bg-neutral-800"></div>
            <div className="absolute top-4 left-8 h-2 w-2 rounded-full bg-neutral-850"></div>
            <div className="absolute top-4 left-12 h-2 w-2 rounded-full bg-neutral-900"></div>
            
            <div className="pt-6 text-[10px] text-slate-450 font-mono flex items-center justify-between border-b border-neutral-900 pb-3 mb-4 tracking-wider">
              <span>DASHBOARD METRICS (PREVIEW)</span>
              <span className="text-[#FFFDF2] flex items-center gap-1.5 font-bold uppercase">● LIVE PROJECT SIMULATOR</span>
            </div>

            <div className="space-y-4">
              {/* Box 1 */}
              <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-850">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-400 text-[9px] uppercase tracking-widest font-mono">Clinic Lead Multiplier</span>
                  <span className="text-emerald-400 font-bold font-mono text-xs">+142% Uplift</span>
                </div>
                <div className="text-2xl font-bold text-white tracking-tight">₹4.8 Lakhs</div>
                <p className="text-[9px] text-slate-500 mt-1 font-mono">Local Business ROI projection</p>
              </div>

              {/* Box 2 */}
              <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-850">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-400 text-[9px] uppercase tracking-widest font-mono">Automated Booking Leads</span>
                  <span className="text-emerald-400 font-bold font-mono text-xs">96.8% Precision</span>
                </div>
                <div className="text-2xl font-bold text-white tracking-tight">342 Valid Bookings</div>
                <p className="text-[9px] text-slate-500 mt-1 font-mono">Real-time CRM WhatsApp webhook output</p>
              </div>

              <div className="bg-neutral-900/40 p-4 rounded-xl border border-dashed border-neutral-800 text-center">
                <p className="text-[11px] text-slate-450 italic">"This interactive simulator showcases lead tracking and custom webhooks that we deploy for premier brick-and-mortar local salons, clinics, and bistros."</p>
                <p className="text-[9px] font-bold text-[#FFFDF2] mt-1 font-mono uppercase tracking-widest">AURA WEB ARCHITECTURE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Client Stats */}
      <section className="bg-white border-y border-light-gray/60 py-12 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center md:border-r last:border-0 border-light-gray/60">
              <div className="font-display font-extrabold text-3xl sm:text-5xl text-primary-navy tracking-tight">{stat.num}</div>
              <div className="text-xs text-slate font-semibold font-sans uppercase mt-2 tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Services Sector Target highlights */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-18 space-y-4">
          <span className="text-[10px] font-mono font-bold text-primary-navy uppercase tracking-widest bg-accent-gold/10 text-accent-gold px-4.5 py-1.5 rounded-full border border-accent-gold/20">Elite Digital Services</span>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-primary-navy leading-tight">
            Engineered systems for local business dominance
          </h2>
          <p className="text-slate text-base max-w-2xl mx-auto leading-relaxed">
            Most agencies deploy generic slow templates that bleed leads. We construct ultra-premium, conversion-optimized machines tailor-made for high-intent business scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((hl, index) => (
            <div key={index} className="bg-white border border-light-gray/60 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1.5 hover:border-accent-gold/40 transition-all duration-300 group flex flex-col justify-between shadow-sm">
              <div>
                <div className="w-14 h-14 bg-secondary-ivory border border-accent-gold/20 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-105 transition-transform">
                  {hl.icon}
                </div>
                <h4 className="font-display font-bold text-xl text-primary-navy mb-3">{hl.title}</h4>
                <p className="text-sm text-slate leading-relaxed mb-8">{hl.desc}</p>
              </div>

              <button
                onClick={() => openQuote(hl.title)}
                className="w-full py-3 bg-primary-navy hover:bg-accent-gold text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
              >
                {hl.cta} <ArrowUpRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* BEFORE VS AFTER CRO & PERFORMANCE VISUALIZER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-black/10">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-[10px] font-mono font-bold text-black uppercase tracking-widest bg-black/5 px-3 py-1.5 rounded-full border border-black/10">Comparative Proof</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-black tracking-tight leading-none text-center">
            How our premium architectures transform your status
          </h2>
          <p className="text-neutral-700 text-sm">
            Toggle our comparison profiles to discover how heavy unoptimized template frameworks leak local clients compared to hand-coded AURA WEB systems.
          </p>

          <div className="inline-flex rounded-xl bg-black/5 p-1 border border-black/15 mt-3">
            <button
              onClick={() => setBeforeAfterMode("before")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                beforeAfterMode === "before" ? "bg-red-600 text-white shadow-sm" : "text-neutral-600 hover:text-black"
              }`}
            >
              🔴 Before (Slow Template)
            </button>
            <button
              onClick={() => setBeforeAfterMode("after")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                beforeAfterMode === "after" ? "bg-emerald-600 text-white shadow-sm" : "text-neutral-600 hover:text-black"
              }`}
            >
              🟢 After (AURA WEB System)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FFFDF2] border border-black/10 rounded-3xl p-6 sm:p-10 shadow-lg">
          {/* Visual Showcase */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`p-6 rounded-2xl border transition-all duration-300 ${
              beforeAfterMode === "before" ? "bg-red-50/50 border-red-200" : "bg-emerald-50/30 border-emerald-200"
            }`}>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                  beforeAfterMode === "before" ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"
                }`}>
                  {beforeAfterMode === "before" ? "Typical Freelancer WordPress" : "AURA WEB Custom Codebase"}
                </span>
                <span className="text-[11px] font-mono font-semibold text-slate-500">SYSTEM PROFILE</span>
              </div>

              <div className="space-y-4">
                {beforeAfterMode === "before" ? (
                  <>
                    <h3 className="font-display font-bold text-xl text-red-950">Slow, Cluttered & Unsynchronized</h3>
                    <p className="text-xs text-red-900/80 leading-relaxed">
                      Generated on bulky builders with 27 unoptimized plugins. Visitors bounce due to load delays. Simple visual layout only, zero automated client queues or CRM pipelines.
                    </p>
                    <div className="space-y-2 pt-2 border-t border-red-200/50">
                      <div className="flex justify-between text-xs text-red-900">
                        <span>Speed Score (Lighthouse):</span>
                        <span className="font-bold">32/100 (Critical)</span>
                      </div>
                      <div className="flex justify-between text-xs text-red-900">
                        <span>Delhi Google Pack Position:</span>
                        <span className="font-bold">Not Pinned / Page 3</span>
                      </div>
                      <div className="flex justify-between text-xs text-red-900">
                        <span>WhatsApp CRM Sync:</span>
                        <span className="font-bold">None (Manual Copying)</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="font-display font-medium text-xl text-emerald-950 font-serif italic">Prestige UI, High-Uptime Speed</h3>
                    <p className="text-xs text-emerald-900/80 leading-relaxed">
                      Hand-coded in React, Vite, and gorgeous clean Tailwind. Renders as a lightweight server-aligned unit. Automatically routes leads directly to physical back-offices immediately.
                    </p>
                    <div className="space-y-2 pt-2 border-t border-emerald-200/50">
                      <div className="flex justify-between text-xs text-emerald-900">
                        <span>Speed Score (Lighthouse):</span>
                        <span className="font-bold text-emerald-600">99/100 (Perfect Score)</span>
                      </div>
                      <div className="flex justify-between text-xs text-emerald-900">
                        <span>Delhi Google Pack Position:</span>
                        <span className="font-bold text-emerald-600">Top 3 Pinned (HQ)</span>
                      </div>
                      <div className="flex justify-between text-xs text-emerald-900">
                        <span>WhatsApp CRM Sync:</span>
                        <span className="font-bold text-emerald-600">Instant Dynamic Webhook</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="p-4 bg-black/5 rounded-xl border border-black/5 text-center">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block mb-1">CONVERSION INSIGHT</span>
              <p className="text-[11px] text-neutral-600 italic">
                {beforeAfterMode === "before" 
                  ? "“Every 1 second delay in mobile loading leaks up to 12% of high-intent clients.”" 
                  : "“Automatic patient/client scheduling secures a massive 142% increment in verified local booking volumes.”"}
              </p>
            </div>
          </div>

          {/* Metric Comparison Boards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-black/10 p-5 rounded-2xl relative overflow-hidden group">
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1">METRIC 1</span>
              <h4 className="font-display font-bold text-sm text-black mb-3">Google Lighthouse Speed</h4>
              <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden mb-3">
                <div 
                  className={`h-full transition-all duration-700 rounded-full ${
                    beforeAfterMode === "before" ? "w-1/3 bg-red-400" : "w-full bg-emerald-500"
                  }`}
                ></div>
              </div>
              <div className="flex justify-between items-end font-mono">
                <span className="text-xs text-slate-500">Rating:</span>
                <span className={`text-xl font-black ${beforeAfterMode === "before" ? "text-red-500" : "text-emerald-500"}`}>
                  {beforeAfterMode === "before" ? "32/100" : "99/100"}
                </span>
              </div>
            </div>

            <div className="bg-white border border-black/10 p-5 rounded-2xl relative overflow-hidden group">
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1">METRIC 2</span>
              <h4 className="font-display font-bold text-sm text-black mb-3">Delhi NCR GMB Maps Rank</h4>
              <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden mb-3">
                <div 
                  className={`h-full transition-all duration-700 rounded-full ${
                    beforeAfterMode === "before" ? "w-[12%] bg-red-400" : "w-[95%] bg-emerald-500"
                  }`}
                ></div>
              </div>
              <div className="flex justify-between items-end font-mono">
                <span className="text-xs text-slate-500">Position rank:</span>
                <span className={`text-xl font-black ${beforeAfterMode === "before" ? "text-red-500" : "text-emerald-500"}`}>
                  {beforeAfterMode === "before" ? "Unranked" : "Top-3 Pinned"}
                </span>
              </div>
            </div>

            <div className="bg-white border border-black/10 p-5 rounded-2xl relative overflow-hidden group">
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1">METRIC 3</span>
              <h4 className="font-display font-bold text-sm text-black mb-3">Lead Leakage Ratio</h4>
              <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden mb-3">
                <div 
                  className={`h-full transition-all duration-700 rounded-full ${
                    beforeAfterMode === "before" ? "w-[85%] bg-red-400" : "w-[4%] bg-emerald-400"
                  }`}
                ></div>
              </div>
              <div className="flex justify-between items-end font-mono">
                <span className="text-xs text-slate-500">Leaks percent:</span>
                <span className={`text-xl font-black ${beforeAfterMode === "before" ? "text-red-500" : "text-emerald-500"}`}>
                  {beforeAfterMode === "before" ? "85.2% Lost" : "Protected"}
                </span>
              </div>
            </div>

            <div className="bg-white border border-black/10 p-5 rounded-2xl relative overflow-hidden group">
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1">METRIC 4</span>
              <h4 className="font-display font-bold text-sm text-black mb-3">Source Code Sovereignty</h4>
              <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden mb-3">
                <div 
                  className={`h-full transition-all duration-700 rounded-full ${
                    beforeAfterMode === "before" ? "w-[15%] bg-red-400" : "w-full bg-emerald-500"
                  }`}
                ></div>
              </div>
              <div className="flex justify-between items-end font-mono">
                <span className="text-xs text-slate-500">SaaS status:</span>
                <span className={`text-xl font-black ${beforeAfterMode === "before" ? "text-red-500" : "text-emerald-500"}`}>
                  {beforeAfterMode === "before" ? "Locked-in" : "100% Owned"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE UNDISPUTED CHOICE: COMPARISON MATRIX */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-black/10">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-[10px] font-mono font-bold text-black uppercase tracking-widest bg-black/5 px-3 py-1.5 rounded-full border border-black/10">Competitive Audit Analysis</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-black tracking-tight leading-none text-center">
            How we protect GK-II & Delhi NCR leaders from obsolete development traps
          </h2>
          <p className="text-neutral-700 text-sm">
            Invest in a permanent, high-conversion commercial asset instead of a generic informational brochure that leaks inquiries.
          </p>
        </div>

        <div className="overflow-x-auto bg-[#FFFDF2] border border-black/10 rounded-2xl">
          <table className="w-full border-collapse text-left text-xs min-w-[700px]">
            <thead>
              <tr className="bg-black text-[#FFFDF2] border-b border-black">
                <th className="p-4 font-mono uppercase tracking-wider font-bold">CRITICAL REQUIREMENTS</th>
                <th className="p-4 font-mono uppercase tracking-wider font-bold text-neutral-400">LOW-COST FREELANCER</th>
                <th className="p-4 font-mono uppercase tracking-wider font-bold text-neutral-400">TEMPLATED WORDPRESS AGENCY</th>
                <th className="p-4 font-mono col-span-1 uppercase tracking-wider font-bold bg-emerald-600 text-white">AURA WEB SYSTEM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              <tr>
                <td className="p-4 font-bold text-black">Upfront Financial Risk</td>
                <td className="p-4 text-slate-500">50% upfront payment (Non-refundable)</td>
                <td className="p-4 text-slate-500">50% upfront payment (Non-refundable)</td>
                <td className="p-4 bg-emerald-500/10 text-emerald-950 font-extrabold text-xs">₹0 Upfront (Deploy first, pay only after successful review)</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-black">Mobile Page Load Speed</td>
                <td className="p-4 text-slate-500">4 - 8 Seconds launch lag</td>
                <td className="p-4 text-slate-500">3 - 6 Seconds launch lag</td>
                <td className="p-4 bg-emerald-500/10 text-emerald-950 font-extrabold text-xs">&lt; 0.8 Seconds (Hand-coded React + Vite bundle optimization)</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-black">Active CRM & WhatsApp Pipeline</td>
                <td className="p-4 text-red-700 font-bold">None (Static mail inbox leaks)</td>
                <td className="p-4 text-amber-800 font-medium">Unstable third-party plugins</td>
                <td className="p-4 bg-emerald-500/10 text-emerald-950 font-extrabold text-xs">Integrated WhatsApp Business Webhooks & instant notifications</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-black">Delhi NCR Structured SEO Schemas</td>
                <td className="p-4 text-red-700">Completely absent</td>
                <td className="p-4 text-slate-500">Basic Yoast metadata inputs</td>
                <td className="p-4 bg-emerald-500/10 text-emerald-950 font-extrabold text-xs">JSON-LD rich results mapped onto physical landmarks & target terms</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-black">Uptime Monitoring & Backups</td>
                <td className="p-4 text-slate-500">None (Charge added fees later)</td>
                <td className="p-4 text-slate-500">Basic hosting routine</td>
                <td className="p-4 bg-emerald-500/10 text-emerald-950 font-extrabold text-xs">Weekly automated cold storage offsets & continuous uptime scans (Free)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* LEAD MAGNET INTERACTIVE PLAYBOOK GENERATOR */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-black/10">
        <div className="bg-black text-[#FFFDF2] rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-neutral-900">
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-24 -mt-24"></div>

          <div className="relative z-10 max-w-4xl space-y-6">
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded inline-block">
              Immediate Authority access
            </span>

            <h3 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight">
              Build your customized 90-Day Digital Dominance Playbook instantly
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl">
              Describe your physical industry vertical (Clinics, Gyms, Salons, or Bistros) to immediately generate a localized Delhi-NCR action checklist directly on your screen. 
            </p>

            {!playbookResult ? (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!playbookName.trim() || !playbookEmail.trim()) {
                    alert("Please provide name and email to generate the localized report.");
                    return;
                  }
                  setIsSubmittingPlaybook(true);
                  setTimeout(() => {
                    let checklist = [];
                    if (playbookNiche === "Clinics") {
                      checklist = [
                        "Deploy HIPAA-ready Patient Intake Schema in head tags to let search engine crawler nodes index physical coordinates.",
                        "Initialize localized GK-II & South Delhi neighborhood keyword arrays targeting elite search categories.",
                        "Embed instant Patient Booking module synced with WhatsApp CRM alert webhooks.",
                        "Execute image and layout lazy-loading to secure an on-mobile Lighthouse score of 98+."
                      ];
                    } else if (playbookNiche === "Gyms") {
                      checklist = [
                        "Deploy dynamic 3-Day Free Guest Pass validator capturing leads in under 12 seconds.",
                        "Weave Gurugram & Noida main location phrases into local hierarchical headers (H1/H2).",
                        "Integrate visual sliders proving training outcome metrics and before/after stats.",
                        "Configure physical coordinates structured data schema linked onto regional Google Local Packs."
                      ];
                    } else if (playbookNiche === "Salons") {
                      checklist = [
                        "Add specialized stylist schedulers enabling immediate calendar selection on-page.",
                        "Generate physical QR booking counters linked with web onboarding routes directly.",
                        "Maximize reviews capture using an automated checkout redirect script.",
                        "Setup pristine fast portfolio galleries optimized to load beautifully on mobile screens."
                      ];
                    } else { // Bistros / Restaurants
                      checklist = [
                        "Embed NFC responsive tabletop menu files rendering in under 0.4 seconds.",
                        "Deploy table booking validators matching live seating capacities and peak timelines.",
                        "Include Schema.org FoodEstablishment metadata blocks loaded with menu items list.",
                        "Install map locator buttons driving customers straight to map coordinates."
                      ];
                    }
                    setPlaybookResult({
                      niche: playbookNiche,
                      name: playbookName,
                      email: playbookEmail,
                      checklist: checklist,
                      timestamp: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                    });
                    setIsSubmittingPlaybook(false);
                  }, 1100);
                }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end pt-3 bg-neutral-950/40 p-6 rounded-2xl border border-neutral-900"
              >
                <div className="md:col-span-3 space-y-1 text-left">
                  <label className="text-[10px] font-mono text-neutral-400 font-bold block">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sawan"
                    value={playbookName}
                    onChange={(e) => setPlaybookName(e.target.value)}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div className="md:col-span-3 space-y-1 text-left">
                  <label className="text-[10px] font-mono text-neutral-400 font-bold block">YOUR EMAIL</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. sawan@auraweb.in"
                    value={playbookEmail}
                    onChange={(e) => setPlaybookEmail(e.target.value)}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div className="md:col-span-3 space-y-1 text-left">
                  <label className="text-[10px] font-mono text-neutral-400 font-bold block">PHYSICAL BUSINESS SEGMENT</label>
                  <select
                    value={playbookNiche}
                    onChange={(e) => setPlaybookNiche(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="Clinics">Clinics & Medical Doctors</option>
                    <option value="Gyms">Fitness Gyms & Studios</option>
                    <option value="Salons">Beauty Salons & Spas</option>
                    <option value="Bistros">Bistros & Restaurants</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={isSubmittingPlaybook}
                  className="md:col-span-3 w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmittingPlaybook ? "Generating Program..." : "Generate Guide Plan"}
                </button>
              </form>
            ) : (
              <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-6 space-y-4 text-left">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-neutral-900 pb-3 gap-2">
                  <div>
                    <h5 className="font-mono text-[9px] text-emerald-400 uppercase tracking-widest font-bold">CUSTOM AUDIT PROTOCOL</h5>
                    <span className="text-sm font-bold text-white font-serif italic">Prepared specifically for {playbookResult.name} ({playbookResult.niche})</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">Prepared on {playbookResult.timestamp}</span>
                </div>

                <div className="space-y-3">
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    AURA WEB Lead Architects have generated these 4 absolute highest-ROI action items specifically configured for your segment to dominate regional search packets:
                  </p>

                  <ul className="space-y-2.5">
                    {playbookResult.checklist.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 bg-neutral-900/50 p-3 rounded-lg border border-neutral-950">
                        <span className="font-mono font-bold text-emerald-400 block mt-0.5">0{idx + 1}.</span>
                        <span className="leading-normal">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-[10px] font-mono text-slate-500">Your digital roadmap has been securely compiled. Close and try another if desired.</span>
                  <button
                    onClick={() => {
                      setPlaybookResult(null);
                      setPlaybookName("");
                      setPlaybookEmail("");
                    }}
                    className="text-xs text-emerald-400 hover:underline font-mono"
                  >
                    Reset & Build New Strategy
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. AI Interactive Custom Core Module */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-navy rounded-[2rem] sm:rounded-[3rem] mx-4 sm:mx-6 lg:mx-8 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <AiBlueprintBuilder />
        </div>
      </section>

      {/* Process Timeline - Discover, Design, Develop, Launch, Scale */}
      <section className="py-24 bg-white border-y border-light-gray/60 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-[10px] font-mono font-bold text-accent-gold uppercase tracking-widest bg-accent-gold/10 px-4 py-1.5 rounded-full border border-accent-gold/20">The Aura Workflow</span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-primary-navy tracking-tight leading-tight">
              Our 5-Stage Client Success Engine
            </h2>
            <p className="text-slate text-base">
              We operate with rigorous alignment, translating initial business goals into dominant, hand-built production software. Here is how we build your solution:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {/* Visual connector line in desktop */}
            <div className="hidden md:block absolute top-[40px] left-0 right-0 h-[2px] bg-light-gray/60 -z-0"></div>
            
            <div className="bg-secondary-ivory/40 p-6 rounded-2xl border border-light-gray/40 relative group hover:border-accent-gold/40 hover:-translate-y-1 transition-all duration-300 z-10 bg-white">
              <span className="absolute top-4 right-4 text-3xl sm:text-4xl font-display font-black text-accent-gold/10 select-none group-hover:text-accent-gold/20 transition-colors">01</span>
              <div className="w-12 h-12 bg-primary-navy text-white rounded-xl flex items-center justify-center font-bold text-sm mb-4">
                DSC
              </div>
              <h4 className="font-display font-bold text-lg text-primary-navy mb-2">Discover</h4>
              <p className="text-xs text-slate leading-relaxed">
                Deep-dive vertical auditing and local search coordinate mapping to locate conversion avenues.
              </p>
            </div>

            <div className="bg-secondary-ivory/40 p-6 rounded-2xl border border-light-gray/40 relative group hover:border-accent-gold/40 hover:-translate-y-1 transition-all duration-300 z-10 bg-white">
              <span className="absolute top-4 right-4 text-3xl sm:text-4xl font-display font-black text-accent-gold/10 select-none group-hover:text-accent-gold/20 transition-colors">02</span>
              <div className="w-12 h-12 bg-primary-navy text-white rounded-xl flex items-center justify-center font-bold text-sm mb-4">
                DSN
              </div>
              <h4 className="font-display font-bold text-lg text-primary-navy mb-2">Design</h4>
              <p className="text-xs text-slate leading-relaxed">
                Playfair typography pairing, structural layout framing, and conversion-focused customer journeys.
              </p>
            </div>

            <div className="bg-secondary-ivory/40 p-6 rounded-2xl border border-light-gray/40 relative group hover:border-accent-gold/40 hover:-translate-y-1 transition-all duration-300 z-10 bg-white">
              <span className="absolute top-4 right-4 text-3xl sm:text-4xl font-display font-black text-accent-gold/10 select-none group-hover:text-accent-gold/20 transition-colors">03</span>
              <div className="w-12 h-12 bg-primary-navy text-white rounded-xl flex items-center justify-center font-bold text-sm mb-4">
                DEV
              </div>
              <h4 className="font-display font-bold text-lg text-primary-navy mb-2">Develop</h4>
              <p className="text-xs text-slate leading-relaxed">
                Lightweight, custom coded interfaces, secure client dashboard state engines, and clean components.
              </p>
            </div>

            <div className="bg-secondary-ivory/40 p-6 rounded-2xl border border-light-gray/40 relative group hover:border-accent-gold/40 hover:-translate-y-1 transition-all duration-300 z-10 bg-white">
              <span className="absolute top-4 right-4 text-3xl sm:text-4xl font-display font-black text-accent-gold/10 select-none group-hover:text-accent-gold/20 transition-colors">04</span>
              <div className="w-12 h-12 bg-primary-navy text-white rounded-xl flex items-center justify-center font-bold text-sm mb-4">
                LCH
              </div>
              <h4 className="font-display font-bold text-lg text-primary-navy mb-2">Launch</h4>
              <p className="text-xs text-slate leading-relaxed">
                Google Map pinning, structured regional schema indexing, and blazing fast production server deployment.
              </p>
            </div>

            <div className="bg-secondary-ivory/40 p-6 rounded-2xl border border-light-gray/40 relative group hover:border-accent-gold/40 hover:-translate-y-1 transition-all duration-300 z-10 bg-white">
              <span className="absolute top-4 right-4 text-3xl sm:text-4xl font-display font-black text-accent-gold/10 select-none group-hover:text-accent-gold/20 transition-colors">05</span>
              <div className="w-12 h-12 bg-primary-navy text-white rounded-xl flex items-center justify-center font-bold text-sm mb-4">
                SCL
              </div>
              <h4 className="font-display font-bold text-lg text-primary-navy mb-2">Scale</h4>
              <p className="text-xs text-slate leading-relaxed">
                Ongoing lead data capturing, automation optimization, priority support, and conversion adjustments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Before & After Case Studies showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="space-y-3">
            <span className="text-[10px] font-mono font-bold text-black uppercase tracking-widest bg-black/5 px-3 py-1 rounded-full border border-black/10">Visible Proof</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-black tracking-tight">Real Case Results, No Hypotheses</h2>
            <p className="text-neutral-700 text-sm max-w-xl">We replace obsolete legacy static pages with blazing fast responsive architectures. Analyze the actual metrics.</p>
          </div>
          <button
            id="view-all-cases"
            onClick={() => setCurrentPage("portfolio")}
            className="flex items-center gap-2 text-sm font-extrabold text-black hover:underline tracking-tight"
          >
            Review and Search Case Studies <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#FFFDF2] border border-black/10 rounded-3xl overflow-hidden hover:shadow-lg transition-all">
            <div className="relative h-64 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200"
                alt="Client Result"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-4 left-4 bg-black text-[#FFFDF2] font-mono text-xs font-bold px-3 py-1.5 rounded-lg shadow-md border border-[#FFFDF2]/20">
                142% SECURED PATIENTS
              </span>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-black font-bold uppercase tracking-wider">Aura Dental Portal</span>
                <span className="text-neutral-600 text-xs font-semibold">Clinics Category</span>
              </div>
              <h4 className="font-display font-bold text-xl text-black leading-snug">Indiranagar booking digitizer and automated patients coordinator.</h4>
              <ul className="grid grid-cols-2 gap-2 text-xs text-neutral-600">
                <li className="flex items-center gap-1.5"><Check size={12} className="text-black" /> Auto WhatsApp SMS</li>
                <li className="flex items-center gap-1.5"><Check size={12} className="text-black" /> Digital medical intake</li>
                <li className="flex items-center gap-1.5"><Check size={12} className="text-black" /> Top-3 Bengaluru SEO ranks</li>
                <li className="flex items-center gap-1.5"><Check size={12} className="text-black" /> HIPAA Compliant Servers</li>
              </ul>
            </div>
          </div>

          <div className="bg-[#FFFDF2] border border-black/10 rounded-3xl overflow-hidden hover:shadow-lg transition-all">
            <div className="relative h-64 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200"
                alt="Client Result 2"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-4 left-4 bg-black text-[#FFFDF2] font-mono text-xs font-bold px-3 py-1.5 rounded-lg shadow-md border border-[#FFFDF2]/20">
                22% AVERAGE ORDER INCREASE
              </span>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-black font-bold uppercase tracking-wider">Bistro Contactless Systems</span>
                <span className="text-neutral-600 text-xs font-semibold">Restaurants Category</span>
              </div>
              <h4 className="font-display font-bold text-xl text-black leading-snug">QR catalogs, order tables tracking, and SMS booking templates.</h4>
              <ul className="grid grid-cols-2 gap-2 text-xs text-neutral-600">
                <li className="flex items-center gap-1.5"><Check size={12} className="text-black" /> Zero table waiting lags</li>
                <li className="flex items-center gap-1.5"><Check size={12} className="text-black" /> Automated loyalty lists</li>
                <li className="flex items-center gap-1.5"><Check size={12} className="text-black" /> Blazing fast phone catalog</li>
                <li className="flex items-center gap-1.5"><Check size={12} className="text-black" /> Multi-branch admin panels</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us (WICU value props) */}
      <section className="bg-black text-[#FFFDF2] py-20 px-4 sm:px-6 lg:px-8 rounded-[2rem] sm:rounded-[3rem] shadow-2xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-widest bg-white/10 px-3 py-1 rounded">Built to Compel</span>
            <h3 className="font-display font-extrabold text-3xl sm:text-5xl leading-none">Why local leaders choose AURA WEB</h3>
            <p className="text-[#FFFDF2]/80 text-sm leading-relaxed">
              Most agency builders write general code in three weeks and never return your emails. AURA WEB establishes a durable collaborative pipeline using professional software engineering.
            </p>

            <div className="space-y-4 pt-4 border-t border-neutral-900">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">01</div>
                <div>
                  <h5 className="font-semibold text-white text-sm">No Tech-Slop or Clutter</h5>
                  <p className="text-xs text-slate-400 mt-0.5">We respect brand visual dignity. No unsolicited stats, credits, or fake network logs are added.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">02</div>
                <div>
                  <h5 className="font-semibold text-white text-sm">Interactive Client Portal Cohesiveness</h5>
                  <p className="text-xs text-slate-400 mt-0.5">Watch development milestones, upload collateral assets, and get direct responses inside a secure app-suite login.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-950">
              <div className="text-white font-bold text-sm uppercase font-mono tracking-wider mb-2">99.9% UPTIME BUILD</div>
              <h5 className="font-display font-semibold text-white text-sm mb-1">Blazing Mobile Speeds</h5>
              <p className="text-slate-400 text-xs">Server routes and page bundles are structured dynamically. Fast loading avoids client bounce events.</p>
            </div>
            <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-950">
              <div className="text-white font-bold text-sm uppercase font-mono tracking-wider mb-2">LOCAL SEO RECOGNITION</div>
              <h5 className="font-display font-semibold text-white text-sm mb-1">Top Google Pack Placements</h5>
              <p className="text-slate-400 text-xs">Microdata, location index cards, and SEO optimized parameters match Indiranagar local lookups effortlessly.</p>
            </div>
            <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-950">
              <div className="text-white font-bold text-sm uppercase font-mono tracking-wider mb-2">CUSTOM WHATSAPP STACKS</div>
              <h5 className="font-display font-semibold text-white text-sm mb-1">Immediate Client Capture</h5>
              <p className="text-slate-400 text-xs">Configured to message users in under 10 seconds. Keep conversion gates wide open.</p>
            </div>
            <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-950">
              <div className="text-white font-bold text-sm uppercase font-mono tracking-wider mb-2">SECURE DATABASE SYSTEM</div>
              <h5 className="font-display font-semibold text-white text-sm mb-1 font-mono">Durable State Engine</h5>
              <p className="text-slate-400 text-xs">All messages, custom project deliverables, tracking coordinates, and client files remain isolated and safe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Client Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-black/5 rounded-[2rem] mt-12 mb-12">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] font-mono font-bold text-black uppercase tracking-widest bg-black/10 px-2.5 py-1 rounded">SYSTEM TARGET DEMOS</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-black tracking-tight">Simulated Regional Use-Case Targets</h2>
          <p className="text-neutral-700 text-sm">Explore illustrative local vertical scenarios showing how medical clinics, gym franchises, and spas automate booking systems.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#FFFDF2] p-6 rounded-2xl border border-black/10 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-1.5 text-black mb-4">★ ★ ★ ★ ★</div>
            <p className="text-neutral-800 text-xs leading-relaxed mb-6">
              "As a dentist, I don't understand web servers. The team at AURA WEB set up my booking portal and linked it to the clinic WhatsApp line. Patients love it, and online bookings boosted by 142%."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black text-[#FFFDF2] flex items-center justify-center font-display font-bold text-sm">VM</div>
              <div>
                <h5 className="text-xs font-bold text-black font-sans">Dr. Vikram Mehta</h5>
                <p className="text-[10px] text-neutral-500">Founder, Aura Dental Group</p>
              </div>
            </div>
          </div>

          <div className="bg-[#FFFDF2] p-6 rounded-2xl border border-black/10 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-1.5 text-black mb-4">★ ★ ★ ★ ★</div>
            <p className="text-neutral-800 text-xs leading-relaxed mb-6">
              "We opened a physical fitness hub in Mumbai. The landing-page optimization and ads setup generated 340 memberships leads inside the first month alone. Extremely precise execution."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black text-[#FFFDF2] flex items-center justify-center font-display font-bold text-sm">RK</div>
              <div>
                <h5 className="text-xs font-bold text-black font-sans">Rahul Khanna</h5>
                <p className="text-[10px] text-neutral-500">Lead Director, Iron Gym</p>
              </div>
            </div>
          </div>

          <div className="bg-[#FFFDF2] p-6 rounded-2xl border border-black/10 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-1.5 text-black mb-4">★ ★ ★ ★ ★</div>
            <p className="text-neutral-800 text-xs leading-relaxed mb-6">
              "Our salon booking setup is running entirely on auto. Clients choose their stylist and secure calendar timings. Zero telephone scheduling headaches now."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black text-[#FFFDF2] flex items-center justify-center font-display font-bold text-sm">MN</div>
              <div>
                <h5 className="text-xs font-bold text-black font-sans">Meera Nair</h5>
                <p className="text-[10px] text-neutral-500">Managing Owner, Glow Salon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Pricing Overview Teaser */}
      <section className="bg-black text-[#FFFDF2] py-20 px-4 sm:px-6 lg:px-8 rounded-[2rem] sm:rounded-[3rem] shadow-2xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest bg-white/10 px-3 py-1.5 rounded-full border border-white/20">Guaranteed Return-on-Investment</span>
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl leading-tight">Transparent, upfront value pricing package structures</h3>
            <p className="text-[#FFFDF2]/80 text-sm leading-relaxed">
              No hidden retainers, code licensing costs, or hosting markups. Every project includes perfect dynamic performance optimization, clean Local SEO microdata mapping, and direct client dashboard support.
            </p>
            <button
              id="cta-goto-pricing"
              onClick={() => setCurrentPage("pricing")}
              className="px-6 py-3 bg-[#FFFDF2] hover:bg-neutral-150 text-black font-extrabold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-transform cursor-pointer"
            >
              Analyze Investment Options <ArrowRight size={14} />
            </button>
          </div>

          <div className="lg:col-span-7 bg-neutral-950 p-6 sm:p-8 rounded-3xl border border-neutral-900">
            <div className="border-b border-neutral-900 pb-4 mb-6">
              <span className="text-neutral-500 text-[10px] uppercase font-mono tracking-wider font-bold">AURA'S MOST REQUESTED</span>
              <h4 className="font-display font-extrabold text-2xl text-white mt-1">Standard Plan</h4>
              <p className="text-xs text-neutral-400 mt-1">Best suited for Clinics, Gyms, Restaurants, and High-Intent local retailers.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ul className="text-xs text-[#FFFDF2]/80 space-y-2 font-medium">
                <li className="flex items-center gap-1.5"><CheckCircle size={12} className="text-[#FFFDF2] flex-shrink-0" /> Full Dynamic UI (Up to 10 Pages)</li>
                <li className="flex items-center gap-1.5"><CheckCircle size={12} className="text-[#FFFDF2] flex-shrink-0" /> Automated Clients Scheduling</li>
                <li className="flex items-center gap-1.5"><CheckCircle size={12} className="text-[#FFFDF2] flex-shrink-0" /> Real-time Lead capture panel</li>
                <li className="flex items-center gap-1.5"><CheckCircle size={12} className="text-[#FFFDF2] flex-shrink-0" /> Double-secured Client login vault</li>
              </ul>
              <ul className="text-xs text-[#FFFDF2]/80 space-y-2 font-medium">
                <li className="flex items-center gap-1.5"><CheckCircle size={12} className="text-[#FFFDF2] flex-shrink-0" /> Google Maps API Pins setup</li>
                <li className="flex items-center gap-1.5"><CheckCircle size={12} className="text-[#FFFDF2] flex-shrink-0" /> Local Rich Results JSON Schema</li>
                <li className="flex items-center gap-1.5"><CheckCircle size={12} className="text-[#FFFDF2] flex-shrink-0" /> Dynamic Reviews Automator</li>
                <li className="flex items-center gap-1.5"><CheckCircle size={12} className="text-[#FFFDF2] flex-shrink-0" /> Instant WhatsApp auto-booking</li>
              </ul>
            </div>

            <div className="mt-8 flex items-center justify-between bg-black p-4 rounded-2xl border border-neutral-900">
              <div>
                <span className="text-[9px] text-[#FFFDF2]/60 uppercase font-mono block tracking-wider">ONE-TIME INVESTMENT</span>
                <span className="text-2xl font-extrabold text-white">₹19,999</span>
              </div>
              <button
                onClick={() => openQuote("Standard Plan - Home Page")}
                className="px-5 py-2.5 bg-[#FFFDF2] hover:bg-neutral-100 text-black font-bold rounded-xl text-xs uppercase tracking-wider transition-transform cursor-pointer"
              >
                Secure Consultation Slots
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <span className="text-[10px] font-mono font-bold text-black uppercase tracking-widest bg-black/5 px-3 py-1 rounded-full border border-black/10">Clear Answers</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-black tracking-tight">Frequently Asked Queries</h2>
          <p className="text-neutral-700 text-sm">Transparency forms the bedrock of our long-term client connections.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-[#FFFDF2] border border-black/10 rounded-xl overflow-hidden shadow-sm transition-all">
              <button
                id={`faq-trigger-${idx}`}
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-5 text-left text-sm font-semibold text-black flex justify-between items-center hover:bg-black/5 cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className="text-black text-base font-bold transition-transform">
                  {activeFaq === idx ? "−" : "+"}
                </span>
              </button>
              {activeFaq === idx && (
                <div className="p-5 border-t border-black/10 text-xs text-neutral-600 leading-relaxed bg-black/5">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
