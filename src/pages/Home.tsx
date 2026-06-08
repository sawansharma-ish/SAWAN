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

  const stats = [
    { num: "< 3 Sec", label: "Target Page Load Speed" },
    { num: "100%", label: "Mobile SEO Code Compliance" },
    { num: "₹0 Retainer", label: "Direct Software Ownership" },
    { num: "7-14 Days", label: "Standard Launch Turnaround" }
  ];

  const highlights = [
    {
      title: "Clinics & Medical Doctors",
      desc: "Instant patient scheduling, digitized booking intakes, and localized health HIPAA-ready SEO schema.",
      icon: "🩺",
      cta: "Setup Medical booking"
    },
    {
      title: "Fitness Gyms & Studios",
      desc: "Free 3-day pass systems, automated local maps ranking, and immediate SMS lead routing workflows.",
      icon: "💪",
      cta: "Boost Gym Signups"
    },
    {
      title: "Beauty Salons & Spa",
      desc: "Stylist schedulers, automated dynamic QR booking catalogs, and visual before/after conversion sliders.",
      icon: "💅",
      cta: "Configure Salon Widget"
    },
    {
      title: "Bistros & Restaurants",
      desc: "Digital NFC/QR menu grids, table reservation automation, and dynamic local client dynamic reviews routing.",
      icon: "🍔",
      cta: "Boost Dinner Bookings"
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
    <div className="bg-[#FFFDF2] font-sans text-black">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-black text-[#FFFDF2] pt-24 pb-20 px-4 sm:px-6 lg:px-8 rounded-b-[2rem] sm:rounded-b-[3rem] shadow-2xl">
        {/* Ambient Subtle background lighting */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none -mr-48 -mt-24"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neutral-900 rounded-full blur-3xl pointer-events-none -ml-48 -mb-24"></div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Brief */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full text-xs text-[#FFFDF2]/80 font-mono tracking-widest uppercase">
              <Sparkles size={14} className="text-[#FFFDF2] animate-pulse" />
              PREMIUM WEB SYSTEMS FOR LOCAL LEADERS
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight leading-none text-white">
              We build websites that get your local business <span className="font-serif italic text-[#FFFDF2] underline decoration-neutral-800 underline-offset-8">clients</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              No generic templates or boring portfolios. We design premium tech platforms, booking engines, WhatsApp response workflows, and regional Maps SEO to convert visitors into loyal clients.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-primary-cta"
                onClick={() => openQuote()}
                className="w-full sm:w-auto px-8 py-4 bg-[#FFFDF2] hover:bg-white text-black font-black rounded-xl text-xs uppercase tracking-widest transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] hover:shadow-[0_0_25px_rgba(255,253,242,0.25)] shadow-md cursor-pointer"
              >
                Claim Free CRO Audit
              </button>
              <button
                id="hero-secondary-cta"
                onClick={() => setCurrentPage("services")}
                className="w-full sm:w-auto px-8 py-4 bg-black border border-white/20 text-[#FFFDF2] hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-950 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                Explore Web Systems <ArrowRight size={14} />
              </button>
            </div>

            {/* Micro proof badges */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-mono text-slate-400 pt-4 justify-center lg:justify-start border-t border-neutral-900">
              <span>HEADQUARTERS:</span>
              <div className="flex items-center gap-3">
                <span className="text-[#FFFDF2]">📍 Delhi-NCR (HQ)</span>
                <span className="text-neutral-800">•</span>
                <span className="text-[#FFFDF2] font-bold uppercase tracking-wider">🌍 Available Worldwide</span>
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
      <section className="bg-[#FFFDF2] border-y border-black/10 py-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center md:border-r last:border-0 border-black/10">
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-black tracking-tight">{stat.num}</div>
              <div className="text-xs text-neutral-600 font-medium font-sans uppercase mt-1 tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Services Sector Target highlights */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-mono font-bold text-black uppercase tracking-widest bg-black/5 px-3 py-1.5 rounded-full border border-black/10">Tailored SaaS Verticals</span>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-black leading-tight">
            Engineered systems for local business dominance
          </h2>
          <p className="text-neutral-700 text-sm leading-relaxed">
            Freelancers write simple code. We configure high-conversion corporate machines designed specifically for the dynamics of your vertical market.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((hl, index) => (
            <div key={index} className="bg-[#FFFDF2] border border-black/10 rounded-2xl p-6 hover:shadow-lg hover:border-black/30 transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-black/5 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-transform">
                  {hl.icon}
                </div>
                <h4 className="font-display font-bold text-lg text-black mb-2">{hl.title}</h4>
                <p className="text-xs text-neutral-600 leading-relaxed mb-6">{hl.desc}</p>
              </div>

              <button
                onClick={() => openQuote(hl.title)}
                className="w-full py-2.5 bg-black text-[#FFFDF2] hover:bg-neutral-900 hover:text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {hl.cta} <ArrowUpRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. AI Interactive Custom Core Module */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <AiBlueprintBuilder />
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
