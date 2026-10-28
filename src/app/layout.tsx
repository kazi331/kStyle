import { BagProvider } from "@/components/bag";
import { FloatingCart } from "@/components/floating-cart";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: {
    default: "Kstyle",
    template: "%s — Kstyle",
  },
  description:
    "Premium-grade hoodies, jackets and more. Modern cuts and unique looks for a generation that dresses to be seen.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-canvas font-sans text-ink">
        <style href="view-transitions" precedence="default">{`
          ::view-transition {
            pointer-events: none;
          }

          ::view-transition-old(root),
          ::view-transition-new(root) {
            animation: none;
          }

          ::view-transition-group(.morph) {
            animation-duration: 400ms;
            animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          }

          @media (prefers-reduced-motion: reduce) {
            ::view-transition-group(*),
            ::view-transition-old(*),
            ::view-transition-new(*) {
              animation-duration: 0s !important;
              animation-delay: 0s !important;
            }
          }
        `}</style>
        <BagProvider>
          {children}
          <FloatingCart />
        </BagProvider>
      </body>
    </html>
  );
}
