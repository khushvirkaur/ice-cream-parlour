import React from "react";
import { Leaf, Heart, IceCream, ArrowRight, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function Hero() {
  const { openCart, openSearch } = useCart();

  return (
    <section className="relative overflow-hidden bg-[#FAF6F0] pt-4 pb-12 sm:pt-6 sm:pb-16 lg:pt-10 lg:pb-24">
      {/* Background Soft Glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-[#FCE7EC] opacity-60 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-24 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-[#F9E8D8] opacity-60 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Content */}
          <div className="flex flex-col items-start lg:col-span-7">
            {/* Tag / Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F4EBE4] px-3.5 py-1.5 text-[11px] sm:text-xs font-bold tracking-[0.18em] sm:tracking-[0.2em] text-[#796660] uppercase mb-4 sm:mb-6">
              <span>Premium Ice Cream Parlour</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.12] sm:leading-[1.08] font-bold text-[#221815] tracking-tight">
              Life is Better <br />
              with <span className="text-[#D8436B] italic font-serif">Ice Cream</span>
            </h1>

            {/* Subheading */}
            <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-lg text-[#5C4A44] leading-relaxed">
              Real ingredients. Extraordinary flavours. Made to make your moments sweeter.
            </p>

            {/* CTAs */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="#flavours"
                onClick={(e) => {
                  e.preventDefault();
                  const targetElement = document.getElementById("flavours") || document.getElementById("menu");
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D8436B] px-6 sm:px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#C43862] hover:shadow-lg hover:-translate-y-0.5 active:scale-98 cursor-pointer"
              >
                <span>Explore Our Flavours</span>
                <span>→</span>
              </a>

              <button
                onClick={openCart}
                className="inline-flex items-center justify-center rounded-full border border-[#221815] bg-transparent px-6 sm:px-8 py-3.5 text-sm font-semibold text-[#221815] transition-all duration-300 hover:bg-[#221815] hover:text-white active:scale-98"
              >
                Order Online
              </button>
            </div>

            {/* 3 Pillars / Feature Highlights */}
            <div className="mt-8 sm:mt-10 w-full max-w-xl">
              {/* Subtle divider with pill accent */}
              <div className="flex items-center gap-3 mb-3.5 sm:mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-[#E8DDD5] to-transparent" />
                <span className="flex items-center gap-1.5 text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#A08B82]">
                  <Sparkles className="h-3 w-3 text-[#D8436B]" />
                  The Artisanal Standard
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-[#E8DDD5] to-transparent" />
              </div>

              {/* Feature Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {/* Feature 1: Natural Ingredients */}
                <div className="group relative flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2.5 rounded-2xl bg-white/85 p-3 sm:p-3.5 backdrop-blur-md border border-white/90 shadow-[0_4px_20px_-4px_rgba(74,38,30,0.06)] ring-1 ring-[#E8DDD5]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/5 hover:border-emerald-200/80 hover:bg-white">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-600 border border-emerald-200/60 shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-md group-hover:shadow-emerald-500/20">
                    <Leaf className="h-4 w-4 sm:h-4.5 sm:w-4.5 stroke-[2]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs sm:text-sm font-bold text-[#221815] leading-snug group-hover:text-emerald-950 transition-colors">
                        100% Natural
                      </p>
                      <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-[11px] sm:text-xs text-[#796660] leading-tight mt-0.5">
                      Pure ingredients only
                    </p>
                  </div>
                </div>

                {/* Feature 2: Made with Love */}
                <div className="group relative flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2.5 rounded-2xl bg-white/85 p-3 sm:p-3.5 backdrop-blur-md border border-white/90 shadow-[0_4px_20px_-4px_rgba(74,38,30,0.06)] ring-1 ring-[#E8DDD5]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-900/5 hover:border-rose-200/80 hover:bg-white">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-50 to-pink-50 text-[#D8436B] border border-rose-200/60 shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:bg-[#D8436B] group-hover:text-white group-hover:shadow-md group-hover:shadow-rose-500/20">
                    <Heart className="h-4 w-4 sm:h-4.5 sm:w-4.5 stroke-[2] fill-current/15 group-hover:fill-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs sm:text-sm font-bold text-[#221815] leading-snug group-hover:text-rose-950 transition-colors">
                        Made with Love
                      </p>
                      <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-[#D8436B]" />
                    </div>
                    <p className="text-[11px] sm:text-xs text-[#796660] leading-tight mt-0.5">
                      Handcrafted batches
                    </p>
                  </div>
                </div>

                {/* Feature 3: Fresh Daily */}
                <div className="group relative flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2.5 rounded-2xl bg-white/85 p-3 sm:p-3.5 backdrop-blur-md border border-white/90 shadow-[0_4px_20px_-4px_rgba(74,38,30,0.06)] ring-1 ring-[#E8DDD5]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-900/5 hover:border-amber-200/80 hover:bg-white">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 text-amber-600 border border-amber-200/60 shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white group-hover:shadow-md group-hover:shadow-amber-500/20">
                    <IceCream className="h-4 w-4 sm:h-4.5 sm:w-4.5 stroke-[2]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs sm:text-sm font-bold text-[#221815] leading-snug group-hover:text-amber-950 transition-colors">
                        Fresh Daily
                      </p>
                      <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
                    </div>
                    <p className="text-[11px] sm:text-xs text-[#796660] leading-tight mt-0.5">
                      Churned every morning
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Bowl & Playful Elements */}
          <div className="relative flex items-center justify-center lg:col-span-5 mt-4 lg:mt-0">
            
            {/* Playful Handwritten Note */}
            <div className="absolute -top-3 sm:-top-4 right-2 sm:right-6 z-20 flex flex-col items-center rotate-6 pointer-events-none">
              <span className="font-script text-lg sm:text-3xl font-bold text-[#221815] drop-shadow-xs leading-none">
                Happiness <br />
                <span className="text-[11px] sm:text-sm font-normal">in every</span> scoop
              </span>
              <svg
                className="w-4 h-4 sm:w-7 sm:h-7 text-[#221815] mt-0.5 stroke-current fill-none"
                viewBox="0 0 24 24"
                strokeWidth="1.75"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>

            {/* Bowl Container */}
            <div className="relative group max-w-md sm:max-w-lg w-full">
              {/* Outer soft aura */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FCE7EC] via-[#F9E8D8] to-transparent opacity-80 blur-2xl transition-transform duration-500 group-hover:scale-105" />
              
              <div className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-white p-2.5 sm:p-3 shadow-xl border border-[#E8DDD5]/60 transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src="/images/hero-bowl.jpg"
                  alt="Delicious loaded artisanal ice cream bowl with strawberry, chocolate, and vanilla scoops"
                  className="h-auto w-full rounded-2xl sm:rounded-[2rem] object-cover aspect-4/3"
                />

                {/* Bowl Badge Overlay */}
                <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 max-w-[92%] rounded-full bg-white/95 px-3 sm:px-5 py-1.5 sm:py-2 backdrop-blur-md shadow-md border border-[#E8DDD5]/80 text-center pointer-events-none">
                  <p className="text-[8.5px] sm:text-[11px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.25em] text-[#221815] truncate">
                    Good Ice Cream • Brighter Days
                  </p>
                  <p className="text-[9px] sm:text-xs text-[#D8436B]">♡</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
