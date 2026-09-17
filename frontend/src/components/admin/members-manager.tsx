"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { upsertMember } from "@/features/admin/actions";
import type { Member, Package } from "@/types/database";
import { addDaysISO } from "@/lib/gym";

type MemberRow = Member & {
  memberships: {
    id: string;
    ends_on: string;
    status: string;
    packages: { name: string } | null;
  }[];
};

export function MembersManager({
  members,
  packages,
}: {
  members: MemberRow[];
  packages: Package[];
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [editing, setEditing] = useState<Member | null>(null);

  function openCreate() {
    setEditing(null);
    setOpen(true);
  }

  function openEdit(m: Member) {
    setEditing(m);
    setOpen(true);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="primary" onClick={openCreate}>
              Add member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit member" : "New member"}</DialogTitle>
              <DialogDescription>
                Manage account details and optionally attach a membership.
              </DialogDescription>
            </DialogHeader>
            <form
              className="space-y-3"
              action={(fd) => {
                startTransition(async () => {
                  const packageId = String(fd.get("packageId") || "");
                  const startsOn = String(fd.get("startsOn") || "");
                  let endsOn = String(fd.get("endsOn") || "");
                  if (packageId && startsOn && !endsOn) {
                    const pkg = packages.find((p) => p.id === packageId);
                    endsOn = addDaysISO(startsOn, pkg?.duration_days ?? 30);
                  }
                  const result = await upsertMember({
                    id: editing?.id,
                    fullName: String(fd.get("fullName") || ""),
                    email: String(fd.get("email") || ""),
                    phone: String(fd.get("phone") || ""),
                    notes: String(fd.get("notes") || ""),
                    status: (String(fd.get("status") || "active") as
                      | "active"
                      | "inactive"),
                    packageId: packageId || undefined,
                    startsOn: packageId ? startsOn : undefined,
                    endsOn: packageId ? endsOn : undefined,
                  });
                  if (!result.ok) toast.error(result.error);
                  else {
                    toast.success(editing ? "Member updated" : "Member created");
                    setOpen(false);
                  }
                });
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  required
                  defaultValue={editing?.full_name}
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    defaultValue={editing?.email}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    required
                    defaultValue={editing?.phone}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  defaultValue={editing?.status || "active"}
                  className="flex h-10 w-full rounded-md border border-[var(--border)] bg-black/40 px-3 text-sm text-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" name="notes" defaultValue={editing?.notes || ""} />
              </div>
              <div className="rounded-lg border border-white/10 p-3 space-y-3">
                <p className="text-xs font-semibold tracking-[0.14em] text-white/45 uppercase">
                  Attach membership (optional)
                </p>
                <select
                  name="packageId"
                  defaultValue=""
                  className="flex h-10 w-full rounded-md border border-[var(--border)] bg-black/40 px-3 text-sm text-white"
                >
                  <option value="">No change / skip</option>
                  {packages.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.price_label})
                    </option>
                  ))}
                </select>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="startsOn">Starts</Label>
                    <Input
                      id="startsOn"
                      name="startsOn"
                      type="date"
                      defaultValue={new Date().toISOString().slice(0, 10)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endsOn">Ends (auto if empty)</Label>
                    <Input id="endsOn" name="endsOn" type="date" />
                  </div>
                </div>
              </div>
              <Button type="submit" variant="primary" className="w-full" disabled={pending}>
                {pending ? "Saving…" : "Save member"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((m) => {
              const active = m.memberships?.find((x) => x.status === "active");
              return (
                <TableRow key={m.id}>
                  <TableCell>
                    <p className="font-medium">{m.full_name}</p>
                    <p className="text-xs text-white/45">{m.email}</p>
                    <p className="text-xs text-white/45">{m.phone}</p>
                  </TableCell>
                  <TableCell>
                    {active ? (
                      <>
                        <p>{active.packages?.name ?? "Plan"}</p>
                        <p className="text-xs text-white/45">
                          Ends {active.ends_on}
                        </p>
                      </>
                    ) : (
                      <span className="text-white/40">No active plan</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={m.status === "active" ? "success" : "secondary"}>
                      {m.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button type="button" size="sm" variant="outline" onClick={() => openEdit(m)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {members.length === 0 ? (
          <p className="p-8 text-sm text-[var(--gray)]">No members yet.</p>
        ) : null}
      </div>
    </div>
  );
}
