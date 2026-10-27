"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { formatPrice } from "@/lib/catalog";
import { isOrderPending, readOrderSnapshot, readServerOrder, subscribeOrder } from "@/lib/order";

export function OrderConfirmation() {
  const order = useSyncExternalStore(subscribeOrder, readOrderSnapshot, readServerOrder);

  if (isOrderPending(order)) return <div className="min-h-[70vh]" />;

  if (!order) {
    return (
      <main className="px-4 pt-2 pb-16 min-[861px]:px-8">
        <p className="text-xs font-bold tracking-[0.14em] text-muted uppercase">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          {" / "}
          <span className="text-ink">Order</span>
        </p>
        <h1 className="cd display-xl mt-8 mb-0">No order</h1>
        <p className="mt-4 mb-0 max-w-md text-[17px] leading-[1.55] text-body">
          There is no placed order in this session.
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

  const destination = [
    order.address.replace(/\s+/g, " ").trim(),
    order.subdistrict,
    order.city,
    order.division,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <main className="px-4 pt-2 pb-16 min-[861px]:px-8 min-[861px]:pb-24">
      <p className="text-xs font-bold tracking-[0.14em] text-muted uppercase">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        {" / "}
        <span className="text-ink">Order {order.id}</span>
      </p>
      <div className="mt-6 text-xs font-bold tracking-[0.16em] text-muted uppercase">
        Order {order.id}
      </div>
      <h1 className="cd display-xl mt-2 mb-0">
        Placed<span className="text-accent">.</span>
      </h1>
      <p className="mt-5 mb-0 max-w-2xl text-[17px] leading-[1.55] text-body">
        Cash on delivery. We&apos;ll call {order.phone} before we ship to {destination}.
      </p>
      <div className="mt-8 grid grid-cols-1 items-start gap-8 min-[861px]:grid-cols-[minmax(0,1fr)_minmax(280px,400px)] min-[861px]:gap-12">
        <div className="min-w-0">
          <dl className="m-0 border-t-2 border-ink">
            <Detail label="Name" value={order.name} />
            <Detail label="Phone" value={order.phone} />
            {order.email ? <Detail label="Email" value={order.email} /> : null}
            <Detail label="Address" value={order.address} />
            {order.note ? <Detail label="Note" value={order.note} /> : null}
            {order.division ? <Detail label="Division" value={order.division} /> : null}
            <Detail label="City" value={order.city} />
            {order.subdistrict ? <Detail label="Sub-district" value={order.subdistrict} /> : null}
            <Detail label="Payment" value="Cash on delivery" />
          </dl>
          <Link
            href="/"
            className="mt-8 inline-flex min-h-12 items-center bg-ink px-6 text-[13px] font-extrabold tracking-[0.14em] text-paper uppercase"
          >
            Back home
          </Link>
        </div>
        <aside className="min-w-0 bg-ink px-5 py-6 text-paper min-[861px]:sticky min-[861px]:top-[calc(var(--header-height,5rem)+1.5rem)] min-[861px]:px-7 min-[861px]:py-8">
          <h2 className="cd m-0 text-[40px] leading-none">The order</h2>
          <ul className="m-0 mt-5 list-none border-t-2 border-paper">
            {order.lines.map((line) => (
              <li
                key={`${line.slug}-${line.size}`}
                className="flex gap-4 border-b-2 border-paper py-4"
              >
                <div className="relative size-[72px] shrink-0 bg-mist">
                  <Image
                    src={line.image}
                    alt=""
                    fill
                    sizes="72px"
                    className={
                      line.imageFit === "contain"
                        ? "object-contain mix-blend-multiply"
                        : "object-cover"
                    }
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-extrabold">{line.name}</span>
                    <span className="shrink-0 font-extrabold">
                      {formatPrice(line.price * line.quantity)}
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
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm font-bold tracking-[0.08em] uppercase">
            <span>Delivery</span>
            <span>{order.delivery === 0 ? "Free" : formatPrice(order.delivery)}</span>
          </div>
          <div className="mt-4 flex justify-between border-t-2 border-paper pt-4 text-[15px] font-extrabold tracking-[0.08em] uppercase">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </aside>
      </div>
    </main>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 gap-1 border-b-2 border-ink py-4 min-[861px]:grid-cols-[9rem_minmax(0,1fr)] min-[861px]:items-baseline min-[861px]:gap-6">
      <dt className="font-extrabold">{label}</dt>
      <dd className="m-0 whitespace-pre-line text-body">{value}</dd>
    </div>
  );
}
