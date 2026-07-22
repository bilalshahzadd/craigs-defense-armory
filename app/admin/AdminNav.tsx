"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ReceiptText,
  Store,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", Icon: Package },
  { href: "/admin/categories", label: "Categories", Icon: FolderTree },
  { href: "/admin/orders", label: "Orders", Icon: ReceiptText },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {links.map(({ href, label, Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 font-display text-sm uppercase tracking-widest transition-colors",
              active
                ? "bg-copper/15 text-copper border-l-2 border-copper"
                : "border-l-2 border-transparent text-muted hover:bg-white/5 hover:text-white"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}

      <Link
        href="/"
        target="_blank"
        className="mt-4 flex items-center gap-3 border-l-2 border-transparent px-4 py-3 font-display text-sm uppercase tracking-widest text-muted transition-colors hover:bg-white/5 hover:text-white"
      >
        <Store className="h-4 w-4" />
        View Store
      </Link>
    </nav>
  );
}
