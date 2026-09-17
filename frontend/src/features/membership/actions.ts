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

function mapBookingError(message: string | undefined, code?: string) {
  const msg = message || "";
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    msg.includes("JWT") ||
    code === "PGRST301"
  ) {
    return "Supabase env vars missing on the server. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, then redeploy.";
  }
  if (msg.includes("PACKAGE_NOT_FOUND")) {
    return "Selected package is unavailable. Run the packages seed SQL in Supabase.";
  }
  if (msg.includes("permission denied") || code === "42501") {
    return "Supabase permissions missing. Run frontend/supabase/fix-trial-booking.sql in the SQL Editor.";
  }
  if (msg.includes("Could not find the function") || code === "PGRST202") {
    return "Booking function missing. Run frontend/supabase/fix-trial-booking.sql in Supabase SQL Editor.";
  }
  // Surface short PostgREST hint so live debugging is possible
  if (msg) return `Booking failed: ${msg}`;
  return "Could not save your booking. Check Supabase setup, or try again shortly.";
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

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return {
      ok: false,
      error:
        "Supabase env vars missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY on Vercel, then redeploy.",
    };
  }

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

  // Prefer SECURITY DEFINER RPC (works even when table INSERT grants/RLS are incomplete)
  const { data: bookingId, error: rpcError } = await supabase.rpc("book_trial_visit", {
    p_package_slug: packageSlug,
    p_visit_date: visitDate,
    p_visit_time: visitTime,
    p_full_name: fullName,
    p_email: email,
    p_phone: phone,
  });

  if (!rpcError && bookingId) {
    revalidatePath("/admin/trials");
    revalidatePath("/admin");
    return { ok: true, id: bookingId };
  }

  // Fallback: direct insert (for DBs that only have table policies, not the RPC yet)
  if (rpcError && (rpcError.code === "PGRST202" || rpcError.message?.includes("Could not find the function"))) {
    const { data: pkg, error: pkgError } = await supabase
      .from("packages")
      .select("id")
      .eq("slug", packageSlug)
      .eq("active", true)
      .maybeSingle();

    if (pkgError || !pkg) {
      return {
        ok: false,
        error: mapBookingError(
          pkgError?.message || "PACKAGE_NOT_FOUND",
          pkgError?.code,
        ),
      };
    }

    const { error } = await supabase.from("trial_bookings").insert({
      package_id: pkg.id,
      visit_date: visitDate,
      visit_time: visitTime,
      full_name: fullName,
      email,
      phone,
      status: "new",
    });

    if (error) {
      console.error("createTrialBooking insert", error);
      return { ok: false, error: mapBookingError(error.message, error.code) };
    }

    revalidatePath("/admin/trials");
    revalidatePath("/admin");
    return { ok: true };
  }

  console.error("createTrialBooking rpc", rpcError);
  return {
    ok: false,
    error: mapBookingError(rpcError?.message, rpcError?.code),
  };
}
