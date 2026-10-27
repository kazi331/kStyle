"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { ArrowIcon, CloseIcon } from "@/components/icons";
import {
  deliveryCharge,
  formatPrice,
  freeDeliveryMinimum,
  getProduct,
} from "@/lib/catalog";

const bagKey = "kstyle-bag";

type BagLine = {
  slug: string;
  size: string;
  quantity: number;
};

type BagItem = {
  slug: string;
  size: string;
};

type BagContextValue = {
  count: number;
  bump: number;
  open: boolean;
  ready: boolean;
  lines: BagLine[];
  add: (item: BagItem) => void;
  setQuantity: (slug: string, size: string, quantity: number) => void;
  clear: () => void;
  show: () => void;
  hide: () => void;
};

const BagContext = createContext<BagContextValue | null>(null);

function readBag(): BagLine[] {
  const raw = sessionStorage.getItem(bagKey);
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isBagLine);
  } catch {
    return [];
  }
}

const serverBag: BagLine[] = [];
let bagLines: BagLine[] = serverBag;
let bagLoaded = false;
const bagListeners = new Set<() => void>();

function subscribeBag(listener: () => void) {
  bagListeners.add(listener);
  return () => {
    bagListeners.delete(listener);
  };
}

function getBagSnapshot() {
  if (!bagLoaded) {
    bagLoaded = true;
    bagLines = readBag();
  }

  return bagLines;
}

function getServerBagSnapshot() {
  return serverBag;
}

function commitBag(next: BagLine[]) {
  bagLines = next;
  bagLoaded = true;
  sessionStorage.setItem(bagKey, JSON.stringify(next));
  bagListeners.forEach((listener) => listener());
}

function isBagLine(value: unknown): value is BagLine {
  if (!value || typeof value !== "object") return false;

  const line = value as BagLine;
  return (
    typeof line.slug === "string" &&
    typeof line.size === "string" &&
    typeof line.quantity === "number" &&
    Number.isInteger(line.quantity) &&
    line.quantity > 0 &&
    Boolean(getProduct(line.slug))
  );
}

export function BagProvider({ children }: { children: React.ReactNode }) {
  const lines = useSyncExternalStore(subscribeBag, getBagSnapshot, getServerBagSnapshot);
  const ready = lines !== serverBag;
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(0);
  const count = lines.reduce((total, line) => total + line.quantity, 0);

  function add(item: BagItem) {
    const current = getBagSnapshot();
    const existing = current.find((line) => line.slug === item.slug && line.size === item.size);
    const next = existing
      ? current.map((line) =>
          line.slug === item.slug && line.size === item.size
            ? { ...line, quantity: line.quantity + 1 }
            : line,
        )
      : [...current, { ...item, quantity: 1 }];

    commitBag(next);
    setBump((value) => value + 1);
  }

  function setQuantity(slug: string, size: string, quantity: number) {
    const current = getBagSnapshot();
    commitBag(
      quantity < 1
        ? current.filter((line) => line.slug !== slug || line.size !== size)
        : current.map((line) =>
            line.slug === slug && line.size === size ? { ...line, quantity } : line,
          ),
    );
  }

  return (
    <BagContext.Provider
      value={{
        count,
        bump,
        open,
        ready,
        lines,
        add,
        setQuantity,
        clear: () => commitBag([]),
        show: () => setOpen(true),
        hide: () => setOpen(false),
      }}
    >
      {children}
      <BagDrawer lines={lines} open={open} onClose={() => setOpen(false)} onQuantity={setQuantity} />
    </BagContext.Provider>
  );
}

export function useBag() {
  const bag = useContext(BagContext);

  if (!bag) {
    throw new Error("useBag must be used within BagProvider");
  }

  return bag;
}

