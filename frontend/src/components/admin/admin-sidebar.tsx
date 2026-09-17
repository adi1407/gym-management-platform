"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  CreditCard,
  MessageCircle,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { adminLogout } from "@/features/admin/actions";
import { Button } from "@/components/ui/button";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/trials", label: "Trial leads", icon: ClipboardList },
  { href: "/admin/members", label: "Members", icon: Users },
  { href: "/admin/memberships", label: "Memberships", icon: CreditCard },
  { href: "/admin/reminders", label: "WhatsApp", icon: MessageCircle },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-full flex-col border-b border-[var(--border)] bg-[var(--surface)] lg:min-h-screen lg:w-64 lg:border-r lg:border-b-0">
      <div className="border-b border-[var(--border)] px-5 py-5">
        <p className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-[var(--orange)]">
          EVOLUTION
        </p>
        <p className="text-[10px] font-semibold tracking-[0.3em] text-white/45 uppercase">
          Admin
        </p>
      </div>
      <nav className="flex flex-1 flex-row gap-1 overflow-x-auto p-3 lg:flex-col">
        {LINKS.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/admin" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm whitespace-nowrap transition-colors",
                active
                  ? "bg-[var(--orange)]/15 text-[var(--orange-light)]"
                  : "text-white/65 hover:bg-white/5 hover:text-white",
              )}
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
      <form action={adminLogout} className="border-t border-[var(--border)] p-3">
        <Button type="submit" variant="ghost" className="w-full justify-start gap-2 text-white/60">
          <LogOut className="size-4" />
          Sign out
        </Button>
      </form>
    </aside>
  );
}
