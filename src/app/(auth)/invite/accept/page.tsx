"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInviteVerify, useInviteAccept } from "@/hooks/use-invite";
import { handleApiError } from "@/lib/api-error-handler";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export default function InviteAcceptPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <InviteAcceptContent />
    </Suspense>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-4">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
        <p className="text-cream">Loading...</p>
      </div>
    </div>
  );
}

function InviteAcceptContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";

  const { data: verifyData, isLoading: verifying, error: verifyError } = useInviteVerify(token);
  const acceptMutation = useInviteAccept();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await acceptMutation.mutateAsync({ token, password });
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError(handleApiError(err));
    }
  };

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink px-4">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-cream">Verifying invite...</p>
        </div>
      </div>
    );
  }

  if (verifyError || !verifyData?.valid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink px-4">
        <div className="w-full max-w-md text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="font-heading font-black text-2xl text-cream mb-2">Invalid Invite</h1>
          <p className="text-muted-foreground mb-6">
            {verifyData?.error || "This invite link is invalid or has expired."}
          </p>
          <Button
            onClick={() => router.push("/login")}
            className="bg-primary text-ink hover:bg-primary/90 font-heading font-bold uppercase tracking-wider"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink px-4">
        <div className="w-full max-w-md text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="font-heading font-black text-2xl text-cream mb-2">Account Created!</h1>
          <p className="text-muted-foreground mb-6">
            Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  const invite = verifyData.invite;

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-heading font-black text-4xl text-cream">
            Am<em className="text-lime not-italic">ka</em>
          </h1>
          <p className="text-muted-foreground mt-2">Set Up Your Account</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8 space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-500 text-sm">
              {error}
            </div>
          )}

          <div className="bg-background rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground">You&apos;ve been invited to join</p>
            <p className="font-heading font-bold text-lg text-cream mt-1">{invite?.gymName}</p>
            <p className="text-sm text-muted-foreground mt-1">
              as <span className="text-cream capitalize">{invite?.role?.toLowerCase()}</span>
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-cream text-sm">Email</Label>
            <Input
              type="email"
              value={invite?.email || ""}
              disabled
              className="bg-background border-border opacity-60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-cream">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              required
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-cream">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
              className="bg-background border-border"
            />
          </div>

          <Button
            type="submit"
            disabled={acceptMutation.isPending}
            className="w-full bg-lime text-ink hover:bg-lime/90 font-heading font-bold uppercase tracking-wider"
          >
            {acceptMutation.isPending ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </div>
    </div>
  );
}
