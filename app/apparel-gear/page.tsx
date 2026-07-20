import type { Metadata } from "next";
import { ProductListing } from "@/components/product/ProductListing";

export const metadata: Metadata = {
  title: "Apparel & Gear",
  description:
    "Precision accessories, everyday carry, and represent-the-brand apparel — engineered and tested like everything we make.",
};

export default function ApparelGearPage() {
  return <ProductListing category="apparel-gear" />;
}
