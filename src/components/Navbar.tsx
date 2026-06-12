import React from "react";
import { Sparkles, Layout, ShieldCheck, Menu, X } from "lucide-react";
import { Logo } from "./Logo";

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  user: any;
  isAdmin: boolean;
  logout: () => void;
  openQuote: (service?: string) => void;
}

export default function Navbar({ currentPage, setCurrentPage, user, isAdmin, logout, openQuote }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Hidden admin access from main visitor list as requested!
  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Case Studies" },
    { id: "pricing", label: "Pricing" },
    { id: "about", label: "Our Story" },
    { id: "blog", label: "Insights" },
    { id: "contact", label: "Connect" },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full bg-secondary-ivory border-b border-light-gray/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop Layout - Stacked Branding (Centered) and Navigation Sections Row */}
        <div className="hidden md:flex flex-col items-center py-4 gap-4">
          
          {/* Top Line: Brand Centered, with Side CTA/Auth Buttons */}
          <div className="w-full flex items-center justify-between relative h-10">
            {/* Left Hand: Space container */}
            <div className="w-[240px] flex items-center">
            </div>

            {/* Brand Logo - PERFECTLY CENTERED */}
            <div 
              className="cursor-pointer absolute left-1/2 transform -translate-x-1/2" 
              onClick={() => setCurrentPage("home")}
            >
              <Logo variant="header" />
            </div>

            {/* Right Hand: Strategic Call CTA */}
            <div className="w-[380px] flex items-center justify-end gap-3">
              <button
                id="nav-cta-btn"
                onClick={() => openQuote()}
                className="px-4 py-2 bg-primary-navy hover:bg-accent-gold text-white font-semibold rounded-xl text-xs shadow-md shadow-primary-navy/10 hover:scale-[1.01] active:scale-[0.99] transition-all duration-250"
              >
                Book Free Strategy Call
              </button>
            </div>
          </div>

          {/* Bottom Line: Beautiful, spacious and centered Navigation Row */}
          <div className="w-full border-t border-black/5 pt-3 flex justify-center">
            <div className="flex items-center gap-1.5 bg-neutral-200/50 p-1 rounded-2xl border border-black/5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => setCurrentPage(item.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                    currentPage === item.id
                      ? "bg-primary-navy text-white shadow-sm"
                      : "text-slate hover:text-primary-navy hover:bg-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout - Clean, compact top header with hamburger */}
        <div className="md:hidden flex items-center justify-between h-16">
          <div className="cursor-pointer" onClick={() => setCurrentPage("home")}>
            <Logo variant="mobile" />
          </div>

          <div className="flex items-center gap-2">
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate hover:text-primary-navy rounded-lg hover:bg-black/5"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-black/5 bg-secondary-ivory px-4 py-6 space-y-4 shadow-xl">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-mob-${item.id}`}
                onClick={() => {
                  setCurrentPage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`py-3 px-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-left transition-all ${
                  currentPage === item.id ? "bg-primary-navy text-white" : "bg-black/5 text-primary-navy hover:bg-black/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <hr className="border-black/5" />

          <div className="flex flex-col gap-3">
            <button
              id="nav-mob-cta-btn"
              onClick={() => {
                openQuote();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 text-white text-center bg-accent-gold hover:bg-accent-gold/90 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md"
            >
              Book Free Strategy Call
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
