import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import AnalyticsTracker from "./components/AnalyticsTracker";
import LeadCaptureModal from "./components/LeadCaptureModal";

// Interactive page sections
import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import ClientDashboard from "./pages/ClientDashboard";

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    // Parse path on initial load for SEO-perfect deep linking
    const path = window.location.pathname.toLowerCase().replace(/^\/|\/$/g, "");
    const validPages = ["services", "portfolio", "pricing", "about", "blog", "contact", "login", "dashboard"];
    if (validPages.includes(path)) {
      return path;
    }
    return "home";
  });
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Quote popup trigger
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState("");

  const handleOpenQuote = (service?: string) => {
    if (service) {
      setPreselectedService(service);
    } else {
      setPreselectedService("");
    }
    setIsQuoteOpen(true);
  };

  const handleLoginSuccess = (userProfile: any, adminRole: boolean) => {
    setUser(userProfile);
    setIsAdmin(adminRole);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    setCurrentPage("home");
  };

  // Auto-scroll to top when page updates
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Synchronize state with incoming path changes via browser history buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase().replace(/^\/|\/$/g, "");
      const validPages = ["services", "portfolio", "pricing", "about", "blog", "contact", "login", "dashboard"];
      if (path && validPages.includes(path)) {
        setCurrentPage(path);
      } else {
        setCurrentPage("home");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Push path changes back to the browser's URL address bar seamlessly
  useEffect(() => {
    const targetPath = currentPage === "home" ? "/" : `/${currentPage}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ page: currentPage }, "", targetPath);
    }
  }, [currentPage]);

  // Hidden admin access from query parameters or hash tag routing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("login") || params.get("admin") === "login" || window.location.hash === "#login") {
      setCurrentPage("login");
    }
  }, []);

  // Handle updates of profile from Client Dashboard
  const handleUpdateProfile = (updatedUser: any) => {
    setUser(updatedUser);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF2] font-sans text-black selection:bg-black/10 selection:text-black">
      
      {/* 1. Track IP and page metrics */}
      <AnalyticsTracker currentPage={currentPage} />

      {/* 2. Top presentational Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        user={user}
        isAdmin={isAdmin}
        logout={handleLogout}
        openQuote={handleOpenQuote}
      />

      {/* 3. Operational views hub content */}
      <main className="flex-1">
        {currentPage === "home" && (
          <Home
            setCurrentPage={setCurrentPage}
            openQuote={handleOpenQuote}
          />
        )}
        
        {currentPage === "services" && (
          <Services openQuote={handleOpenQuote} />
        )}
        
        {currentPage === "portfolio" && (
          <Portfolio />
        )}
        
        {currentPage === "pricing" && (
          <Pricing openQuote={handleOpenQuote} />
        )}
        
        {currentPage === "about" && (
          <About />
        )}
        
        {currentPage === "blog" && (
          <Blog />
        )}
        
        {currentPage === "contact" && (
          <Contact />
        )}
        
        {currentPage === "login" && (
          <Login
            onLoginSuccess={handleLoginSuccess}
            setCurrentPage={setCurrentPage}
          />
        )}
        
        {currentPage === "dashboard" && (
          <ClientDashboard
            user={user}
            onUpdateProfile={handleUpdateProfile}
          />
        )}
      </main>

      {/* 4. Bottom presentational Footer directories and JSON schema */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* 5. Persistent CRO elements widgets */}
      <FloatingWhatsApp />

      {/* 6. Contact lead audit modals capture layer */}
      <LeadCaptureModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        preselectedService={preselectedService}
      />

    </div>
  );
}
