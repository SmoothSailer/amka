"use client";

import { useClasses } from "@/hooks/use-gym-admin";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ClassesPage() {
  const { data: classes, isLoading } = useClasses();

  if (isLoading) {
    return <div className="text-cream">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-black text-4xl text-cream uppercase">Classes</h1>
          <p className="text-muted-foreground mt-2">Manage your gym class schedule</p>
        </div>
        <Button className="bg-primary text-ink hover:bg-primary/90 font-heading font-bold uppercase tracking-wider">
          <Plus className="w-4 h-4 mr-2" />
          Create Class
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!classes?.length && (
          <p className="text-muted-foreground">No classes scheduled yet</p>
        )}
        {classes?.map((classItem) => (
          <div key={classItem.id} className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-heading font-bold text-lg text-cream">{classItem.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{classItem.trainerId ? `Trainer #${classItem.trainerId}` : "No trainer assigned"}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Scheduled</span>
                <span className="text-cream">{new Date(classItem.scheduledAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="text-cream">{classItem.durationMin} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Capacity</span>
                <span className="text-cream">{classItem.capacity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
