import strawberry from "@/assets/strawberry.jpg";
import mintChoc from "@/assets/mint-choc.jpg";
import peanutButter from "@/assets/peanut-butter.jpg";

export type Product = {
  name: string;
  image: string;
  alt: string;
  // Only add a description when it is verified by the business.
  description?: string;
};

// Menu highlights currently confirmed by the business. Add entries here to
// expand the menu grid — no layout changes needed.
export const products: Product[] = [
  {
    name: "Strawberry Ice Cream",
    image: strawberry,
    alt: "Representative image: two scoops of strawberry ice cream in a ceramic cup",
  },
  {
    name: "Mint Chocolate Ice Cream",
    image: mintChoc,
    alt: "Representative image: mint green ice cream scoops with dark chocolate pieces",
  },
  {
    name: "Peanut Butter Ice Cream Cup",
    image: peanutButter,
    alt: "Representative image: a peanut butter ice cream cup with peanuts and drizzle",
  },
];
