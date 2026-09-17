import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { syncExpiredMemberships } from "@/features/admin/actions";
import { Button } from "@/components/ui/button";
import { addDays, formatISO } from "date-fns";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  await supabase.rpc("sync_membership_status");

  const today = formatISO(new Date(), { representation: "date" });
  const in7 = formatISO(addDays(new Date(), 7), { representation: "date" });

  const [
    { count: newTrials },
    { count: activeMembers },
    { count: activeMemberships },
    { count: expiringSoon },
    { count: expired },
  ] = await Promise.all([
    supabase
      .from("trial_bookings")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("members")
      .select("*", { count: "exact", head: true })
      .eq("status", "active"),
    supabase
      .from("memberships")
      .select("*", { count: "exact", head: true })
      .eq("status", "active"),
    supabase
      .from("memberships")
      .select("*", { count: "exact", head: true })
      .eq("status", "active")
      .gte("ends_on", today)
      .lte("ends_on", in7),
    supabase
      .from("memberships")
      .select("*", { count: "exact", head: true })
      .eq("status", "expired"),
  ]);

  const stats = [
    { label: "New trial leads", value: newTrials ?? 0, href: "/admin/trials" },
    { label: "Active members", value: activeMembers ?? 0, href: "/admin/members" },
    {
      label: "Active memberships",
      value: activeMemberships ?? 0,
      href: "/admin/memberships",
    },
    {
      label: "Expiring in 7 days",
      value: expiringSoon ?? 0,
      href: "/admin/reminders",
    },
    { label: "Expired plans", value: expired ?? 0, href: "/admin/reminders" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-[var(--orange)] uppercase">
            Overview
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wide">
            Dashboard
          </h1>
        </div>
        <form action={syncExpiredMemberships}>
          <Button type="submit" variant="outline" size="sm">
            Sync expired memberships
          </Button>
        </form>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <Card className="transition-colors hover:border-[var(--orange)]/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white/70">{s.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-[family-name:var(--font-number)] text-4xl text-[var(--orange)]">
                  {s.value}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Quick links</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Badge variant="secondary">
            <Link href="/admin/trials">Review trial bookings</Link>
          </Badge>
          <Badge variant="secondary">
            <Link href="/admin/members">Add / edit members</Link>
          </Badge>
          <Badge variant="secondary">
            <Link href="/admin/reminders">Send WhatsApp reminders</Link>
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
}
