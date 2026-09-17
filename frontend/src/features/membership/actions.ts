"use server";

import { createClient } from "@/lib/supabase/server";
import { getTrialDateBounds, isTrialDateAllowed, TRIAL_TIME_SLOTS } from "@/lib/gym";
import { revalidatePath } from "next/cache";

export type ActionResult =
  | { ok: true; id?: string }
  | { ok: false; error: string };

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function createTrialBooking(input: {
  packageSlug: string;
  visitDate: string;
  visitTime: string;
  fullName: string;
  email: string;
  phone: string;
}): Promise<ActionResult> {
  const fullName = input.fullName.trim();
  const email = input.email.trim().toLowerCase();
  const phone = input.phone.trim();
  const visitDate = input.visitDate;
  const visitTime = input.visitTime;
  const packageSlug = input.packageSlug;

  if (!fullName || fullName.length < 2) {
    return { ok: false, error: "Please enter your full name." };
  }
  if (!isValidEmail(email)) {
    return { ok: false, error: "Please enter a valid email." };
  }
  if (phone.replace(/\D/g, "").length < 10) {
    return { ok: false, error: "Please enter a valid mobile number." };
  }
  if (!TRIAL_TIME_SLOTS.some((s) => s.id === visitTime)) {
    return { ok: false, error: "Please select a valid time slot." };
  }

  const visit = new Date(`${visitDate}T12:00:00`);
  if (Number.isNaN(visit.getTime()) || !isTrialDateAllowed(visit)) {
    const { from, to } = getTrialDateBounds();
    return {
      ok: false,
      error: `Visit date must be between ${from.toLocaleDateString()} and ${to.toLocaleDateString()}.`,
    };
  }

  const supabase = await createClient();

  const { data: pkg, error: pkgError } = await supabase
    .from("packages")
    .select("id")
    .eq("slug", packageSlug)
    .eq("active", true)
    .maybeSingle();

  if (pkgError || !pkg) {
    return { ok: false, error: "Selected package is unavailable." };
  }

  const { data, error } = await supabase
    .from("trial_bookings")
    .insert({
      package_id: pkg.id,
      visit_date: visitDate,
      visit_time: visitTime,
      full_name: fullName,
      email,
      phone,
      status: "new",
    })
    .select("id")
    .single();

  if (error) {
    console.error(error);
    return {
      ok: false,
      error:
        "Could not save your booking. Check Supabase setup, or try again shortly.",
    };
  }

  revalidatePath("/admin/trials");
  revalidatePath("/admin");
  return { ok: true, id: data.id };
}
