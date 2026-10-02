export interface FlavourItem {
  id: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  category: "classic" | "premium" | "seasonal" | "sundaes" | "vegan";
  description: string;
  badge?: string;
  rating: number;
  isPopular?: boolean;
}

export interface CategoryCard {
  id: string;
  title: string;
  tagline: string;
  actionText: string;
  href: string;
  image: string;
  bgColor: string;
  badgeColor: string;
}

export const CATEGORY_CARDS: CategoryCard[] = [
  {
    id: "classic",
    title: "Classic Flavours",
    tagline: "Timeless favourites, always a good idea.",
    actionText: "View Flavours",
    href: "#flavours",
    image: "/images/classic-strawberry.jpg",
    bgColor: "#FCE7EC",
    badgeColor: "#F48FB1",
  },
  {
    id: "premium",
    title: "Premium Range",
    tagline: "Indulgent. Rich. Unforgettable.",
    actionText: "View Flavours",
    href: "#flavours",
    image: "/images/premium-chocolate.jpg",
    bgColor: "#F9E8D8",
    badgeColor: "#D7CCC8",
  },
  {
    id: "seasonal",
    title: "Seasonal Specials",
    tagline: "New flavours. New reasons to be happy.",
    actionText: "View Flavours",
    href: "#flavours",
    image: "/images/seasonal-pistachio.jpg",
    bgColor: "#E2EEDA",
    badgeColor: "#C8E6C9",
  },
  {
    id: "sundaes",
    title: "Sundaes & More",
    tagline: "Because one scoop is never enough.",
    actionText: "View Menu",
    href: "#menu",
    image: "/images/sundae-waffle.jpg",
    bgColor: "#FBD5DE",
    badgeColor: "#F8BBD0",
  },
];

export const SIGNATURE_FLAVOURS: FlavourItem[] = [
  {
    id: "belgian-chocolate",
    name: "Belgian Chocolate",
    tagline: "Rich, Smooth, Iconic.",
    price: 120,
    image: "/images/premium-chocolate.jpg",
    category: "premium",
    description: "Crafted with 70% dark Belgian cocoa ribbons and crunchy chocolate shavings for the true chocolate devotee.",
    badge: "Bestseller",
    rating: 4.9,
    isPopular: true,
  },
  {
    id: "strawberry-bliss",
    name: "Strawberry Bliss",
    tagline: "Fresh strawberries, real joy.",
    price: 110,
    image: "/images/classic-strawberry.jpg",
    category: "classic",
    description: "Slow-churned cream blended with organic hand-picked farm strawberries and ribbons of strawberry compote.",
    rating: 4.8,
    isPopular: true,
  },
  {
    id: "cookies-cream",
    name: "Cookies & Cream",
    tagline: "A classic with a twist.",
    price: 120,
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?q=80&w=800&auto=format&fit=crop",
    category: "classic",
    description: "Velvety vanilla bean gelato swirled with generous chunks of dark chocolate wafer cookies and cream filling.",
    rating: 4.9,
    isPopular: true,
  },
  {
    id: "pistachio-delight",
    name: "Pistachio Delight",
    tagline: "Nutty, Creamy, Heavenly.",
    price: 130,
    image: "/images/seasonal-pistachio.jpg",
    category: "seasonal",
    description: "Authentic Sicilian roasted pistachios ground into a luscious, silky gelato studded with roasted nut crumbles.",
    badge: "Seasonal",
    rating: 4.9,
    isPopular: true,
  },
  {
    id: "mango-magic",
    name: "Mango Magic",
    tagline: "Tropical taste in every bite.",
    price: 120,
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?q=80&w=800&auto=format&fit=crop",
    category: "seasonal",
    description: "Sun-ripened Ratnagiri Alphonso mango pulp infused into smooth artisan cream for sunshine in every spoonful.",
    badge: "Chef's Pick",
    rating: 4.8,
  },
  {
    id: "salted-caramel",
    name: "Salted Caramel Swirl",
    tagline: "Sweet, salty and irresistible.",
    price: 130,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=800&auto=format&fit=crop",
    category: "premium",
    description: "Rich butter-toffee caramel churned with Maldon sea salt flakes and roasted pecan crumbles.",
    rating: 4.9,
  },
  {
    id: "wild-berry-sorbet",
    name: "Wild Berry Sorbet",
    tagline: "Dairy-free fruity burst.",
    price: 110,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=800&auto=format&fit=crop",
    category: "vegan",
    description: "100% plant-based refreshing sorbet made with wild blackberries, raspberries, and a touch of Meyer lemon zest.",
    badge: "Vegan",
    rating: 4.7,
  },
  {
    id: "royal-waffle-sundae",
    name: "Royal Waffle Sundae",
    tagline: "Loaded luxury in a basket.",
    price: 180,
    image: "/images/sundae-waffle.jpg",
    category: "sundaes",
    description: "Crispy freshly-baked waffle bowl loaded with double scoops, hot fudge drizzle, roasted almonds and a cocktail cherry.",
    badge: "Signature",
    rating: 5.0,
    isPopular: true,
  }
];

export const PARLOUR_INFO = {
  name: "Delicious Scoops",
  tagline: "More Than Ice Cream",
  address: "248 Central Ave, Jersey City, NJ 07307",
  phone: "+91 75279 89807",
  phoneRaw: "+917527989807",
  whatsappUrl: "https://wa.me/917527989807?text=Hello%20Delicious%20Scoops!",
  email: "nimrat10416@gmail.com",
  emailUrl: "mailto:nimrat10416@gmail.com?subject=Inquiry%20-%20Delicious%20Scoops",
  hours: "Monday – Sunday: 11:00 AM – 11:00 PM",
  mapsUrl: "https://maps.app.goo.gl/GBN3tqzMepV2Hgw1A",
  specialOffer: {
    code: "BUY2GET1",
    title: "Buy 2 Scoops Get 1 Free!",
    subtitle: "Treat yourself (and someone you love) to more happiness.",
  },
};
