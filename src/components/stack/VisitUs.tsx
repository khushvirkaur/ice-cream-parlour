import { MapPin, Phone, Navigation } from "lucide-react";
import { business } from "@/data/business";
import { ActionButton } from "./ActionButton";
import { Hours } from "./Hours";
import { Reveal } from "./Reveal";

export function VisitUs() {
  return (
    <section id="visit" className="scroll-mt-24 bg-vanilla py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            Visit Us
          </p>
          <h2 className="mt-3 text-3xl text-espresso sm:text-4xl md:text-5xl">
            Find us on Central Ave
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col gap-6 rounded-3xl border border-border bg-card p-6 sm:p-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="flex items-center gap-2 text-lg text-espresso">
                    <MapPin aria-hidden="true" className="size-4 text-primary" />
                    Address
                  </h3>
                  <address className="mt-2 text-sm leading-relaxed text-muted-foreground not-italic">
                    {business.address.street}
                    <br />
                    {business.address.city}, {business.address.state}{" "}
                    {business.address.zip}
                    <br />
                    {business.address.country}
                  </address>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 text-lg text-espresso">
                    <Phone aria-hidden="true" className="size-4 text-primary" />
                    Phone
                  </h3>
                  <a
                    href={business.phoneHref}
                    className="mt-2 inline-block text-sm text-muted-foreground underline-offset-4 hover:text-espresso hover:underline"
                  >
                    {business.phone}
                  </a>
                  <h3 className="mt-6 text-lg text-espresso">Service options</h3>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {business.services.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                aria-hidden="true"
                className="relative flex min-h-44 flex-1 items-center justify-center overflow-hidden rounded-2xl border border-border bg-biscuit/50"
              >
                <div className="absolute inset-0 opacity-40 [background:repeating-linear-gradient(90deg,transparent_0_38px,color-mix(in_oklab,var(--espresso)_12%,transparent)_38px_39px),repeating-linear-gradient(0deg,transparent_0_38px,color-mix(in_oklab,var(--espresso)_12%,transparent)_38px_39px)]" />
                <p className="relative flex items-center gap-2 text-sm font-medium text-espresso">
                  <MapPin className="size-4 text-primary" />
                  {business.address.street}, {business.address.city}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <ActionButton href={business.mapsUrl} size="lg">
                  <Navigation aria-hidden="true" className="size-4" />
                  Get Directions
                </ActionButton>
                <ActionButton href={business.phoneHref} variant="outline" size="lg">
                  Call {business.phone}
                </ActionButton>
              </div>
              <p className="text-xs text-muted-foreground">
                Map link: {business.mapsUrl}
              </p>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <Hours />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
