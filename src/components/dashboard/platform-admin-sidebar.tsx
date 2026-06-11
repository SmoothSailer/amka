"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  Mail,
  CreditCard,
  LogOut,
} from "lucide-react";
import { clearAuthTokenClient } from "@/lib/auth-client";

const menuItems = [
  { href: "/platform/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/platform/tenants", label: "Tenants", icon: Building2 },
  { href: "/platform/members", label: "Members", icon: Users },
  { href: "/platform/invites", label: "Invites", icon: Mail },
  { href: "/platform/billing", label: "Billing", icon: CreditCard },
];

export function PlatformAdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    clearAuthTokenClient("platform");
    router.push("/platform-login");
  };

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-border">
        <h2 className="font-heading font-black text-xl text-cream">
          Am<em className="text-lime not-italic">ka</em>
        </h2>
        <p className="text-xs text-muted-foreground mt-1">Platform Admin</p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-card/50 hover:text-cream"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-card/50 hover:text-cream transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
