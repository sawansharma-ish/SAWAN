import React from "react";
import { Sparkles, Layout, LogIn, User, ShieldCheck, LogOut, Menu, X } from "lucide-react";
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
    <nav className="sticky top-0 z-40 w-full glass-effect border-b border-slate-200/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop Layout - Stacked Branding (Centered) and Navigation Sections Row */}
        <div className="hidden md:flex flex-col items-center py-4 gap-4">
          
          {/* Top Line: Brand Centered, with Side CTA/Auth Buttons */}
          <div className="w-full flex items-center justify-between relative h-10">
            {/* Left Hand: Optional Admin Panel Access */}
            <div className="w-[240px] flex items-center">
              {isAdmin && (
                <button
                  id="navbar-admin-dash"
                  onClick={() => setCurrentPage("admin")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-black text-[#FFFDF2] border border-black hover:bg-neutral-900 transition-colors"
                >
                  <ShieldCheck size={14} />
                  Admin Panel
                </button>
              )}
            </div>

            {/* Brand Logo - PERFECTLY CENTERED */}
            <div 
              className="cursor-pointer absolute left-1/2 transform -translate-x-1/2" 
              onClick={() => setCurrentPage("home")}
            >
              <Logo variant="header" />
            </div>

            {/* Right Hand: Auth or Client Portal Status + CTA CTA */}
            <div className="w-[340px] flex items-center justify-end gap-3.5">
              {user && (
                <div className="flex items-center gap-2.5 bg-[#FFFDF2] px-3 py-1.5 rounded-xl border border-black/10">
                  <span className="text-xs font-semibold text-black flex items-center gap-1">
                    <User size={13} className="text-black" />
                    {user.name.split(" ")[0]}
                  </span>
                  <button
                    id="navbar-dash-link"
                    onClick={() => setCurrentPage("dashboard")}
                    className="px-2.5 py-1 bg-black hover:bg-neutral-900 text-[#FFFDF2] text-[11px] font-medium rounded-lg transition-all"
                  >
                    Portal
                  </button>
                  <button
                    id="navbar-logout-btn"
                    onClick={logout}
                    className="p-1 hover:text-red-650 text-slate-500 transition-colors rounded-lg hover:bg-black/5"
                    title="Logout"
                  >
                    <LogOut size={13} />
                  </button>
                </div>
              )}

              {!user && (
                <button
                  id="nav-login-btn"
                  onClick={() => setCurrentPage("login")}
                  className="px-4 py-2 bg-[#FFFDF2] hover:bg-white text-black font-semibold rounded-xl text-xs shadow-md shadow-black/10 hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  ADMIN Portal
                </button>
              )}

              <button
                id="nav-cta-btn"
                onClick={() => openQuote()}
                className="px-4 py-2 bg-black hover:bg-neutral-900 text-[#FFFDF2] font-semibold rounded-xl text-xs shadow-md shadow-black/10 hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                Get Free Estimate
              </button>
            </div>
          </div>

          {/* Bottom Line: Beautiful, spacious and centered Navigation Row */}
          <div className="w-full border-t border-black/10 pt-3 flex justify-center">
            <div className="flex items-center gap-1.5 bg-black/5 p-1 rounded-2xl border border-black/5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => setCurrentPage(item.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                    currentPage === item.id
                      ? "bg-black text-[#FFFDF2] shadow-sm"
                      : "text-slate-650 hover:text-black hover:bg-black/5"
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
            {isAdmin && (
              <button
                id="nav-mobile-admin-badge"
                onClick={() => setCurrentPage("admin")}
                className="p-1.5 rounded-lg text-violet-700 bg-violet-100"
              >
                <ShieldCheck size={16} />
              </button>
            )}
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-755 hover:text-slate-950 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-black/10 bg-[#FFFDF2] px-4 py-6 space-y-4 shadow-xl">
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
                  currentPage === item.id ? "bg-black text-[#FFFDF2]" : "bg-black/5 text-black hover:bg-black/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <hr className="border-black/10" />

          <div className="flex flex-col gap-3">
            {user && (
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-[#FFFDF2] rounded-xl border border-black/10">
                  <span className="text-sm font-semibold text-black flex items-center gap-1.5">
                    <User size={16} className="text-black" />
                    {user.name}
                  </span>
                  <button
                    id="mob-logout-btn"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs text-red-650 font-bold"
                  >
                    Logout
                  </button>
                </div>
                <button
                  id="nav-mob-dash-link"
                  onClick={() => {
                    setCurrentPage("dashboard");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2.5 bg-black text-[#FFFDF2] rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Client Portal Dashboard
                </button>
              </div>
            )}

            <button
              id="nav-mob-cta-btn"
              onClick={() => {
                openQuote();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 text-center bg-black text-[#FFFDF2] rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:bg-neutral-900"
            >
              Get Free Conversion Proposal
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
