"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createTrialBooking } from "@/features/membership/actions";
import {
  formatDateISO,
  getTrialDateBounds,
  isTrialDateAllowed,
  TRIAL_TIME_SLOTS,
} from "@/lib/gym";
import { cn } from "@/lib/utils";
import type { Package } from "@/types/database";

type Step = "package" | "datetime" | "details" | "done";

type Props = {
  packages: Package[];
  initialSlug?: string;
};

export function TrialBookingWizard({ packages, initialSlug }: Props) {
  const bounds = useMemo(() => getTrialDateBounds(), []);
  const [step, setStep] = useState<Step>(initialSlug ? "datetime" : "package");
  const [packageSlug, setPackageSlug] = useState(
    initialSlug && packages.some((p) => p.slug === initialSlug)
      ? initialSlug
      : packages.find((p) => p.featured)?.slug || packages[0]?.slug || "",
  );
  const [visitDate, setVisitDate] = useState<Date | undefined>();
  const [visitTime, setVisitTime] = useState<string>("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pending, startTransition] = useTransition();

  const selectedPackage = packages.find((p) => p.slug === packageSlug);

  function submit() {
    if (!visitDate || !visitTime || !packageSlug) return;
    startTransition(async () => {
      const result = await createTrialBooking({
        packageSlug,
        visitDate: formatDateISO(visitDate),
        visitTime,
        fullName,
        email,
        phone,
      });
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      setStep("done");
      toast.success("Free visit booked — we’ll confirm on WhatsApp/email.");
    });
  }

  if (step === "done") {
    return (
      <Card className="mx-auto max-w-xl border-[var(--orange)]/30">
        <CardHeader>
          <Badge className="w-fit">Booked</Badge>
          <CardTitle>You’re on the list</CardTitle>
          <CardDescription>
            Free 1-day visit for{" "}
            <span className="text-[var(--orange-light)]">
              {selectedPackage?.name}
            </span>{" "}
            on {visitDate ? formatDateISO(visitDate) : ""} · {visitTime}. Our
            team will reach out shortly.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button href="/" variant="primary">
            Back home
          </Button>
          <Button href="/memberships" variant="outline">
            View memberships
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap gap-2">
        {(["package", "datetime", "details"] as Step[]).map((s, i) => (
          <Badge
            key={s}
            variant={step === s ? "default" : "secondary"}
            className="cursor-default"
          >
            {i + 1}. {s === "package" ? "Package" : s === "datetime" ? "Date & time" : "Your details"}
          </Badge>
        ))}
      </div>

      {step === "package" && (
        <div className="grid gap-4 md:grid-cols-3">
          {packages.map((pkg) => (
            <button
              key={pkg.id}
              type="button"
              onClick={() => setPackageSlug(pkg.slug)}
              className={cn(
                "rounded-xl border p-5 text-left transition-colors",
                packageSlug === pkg.slug
                  ? "border-[var(--orange)] bg-[var(--orange)]/10"
                  : "border-[var(--border)] bg-[var(--surface)] hover:border-white/25",
              )}
            >
              {pkg.featured ? (
                <Badge className="mb-3">Most popular</Badge>
              ) : (
                <span className="mb-3 block h-5" />
              )}
              <p className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-white">
                {pkg.name}
              </p>
              <p className="mt-2 text-3xl text-[var(--orange)]">
                {pkg.price_label}
                <span className="text-sm text-white/45">{pkg.period_label}</span>
              </p>
            </button>
          ))}
          <div className="md:col-span-3">
            <Button
              type="button"
              variant="primary"
              disabled={!packageSlug}
              onClick={() => setStep("datetime")}
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === "datetime" && (
        <Card>
          <CardHeader>
            <CardTitle>Pick your free visit</CardTitle>
            <CardDescription>
              Current + next month only · {selectedPackage?.name} interest
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-8 lg:grid-cols-[auto_1fr]">
            <Calendar
              mode="single"
              selected={visitDate}
              onSelect={setVisitDate}
              disabled={(date) => !isTrialDateAllowed(date)}
              startMonth={bounds.from}
              endMonth={bounds.to}
              required
            />
            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-[0.14em] text-white/45 uppercase">
                Time slot
              </p>
              {TRIAL_TIME_SLOTS.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setVisitTime(slot.id)}
                  className={cn(
                    "w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                    visitTime === slot.id
                      ? "border-[var(--orange)] bg-[var(--orange)]/15 text-white"
                      : "border-white/10 text-white/70 hover:border-white/25",
                  )}
                >
                  {slot.label}
                </button>
              ))}
              <div className="flex flex-wrap gap-3 pt-4">
                <Button type="button" variant="ghost" onClick={() => setStep("package")}>
                  Back
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  disabled={!visitDate || !visitTime}
                  onClick={() => setStep("details")}
                >
                  Continue
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "details" && (
        <Card>
          <CardHeader>
            <CardTitle>How do we reach you?</CardTitle>
            <CardDescription>
              {selectedPackage?.name} ·{" "}
              {visitDate ? formatDateISO(visitDate) : ""} · {visitTime}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button type="button" variant="ghost" onClick={() => setStep("datetime")}>
                Back
              </Button>
              <Button
                type="button"
                variant="primary"
                disabled={pending || !fullName || !email || !phone}
                onClick={submit}
              >
                {pending ? "Submitting…" : "Book free visit"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
