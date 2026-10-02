import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { checkAdminAuth } from "@/lib/analytics";

const title = "Admin Portal | Delicious Scoops Management";
const description =
  "Secure management dashboard for Delicious Scoops. Telemetry, live orders received, and WhatsApp analytics.";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminRouteComponent,
});

function AdminRouteComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);

  useEffect(() => {
    setIsAuthenticated(checkAdminAuth());
    setIsChecking(false);
  }, []);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#18110F] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-[#D8436B] border-t-transparent animate-spin" />
          <p className="text-xs font-mono text-[#A6928B]">Verifying secure session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onSuccess={() => setIsAuthenticated(true)} />;
  }

  return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />;
}
