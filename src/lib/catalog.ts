// Sample storefront data for the homepage until products live in the database.
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
  /** Price in cents (USD). */
  price: number;
  image: Photo;
  badge?: "New" | "Limited";
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

export const newArrivals: Product[] = [
  {
    slug: "biker-jacket-black-leather",
    name: "Biker Jacket in Black Leather",
    category: "Outerwear",
    price: 245000,
    badge: "New",
    image: {
      src: unsplash("1551028719-00167b16eac5"),
      alt: "Black leather biker jacket on a hanger",
    },
  },
  {
    slug: "woven-basket-bag",
    name: "Woven Basket Bag",
    category: "Bags",
    price: 135000,
    image: {
      src: unsplash("1590874103328-eac38a683ce7"),
      alt: "Tan woven basket bag with a leather flap",
    },
  },
  {
    slug: "chevron-chain-shoulder-bag",
    name: "Chevron Chain Shoulder Bag",
    category: "Bags",
    price: 198000,
    badge: "Limited",
    image: {
      src: unsplash("1566150905458-1bf1fc113f0d"),
      alt: "Blush leather shoulder bag with a chevron stripe and chain strap",
    },
  },
  {
    slug: "suede-brogue-sage",
    name: "Suede Brogue in Sage",
    category: "Shoes",
    price: 78000,
    image: {
      src: unsplash("1560343090-f0409e92791a"),
      alt: "Sage green suede brogue on a pale plinth",
    },
  },
  {
    slug: "baroque-pearl-pendant",
    name: "Baroque Pearl Pendant",
    category: "Jewelry",
    price: 62000,
    badge: "New",
    image: {
      src: unsplash("1611085583191-a3b181a88401"),
      alt: "Fine gold chain with a single pearl pendant worn over a white shirt",
    },
  },
  {
    slug: "round-metal-sunglasses",
    name: "Round Metal Sunglasses",
    category: "Accessories",
    price: 45000,
    image: {
      src: unsplash("1511499767150-a48a237f0083"),
      alt: "Round gold-frame sunglasses with green lenses on marble",
    },
  },
  {
    slug: "technical-bomber-cognac",
    name: "Technical Bomber in Cognac",
    category: "Outerwear",
    price: 165000,
    image: {
      src: unsplash("1591047139829-d91aecb6caea"),
      alt: "Cognac bomber jacket held up on a hanger",
    },
  },
  {
    slug: "grained-leather-satchel",
    name: "Grained Leather Satchel",
    category: "Bags",
    price: 145000,
    image: {
      src: unsplash("1605733513597-a8f8341084e6"),
      alt: "Dove grey leather satchel with buckled straps",
    },
  },
];

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

export const weekendEdit: { collection: Collection; products: Product[] } = {
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
  products: [
    {
      slug: "crochet-cotton-poncho",
      name: "Crochet Cotton Poncho",
      category: "Knitwear",
      price: 110000,
      image: {
        src: unsplash("1434389677669-e08b4cac3105"),
        alt: "Cream crochet poncho with fringed hem on a hanger",
      },
    },
    {
      slug: "silk-jogger-blush",
      name: "Silk Jogger in Blush",
      category: "Trousers",
      price: 72000,
      image: {
        src: unsplash("1594633312681-425c7b97ccd1"),
        alt: "Blush silk jogger trousers with cuffed ankles",
      },
    },
    {
      slug: "cotton-jersey-tee-sage",
      name: "Cotton Jersey T-Shirt",
      category: "Tops",
      price: 39000,
      image: {
        src: unsplash("1523381210434-271e8be1f52b"),
        alt: "Sage cotton T-shirts hanging on wooden hangers",
      },
    },
    {
      slug: "canvas-backpack-navy",
      name: "Canvas Backpack in Navy",
      category: "Bags",
      price: 98000,
      image: {
        src: unsplash("1553062407-98eeb64c6a62"),
        alt: "Navy canvas backpack standing on a pale floor",
      },
    },
    {
      slug: "bifold-wallet-cognac",
      name: "Bifold Wallet in Cognac",
      category: "Small Leather Goods",
      price: 42000,
      image: {
        src: unsplash("1627123424574-724758594e93"),
        alt: "Cognac leather bifold wallet suspended in the air",
      },
    },
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
