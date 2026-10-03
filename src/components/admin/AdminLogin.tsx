import React, { useState, useEffect } from "react";
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, Clock } from "lucide-react";
import { loginAdmin } from "@/lib/analytics";

interface AdminLoginProps {
  onSuccess: () => void;
}

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const ATTEMPTS_KEY = "scoop_admin_fail_attempts";
const LOCKOUT_KEY = "scoop_admin_lockout_until";

export function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lockoutRemaining, setLockoutRemaining] = useState<number>(0);

  // Check lockout status on mount & interval
  useEffect(() => {
    const checkLockout = () => {
      const lockoutUntil = parseInt(localStorage.getItem(LOCKOUT_KEY) || "0", 10);
      const now = Date.now();
      if (lockoutUntil > now) {
        setLockoutRemaining(Math.ceil((lockoutUntil - now) / 1000));
      } else {
        setLockoutRemaining(0);
        if (lockoutUntil > 0) {
          localStorage.removeItem(LOCKOUT_KEY);
          localStorage.removeItem(ATTEMPTS_KEY);
        }
      }
    };

    checkLockout();
    const timer = setInterval(checkLockout, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (lockoutRemaining > 0) {
      setErrorMsg(`Access temporarily locked. Please wait ${Math.ceil(lockoutRemaining / 60)} minutes.`);
      return;
    }

    if (!username.trim() || !password) {
      setErrorMsg("Please enter both username and password.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const ok = loginAdmin(username, password);
      setIsLoading(false);
      
      if (ok) {
        localStorage.removeItem(ATTEMPTS_KEY);
        localStorage.removeItem(LOCKOUT_KEY);
        onSuccess();
      } else {
        const currentAttempts = parseInt(localStorage.getItem(ATTEMPTS_KEY) || "0", 10) + 1;
        localStorage.setItem(ATTEMPTS_KEY, currentAttempts.toString());

        if (currentAttempts >= MAX_FAILED_ATTEMPTS) {
          const lockUntil = Date.now() + LOCKOUT_DURATION_MS;
          localStorage.setItem(LOCKOUT_KEY, lockUntil.toString());
          setLockoutRemaining(Math.ceil(LOCKOUT_DURATION_MS / 1000));
          setErrorMsg(`Too many failed attempts. Security lockout active for 15 minutes.`);
        } else {
          const remaining = MAX_FAILED_ATTEMPTS - currentAttempts;
          setErrorMsg(`Invalid username or password. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining before temporary lockout.`);
        }
      }
    }, 600);
  };

  const formatLockoutTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
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
            Authorized Personnel Only
          </p>
        </div>

        {/* Login Form Card */}
        <div className="rounded-3xl bg-[#221815] p-6 sm:p-8 border border-white/10 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div>
              <h2 className="text-base font-bold text-white">Administrator Sign In</h2>
              <p className="text-xs text-[#8D7B75] mt-0.5">Enter secret master credentials</p>
            </div>
            <span className="rounded-full bg-[#D8436B]/20 border border-[#D8436B]/40 px-2.5 py-1 text-[10px] font-bold text-[#F48FB1] uppercase tracking-wider">
              Protected
            </span>
          </div>

          {lockoutRemaining > 0 ? (
            <div className="mb-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 text-xs text-amber-200 flex items-start gap-3">
              <Clock className="h-5 w-5 shrink-0 text-amber-400 mt-0.5" />
              <div>
                <p className="font-bold text-amber-300">Security Lockout Active</p>
                <p className="mt-1 text-amber-200/80">
                  Too many incorrect attempts. Please wait <span className="font-mono font-bold text-white">{formatLockoutTime(lockoutRemaining)}</span> before trying again.
                </p>
              </div>
            </div>
          ) : errorMsg ? (
            <div className="mb-5 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-300 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          ) : null}

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
                  disabled={lockoutRemaining > 0 || isLoading}
                  required
                  className="w-full rounded-xl bg-[#18110F] border border-white/15 pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-[#5C4A44] focus:border-[#D8436B] focus:outline-none focus:ring-1 focus:ring-[#D8436B] transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#C8B8B2] uppercase tracking-wider">
                  Password
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
                  disabled={lockoutRemaining > 0 || isLoading}
                  required
                  className="w-full rounded-xl bg-[#18110F] border border-white/15 pl-10 pr-10 py-3 text-xs sm:text-sm text-white placeholder-[#5C4A44] focus:border-[#D8436B] focus:outline-none focus:ring-1 focus:ring-[#D8436B] transition-all disabled:opacity-50"
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
              disabled={isLoading || lockoutRemaining > 0}
              className="w-full mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#D8436B] py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg hover:bg-[#C2335B] transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

        </div>

        {/* Back to Home Link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs text-[#8D7B75] hover:text-white transition-colors"
          >
            ← Return to Storefront
          </a>
        </div>

      </div>
    </div>
  );
}
