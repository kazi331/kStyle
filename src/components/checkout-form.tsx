"use client";

import { useBag } from "@/components/bag";
import { ArrowIcon } from "@/components/icons";
import { districtsIn, divisionNames, upazilasIn } from "@/lib/bangladesh";
import {
  deliveryCharge,
  formatPrice,
  freeDeliveryMinimum,
  getProduct,
} from "@/lib/catalog";
import { createOrderId, saveOrder } from "@/lib/order";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const columns =
  "mt-8 grid grid-cols-1 items-start gap-8 min-[861px]:grid-cols-[minmax(0,1fr)_minmax(280px,400px)] min-[861px]:gap-12";

export function CheckoutForm() {
  const { lines, ready, clear } = useBag();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [division, setDivision] = useState("");
  const [city, setCity] = useState("");
  const [subdistrict, setSubdistrict] = useState("");
  const [noteOpen, setNoteOpen] = useState(false);
  const cities = districtsIn(division);
  const subdistricts = upazilasIn(division, city);
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

  function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || items.length === 0) return;

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const address = String(data.get("address") ?? "").trim();
    const note = String(data.get("note") ?? "").trim();
    if (
      !name ||
      !phone ||
      !address ||
      !division ||
      !cities.includes(city) ||
      !subdistricts.includes(subdistrict)
    ) {
      return;
    }
    if (email && !email.includes("@")) return;

    setPending(true);
    saveOrder({
      id: createOrderId(),
      name,
      phone,
      ...(email ? { email } : {}),
      address,
      ...(note ? { note } : {}),
      division,
      city,
      subdistrict,
      lines: items.map((line) => ({
        slug: line.product.slug,
        name: line.product.name,
        size: line.size,
        quantity: line.quantity,
        price: line.product.price,
        image: line.product.image,
        imageFit: line.product.imageFit,
      })),
      subtotal,
      delivery,
      total,
    });
    clear();
    router.push("/checkout/placed");
  }

  if (!ready || pending) return <div className="min-h-[70vh]" />;

  if (items.length === 0) {
    return (
      <main className="px-4 pt-2 pb-16 min-[861px]:px-8">
        <p className="text-xs font-bold tracking-[0.14em] text-muted uppercase">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          {" / "}
          <span className="text-ink">Checkout</span>
        </p>
        <h1 className="cd display-xl mt-8 mb-0">Empty</h1>
        <p className="mt-4 mb-0 max-w-md text-[17px] leading-[1.55] text-body">
          Nothing to check out. Add a piece, then come back.
        </p>
        <Link
          href="/collections/winter"
          className="mt-8 inline-flex min-h-12 items-center bg-accent px-6 text-[13px] font-extrabold tracking-[0.14em] text-white uppercase"
        >
          Shop the drop
        </Link>
      </main>
    );
  }

  return (
    <main className="px-4 pt-2 pb-16 min-[861px]:px-8 min-[861px]:pb-24">
      <p className="text-xs font-bold tracking-[0.14em] text-muted uppercase">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        {" / "}
        <span className="text-ink">Checkout</span>
      </p>
      <h1 className="cd display-xl mt-6 mb-0">Checkout<span className="text-accent">.</span></h1>
      <form className={columns} onSubmit={placeOrder}>
        <div className="min-w-0">
          <h2 className="m-0 text-xs font-bold tracking-[0.16em] text-muted uppercase">
            Delivery
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 ">
            <Field label="Name" name="name" autoComplete="name" />
            <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
            <Field
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              required={false}
            />
            <SelectField
              label="Division"
              name="division"
              value={division}
              autoComplete="address-level1"
              placeholder="Select division"
              options={divisionNames()}
              onChange={(value) => {
                setDivision(value);
                setCity("");
                setSubdistrict("");
              }}
            />
            <SelectField
              label="City"
              name="city"
              value={city}
              autoComplete="address-level2"
              placeholder={division ? "Select city" : "Select a division first"}
              options={cities}
              disabled={!division}
              onChange={(value) => {
                setCity(value);
                setSubdistrict("");
              }}
            />
            <SelectField
              label="Sub-district"
              name="subdistrict"
              value={subdistrict}
              autoComplete="address-level3"
              placeholder={city ? "Select sub-district" : "Select a city first"}
              options={subdistricts}
              disabled={!city}
              onChange={setSubdistrict}
            />
          </div>
          <TextField label="Address" name="address" className="md:col-span-3 xl:col-span-3" />
          {noteOpen ? (
            <TextField
              label="Note"
              name="note"
              required={false}
              rows={4}
              autoComplete="off"
              placeholder="Gate code, landmark, when to call"
              autoFocus
              className="md:col-span-3 xl:col-span-3"
            />
          ) : (
            <div className="md:col-span-3 xl:col-span-3">
              <button
                type="button"
                onClick={() => setNoteOpen(true)}
                className="cursor-pointer border-0 bg-transparent p-0 text-[13px] font-extrabold tracking-[0.12em] uppercase underline"
              >
                Add note
              </button>
            </div>
          )}
          <div className="mt-8 border-2 border-ink p-4 min-[861px]:p-5">
            <div className="text-xs font-bold tracking-[0.16em] text-muted uppercase">
              Payment
            </div>
            <div className="mt-3 text-lg font-extrabold">Cash on delivery</div>
            <p className="mt-1 mb-0 leading-[1.55] text-body">
              Pay when the order arrives. We&apos;ll call to confirm before it ships.
            </p>
          </div>
        </div>
        <aside className="bg-ink px-5 py-6 text-paper min-[861px]:sticky min-[861px]:top-[calc(var(--header-height,5rem)+1.5rem)] min-[861px]:px-7 min-[861px]:py-8">
          <h2 className="cd m-0 text-[40px] leading-none">Your bag</h2>
          <ul className="m-0 mt-5 list-none border-t-2 border-paper">
            {items.map((line) => (
              <li
                key={`${line.slug}-${line.size}`}
                className="flex gap-4 border-b-2 border-paper py-4"
              >
                <div className="relative size-[72px] shrink-0 bg-mist">
                  <Image
                    src={line.product.image}
                    alt=""
                    fill
                    sizes="72px"
                    className={
                      line.product.imageFit === "contain"
                        ? "object-contain mix-blend-multiply"
                        : "object-cover"
                    }
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-extrabold">{line.product.name}</span>
                    <span className="shrink-0 font-extrabold">
                      {formatPrice(line.product.price * line.quantity)}
                    </span>
                  </div>
                  <div className="mt-1 text-[13px] font-bold tracking-[0.1em] text-steel uppercase">
                    Size {line.size} · Qty {line.quantity}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between text-sm font-bold tracking-[0.08em] uppercase">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm font-bold tracking-[0.08em] uppercase">
            <span>Delivery</span>
            <span>{delivery === 0 ? "Free" : formatPrice(delivery)}</span>
          </div>
          <p className="mt-2 mb-0 text-sm text-steel">
            {delivery === 0
              ? "Delivery is free on this order."
              : `Free delivery over ${formatPrice(freeDeliveryMinimum)}.`}
          </p>
          <div className="mt-4 flex justify-between border-t-2 border-paper pt-4 text-[15px] font-extrabold tracking-[0.08em] uppercase">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <button
            type="submit"
            disabled={pending}
            className="mt-6 flex min-h-[60px] w-full cursor-pointer items-center justify-between border-0 bg-accent px-6 text-[15px] font-extrabold tracking-[0.14em] text-white uppercase disabled:cursor-wait"
          >
            <span>{pending ? "Placing…" : "Place order"}</span>
            <ArrowIcon className="size-[22px]" />
          </button>
        </aside>
      </form>
    </main>
  );
}

const controlClass =
  "box-border w-full border-2 border-ink bg-transparent px-3.5 text-base text-ink";

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required = true,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`block min-w-0 ${className ?? ""}`}>
      <span className="text-[11px] font-bold tracking-[0.14em] uppercase">
        {label}
        {required ? null : <span className="text-muted"> — optional</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className={`${controlClass} mt-2 h-14`}
      />
    </label>
  );
}

