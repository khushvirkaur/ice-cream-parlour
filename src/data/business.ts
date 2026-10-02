// Single source of truth for all Stack Creamery business information.
// Replace the bracketed placeholders when the real links are available.

export const business = {
  name: "Stack Creamery",
  type: "Ice cream shop",
  address: {
    street: "465 Central Ave",
    city: "Jersey City",
    state: "NJ",
    zip: "07307",
    country: "United States",
  },
  addressLine: "465 Central Ave, Jersey City, NJ 07307, United States",
  phone: "+91 75279 89807",
  phoneHref: "https://wa.me/917527989807?text=Hello%20Delicious%20Scoops!",
  website: "stackcreamery.com",
  rating: 4.8,
  reviewCount: 618,
  services: ["Takeaway", "Delivery", "Online ordering"],
  // Placeholders: no verified URLs supplied by the business yet.
  orderOnlineUrl: "[ORDER ONLINE LINK]",
  mapsUrl: "https://maps.app.goo.gl/GBN3tqzMepV2Hgw1A",
} as const;

export type DayHours = { day: string; hours: string };

// Index 0 = Sunday, matching Date.getDay().
export const hours: DayHours[] = [
  { day: "Sunday", hours: "12:00 PM – 10:00 PM" },
  { day: "Monday", hours: "4:00 PM – 10:00 PM" },
  { day: "Tuesday", hours: "4:00 PM – 10:00 PM" },
  { day: "Wednesday", hours: "4:00 PM – 10:00 PM" },
  { day: "Thursday", hours: "1:30 PM – 10:00 PM" },
  { day: "Friday", hours: "1:30 PM – 10:00 PM" },
  { day: "Saturday", hours: "12:00 PM – 10:00 PM" },
];

export const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit Us", href: "#visit" },
];
