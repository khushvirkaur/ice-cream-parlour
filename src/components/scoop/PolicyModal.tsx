import React, { useState, useEffect, useMemo } from "react";
import {
  X,
  ShieldCheck,
  FileText,
  RotateCcw,
  Truck,
  AlertTriangle,
  Cookie,
  Search,
  Printer,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  Info,
  ExternalLink,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { POLICIES_DATA, PolicyTab, PolicyDocument } from "@/data/policiesData";
import { PARLOUR_INFO } from "@/data/scoopData";
import { recordWhatsAppClick } from "@/lib/analytics";

const TAB_ICONS: Record<PolicyTab, React.ComponentType<{ className?: string }>> = {
  privacy: ShieldCheck,
  terms: FileText,
  refunds: RotateCcw,
  shipping: Truck,
  allergens: AlertTriangle,
  cookies: Cookie,
};

export function PolicyModal() {
  const { isPolicyOpen, activePolicyTab, openPolicy, closePolicy } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  // Lock body scroll and handle escape key
  useEffect(() => {
    if (!isPolicyOpen) {
      setSearchQuery("");
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePolicy();
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isPolicyOpen, closePolicy]);

  const currentPolicy: PolicyDocument = POLICIES_DATA[activePolicyTab] || POLICIES_DATA.privacy;

  // Filter sections by search query if present
  const filteredSections = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return currentPolicy.sections;

    return currentPolicy.sections.filter((section) => {
      const matchTitle = section.title.toLowerCase().includes(q);
      const matchContent = section.content.some((c) => c.toLowerCase().includes(q));
      const matchBullets = section.bullets?.some((b) => b.toLowerCase().includes(q));
      const matchCallout = section.callout?.text.toLowerCase().includes(q);
      return matchTitle || matchContent || matchBullets || matchCallout;
    });
  }, [currentPolicy, searchQuery]);

  const handlePrint = () => {
    window.print();
  };

  if (!isPolicyOpen) return null;

  const ActiveIcon = TAB_ICONS[activePolicyTab] || ShieldCheck;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-dialog-title"
    >
      {/* Backdrop */}
      <div
        onClick={closePolicy}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Modal Container */}
      <div className="relative flex flex-col w-full max-w-4xl h-[92vh] max-h-[820px] rounded-3xl bg-[#FAF6F0] shadow-2xl z-10 border border-[#E8DDD5] overflow-hidden animate-in zoom-in-95">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-[#E8DDD5] bg-[#221815] px-4 sm:px-6 py-4 text-white">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[#3D2C28] text-[#FCE7EC] border border-white/10">
              <ActiveIcon className="h-5 w-5 text-[#F48FB1]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#C8B8B2]">
                  Legal & Compliance
                </span>
                <span className="hidden sm:inline-block rounded-full bg-[#FCE7EC]/15 px-2 py-0.5 text-[10px] font-semibold text-[#FCE7EC]">
                  {currentPolicy.badge}
                </span>
              </div>
              <h2 id="policy-dialog-title" className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">
                {currentPolicy.title}
              </h2>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={handlePrint}
              title="Print policy"
              className="hidden sm:flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-[#C8B8B2] hover:bg-white/10 hover:text-white transition-colors"
            >
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </button>
            <button
              onClick={closePolicy}
              className="rounded-full p-2 text-[#C8B8B2] hover:bg-white/10 hover:text-white transition-colors active:scale-95"
              aria-label="Close policies modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="border-b border-[#E8DDD5] bg-[#F4EBE4]/70 px-3 sm:px-6 py-2.5 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
            {(Object.keys(POLICIES_DATA) as PolicyTab[]).map((tabKey) => {
              const tab = POLICIES_DATA[tabKey];
              const TabIcon = TAB_ICONS[tabKey];
              const isActive = activePolicyTab === tabKey;
              return (
                <button
                  key={tabKey}
                  onClick={() => {
                    openPolicy(tabKey);
                    setSearchQuery("");
                  }}
                  className={`flex items-center gap-1.5 rounded-full px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#221815] text-white shadow-xs scale-102"
                      : "bg-white/80 text-[#5C4A44] hover:bg-white hover:text-[#221815] border border-[#E8DDD5]/60"
                  }`}
                >
                  <TabIcon className={`h-3.5 w-3.5 ${isActive ? "text-[#F48FB1]" : "text-[#796660]"}`} />
                  <span>{tab.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search / Filter Sub-bar */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#FAF6F0] border-b border-[#E8DDD5]/60 flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#796660]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search within ${currentPolicy.shortTitle} policy...`}
              className="w-full rounded-full bg-white pl-8 pr-7 py-1.5 text-xs text-[#221815] placeholder-[#8D7B75] border border-[#E8DDD5] focus:border-[#D8436B] focus:outline-none focus:ring-1 focus:ring-[#D8436B]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#796660] hover:text-[#221815]"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
          <div className="text-[11px] text-[#796660] shrink-0 font-medium">
            Effective: <span className="text-[#221815] font-semibold">{currentPolicy.lastUpdated}</span>
          </div>
        </div>

        {/* Scrollable Policy Body */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-5 space-y-6">
          
          {/* Policy Summary Callout Banner */}
          <div className="rounded-2xl bg-white p-4 sm:p-5 border border-[#E8DDD5] shadow-xs flex items-start gap-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FCE7EC] text-[#D8436B]">
              <Info className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#796660]">Policy Summary</h4>
              <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#5C4A44]">
                {currentPolicy.summary}
              </p>
            </div>
          </div>

          {/* If search query yielded no results */}
          {filteredSections.length === 0 && (
            <div className="rounded-2xl bg-white p-8 text-center border border-[#E8DDD5]">
              <AlertCircle className="h-8 w-8 text-[#796660] mx-auto mb-2 opacity-50" />
              <p className="text-sm font-semibold text-[#221815]">No matching clauses found</p>
              <p className="text-xs text-[#796660] mt-1">Try a different search term or clear the filter.</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-3 text-xs font-semibold text-[#D8436B] hover:underline"
              >
                Clear search filter
              </button>
            </div>
          )}

          {/* Sections List */}
          <div className="space-y-6">
            {filteredSections.map((section, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white p-5 sm:p-6 border border-[#E8DDD5]/80 shadow-xs"
              >
                <h3 className="font-display text-base sm:text-lg font-bold text-[#221815] flex items-center gap-2">
                  <span>{section.title}</span>
                </h3>

                {/* Main Paragraphs */}
                <div className="mt-2.5 space-y-2 text-xs sm:text-sm leading-relaxed text-[#4A3B36]">
                  {section.content.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>

                {/* Bullet Points */}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="mt-3.5 space-y-2 text-xs sm:text-sm text-[#4A3B36]">
                    {section.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#FCE7EC] text-[#D8436B] text-[10px] font-bold mt-0.5">
                          ✓
                        </span>
                        <span className="leading-snug">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Highlight Callout Box */}
                {section.callout && (
                  <div
                    className={`mt-4 rounded-xl p-3.5 text-xs sm:text-sm flex items-start gap-2.5 border ${
                      section.callout.type === "warning"
                        ? "bg-[#FFF4E5] border-[#FFE2B8] text-[#8C4A00]"
                        : section.callout.type === "success"
                        ? "bg-[#EBF7EE] border-[#C7EBD0] text-[#1E5629]"
                        : "bg-[#F0F5FA] border-[#D1E2F2] text-[#1E4366]"
                    }`}
                  >
                    {section.callout.type === "warning" ? (
                      <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                    ) : section.callout.type === "success" ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                    ) : (
                      <Info className="h-4 w-4 shrink-0 mt-0.5" />
                    )}
                    <span className="font-medium leading-relaxed">{section.callout.text}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Official Parlour Contact & Inquiries Footer Box */}
          <div className="rounded-2xl bg-[#221815] text-[#FAF6F0] p-5 sm:p-6 border border-white/10 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8B8B2]">
                  Legal Inquiries & Support
                </span>
                <h4 className="font-display text-base sm:text-lg font-bold text-white mt-0.5">
                  Have a question about our policies?
                </h4>
                <p className="text-xs text-[#C8B8B2] mt-1 max-w-md">
                  Our parlour manager and compliance team are available daily to answer questions regarding allergens, billing, or privacy.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={PARLOUR_INFO.emailUrl}
                  className="flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-[#F48FB1]" />
                  <span>{PARLOUR_INFO.email}</span>
                </a>
                <a
                  href={PARLOUR_INFO.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => recordWhatsAppClick("Policy Modal Support")}
                  className="flex items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#20BA5A] transition-colors shadow-xs"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Bottom Action Bar */}
        <div className="border-t border-[#E8DDD5] bg-[#FAF6F0] px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#796660] text-center sm:text-left">
            © 2026 {PARLOUR_INFO.name}. All policies are strictly compliant with consumer food safety and privacy standards.
          </p>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={closePolicy}
              className="w-full sm:w-auto rounded-full bg-[#221815] px-6 py-2 text-xs font-semibold text-white hover:bg-[#3D2C28] transition-colors active:scale-95 shadow-xs"
            >
              I Understand & Agree
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
