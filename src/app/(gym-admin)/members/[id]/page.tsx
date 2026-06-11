"use client";

import { useMember } from "@/hooks/use-gym-admin";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, Mail, Calendar, Activity } from "lucide-react";

export default function MemberDetailPage() {
  const params = useParams();
  const router = useRouter();
  const memberId = params.id as string;

  const { data: member, isLoading } = useMember(memberId);

  if (isLoading) {
    return <div className="text-cream">Loading...</div>;
  }

  if (!member) {
    return <div className="text-cream">Member not found</div>;
  }

  return (
    <div className="space-y-8">
      <Button
        variant="ghost"
        onClick={() => router.push("/members")}
        className="text-muted-foreground hover:text-cream"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Members
      </Button>

      <div className="bg-card border border-border rounded-xl p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center font-heading font-black text-2xl text-primary">
              {member.preferredName.charAt(0)}
            </div>
            <div>
              <h1 className="font-heading font-black text-3xl text-cream uppercase">{member.preferredName}</h1>
              <p className="text-muted-foreground mt-1">{member.membershipStatus} Member</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm border ${
            member.membershipStatus === "ACTIVE" ? "bg-green-500/10 text-green-500 border-green-500/20" :
            member.membershipStatus === "EXPIRED" ? "bg-red-500/10 text-red-500 border-red-500/20" :
            "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
          }`}>
            {member.membershipStatus}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="space-y-4">
            {member.phone && (
              <div className="flex items-center gap-3 text-cream">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <span>{member.phone}</span>
              </div>
            )}
            {member.email && (
              <div className="flex items-center gap-3 text-cream">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <span>{member.email}</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-cream">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <span>Joined {new Date(member.createdAt).toLocaleDateString()}</span>
            </div>
            {member.lastSeenAt && (
              <div className="flex items-center gap-3 text-cream">
                <Activity className="w-5 h-5 text-muted-foreground" />
                <span>Last seen {new Date(member.lastSeenAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          <div className="bg-background rounded-lg p-6 border border-border">
            <h3 className="font-heading font-bold text-lg text-cream mb-4">Membership Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className="text-cream font-medium capitalize">{member.membershipStatus}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Member Since</span>
                <span className="text-cream font-medium">{new Date(member.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Channel</span>
                <span className="text-cream font-medium capitalize">{member.channel}</span>
              </div>
              {member.fitnessGoal && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fitness Goal</span>
                  <span className="text-cream font-medium">{member.fitnessGoal}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <Button className="bg-primary text-ink hover:bg-primary/90 font-heading font-bold uppercase tracking-wider">
            Edit Member
          </Button>
          <Button variant="outline" className="border-border text-cream hover:bg-card/80 font-heading font-bold uppercase tracking-wider">
            Suspend Member
          </Button>
        </div>
      </div>
    </div>
  );
}
