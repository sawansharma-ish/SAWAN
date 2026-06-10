import React, { useState } from "react";
import { Sparkles, Loader2, LogIn, ArrowRight, ShieldAlert, KeyRound, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "../components/Logo";

interface LoginProps {
  onLoginSuccess: (user: any, isAdmin: boolean) => void;
  setCurrentPage: (page: string) => void;
}

export default function Login({ onLoginSuccess, setCurrentPage }: LoginProps) {
  const [formType, setFormType] = useState<"signin" | "signup" | "reset">("signin");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Input states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Multi-step OTP States for secure 2FA reset
  const [resetStep, setResetStep] = useState<1 | 2 | 3>(1);
  const [otpCode, setOtpCode] = useState("");
  const [devModeOtp, setDevModeOtp] = useState<string | null>(null);
  const [verificationSuccessMsg, setVerificationSuccessMsg] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setErrorMsg("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        onLoginSuccess(data.user, data.isAdmin);
        setCurrentPage(data.isAdmin ? "admin" : "dashboard");
      } else {
        setErrorMsg(data.error || "Login credentials were not recognized.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network latency bounds exceeded. Please repeat shortly.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) return;

    setLoading(true);
    setErrorMsg("");
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        onLoginSuccess(data.user, false);
        setCurrentPage("dashboard");
      } else {
        setErrorMsg(data.error || "Registration rejected. Duplicate catalog emails trace.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Registration server error.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMsg("");
    setDevModeOtp(null);
    setVerificationSuccessMsg("");
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setDevModeOtp(data.devModeOtp || null);
        setResetStep(2);
        setVerificationSuccessMsg("Security verification code dispatched successfully.");
      } else {
        setErrorMsg(data.error || "No client or administrator file matches that email.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network latency bounds exceeded. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !otpCode) return;

    setLoading(true);
    setErrorMsg("");
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otpCode })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setResetStep(3);
        setVerificationSuccessMsg("OTP verified successfully. Create your new passcode override.");
      } else {
        setErrorMsg(data.error || "Incorrect OTP code. Please trace and retry.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Verification failure. Check connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !newPassword || !otpCode) return;

    setLoading(true);
    setErrorMsg("");
    try {
      const response = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword, code: otpCode })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        alert("Passcode updated successfully! Sign in with your new password.");
        setFormType("signin");
        setResetStep(1);
        setOtpCode("");
        setDevModeOtp(null);
        setPassword("");
        setNewPassword("");
        setVerificationSuccessMsg("");
      } else {
        setErrorMsg(data.error || "Failed resetting passcode.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network failure updating passcode.");
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
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white">Sign In Portal</h2>
            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Secure Access Center</p>
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
                    Sign In to Portal <LogIn size={14} />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  id="trigger-signup"
                  type="button"
                  onClick={() => {
                    setFormType("signup");
                    setErrorMsg("");
                  }}
                  className="text-slate-400 text-xs hover:text-white transition-colors"
                >
                  New Client Member? <span className="text-violet-400 font-semibold underline">Register here</span>
                </button>
              </div>
            </motion.form>
          )}

          {formType === "signup" && (
            <motion.form
              key="signup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleSignUp}
              className="space-y-4"
            >
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase">Full Corporate Name</label>
                <input
                  id="reg-name"
                  type="text"
                  required
                  placeholder="e.g. Vikram Mehta"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-violet-500 focus:outline-none text-white transition-all placeholder-slate-600"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase">Professional Email</label>
                <input
                  id="reg-email"
                  type="email"
                  required
                  placeholder="e.g. vikram@mehtadentistry.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-violet-500 focus:outline-none text-white transition-all placeholder-slate-600"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase">WhatsApp Contact No</label>
                <input
                  id="reg-phone"
                  type="tel"
                  required
                  placeholder="e.g. +91 99000 77777"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-violet-500 focus:outline-none text-white transition-all placeholder-slate-600"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase">Secure Password Code</label>
                <input
                  id="reg-password"
                  type="password"
                  required
                  placeholder="Create strong passcode"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-violet-500 focus:outline-none text-white transition-all placeholder-slate-600"
                />
              </div>

              <button
                id="signup-btn"
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold rounded-xl text-xs transition-transform flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-violet-500/10"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={14} />
                    Composing Client Profile Logs...
                  </>
                ) : (
                  <>
                    Complete Registration <UserPlus size={14} />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  id="trigger-signin-back"
                  type="button"
                  onClick={() => {
                    setFormType("signin");
                    setErrorMsg("");
                  }}
                  className="text-slate-400 text-xs hover:text-white transition-colors"
                >
                  Already registered? <span className="text-violet-400 font-semibold underline">Login now</span>
                </button>
              </div>
            </motion.form>
          )}

          {formType === "reset" && (
            <motion.div
              key="reset"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold font-sans text-white flex items-center gap-1.5">
                  <KeyRound size={16} className="text-violet-400" />
                  Forgot Passcode Reset
                </h3>
                <span className="text-[10px] bg-violet-950 text-violet-300 font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Step {resetStep} of 3
                </span>
              </div>

              {verificationSuccessMsg && !errorMsg && (
                <div className="bg-emerald-950/40 border border-emerald-900 text-emerald-300 rounded-xl p-3 text-xs flex items-center gap-2">
                  <Sparkles size={14} className="flex-shrink-0 text-emerald-400 animate-pulse" />
                  <p>{verificationSuccessMsg}</p>
                </div>
              )}

              {resetStep === 1 && (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-semibold text-slate-450">Registered Corporate Email</label>
                    <input
                      id="reset-email"
                      type="email"
                      required
                      placeholder="Enter registered account email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-violet-500 focus:outline-none text-white transition-all placeholder-slate-600"
                    />
                  </div>

                  <button
                    id="otp-send-btn"
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs transition-transform flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-violet-500/10"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={14} />
                        Generating secure code...
                      </>
                    ) : (
                      <>
                        Send 2FA OTP Code <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </form>
              )}

              {resetStep === 2 && (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase font-semibold text-slate-450">Enter 6-Digit OTP Code</label>
                      <button
                        type="button"
                        onClick={() => {
                          setResetStep(1);
                          setOtpCode("");
                          setDevModeOtp(null);
                          setErrorMsg("");
                          setVerificationSuccessMsg("");
                        }}
                        className="text-[10px] text-violet-400 hover:text-white transition-colors uppercase font-mono"
                      >
                        Change Email
                      </button>
                    </div>

                    <input
                      id="reset-otp"
                      type="text"
                      required
                      maxLength={6}
                      placeholder="e.g. 141788"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-lg font-mono font-bold tracking-[0.5em] text-center focus:ring-1 focus:ring-violet-500 focus:outline-none text-white transition-all placeholder-slate-700"
                    />
                  </div>

                  {devModeOtp && (
                    <div className="bg-emerald-950/40 border border-emerald-900/60 rounded-xl p-3 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px] uppercase tracking-wider">
                        <Sparkles size={12} className="text-emerald-400 animate-pulse" /> Security OTP Broadcast (Demo Mode)
                      </div>
                      <p className="text-slate-300">
                        Use this generated OTP to complete security step:{" "}
                        <strong className="text-white text-sm font-mono tracking-widest select-all bg-black/40 px-2 py-0.5 rounded border border-emerald-800/60">
                          {devModeOtp}
                        </strong>
                      </p>
                    </div>
                  )}

                  <button
                    id="otp-verify-btn"
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs transition-transform flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-violet-500/10"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={14} />
                        Verifying secure token...
                      </>
                    ) : (
                      <>
                        Verify Code & Proceed <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </form>
              )}

              {resetStep === 3 && (
                <form onSubmit={handleReset} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-semibold text-slate-450">New Passcode Choice</label>
                    <input
                      id="reset-newpassword"
                      type="password"
                      required
                      placeholder="Enter robust new password"
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
                </form>
              )}

              <div className="text-center pt-2">
                <button
                  id="trigger-signin-cancel"
                  type="button"
                  onClick={() => {
                    setFormType("signin");
                    setResetStep(1);
                    setOtpCode("");
                    setDevModeOtp(null);
                    setErrorMsg("");
                    setVerificationSuccessMsg("");
                  }}
                  className="text-slate-400 text-xs hover:text-white transition-colors"
                >
                  Cancel operations & return to login
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
