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
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
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
    // Persist auth state to localStorage
    localStorage.setItem("aura_auth_user", JSON.stringify(userProfile));
    localStorage.setItem("aura_auth_isAdmin", adminRole.toString());
  };

  const handleLogout = async () => {
    // Clear server-side session if needed
    const authToken = localStorage.getItem("aura_auth_token");
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authToken ? `Bearer ${authToken}` : ""
        },
        body: JSON.stringify({ userId: user?.id })
      });
    } catch (err) {
      console.warn("Logout API call failed:", err);
    }
    
    setUser(null);
    setIsAdmin(false);
    // Clear localStorage
    localStorage.removeItem("aura_auth_user");
    localStorage.removeItem("aura_auth_isAdmin");
    localStorage.removeItem("aura_auth_token");
    setCurrentPage("home");
  };

  // Restore auth state from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("aura_auth_user");
    const savedIsAdmin = localStorage.getItem("aura_auth_isAdmin");
    if (savedUser && savedIsAdmin) {
      try {
        setUser(JSON.parse(savedUser));
        const isAdminValue = savedIsAdmin === "true";
        setIsAdmin(isAdminValue);
        // Restore to admin page if they were logged in as admin
        if (isAdminValue) {
          setCurrentPage("admin");
        }
      } catch (err) {
        console.warn("Could not restore auth state:", err);
        localStorage.removeItem("aura_auth_user");
        localStorage.removeItem("aura_auth_isAdmin");
        localStorage.removeItem("aura_auth_token");
      }
    }
  }, []);

  // Auto-scroll to top when page updates
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

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
        
        {currentPage === "admin" && isAdmin && (
          <AdminDashboard onLogout={handleLogout} />
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
