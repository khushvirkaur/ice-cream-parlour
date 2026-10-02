import React, { useState } from "react";
import { Lock, User, Eye, EyeOff, ShieldCheck, Key, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { loginAdmin, DEFAULT_ADMIN_USERNAME, DEFAULT_ADMIN_PASSWORD } from "@/lib/analytics";

interface AdminLoginProps {
  onSuccess: () => void;
}

export function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!username.trim() || !password) {
      setErrorMsg("Please enter both username and password.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const ok = loginAdmin(username, password);
      setIsLoading(false);
      if (ok) {
        onSuccess();
      } else {
        setErrorMsg("Invalid username or password. Check credentials and try again.");
      }
    }, 500);
  };

  const handleFillCredentials = () => {
    setUsername(DEFAULT_ADMIN_USERNAME);
    setPassword(DEFAULT_ADMIN_PASSWORD);
    setErrorMsg("");
  };

  return (
    <div className="min-h-screen bg-[#18110F] text-[#FAF6F0] flex flex-col items-center justify-center p-4 sm:p-6 selection:bg-[#FCE7EC] selection:text-[#D8436B]">
      
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D8436B]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#25D366]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2A1D1A] text-[#FCE7EC] border border-white/10 shadow-lg mb-3">
            <ShieldCheck className="h-7 w-7 text-[#F48FB1]" />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Delicious Scoops
          </h1>
          <p className="text-xs sm:text-sm text-[#A6928B] mt-1 font-medium">
            Executive Admin & Business Analytics Portal
          </p>
        </div>

        {/* Login Form Card */}
        <div className="rounded-3xl bg-[#221815] p-6 sm:p-8 border border-white/10 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div>
              <h2 className="text-base font-bold text-white">Administrator Sign In</h2>
              <p className="text-xs text-[#8D7B75] mt-0.5">Secure authentication required</p>
            </div>
            <span className="rounded-full bg-[#D8436B]/20 border border-[#D8436B]/40 px-2.5 py-1 text-[10px] font-bold text-[#F48FB1] uppercase tracking-wider">
              256-Bit Encrypted
            </span>
          </div>

          {errorMsg && (
            <div className="mb-5 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-300 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Username Field */}
            <div>
              <label className="block text-xs font-semibold text-[#C8B8B2] mb-1.5 uppercase tracking-wider">
                Admin Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8D7B75]" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  autoComplete="username"
                  required
                  className="w-full rounded-xl bg-[#18110F] border border-white/15 pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-[#5C4A44] focus:border-[#D8436B] focus:outline-none focus:ring-1 focus:ring-[#D8436B] transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#C8B8B2] uppercase tracking-wider">
                  Master Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8D7B75]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl bg-[#18110F] border border-white/15 pl-10 pr-10 py-3 text-xs sm:text-sm text-white placeholder-[#5C4A44] focus:border-[#D8436B] focus:outline-none focus:ring-1 focus:ring-[#D8436B] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8D7B75] hover:text-white transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#D8436B] py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg hover:bg-[#C2335B] transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <span>Access Admin Panel</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Helper / Demo Credentials Assistant */}
          <div className="mt-6 border-t border-white/10 pt-4 bg-[#18110F]/60 rounded-2xl p-3.5 border border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#A6928B] flex items-center gap-1.5">
                <Key className="h-3 w-3 text-[#F48FB1]" />
                Configured Master Credentials:
              </span>
              <button
                type="button"
                onClick={handleFillCredentials}
                className="text-[10px] font-bold text-[#F48FB1] hover:underline cursor-pointer bg-[#D8436B]/15 px-2 py-0.5 rounded-full"
              >
                Auto-Fill
              </button>
            </div>
            <div className="mt-2 space-y-1 text-[11px] font-mono text-[#C8B8B2] bg-[#120C0A] p-2 rounded-lg border border-white/5">
              <div>User: <span className="text-white font-semibold">{DEFAULT_ADMIN_USERNAME}</span></div>
              <div>Pass: <span className="text-emerald-400 font-semibold">{DEFAULT_ADMIN_PASSWORD}</span></div>
            </div>
          </div>

        </div>

        {/* Back to Home Link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs text-[#8D7B75] hover:text-white transition-colors"
          >
            ← Return to Parlour Storefront
          </a>
        </div>

      </div>
    </div>
  );
}
