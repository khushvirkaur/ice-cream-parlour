import React from "react";
import { X, MapPin, Phone, Clock, Mail, Navigation } from "lucide-react";
import { PARLOUR_INFO } from "@/data/scoopData";
import { useCart } from "@/context/CartContext";
import { recordWhatsAppClick } from "@/lib/analytics";

export function FindUsModal() {
  const { isFindUsOpen, closeFindUs } = useCart();

  React.useEffect(() => {
    if (!isFindUsOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeFindUs();
    };
    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isFindUsOpen, closeFindUs]);

  if (!isFindUsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div
        onClick={closeFindUs}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-[#FAF6F0] p-5 sm:p-8 shadow-2xl z-10 border border-[#E8DDD5] animate-in zoom-in-95">
        
        {/* Close Button */}
        <button
          onClick={closeFindUs}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 rounded-full p-2 text-[#796660] hover:bg-[#F4EBE4] hover:text-[#221815] active:scale-95"
          aria-label="Close parlour modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-start pr-8">
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.25em] text-[#796660] uppercase">
            VISIT OUR PARLOUR
          </span>
          <h3 className="font-display text-xl sm:text-3xl font-bold text-[#221815] mt-1">
            Find Delicious Scoops
          </h3>
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#5C4A44]">
            Step inside our cozy creamery for warm smiles and freshly scooped delights.
          </p>
        </div>

        {/* Details Card */}
        <div className="mt-5 sm:mt-6 flex flex-col gap-3.5 sm:gap-4 rounded-2xl bg-white p-4 sm:p-5 border border-[#E8DDD5]/80 shadow-xs">
          
          <div className="flex items-start gap-3 sm:gap-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FCE7EC] text-[#D8436B]">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#796660]">Address</h4>
              <p className="text-xs sm:text-sm font-semibold text-[#221815] mt-0.5">{PARLOUR_INFO.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:gap-3.5 border-t border-[#F4EBE4] pt-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E2EEDA] text-[#2B4524]">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#796660]">Opening Hours</h4>
              <p className="text-xs sm:text-sm font-semibold text-[#221815] mt-0.5">{PARLOUR_INFO.hours}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:gap-3.5 border-t border-[#F4EBE4] pt-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8F8EE] text-[#25D366]">
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#796660]">WhatsApp & Contact</h4>
              <a
                href={PARLOUR_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => recordWhatsAppClick("Find Us Modal")}
                className="text-xs sm:text-sm font-semibold text-[#221815] hover:text-[#25D366] transition-colors mt-0.5 block"
              >
                {PARLOUR_INFO.phone} <span className="text-[11px] font-normal text-[#796660]">(Chat on WhatsApp)</span>
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:gap-3.5 border-t border-[#F4EBE4] pt-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FCE7EC] text-[#D8436B]">
              <Mail className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#796660]">Email</h4>
              <a
                href={PARLOUR_INFO.emailUrl}
                className="text-xs sm:text-sm font-semibold text-[#221815] hover:text-[#D8436B] transition-colors mt-0.5 block break-all"
              >
                {PARLOUR_INFO.email}
              </a>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
          <a
            href={PARLOUR_INFO.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#221815] py-3 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-[#3D2C28] active:scale-98"
          >
            <Navigation className="h-4 w-4" />
            <span>Get Directions</span>
          </a>
          <a
            href={PARLOUR_INFO.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => recordWhatsAppClick("Find Us Modal")}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] text-white py-3 text-xs sm:text-sm font-semibold hover:bg-[#20BA5A] transition-colors active:scale-98 shadow-xs"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.072-1.802-.412-1.393-.578-2.311-1.996-2.38-2.088-.07-.093-.563-.75-.563-1.429 0-.678.354-1.012.48-1.144.125-.133.272-.167.362-.167.091 0 .181.001.261.005.084.004.197-.032.308.234.113.271.385.938.419 1.006.034.068.057.148.011.239-.045.091-.068.148-.135.227-.068.079-.143.177-.204.238-.068.068-.139.141-.06.277.079.136.351.58.753.938.518.462.955.605 1.091.673.136.068.216.057.295-.034.079-.091.339-.396.43-.532.09-.136.181-.113.305-.068.125.045.792.373.928.441.136.068.226.102.26.159.034.057.034.329-.11.734zM12.042 2C6.518 2 2.038 6.477 2.035 12c-.001 2.215.647 3.978 1.776 5.485L2 22l4.673-1.748C8.118 21.282 10.027 22 12.042 22c5.522 0 10.002-4.477 10.002-10 0-5.522-4.48-10-10.002-10z" />
            </svg>
            <span>WhatsApp Us</span>
          </a>
        </div>

      </div>
    </div>
  );
}
