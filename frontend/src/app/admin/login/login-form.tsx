"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { adminLogin } from "@/features/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminLoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin";
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Admin login</CardTitle>
        <CardDescription>
          Supabase Auth · account must exist in admin_profiles.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          action={(formData) => {
            setError(null);
            startTransition(async () => {
              const result = await adminLogin(formData);
              if (result && !result.ok) setError(result.error);
            });
          }}
        >
          <input type="hidden" name="next" value={next} />
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required autoComplete="username" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
            />
          </div>
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <Button type="submit" variant="primary" className="w-full" disabled={pending}>
            {pending ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
