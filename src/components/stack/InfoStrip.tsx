import { MapPin, Star, ShoppingBag, Bike, Smartphone } from "lucide-react";
import { business } from "@/data/business";

const serviceIcons = [ShoppingBag, Bike, Smartphone];

export function InfoStrip() {
  return (
    <section aria-label="Ratings and services" className="bg-secondary text-secondary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col divide-y divide-secondary-foreground/15 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between md:divide-x md:divide-y-0">
        <div className="flex items-center gap-3 pb-4 md:pb-0 md:pr-8">
          <Star aria-hidden="true" className="size-6 fill-mint text-mint" />
          <p className="text-sm">
            <span className="font-display text-xl font-semibold">
              {business.rating} ★
            </span>{" "}
            <span className="opacity-80">· {business.reviewCount} Reviews</span>
          </p>
        </div>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 py-4 text-sm md:px-8 md:py-0">
          {business.services.map((service, i) => {
            const Icon = serviceIcons[i] ?? ShoppingBag;
            return (
              <li key={service} className="flex items-center gap-2">
                <Icon aria-hidden="true" className="size-4 opacity-80" />
                {service}
              </li>
            );
          })}
        </ul>

        <p className="flex items-center gap-2 pt-4 text-sm md:pt-0 md:pl-8">
          <MapPin aria-hidden="true" className="size-4 opacity-80" />
          {business.address.city}, {business.address.state}
        </p>
      </div>
    </section>
  );
}
