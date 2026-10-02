import { Phone, Navigation, ShoppingBag } from "lucide-react";
import { business } from "@/data/business";
import { ActionButton } from "./ActionButton";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="grid gap-8 rounded-3xl border border-border bg-card p-8 md:grid-cols-2 md:items-center md:p-12">
            <div>
              <h2 className="text-2xl text-espresso sm:text-3xl">
                {business.name}
              </h2>
              <address className="mt-4 text-sm leading-relaxed text-muted-foreground not-italic">
                {business.address.street}
                <br />
                {business.address.city}, {business.address.state}{" "}
                {business.address.zip}
                <br />
                {business.address.country}
              </address>
              <p className="mt-4 text-sm text-muted-foreground">
                Phone:{" "}
                <a
                  href={business.phoneHref}
                  className="text-espresso underline-offset-4 hover:underline"
                >
                  {business.phone}
                </a>
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <ActionButton href={business.phoneHref} variant="outline" size="lg">
                <Phone aria-hidden="true" className="size-4" />
                Call
              </ActionButton>
              <ActionButton href={business.mapsUrl} variant="outline" size="lg">
                <Navigation aria-hidden="true" className="size-4" />
                Get Directions
              </ActionButton>
              <ActionButton href={business.orderOnlineUrl} size="lg">
                <ShoppingBag aria-hidden="true" className="size-4" />
                Order Online
              </ActionButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
