import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout-form";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Delivery details and cash on delivery for your Kstyle order.",
};

export default function CheckoutPage() {
  return (
    <div className="bg-canvas text-ink">
      <SiteHeader />
      <CheckoutForm />
    </div>
  );
}
