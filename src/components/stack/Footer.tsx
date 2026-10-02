import { business, hours, navLinks } from "@/data/business";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-xl font-semibold">STACK CREAMERY</p>
            <p className="mt-3 max-w-sm text-sm opacity-80">
              An ice cream shop in Jersey City, NJ — takeaway, delivery, and
              online ordering.
            </p>
            <address className="mt-5 text-sm opacity-80 not-italic">
              {business.address.street}, {business.address.city},{" "}
              {business.address.state} {business.address.zip}
            </address>
            <p className="mt-2 text-sm">
              <a
                href={business.phoneHref}
                className="underline-offset-4 hover:underline"
              >
                {business.phone}
              </a>
            </p>
            <p className="mt-1 text-sm opacity-80">{business.website}</p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-sm font-semibold tracking-wide uppercase">Explore</h2>
            <ul className="mt-4 space-y-2 text-sm opacity-85">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="underline-offset-4 hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#order" className="underline-offset-4 hover:underline">
                  Order Online
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold tracking-wide uppercase">Hours</h2>
            <ul className="mt-4 space-y-1.5 text-sm opacity-85">
              {hours.map((entry) => (
                <li key={entry.day} className="flex justify-between gap-3">
                  <span>{entry.day.slice(0, 3)}</span>
                  <span>{entry.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-secondary-foreground/15 pt-6 text-xs opacity-70">
          © {year} {business.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
