import type { Product } from "@/lib/catalog";

export type ProductColorVariant = {
  id: string;
  name: string;
  tagLabel: string;
  swatch: string;
  inStock: boolean;
};

export type ClosetProduct = Product & {
  variants?: ProductColorVariant[];
  brand?: string;
  frontImage?: string;
  backImage?: string;
};

export const defaultVariantsMap: Record<string, ProductColorVariant[]> = {
  "stripe-track-zip-hoodie": [
    {
      id: "black-grey",
      name: "Black / Grey",
      tagLabel: "BLACK",
      swatch: "#0B0C0E",
      inStock: true,
    },
    {
      id: "heather-grey",
      name: "Heather Grey",
      tagLabel: "GREY",
      swatch: "#8A8D91",
      inStock: true,
    },
  ],
  "gs-raw-colour-block-hoodie": [
    {
      id: "slate-navy",
      name: "Slate / Navy",
      tagLabel: "SLATE",
      swatch: "#7E9591",
      inStock: true,
    },
    {
      id: "deep-navy",
      name: "Deep Navy",
      tagLabel: "NAVY",
      swatch: "#1D2742",
      inStock: true,
    },
  ],
  "textured-pullover-hoodie": [
    {
      id: "black",
      name: "Onyx Black",
      tagLabel: "BLACK",
      swatch: "#0B0C0E",
      inStock: true,
    },
    {
      id: "charcoal",
      name: "Charcoal",
      tagLabel: "CHARCOAL",
      swatch: "#2B2D31",
      inStock: true,
    },
  ],
  "graphic-drop-shoulder-sweatshirt": [
    {
      id: "black-white",
      name: "Black / White",
      tagLabel: "BLACK",
      swatch: "#0B0C0E",
      inStock: true,
    },
    {
      id: "chalk-white",
      name: "Chalk White",
      tagLabel: "WHITE",
      swatch: "#F4F5F5",
      inStock: true,
    },
  ],
};

