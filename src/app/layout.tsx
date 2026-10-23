import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { BagProvider } from "@/components/bag";
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
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      <body className="min-h-full bg-canvas font-sans text-ink">
        <BagProvider>{children}</BagProvider>
      </body>
    </html>
  );
}
