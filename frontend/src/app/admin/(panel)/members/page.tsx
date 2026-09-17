import { createClient } from "@/lib/supabase/server";
import { MembersManager } from "@/components/admin/members-manager";

export default async function AdminMembersPage() {
  const supabase = await createClient();
  const [{ data: members }, { data: packages }] = await Promise.all([
    supabase
      .from("members")
      .select("*, memberships(id, ends_on, status, packages(name))")
      .order("created_at", { ascending: false }),
    supabase.from("packages").select("*").eq("active", true).order("duration_days"),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-[var(--orange)] uppercase">
          Accounts
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wide">
          Members
        </h1>
      </div>
      <MembersManager
        members={(members as never) || []}
        packages={packages || []}
      />
    </div>
  );
}
