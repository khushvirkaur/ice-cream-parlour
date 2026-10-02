import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin-panel")({
  beforeLoad: () => {
    throw redirect({ to: "/admin" });
  },
});
