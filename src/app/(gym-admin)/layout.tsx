import { GymAdminSidebar } from "@/components/dashboard/gym-admin-sidebar";
import { getGymData } from "@/lib/auth";

export default async function GymAdminLayout({ children }: { children: React.ReactNode }) {
  const gymData = await getGymData();

  return (
    <div className="flex min-h-screen bg-ink">
      <GymAdminSidebar
        gymName={gymData?.name || "Your Gym"}
        primaryColor={gymData?.primaryColor || "#CAFF33"}
      />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