function TextField({
  label,
  name,
  required = true,
  rows = 4,
  autoComplete = "street-address",
  placeholder = "House, road, area",
  autoFocus = false,
  className,
}: {
  label: string;
  name: string;
  required?: boolean;
  rows?: number;
  autoComplete?: string;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}) {
  return (
    <label className={`block min-w-0 ${className ?? ""}`}>
      <span className="text-[11px] font-bold tracking-[0.14em] uppercase">
        {label}
        {required ? null : <span className="text-muted"> — optional</span>}
      </span>
      <textarea
        name={name}
        required={required}
        rows={rows}
        autoComplete={autoComplete}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`${controlClass} mt-2 resize-y py-3 placeholder:text-muted`}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  value,
  options,
  placeholder,
  autoComplete,
  disabled = false,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  options: readonly string[];
  placeholder: string;
  autoComplete: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className={`block min-w-0 ${disabled ? "text-muted" : ""}`}>
      <span className="text-[11px] font-bold tracking-[0.14em] uppercase">{label}</span>
      <span className="relative mt-2 block">
        <select
          name={name}
          required
          value={value}
          disabled={disabled}
          autoComplete={autoComplete}
          onChange={(event) => onChange(event.target.value)}
          className={`${controlClass} h-14 min-w-0 cursor-pointer appearance-none truncate pr-10 disabled:cursor-not-allowed`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-[10px]"
        >
          ▼
        </span>
      </span>
    </label>
  );
}
