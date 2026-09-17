export type ReminderTemplateId = "expiry" | "renew" | "welcome_back";

export const REMINDER_TEMPLATES: {
  id: ReminderTemplateId;
  label: string;
  body: string;
}[] = [
  {
    id: "expiry",
    label: "Membership expired",
    body: `Hi {name}, your Evolution Gym {package} membership ended on {ends_on}. Ready to get back on the floor? Reply here or visit us to renew — we'll hold your spot.`,
  },
  {
    id: "renew",
    label: "Renewal reminder",
    body: `Hi {name}, quick reminder from Evolution Gym — your {package} plan ends on {ends_on}. Renew this week to keep training without a break. Message us to lock it in.`,
  },
  {
    id: "welcome_back",
    label: "Welcome back",
    body: `Hi {name}, we miss you at Evolution Gym! Your {package} access ended on {ends_on}. Come in for a free check-in session — tap to reply and we'll schedule it.`,
  },
];

export function fillReminderTemplate(
  template: string,
  vars: { name: string; package: string; ends_on: string },
) {
  return template
    .replaceAll("{name}", vars.name)
    .replaceAll("{package}", vars.package)
    .replaceAll("{ends_on}", vars.ends_on);
}
