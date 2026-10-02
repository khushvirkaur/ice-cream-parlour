import { MapPin, Star } from "lucide-react";
import heroImage from "@/assets/hero-ice-cream.jpg";
import { business } from "@/data/business";
import { ActionButton } from "./ActionButton";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-12 pb-16 sm:px-6 md:grid-cols-[1.05fr_1fr] md:gap-14 md:pt-20 md:pb-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-mint px-3.5 py-1.5 text-xs font-medium text-mint-foreground">
            <MapPin aria-hidden="true" className="size-3.5" />
            Central Ave, Jersey City
          </p>
          <h1 className="mt-6 text-4xl leading-[1.03] text-espresso sm:text-5xl md:text-6xl">
            Ice Cream Worth
            <span className="block text-primary">Stacking Up For.</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Indulgent ice cream and dessert options in Jersey City — served for
            takeaway, delivery, or ordered online in a couple of taps.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ActionButton href={business.orderOnlineUrl} size="lg">
              Order Online
            </ActionButton>
            <ActionButton href="#menu" variant="outline" size="lg">
              View Menu
            </ActionButton>
          </div>

          <p className="mt-7 flex items-center gap-2 text-sm text-muted-foreground">
            <Star
              aria-hidden="true"
              className="size-4 fill-primary text-primary"
            />
            <span className="font-medium text-espresso">
              {business.rating} stars
            </span>
            from {business.reviewCount} Google reviews
          </p>
        </div>

        <figure className="relative">
          <div className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-biscuit/60" />
          <img
            src={heroImage}
            width={1408}
            height={1600}
            alt="Assorted ice cream scoops in a waffle cone and cups with strawberry sauce"
            className="aspect-4/5 w-full rounded-[2rem] object-cover shadow-lift"
          />
          <figcaption className="mt-3 text-xs text-muted-foreground">
            Representative image, not a photograph of Stack Creamery.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
