import { Suspense } from "react";
import AdminLoginForm from "./login-form";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-4">
      <Suspense fallback={<p className="text-white/50">Loading…</p>}>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
