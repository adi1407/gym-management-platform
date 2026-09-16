import type { Metadata, Viewport } from "next";
import { fontBody, fontDisplay } from "@/config/fonts";
import { SiteShell } from "@/components/layout/site-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Evolution Gym",
    template: "%s | Evolution Gym",
  },
  description: "Evolution Gym — train harder, evolve stronger.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ff5c1a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${fontDisplay.variable} ${fontBody.variable} antialiased`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
