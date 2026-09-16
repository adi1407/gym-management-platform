"use client";

import StackSpread from "@/components/ui/stack-spread";
import { COMMUNITY_CARDS } from "@/data/home";

export function CommunitySection() {
  return (
    <section id="community" aria-label="Community at Evolution Gym">
      <StackSpread
        cards={COMMUNITY_CARDS}
        scrollLength={260}
        bgColor="#080808"
        textColor="#F5F5F0"
        stackScale={0.78}
        cardRadius={10}
        headline={
          <>
            MORE THAN
            <br />
            A GYM.
            <br />
            <span className="text-[var(--gold)]">A STANDARD.</span>
          </>
        }
        subtitle="Group sessions, shared goals, and people who hold the line — every set, every class, every week."
      />
    </section>
  );
}