function BagDrawer({
  lines,
  open,
  onClose,
  onQuantity,
}: {
  lines: BagLine[];
  open: boolean;
  onClose: () => void;
  onQuantity: (slug: string, size: string, quantity: number) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const router = useRouter();
  const items = lines.flatMap((line) => {
    const product = getProduct(line.slug);
    return product ? [{ ...line, product }] : [];
  });
  const subtotal = items.reduce(
    (total, line) => total + line.product.price * line.quantity,
    0,
  );
  const delivery = deliveryCharge(subtotal);
  const total = subtotal + delivery;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
      return;
    }

    if (dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      id="bag"
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className="fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-dvh w-[min(420px,100vw)] max-w-none border-0 bg-canvas p-0 text-ink open:flex backdrop:bg-ink/70"
    >
      <div className="relative flex h-full min-h-0 w-full flex-col">
        <div className="stripe absolute inset-y-0 left-0 w-3.5" />
        <div className="flex items-center justify-between border-b-2 border-ink py-4 pr-4 pl-8">
          <h2 id={titleId} className="cd m-0 text-[40px] leading-none">
            Bag
          </h2>
          <button
            type="button"
            aria-label="Close bag"
            onClick={onClose}
            className="flex size-12 cursor-pointer items-center justify-center border-2 border-ink bg-transparent"
          >
            <CloseIcon />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col px-8 py-10">
            <p className="cd m-0 text-[64px] leading-[0.85]">Empty</p>
            <p className="mt-4 mb-0 max-w-xs text-[17px] leading-[1.55] text-body">
              Nothing in the bag yet.
            </p>
            <Link
              href="/collections/winter"
              onClick={onClose}
              className="mt-8 inline-flex min-h-12 w-fit items-center bg-accent px-6 text-[13px] font-extrabold tracking-[0.14em] text-white uppercase"
            >
              Shop the drop
            </Link>
          </div>
        ) : (
          <>
            <ul className="m-0 flex-1 list-none overflow-y-auto px-8 py-2">
              {items.map((line) => (
                <li
                  key={`${line.slug}-${line.size}`}
                  className="flex gap-4 border-b-2 border-ink py-5"
                >
                  <Link
                    href={`/products/${line.product.slug}`}
                    onClick={onClose}
                    className="relative size-[88px] shrink-0 bg-mist"
                  >
                    <Image
                      src={line.product.image}
                      alt=""
                      fill
                      sizes="88px"
                      className={
                        line.product.imageFit === "contain"
                          ? "object-contain mix-blend-multiply"
                          : "object-cover"
                      }
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        href={`/products/${line.product.slug}`}
                        onClick={onClose}
                        className="font-extrabold hover:text-accent"
                      >
                        {line.product.name}
                      </Link>
                      <span className="shrink-0 font-extrabold">
                        {formatPrice(line.product.price * line.quantity)}
                      </span>
                    </div>
                    <div className="mt-1 text-[13px] font-bold tracking-[0.1em] text-muted uppercase">
                      Size {line.size}
                    </div>
                    <div className="mt-3 flex items-center gap-4">
                      <div className="flex border-2 border-ink">
                        <button
                          type="button"
                          aria-label={`Decrease ${line.product.name} quantity`}
                          onClick={() => onQuantity(line.slug, line.size, line.quantity - 1)}
                          className="flex size-9 cursor-pointer items-center justify-center border-0 bg-transparent text-lg font-extrabold"
                        >
                          −
                        </button>
                        <span className="flex min-w-8 items-center justify-center font-extrabold">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase ${line.product.name} quantity`}
                          onClick={() => onQuantity(line.slug, line.size, line.quantity + 1)}
                          className="flex size-9 cursor-pointer items-center justify-center border-0 bg-transparent text-lg font-extrabold"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => onQuantity(line.slug, line.size, 0)}
                        className="cursor-pointer border-0 bg-transparent p-0 text-xs font-bold tracking-[0.1em] uppercase underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t-2 border-ink px-8 py-5">
              <div className="flex items-center justify-between text-sm font-bold tracking-[0.08em] uppercase">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm font-bold tracking-[0.08em] uppercase">
                <span>Delivery</span>
                <span>{delivery === 0 ? "Free" : formatPrice(delivery)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t-2 border-ink pt-3 text-[15px] font-extrabold tracking-[0.08em] uppercase">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <p className="mt-2 mb-0 text-sm text-muted">
                {delivery === 0
                  ? "Delivery is free on this order."
                  : `Free delivery over ${formatPrice(freeDeliveryMinimum)}.`}
              </p>
              <Link
                href="/checkout"
                onClick={(event) => {
                  if (
                    event.metaKey ||
                    event.ctrlKey ||
                    event.shiftKey ||
                    event.altKey ||
                    event.button !== 0
                  ) {
                    return;
                  }

                  event.preventDefault();
                  onClose();
                  window.setTimeout(() => router.push("/checkout"), 0);
                }}
                className="mt-4 flex min-h-12 items-center justify-between bg-accent px-5 text-[13px] font-extrabold tracking-[0.14em] text-white uppercase"
              >
                Checkout
                <ArrowIcon className="size-[18px]" />
              </Link>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
