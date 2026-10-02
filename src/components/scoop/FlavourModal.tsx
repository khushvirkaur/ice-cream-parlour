import React, { useState, useEffect } from "react";
import { X, Check, Plus, Minus, Star, Sparkles, Heart, ShieldCheck, Award } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function FlavourModal() {
  const { isCustomizerOpen, closeCustomizer, selectedFlavour, addToCart } = useCart();

  const [servingType, setServingType] = useState<"Cone" | "Cup" | "Waffle Bowl">("Cone");
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!isCustomizerOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeCustomizer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isCustomizerOpen, closeCustomizer]);

  useEffect(() => {
    if (isCustomizerOpen) {
      setServingType("Cone");
      setSelectedToppings([]);
      setQuantity(1);
    }
  }, [isCustomizerOpen, selectedFlavour]);

  if (!isCustomizerOpen || !selectedFlavour) return null;

  const toppingOptions = [
    { name: "Hot Fudge Drizzle", price: 20, icon: "🍫" },
    { name: "Roasted Almond Flakes", price: 20, icon: "🥜" },
    { name: "Rainbow Sprinkles", price: 20, icon: "✨" },
    { name: "Whipped Cream & Cherry", price: 25, icon: "🍒" },
  ];

  const servingStyles = [
    { type: "Cone" as const, title: "Waffle Cone", desc: "Crisp handmade vanilla cone", priceLabel: "Included", icon: "🍦", surplus: 0 },
    { type: "Cup" as const, title: "Artisan Cup", desc: "Eco-friendly compostable cup", priceLabel: "Included", icon: "🍨", surplus: 0 },
    { type: "Waffle Bowl" as const, title: "Waffle Bowl", desc: "Fresh baked waffle bowl", priceLabel: "+₹30", icon: "🧇", surplus: 30 },
  ];

  const toggleTopping = (toppingName: string) => {
    setSelectedToppings((prev) =>
      prev.includes(toppingName)
        ? prev.filter((t) => t !== toppingName)
        : [...prev, toppingName]
    );
  };

  const unitPrice =
    selectedFlavour.price +
    (servingType === "Waffle Bowl" ? 30 : 0) +
    selectedToppings.length * 20;

  const calculatedTotal = unitPrice * quantity;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(selectedFlavour, servingType, selectedToppings);
    }
    closeCustomizer();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-flavour-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
    >
      {/* Backdrop with soft blur */}
      <div
        onClick={closeCustomizer}
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
      />

      {/* Modal Container */}
      <div className="relative my-auto w-full max-w-lg max-h-[88vh] sm:max-h-[90vh] flex flex-col overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem] bg-[#FAF6F0] shadow-2xl z-10 border border-white/80 animate-in zoom-in-95 fade-in slide-in-from-bottom-4 duration-300">
        
        {/* Floating Close Button */}
        <button
          onClick={closeCustomizer}
          aria-label="Close detail modal"
          className="group absolute top-3 right-3 sm:top-4 sm:right-4 z-30 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/90 text-[#221815] shadow-md backdrop-blur-md border border-white transition-all duration-300 hover:bg-[#D8436B] hover:text-white active:scale-95"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5]" />
        </button>

        {/* Product Visual Showcase Header */}
        <div className="relative h-36 sm:h-52 shrink-0 w-full overflow-hidden bg-gradient-to-b from-[#FCE7EC]/50 to-[#FAF6F0] flex items-center justify-center">
          <img
            src={selectedFlavour.image}
            alt={selectedFlavour.name}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />

          {/* Bottom Gradient Fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0] via-[#FAF6F0]/20 to-transparent" />

          {/* Badges on Header */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex flex-wrap items-center gap-1.5 sm:gap-2">
            {selectedFlavour.badge && (
              <span className="rounded-full bg-[#D8436B] px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold text-white shadow-md">
                {selectedFlavour.badge}
              </span>
            )}
            <div className="flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold text-[#221815] shadow-sm backdrop-blur-md">
              <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-400 text-amber-400" />
              <span>{selectedFlavour.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="px-4 sm:px-7 pb-4 sm:pb-6 pt-1 flex-1 min-h-0 overflow-y-auto">
          
          {/* Header & Title */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="text-[9.5px] sm:text-[11px] font-bold uppercase tracking-widest text-[#D8436B]">
                {selectedFlavour.category} creation
              </span>
              <h3 id="modal-flavour-title" className="font-display text-lg sm:text-2xl lg:text-3xl font-bold text-[#221815] leading-tight">
                {selectedFlavour.name}
              </h3>
              <p className="text-[11px] sm:text-sm font-medium text-[#796660] mt-0.5">
                {selectedFlavour.tagline}
              </p>
            </div>

            <div className="flex flex-col items-end shrink-0">
              <span className="text-[8.5px] sm:text-[10px] uppercase font-bold text-[#A08B82]">Price / scoop</span>
              <span className="font-display text-lg sm:text-2xl font-bold text-[#D8436B]">
                ₹{selectedFlavour.price}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="mt-2.5 sm:mt-3 text-[11px] sm:text-sm text-[#5C4A44] leading-relaxed bg-white/60 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-[#E8DDD5]/60">
            {selectedFlavour.description}
          </p>

          {/* Craft Trust Badges */}
          <div className="mt-2.5 sm:mt-3.5 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[9.5px] sm:text-[11px] font-semibold text-[#796660]">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 sm:px-2.5 sm:py-1 text-emerald-800 border border-emerald-200/60">
              🌿 100% Natural
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 sm:px-2.5 sm:py-1 text-rose-800 border border-rose-200/60">
              🥛 Farm-Fresh
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 sm:px-2.5 sm:py-1 text-amber-800 border border-amber-200/60">
              ✨ Fresh Daily
            </span>
          </div>

          {/* Step 1: Serving Style */}
          <div className="mt-4 sm:mt-6">
            <div className="flex items-center justify-between">
              <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#221815]">
                1. Choose Serving Style
              </label>
              <span className="text-[9.5px] sm:text-[11px] text-[#796660]">Select one</span>
            </div>

            <div className="mt-2 grid grid-cols-3 gap-1.5 sm:gap-2.5">
              {servingStyles.map((style) => {
                const isSelected = servingType === style.type;

                return (
                  <button
                    key={style.type}
                    onClick={() => setServingType(style.type)}
                    className={`relative flex flex-col items-center justify-between rounded-xl sm:rounded-2xl p-1.5 sm:p-3 text-center transition-all duration-200 border active:scale-95 ${
                      isSelected
                        ? "border-[#D8436B] bg-[#FCE7EC] text-[#221815] font-bold shadow-sm scale-[1.02] ring-1 ring-[#D8436B]/30"
                        : "border-[#E8DDD5] bg-white text-[#5C4A44] hover:bg-[#FAF6F0] hover:border-[#D8436B]/30"
                    }`}
                  >
                    <span className="text-lg sm:text-2xl mb-0.5 sm:mb-1">{style.icon}</span>
                    <p className="text-[10px] sm:text-xs font-bold leading-tight truncate w-full">{style.title}</p>
                    <span className={`text-[8.5px] sm:text-[10px] mt-0.5 sm:mt-1 font-semibold ${isSelected ? "text-[#D8436B]" : "text-[#796660]"}`}>
                      {style.priceLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Gourmet Toppings */}
          <div className="mt-4 sm:mt-6">
            <div className="flex items-center justify-between">
              <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#221815]">
                2. Add Artisan Toppings
              </label>
              <span className="text-[9.5px] sm:text-[11px] text-[#796660]">+₹20 each</span>
            </div>

            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
              {toppingOptions.map((opt) => {
                const isChecked = selectedToppings.includes(opt.name);

                return (
                  <button
                    key={opt.name}
                    onClick={() => toggleTopping(opt.name)}
                    className={`flex items-center justify-between rounded-xl sm:rounded-2xl p-2 sm:p-3 text-left text-xs transition-all duration-200 border active:scale-98 ${
                      isChecked
                        ? "border-[#D8436B] bg-[#FCE7EC] text-[#221815] font-semibold shadow-xs ring-1 ring-[#D8436B]/20"
                        : "border-[#E8DDD5] bg-white text-[#5C4A44] hover:bg-[#FAF6F0] hover:border-[#D8436B]/30"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-sm sm:text-base">{opt.icon}</span>
                      <span className="text-[11px] sm:text-xs truncate">{opt.name}</span>
                    </div>

                    <div
                      className={`flex h-4.5 w-4.5 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-md sm:rounded-lg border transition-all ${
                        isChecked
                          ? "border-[#D8436B] bg-[#D8436B] text-white"
                          : "border-[#D7CCC8] bg-white"
                      }`}
                    >
                      {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Quantity */}
          <div className="mt-4 sm:mt-6 flex items-center justify-between rounded-xl sm:rounded-2xl bg-white p-2.5 sm:p-3.5 border border-[#E8DDD5]">
            <div>
              <p className="text-xs font-bold text-[#221815]">Quantity</p>
              <p className="text-[9.5px] sm:text-[11px] text-[#796660]">Number of customized scoops</p>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-[#E8DDD5] bg-[#FAF6F0] text-[#221815] disabled:opacity-40 hover:bg-[#FCE7EC] hover:text-[#D8436B] active:scale-95 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </button>

              <span className="font-display text-sm sm:text-base font-bold text-[#221815] min-w-5 text-center">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-[#E8DDD5] bg-[#FAF6F0] text-[#221815] hover:bg-[#FCE7EC] hover:text-[#D8436B] active:scale-95 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Modal Sticky Bottom Action */}
        <div className="p-3 sm:p-4 bg-white border-t border-[#E8DDD5]/80 shrink-0">
          <button
            onClick={handleAdd}
            className="group relative flex w-full items-center justify-between rounded-full bg-[#D8436B] px-4 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#C43862] hover:shadow-xl hover:shadow-rose-500/20 active:scale-[0.99]"
          >
            <span className="flex items-center gap-1.5 sm:gap-2">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Add to My Scoop Order</span>
            </span>

            <span className="font-display text-xs sm:text-base font-bold rounded-full bg-white/20 px-2 sm:px-3 py-0.5 sm:py-1">
              ₹{calculatedTotal}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}

