import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { business, navLinks, hours } from "@/data/business";
import { ActionButton } from "./ActionButton";

export function UtilityBar() {
  const today = hours[new Date().getDay()];
  return (
    <div className="bg-secondary text-secondary-foreground">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 text-xs sm:justify-between">
        <p>
          <span className="opacity-70">Today ({today?.day}):</span> {today?.hours}
        </p>
        <a
          href={business.phoneHref}
          className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline"
        >
          <Phone aria-hidden="true" className="size-3.5" />
          {business.phone}
        </a>
      </div>
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6"
      >
        <a
          href="#top"
          className="font-display text-lg font-semibold tracking-tight text-espresso sm:text-xl"
        >
          STACK <span className="text-primary">CREAMERY</span>
        </a>

        <ul className="hidden items-center gap-8 text-sm md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-espresso"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ActionButton href={business.orderOnlineUrl} className="hidden sm:inline-flex">
            Order Online
          </ActionButton>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-full border border-border p-2 text-espresso md:hidden"
          >
            {open ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-border bg-background md:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border/60 py-3 text-base text-espresso last:border-0"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="px-4 pb-4">
            <ActionButton
              href={business.orderOnlineUrl}
              size="lg"
              className="w-full"
            >
              Order Online
            </ActionButton>
          </div>
        </div>
      )}
    </header>
  );
}
