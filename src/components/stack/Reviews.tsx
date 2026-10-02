import { Star } from "lucide-react";
import { business } from "@/data/business";
import { Reveal } from "./Reveal";

// Only verified review wording may be placed here. Until excerpts are supplied
// by the business, these slots stay marked as placeholders.
const reviewExcerpts = [
  { text: "[VERIFIED REVIEW EXCERPT]", author: "[Google reviewer]" },
  { text: "[VERIFIED REVIEW EXCERPT]", author: "[Google reviewer]" },
];

const sentiments = ["Ice cream", "Milkshakes", "Portions", "Friendly staff", "Customizable"];

export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              Social proof
            </p>
            <h2 className="mt-3 text-3xl text-espresso sm:text-4xl">
              Rated {business.rating} by the neighborhood
            </h2>
            <div className="mt-8 rounded-3xl border border-border bg-card p-8">
              <p className="font-display text-6xl leading-none text-espresso">
                {business.rating}
                <span className="text-primary"> ★</span>
              </p>
              <div className="mt-3 flex items-center gap-1" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {business.reviewCount} Google Reviews
              </p>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h3 className="text-sm font-semibold tracking-wide text-espresso uppercase">
                What reviewers mention most
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {sentiments.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-border bg-vanilla px-4 py-1.5 text-sm text-espresso"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {reviewExcerpts.map((review, i) => (
                <Reveal as="li" key={i} delay={i * 90}>
                  <blockquote className="h-full rounded-3xl border border-border bg-card p-6">
                    <Star
                      aria-hidden="true"
                      className="size-4 fill-primary text-primary"
                    />
                    <p className="mt-4 text-base leading-relaxed text-espresso">
                      {review.text}
                    </p>
                    <footer className="mt-4 text-sm text-muted-foreground">
                      {review.author}
                    </footer>
                  </blockquote>
                </Reveal>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              Review excerpts are added only from verified Google reviews.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
