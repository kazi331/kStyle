import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";

export const metadata: Metadata = {
  title: { absolute: "Kstyle" },
};

export default function Home() {
  return <HomePage />;
}
