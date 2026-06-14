import React, { useState } from "react";
import { Sparkles, Phone, Mail, MapPin, ExternalLink, Shield, X } from "lucide-react";
import { Logo } from "./Logo";

interface FooterProps {
  setCurrentPage: (page: string) => void;
  currentPage?: string;
}

export default function Footer({ setCurrentPage, currentPage }: FooterProps) {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  // PRIVACY POLICY MODAL

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "AURA WEB Development Agency",
    "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    "@id": "https://aurawebstudio.com/#organization",
    "url": "https://aurawebstudio.com",
    "telephone": "+91 89297 57028",
    "priceRange": "₹20000-₹100000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "C-236, Main Road, Ganga Vihar, Gokalpuri",
      "addressLocality": "Delhi",
      "addressRegion": "DL",
      "postalCode": "110094",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.7032,
      "longitude": 77.2862
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "20:00"
    }
  };

  return (
    <footer className="bg-primary-navy text-neutral-400 font-sans border-t border-slate/30 pt-16 pb-8 text-slate/80">
      {/* Dynamic Schema Injection for outstanding Local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Col 1: Brand Pitch */}
          <div className="space-y-4">
            <div className="cursor-pointer" onClick={() => setCurrentPage("home")}>
              <Logo variant="footer" />
            </div>
            
            <p className="text-sm leading-relaxed text-slate-300 font-sans">
              We help premium local salons, gyms, medical clinics, restaurants, and startups dominate their market with high-converting custom web architectures, instant reservation systems, local map positioning, and robust analytics integrations.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs font-mono text-accent-gold tracking-wider uppercase font-bold">
              <span className="h-2 w-2 rounded-full bg-accent-gold animate-pulse"></span>
              ACTIVE ACROSS METROS & REGIONS
            </div>
          </div>

          {/* Col 2: Targets */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm tracking-wider uppercase">Industries We Scale</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><button onClick={() => setCurrentPage("services")} className="transition-colors cursor-pointer text-left bg-transparent text-slate-300 hover:text-accent-gold">Clinics & Medical Doctors</button></li>
              <li><button onClick={() => setCurrentPage("services")} className="transition-colors cursor-pointer text-left bg-transparent text-slate-300 hover:text-accent-gold">Fitness Gyms & Studios</button></li>
              <li><button onClick={() => setCurrentPage("services")} className="transition-colors cursor-pointer text-left bg-transparent text-slate-300 hover:text-accent-gold">Beauty Salons & Spa Centres</button></li>
              <li><button onClick={() => setCurrentPage("services")} className="transition-colors cursor-pointer text-left bg-transparent text-slate-300 hover:text-accent-gold">Restaurants & Food Bistros</button></li>
              <li><button onClick={() => setCurrentPage("services")} className="transition-colors cursor-pointer text-left bg-transparent text-slate-300 hover:text-accent-gold">Real Estate & Luxury Agents</button></li>
              <li><button onClick={() => setCurrentPage("services")} className="transition-colors cursor-pointer text-left bg-transparent text-slate-300 hover:text-accent-gold">Local Service Providers</button></li>
            </ul>
          </div>

          {/* Col 3: Sitemap Navigation */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm tracking-wider uppercase">Quick Hub</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><button onClick={() => setCurrentPage("home")} className="transition-colors cursor-pointer text-left bg-transparent text-slate-300 hover:text-accent-gold">Home Page</button></li>
              <li><button onClick={() => setCurrentPage("services")} className="transition-colors cursor-pointer text-left bg-transparent text-slate-300 hover:text-accent-gold">Core Systems & Services</button></li>
              <li><button onClick={() => setCurrentPage("portfolio")} className="transition-colors cursor-pointer text-left bg-transparent text-slate-300 hover:text-accent-gold">Client Case Studies</button></li>
              <li><button onClick={() => setCurrentPage("pricing")} className="transition-colors cursor-pointer text-left bg-transparent text-slate-300 hover:text-accent-gold">Investment Packages</button></li>
              <li><button onClick={() => setCurrentPage("about")} className="transition-colors cursor-pointer text-left bg-transparent text-slate-300 hover:text-accent-gold">Our Design Philosophy</button></li>
              <li><button onClick={() => setCurrentPage("blog")} className="transition-colors cursor-pointer text-left bg-transparent text-slate-300 hover:text-accent-gold">Growth Blog Insights</button></li>
              <li><button onClick={() => setCurrentPage("contact")} className="transition-colors cursor-pointer text-left bg-transparent text-slate-300 hover:text-accent-gold">Claim Free Audit</button></li>
            </ul>
          </div>

          {/* Col 4: Reach Us */}
          <div className="space-y-4 text-sm text-slate-300">
            <h4 className="font-display font-semibold text-white text-sm tracking-wider uppercase">Agency Chambers</h4>
            
            <div className="flex items-start gap-2.5">
              <MapPin size={16} className="text-accent-gold mt-1 flex-shrink-0" />
              <p>C-236 Main Road, Ganga Vihar, Gokalpuri, Delhi 110094</p>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone size={16} className="text-accent-gold flex-shrink-0" />
              <a href="tel:+918929757028" className="hover:text-accent-gold transition-colors">+91 89297 57028 (Sales)</a>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail size={16} className="text-accent-gold flex-shrink-0" />
              <a href="mailto:sawanforwork@gmail.com" className="hover:text-accent-gold transition-colors">sawanforwork@gmail.com</a>
            </div>

            <hr className="border-neutral-900 my-2" />

            <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400">
              <a href="/sitemap.xml" target="_blank" className="hover:text-white flex items-center gap-1">
                Sitemap.xml <ExternalLink size={10} />
              </a>
              <a href="/robots.txt" target="_blank" className="hover:text-white flex items-center gap-1">
                Robots.txt <ExternalLink size={10} />
              </a>
              <button 
                onClick={() => setShowPrivacy(true)} 
                className="hover:text-white transition-colors cursor-pointer bg-transparent text-left"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => setShowTerms(true)} 
                className="hover:text-white transition-colors cursor-pointer bg-transparent text-left"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>

        <hr className="border-slate/10 mb-8" />

        {/* Outer credit */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© 2026 AURA WEB Inc. All rights reserve-shielded. ROI optimized for Google Local Packs.</p>
          <div className="flex items-center gap-2 text-[10px] text-slate-400 border border-slate/20 bg-[#1E293B]/40 px-3 py-1.5 rounded-lg">
            <Shield size={12} className="text-accent-gold" />
            ISO 27001 & SOC-2 COMPLIANT PLATFORM
          </div>
        </div>
      </div>

      {/* PRIVACY POLICY MODAL */}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in text-[#FFFDF2]">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto space-y-5 animate-scale-up">
            <button 
              onClick={() => setShowPrivacy(false)}
              className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white cursor-pointer"
            >
              <X size={18} />
            </button>
            
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-accent-gold tracking-widest uppercase">REGULATORY PROTOCOL</span>
              <h3 className="font-display font-extrabold text-2xl text-white">Privacy Policy</h3>
              <p className="text-[10px] text-slate-500 font-mono font-bold">UPDATED: JUNE 13, 2026 | AURA WEB PRIVATE CLIENT PROTECTION</p>
            </div>

            <div className="space-y-4 text-xs text-slate-350 leading-relaxed font-sans text-justify">
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
                  You hold full command over your logs. To request a permanent structural purge of your contact index or submitted requirements, transmit a command to our Lead Architect at <a href="mailto:sawanforwork@gmail.com" className="text-accent-gold underline">sawanforwork@gmail.com</a>. Clearances are audited within 24 hours.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-900">
              <button 
                onClick={() => setShowPrivacy(false)}
                className="w-full py-2.5 bg-accent-gold text-white font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-accent-gold/90 transition-colors cursor-pointer"
              >
                Dismiss Secure Policy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TERMS OF SERVICE MODAL */}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in text-[#FFFDF2]">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto space-y-5 animate-scale-up">
            <button 
              onClick={() => setShowTerms(false)}
              className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white cursor-pointer"
            >
              <X size={18} />
            </button>
            
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-accent-gold tracking-widest uppercase">AGENCY CHARTERS UNIT</span>
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
                className="w-full py-2.5 bg-accent-gold text-white font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-accent-gold/90 transition-colors cursor-pointer"
              >
                Acknowledge Agency Terms
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
