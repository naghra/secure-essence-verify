import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <Link
        to="/verify-prod"
        className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-6 py-3 text-sm uppercase tracking-[0.3em] text-emerald-300 transition hover:bg-emerald-400/20"
      >
        Open /verify-prod
      </Link>
    </div>
  );
}
