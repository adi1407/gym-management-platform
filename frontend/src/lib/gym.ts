import { addMonths, endOfMonth, format, isBefore, startOfDay, startOfMonth } from "date-fns";

export const TRIAL_TIME_SLOTS = [
  { id: "06:00-10:00", label: "Morning · 6:00 AM – 10:00 AM" },
  { id: "10:00-13:00", label: "Midday · 10:00 AM – 1:00 PM" },
  { id: "16:00-20:00", label: "Evening · 4:00 PM – 8:00 PM" },
] as const;

/** Allowed trial dates: today through end of next calendar month */
export function getTrialDateBounds(now = new Date()) {
  const from = startOfDay(now);
  const to = endOfMonth(addMonths(startOfMonth(now), 1));
  return { from, to };
}

export function isTrialDateAllowed(date: Date, now = new Date()) {
  const { from, to } = getTrialDateBounds(now);
  if (isBefore(date, from)) return false;
  return !isBefore(to, startOfDay(date));
}

export function formatDateISO(date: Date) {
  return format(date, "yyyy-MM-dd");
}

export function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

/** Build wa.me URL; assume India (+91) for 10-digit local numbers */
export function buildWhatsAppUrl(phone: string, message: string) {
  let digits = normalizePhone(phone);
  if (digits.length === 10) digits = `91${digits}`;
  if (digits.startsWith("0") && digits.length === 11) {
    digits = `91${digits.slice(1)}`;
  }
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function addDaysISO(isoDate: string, days: number) {
  const d = new Date(`${isoDate}T12:00:00`);
  d.setDate(d.getDate() + days);
  return format(d, "yyyy-MM-dd");
}
