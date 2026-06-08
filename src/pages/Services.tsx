import React from "react";
import { Sparkles, Layout, BarChart, Settings, Sliders, Smartphone, UserCheck, ShieldCheck, Zap, Server, Share2, Clipboard, HeartHandshake, CheckCircle2 } from "lucide-react";

interface ServicesProps {
  openQuote: (service?: string) => void;
}

export default function Services({ openQuote }: ServicesProps) {
  const serviceCategories = [
    {
      title: "Our 5 Core Web Services",
      desc: "High-ROI systems built for exceptional performance, speed, and local business conversion.",
      items: [
        {
          name: "Business Website",
          desc: "Sleek, eye-safe company homepages presenting your stories, service catalogs, address coordinates, and contact details. Optimized for maximum local authority and trust.",
          pricing: { starter: "₹9,999", growth: "₹19,999", premium: "₹49,999" },
          verdict: "High Demand"
        },
        {
          name: "Lead Generation Website",
          desc: "Equipped with custom estimations, structured schedules, responsive inquiry capture interfaces, and dynamic back-office automation to maximize fresh incoming client phone calls.",
          pricing: { starter: "₹14,999", growth: "₹24,999", premium: "₹54,999" },
          verdict: "High Demand"
        },
        {
          name: "Website Redesign",
          desc: "Upgrade obsolete legacy layouts into blazing fast responsive architectures. Complete modern UI/UX overhaul focusing on high conversion vectors and Lighthouse speed benchmarks (95+).",
          pricing: { starter: "₹7,999", growth: "₹14,999", premium: "₹24,999" },
          verdict: "Good Fit"
        },
        {
          name: "Landing Page",
          desc: "Focused single-screen asset custom styled to turn traffic from Google Ads, Meta Ads, and regional local campaigns into verified phone calls and reservations instantly.",
          pricing: { starter: "₹4,999", growth: "₹9,999", premium: "₹19,999" },
          verdict: "Good Fit"
        },
        {
          name: "Website Maintenance",
          desc: "Continuous uptime verification, weekly off-site cold storage backups, rapid assets adjustments, and prompt security checkups to satisfy search crawler parameters continuously.",
          pricing: { starter: "₹1,999/mo", growth: "₹3,999/mo", premium: "₹7,999/mo" },
          verdict: "Best Value"
        }
      ]
    }
  ];

  return (
    <div className="bg-slate-50 font-sans min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-mono font-bold text-violet-600 bg-violet-50 border border-violet-100 px-3 py-1.5 rounded-full uppercase tracking-wider">
            Premium Service Suite
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 tracking-tight leading-none">
            High-Performance Systems for Local Growth
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Every business has unique architectural parameters. We build pristine systems tailored purely for regional conversions, offering direct ownership without high monthly software retainers.
          </p>
        </div>

        {/* System Categories List */}
        <div className="space-y-16">
          {serviceCategories.map((category, catIdx) => (
            <div key={catIdx} className="space-y-6">
              
              {/* Category Header */}
              <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
                <div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900">{category.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{category.desc}</p>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                  OFFICIAL OFFERINGS
                </span>
              </div>

              {/* Items grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm hover:shadow-md hover:border-violet-100 transition-all group flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                          ✅ {item.verdict}
                        </span>
                        <span className="text-[9px] font-mono font-semibold text-slate-400">AUTHORIZED SYSTEM</span>
                      </div>
                      
                      <h4 className="font-display font-bold text-lg text-slate-900 group-hover:text-violet-600 transition-colors">
                        {item.name}
                      </h4>
                      
                      <p className="text-xs text-slate-500 leading-relaxed min-h-[4.5rem]">
                        {item.desc}
                      </p>

                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-1.5 font-mono text-[11px]">
                        <div className="flex justify-between items-center text-slate-600">
                          <span>Starter Tier:</span>
                          <span className="font-bold text-slate-900">{item.pricing.starter}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-600">
                          <span>Growth Tier:</span>
                          <span className="font-bold text-slate-900">{item.pricing.growth}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-600">
                          <span>Premium Tier:</span>
                          <span className="font-bold text-slate-900">{item.pricing.premium}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => openQuote(item.name)}
                      className="w-full mt-6 py-3 bg-slate-100 hover:bg-slate-900 text-slate-700 hover:text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
                    >
                      Configure This Service Package
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Free consultation banner */}
        <div className="mt-20 bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          
          <div className="relative z-10 max-w-2xl space-y-4">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">Not sure which system combination your company requires?</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Our Lead Architect conducts direct, localized competitor analysis in Delhi, Mumbai, and regional markets to draft custom recommendations for you.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={() => openQuote("Architect Consultation")}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs transition-transform cursor-pointer shadow-lg shadow-violet-500/15"
              >
                Claim Free Custom Blueprint Call
              </button>
              <span className="text-xs text-slate-400 font-mono">No card required. Free of binding commitments.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
