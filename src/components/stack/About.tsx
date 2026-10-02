import shopInterior from "@/assets/shop-interior.jpg";
import { business } from "@/data/business";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-vanilla py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-16">
        <Reveal>
          <figure>
            <img
              src={shopInterior}
              alt="Warmly lit ice cream shop counter with a display case and waffle cones"
              loading="lazy"
              width={1408}
              height={1008}
              className="aspect-4/3 w-full rounded-[2rem] object-cover shadow-soft"
            />
            <figcaption className="mt-3 text-xs text-muted-foreground">
              Representative image, not a photograph of Stack Creamery.
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={90}>
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            About
          </p>
          <h2 className="mt-3 text-3xl text-espresso sm:text-4xl md:text-5xl">
            A Jersey City ice cream destination
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Stack Creamery is an ice cream shop on Central Ave in Jersey City,
            built around one simple idea: dessert should be easy to get and
            worth going back for. Stop in for takeaway, get it delivered, or
            place your order online.
          </p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {business.services.map((service) => (
              <div
                key={service}
                className="rounded-2xl border border-border bg-background p-4"
              >
                <dt className="text-sm font-medium text-espresso">{service}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">Available</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-muted-foreground">
            Customer appreciation shows up in a {business.rating}-star rating
            across {business.reviewCount} Google reviews.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
