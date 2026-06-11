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
    <footer className="bg-black text-neutral-400 font-sans border-t border-neutral-900 pt-16 pb-8">
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
            
            <p className="text-sm leading-relaxed text-neutral-400 font-sans">
              We help premium local salons, gyms, medical clinics, restaurants, and startups dominate their market with high-converting custom web architectures, instant reservation systems, local map positioning, and robust analytics integrations.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs font-mono text-[#FFFDF2] tracking-wider uppercase font-bold">
              <span className="h-2 w-2 rounded-full bg-[#FFFDF2] animate-pulse"></span>
              ACTIVE ACROSS METROS & REGIONS
            </div>
          </div>

          {/* Col 2: Targets */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm tracking-wider uppercase">Industries We Scale</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setCurrentPage("services")} className="transition-colors cursor-pointer text-left bg-transparent text-neutral-400 hover:text-neutral-200">Clinics & Medical Doctors</button></li>
              <li><button onClick={() => setCurrentPage("services")} className="transition-colors cursor-pointer text-left bg-transparent text-neutral-400 hover:text-neutral-200">Fitness Gyms & Studios</button></li>
              <li><button onClick={() => setCurrentPage("services")} className="transition-colors cursor-pointer text-left bg-transparent text-neutral-400 hover:text-neutral-200">Beauty Salons & Spa Centres</button></li>
              <li><button onClick={() => setCurrentPage("services")} className="transition-colors cursor-pointer text-left bg-transparent text-neutral-400 hover:text-neutral-200">Restaurants & Food Bistros</button></li>
              <li><button onClick={() => setCurrentPage("services")} className="transition-colors cursor-pointer text-left bg-transparent text-neutral-400 hover:text-neutral-200">Real Estate & Luxury Agents</button></li>
              <li><button onClick={() => setCurrentPage("services")} className="transition-colors cursor-pointer text-left bg-transparent text-neutral-400 hover:text-neutral-200">Local Service Providers</button></li>
            </ul>
          </div>

          {/* Col 3: Sitemap Navigation */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm tracking-wider uppercase">Quick Hub</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setCurrentPage("home")} className="transition-colors cursor-pointer text-left bg-transparent text-neutral-400 hover:text-neutral-200">Home Page</button></li>
              <li><button onClick={() => setCurrentPage("services")} className="transition-colors cursor-pointer text-left bg-transparent text-neutral-400 hover:text-neutral-200">Core Systems & Services</button></li>
              <li><button onClick={() => setCurrentPage("portfolio")} className="transition-colors cursor-pointer text-left bg-transparent text-neutral-400 hover:text-neutral-200">Client Case Studies</button></li>
              <li><button onClick={() => setCurrentPage("pricing")} className="transition-colors cursor-pointer text-left bg-transparent text-neutral-400 hover:text-neutral-200">Investment Packages</button></li>
              <li><button onClick={() => setCurrentPage("about")} className="transition-colors cursor-pointer text-left bg-transparent text-neutral-400 hover:text-neutral-200">Our Design Philosophy</button></li>
              <li><button onClick={() => setCurrentPage("blog")} className="transition-colors cursor-pointer text-left bg-transparent text-neutral-400 hover:text-neutral-200">Growth Blog Insights</button></li>
              <li><button onClick={() => setCurrentPage("contact")} className="transition-colors cursor-pointer text-left bg-transparent text-neutral-400 hover:text-neutral-200">Claim Free Audit</button></li>
              <li><button onClick={() => setCurrentPage("login")} className="transition-colors cursor-pointer text-left bg-transparent text-[#66fcf1] hover:text-[#66fcf1]/80 font-bold uppercase tracking-wider text-[11px] mt-2 block">Client & Staff Workspace login</button></li>
            </ul>
          </div>

          {/* Col 4: Reach Us */}
          <div className="space-y-4 text-sm">
            <h4 className="font-display font-semibold text-white text-sm tracking-wider uppercase">Agency Chambers</h4>
            
            <div className="flex items-start gap-2.5">
              <MapPin size={16} className="text-white mt-1 flex-shrink-0" />
              <p>C-236 Main Road, Ganga Vihar, Gokalpuri, Delhi 110094</p>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone size={16} className="text-white flex-shrink-0" />
              <a href="tel:+918929757028" className="hover:text-white transition-colors">+91 89297 57028 (Sales)</a>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail size={16} className="text-white flex-shrink-0" />
              <a href="mailto:sawanforwork@gmail.com" className="hover:text-white transition-colors">sawanforwork@gmail.com</a>
            </div>

            <hr className="border-neutral-900 my-2" />

            <div className="flex gap-4 text-xs font-mono">
              <a href="/sitemap.xml" target="_blank" className="hover:text-white flex items-center gap-1">
                Sitemap.xml <ExternalLink size={10} />
              </a>
              <a href="/robots.txt" target="_blank" className="hover:text-white flex items-center gap-1">
                Robots.txt <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-neutral-900 mb-8" />

        {/* Outer credit */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <p>© 2026 AURA WEB Inc. All rights reserve-shielded. ROI optimized for Google Local Packs.</p>
          <div className="flex items-center gap-2 text-[10px] text-neutral-400 border border-neutral-900 bg-neutral-950 px-3 py-1.5 rounded-lg">
            <Shield size={12} className="text-white" />
            ISO 27001 & SOC-2 COMPLIANT PLATFORM
          </div>
        </div>
      </div>
    </footer>
  );
}
