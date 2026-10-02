import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PARLOUR_INFO } from "@/data/scoopData";
import { recordPageView } from "@/lib/analytics";
import { Navbar } from "@/components/scoop/Navbar";
import { Hero } from "@/components/scoop/Hero";
import { CategoryCards } from "@/components/scoop/CategoryCards";
import { OurStory } from "@/components/scoop/OurStory";
import { SpecialOfferBanner } from "@/components/scoop/SpecialOfferBanner";
import { SignatureFlavours } from "@/components/scoop/SignatureFlavours";
import { Footer } from "@/components/scoop/Footer";
import { CartDrawer } from "@/components/scoop/CartDrawer";
import { FlavourModal } from "@/components/scoop/FlavourModal";
import { SearchModal } from "@/components/scoop/SearchModal";
import { FindUsModal } from "@/components/scoop/FindUsModal";
import { PolicyModal } from "@/components/scoop/PolicyModal";
import { ToastNotification } from "@/components/scoop/ToastNotification";

const title = "Delicious Scoops | Premium Ice Cream Parlour";
const description =
  "Life is Better with Ice Cream. Real ingredients, extraordinary flavours. Handcrafted fresh daily at Delicious Scoops.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "IceCreamShop",
          name: PARLOUR_INFO.name,
          telephone: PARLOUR_INFO.phone,
          address: {
            "@type": "PostalAddress",
            streetAddress: "248 Central Ave",
            addressLocality: "Jersey City",
            addressRegion: "NJ",
            postalCode: "07307",
            addressCountry: "US",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: 4.9,
            reviewCount: 780,
          },
          openingHours: "Mo-Su 11:00-23:00",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    recordPageView("/");
  }, []);

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-[#FAF6F0] text-[#221815] selection:bg-[#FCE7EC] selection:text-[#D8436B]">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* 4 Pastel Category Cards */}
        <CategoryCards onSelectCategory={setSelectedCategory} />

        {/* Our Story Section */}
        <OurStory />

        {/* Special Promotion Today Banner */}
        <SpecialOfferBanner />

        {/* Must-Try Signature Flavours */}
        <SignatureFlavours selectedCategoryFilter={selectedCategory} />
      </main>

      {/* Espresso Chocolate Footer */}
      <Footer />

      {/* Interactive Global Modals & Drawers */}
      <CartDrawer />
      <FlavourModal />
      <SearchModal />
      <FindUsModal />
      <PolicyModal />
      <ToastNotification />
    </div>
  );
}

