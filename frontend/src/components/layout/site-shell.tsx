import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <SiteHeader />
      <div className="min-w-0">{children}</div>
      <SiteFooter />
    </>
  );
}
