export interface SpecGroup {
  title: string;
  items: string[];
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  /** category slug, e.g. "rifles" */
  category: string;
  categoryLabel: string;
  kind: "firearm" | "accessory" | "apparel";
  price: number;
  image: string;
  tagline: string;
  badge: string | null;
  leadTime: string | null;
  colors: string[];
  description: string | null;
  specGroups: SpecGroup[];
  stock: number;
  isActive: boolean;
  sortOrder: number;
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  blurb: string | null;
  image: string | null;
  sortOrder: number;
  productCount?: number;
}

export interface OrderItem {
  slug: string;
  name: string;
  price: number;
  qty: number;
  variant?: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  customerName: string | null;
  customerEmail: string | null;
  status: "pending" | "paid" | "shipped" | "cancelled";
  subtotal: number;
  items: OrderItem[];
  createdAt: string;
}

export interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  outOfStock: number;
  lowStock: number;
  totalCategories: number;
  totalOrders: number;
  pendingOrders: number;
  revenue: number;
  inventoryValue: number;
}
