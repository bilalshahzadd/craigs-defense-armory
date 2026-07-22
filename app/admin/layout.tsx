import type { Metadata } from "next";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { logout } from "@/app/login/actions";
import { AdminNav } from "./AdminNav";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-ink">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-ink-800 lg:flex">
        <div className="border-b border-white/10 px-5 py-6">
          <Link href="/admin">
            <Logo className="h-10 w-auto" />
          </Link>
          <p className="mt-3 font-display text-[10px] uppercase tracking-widest2 text-copper">
            Control Panel
          </p>
        </div>

        <div className="flex-1 py-4">
          <AdminNav />
        </div>

        <form action={logout} className="border-t border-white/10 p-4">
          <button className="flex w-full items-center gap-3 px-4 py-2.5 font-display text-sm uppercase tracking-widest text-muted transition hover:text-red-400">
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </form>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-ink-800 px-5 py-3 lg:hidden">
          <Link href="/admin">
            <Logo className="h-8 w-auto" />
          </Link>
          <form action={logout}>
            <button className="text-muted hover:text-red-400" aria-label="Sign out">
              <LogOut className="h-5 w-5" />
            </button>
          </form>
        </div>
        <div className="lg:hidden">
          <AdminNav />
        </div>

        <main className="flex-1 p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
