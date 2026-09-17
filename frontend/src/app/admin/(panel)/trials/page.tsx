import { createClient } from "@/lib/supabase/server";
import { TrialsTable } from "@/components/admin/trials-table";

export default async function AdminTrialsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("trial_bookings")
    .select("*, packages(name, slug)")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-[var(--orange)] uppercase">
          Leads
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wide">
          Trial bookings
        </h1>
        <p className="mt-2 text-sm text-[var(--gray)]">
          Free 1-day visits from the join flow. Convert to create a member +
          membership.
        </p>
      </div>
      <TrialsTable rows={(data as never) || []} />
    </div>
  );
}
