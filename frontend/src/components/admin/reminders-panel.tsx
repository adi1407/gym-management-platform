"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  REMINDER_TEMPLATES,
  fillReminderTemplate,
  type ReminderTemplateId,
} from "@/lib/reminders";
import { buildWhatsAppUrl } from "@/lib/gym";

export type ReminderTarget = {
  membershipId: string;
  memberName: string;
  phone: string;
  packageName: string;
  endsOn: string;
  status: string;
};

export function RemindersPanel({ targets }: { targets: ReminderTarget[] }) {
  const [templateId, setTemplateId] = useState<ReminderTemplateId>("renew");
  const [selectedId, setSelectedId] = useState<string | null>(
    targets[0]?.membershipId ?? null,
  );

  const selected = targets.find((t) => t.membershipId === selectedId) || targets[0];
  const template = REMINDER_TEMPLATES.find((t) => t.id === templateId)!;

  const message = useMemo(() => {
    if (!selected) return "";
    return fillReminderTemplate(template.body, {
      name: selected.memberName.split(" ")[0] || selected.memberName,
      package: selected.packageName,
      ends_on: selected.endsOn,
    });
  }, [selected, template]);

  const [draft, setDraft] = useState(message);

  useEffect(() => {
    setDraft(message);
  }, [message]);

  if (targets.length === 0) {
    return (
      <p className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 text-sm text-[var(--gray)]">
        No expired or ending-soon memberships. You’re clear for now.
      </p>
    );
  }

  const waUrl = selected ? buildWhatsAppUrl(selected.phone, draft) : "#";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="space-y-3">
        {targets.map((t) => (
          <button
            key={t.membershipId}
            type="button"
            onClick={() => setSelectedId(t.membershipId)}
            className={`w-full rounded-xl border p-4 text-left transition-colors ${
              selectedId === t.membershipId
                ? "border-[var(--orange)] bg-[var(--orange)]/10"
                : "border-[var(--border)] bg-[var(--surface)] hover:border-white/20"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium text-white">{t.memberName}</p>
              <Badge variant={t.status === "expired" ? "danger" : "warning"}>
                {t.status === "expired" ? "Expired" : "Ending soon"}
              </Badge>
            </div>
            <p className="mt-1 text-xs text-white/45">
              {t.packageName} · ends {t.endsOn} · {t.phone}
            </p>
          </button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>WhatsApp reminder</CardTitle>
          <CardDescription>
            Opens WhatsApp with a prefilled message. Edit before sending.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {REMINDER_TEMPLATES.map((t) => (
              <button key={t.id} type="button" onClick={() => setTemplateId(t.id)}>
                <Badge variant={templateId === t.id ? "default" : "secondary"}>
                  {t.label}
                </Badge>
              </button>
            ))}
          </div>
          <Textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={7} />
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-[var(--orange)] px-6 text-sm font-semibold tracking-wide text-black uppercase transition-colors hover:bg-[var(--orange-light)]"
          >
            Open WhatsApp
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
