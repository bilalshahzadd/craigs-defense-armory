import type { Metadata } from "next";
import { ProductListing } from "@/components/product/ProductListing";

export const metadata: Metadata = {
  title: "Rifles",
  description:
    "Hand-built, fully ambidextrous rifles — assembled and test-fired one at a time, guaranteed for life.",
};

export default function RiflesPage() {
  return <ProductListing category="rifles" />;
}
