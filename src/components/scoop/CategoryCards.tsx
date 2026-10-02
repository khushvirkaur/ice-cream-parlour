import React from "react";
import { CATEGORY_CARDS, CategoryCard } from "@/data/scoopData";

interface CategoryCardsProps {
  onSelectCategory?: (category: string) => void;
}

export function CategoryCards({ onSelectCategory }: CategoryCardsProps) {
  const handleCardClick = (card: CategoryCard) => {
    if (onSelectCategory) {
      onSelectCategory(card.id);
    }
    const targetElement = document.getElementById("flavours");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="categories" className="bg-[#FAF6F0] py-6 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_CARDS.map((card) => (
            <div
              key={card.id}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleCardClick(card);
                }
              }}
              onClick={() => handleCardClick(card)}
              style={{ backgroundColor: card.bgColor }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl p-5 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl active:scale-[0.98] cursor-pointer border border-black/5"
            >
              {/* Product Image Area */}
              <div className="relative mb-4 sm:mb-6 flex h-44 sm:h-52 w-full items-center justify-center overflow-hidden rounded-2xl bg-white/40 p-2">
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="h-full w-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Text Info */}
              <div className="flex flex-col">
                <h3 className="font-display text-lg sm:text-2xl font-bold text-[#221815] transition-colors group-hover:text-[#D8436B]">
                  {card.title}
                </h3>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#5C4A44] leading-relaxed">
                  {card.tagline}
                </p>

                {/* Action Link */}
                <div className="mt-4 sm:mt-5 flex items-center gap-1.5 text-xs font-bold text-[#221815] transition-colors group-hover:text-[#D8436B]">
                  <span className="border-b border-current pb-0.5">{card.actionText}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
