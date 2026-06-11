"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  ArrowLeftRight,
  BarChart3,
  CreditCard,
  Palette,
  UserCog,
  Settings,
  LogOut,
} from "lucide-react";
import { clearAuthTokenClient } from "@/lib/auth-client";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/members", label: "Members", icon: Users },
  { href: "/classes", label: "Classes", icon: Calendar },
  { href: "/transfers", label: "Transfers", icon: ArrowLeftRight },
  { href: "/benchmarks", label: "Benchmarks", icon: BarChart3 },
  { href: "/billing", label: "Billing", icon: CreditCard },
  { href: "/branding", label: "Branding", icon: Palette },
  { href: "/staff", label: "Staff", icon: UserCog },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function GymAdminSidebar({ gymName, primaryColor }: { gymName: string; primaryColor: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    clearAuthTokenClient("gym");
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center font-heading font-black text-lg"
            style={{ backgroundColor: primaryColor, color: "#0D0C0A" }}
          >
            {gymName.charAt(0)}
          </div>
          <div>
            <h2 className="font-heading font-bold text-cream text-sm uppercase tracking-wide">
              {gymName}
            </h2>
            <p className="text-xs text-muted-foreground">Gym Admin</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
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
