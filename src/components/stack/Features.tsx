import { IceCream2, Scale, HeartHandshake, SlidersHorizontal } from "lucide-react";
import { Reveal } from "./Reveal";

const features = [
  {
    icon: IceCream2,
    title: "Delicious Desserts",
    body: "Customer reviews highlight the ice cream and milkshakes.",
  },
  {
    icon: Scale,
    title: "Great Portions",
    body: "Reviews mention good portions for the price.",
  },
  {
    icon: HeartHandshake,
    title: "Friendly Service",
    body: "Customers regularly mention friendly, helpful staff.",
  },
  {
    icon: SlidersHorizontal,
    title: "Customizable Options",
    body: "Customer feedback mentions customizable options.",
  },
];

export function Features() {
  return (
    <section aria-labelledby="features-heading" className="bg-vanilla py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <h2
            id="features-heading"
            className="text-3xl text-espresso sm:text-4xl md:text-5xl"
          >
            Why customers love Stack Creamery
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Themes that come up again and again in Google reviews.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <Reveal as="li" key={feature.title} delay={i * 80}>
              <div className="h-full rounded-3xl border border-border bg-background p-6 transition-transform duration-300 hover:-translate-y-1">
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-mint text-mint-foreground">
                  <feature.icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-5 text-lg text-espresso">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
