import React from "react";
import { Sparkles, Layout, BarChart, Settings, Sliders, Smartphone, UserCheck, ShieldCheck, Zap, Server, Share2, Clipboard, HeartHandshake, CheckCircle2 } from "lucide-react";

interface ServicesProps {
  openQuote: (service?: string) => void;
}

export default function Services({ openQuote }: ServicesProps) {
  const serviceCategories = [
    {
      title: "Our 6 Core Web Services",
      desc: "High-ROI systems built for exceptional performance, speed, and local business conversion.",
      items: [
        {
          name: "AI Website Development",
          desc: "Next-generation intelligent, smart systems featuring personalized pipelines, chatbot prompts, and responsive generative AI workflows mapped into your customer flows.",
          pricing: { starter: "₹14,999", growth: "₹29,999", premium: "₹59,999" },
          verdict: "Most Requested"
        },
        {
          name: "Business Website",
          desc: "Sleek, informative essential business web presence. Perfect for independent clinics, boutique salons, high-end corporate storytellers, and local eateries.",
          pricing: { starter: "₹9,999", growth: "₹19,999", premium: "₹49,999" },
          verdict: "High Demand"
        },
        {
          name: "Lead Generation Website",
          desc: "Equipped with custom estimations, structured schedule integration, responsive qualifying questions, and instant WhatsApp notification webhooks.",
          pricing: { starter: "₹14,999", growth: "₹24,999", premium: "₹54,999" },
          verdict: "High Demand"
        },
        {
          name: "Website Redesign",
          desc: "Transform sluggish, unoptimized templates (WordPress, Wix) into blazing fast hand-coded architectures. Elegant Playfair/Inter typography and 95+ speed score.",
          pricing: { starter: "₹7,999", growth: "₹14,999", premium: "₹24,999" },
          verdict: "Fit Focus"
        },
        {
          name: "SEO Optimization",
          desc: "Granular Local SEO structured data mapping, Google Pack indexing audits, and keyword domination across South Delhi, Gurugram, Delhi-NCR, and regional hubs.",
          pricing: { starter: "₹9,999", growth: "₹19,999", premium: "₹39,999" },
          verdict: "Crucial ROI"
        },
        {
          name: "Website Maintenance",
          desc: "Continuous uptime verification, weekly off-site cold storage backups, security auditing, dependency upgrades, and immediate speed tune-ups.",
          pricing: { starter: "₹1,999/mo", growth: "₹3,999/mo", premium: "₹7,999/mo" },
          verdict: "Best Value"
        }
      ]
    }
  ];

  return (
    <div className="bg-secondary-ivory font-sans min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-mono font-bold text-accent-gold bg-accent-gold/10 border border-accent-gold/20 px-3 py-1.5 rounded-full uppercase tracking-wider">
            Premium Service Suite
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-primary-navy tracking-tight leading-tight">
            High-Performance Systems for Local Growth
          </h1>
          <p className="text-slate text-base leading-relaxed">
            Every business has unique architectural parameters. We build pristine systems tailored purely for regional conversions, offering direct ownership without high monthly software retainers.
          </p>
        </div>

        {/* System Categories List */}
        <div className="space-y-16">
          {serviceCategories.map((category, catIdx) => (
            <div key={catIdx} className="space-y-6">
              
              {/* Category Header */}
              <div className="border-b border-light-gray pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
                <div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-primary-navy">{category.title}</h3>
                  <p className="text-xs text-slate mt-0.5">{category.desc}</p>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate bg-white px-2.5 py-1 rounded-md border border-light-gray">
                  OFFICIAL OFFERINGS
                </span>
              </div>

              {/* Items grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="bg-white border border-light-gray rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-accent-gold/30 transition-all group flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-[#C89B3C] bg-accent-gold/10 px-2.5 py-1 rounded-md">
                          ✓ {item.verdict}
                        </span>
                        <span className="text-[9px] font-mono font-semibold text-slate/60">AUTHORIZED SYSTEM</span>
                      </div>
                      
                      <h4 className="font-display font-bold text-lg text-primary-navy group-hover:text-accent-gold transition-colors">
                        {item.name}
                      </h4>
                      
                      <p className="text-xs text-slate leading-relaxed min-h-[4.5rem]">
                        {item.desc}
                      </p>

                      <div className="bg-secondary-ivory/50 rounded-2xl p-4 border border-light-gray space-y-1.5 font-mono text-[11px]">
                        <div className="flex justify-between items-center text-slate">
                          <span>Starter Tier:</span>
                          <span className="font-bold text-primary-navy">{item.pricing.starter}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate">
                          <span>Growth Tier:</span>
                          <span className="font-bold text-primary-navy">{item.pricing.growth}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate">
                          <span>Premium Tier:</span>
                          <span className="font-bold text-primary-navy">{item.pricing.premium}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => openQuote(item.name)}
                      className="w-full mt-6 py-3 bg-secondary-ivory hover:bg-primary-navy text-primary-navy hover:text-white rounded-xl text-xs font-semibold transition-all cursor-pointer uppercase tracking-wider"
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
        <div className="mt-20 bg-primary-navy border border-slate/20 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 text-secondary-ivory relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent-gold/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          
          <div className="relative z-10 max-w-2xl space-y-4">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">Not sure which system combination your company requires?</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Our Lead Architect conducts direct, localized competitor analysis in Delhi, Mumbai, and regional markets to draft custom recommendations for you.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={() => openQuote("Architect Consultation")}
                className="w-full sm:w-auto px-6 py-3 bg-accent-gold hover:bg-accent-gold/90 text-white font-bold rounded-xl text-xs transition-all cursor-pointer shadow-lg shadow-accent-gold/15"
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
