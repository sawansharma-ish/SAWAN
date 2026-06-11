import React, { useState, useEffect } from "react";
import { Sparkles, Loader2, LogIn, ArrowRight, ShieldAlert, KeyRound, UserPlus, Eye, EyeOff, Clipboard, Check } from "lucide-react";
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
  const [successBannerMsg, setSuccessBannerMsg] = useState("");

  // standard inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // 2FA login/setup screens
  const [twoFactorState, setTwoFactorState] = useState<"none" | "setup" | "verify">("none");
  const [twoFactorSecret, setTwoFactorSecret] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [devTotp, setDevTotp] = useState("");

  // Secure Password Reset steps
  const [resetTokenInput, setResetTokenInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);

  // Parse token from secure recovery link
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("resetToken");
    const mail = params.get("email");
    if (token && mail) {
      setFormType("reset");
      setEmail(mail);
      setResetTokenInput(token);
      setSuccessBannerMsg("Passcode recovery link recognized! Please config your new credentials matching enterprise complexity.");
    }
  }, []);

  const handleCopySecret = () => {
    navigator.clipboard.writeText(twoFactorSecret);
    setCopiedSecret(true);
    setTimeout(() => setCopiedSecret(false), 2000);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setErrorMsg("");
    setSuccessBannerMsg("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password })
      });
      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.error || "Login credentials were not recognized.");
        setLoading(false);
        return;
      }

      if (data.requireTwoFactor) {
        // Step 2 Verification needed
        setTwoFactorState("verify");
        setDevTotp(data.devTotp || "");
        setSuccessBannerMsg(data.message);
      } else if (data.requireTwoFactorSetup) {
        // First-time administrator 2FA setup forced
        setTwoFactorState("setup");
        setTwoFactorSecret(data.twoFactorSecret);
        setQrCodeUrl(data.qrCodeUrl);
        setDevTotp(data.devTotp || "");
        setSuccessBannerMsg(data.message);
      } else {
        // Standard client login instant resolution
        localStorage.setItem("aura_admin_token", data.token);
        localStorage.setItem("aura_user_role", data.user.role || "Client");
        onLoginSuccess(data.user, false);
        setCurrentPage("dashboard");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network bounds exceeded. Check server state.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !totpCode) return;

    setLoading(true);
    setErrorMsg("");
    setSuccessBannerMsg("");

    try {
      const isSetup = twoFactorState === "setup";
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), code: totpCode, isSetup })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("aura_admin_token", data.token);
        localStorage.setItem("aura_user_role", data.user.role || "Staff");
        onLoginSuccess(data.user, data.isAdmin);
        setCurrentPage(data.isAdmin ? "admin" : "dashboard");
      } else {
        setErrorMsg(data.error || "Incorrect 2FA verification code. Check clock sync and retry.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Authentication server error.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) return;

    setLoading(true);
    setErrorMsg("");
    setSuccessBannerMsg("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: email.trim(), phone, password })
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

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMsg("");
    setSuccessBannerMsg("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessBannerMsg(data.message);
        if (data.devToken) {
          setResetTokenInput(data.devToken);
          // Auto fill form to help local review sandbox
          setTimeout(() => {
            alert(`[SANDBOX TEST HELPER] Secure Recovery Token generated for local review: ${data.devToken}. Form fields prepopulated.`);
          }, 300);
        }
      } else {
        setErrorMsg(data.error || "Failed resetting passcode.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Database retrieval timed out.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !resetTokenInput || !newPasswordInput) return;

    // Check complexity rule client side for immediate visual assistance
    const rule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{12,}$/;
    if (!rule.test(newPasswordInput)) {
      setErrorMsg("Password policy rejected: Minimum 12 characters, including 1 uppercase, 1 lowercase, 1 numeric digit, and 1 special symbol.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessBannerMsg("");

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          token: resetTokenInput.trim(),
          newPassword: newPasswordInput
        })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessBannerMsg("Credentials updated successfully! Use your new secure password to sign in.");
        setFormType("signin");
        setPassword("");
        setNewPasswordInput("");
        setResetTokenInput("");
      } else {
        setErrorMsg(data.error || "Failed override credentials state.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Security gateway override connection issue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0b0c10] text-[#c5c6c7] min-h-screen pt-24 pb-16 flex items-center justify-center px-4 font-sans relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#66fcf1]/5 rounded-full blur-[120px] pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#45f3ff]/5 rounded-full blur-[120px] pointer-events-none -ml-20 -mb-20"></div>

      <div className="w-full max-w-md bg-[#1f2833]/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 sm:p-8 relative z-10 shadow-2xl space-y-6">
        
        {/* Brand identity header */}
        <div className="text-center space-y-3 flex flex-col items-center justify-center">
          <Logo variant="footer" />
          <div className="space-y-1">
            <h2 className="font-sans font-semibold tracking-tight text-xl sm:text-2xl text-white">
              {twoFactorState !== "none" ? "2-Factor Security Verification" : formType === "signin" ? "AURA SECURE PORTAL" : formType === "signup" ? "Create Client Profile" : "Passcode Override Reset"}
            </h2>
            <p className="text-[10px] text-[#66fcf1] font-mono uppercase tracking-widest font-bold">
              {twoFactorState === "setup" ? "INITIAL SETUP ENFORCELAYER" : twoFactorState === "verify" ? "TOTP SECURITY GATEWAY" : "ENTERPRISE LOCKS GUARD"}
            </p>
          </div>
        </div>

        {errorMsg && (
          <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} className="bg-red-950/40 border border-red-900/60 text-red-300 rounded-xl p-3.5 text-xs flex items-start gap-2.5">
            <ShieldAlert size={16} className="mt-0.5 flex-shrink-0 text-red-400" />
            <p className="leading-relaxed">{errorMsg}</p>
          </motion.div>
        )}

        {successBannerMsg && (
          <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} className="bg-cyan-950/30 border border-[#66fcf1]/30 text-teal-200 rounded-xl p-3.5 text-xs flex items-start gap-2.5">
            <Sparkles size={16} className="mt-0.5 flex-shrink-0 text-[#66fcf1]" />
            <p className="leading-relaxed">{successBannerMsg}</p>
          </motion.div>
        )}

        {/* Dynamic authenticators container */}
        <AnimatePresence mode="wait">
          {twoFactorState !== "none" ? (
            <motion.form
              key="totpform"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleVerifyOtp}
              className="space-y-5"
            >
              {twoFactorState === "setup" && (
                <div className="space-y-4 bg-slate-900/60 border border-slate-800 p-4 rounded-2xl text-center">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Scan this QR code using Google Authenticator, Microsoft Authenticator, or Authy:
                  </p>
                  
                  {qrCodeUrl && (
                    <div className="mx-auto w-44 h-44 bg-white p-2 rounded-xl border border-slate-700 flex items-center justify-center">
                      <img src={qrCodeUrl} alt="2FA QR Code" className="w-full h-full" referrerPolicy="no-referrer" />
                    </div>
                  )}

                  <div className="space-y-1.5 pt-1">
                    <p className="text-[10px] text-slate-400 font-mono uppercase">Setup Security Secret Key</p>
                    <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5">
                      <code className="text-xs font-mono text-[#66fcf1] tracking-wider select-all">{twoFactorSecret}</code>
                      <button type="button" onClick={handleCopySecret} className="text-slate-400 hover:text-white p-1">
                        {copiedSecret ? <Check size={14} className="text-emerald-400" /> : <Clipboard size={14} />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold tracking-wider">
                  Enter 6-Digit Authenticator App Code
                </label>
                <input
                  id="totp-auth-code"
                  type="text"
                  required
                  maxLength={6}
                  placeholder="e.g. 058392"
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ""))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-center text-lg font-mono tracking-widest focus:ring-1 focus:ring-[#66fcf1] focus:outline-none text-white transition-all placeholder-slate-700"
                />
              </div>

              {/* Informative Sandbox Debugger & Explanation Card */}
              <div className="bg-[#0f131a] border border-[#1f2833] p-4 rounded-2xl text-left space-y-3 text-xs">
                <div className="space-y-1">
                  <p className="text-[10px] text-[#66fcf1] font-mono uppercase tracking-widest font-bold flex items-center gap-1.5">
                    <KeyRound size={11} /> Where is my 6-Digit App Code?
                  </p>
                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    <strong>📱 Real-World Method:</strong> Open your authenticator app (e.g. <strong>Google Authenticator</strong>, <strong>Microsoft Authenticator</strong>, or <strong>Authy</strong>) on your tablet or smartphone. Scan the QR code shown above (or copy the secret key). The app starts generating a real-time 6-digit code that cycles every 30 seconds.
                  </p>
                </div>
                
                {devTotp && (
                  <div className="pt-3 border-t border-slate-800/80 space-y-2">
                    <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                      <strong>⚡ Sandbox Dev-Bypass Helper:</strong>
                      <br />
                      Since we're in a local preview sandbox environment, we calculated the active authenticator code for you. Clicking either button will auto-fill the field above!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        type="button"
                        onClick={() => setTotpCode(devTotp)}
                        className="flex-1 py-2 px-2.5 bg-cyan-950/50 hover:bg-cyan-950 text-[#66fcf1] border border-[#66fcf1]/30 rounded-xl font-mono text-[11px] font-bold text-center transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        title="Click to automatically load current TOTP sequence"
                      >
                        Active OTP: <span className="underline tracking-widest bg-slate-950 px-1.5 py-0.5 rounded text-white font-black">{devTotp}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setTotpCode("123456")}
                        className="py-2 px-3 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl font-mono text-[11px] text-center transition-colors cursor-pointer"
                        title="Click to bypass using sandbox master code "
                      >
                        Bypass: <span className="font-extrabold text-white">123456</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                id="verify-otp-btn"
                type="submit"
                disabled={loading || totpCode.length !== 6}
                className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-[#66fcf1] hover:from-teal-400 hover:to-cyan-400 text-slate-900 font-bold rounded-xl text-xs transition-transform flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-teal-500/10"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={14} />
                    Validating Authenticator Key...
                  </>
                ) : (
                  <>
                    Verify & Access Dashboard <LogIn size={14} />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setTwoFactorState("none");
                  setTotpCode("");
                }}
                className="w-full text-center text-[10px] text-slate-500 hover:text-slate-300 font-mono uppercase"
              >
                Go Back to Username Login
              </button>
            </motion.form>
          ) : formType === "signin" ? (
            <motion.form
              key="signin"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleSignIn}
              className="space-y-4"
            >
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold tracking-wider">Registered Email Address</label>
                <input
                  id="login-email"
                  type="email"
                  required
                  placeholder="e.g. sawanforwork@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#66fcf1] focus:outline-none text-white transition-all placeholder-slate-700"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">Passcode Credentials</label>
                  <button
                    id="trigger-forgot-pw"
                    type="button"
                    onClick={() => {
                      setFormType("reset");
                      setErrorMsg("");
                      setSuccessBannerMsg("");
                    }}
                    className="text-[10px] text-[#66fcf1] hover:text-white transition-colors uppercase font-mono font-bold"
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
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#66fcf1] focus:outline-none text-white transition-all placeholder-slate-700"
                />
              </div>

              <button
                id="signin-btn"
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-[#66fcf1] hover:from-teal-400 hover:to-cyan-400 text-slate-900 font-bold rounded-xl text-xs transition-transform flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-teal-500/10"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={14} />
                    Securing Authentication Gateway...
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
                    setSuccessBannerMsg("");
                  }}
                  className="text-slate-400 text-xs hover:text-white transition-colors"
                >
                  New Client Member? <span className="text-[#66fcf1] font-semibold underline ml-1">Register here</span>
                </button>
              </div>

              <div className="pt-4 border-t border-slate-900 mt-4 space-y-2.5">
                <div className="p-3.5 bg-slate-950/85 border border-[#1f2833] rounded-xl space-y-2 text-left">
                  <p className="text-[10px] text-[#66fcf1] font-mono uppercase tracking-widest font-bold flex items-center gap-1.5">
                    <KeyRound size={11} /> Administrative Access Portal
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Sawan Sharma's account is seeded as Super Admin. Click below to load administrator credentials into the gateway.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail("sawanforwork@gmail.com");
                      setPassword("password");
                      setSuccessBannerMsg("Admin credentials loaded successfully! Click the 'Sign In to Portal' button above.");
                    }}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-xs text-[#66fcf1] border border-[#66fcf1]/20 hover:border-[#66fcf1]/40 rounded-lg font-mono font-bold transition-all uppercase tracking-wider text-center cursor-pointer"
                  >
                    ⚡ Auto-Fill Admin Credentials
                  </button>
                </div>
              </div>
            </motion.form>
          ) : formType === "signup" ? (
            <motion.form
              key="signup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleSignUp}
              className="space-y-4"
            >
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold tracking-wider">Full Corporate Name</label>
                <input
                  id="reg-name"
                  type="text"
                  required
                  placeholder="e.g. Sawan Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#66fcf1] focus:outline-none text-white transition-all placeholder-slate-700"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold tracking-wider">Professional Email</label>
                <input
                  id="reg-email"
                  type="email"
                  required
                  placeholder="e.g. client@demo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#66fcf1] focus:outline-none text-white transition-all placeholder-slate-700"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold tracking-wider">WhatsApp Contact No</label>
                <input
                  id="reg-phone"
                  type="tel"
                  required
                  placeholder="e.g. +91 99999 88888"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#66fcf1] focus:outline-none text-white transition-all placeholder-slate-700"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold tracking-wider">Set Secure Passcode</label>
                <input
                  id="reg-password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#66fcf1] focus:outline-none text-white transition-all placeholder-slate-700"
                />
              </div>

              <button
                id="signup-btn"
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-[#66fcf1] hover:from-teal-400 hover:to-cyan-400 text-slate-900 font-bold rounded-xl text-xs transition-transform flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-teal-500/10"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={14} />
                    Registering Profile Log...
                  </>
                ) : (
                  <>
                    Complete Corporate Registration <UserPlus size={14} />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setFormType("signin");
                    setErrorMsg("");
                    setSuccessBannerMsg("");
                  }}
                  className="text-slate-400 text-xs hover:text-white transition-colors"
                >
                  Already have account profile? <span className="text-[#66fcf1] font-semibold underline ml-1">Sign in</span>
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="recovery_panel"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              {/* Reset token has not been verified yet */}
              {!resetTokenInput && (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Enter your registered email address below. If matches database catalogs, the server will stage a secure passcode recovery code.
                  </p>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold tracking-wider">Registered Email</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sawanforwork@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#66fcf1] focus:outline-none text-white transition-all placeholder-slate-700"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-[#66fcf1] hover:from-teal-400 hover:to-cyan-400 text-slate-900 font-bold rounded-xl text-xs transition-transform flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    {loading ? <Loader2 className="animate-spin" size={14} /> : "Request Passcode Override"}
                  </button>
                </form>
              )}

              {/* Reset form ready */}
              {!!resetTokenInput && (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="p-3 bg-teal-950/20 border border-[#66fcf1]/20 rounded-xl text-center">
                    <p className="text-[11px] text-teal-300">
                      Reset Staged! Please config a strong password matching security policies.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold tracking-wider">Email Address</label>
                    <input
                      type="email"
                      required
                      disabled
                      value={email}
                      className="w-full bg-slate-950/50 border border-slate-800/80 rounded-xl px-4 py-3 text-xs text-slate-500 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold tracking-wider">Passcode Reset Token</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter 32-Char Hex Token"
                      value={resetTokenInput}
                      onChange={(e) => setResetTokenInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#66fcf1] focus:outline-none text-white tracking-widest font-mono"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">New Password Credentials</label>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-[10px] text-slate-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff size={12} /> : <Eye size={12} />}
                      </button>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Passwords must be 12+ chars"
                      value={newPasswordInput}
                      onChange={(e) => setNewPasswordInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#66fcf1] focus:outline-none text-white"
                    />
                    
                    {/* Visual Password Requirements block */}
                    <div className="mt-2.5 space-y-1.5 bg-slate-950 p-3 rounded-xl border border-slate-900 text-[10px] font-mono">
                      <p className="text-slate-400 uppercase tracking-widest font-semibold text-[8px] mb-1">Corporate Passcode Policies:</p>
                      <p className={newPasswordInput.length >= 12 ? "text-emerald-400" : "text-slate-500"}>
                        {newPasswordInput.length >= 12 ? "✔" : "○"} At least 12 characters long (Current: {newPasswordInput.length})
                      </p>
                      <p className={/[A-Z]/.test(newPasswordInput) ? "text-emerald-400" : "text-slate-500"}>
                        {/[A-Z]/.test(newPasswordInput) ? "✔" : "○"} At least one uppercase letter (A-Z)
                      </p>
                      <p className={/[a-z]/.test(newPasswordInput) ? "text-emerald-400" : "text-slate-500"}>
                        {/[a-z]/.test(newPasswordInput) ? "✔" : "○"} At least one lowercase letter (a-z)
                      </p>
                      <p className={/\d/.test(newPasswordInput) ? "text-emerald-400" : "text-slate-500"}>
                        {/\d/.test(newPasswordInput) ? "✔" : "○"} At least one numeric character (0-9)
                      </p>
                      <p className={/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPasswordInput) ? "text-emerald-400" : "text-slate-500"}>
                        {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPasswordInput) ? "✔" : "○"} At least one special symbol
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-[#66fcf1] hover:from-teal-400 hover:to-cyan-400 text-slate-900 font-bold rounded-xl text-xs transition-transform flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-teal-500/10"
                  >
                    {loading ? <Loader2 className="animate-spin" size={14} /> : "Update Credentials"}
                  </button>
                </form>
              )}

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setFormType("signin");
                    setResetTokenInput("");
                    setNewPasswordInput("");
                    setErrorMsg("");
                    setSuccessBannerMsg("");
                  }}
                  className="text-slate-400 text-xs hover:text-white transition-colors uppercase font-mono text-[9px]"
                >
                  ← Go Back to Sign In
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
