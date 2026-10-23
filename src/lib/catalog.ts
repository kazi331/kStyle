export const products = [
  {
    slug: "stripe-track-zip-hoodie",
    name: "Stripe Track Zip Hoodie",
    crumb: "Stripe Track",
    category: "Hoodies",
    price: 3990,
    index: "01",
    image: "/catalog/stripe-track-zip-hoodie.png",
    alt: "Black zip hoodie with grey sleeve stripes",
    imageFit: "contain",
    indexTone: "ink",
    eyebrow: "Winter collection · Zip hoodie",
    description:
      "A black zip hoodie with grey sleeve stripes, cut with a clean track silhouette.",
    colorName: "Black / Grey",
    swatch: "linear-gradient(135deg,#0B0C0E 50%,#8A8D91 50%)",
  },
  {
    slug: "gs-raw-colour-block-hoodie",
    name: "GS Raw Colour-Block Hoodie",
    crumb: "GS Raw",
    category: "Hoodies",
    price: 3490,
    index: "02",
    image: "/catalog/gs-raw-colour-block-hoodie.png",
    alt: "Grey-green colour-block hoodie with a large navy GS print",
    imageFit: "cover",
    indexTone: "paper",
    eyebrow: "Winter collection · Hoodie",
    description:
      "A relaxed pullover with navy shoulder panels, an oversized vertical GS print and a roomy front pocket.",
    colorName: "Slate / Navy",
    swatch: "linear-gradient(135deg,#7E9591 50%,#1D2742 50%)",
    badge: "New drop",
  },
  {
    slug: "textured-pullover-hoodie",
    name: "Textured Pullover Hoodie",
    crumb: "Textured",
    category: "Hoodies",
    price: 2990,
    index: "03",
    image: "/catalog/textured-pullover-hoodie.webp",
    alt: "Black textured pullover hoodie",
    imageFit: "cover",
    indexTone: "ink",
    eyebrow: "Winter collection · Hoodie",
    description:
      "A black pullover hoodie with a textured face, a close hood, and an easy body.",
    colorName: "Black",
    swatch: "#0B0C0E",
  },
  {
    slug: "graphic-drop-shoulder-sweatshirt",
    name: "Graphic Drop-Shoulder Sweatshirt",
    crumb: "Graphic",
    category: "Sweatshirts",
    price: 2790,
    index: "04",
    image: "/catalog/graphic-drop-shoulder-sweatshirt.webp",
    alt: "Black drop-shoulder sweatshirt with white stripe sleeves",
    imageFit: "cover",
    indexTone: "paper",
    eyebrow: "Winter collection · Sweatshirt",
    description:
      "A black drop-shoulder sweatshirt with white stripe sleeves and a graphic front.",
    colorName: "Black / White",
    swatch: "linear-gradient(135deg,#0B0C0E 50%,#F4F5F5 50%)",
  },
] as const;

export type Product = (typeof products)[number];

export const specs = [
  { label: "Fabric", value: "Brushed cotton-blend fleece" },
  { label: "Fit", value: "Relaxed, true to size" },
  { label: "Care", value: "Machine wash cold, inside out" },
  { label: "Delivery & returns", value: "Free delivery over ৳5,000 · 7-day returns" },
] as const;

export const sizeChart = [
  { size: "S", chest: 100, length: 68, shoulder: 44, sleeve: 62 },
  { size: "M", chest: 104, length: 70, shoulder: 46, sleeve: 63 },
  { size: "L", chest: 108, length: 72, shoulder: 48, sleeve: 64 },
  { size: "XL", chest: 112, length: 74, shoulder: 50, sleeve: 65 },
  { size: "XXL", chest: 116, length: 76, shoulder: 52, sleeve: 66 },
] as const;

export const galleryViews = [
  { label: "Front view", origin: "center", scale: 1 },
  { label: "Print detail", origin: "50% 30%", scale: 2.6 },
  { label: "Hood and tag detail", origin: "90% 4%", scale: 2.6 },
  { label: "Pocket and hem detail", origin: "50% 78%", scale: 2.6 },
] as const;

export const collections = [
  {
    slug: "winter",
    name: "Winter collection",
    navLabel: "Winter",
    eyebrow: "FW—26 / Menswear",
    description:
      "Premium-grade hoodies, jackets and more. Modern cuts and unique looks for a generation that dresses to be seen.",
    comingSoon: false,
    productSlugs: [
      "stripe-track-zip-hoodie",
      "gs-raw-colour-block-hoodie",
      "textured-pullover-hoodie",
      "graphic-drop-shoulder-sweatshirt",
    ],
  },
  {
    slug: "hoodies",
    name: "Hoodies",
    navLabel: "Hoodies",
    eyebrow: "Shop by type",
    description: "Pullovers and zips.",
    comingSoon: false,
    productSlugs: [
      "stripe-track-zip-hoodie",
      "gs-raw-colour-block-hoodie",
      "textured-pullover-hoodie",
    ],
  },
  {
    slug: "sweatshirts",
    name: "Sweatshirts",
    navLabel: "Sweatshirts",
    eyebrow: "Shop by type",
    description: "Relaxed fits, bold graphics.",
    comingSoon: false,
    productSlugs: ["graphic-drop-shoulder-sweatshirt"],
  },
  {
    slug: "zips",
    name: "Zips",
    navLabel: "Zips",
    eyebrow: "Shop by type",
    description: "Zip hoodies with a clean track cut.",
    comingSoon: false,
    productSlugs: ["stripe-track-zip-hoodie"],
  },
  {
    slug: "jackets",
    name: "Jackets",
    navLabel: "Jackets",
    eyebrow: "Shop by type",
    description: "Outerwear lands next season.",
    comingSoon: true,
    productSlugs: [],
  },
] as const;

export type Collection = (typeof collections)[number];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function collectionProducts(collection: Collection) {
  return collection.productSlugs.flatMap((slug) => {
    const product = getProduct(slug);
    return product ? [product] : [];
  });
}

export function collectionPath(category: string) {
  if (category === "Sweatshirts") return "/collections/sweatshirts" as const;
  return "/collections/hoodies" as const;
}

export const freeDeliveryMinimum = 5000;
export const standardDeliveryFee = 150;

export function deliveryCharge(subtotal: number) {
  if (subtotal <= 0 || subtotal >= freeDeliveryMinimum) return 0;
  return standardDeliveryFee;
}

export function formatPrice(price: number) {
  return `৳${price.toLocaleString("en-US")}`;
}
