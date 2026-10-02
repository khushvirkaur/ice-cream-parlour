# Stack Creamery — Premium Creamery Website

A single, custom-designed homepage that moves visitors from discovery to ordering or visiting, built with verified business facts only.

## Design system

- Palette (creamy, appetizing, used strategically): vanilla off-white surfaces, soft chocolate brown, strawberry soft red/pink accent, mint green supporting accent, warm biscuit beige, deep espresso text (no pure black).
- Type pairing: expressive modern display face for headings, clean sans for body, with a deliberate scale (hero > section heading > product name > body > meta).
- Refined rounded UI, generous whitespace, soft depth, alternating light/contrast sections for rhythm.
- All values as semantic tokens in `src/styles.css`; no hardcoded color classes in components.

## Page flow (homepage, `/`)

1. Slim utility bar: hours-at-a-glance + phone
2. Navbar — STACK CREAMERY wordmark, links (Home, Menu, About, Reviews, Visit Us), Order Online CTA; hamburger sheet on mobile with CTA kept visible
3. Hero — "Ice Cream Worth Stacking Up For." + concise Jersey City dessert copy, Order Online / View Menu, large appetizing dessert image
4. Info strip — 4.8 ★ · 618 Reviews · Takeaway · Delivery · Online Ordering · Jersey City, NJ
5. Menu — "Something Sweet Is Waiting" with 3 product cards: Strawberry Ice Cream, Mint Chocolate Ice Cream, Peanut Butter Ice Cream Cup (no prices, no invented descriptions)
6. Why customers love Stack Creamery — delicious desserts, good portions, friendly service, customizable options (framed as review-sourced, no stats)
7. Reviews — large 4.8 / 618 Google Reviews display, static review cards (no fabricated testimonials; verified excerpt slots)
8. About — Stack Creamery as a Jersey City creamery, service options, easy to expand later
9. Order Online CTA — "Your Next Scoop Is Just a Click Away."
10. Visit Us — address, phone, service options, Get Directions, location visual, plus business hours with the current day highlighted (no open/closed claim)
11. Contact — address, phone, Call / Get Directions / Order Online buttons (no form)
12. Footer — wordmark, short description, nav links, address, hours, copyright (no social accounts)

## Content and placeholders

- Only supplied facts. Ordering link uses `[ORDER ONLINE LINK]`, map link uses `[GOOGLE MAPS LINK]`; both centralized in one config file so they are swapped in one place.
- Generated food imagery (hero, three products, location/atmosphere) with a caption/alt convention making clear these are representative images, not Stack Creamery photographs — replaceable without touching layout.

## Technical notes

- TanStack Start route `src/routes/index.tsx` replaces the placeholder; sections are components under `src/components/stack/` (Navbar, Hero, InfoStrip, MenuSection, ProductCard, Features, Reviews, About, OrderCta, VisitUs, Hours, Contact, Footer) plus `src/data/business.ts` for all business facts and links.
- Anchor-based in-page nav with smooth scroll (single-page flow as specified in the brief).
- Head metadata on the index route: title "Stack Creamery | Ice Cream in Jersey City, NJ", matching description and og/twitter tags, plus LocalBusiness JSON-LD (address, phone, hours, aggregateRating 4.8/618).
- Accessibility: semantic headings, labeled buttons/links, visible focus states, descriptive alt text, no color-only meaning; motion limited to gentle section reveals and card/button hovers, respecting reduced-motion.
