export type OrderLine = {
  slug: string;
  name: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
  imageFit: "contain" | "cover";
};

export type PlacedOrder = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  note?: string;
  division: string;
  city: string;
  subdistrict: string;
  lines: OrderLine[];
  subtotal: number;
  delivery: number;
  total: number;
};

const orderKey = "kstyle-order";

export function createOrderId() {
  return `KS-${Date.now().toString(36).toUpperCase().slice(-4)}`;
}

export function saveOrder(order: PlacedOrder) {
  sessionStorage.setItem(orderKey, JSON.stringify(order));
}

export function readOrder(): PlacedOrder | null {
  const raw = sessionStorage.getItem(orderKey);
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isPlacedOrder(parsed)) return null;
    return {
      ...parsed,
      division: parsed.division ?? "",
      subdistrict: parsed.subdistrict ?? "",
    };
  } catch {
    return null;
  }
}

function isPlacedOrder(value: unknown): value is PlacedOrder {
  if (!value || typeof value !== "object") return false;

  const order = value as PlacedOrder;
  return (
    typeof order.id === "string" &&
    typeof order.name === "string" &&
    typeof order.phone === "string" &&
    (order.email === undefined || typeof order.email === "string") &&
    typeof order.address === "string" &&
    (order.note === undefined || typeof order.note === "string") &&
    (order.division === undefined || typeof order.division === "string") &&
    typeof order.city === "string" &&
    (order.subdistrict === undefined || typeof order.subdistrict === "string") &&
    typeof order.subtotal === "number" &&
    typeof order.delivery === "number" &&
    typeof order.total === "number" &&
    Array.isArray(order.lines) &&
    order.lines.every(isOrderLine)
  );
}

function isOrderLine(value: unknown): value is OrderLine {
  if (!value || typeof value !== "object") return false;

  const line = value as OrderLine;
  return (
    typeof line.slug === "string" &&
    typeof line.name === "string" &&
    typeof line.size === "string" &&
    typeof line.quantity === "number" &&
    typeof line.price === "number" &&
    typeof line.image === "string" &&
    (line.imageFit === "contain" || line.imageFit === "cover")
  );
}
