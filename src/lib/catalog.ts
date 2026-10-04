// Static storefront content and shared product types/helpers.
// Products, categories and stock live in MySQL; see src/lib/products.ts.
// Photos are from Unsplash (https://unsplash.com/license).

import { unsplash } from "./unsplash";

export type Photo = {
  src: string;
  alt: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  /** URL key of the category page: /[categorySlug]. */
  categorySlug: string;
  /** Price in cents (USD). */
  price: number;
  /** Primary image, used on cards and first in the product gallery. */
  image: Photo;
  /** Additional product-page shots, shown after `image`. */
  gallery?: Photo[];
  badge?: "New" | "Limited";
  color: string;
  description: string;
  details: string[];
  /** Units available; 0 means sold out. */
  stock: number;
};

export type Collection = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  image: Photo;
};

export type Category = {
  slug: string;
  name: string;
  image: Photo;
};

export const navigation = [
  { label: "New In", href: "/new-in" },
  { label: "Women", href: "/women" },
  { label: "Men", href: "/men" },
  { label: "Bags", href: "/bags" },
  { label: "Shoes", href: "/shoes" },
  { label: "Jewelry", href: "/jewelry" },
] as const;

export const hero = {
  eyebrow: "Autumn — Winter Collection",
  title: "The Quiet Season",
  description:
    "Long coats, soft tailoring and bags built to be carried for decades.",
  images: [
    {
      src: unsplash("1539109136881-3be0616acf4b"),
      alt: "Woman in a pale blue coat standing in a cathedral square",
    },
    {
      src: unsplash("1581044777550-4cfa60707c03"),
      alt: "Woman in a blush ruffled blouse holding sunglasses in a golden field",
    },
  ],
} satisfies { eyebrow: string; title: string; description: string; images: Photo[] };

export const LOW_STOCK_THRESHOLD = 3;

export type StockStatus = "in-stock" | "low-stock" | "sold-out";

export function getStockStatus(stock: number): StockStatus {
  if (stock <= 0) return "sold-out";
  if (stock <= LOW_STOCK_THRESHOLD) return "low-stock";
  return "in-stock";
}

export const editorials: Collection[] = [
  {
    slug: "riviera",
    eyebrow: "Women",
    title: "Riviera Florals",
    description: "Printed silks cut to move with the sea breeze.",
    image: {
      src: unsplash("1496747611176-843222e1e57c"),
      alt: "Woman in a floral wrap dress on a seaside terrace",
    },
  },
  {
    slug: "after-dark",
    eyebrow: "Men",
    title: "After Dark",
    description: "Supple leather and sharp lines for the city at night.",
    image: {
      src: unsplash("1520975954732-35dd22299614"),
      alt: "Man in a black leather jacket and sunglasses crouching by a brick wall",
    },
  },
];

export const categories: Category[] = [
  {
    slug: "women",
    name: "Women",
    image: {
      src: unsplash("1485968579580-b6d095142e6e"),
      alt: "Woman in a checked coat walking down a city street",
    },
  },
  {
    slug: "men",
    name: "Men",
    image: {
      src: unsplash("1617137968427-85924c800a22"),
      alt: "Man in a navy suit walking past glass storefronts",
    },
  },
  {
    slug: "bags",
    name: "Bags",
    image: {
      src: unsplash("1584917865442-de89df76afd3"),
      alt: "Red leather top-handle bag on display",
    },
  },
  {
    slug: "shoes",
    name: "Shoes",
    image: {
      src: unsplash("1543163521-1bf539c55dd2"),
      alt: "Pair of floral printed stiletto pumps against a blue wall",
    },
  },
];

export const story = {
  eyebrow: "The House",
  title: "Made slowly, by hand",
  description:
    "Every piece begins in a small workshop, where artisans cut, stitch and finish by hand. We make fewer things, and make them to last.",
  image: {
    src: unsplash("1445205170230-053b83016050"),
    alt: "Rails of neutral coats and knitwear in a softly lit boutique",
  },
} satisfies { eyebrow: string; title: string; description: string; image: Photo };

export const weekendEdit: { collection: Collection; productSlugs: string[] } = {
  collection: {
    slug: "weekend",
    eyebrow: "The Edit",
    title: "Off Duty",
    description: "Relaxed knits, soft trousers and the things you carry.",
    image: {
      src: unsplash("1558769132-cb1aea458c5e"),
      alt: "Rail of cream and camel knitwear beside dried pampas grass",
    },
  },
  productSlugs: [
    "crochet-cotton-poncho",
    "silk-jogger-blush",
    "cotton-jersey-tee-sage",
    "canvas-backpack-navy",
    "bifold-wallet-cognac",
  ],
};

export const services = [
  {
    title: "Complimentary Shipping",
    description: "Free express delivery on every order.",
  },
  {
    title: "Returns Within 30 Days",
    description: "Return or exchange anything, free of charge.",
  },
  {
    title: "Signature Packaging",
    description: "Every order arrives in our gift box.",
  },
  {
    title: "Client Services",
    description: "Advisors available seven days a week.",
  },
];

const priceFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatPrice(cents: number) {
  return priceFormat.format(cents / 100);
}
