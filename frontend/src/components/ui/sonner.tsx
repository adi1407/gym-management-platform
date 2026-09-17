"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      theme="dark"
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "border border-[var(--border)] bg-[var(--card)] text-white shadow-xl",
        },
      }}
    />
  );
}
