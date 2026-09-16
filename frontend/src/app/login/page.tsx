import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Login",
  description: "Member login for Evolution Gym — portal coming soon.",
};

export default function LoginPage() {
  return (
    <PageHero
      eyebrow="Members"
      title={
        <>
          MEMBER
          <br />
          <span className="text-[var(--gold)]">PORTAL.</span>
        </>
      }
      description="Online booking and account tools are on the way. For now, reach the front desk or start a membership."
    >
      <div className="flex flex-wrap gap-3">
        <Button href="/contact" variant="primary" size="md">
          Contact Desk
        </Button>
        <Button href="/join" variant="outline" size="md">
          Join Now
        </Button>
      </div>
    </PageHero>
  );
}
