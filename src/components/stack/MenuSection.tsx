import { ArrowUpRight } from "lucide-react";
import { business } from "@/data/business";
import { products, type Product } from "@/data/products";
import { ActionButton } from "./ActionButton";
import { Reveal } from "./Reveal";

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <Reveal as="li" delay={index * 90} className="group">
      <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-shadow duration-300 hover:shadow-lift">
        <div className="overflow-hidden">
          <img
            src={product.image}
            alt={product.alt}
            loading="lazy"
            width={1024}
            height={1024}
            className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <h3 className="text-xl text-espresso">{product.name}</h3>
          {product.description && (
            <p className="text-sm text-muted-foreground">{product.description}</p>
          )}
          <div className="mt-auto pt-2">
            <ActionButton
              href={business.orderOnlineUrl}
              variant="outline"
              ariaLabel={`Order ${product.name} online`}
            >
              Order
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </ActionButton>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function MenuSection() {
  return (
    <section id="menu" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            The Menu
          </p>
          <h2 className="mt-3 text-3xl text-espresso sm:text-4xl md:text-5xl">
            Something Sweet Is Waiting
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            A look at current menu highlights. Order for takeaway or delivery.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} />
          ))}
        </ul>

        <p className="mt-8 text-sm text-muted-foreground">
          Full menu and pricing: [PLACEHOLDER] — call {business.phone} for
          today's selection.
        </p>
      </div>
    </section>
  );
}
