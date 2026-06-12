import React from "react";
import { Sparkles, Phone, Mail, MapPin, ExternalLink, Shield } from "lucide-react";
import { Logo } from "./Logo";

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
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

            <div className="flex gap-4 text-xs font-mono text-slate-400">
              <a href="/sitemap.xml" target="_blank" className="hover:text-white flex items-center gap-1">
                Sitemap.xml <ExternalLink size={10} />
              </a>
              <a href="/robots.txt" target="_blank" className="hover:text-white flex items-center gap-1">
                Robots.txt <ExternalLink size={10} />
              </a>
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
    </footer>
  );
}
