import React, { useState, useEffect } from "react";
import { Check, CheckCircle2, X, ArrowRight, ShieldCheck, Clock, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PricingProps {
  openQuote: (service?: string) => void;
}

interface PackagePriceItem {
  name: string;
  price: string;
  desc: string;
  features: string[];
  missing?: string[];
}

interface ServicePricingItem {
  name: string;
  verdict: string;
  pricingType: string;
  packages: PackagePriceItem[];
}

export default function Pricing({ openQuote }: PricingProps) {
  const [selectedServiceIdx, setSelectedServiceIdx] = useState(0);
  const [dbPricingSettings, setDbPricingSettings] = useState<any>(null);
  const [dbServicesPricing, setDbServicesPricing] = useState<ServicePricingItem[]>([]);
  const [loadingConfig, setLoadingConfig] = useState(true);

  // Fallback default services configuration in case network is slow or loading
  const fallbackServicesPricing: ServicePricingItem[] = [
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
            "Continuous server uptime status pings",
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

  // Load config & handle metrics synchronization
  const fetchPricingConfig = async () => {
    try {
      const res = await fetch("/api/pricing-packages");
      const data = await res.json();
      if (res.ok && data.success) {
        setDbPricingSettings(data.pricingSettings);
        if (data.servicesPricing && data.servicesPricing.length > 0) {
          setDbServicesPricing(data.servicesPricing);
        }
      }
    } catch (err) {
      console.warn("Pricing configurations load issue. Initializing using default presets:", err);
    } finally {
      setLoadingConfig(false);
    }
  };

  const trackAction = async (type: "views" | "clicks", packageType: "Starter" | "Growth" | "Premium") => {
    try {
      await fetch("/api/pricing/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, packageType })
      });
    } catch (err) {
      console.error("Tracking analytics failure:", err);
    }
  };

  useEffect(() => {
    fetchPricingConfig();
  }, []);

  // Track page views when the tab or service type changes
  useEffect(() => {
    trackAction("views", "Starter");
    trackAction("views", "Growth");
    trackAction("views", "Premium");
  }, [selectedServiceIdx]);

  // Pricing details selectors
  const activeServicesPricing = dbServicesPricing.length > 0 ? dbServicesPricing : fallbackServicesPricing;
  const currentService = activeServicesPricing[selectedServiceIdx] || activeServicesPricing[0];

  const activeSettings = dbPricingSettings || {
    timerExpiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    offersEnabled: true,
    discounts: { Starter: 50, Growth: 50, Premium: 50 }
  };

  const isOffersActive = activeSettings.offersEnabled;

  const handleCtaClick = async (packageType: "Starter" | "Growth" | "Premium", packageName: string) => {
    // Record click analytics
    await trackAction("clicks", packageType);
    // Open Lead Capture modal
    openQuote(`${currentService.name} - ${packageName}`);
  };

  const handleWhatsappDirect = async (packageType: "Starter" | "Growth" | "Premium", packageName: string) => {
    // Record click analytics to database
    await trackAction("clicks", packageType);
    
    // Explicit requested WhatsApp message: "Hi Aura Web, I am interested in the [Package Name]. Please share complete details."
    const whatsappMsg = `Hi Aura Web, I am interested in the ${packageName}. Please share complete details.`;
    const whatsappUrl = `https://wa.me/918929757028?text=${encodeURIComponent(whatsappMsg)}`;
    
    // Smooth direct redirect
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

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
    <div className="bg-[#FAF9F5] font-sans min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section without Flashy Countdown */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 text-teal-800 border border-teal-200/60 text-[10px] font-mono uppercase rounded-full tracking-wider font-extrabold shadow-sm">
            <Sparkles size={11} className="text-teal-600" /> Limited Offer: Save 50% on Premium Web Design Systems
          </div>
          
          <h1 className="font-display font-black text-4xl sm:text-5xl text-slate-950 tracking-tight leading-none uppercase">
            Aura Web Pricing Plans
          </h1>
          
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            Discover transparent, value-packed investment options designed to build your brand presence, capture verified customer leads, and drive measurable revenue growth.
          </p>
        </div>

        {/* Service Category Menu Tabs */}
        <div className="mb-12 bg-white border border-slate-200/60 p-2 rounded-3xl shadow-sm flex flex-wrap justify-center gap-1.5 max-w-4xl mx-auto">
          {activeServicesPricing.map((service, idx) => (
            <button
              key={service.name}
              id={`tab-select-${idx}`}
              onClick={() => setSelectedServiceIdx(idx)}
              className={`px-5 py-3 rounded-2xl text-xs font-black transition-all cursor-pointer flex whitespace-nowrap items-center gap-2 ${
                selectedServiceIdx === idx
                  ? "bg-slate-950 text-[#FAF9F5] shadow-lg scale-[1.02]"
                  : "text-slate-600 hover:bg-slate-100/50"
              }`}
            >
              {service.name}
              <span className={`text-[8px] px-2 py-0.5 rounded font-mono font-bold ${
                selectedServiceIdx === idx
                  ? "bg-teal-600 text-white"
                  : "bg-slate-100 text-slate-500"
              }`}>
                {service.verdict === "Strong Demand" ? "🔥 HOT" : "✓ FIT"}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Service Ecosystem Header */}
        <div className="max-w-4xl mx-auto bg-slate-100 text-slate-800 rounded-3xl p-5 mb-12 border border-slate-200/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-teal-700 uppercase tracking-widest block font-bold">Target Ecosystem</span>
            <h2 className="font-display font-extrabold text-xl text-slate-950">{currentService.name} Pack Group</h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px]">
            <span className="text-slate-500 font-bold uppercase tracking-wider">Ecosystem Status:</span> 
            <span className="bg-emerald-100 text-emerald-800 border border-emerald-200/50 font-black px-3 py-1 rounded-full uppercase">
              ✅ Strong Demand Active
            </span>
          </div>
        </div>

        {/* HIGH-CONVERSION PRICING CARDS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16 relative pt-6">
          <AnimatePresence mode="wait">
            {currentService.packages.map((pkg, pIdx) => {
              const pkgTypes = ["Starter", "Growth", "Premium"] as const;
              const pkgType = pkgTypes[pIdx] || "Starter";

              // Always use configured discount percentages (falls back to 50% for all three packages if not customized)
              const discountPercentage = activeSettings.discounts[pkgType] ?? 50;

              // Parse original price listed in DB (e.g. ₹9,999)
              const isMonthly = pkg.price.toLowerCase().includes("/mo");
              const originalPriceNumeric = parseInt(pkg.price.replace(/[^0-9]/g, ""), 10) || 0;
              
              // Calculate discounted price (rounding down to cleaner marketing friendly numbers as requested)
              const finalPriceNumeric = Math.floor(originalPriceNumeric * (1 - discountPercentage / 100));
              const savingsAmount = originalPriceNumeric - finalPriceNumeric;

              const originalPriceFormatted = "₹" + originalPriceNumeric.toLocaleString("en-IN") + (isMonthly ? "/mo" : "");
              const finalPriceFormatted = "₹" + finalPriceNumeric.toLocaleString("en-IN") + (isMonthly ? "/mo" : "");
              const savingsFormatted = "₹" + savingsAmount.toLocaleString("en-IN") + (isMonthly ? "/mo" : "");

              // Suitable lists based on requested specification
              const getSuitableItems = (type: "Starter" | "Growth" | "Premium") => {
                if (type === "Starter") {
                  return ["Small Businesses", "Local Shops", "Personal Brands", "Startup Launches"];
                } else if (type === "Growth") {
                  return ["Growing Businesses", "Lead Generation", "Service Providers", "Professional Brands"];
                } else {
                  return ["Established Businesses", "High-End Brands", "Companies Scaling Online", "Custom Solutions"];
                }
              };

              const suitableForItems = getSuitableItems(pkgType);

              // Visual styling settings based on requested guidelines
              const isEntry = pkgType === "Starter";
              const isPopular = pkgType === "Growth";
              const isLuxury = pkgType === "Premium";

              // Button labels based on requested guidelines
              const mainCtaText = isEntry 
                ? "Get Started" 
                : isPopular 
                  ? "Claim 50% Discount" 
                  : "Book Free Consultation";

              return (
                <motion.div
                  key={`${selectedServiceIdx}-${pkg.name}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35, delay: pIdx * 0.08 }}
                  className={`rounded-3xl p-8 border transition-all relative flex flex-col justify-between ${
                    isPopular
                      ? "bg-slate-950 text-[#FAF9F5] border-teal-500 shadow-[0_20px_50px_-12px_rgba(20,184,166,0.3)] ring-2 ring-teal-500/10 lg:-translate-y-4 lg:scale-[1.04] z-10 hover:scale-[1.06] hover:shadow-[0_25px_60px_-10px_rgba(20,184,166,0.4)] duration-300"
                      : isLuxury
                        ? "bg-gradient-to-b from-neutral-900 to-black text-[#FAF9F5] border-amber-500/40 shadow-xl hover:border-amber-500/70 duration-300"
                        : "bg-white text-slate-900 border-slate-200/80 shadow-md hover:border-slate-300 duration-300"
                  }`}
                >
                  {/* Specialized badges requested */}
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-500 to-cyan-600 text-[#FAF9F5] font-mono text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg border border-teal-400/20 flex items-center gap-1">
                      ⭐ MOST POPULAR
                    </div>
                  )}

                  {isLuxury && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-mono text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg border border-amber-400">
                      👑 PREMIUM
                    </div>
                  )}

                  {isEntry && isOffersActive && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-slate-950 text-white border border-slate-800 font-mono text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow">
                      ⭐ OFFER INCLUDED
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Header Package Name */}
                    <div>
                      <h3 className={`font-display font-black text-xl uppercase tracking-tight ${isPopular || isLuxury ? "text-white" : "text-slate-950"}`}>
                        {pkg.name}
                      </h3>
                      <p className={`text-xs mt-2 leading-relaxed h-14 line-clamp-3 ${isPopular || isLuxury ? "text-slate-300" : "text-slate-500"}`}>
                        {pkg.desc}
                      </p>
                    </div>

                    {/* EXACT REQUESTED PRICE DISPLAY FORMAT */}
                    <div className={`p-6 rounded-2xl border text-center relative overflow-hidden ${
                      isPopular
                        ? "bg-teal-950/20 border-teal-500/20"
                        : isLuxury
                          ? "bg-amber-950/10 border-amber-500/15"
                          : "bg-slate-50 border-slate-200/50"
                    }`}>
                      <span className={`text-[8px] uppercase font-mono tracking-wider block mb-2 ${isPopular || isLuxury ? "text-slate-400" : "text-slate-400"}`}>
                        {currentService.pricingType}
                      </span>
                      
                      <div className="space-y-2">
                        {isOffersActive ? (
                          <div className="flex flex-col items-center justify-center">
                            
                            {/* 1. Original Price (Strikethrough) */}
                            <span className="text-sm line-through text-red-500 font-mono font-medium tracking-wide">
                              {originalPriceFormatted}
                            </span>
                            
                            {/* 2. Down Arrow logo */}
                            <span className="text-xs my-0.5 font-bold text-slate-400 block">
                              ↓
                            </span>
                            
                            {/* 3. Offer Price (Discounted) */}
                            <span className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-display my-1 block ${isPopular || isLuxury ? "text-white" : "text-slate-950"}`}>
                              {finalPriceFormatted}
                            </span>
                            
                            {/* 4. Discount Percentage Badge */}
                            <div className="inline-block mt-1">
                              <span className={`text-[9.5px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                                isPopular 
                                  ? "bg-teal-500/20 text-teal-400 border border-teal-500/30" 
                                  : isLuxury
                                    ? "bg-amber-400/20 text-amber-400 border border-amber-500/30"
                                    : "bg-teal-100 text-teal-800 border border-teal-200"
                              }`}>
                                {discountPercentage}% OFF
                              </span>
                            </div>
                            
                            {/* 5. Savings Indicator */}
                            <span className={`text-[10px] font-mono font-black mt-2 block uppercase tracking-wider ${
                              isPopular ? "text-teal-400" : isLuxury ? "text-amber-400" : "text-teal-600"
                            }`}>
                              Save {savingsFormatted}
                            </span>

                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center">
                            <span className={`text-4xl font-extrabold tracking-tight font-display ${isPopular || isLuxury ? "text-white" : "text-slate-950"}`}>
                              {originalPriceFormatted}
                            </span>
                            <span className="text-[8.5px] font-mono text-slate-400 uppercase mt-1">
                              Standard General Rate
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={`h-px ${isPopular || isLuxury ? "bg-white/10" : "bg-slate-200/60"}`} />

                    {/* Suitable For (Bullet points) */}
                    <div>
                      <span className={`text-[9px] font-mono block uppercase font-black tracking-widest mb-3 ${isPopular || isLuxury ? "text-slate-400" : "text-slate-400"}`}>
                        Suitable For:
                      </span>
                      <ul className="grid grid-cols-2 lg:grid-cols-1 gap-2 text-[11px] font-semibold text-slate-600 mb-4 h-auto">
                        {suitableForItems.map((item, keyIdx) => (
                          <li key={keyIdx} className="flex items-center gap-1.5">
                            <span className={isPopular ? "text-teal-400" : isLuxury ? "text-amber-400" : "text-teal-600"}>•</span>
                            <span className={isPopular || isLuxury ? "text-slate-300" : "text-slate-700"}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={`h-px ${isPopular || isLuxury ? "bg-white/10" : "bg-slate-200/60"}`} />

                    {/* Standard features listing */}
                    <div>
                      <span className={`text-[9px] font-mono block uppercase font-black tracking-widest mb-3 ${isPopular || isLuxury ? "text-slate-400" : "text-slate-400"}`}>
                        Delivered Core Capabilities:
                      </span>
                      <ul className="text-[11px] space-y-2.5">
                        {pkg.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 size={12} className={`mt-0.5 flex-shrink-0 ${
                              isLuxury 
                                ? "text-amber-500" 
                                : isPopular 
                                  ? "text-teal-400" 
                                  : "text-teal-600"
                            }`} />
                            <span className={isPopular || isLuxury ? "text-slate-300" : "text-slate-800"}>
                              {feat}
                            </span>
                          </li>
                        ))}
                        {pkg.missing?.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 opacity-30">
                            <X size={12} className="mt-0.5 flex-shrink-0 text-slate-400" />
                            <span className="line-through">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Pricing conversion CTA buttons */}
                  <div className="pt-8 space-y-3">
                    <button
                      id={`purchase-cta-${selectedServiceIdx}-${pIdx}`}
                      onClick={() => handleCtaClick(pkgType, pkg.name)}
                      className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md active:scale-[0.98] ${
                        isPopular
                          ? "bg-teal-500 hover:bg-teal-400 text-slate-950 font-black hover:shadow-teal-500/20"
                          : isLuxury
                            ? "bg-amber-500 hover:bg-amber-400 text-neutral-950 hover:shadow-amber-500/20"
                            : "bg-slate-950 hover:bg-neutral-900 text-[#FAF9F5]"
                      }`}
                    >
                      {mainCtaText}
                    </button>

                    <button
                      id={`whatsapp-cta-${selectedServiceIdx}-${pIdx}`}
                      onClick={() => handleWhatsappDirect(pkgType, pkg.name)}
                      className={`w-full py-2.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        isPopular || isLuxury
                          ? "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/50"
                      }`}
                    >
                      <svg className="w-3.5 h-3.5 fill-current text-[#25D366] shrink-0" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.528 2.016 14.069.99 11.45.992c-5.437 0-9.863 4.371-9.867 9.801-.001 1.77.463 3.5 1.34 5.021L1.87 21.063l5.312-1.393L6.647 19.16z" />
                      </svg>
                      Converse Via WhatsApp
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* TRUST INDICATOR SECTION - EXACT CORRESPONDENCE TO TRUST CHECKLIST LIST */}
        <div id="pricing-trust-panel" className="bg-[#FAF9F5] border border-slate-200/80 rounded-3xl p-8 shadow-sm mb-16 text-center max-w-5xl mx-auto">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black block mb-4">
            ✓ Complete Peace-Of-Mind Features Included In All Deployments
          </span>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-100 text-center space-y-2 hover:shadow-sm transition-all">
              <span className="text-emerald-500 font-extrabold text-lg">✓</span>
              <span className="text-[11px] font-bold text-slate-800 leading-tight">Mobile Responsive Website</span>
            </div>
            
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-100 text-center space-y-2 hover:shadow-sm transition-all">
              <span className="text-emerald-500 font-extrabold text-lg">✓</span>
              <span className="text-[11px] font-bold text-slate-800 leading-tight">SEO Friendly Structure</span>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-100 text-center space-y-2 hover:shadow-sm transition-all">
              <span className="text-emerald-500 font-extrabold text-lg">✓</span>
              <span className="text-[11px] font-bold text-slate-800 leading-tight">WhatsApp Integration</span>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-100 text-center space-y-2 hover:shadow-sm transition-all">
              <span className="text-emerald-500 font-extrabold text-lg">✓</span>
              <span className="text-[11px] font-bold text-slate-800 leading-tight">Fast Loading Performance</span>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-100 text-center space-y-2 hover:shadow-sm transition-all">
              <span className="text-emerald-500 font-extrabold text-lg">✓</span>
              <span className="text-[11px] font-bold text-slate-800 leading-tight">Secure Website Setup</span>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-100 text-center space-y-2 hover:shadow-sm transition-all">
              <span className="text-emerald-500 font-extrabold text-lg">✓</span>
              <span className="text-[11px] font-bold text-slate-800 leading-tight">Free Support Included</span>
            </div>
          </div>
        </div>

        {/* Comparison Capability Table */}
        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h3 className="font-display font-black text-xl text-slate-950 uppercase mb-6 flex items-center gap-2">
            <ShieldCheck size={20} className="text-teal-600" /> Granular Deliverables Matrix
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="border-b border-slate-200 font-mono text-[9px] text-slate-400 uppercase">
                  <th className="py-3.5 px-4 font-black">Core Deliverables Schema</th>
                  <th className="py-3.5 px-4 font-black text-slate-800">Starter Package</th>
                  <th className="py-3.5 px-4 font-black text-teal-600">Growth Package</th>
                  <th className="py-3.5 px-4 font-black text-amber-500">Premium Package</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {featuresComparison.map((feat, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 text-slate-900 font-bold">{feat.name}</td>
                    
                    <td className="py-3.5 px-4 text-slate-600">
                      {typeof feat.starter === "boolean" ? (
                        feat.starter ? "✓ Included" : "✕"
                      ) : (
                        feat.starter
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-slate-900 font-bold">
                      {typeof feat.growth === "boolean" ? (
                        feat.growth ? "✓ Included" : "✕"
                      ) : (
                        feat.growth
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-extrabold text-teal-600">
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

        {/* Free consultation guide disclaimer */}
        <p className="text-slate-400 text-[10px] font-mono text-center mt-6">
          * Dynamic webhook transmissions, localized Delhi NCR audits, and backend container runs depend on unique project parameters. Setup is managed directly by architect Sawan Sharma.
        </p>

      </div>
    </div>
  );
}
