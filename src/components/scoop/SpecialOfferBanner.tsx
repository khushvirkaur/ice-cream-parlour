import React from "react";
import { useCart } from "@/context/CartContext";

export function SpecialOfferBanner() {
  const { openCart, applyPromoCode } = useCart();

  const handleClaimOffer = () => {
    applyPromoCode("BUY2GET1");
    openCart();
  };

  return (
    <section className="bg-[#FAF6F0] py-4 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-r from-[#FBD5DE] via-[#FCE7EC] to-[#F9E8D8] p-5 sm:p-8 lg:p-12 shadow-sm border border-[#E8DDD5]/60">
          
          <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-12">
            
            {/* Left Column: Offer Details */}
            <div className="flex flex-col items-start lg:col-span-7 z-10">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.25em] text-[#796660] uppercase mb-1.5 sm:mb-2">
                SPECIAL TODAY
              </span>

              <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-[#221815] tracking-tight leading-tight">
                Buy 2 Scoops <br className="hidden sm:inline" />
                Get 1 Free!
              </h2>

              <p className="mt-2.5 sm:mt-4 text-xs sm:text-base text-[#5C4A44] leading-relaxed max-w-md">
                Treat yourself (and someone you love) to more happiness.
              </p>

              <div className="mt-5 sm:mt-7 flex flex-wrap items-center gap-2.5 sm:gap-4 w-full sm:w-auto">
                <button
                  onClick={handleClaimOffer}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#221815] px-7 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#3D2C28] hover:shadow-lg hover:-translate-y-0.5 active:scale-98"
                >
                  <span>Order Now</span>
                  <span>→</span>
                </button>
                <span className="text-xs font-medium text-[#796660] bg-white/70 px-3 py-1.5 rounded-full border border-white/80 self-center">
                  Code: <strong className="text-[#D8436B]">BUY2GET1</strong>
                </span>
              </div>
            </div>

            {/* Right Column: Trio of Cones & Handwritten Love Annotation */}
            <div className="relative flex items-center justify-center lg:col-span-5 pt-2 sm:pt-0">
              
              {/* Handwritten Script Doodle */}
              <div className="absolute -top-3 right-0 sm:-top-2 sm:right-2 z-20 flex flex-col items-center rotate-6 pointer-events-none">
                <span className="font-script text-lg sm:text-3xl lg:text-4xl font-bold text-[#221815] leading-none drop-shadow-xs">
                  Share <br />
                  <span className="text-xs sm:text-2xl font-normal">The</span> <br />
                  Sweetness
                </span>
                <span className="text-xs sm:text-xl text-[#221815]">♡</span>
              </div>

              {/* Three Waffle Cones Visual Composition */}
              <div className="relative flex items-center justify-center gap-1.5 sm:gap-4 max-w-full">
                {/* Cone 1: Strawberry */}
                <div className="group relative flex flex-col items-center transition-transform duration-300 hover:-translate-y-2">
                  <div className="h-28 w-18 sm:h-48 sm:w-32 lg:h-52 lg:w-36 overflow-hidden rounded-2xl bg-white/70 p-1 sm:p-1.5 shadow-md backdrop-blur-xs border border-white/60">
                    <img
                      src="/images/classic-strawberry.jpg"
                      alt="Strawberry Waffle Cone"
                      loading="lazy"
                      className="h-full w-full object-cover rounded-xl"
                    />
                  </div>
                </div>

                {/* Cone 2: Chocolate Hazelnut (Center & Taller) */}
                <div className="group relative flex flex-col items-center -translate-y-2 transition-transform duration-300 hover:-translate-y-4">
                  <div className="h-32 w-22 sm:h-56 sm:w-36 lg:h-60 lg:w-40 overflow-hidden rounded-2xl bg-white/90 p-1 sm:p-1.5 shadow-xl backdrop-blur-xs border border-white/80">
                    <img
                      src="/images/premium-chocolate.jpg"
                      alt="Chocolate Truffle Cone"
                      loading="lazy"
                      className="h-full w-full object-cover rounded-xl"
                    />
                  </div>
                </div>

                {/* Cone 3: Berry Ripple / Pistachio */}
                <div className="group relative flex flex-col items-center transition-transform duration-300 hover:-translate-y-2">
                  <div className="h-28 w-18 sm:h-48 sm:w-32 lg:h-52 lg:w-36 overflow-hidden rounded-2xl bg-white/70 p-1 sm:p-1.5 shadow-md backdrop-blur-xs border border-white/60">
                    <img
                      src="/images/seasonal-pistachio.jpg"
                      alt="Pistachio Gelato Cone"
                      loading="lazy"
                      className="h-full w-full object-cover rounded-xl"
                    />
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
