"use client";

import { Check, Minus } from "lucide-react";
import { MEMBERSHIP_COMPARE_ROWS } from "@/data/memberships";
import { cn } from "@/lib/utils";

function Cell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <span className="inline-flex justify-center text-[var(--orange)]">
        <Check className="size-4" aria-label="Included" />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex justify-center text-white/25">
        <Minus className="size-4" aria-label="Not included" />
      </span>
    );
  }
  return (
    <span className="text-xs font-medium text-white/80 sm:text-sm">{value}</span>
  );
}

export function MembershipCompare() {
  return (
    <section
      id="compare"
      className="scroll-mt-28 border-b border-[var(--border)] bg-[var(--black)] px-[var(--page-pad-x)] py-[var(--section-gap)]"
      aria-labelledby="compare-heading"
    >
      <div className="container-page mx-auto">
        <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-12">
          <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-[var(--orange)] uppercase">
            Compare
          </p>
          <h2
            id="compare-heading"
            className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] leading-[0.92] tracking-wide text-white"
          >
            SIDE BY SIDE.
          </h2>
          <p className="mt-3 text-sm text-[var(--gray)]">
            Scroll horizontally on small screens — every perk, every plan.
          </p>
        </div>

        <div className="-mx-1 overflow-x-auto pb-2">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="sticky left-0 z-10 bg-[var(--black)] py-4 pr-4 text-xs font-semibold tracking-[0.16em] text-white/40 uppercase">
                  Feature
                </th>
                {(["Monthly", "Quarterly", "Yearly"] as const).map((label) => (
                  <th
                    key={label}
                    className={cn(
                      "px-3 py-4 text-center font-[family-name:var(--font-display)] text-lg tracking-wide text-white sm:text-xl",
                      label === "Quarterly" && "text-[var(--orange)]",
                    )}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MEMBERSHIP_COMPARE_ROWS.map((row, i) => (
                <tr
                  key={row.feature}
                  className={cn(
                    "border-b border-white/5",
                    i % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent",
                  )}
                >
                  <th
                    scope="row"
                    className={cn(
                      "sticky left-0 z-10 py-3.5 pr-4 text-sm font-medium text-white/75",
                      i % 2 === 0 ? "bg-[#0a0a0a]" : "bg-[var(--black)]",
                    )}
                  >
                    <span className="block max-w-[10rem] sm:max-w-none">
                      {row.feature}
                    </span>
                  </th>
                  <td className="px-3 py-3.5 text-center">
                    <Cell value={row.monthly} />
                  </td>
                  <td className="bg-[var(--orange)]/[0.04] px-3 py-3.5 text-center">
                    <Cell value={row.quarterly} />
                  </td>
                  <td className="px-3 py-3.5 text-center">
                    <Cell value={row.yearly} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
