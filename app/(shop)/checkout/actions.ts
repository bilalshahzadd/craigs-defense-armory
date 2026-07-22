"use server";

import { revalidatePath } from "next/cache";
import { createOrder, decrementStock } from "@/lib/queries";
import type { OrderItem } from "@/lib/types";

export interface CheckoutState {
  error?: string;
  orderNumber?: string;
}

export async function placeOrder(
  _prev: CheckoutState,
  formData: FormData
): Promise<CheckoutState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  let items: OrderItem[] = [];
  try {
    items = JSON.parse(String(formData.get("items") ?? "[]"));
  } catch {
    return { error: "Could not read your cart." };
  }

  if (!Array.isArray(items) || items.length === 0) {
    return { error: "Your cart is empty." };
  }
  if (!name || !email) {
    return { error: "Please enter your name and email." };
  }

  const subtotal = items.reduce(
    (sum, i) => sum + Number(i.price) * Number(i.qty),
    0
  );

  const orderNumber = await createOrder({
    customer_name: name,
    customer_email: email,
    subtotal,
    items,
  });

  // Keep inventory in sync
  for (const item of items) {
    await decrementStock(item.slug, Number(item.qty) || 0);
  }

  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");

  return { orderNumber };
}
