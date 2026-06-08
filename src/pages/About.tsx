import React from "react";
import { Sparkles, Compass, Target, Sun, Award, Code, MonitorCheck, MapPin, CheckCircle2 } from "lucide-react";

export default function About() {
  const steps = [
    {
      num: "01",
      title: "Commercial & Regional Discovery",
      desc: "Our Solutions Architects evaluate regional searches, map placements, and local competitors in Delhi and metro locations to build physical conversion recommendations."
    },
    {
      num: "02",
      title: "High-Fidelity Mocks / Copywriting",
      desc: "We design premium Figma blueprints incorporating deep navy palettes, glassmorphism UI specs, and clear scheduling blocks tailored to your target client personas."
    },
    {
      num: "03",
      title: "Custom Full-Stack Coding",
      desc: "Your website is hand-coded in React, Node, and Tailwind (strict and clean, using no tech-slop clutter) supported by durable Express servers running on Cloud Run."
    },
    {
      num: "04",
      title: "High-ROI Integrations & Maps Pins",
      desc: "Deploy WhatsApp triggers, stylists booking schedules, Google Maps api pins, and JSON-LD structural microdata elements directly in the page header."
    },
    {
      num: "05",
      title: "Pristine Testing & Core Web Vitals",
      desc: "We minimize bundle assets, compile image file weights, and test desktop and mobile loading speeds to secure 95+ score results on Google Lighthouse."
    }
  ];

  const values = [
    { label: "Absolute Transparency", desc: "No hidden subscription retainers, visual layout branding, or proprietary code locks. No technobabble. Just verified business metrics.", icon: <Compass className="text-violet-600" size={24} /> },
    { label: "Local CRO Domination", desc: "We program for high-conversion. Every card, scheduler, and form aims specifically to turn Indiranagar local searches into clinic or shop visits.", icon: <Target className="text-cyan-500" size={24} /> },
    { label: "Pristine Luxury Styling", desc: "Elegant display typography matched with fluid animations and spacious negative regions. Stand out as the absolute premium choice in your physical market.", icon: <Award className="text-violet-600" size={24} /> }
  ];

  return (
    <div className="bg-slate-50 font-sans min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Section 1: Brand story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono font-bold text-violet-600 bg-violet-50 border border-violet-100 px-3 py-1.5 rounded-full uppercase tracking-wider">
              About AURA WEB
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 tracking-tight leading-none">
              Bridging modern digital systems with offline commercial successes
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed text-justify">
              Founded by veteran SaaS developers and Conversion Rate Optimization experts, AURA WEB represents an elite web agency engineered specifically to serve local service institutions. We noticed freelancers focus on simple template code, ignoring the actual commercial challenges physical salons, medical practices, bistros, and gyms encounter daily.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed text-justify">
              By combining custom high-end UI design with backend automations (like WhatsApp Business API routing, calendar reservation engines, and localized SEO schema scripts), we build real business pipelines. We make your digital website work as hard as your offline team.
            </p>
          </div>

          <div className="lg:col-span-5 bg-slate-900 p-8 rounded-3xl text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="space-y-4 relative z-10">
              <h4 className="font-display font-medium text-lg text-cyan-400">Our Strategic Philosophy</h4>
              <div className="space-y-3.5 pt-2 text-xs text-slate-300">
                <p><strong>Mission:</strong> To empower offline entrepreneurs with luxury technology systems that generate client inquiries on autopilot.</p>
                <p><strong>Vision:</strong> To replace old, slow, outdated static informational flyers across all physical segments with highly functional software.</p>
                <p><strong>Core Value:</strong> Craftsmanship, speed commitment, client login isolation, and immediate, clean, local results.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Values */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-display font-extrabold text-3xl text-slate-900 tracking-tight">Our Core Design Principles</h2>
            <p className="text-slate-500 text-sm">We construct every website upon a firm foundation of high compliance and aesthetic integrity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
                  {v.icon}
                </div>
                <h4 className="font-display font-bold text-lg text-slate-950">{v.label}</h4>
                <p className="text-xs text-slate-500 leading-relaxed text-justify">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Process Timelines */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-slate-400 font-mono text-xs uppercase">Step-by-step Execution</span>
            <h2 className="font-display font-extrabold text-3xl text-slate-900 tracking-tight">How we launch your corporate platform</h2>
            <p className="text-slate-500 text-sm">A structured, high-standards developmental pipeline from core initial analysis to maps placements.</p>
          </div>

          <div className="relative border-l-2 border-slate-200 pl-6 sm:pl-8 space-y-10 max-w-3xl mx-auto font-sans">
            {steps.map((st, idx) => (
              <div key={idx} className="relative">
                {/* Node pin point */}
                <span className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-slate-900 hover:bg-violet-600 transition-colors border-4 border-slate-50 outline-2 outline-slate-200 text-white flex items-center justify-center font-bold text-[9px] font-mono">
                  {st.num}
                </span>

                <div className="space-y-1 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <h4 className="font-display font-bold text-base text-slate-950">{st.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed text-justify">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
