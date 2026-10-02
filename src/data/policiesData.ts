export type PolicyTab =
  | "privacy"
  | "terms"
  | "refunds"
  | "shipping"
  | "allergens"
  | "cookies";

export interface PolicySection {
  title: string;
  content: string[];
  bullets?: string[];
  callout?: {
    type: "info" | "warning" | "success";
    text: string;
  };
}

export interface PolicyDocument {
  id: PolicyTab;
  title: string;
  shortTitle: string;
  badge: string;
  iconName: string;
  summary: string;
  lastUpdated: string;
  sections: PolicySection[];
}

export const POLICIES_DATA: Record<PolicyTab, PolicyDocument> = {
  privacy: {
    id: "privacy",
    title: "Privacy Policy",
    shortTitle: "Privacy",
    badge: "GDPR & CCPA Compliant",
    iconName: "ShieldCheck",
    summary:
      "Delicious Scoops is committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and safeguard your data when you visit our website, place orders, or visit our parlour.",
    lastUpdated: "January 15, 2026",
    sections: [
      {
        title: "1. Information We Collect",
        content: [
          "We collect personal information that you voluntarily provide to us when you interact with our website or place an order for in-store pickup or local delivery.",
        ],
        bullets: [
          "Contact Data: Name, email address, phone number, and delivery street address.",
          "Order Details: Selected ice cream flavours, customized toppings, serving vessels, and order notes.",
          "Payment Information: Payment processing is handled directly through certified, PCI-DSS compliant third-party gateways (e.g., Stripe, Apple Pay, Google Pay). We never store full credit/debit card numbers on our local servers.",
          "Device & Usage Data: IP address, browser type, device identifiers, and browsing patterns collected via essential and analytical cookies.",
        ],
      },
      {
        title: "2. How We Use Your Information",
        content: [
          "Your data is used strictly for legitimate culinary, business, and operational purposes, including:",
        ],
        bullets: [
          "Processing, preparing, and fulfilling your ice cream orders with real-time status updates.",
          "Coordinating temperature-controlled local delivery to ensure fresh, unmelted arrival.",
          "Responding to customer inquiries, dietary questions, and allergen verifications.",
          "Sending promotional specials (e.g., Buy 2 Get 1 Free discounts) only if you have opted in.",
          "Enhancing website performance, mobile responsiveness, and menu navigation.",
        ],
      },
      {
        title: "3. Data Sharing & Third-Party Disclosure",
        content: [
          "We respect your trust. Delicious Scoops does NOT sell, rent, or trade your personal data to third parties for commercial gain.",
          "We share minimal necessary data only with trusted service partners:",
        ],
        bullets: [
          "Verified courier partners to complete timely local deliveries.",
          "PCI-DSS compliant payment gateways to securely process transactions.",
          "Cloud infrastructure and analytical tools ensuring website reliability and uptime.",
        ],
      },
      {
        title: "4. Data Security & Retention",
        content: [
          "We implement enterprise-grade SSL 256-bit encryption for all transmitted information. We retain order history only as long as necessary to satisfy accounting, tax, and customer service requirements.",
        ],
        callout: {
          type: "info",
          text: "All payment transactions are encrypted end-to-end. We do not retain your CVV or credit card credentials.",
        },
      },
      {
        title: "5. Your Rights & Contact Information",
        content: [
          "Under applicable privacy laws (including GDPR, CCPA, and CPRA), you have the right to request access to, correction of, or deletion of your personal records at any time.",
          "For any privacy questions or data requests, reach out to our team at hello@deliciousscoops.com or visit us at 248 Central Ave, Jersey City, NJ 07307.",
        ],
      },
    ],
  },

  terms: {
    id: "terms",
    title: "Terms of Service",
    shortTitle: "Terms",
    badge: "Legally Binding",
    iconName: "FileText",
    summary:
      "These Terms of Service govern your access to and use of Delicious Scoops' website, digital ordering system, and parlour services. By using our website or placing an order, you agree to these terms.",
    lastUpdated: "January 15, 2026",
    sections: [
      {
        title: "1. Acceptance of Terms",
        content: [
          "By accessing or using the Delicious Scoops website (the 'Service'), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any portion of these terms, please do not use our services.",
        ],
      },
      {
        title: "2. Ordering, Pricing & Availability",
        content: [
          "All artisan ice creams and sundaes are handcrafted fresh in small batches daily. While we strive to keep our online menu 100% accurate, seasonal flavours and special toppings are subject to real-time availability.",
        ],
        bullets: [
          "Prices are displayed in USD ($) and do not include applicable local sales taxes, which are calculated at checkout.",
          "We reserve the right to revise menu prices, promotional discounts (e.g. promo code BUY2GET1), and product offerings at any time without prior notice.",
          "In the rare event that a selected flavour is sold out after an order is placed, our parlour team will contact you immediately to offer an upgrade or a full refund.",
        ],
      },
      {
        title: "3. Online Payments & Promo Codes",
        content: [
          "Payment must be completed in full before order preparation begins. Promo codes must be entered prior to checkout and cannot be applied retroactively to completed orders.",
        ],
      },
      {
        title: "4. Intellectual Property",
        content: [
          "All trademarks, logos, photographs, graphics, and custom recipe names on this website are the proprietary property of Delicious Scoops. Unauthorized copying, modification, or redistribution is strictly prohibited.",
        ],
      },
      {
        title: "5. Limitation of Liability & Governing Law",
        content: [
          "Delicious Scoops shall not be liable for indirect, incidental, or consequential damages resulting from website downtime or minor delivery delays caused by adverse weather or traffic conditions.",
          "These terms are governed by and construed in accordance with the laws of the State of New Jersey, United States.",
        ],
        callout: {
          type: "info",
          text: "Questions regarding our terms? Contact our store manager at +1 201-984-0261 or email hello@deliciousscoops.com.",
        },
      },
    ],
  },

  refunds: {
    id: "refunds",
    title: "Refund & Cancellation Policy",
    shortTitle: "Refunds",
    badge: "100% Happiness Guarantee",
    iconName: "RotateCcw",
    summary:
      "Because ice cream is a perishable food product, we adhere to strict quality and health safety standards. Here is how we handle cancellations, melted deliveries, and quality issues.",
    lastUpdated: "January 15, 2026",
    sections: [
      {
        title: "1. Order Cancellation Window",
        content: [
          "Because our kitchen team begins scooping and packaging your order immediately to ensure temperature retention, cancellations must be requested quickly.",
        ],
        bullets: [
          "Immediate Cancellation: You may cancel your order within 5 minutes of placing it by calling us directly at +1 201-984-0261 for a 100% instant refund.",
          "Once an order is scooped, packed in insulated containers, or handed to a courier, cancellations can no longer be accepted.",
        ],
      },
      {
        title: "2. Quality Guarantee & Melted Deliveries",
        content: [
          "We pack every delivery with premium thermal insulation and food-grade cold packs. If your ice cream arrives melted, damaged, or with missing items, we will make it right immediately.",
        ],
        bullets: [
          "Please take a quick photo of the delivered package and contact us within 30 minutes of delivery.",
          "You may choose between an immediate free re-delivery or a full refund to your original payment method.",
        ],
        callout: {
          type: "success",
          text: "Happiness Guarantee: If you received the wrong flavour or toppings, notify us and we will promptly send a replacement on the house.",
        },
      },
      {
        title: "3. Refund Processing Timeline",
        content: [
          "Approved refunds are initiated immediately by our billing department. Depending on your financial institution, refunds typically reflect on your bank or credit card statement within 3 to 5 business days.",
        ],
      },
      {
        title: "4. In-Store Parlour Orders",
        content: [
          "For in-store scoops and cones, please inspect your treat upon receiving it at the counter. If you are dissatisfied with any flavour, let our scoopers know immediately and we will happily swap it for another flavour of your choice.",
        ],
      },
    ],
  },

  shipping: {
    id: "shipping",
    title: "Shipping & Delivery Policy",
    shortTitle: "Delivery",
    badge: "Cold-Chain Insulated",
    iconName: "Truck",
    summary:
      "Our cold-chain delivery guarantees that your artisan ice cream arrives chilled, creamy, and ready to enjoy within our designated local service zone.",
    lastUpdated: "January 15, 2026",
    sections: [
      {
        title: "1. Local Delivery Radius & Estimated Times",
        content: [
          "We offer direct local delivery within an 8-mile radius of our parlour at 248 Central Ave, Jersey City, NJ 07307.",
        ],
        bullets: [
          "Standard Delivery Time: 30 to 45 minutes from order confirmation.",
          "Peak Hours (Weekends & Evenings 6:00 PM – 9:00 PM): 40 to 55 minutes.",
          "Order Tracking: Real-time SMS and email updates sent when your order is scooped, packed, and out for delivery.",
        ],
      },
      {
        title: "2. Cold-Chain Thermal Packaging",
        content: [
          "We understand the delicate nature of premium gelato and ice cream. Every order is packed inside eco-friendly insulated foil pouches with sub-zero gel packs capable of maintaining sub-freezing temperatures for up to 90 minutes in transit.",
        ],
      },
      {
        title: "3. Delivery Fees & Thresholds",
        content: [
          "Delivery fees are calculated based on distance from our parlour:",
        ],
        bullets: [
          "Orders $35 and above: FREE Local Delivery.",
          "Orders under $35: Flat $3.99 delivery fee.",
        ],
      },
      {
        title: "4. In-Store & Curbside Pickup",
        content: [
          "Prefer to pick up your scoops? Select 'In-Store Pickup' at checkout. Your order will be packed and placed in our temperature-controlled holding freezer ready for pickup in 15 minutes.",
        ],
        callout: {
          type: "warning",
          text: "Please ensure someone is available at the delivery address to receive the package immediately upon arrival to prevent melting.",
        },
      },
    ],
  },

  allergens: {
    id: "allergens",
    title: "Allergen & Nutrition Guide",
    shortTitle: "Allergens",
    badge: "Food Safety Certified",
    iconName: "AlertTriangle",
    summary:
      "Your health and safety are our top priority. We maintain strict food hygiene protocols and provide transparent ingredient information for all flavours and toppings.",
    lastUpdated: "January 15, 2026",
    sections: [
      {
        title: "1. Major Allergens Disclosure",
        content: [
          "Our kitchen handles dairy, tree nuts, peanuts, wheat/gluten, eggs, and soy. Below is our allergen breakdown:",
        ],
        bullets: [
          "Dairy (Milk / Cream): Present in all classic and premium cream-based flavours. Vegan sorbets are 100% dairy-free.",
          "Tree Nuts & Peanuts: Used in flavours such as Pistachio Supreme, Roasted Hazelnut, and crushed almond toppings.",
          "Gluten (Wheat): Present in Cookies & Cream (oreo wafers), cookie dough chunks, waffle cones, and waffle bowls. Traditional cups and spoons are 100% gluten-free.",
          "Eggs: Used as a natural emulsifier in select custard-based premium flavours. Sorbets and standard milk flavours are egg-free.",
          "Soy: Present in chocolate ribbons, confectionary mix-ins, and dark cocoa ribbons.",
        ],
      },
      {
        title: "2. Cross-Contact Mitigation Protocols",
        content: [
          "We follow rigorous sanitation standards certified by local health departments:",
        ],
        bullets: [
          "Separate, dedicated scoops and sanitized water wells are used for nut-free and dairy-free tubs.",
          "Scoopers sanitize hands and replace gloves upon any allergen request.",
          "All stainless-steel churns and preparation surfaces undergo high-temperature sanitization between small batch productions.",
        ],
      },
      {
        title: "3. Vegan, Eggless & Gluten-Friendly Options",
        content: [
          "We proudly offer certified dairy-free fruit sorbets (such as Wild Berry Sorbet and Alphonso Mango) and gluten-friendly serving cups for guests with dietary preferences.",
        ],
        callout: {
          type: "warning",
          text: "Important Notice: While we exercise extreme care to prevent cross-contact, our kitchen is not an allergen-free facility. Guests with severe or life-threatening anaphylactic allergies should inform our manager prior to ordering.",
        },
      },
      {
        title: "4. Inquiries & Custom Requests",
        content: [
          "Have specific dietary questions or want ingredient lists for an upcoming birthday catering order? Speak to our culinary team at hello@deliciousscoops.com or call +1 201-984-0261.",
        ],
      },
    ],
  },

  cookies: {
    id: "cookies",
    title: "Cookie & Tracking Policy",
    shortTitle: "Cookies",
    badge: "Privacy First",
    iconName: "Cookie",
    summary:
      "This policy details how Delicious Scoops uses cookies and local browser storage to provide a smooth, secure shopping experience.",
    lastUpdated: "January 15, 2026",
    sections: [
      {
        title: "1. What Are Cookies?",
        content: [
          "Cookies are small text files stored on your computer or mobile device when you browse websites. They help remember your preferences, keep items in your shopping cart, and ensure secure navigation.",
        ],
      },
      {
        title: "2. Types of Cookies We Use",
        content: [
          "We only use cookies and local storage tokens that serve a clear, practical purpose:",
        ],
        bullets: [
          "Essential Storage: Required to remember your shopping cart items ('scoop_cart'), active promo codes, and modal states across page refreshes.",
          "Functional Cookies: Store your preferred parlour location, serving type preferences, and search queries for quick access.",
          "Performance & Analytics: Anonymous traffic analytics to help us identify popular flavours, optimize site speed, and fix mobile navigation bugs.",
        ],
      },
      {
        title: "3. Zero Third-Party Ad Trackers",
        content: [
          "We do not participate in invasive cross-site advertising networks. We never sell your browsing history to third-party data brokers.",
        ],
      },
      {
        title: "4. How to Manage Cookies",
        content: [
          "You can change your browser settings at any time to block or delete cookies. Please note that disabling essential cookies may prevent your cart items from saving correctly during checkout.",
        ],
        callout: {
          type: "info",
          text: "To clear your Delicious Scoops cart data immediately, you can click 'Empty Cart' inside the Cart Drawer or clear your browser's local storage.",
        },
      },
    ],
  },
};
