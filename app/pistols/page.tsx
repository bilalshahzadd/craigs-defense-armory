import type { Metadata } from "next";
import { ProductListing } from "@/components/product/ProductListing";

export const metadata: Metadata = {
  title: "Pistols",
  description:
    "Compact platforms with full-size performance and the same match-grade internals as our rifles.",
};

export default function PistolsPage() {
  return <ProductListing category="pistols" />;
}
