import React from "react";
import { Sparkles, Heart } from "lucide-react";

interface OurStoryProps {
  onLearnMore?: () => void;
}

export function OurStory({ onLearnMore }: OurStoryProps) {
  return (
    <section id="about" className="relative bg-[#FAF6F0] py-10 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
          
          {/* Left: Cozy Boutique Parlour Interior Photo */}
          <div className="relative lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-white p-2.5 sm:p-3 shadow-lg border border-[#E8DDD5]">
              <img
                src="/images/parlour-interior.jpg"
                alt="Cozy boutique parlour interior at Delicious Scoops with plush pink armchairs and warm ambient light"
                loading="lazy"
                className="h-auto w-full rounded-2xl sm:rounded-[2rem] object-cover aspect-4/3 transition-transform duration-500 hover:scale-[1.02]"
              />

              {/* Glowing Neon Decal Badge on Corner */}
              <div className="absolute top-3 left-3 sm:top-6 sm:left-6 rounded-xl sm:rounded-2xl bg-[#221815]/85 px-3 py-1.5 sm:px-4 sm:py-2 text-white backdrop-blur-md border border-white/20 shadow-md">
                <span className="font-script text-sm sm:text-xl text-[#FCE7EC]">
                  Good Ice Cream Brighter Days ♡
                </span>
              </div>
            </div>
          </div>

          {/* Right: Story Text & Circular Stamp */}
          <div className="relative flex flex-col items-start lg:col-span-6">
            
            {/* Top Row: Eyebrow + Rotating Circular Stamp Badge */}
            <div className="flex w-full items-start justify-between gap-4">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.25em] text-[#796660] uppercase mt-2">
                OUR STORY
              </span>

              {/* Circular Stamp Graphic */}
              <div className="relative flex h-20 w-20 sm:h-28 sm:w-28 shrink-0 items-center justify-center">
                {/* Rotating SVG Circular Text */}
                <svg
                  className="absolute inset-0 h-full w-full animate-spin-slow"
                  viewBox="0 0 100 100"
                >
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[9.5px] font-bold tracking-[0.22em] uppercase fill-[#221815]">
                    <textPath href="#circlePath" startOffset="0%">
                      • SWEET MOMENTS • HAPPIER PEOPLE
                    </textPath>
                  </text>
                </svg>

                {/* Center Ice Cream Cone Icon */}
                <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-[#FCE7EC] text-[#D8436B]">
                  <svg
                    className="h-4.5 w-4.5 sm:h-6 sm:w-6 stroke-current fill-none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 10c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" />
                    <path d="M5.5 10a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0" />
                    <path d="M7 12.5 12 21l5-8.5" />
                    <circle cx="12" cy="4" r="1.5" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Headline */}
            <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-[#221815] leading-[1.15] mt-1 sm:mt-2">
              More Than <br />
              Just Ice Cream
            </h2>

            {/* Narrative */}
            <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-[#5C4A44] leading-relaxed max-w-xl">
              At Delicious Scoops, we believe ice cream brings people together. What started as a small dream is now a place where families, friends and ice cream lovers create sweet memories every day.
            </p>

            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-[#796660] leading-relaxed max-w-xl">
              Every scoop is made from farm-fresh dairy, slow-churned pure cane sugar, and authentic natural fruits and spices—no artificial coloring, no preservatives, just pure joy.
            </p>

            {/* CTA Button */}
            <div className="mt-6 sm:mt-8 w-full sm:w-auto">
              <a
                href="#visit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#D8436B] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#C43862] hover:shadow-lg hover:-translate-y-0.5 active:scale-98"
              >
                <span>Our Story</span>
                <span>→</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
