import { PlatformAdminSidebar } from "@/components/dashboard/platform-admin-sidebar";

export default function PlatformAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-ink cursor-auto">
      <PlatformAdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
