import React, { useState } from "react";
import { Check, CheckCircle2, X, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PricingProps {
  openQuote: (service?: string) => void;
}

export default function Pricing({ openQuote }: PricingProps) {
  const [selectedServiceIdx, setSelectedServiceIdx] = useState(0);

  const servicesPricing = [
    {
      name: "Business Website",
      verdict: "Strong Demand",
      pricingType: "One-Time Investment",
      packages: [
        {
          name: "Starter Package",
          price: "₹9,999",
          desc: "Sleek, informative essential business web presence. Perfect for independent clinics, boutique salons, and local eateries.",
          features: [
            "Essential 3-Page Responsive Design",
            "Direct Contact Lead Form Capture",
            "Google Maps Pinning Integration",
            "Optimized Local SEO Schemas (JSON-LD)",
            "Core Web Vitals Speed Score (90+)",
            "1-Month Fast Container Hosting Setup"
          ],
          missing: [
            "Interactive Booking & Scheduling Calendar",
            "Dynamic Estimated Quota Builders",
            "WhatsApp Automated Message Webhooks"
          ]
        },
        {
          name: "Growth Package",
          price: "₹19,999",
          desc: "Premium conversion-driven system built specifically to capture inquiries and grow customer footfall.",
          features: [
            "Complete Multi-Page Setup (Up to 8 Pages)",
            "Integrated Dynamic Appointment Scheduler",
            "WhatsApp Dynamic Conversation Triggers",
            "Lighthouse Speed Optimization (95+ score)",
            "Comprehensive Competitor Index Audits",
            "Priority Local Search Citations Mapping",
            "Priority 1-on-1 WhatsApp Support"
          ],
          missing: [
            "Tailored Client Admin Control Vault"
          ]
        },
        {
          name: "Premium Package",
          price: "₹49,999",
          desc: "The ultimate local domination suite. Customized to automate admin workflows and synchronize CRM listings.",
          features: [
            "Infinite Pages & Layout Deployments",
            "Custom Admin Dashboard Analytics Panel",
            "Full CRM Lead State Synchronizations",
            "Advanced Multi-Provider Calendars",
            "Dedicated Cloud Run Sandbox Servers",
            "Weekly Maintenance & Cold Backups Sync",
            "Priority 24/7 Architect Hotlines"
          ],
          missing: []
        }
      ]
    },
    {
      name: "Lead Generation Website",
      verdict: "Strong Demand",
      pricingType: "One-Time Investment",
      packages: [
        {
          name: "Starter Package",
          price: "₹14,999",
          desc: "Fast, focused lead capturing asset designed to secure customer names & coordinates with zero friction.",
          features: [
            "Clean High-CRO Landing Layout",
            "Contact Forms with instant email forwarding",
            "Standard offerings grids (Up to 5 categories)",
            "Basic Mobile-responsive CSS validations",
            "Essential Meta SEO parameters",
            "1-Month Standard Secure Hosting"
          ],
          missing: [
            "Interactive Quota/Price Calculator",
            "Automated WhatsApp Alert Webhooks",
            "Dedicated Lead Management Dashboard"
          ]
        },
        {
          name: "Growth Package",
          price: "₹24,999",
          desc: "Supercharges call volumes and pre-qualifies incoming prospects with interactive quote modules.",
          features: [
            "Custom Interactive Quota Estimator Widget",
            "WhatsApp Live Chat Triggers Setup",
            "Multi-Step Qualifying Inquiries Forms",
            "Google Ads Tag & Facebook Pixels link",
            "Ultra-fast under 2-seconds page load speeds",
            "Lead Sync Pipeline using Google Sheets API"
          ],
          missing: [
            "Dedicated administrative Custom CRM database"
          ]
        },
        {
          name: "Premium Package",
          price: "₹54,999",
          desc: "Full-scale corporate customer acquisition platform. Synchronizes form leads into specialized trackers seamlessly.",
          features: [
            "Ultimate Dynamic Calculations engine",
            "Corporate Admin Dashboard & Leads Vault",
            "Real-Time Admin SMS / WhatsApp Alert channels",
            "Multi-Geographic Localized Landing Nodes",
            "Enterprise Firestore Persistent Database",
            "Continuous Code Refinement & Updates"
          ],
          missing: []
        }
      ]
    },
    {
      name: "Website Redesign",
      verdict: "Good Fit",
      pricingType: "One-Time Investment",
      packages: [
        {
          name: "Starter Package",
          price: "₹7,999",
          desc: "Overhaul sluggish WordPress, Wix, or static mock layouts with standard professional styles.",
          features: [
            "Outdated web visual layout modernized",
            "Complete mobile responsive layouts correction",
            "Inbound message form fields upgraded",
            "Essential images optimization & compression",
            "Direct navigation link mappings setup"
          ],
          missing: [
            "Lighthouse Speed Benchmark Guarantee (95+)",
            "Complete SEO Keyword Rewrite Indexed",
            "Custom automation/scheduling webhook structures"
          ]
        },
        {
          name: "Growth Package",
          price: "₹14,999",
          desc: "Upgrade obsolete assets into high-performance web machines to drive SEO rankings and leads.",
          features: [
            "Total code layout restructure for max speed",
            "Clear conversion focused Call-to-Actions",
            "Lighthouse Speed Score guaranteed 95+ rating",
            "Search Engine preservation & link redirects",
            "Floating instant phone and contact buttons",
            "Optimal responsive UI/UX transition patterns"
          ],
          missing: [
            "Custom Admin leads tracking dashboard development"
          ]
        },
        {
          name: "Premium Package",
          price: "₹24,999",
          desc: "High-end corporate redesign. Repackages business systems with customized functional dashboards.",
          features: [
            "Complete custom code rewrite via Vite/Tailwind",
            "Secure Customer portals & schedules hooks",
            "Dynamic lead-routing tracking triggers",
            "Rich schema markup & alt tags SEO update",
            "Database servers setup with SSL lock",
            "Ongoing visual iterations & system test bounds"
          ],
          missing: []
        }
      ]
    },
    {
      name: "Landing Page",
      verdict: "Good Fit",
      pricingType: "One-Time Investment",
      packages: [
        {
          name: "Starter Package",
          price: "₹4,999",
          desc: "Single high-speed landing page focused on a single call-to-action. Perfect for local ad setups.",
          features: [
            "1 Sleek, High-CRO responsive landing view",
            "Elegant custom typography and pairing",
            "Secure contact forms hookups",
            "Highly compressed fast visual setups",
            "Google Maps card embed block"
          ],
          missing: [
            "Google Tag Manager & Global site pixels",
            "WhatsApp messaging webhooks triggers",
            "Dynamic estimate parameters selector tabs"
          ]
        },
        {
          name: "Growth Package",
          price: "₹9,999",
          desc: "Specifically structured to lower customer acquisition costs across Facebook, Instagram, or Google Ads.",
          features: [
            "Ad variations split-testing setup support",
            "Advanced analytics codes & conversion events",
            "Floating Direct WhatsApp customer triggers",
            "Interactive collapsible FAQ & product toggles",
            "Pristine load speed under 1.5 seconds flat",
            "Automatic leads capture to Google Sheets"
          ],
          missing: [
            "Secure customer portal data vault"
          ]
        },
        {
          name: "Premium Package",
          price: "₹19,999",
          desc: "Full premium campaign landing system equipped with automated estimations and chat tools.",
          features: [
            "Custom estimate quote calculators",
            "Live administrator dynamic analytics logged",
            "Immediate server-side Email notify webhooks",
            "Stately scroll effects",
            "No retainers free initial setup configurations",
            "Unlimited design revisions prior to index"
          ],
          missing: []
        }
      ]
    },
    {
      name: "Website Maintenance",
      verdict: "Good Choice",
      pricingType: "Recurring Support",
      packages: [
        {
          name: "Starter Package",
          price: "₹1,999/mo",
          desc: "Secure background support to assure seamless performance and constant uptime.",
          features: [
            "Weekly automated off-site backups",
            "Continuous server uptime status pinging",
            "Secure libraries & system dependencies updates",
            "Up to 2 content or imagery updates monthly",
            "Simple monthly core health & indexing report"
          ],
          missing: [
            "Priority on-demand custom features coding",
            "Weekly database optimization & diagnostic scans"
          ]
        },
        {
          name: "Growth Package",
          price: "₹3,999/mo",
          desc: "Ideal for growing offices updating blogs, changing visual layouts, or running new campaigns.",
          features: [
            "Bi-weekly offsite cold backups + DB audits",
            "Up to 6 custom layout or content edits monthly",
            "Continuous speed maintenance (Lighthouse 95+)",
            "Guaranteed priority checkups under 6 hours",
            "CDN networks configuration & virus scanning",
            "Comprehensive competitors ranking audits quarterly"
          ],
          missing: [
            "On-demand server micro-services building"
          ]
        },
        {
          name: "Premium Package",
          price: "₹7,999/mo",
          desc: "1-on-1 team priority access. Handles complex backend structures, database pings, and features.",
          features: [
            "Daily secure backups with triple redundancy",
            "Unlimited quick content edits & small assets coding",
            "Continuous server container tuning & diagnostics",
            "Instant priority hotline support (under 2 hours)",
            "Quarterly localized search positioning blueprint",
            "Complete analytics and tracking tag refinements"
          ],
          missing: []
        }
      ]
    }
  ];

  const currentService = servicesPricing[selectedServiceIdx];

  const featuresComparison = [
    { name: "Responsive Target UI", starter: true, growth: true, premium: true },
    { name: "Google Maps Pin Hookup", starter: true, growth: true, premium: true },
    { name: "Form Capture & Forwarding", starter: true, growth: true, premium: true },
    { name: "Speed Rating Guarantee (95+)", starter: "Standard (90+)", growth: true, premium: true },
    { name: "Interactive Customer Schedulers", starter: false, growth: true, premium: true },
    { name: "WhatsApp Notification triggers", starter: false, growth: "Basic Trigger", premium: "Advanced Custom" },
    { name: "Administrative Dashboard Portal", starter: false, growth: false, premium: true },
    { name: "Data Sync to External Sheets/DB", starter: false, growth: "Sheets API", premium: "Persistent Database" },
    { name: "Support Channels SLA", starter: "Email only", growth: "Priority WhatsApp", premium: "Dedicated Hotline" },
  ];

  return (
    <div className="bg-slate-50 font-sans min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-mono font-bold text-violet-600 bg-violet-100/60 border border-violet-100 px-3 py-1.5 rounded-full uppercase tracking-wider">
            Upfront Transparent Pricing
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 tracking-tight leading-none">
            High ROI Investments for Your Business
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Choose the specific software system your team requires. Simple, flat setups without high monthly platform commissions or lock-in constraints.
          </p>
        </div>

        {/* 5 Service Selection Menu Tabs */}
        <div className="mb-12 bg-white border border-slate-100 p-2 rounded-3xl shadow-sm flex flex-wrap justify-center gap-1 max-w-4xl mx-auto">
          {servicesPricing.map((service, idx) => (
            <button
              key={service.name}
              id={`tab-select-${idx}`}
              onClick={() => setSelectedServiceIdx(idx)}
              className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer flex whitespace-nowrap items-center gap-2 ${
                selectedServiceIdx === idx
                  ? "bg-slate-900 text-white shadow"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {service.name}
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                selectedServiceIdx === idx
                  ? "bg-violet-600 text-white"
                  : "bg-slate-100 text-slate-500 font-normal"
              }`}>
                {service.verdict === "Strong Demand" ? "🔥 Demand" : "✓ Fit"}
              </span>
            </button>
          ))}
        </div>

        {/* Informative service indicator */}
        <div className="max-w-4xl mx-auto bg-slate-900/5 text-slate-700 rounded-2xl p-4 sm:px-6 mb-12 border border-slate-200/55 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-violet-600 uppercase tracking-wider block font-bold">Selected Service Ecosystem</span>
            <h2 className="font-display font-extrabold text-lg text-slate-900">{currentService.name} Pack Tiers</h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-600">
            <span>Verdict Indicator: </span> 
            <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full uppercase">✅ {currentService.verdict}</span>
          </div>
        </div>

        {/* Dynamic packages grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20 relative">
          <AnimatePresence mode="wait">
            {currentService.packages.map((pkg, pIdx) => {
              const isPopular = pIdx === 1; // Mark Growth as popular
              return (
                <motion.div
                  key={`${selectedServiceIdx}-${pkg.name}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25, delay: pIdx * 0.05 }}
                  className={`bg-white rounded-3xl p-8 border hover:shadow-xl transition-all relative flex flex-col justify-between ${
                    isPopular
                      ? "border-violet-600 shadow-md ring-4 ring-violet-500/5"
                      : "border-slate-100 shadow-sm"
                  }`}
                >
                  {isPopular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-mono text-[9px] font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow">
                      MOST RECOMMENDED PACKAGE
                    </span>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display font-black text-xl text-slate-900">{pkg.name}</h3>
                      <p className="text-xs text-slate-400 mt-1 h-14 leading-relaxed line-clamp-3">{pkg.desc}</p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <span className="text-[9px] text-slate-400 uppercase font-mono block">
                        {currentService.pricingType}
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-slate-950 font-display">{pkg.price}</span>
                        {currentService.pricingType.includes("Recurring") && <span className="text-xs font-mono text-slate-400">/month</span>}
                      </div>
                      <span className="text-slate-400 text-[10px] font-mono leading-none">Complete ownership included</span>
                    </div>

                    <div>
                      <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold tracking-wider mb-3">
                        DELIVERABLES SECURED:
                      </span>
                      <ul className="text-xs text-slate-700 space-y-2.5">
                        {pkg.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-slate-800">
                            <CheckCircle2 size={14} className="text-violet-600 mt-0.5 flex-shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                        {pkg.missing?.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-slate-300">
                            <X size={14} className="text-slate-200 mt-0.5 flex-shrink-0" />
                            <span className="line-through">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-8">
                    <button
                      id={`purchase-cta-${selectedServiceIdx}-${pIdx}`}
                      onClick={() => openQuote(`${currentService.name} - ${pkg.name}`)}
                      className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
                        isPopular
                          ? "bg-slate-900 text-white hover:bg-slate-800"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                      }`}
                    >
                      Book Free Setup Consultation
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Comparison Capability Table */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h3 className="font-display font-extrabold text-xl text-slate-900 mb-6 flex items-center gap-2">
            <ShieldCheck size={20} className="text-violet-600" /> Granular Tier Comparison Matrix
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 font-mono text-[10px] text-slate-400 uppercase">
                  <th className="py-3 px-4">Core Deliverables Schema</th>
                  <th className="py-3 px-4">Starter Package</th>
                  <th className="py-3 px-4">Growth Package</th>
                  <th className="py-3 px-4">Premium Package</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                {featuresComparison.map((feat, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4 text-slate-900 font-semibold">{feat.name}</td>
                    
                    <td className="py-3 px-4">
                      {typeof feat.starter === "boolean" ? (
                        feat.starter ? "✓ Included" : "✕"
                      ) : (
                        feat.starter
                      )}
                    </td>

                    <td className="py-3 px-4 text-slate-900">
                      {typeof feat.growth === "boolean" ? (
                        feat.growth ? "✓ Included" : "✕"
                      ) : (
                        feat.growth
                      )}
                    </td>

                    <td className="py-3 px-4 text-slate-900 font-bold text-violet-600">
                      {typeof feat.premium === "boolean" ? (
                        feat.premium ? "✓ Fully Loaded" : "✕"
                      ) : (
                        feat.premium
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Free consultation guide description */}
        <p className="text-slate-400 text-[10px] font-mono text-center mt-6">
          * Dynamic webhook SMS text transmissions, localized competitor audits, and API integrations vary per vertical. Contact Sawan Sharma to draft custom coordinates.
        </p>

      </div>
    </div>
  );
}
