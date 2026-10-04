// The original sample catalog, used to seed the database (npm run db:seed).
// Order matters: seed.ts gives earlier products later created_at values, so
// the first 8 here are what "New Arrivals" (newest first) shows.

import type { Product } from "../src/lib/catalog";
import { unsplash } from "../src/lib/unsplash";

// `categorySlug` is derived from the category name by seed.ts.
export const seedProducts: Omit<Product, "categorySlug">[] = [
  {
    slug: "biker-jacket-black-leather",
    name: "Biker Jacket in Black Leather",
    category: "Outerwear",
    price: 245000,
    badge: "New",
    color: "Black",
    stock: 6,
    description:
      "A classic biker cut in supple lambskin that softens with every wear. Asymmetric zip, notched lapels and a belted hem, finished with polished silver-tone hardware.",
    details: [
      "100% lambskin leather; viscose lining",
      "Asymmetric front zip with snap lapels",
      "Three zip pockets and one interior pocket",
      "Professional leather clean only",
      "Made in Italy",
    ],
    image: {
      src: unsplash("1551028719-00167b16eac5"),
      alt: "Black leather biker jacket on a hanger",
    },
    gallery: [
      {
        src: unsplash("1520975954732-35dd22299614"),
        alt: "Man wearing a black leather biker jacket and sunglasses by a brick wall",
      },
    ],
  },
  {
    slug: "woven-basket-bag",
    name: "Woven Basket Bag",
    category: "Bags",
    price: 135000,
    color: "Tan",
    stock: 2,
    description:
      "Hand-woven by artisans over several days, with a structured leather flap and rolled top handle. Roomy enough for the essentials, light enough for every day.",
    details: [
      "Woven palm with calfskin leather trim",
      "Flap closure with turn-lock",
      "Cotton canvas lining",
      "W 30 × H 24 × D 14 cm",
      "Handmade in Spain",
    ],
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
    color: "Blush",
    stock: 0,
    description:
      "A compact flap bag in smooth calfskin, crossed with a painted chevron stripe. The sliding chain strap wears on the shoulder or across the body.",
    details: [
      "Smooth calfskin with hand-painted edges",
      "Magnetic flap closure",
      "Sliding chain strap, 55 cm drop",
      "W 22 × H 14 × D 6 cm",
      "Made in Italy",
    ],
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
    color: "Sage",
    stock: 12,
    description:
      "A traditional wingtip brogue reworked in soft sage suede. Goodyear-welted on a leather sole, so it can be resoled for years to come.",
    details: [
      "Calf suede upper; leather lining",
      "Goodyear-welted leather sole",
      "Classic wingtip perforations",
      "Fits true to size",
      "Made in England",
    ],
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
    color: "Gold / Pearl",
    stock: 3,
    description:
      "A single freshwater baroque pearl on a fine cable chain. Each pearl is chosen by hand, so no two pendants are quite the same.",
    details: [
      "18k gold vermeil on sterling silver",
      "Freshwater baroque pearl, approx. 9 mm",
      "Adjustable chain, 40–45 cm",
      "Store in the pouch provided",
      "Made in France",
    ],
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
    color: "Gold / Green",
    stock: 20,
    description:
      "A slim round frame in lightweight titanium with bottle-green mineral glass lenses and adjustable nose pads.",
    details: [
      "Titanium frame, gold finish",
      "Mineral glass lenses, 100% UV protection",
      "Lens width 49 mm",
      "Includes leather case and cloth",
      "Made in Japan",
    ],
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
    color: "Cognac",
    stock: 8,
    description:
      "A lightweight bomber in water-repellent technical twill, with rib-knit trims and a softly padded body for transitional weather.",
    details: [
      "Water-repellent technical twill",
      "Lightly padded; cupro lining",
      "Two-way front zip and utility sleeve pocket",
      "Machine wash cold",
      "Made in Portugal",
    ],
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
    color: "Dove Grey",
    stock: 5,
    description:
      "A structured satchel in pebble-grain leather with twin buckled straps and a top handle. Fits a 13-inch laptop.",
    details: [
      "Pebble-grain calfskin",
      "Twin buckle closures with hidden magnets",
      "Detachable, adjustable shoulder strap",
      "W 35 × H 26 × D 10 cm",
      "Made in Italy",
    ],
    image: {
      src: unsplash("1605733513597-a8f8341084e6"),
      alt: "Dove grey leather satchel with buckled straps",
    },
  },
  {
    slug: "crochet-cotton-poncho",
    name: "Crochet Cotton Poncho",
    category: "Knitwear",
    price: 110000,
    color: "Ecru",
    stock: 4,
    description:
      "An open crochet poncho in organic cotton, finished with a hand-knotted fringe. Layer it over a shirt now and a swimsuit later.",
    details: [
      "100% organic cotton",
      "Hand-crocheted; hand-knotted fringe",
      "One size",
      "Hand wash cold, dry flat",
      "Made in Peru",
    ],
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
    color: "Blush",
    stock: 10,
    description:
      "A relaxed jogger cut from washed silk crêpe, with an elasticated waist, slant pockets and gathered cuffs.",
    details: [
      "100% washed silk crêpe",
      "Elasticated waist with drawcord",
      "Relaxed fit; gathered ankle cuffs",
      "Dry clean or hand wash cold",
      "Made in Italy",
    ],
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
    color: "Sage",
    stock: 30,
    description:
      "Our everyday T-shirt in dense, garment-dyed cotton jersey that keeps its shape wash after wash.",
    details: [
      "100% long-staple cotton jersey",
      "Garment dyed for a soft, lived-in color",
      "Regular fit",
      "Machine wash cold",
      "Made in Portugal",
    ],
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
    color: "Navy",
    stock: 1,
    description:
      "A clean-lined backpack in waxed cotton canvas with leather trims and a padded sleeve for a 15-inch laptop.",
    details: [
      "Waxed cotton canvas with leather trims",
      "Padded laptop sleeve, fits 15 inches",
      "Water-resistant zip closure",
      "W 30 × H 44 × D 14 cm",
      "Made in Italy",
    ],
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
    color: "Cognac",
    stock: 15,
    description:
      "A slim bifold in vegetable-tanned leather that darkens to a rich patina over time.",
    details: [
      "Vegetable-tanned leather",
      "Eight card slots and two note compartments",
      "W 11 × H 9 cm closed",
      "Complimentary embossing in store",
      "Made in Italy",
    ],
    image: {
      src: unsplash("1627123424574-724758594e93"),
      alt: "Cognac leather bifold wallet suspended in the air",
    },
  },
];
