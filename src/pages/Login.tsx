import React, { useState } from "react";
import { Loader2, LogIn, ShieldAlert, KeyRound } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "../components/Logo";

interface LoginProps {
  onLoginSuccess: (user: any, isAdmin: boolean) => void;
  setCurrentPage: (page: string) => void;
}

// Helper function to add timeout to fetch requests
function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  return fetch(url, {
    ...options,
    signal: controller.signal
  }).finally(() => clearTimeout(timeoutId));
}

export default function Login({ onLoginSuccess, setCurrentPage }: LoginProps) {
  const [formType, setFormType] = useState<"signin" | "reset">("signin");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setErrorMsg("");
    try {
      const response = await fetchWithTimeout("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      }, 10000);
      const data = await response.json();
      if (response.ok && data.success) {
        // Store auth token if admin
        if (data.authToken) {
          localStorage.setItem("aura_auth_token", data.authToken);
        }
        onLoginSuccess(data.user, data.isAdmin);
        setCurrentPage(data.isAdmin ? "admin" : "dashboard");
      } else {
        setErrorMsg(data.error || "Login credentials were not recognized.");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.name === "AbortError") {
        setErrorMsg("Request timeout. Server took too long to respond. Please try again.");
      } else {
        setErrorMsg("Network error. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !newPassword) return;

    setLoading(true);
    setErrorMsg("");
    try {
      const response = await fetchWithTimeout("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword })
      }, 10000);
      const data = await response.json();
      if (response.ok && data.success) {
        alert("Passcode updated successfully! Sign in with your new password.");
        setFormType("signin");
        setPassword("");
      } else {
        setErrorMsg(data.error || "No client record matches that email.");
      }
    } catch (err: any) {
      console.error("Reset error:", err);
      if (err.name === "AbortError") {
        setErrorMsg("Request timeout. Server took too long to respond. Please try again.");
      } else {
        setErrorMsg("Network failure updating passcode.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0F172A] text-white min-h-screen pt-20 pb-16 flex items-center justify-center px-4 font-sans relative overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 relative z-10 shadow-2xl space-y-6">
        
        {/* Brand identity */}
        <div className="text-center space-y-3 flex flex-col items-center justify-center">
          <Logo variant="footer" />
          <div className="space-y-1 text-center">
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white">ADMIN Sign In</h2>
            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Secure Admin Access</p>
          </div>
        </div>

        {errorMsg && (
          <div className="bg-red-950/50 border border-red-900 text-red-300 rounded-xl p-3 text-xs flex items-start gap-2">
            <ShieldAlert size={14} className="mt-0.5 flex-shrink-0" />
            <p>{errorMsg}</p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {formType === "signin" && (
            <motion.form
              key="signin"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleSignIn}
              className="space-y-4"
            >
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase">Registered Email Address</label>
                <input
                  id="login-email"
                  type="email"
                  required
                  placeholder="e.g. user@demo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-violet-500 focus:outline-none text-white transition-all placeholder-slate-600"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[10px] font-mono text-slate-400 uppercase">Login Passcode</label>
                  <button
                    id="trigger-forgot-pw"
                    type="button"
                    onClick={() => {
                      setFormType("reset");
                      setErrorMsg("");
                    }}
                    className="text-[10px] text-violet-400 hover:text-white transition-colors uppercase font-mono"
                  >
                    Forgot passcode?
                  </button>
                </div>
                <input
                  id="login-password"
                  type="password"
                  required
                  placeholder="e.g. password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-violet-500 focus:outline-none text-white transition-all placeholder-slate-600"
                />
              </div>

              <button
                id="signin-btn"
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs transition-transform flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-violet-500/10"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={14} />
                    Validating Vault Token...
                  </>
                ) : (
                  <>
                    ADMIN Sign In <LogIn size={14} />
                  </>
                )}
              </button>

            </motion.form>
          )}

          {formType === "reset" && (
            <motion.form
              key="reset"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleReset}
              className="space-y-4"
            >
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase">Registered Email</label>
                <input
                  id="reset-email"
                  type="email"
                  required
                  placeholder="Enter registered profile email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-violet-500 focus:outline-none text-white transition-all placeholder-slate-600"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase">New Passcode Choice</label>
                <input
                  id="reset-newpassword"
                  type="password"
                  required
                  placeholder="Enter direct new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-violet-500 focus:outline-none text-white transition-all"
                />
              </div>

              <button
                id="reset-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl text-xs transition-transform flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={14} />
                    Resetting passcode...
                  </>
                ) : (
                  <>
                    Initialize Password Override <KeyRound size={14} />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  id="trigger-signin-cancel"
                  type="button"
                  onClick={() => {
                    setFormType("signin");
                    setErrorMsg("");
                  }}
                  className="text-slate-400 text-xs hover:text-white transition-colors"
                >
                  Cancel operations
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
