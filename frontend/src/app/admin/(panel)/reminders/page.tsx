import { createClient } from "@/lib/supabase/server";
import { RemindersPanel } from "@/components/admin/reminders-panel";
import { addDays, formatISO } from "date-fns";

export default async function AdminRemindersPage() {
  const supabase = await createClient();
  await supabase.rpc("sync_membership_status");

  const today = formatISO(new Date(), { representation: "date" });
  const in7 = formatISO(addDays(new Date(), 7), { representation: "date" });

  const { data: expired } = await supabase
    .from("memberships")
    .select("id, ends_on, status, members(full_name, phone), packages(name)")
    .eq("status", "expired")
    .order("ends_on", { ascending: false })
    .limit(50);

  const { data: ending } = await supabase
    .from("memberships")
    .select("id, ends_on, status, members(full_name, phone), packages(name)")
    .eq("status", "active")
    .gte("ends_on", today)
    .lte("ends_on", in7)
    .order("ends_on", { ascending: true });

  const mapRow = (row: {
    id: string;
    ends_on: string;
    status: string;
    members: { full_name: string; phone: string } | { full_name: string; phone: string }[] | null;
    packages: { name: string } | { name: string }[] | null;
  }) => {
    const member = Array.isArray(row.members) ? row.members[0] : row.members;
    const pkg = Array.isArray(row.packages) ? row.packages[0] : row.packages;
    return {
      membershipId: row.id,
      memberName: member?.full_name || "Member",
      phone: member?.phone || "",
      packageName: pkg?.name || "Membership",
      endsOn: row.ends_on,
      status: row.status,
    };
  };

  const targets = [...(ending || []), ...(expired || [])].map(mapRow);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-[var(--orange)] uppercase">
          Outreach
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wide">
          WhatsApp reminders
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--gray)]">
          Ending within 7 days and expired memberships. Templates fill in the
          member name automatically — then open WhatsApp to send.
        </p>
      </div>
      <RemindersPanel targets={targets} />
    </div>
  );
}
