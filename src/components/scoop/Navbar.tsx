import React, { useState, useEffect } from "react";
import {
  Search,
  ShoppingBag,
  Menu as MenuIcon,
  X,
  MapPin,
  Phone,
  Clock,
  Sparkles,
  ChevronRight,
  IceCream,
  BookOpen,
  Store,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PARLOUR_INFO } from "@/data/scoopData";
import { recordWhatsAppClick } from "@/lib/analytics";

export function Navbar() {
  const { cartCount, cartTotal, openCart, openSearch, openFindUs } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);

      // Detect active section for navigation highlight
      const sections = ["top", "flavours", "menu", "about", "contact"];
      for (const sectionId of sections.reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    customAction?: () => void
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (customAction) {
      customAction();
      return;
    }

    if (href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Home", href: "#top", id: "top", icon: "🍦" },
    { name: "Our Flavours", href: "#flavours", id: "flavours", icon: "🍓" },
    { name: "Menu", href: "#menu", id: "menu", icon: "🍨" },
    { name: "About", href: "#about", id: "about", icon: "📖" },
    { name: "Find Us", href: "#visit", id: "visit", icon: "📍", onClick: openFindUs },
    { name: "Contact", href: "#contact", id: "contact", icon: "📞" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAF6F0]/95 backdrop-blur-md shadow-sm py-2.5 sm:py-3 border-b border-[#E8DDD5]/60"
            : "bg-[#FAF6F0] py-3 sm:py-4"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3.5 sm:px-6 lg:px-8">
          
          {/* Left: Ice Cream Parlour Brand Name & Logo */}
          <a
            href="#top"
            onClick={handleLogoClick}
            aria-label="Delicious Scoops Ice Cream Parlour - Return to Top"
            className="group flex items-center gap-2 sm:gap-3 py-1 px-1.5 -ml-1.5 rounded-2xl transition-all duration-200 hover:bg-[#F4EBE4]/60 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#D8436B] cursor-pointer shrink-0"
          >
            <div className="relative flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-[#FCE7EC] text-[#D8436B] shadow-xs transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#D8436B] group-hover:text-white">
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6 stroke-current"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Stylized Ice Cream Cone */}
                <path d="M7 10c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" />
                <path d="M5.5 10a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0" />
                <path d="M7 12.5 12 21l5-8.5" />
                <circle cx="12" cy="4" r="1.5" fill="currentColor" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="font-display text-[17px] xs:text-lg sm:text-2xl font-bold tracking-tight text-[#221815] transition-colors group-hover:text-[#D8436B] leading-tight">
                Delicious Scoops
              </span>
              <span className="text-[8px] sm:text-[10px] font-bold tracking-[0.16em] sm:tracking-[0.22em] text-[#796660] uppercase leading-tight">
                Ice Cream Parlour
              </span>
            </div>
          </a>

          {/* Center: Desktop Nav Links */}
          <nav className="hidden items-center gap-7 lg:gap-8 md:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.onClick)}
                  className={`relative text-sm font-medium transition-colors hover:text-[#D8436B] py-1 ${
                    isActive
                      ? "text-[#D8436B] font-bold after:absolute after:-bottom-1 after:left-0 after:h-[2.5px] after:w-full after:rounded-full after:bg-[#D8436B]"
                      : "text-[#5C4A44]"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right: Actions (Search, Order Now, Cart, Mobile Toggle) */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Search Button */}
            <button
              onClick={openSearch}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-[#221815] transition-colors hover:bg-[#F4EBE4] hover:text-[#D8436B] active:scale-95"
              aria-label="Search flavours"
              title="Search menu flavours"
            >
              <Search className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </button>

            {/* Order Now Button (Desktop & Tablet) */}
            <button
              onClick={openCart}
              className="hidden items-center gap-2 rounded-full bg-[#221815] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#3D2C28] hover:shadow-md sm:flex active:scale-98"
            >
              <span>Order Now</span>
              <span className="text-xs">→</span>
            </button>

            {/* Cart Icon & Live Count */}
            <button
              onClick={openCart}
              className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#F4EBE4] text-[#221815] transition-all hover:bg-[#FCE7EC] hover:text-[#D8436B] active:scale-95"
              aria-label={`View Shopping Cart, ${cartCount} items`}
              title="View Cart"
            >
              <ShoppingBag className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
              <span className="absolute -right-1 -top-1 flex h-4.5 min-w-4.5 sm:h-5 sm:min-w-5 items-center justify-center rounded-full bg-[#D8436B] px-1 text-[10px] sm:text-[11px] font-bold text-white shadow-sm transition-transform animate-pulse-gentle">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger / Close Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-[#221815] md:hidden hover:bg-[#F4EBE4] active:scale-95"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-[#D8436B]" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />

          {/* Slide-Down Menu Sheet */}
          <div className="relative z-40 max-h-[85vh] overflow-y-auto bg-[#FAF6F0] border-b border-[#E8DDD5] shadow-2xl pt-20 px-4 pb-6 animate-in slide-in-from-top-4 duration-300">
            
            {/* Parlour Info Card */}
            <div className="mb-4 overflow-hidden rounded-2xl bg-white p-3.5 shadow-xs border border-[#E8DDD5]/80">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FCE7EC] text-[#D8436B]">
                  <Store className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-base font-bold text-[#221815] truncate">
                    {PARLOUR_INFO.name}
                  </h3>
                  <p className="text-[11px] text-[#796660] truncate">
                    {PARLOUR_INFO.address}
                  </p>
                </div>
              </div>

              {/* Quick Contact & Direction Pills */}
              <div className="mt-3 flex items-center gap-2 border-t border-[#F4EBE4] pt-2.5">
                <a
                  href={PARLOUR_INFO.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#FAF6F0] py-2 text-[11px] font-bold text-[#221815] hover:bg-[#FCE7EC] hover:text-[#D8436B] transition-colors"
                >
                  <MapPin className="h-3.5 w-3.5 text-[#D8436B]" />
                  <span>Get Directions</span>
                </a>

                <a
                  href={PARLOUR_INFO.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => recordWhatsAppClick("Navbar Mobile Drawer")}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#FAF6F0] py-2 text-[11px] font-bold text-[#221815] hover:bg-[#E8F8EE] hover:text-[#25D366] transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-emerald-600" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.onClick)}
                    className={`flex items-center justify-between py-3 px-4 rounded-xl text-sm font-semibold transition-all active:scale-98 ${
                      isActive
                        ? "text-[#D8436B] bg-[#FCE7EC] shadow-xs"
                        : "text-[#221815] bg-white/70 hover:bg-white border border-[#E8DDD5]/60"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{link.icon}</span>
                      <span>{link.name}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-[#A6928B]" />
                  </a>
                );
              })}
            </nav>

            {/* Action Buttons in Mobile Menu */}
            <div className="mt-4 flex flex-col gap-2.5 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCart();
                }}
                className="flex w-full items-center justify-between rounded-full bg-[#221815] px-5 py-3.5 text-sm font-semibold text-white shadow-md active:bg-[#3D2C28] active:scale-98"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-[#FCE7EC]" />
                  <span>Order Online Now</span>
                </span>
                <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-bold">
                  {cartCount > 0 ? `₹${cartTotal}` : "→"}
                </span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openSearch();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#E8DDD5] bg-white py-3 text-xs font-bold text-[#5C4A44] shadow-2xs hover:bg-[#FAF6F0] active:scale-98"
              >
                <Search className="h-3.5 w-3.5 text-[#796660]" />
                <span>Search Menu Flavours</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
