import React from "react";
import { Instagram, Facebook, Youtube, Lock, Mail, Phone, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PolicyTab } from "@/data/policiesData";
import { PARLOUR_INFO } from "@/data/scoopData";
import { recordWhatsAppClick } from "@/lib/analytics";

export function Footer() {
  const { openFindUs, openPolicy } = useCart();

  const footerLinks = [
    { name: "Home", href: "#top" },
    { name: "Our Flavours", href: "#flavours" },
    { name: "Menu", href: "#menu" },
    { name: "About", href: "#about" },
    { name: "Find Us", href: "#visit", onClick: openFindUs },
    { name: "Contact", href: "#contact" },
  ];

  const policyLinks: { name: string; tab: PolicyTab; href: string }[] = [
    { name: "Privacy Policy", tab: "privacy", href: "#privacy" },
    { name: "Terms of Service", tab: "terms", href: "#terms" },
    { name: "Refund & Cancellation", tab: "refunds", href: "#refunds" },
    { name: "Shipping & Delivery", tab: "shipping", href: "#shipping" },
    { name: "Allergen Guide", tab: "allergens", href: "#allergens" },
    { name: "Cookie Policy", tab: "cookies", href: "#cookies" },
  ];

  return (
    <footer id="contact" className="bg-[#18110F] text-[#E8DDD5] pt-12 sm:pt-16 pb-10 sm:pb-12 scroll-mt-10 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col gap-8 sm:gap-10 md:flex-row md:items-center md:justify-between border-b border-white/10 pb-8 sm:pb-12">
          
          {/* Left: Brand Logo & Tagline (Clickable to scroll to top) */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group flex items-center gap-3 cursor-pointer w-fit"
            aria-label="Delicious Scoops - Back to top"
          >
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-[#2A1D1A] text-[#FCE7EC] border border-white/10 transition-transform group-hover:scale-105">
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6 stroke-current fill-none"
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
            <div className="flex flex-col">
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-[#FCE7EC]">
                Delicious Scoops
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] sm:tracking-[0.25em] text-[#A6928B] uppercase">
                More Than Ice Cream
              </span>
            </div>
          </a>

          {/* Center: Navigation Links */}
          <nav className="flex flex-wrap items-center gap-4 sm:gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                }}
                className="text-xs sm:text-sm font-medium text-[#C8B8B2] transition-colors hover:text-white py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right: Social Icons + Handwritten Tagline */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <a
                href="https://www.instagram.com/kaur_khushvir"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#251A17] text-[#C8B8B2] transition-colors hover:bg-[#D8436B] hover:text-white active:scale-95"
                aria-label="Instagram (kaur_khushvir)"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#251A17] text-[#C8B8B2] transition-colors hover:bg-[#D8436B] hover:text-white active:scale-95"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#251A17] text-[#C8B8B2] transition-colors hover:bg-[#D8436B] hover:text-white active:scale-95"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>

            {/* Handwritten Script Sign-off */}
            <div className="flex items-center gap-1.5 font-script text-lg sm:text-xl text-[#FCE7EC]">
              <span>Sweet Moments Happier People</span>
              <span className="text-base text-[#D8436B]">♡</span>
            </div>
          </div>

        </div>

        {/* Direct Contact Bar: WhatsApp & Email Direct Redirections */}
        <div className="py-6 sm:py-8 border-b border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#F48FB1]">
              GET IN TOUCH
            </span>
            <h4 className="font-display text-base sm:text-lg font-bold text-white">
              Have questions, party catering, or special scoop orders?
            </h4>
            <p className="text-xs text-[#A6928B]">
              Chat directly on WhatsApp or drop us an email — we're always happy to connect!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* WhatsApp Direct Contact Button with auto-typed 'Hello Delicious Scoops!' */}
            <a
              href={PARLOUR_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => recordWhatsAppClick("Footer Contact Bar")}
              className="group flex items-center gap-2.5 rounded-full bg-[#25D366]/15 border border-[#25D366]/35 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#25D366] hover:text-[#0C2A12] transition-all active:scale-95 shadow-xs"
              aria-label="Chat with us on WhatsApp"
            >
              {/* Official WhatsApp SVG Logo */}
              <svg
                className="h-4 w-4 fill-current text-[#25D366] group-hover:text-[#0C2A12] transition-colors shrink-0"
                viewBox="0 0 24 24"
              >
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.072-1.802-.412-1.393-.578-2.311-1.996-2.38-2.088-.07-.093-.563-.75-.563-1.429 0-.678.354-1.012.48-1.144.125-.133.272-.167.362-.167.091 0 .181.001.261.005.084.004.197-.032.308.234.113.271.385.938.419 1.006.034.068.057.148.011.239-.045.091-.068.148-.135.227-.068.079-.143.177-.204.238-.068.068-.139.141-.06.277.079.136.351.58.753.938.518.462.955.605 1.091.673.136.068.216.057.295-.034.079-.091.339-.396.43-.532.09-.136.181-.113.305-.068.125.045.792.373.928.441.136.068.226.102.26.159.034.057.034.329-.11.734zM12.042 2C6.518 2 2.038 6.477 2.035 12c-.001 2.215.647 3.978 1.776 5.485L2 22l4.673-1.748C8.118 21.282 10.027 22 12.042 22c5.522 0 10.002-4.477 10.002-10 0-5.522-4.48-10-10.002-10z" />
              </svg>
              <span>WhatsApp</span>
            </a>

            {/* Email Direct Contact Button */}
            <a
              href={PARLOUR_INFO.emailUrl}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-[#251A17] px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#E8DDD5] hover:border-white/30 hover:bg-[#342420] hover:text-white transition-all active:scale-95 shadow-xs"
              aria-label="Email: nimrat10416@gmail.com"
            >
              <Mail className="h-4 w-4 text-[#F48FB1] shrink-0" />
              <span>{PARLOUR_INFO.email}</span>
            </a>
          </div>
        </div>

        {/* Bottom Copyright & Policy Links */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs text-[#8D7B75] text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <p>© 2026 Delicious Scoops. All rights reserved.</p>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="flex items-center gap-1 text-[#A6928B]">
              <Lock className="h-3 w-3 text-[#C8E6C9]" />
              256-Bit SSL Encrypted Checkout
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <a
              href="/admin"
              className="flex items-center gap-1 text-[#8D7B75] hover:text-[#F48FB1] transition-colors"
              title="Admin Portal Login"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Admin Portal</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3.5 sm:gap-5">
            {policyLinks.map((policy) => (
              <a
                key={policy.tab}
                href={policy.href}
                onClick={(e) => {
                  e.preventDefault();
                  openPolicy(policy.tab);
                }}
                className="hover:text-white transition-colors cursor-pointer text-[#A6928B]"
              >
                {policy.name}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
