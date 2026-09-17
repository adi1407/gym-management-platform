"use server";

import { createClient } from "@/lib/supabase/server";
import { addDaysISO } from "@/lib/gym";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type AdminActionResult =
  | { ok: true }
  | { ok: false; error: string };

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { supabase, user: null as null, isAdmin: false };

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  return { supabase, user, isAdmin: Boolean(profile) };
}

export async function adminLogin(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/admin");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { ok: false as const, error: error.message };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false as const, error: "Login failed." };

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!profile) {
    await supabase.auth.signOut();
    return {
      ok: false as const,
      error: "This account is not an admin. Add it to admin_profiles in Supabase.",
    };
  }

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function adminLogout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function updateTrialStatus(
  id: string,
  status: "new" | "contacted" | "converted" | "cancelled",
): Promise<AdminActionResult> {
  const { supabase, isAdmin } = await requireAdmin();
  if (!isAdmin) return { ok: false, error: "Unauthorized" };

  const { error } = await supabase
    .from("trial_bookings")
    .update({ status })
    .eq("id", id);

  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/trials");
  revalidatePath("/admin");
  return { ok: true };
}

export async function convertTrialToMember(
  trialId: string,
): Promise<AdminActionResult> {
  const { supabase, isAdmin } = await requireAdmin();
  if (!isAdmin) return { ok: false, error: "Unauthorized" };

  const { data: trial, error: trialError } = await supabase
    .from("trial_bookings")
    .select("*")
    .eq("id", trialId)
    .single();

  if (trialError || !trial) {
    return { ok: false, error: trialError?.message || "Trial not found" };
  }

  const { data: pkg } = await supabase
    .from("packages")
    .select("duration_days")
    .eq("id", trial.package_id)
    .maybeSingle();

  const duration = pkg?.duration_days ?? 30;
  const startsOn = new Date().toISOString().slice(0, 10);
  const endsOn = addDaysISO(startsOn, duration);

  const { data: member, error: memberError } = await supabase
    .from("members")
    .insert({
      full_name: trial.full_name,
      email: trial.email,
      phone: trial.phone,
      status: "active",
      notes: `Converted from trial ${trialId}`,
    })
    .select("id")
    .single();

  if (memberError || !member) {
    return { ok: false, error: memberError?.message || "Could not create member" };
  }

  const { error: memError } = await supabase.from("memberships").insert({
    member_id: member.id,
    package_id: trial.package_id,
    starts_on: startsOn,
    ends_on: endsOn,
    status: "active",
  });

  if (memError) return { ok: false, error: memError.message };

  await supabase
    .from("trial_bookings")
    .update({ status: "converted" })
    .eq("id", trialId);

  revalidatePath("/admin/trials");
  revalidatePath("/admin/members");
  revalidatePath("/admin/memberships");
  revalidatePath("/admin");
  return { ok: true };
}

export async function upsertMember(input: {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  notes?: string;
  status?: "active" | "inactive";
  packageId?: string;
  startsOn?: string;
  endsOn?: string;
}): Promise<AdminActionResult> {
  const { supabase, isAdmin } = await requireAdmin();
  if (!isAdmin) return { ok: false, error: "Unauthorized" };

  const payload = {
    full_name: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    notes: input.notes?.trim() || null,
    status: input.status ?? "active",
    updated_at: new Date().toISOString(),
  };

  let memberId = input.id;

  if (memberId) {
    const { error } = await supabase
      .from("members")
      .update(payload)
      .eq("id", memberId);
    if (error) return { ok: false, error: error.message };
  } else {
    const { data, error } = await supabase
      .from("members")
      .insert(payload)
      .select("id")
      .single();
    if (error || !data) return { ok: false, error: error?.message || "Create failed" };
    memberId = data.id;
  }

  if (input.packageId && input.startsOn && input.endsOn && memberId) {
    await supabase
      .from("memberships")
      .update({ status: "cancelled" })
      .eq("member_id", memberId)
      .eq("status", "active");

    const { error: mErr } = await supabase.from("memberships").insert({
      member_id: memberId,
      package_id: input.packageId,
      starts_on: input.startsOn,
      ends_on: input.endsOn,
      status: "active",
    });
    if (mErr) return { ok: false, error: mErr.message };
  }

  revalidatePath("/admin/members");
  revalidatePath("/admin/memberships");
  revalidatePath("/admin");
  return { ok: true };
}

export async function syncExpiredMemberships() {
  const { supabase, isAdmin } = await requireAdmin();
  if (!isAdmin) return;

  await supabase.rpc("sync_membership_status");
  revalidatePath("/admin/memberships");
  revalidatePath("/admin/reminders");
  revalidatePath("/admin");
}
