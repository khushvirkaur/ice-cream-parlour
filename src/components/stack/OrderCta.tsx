import { business } from "@/data/business";
import { ActionButton } from "./ActionButton";
import { Reveal } from "./Reveal";

export function OrderCta() {
  return (
    <section id="order" className="scroll-mt-24 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="rounded-[2.5rem] bg-secondary px-6 py-14 text-center text-secondary-foreground sm:px-14 md:py-20">
            <h2 className="mx-auto max-w-2xl text-3xl sm:text-4xl md:text-5xl">
              Your Next Scoop Is Just a Click Away.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base opacity-85">
              Order for delivery or pick it up on Central Ave — whichever gets
              dessert to you faster.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ActionButton href={business.orderOnlineUrl} size="lg">
                Order Online
              </ActionButton>
              <ActionButton href="#menu" variant="cream" size="lg">
                View Menu
              </ActionButton>
            </div>
            <p className="mt-6 text-xs opacity-70">
              Ordering link: {business.orderOnlineUrl}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
