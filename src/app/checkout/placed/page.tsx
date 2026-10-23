import type { Metadata } from "next";
import { OrderConfirmation } from "@/components/order-confirmation";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Order placed",
  description: "Your Kstyle order is placed for cash on delivery.",
};

export default function OrderPlacedPage() {
  return (
    <div className="bg-canvas text-ink">
      <SiteHeader />
      <OrderConfirmation />
    </div>
  );
}
