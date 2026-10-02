import React, { useState } from "react";
import { Search, X, Plus } from "lucide-react";
import { SIGNATURE_FLAVOURS, FlavourItem } from "@/data/scoopData";
import { useCart } from "@/context/CartContext";

export function SearchModal() {
  const { isSearchOpen, closeSearch, addToCart, openCustomizer } = useCart();
  const [query, setQuery] = useState("");

  React.useEffect(() => {
    if (!isSearchOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const results = SIGNATURE_FLAVOURS.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.tagline.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-4 pt-12 sm:pt-20">
      <div
        onClick={closeSearch}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="relative w-full max-w-xl max-h-[85vh] flex flex-col overflow-hidden rounded-3xl bg-[#FAF6F0] p-4 sm:p-6 shadow-2xl z-10 border border-[#E8DDD5] animate-in zoom-in-95">
        
        {/* Search Input */}
        <div className="relative flex items-center border-b border-[#E8DDD5] pb-3 sm:pb-4 shrink-0">
          <Search className="h-5 w-5 text-[#796660] shrink-0" />
          <input
            type="text"
            placeholder="Search Chocolate, Pistachio, Mango..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent pl-2.5 pr-8 text-sm sm:text-base text-[#221815] placeholder:text-[#A6928B] focus:outline-none"
          />
          <button
            onClick={closeSearch}
            className="absolute right-0 rounded-full p-1.5 text-[#796660] hover:bg-[#F4EBE4] hover:text-[#221815] active:scale-95"
            aria-label="Close search"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="mt-3 sm:mt-4 flex-1 min-h-0 overflow-y-auto pr-1">
          {results.length === 0 ? (
            <p className="py-8 text-center text-xs sm:text-sm text-[#796660]">
              No flavours found matching "{query}". Try "Chocolate" or "Pistachio"!
            </p>
          ) : (
            <div className="flex flex-col gap-2 sm:gap-2.5">
              {results.map((flavour) => (
                <div
                  key={flavour.id}
                  className="flex items-center justify-between rounded-2xl bg-white p-2.5 sm:p-3 shadow-2xs border border-[#E8DDD5]/60 hover:bg-[#FCE7EC]/50 transition-colors"
                >
                  <div
                    onClick={() => {
                      closeSearch();
                      openCustomizer(flavour);
                    }}
                    className="flex items-center gap-2.5 sm:gap-3 cursor-pointer flex-1 min-w-0"
                  >
                    <img
                      src={flavour.image}
                      alt={flavour.name}
                      className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-display text-xs sm:text-sm font-bold text-[#221815] truncate">
                        {flavour.name}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-[#796660] truncate">{flavour.tagline}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-2">
                    <span className="font-display text-xs sm:text-sm font-bold text-[#221815]">
                      ₹{flavour.price}
                    </span>
                    <button
                      onClick={() => addToCart(flavour)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#221815] text-white hover:bg-[#D8436B] active:scale-95 transition-colors"
                      title="Add to order"
                      aria-label={`Add ${flavour.name} to order`}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
