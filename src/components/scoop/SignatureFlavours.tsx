import React, { useState, useEffect } from "react";
import { Plus, Star, Sparkles, ArrowRight, Eye, Check } from "lucide-react";
import { SIGNATURE_FLAVOURS, FlavourItem } from "@/data/scoopData";
import { useCart } from "@/context/CartContext";

interface SignatureFlavoursProps {
  selectedCategoryFilter?: string;
}

export function SignatureFlavours({ selectedCategoryFilter = "all" }: SignatureFlavoursProps) {
  const [activeFilter, setActiveFilter] = useState(selectedCategoryFilter);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});
  const { addToCart, openCustomizer } = useCart();

  useEffect(() => {
    if (selectedCategoryFilter) {
      setActiveFilter(selectedCategoryFilter);
    }
  }, [selectedCategoryFilter]);

  const filterTabs = [
    { id: "all", label: "All Creations", icon: "🍨" },
    { id: "classic", label: "Classic", icon: "🍓" },
    { id: "premium", label: "Premium Range", icon: "🍫" },
    { id: "seasonal", label: "Seasonal Specials", icon: "🍃" },
    { id: "sundaes", label: "Sundaes & Waffles", icon: "🍧" },
    { id: "vegan", label: "Vegan & Sorbets", icon: "🌱" },
  ];

  const getCategoryCount = (catId: string) => {
    if (catId === "all") return SIGNATURE_FLAVOURS.length;
    return SIGNATURE_FLAVOURS.filter((f) => f.category === catId).length;
  };

  const filteredFlavours =
    activeFilter === "all"
      ? SIGNATURE_FLAVOURS
      : SIGNATURE_FLAVOURS.filter((item) => item.category === activeFilter);

  const handleQuickAdd = (flavour: FlavourItem, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(flavour, "Cone", []);
    setAddedItemIds((prev) => ({ ...prev, [flavour.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [flavour.id]: false }));
    }, 1200);
  };

  const getBadgeStyle = (badge?: string) => {
    switch (badge?.toLowerCase()) {
      case "bestseller":
        return "bg-gradient-to-r from-rose-500 to-[#D8436B] text-white shadow-rose-500/20";
      case "seasonal":
        return "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-500/20";
      case "chef's pick":
        return "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-amber-500/20";
      case "signature":
        return "bg-gradient-to-r from-[#221815] to-[#4A261E] text-white shadow-black/20";
      case "vegan":
        return "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-green-500/20";
      default:
        return "bg-[#D8436B] text-white";
    }
  };

  return (
    <section id="menu" className="relative bg-[#FAF6F0] py-16 sm:py-24 scroll-mt-16 overflow-hidden">
      {/* Anchor for #flavours */}
      <div id="flavours" className="absolute -top-16 left-0 h-0 w-0" />

      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute -top-32 right-1/4 h-80 w-80 rounded-full bg-[#FCE7EC] opacity-50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/4 h-96 w-96 rounded-full bg-[#F9E8D8] opacity-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-[#E8DDD5]/80">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#796660] shadow-xs border border-[#E8DDD5] mb-2 sm:mb-3">
              <Sparkles className="h-3.5 w-3.5 text-[#D8436B]" />
              <span>Handcrafted Creamery Menu</span>
            </div>
            <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-[#221815] tracking-tight">
              Must-Try <span className="text-[#D8436B] italic font-serif">Flavours</span>
            </h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-base text-[#5C4A44] leading-relaxed">
              Made with pure dairy, authentic whole ingredients, and zero artificial preservatives. Click any creation to customize your serving style and gourmet toppings.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold text-[#5C4A44] border border-[#E8DDD5] shadow-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{filteredFlavours.length} Creations Available</span>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-6 sm:mt-8 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-max pb-2">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              const count = getCategoryCount(tab.id);

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`group relative flex items-center gap-1.5 sm:gap-2 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 active:scale-95 ${
                    isActive
                      ? "bg-[#D8436B] text-white shadow-md shadow-rose-500/25 scale-[1.02]"
                      : "bg-white/85 backdrop-blur-xs text-[#5C4A44] hover:bg-white hover:text-[#D8436B] hover:border-[#D8436B]/30 border border-[#E8DDD5] shadow-xs"
                  }`}
                  aria-pressed={isActive}
                >
                  <span className="text-sm transition-transform duration-300 group-hover:scale-115">
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                  <span
                    className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                      isActive
                        ? "bg-white/25 text-white"
                        : "bg-[#F4EBE4] text-[#796660] group-hover:bg-[#FCE7EC] group-hover:text-[#D8436B]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Flavours Grid */}
        {filteredFlavours.length === 0 ? (
          <div className="mt-12 sm:mt-16 flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#E8DDD5] bg-white/50 p-8 sm:p-12 text-center">
            <span className="text-4xl mb-3">🍨</span>
            <h3 className="font-display text-lg sm:text-xl font-bold text-[#221815]">No flavours found</h3>
            <p className="mt-1 text-xs sm:text-sm text-[#796660]">Try selecting another category above.</p>
            <button
              onClick={() => setActiveFilter("all")}
              className="mt-4 rounded-full bg-[#D8436B] px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#C43862]"
            >
              Show All Flavours
            </button>
          </div>
        ) : (
          <div
            key={activeFilter}
            className="mt-8 sm:mt-10 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredFlavours.map((flavour, index) => {
              const isAdded = addedItemIds[flavour.id];

              return (
                <div
                  key={flavour.id}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="animate-menu-in group relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] bg-white/95 p-4 sm:p-5 shadow-[0_4px_25px_-4px_rgba(74,38,30,0.06)] ring-1 ring-[#E8DDD5]/70 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(216,67,107,0.18)] hover:border-rose-200/80 hover:bg-white"
                >
                  {/* Visual Frame */}
                  <div
                    onClick={() => openCustomizer(flavour)}
                    className="relative mb-3.5 sm:mb-4 flex h-44 sm:h-52 w-full items-center justify-center overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem] bg-gradient-to-b from-[#FAF6F0] via-[#F6EDE4] to-[#F1E5DA] p-2.5 sm:p-3 cursor-pointer"
                    title={`Click to view ingredients and customize ${flavour.name}`}
                  >
                    {/* Background Soft Aura */}
                    <div className="absolute inset-4 rounded-full bg-white/60 blur-xl transition-all duration-500 group-hover:scale-120 group-hover:bg-rose-100/50" />

                    <img
                      src={flavour.image}
                      alt={flavour.name}
                      loading="lazy"
                      className="relative z-10 h-full w-full object-cover rounded-xl sm:rounded-2xl shadow-sm transition-transform duration-500 ease-out group-hover:scale-106"
                    />

                    {/* Shine sweep overlay */}
                    <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="shine-sweep group-hover:animate-[shine-sweep_1s_ease-in-out]" />
                    </div>

                    {/* Badge Chip */}
                    {flavour.badge && (
                      <span
                        className={`absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-30 rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-bold shadow-sm tracking-wide ${getBadgeStyle(
                          flavour.badge
                        )}`}
                      >
                        {flavour.badge}
                      </span>
                    )}

                    {/* Rating Pill */}
                    <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-30 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-bold text-[#221815] shadow-xs backdrop-blur-md border border-white/80">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span>{flavour.rating.toFixed(1)}</span>
                    </div>

                    {/* Quick Explore Hint on Hover */}
                    <div className="absolute inset-x-3 bottom-3 z-30 hidden sm:flex items-center justify-center gap-1.5 rounded-xl bg-[#221815]/85 py-2 text-xs font-semibold text-white backdrop-blur-md opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      <Eye className="h-3.5 w-3.5" />
                      <span>Explore & Customize</span>
                    </div>
                  </div>

                  {/* Flavour Info */}
                  <div className="flex flex-1 flex-col">
                    <div
                      onClick={() => openCustomizer(flavour)}
                      className="cursor-pointer"
                    >
                      <h3 className="font-display text-base sm:text-xl font-bold text-[#221815] leading-snug transition-colors group-hover:text-[#D8436B]">
                        {flavour.name}
                      </h3>
                      <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs font-semibold text-[#D8436B] tracking-wide">
                        {flavour.tagline}
                      </p>
                      <p className="mt-1.5 sm:mt-2 text-xs text-[#796660] line-clamp-2 leading-relaxed">
                        {flavour.description}
                      </p>
                    </div>

                    {/* Price & Action Row */}
                    <div className="mt-4 sm:mt-5 flex items-center justify-between pt-3 border-t border-[#F4EBE4]">
                      <div className="flex flex-col">
                        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#A08B82]">
                          Starting At
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="font-display text-lg sm:text-xl font-bold text-[#221815]">
                            ₹{flavour.price}
                          </span>
                          <span className="text-[10px] sm:text-[11px] text-[#796660]">/ scoop</span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <button
                          onClick={() => openCustomizer(flavour)}
                          className="inline-flex items-center gap-1 rounded-full border border-[#E8DDD5] bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold text-[#221815] transition-all duration-200 hover:border-[#D8436B] hover:text-[#D8436B] hover:bg-[#FCE7EC]/50 shadow-xs active:scale-95"
                          title={`Customize ${flavour.name}`}
                        >
                          <span>Options</span>
                        </button>

                        <button
                          onClick={(e) => handleQuickAdd(flavour, e)}
                          className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full transition-all duration-300 shadow-sm ${
                            isAdded
                              ? "bg-emerald-600 text-white scale-110"
                              : "bg-[#221815] text-white hover:bg-[#D8436B] hover:scale-108 hover:shadow-md active:scale-95"
                          }`}
                          aria-label={`Add ${flavour.name} to scoop order`}
                          title="Quick add to scoop order"
                        >
                          {isAdded ? (
                            <Check className="h-4 w-4 sm:h-4.5 sm:w-4.5 stroke-[3]" />
                          ) : (
                            <Plus className="h-4 w-4 sm:h-4.5 sm:w-4.5 stroke-[2.5]" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Menu Guarantee Bar */}
        <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-white/80 p-4 sm:p-6 border border-[#E8DDD5] shadow-xs">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-[#FCE7EC] text-[#D8436B] text-base sm:text-lg">
              ✨
            </span>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#221815]">
                Custom Cones, Waffle Bowls & Dairy-Free Options
              </p>
              <p className="text-[11px] sm:text-xs text-[#796660]">
                All flavours prepared fresh in-house daily. Ask for vegan or allergen-safe options.
              </p>
            </div>
          </div>

          <a
            href="#visit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#221815] px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#D8436B] shadow-xs active:scale-98"
          >
            <span>Visit Our Parlour</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}

