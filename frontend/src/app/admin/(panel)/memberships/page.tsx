import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { syncExpiredMemberships } from "@/features/admin/actions";
import { Button } from "@/components/ui/button";

export default async function AdminMembershipsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const supabase = await createClient();
  await supabase.rpc("sync_membership_status");

  let query = supabase
    .from("memberships")
    .select("*, members(full_name, email, phone), packages(name, price_label)")
    .order("ends_on", { ascending: true });

  if (status === "active" || status === "expired" || status === "cancelled") {
    query = query.eq("status", status);
  }

  const { data } = await query;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-[var(--orange)] uppercase">
            Plans
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wide">
            Memberships
          </h1>
        </div>
        <form action={syncExpiredMemberships}>
          <Button type="submit" variant="outline" size="sm">
            Sync statuses
          </Button>
        </form>
      </div>

      <div className="flex flex-wrap gap-2">
        {["all", "active", "expired", "cancelled"].map((s) => (
          <a key={s} href={s === "all" ? "/admin/memberships" : `/admin/memberships?status=${s}`}>
            <Badge variant={(!status && s === "all") || status === s ? "default" : "secondary"}>
              {s}
            </Badge>
          </a>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(data || []).map((row) => {
              const member = row.members as {
                full_name: string;
                email: string;
                phone: string;
              } | null;
              const pkg = row.packages as {
                name: string;
                price_label: string;
              } | null;
              return (
                <TableRow key={row.id}>
                  <TableCell>
                    <p className="font-medium">{member?.full_name}</p>
                    <p className="text-xs text-white/45">{member?.email}</p>
                  </TableCell>
                  <TableCell>
                    {pkg?.name}
                    <span className="block text-xs text-white/45">
                      {pkg?.price_label}
                    </span>
                  </TableCell>
                  <TableCell>
                    {row.starts_on} → {row.ends_on}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        row.status === "active"
                          ? "success"
                          : row.status === "expired"
                            ? "danger"
                            : "secondary"
                      }
                    >
                      {row.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {!data?.length ? (
          <p className="p-8 text-sm text-[var(--gray)]">No memberships found.</p>
        ) : null}
      </div>
    </div>
  );
}
