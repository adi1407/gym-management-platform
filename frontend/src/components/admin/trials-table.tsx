"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  convertTrialToMember,
  updateTrialStatus,
} from "@/features/admin/actions";
import type { Package, TrialBooking } from "@/types/database";

type Row = TrialBooking & { packages: Pick<Package, "name" | "slug"> | null };

const STATUS_VARIANT: Record<
  TrialBooking["status"],
  "default" | "secondary" | "success" | "warning" | "danger"
> = {
  new: "warning",
  contacted: "secondary",
  converted: "success",
  cancelled: "danger",
};

export function TrialsTable({ rows }: { rows: Row[] }) {
  const [pending, startTransition] = useTransition();

  function run(action: () => Promise<{ ok: boolean; error?: string }>) {
    startTransition(async () => {
      const result = await action();
      if (!result.ok) toast.error(result.error || "Failed");
      else toast.success("Updated");
    });
  }

  if (rows.length === 0) {
    return (
      <p className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 text-sm text-[var(--gray)]">
        No trial bookings yet. Leads from /join will appear here.
      </p>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Lead</TableHead>
            <TableHead>Package</TableHead>
            <TableHead>Visit</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <p className="font-medium text-white">{row.full_name}</p>
                <p className="text-xs text-white/45">{row.email}</p>
                <p className="text-xs text-white/45">{row.phone}</p>
              </TableCell>
              <TableCell>{row.packages?.name ?? "—"}</TableCell>
              <TableCell>
                <p>{row.visit_date}</p>
                <p className="text-xs text-white/45">{row.visit_time}</p>
              </TableCell>
              <TableCell>
                <Badge variant={STATUS_VARIANT[row.status]}>{row.status}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap justify-end gap-2">
                  {row.status === "new" ? (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={pending}
                      onClick={() =>
                        run(() => updateTrialStatus(row.id, "contacted"))
                      }
                    >
                      Mark contacted
                    </Button>
                  ) : null}
                  {row.status !== "converted" && row.status !== "cancelled" ? (
                    <Button
                      type="button"
                      size="sm"
                      variant="primary"
                      disabled={pending}
                      onClick={() => run(() => convertTrialToMember(row.id))}
                    >
                      Convert
                    </Button>
                  ) : null}
                  {row.status !== "cancelled" && row.status !== "converted" ? (
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      disabled={pending}
                      onClick={() =>
                        run(() => updateTrialStatus(row.id, "cancelled"))
                      }
                    >
                      Cancel
                    </Button>
                  ) : null}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
