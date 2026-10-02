import React from "react";
import { Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function ToastNotification() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-5 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-50 flex justify-center sm:justify-end animate-in slide-in-from-bottom-5 fade-in duration-300 pointer-events-none">
      <div className="flex max-w-[90vw] items-center gap-2.5 rounded-full bg-[#221815] px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-xl border border-white/10">
        <Sparkles className="h-4 w-4 text-[#D8436B] shrink-0 animate-spin-slow" />
        <span className="truncate">{toastMessage}</span>
      </div>
    </div>
  );
}
