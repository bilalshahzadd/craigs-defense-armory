import {
  Activity,
  CheckCircle2,
  XCircle,
  MapPin,
  Clock,
  ShieldAlert,
} from "lucide-react";
import { getLoginEvents, getLoginStats } from "@/lib/queries";
import type { LoginEvent } from "@/lib/types";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

function deviceLabel(ua: string | null): string {
  if (!ua) return "Unknown device";
  const browser = /Edg\//.test(ua)
    ? "Edge"
    : /OPR\/|Opera/.test(ua)
      ? "Opera"
      : /Chrome\//.test(ua)
        ? "Chrome"
        : /Firefox\//.test(ua)
          ? "Firefox"
          : /Safari\//.test(ua)
            ? "Safari"
            : "Browser";
  const os = /Windows/.test(ua)
    ? "Windows"
    : /Mac OS X|Macintosh/.test(ua)
      ? "macOS"
      : /Android/.test(ua)
        ? "Android"
        : /iPhone|iPad|iOS/.test(ua)
          ? "iOS"
          : /Linux/.test(ua)
            ? "Linux"
            : "";
  return os ? `${browser} · ${os}` : browser;
}

function locationLabel(e: LoginEvent): string {
  const parts = [e.city, e.region, e.country].filter(Boolean);
  return parts.length ? parts.join(", ") : "Unknown / Local";
}

function when(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default async function ActivityPage() {
  const [events, stats] = await Promise.all([
    getLoginEvents(100),
    getLoginStats(),
  ]);

  const lastSuccess = events.find((e) => e.success);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="flex items-center gap-3 font-display text-3xl font-bold uppercase tracking-wide text-white">
          <Activity className="h-7 w-7 text-copper" />
          Recent Activity
        </h1>
        <p className="mt-1 text-sm text-muted">
          Sign-in history for the admin account — time, location and device.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="border border-white/10 bg-ink-800 p-5">
          <div className="flex items-center justify-between">
            <span className="font-display text-[11px] uppercase tracking-widest2 text-muted">
              Logins (30 days)
            </span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-white">
            {stats.last30d}
          </p>
        </div>
        <div className="border border-white/10 bg-ink-800 p-5">
          <div className="flex items-center justify-between">
            <span className="font-display text-[11px] uppercase tracking-widest2 text-muted">
              Failed Attempts
            </span>
            <ShieldAlert
              className={cn(
                "h-4 w-4",
                stats.failures > 0 ? "text-red-400" : "text-muted"
              )}
            />
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-white">
            {stats.failures}
          </p>
        </div>
        <div className="border border-white/10 bg-ink-800 p-5">
          <span className="font-display text-[11px] uppercase tracking-widest2 text-muted">
            Last Successful Login
          </span>
          {lastSuccess ? (
            <>
              <p className="mt-3 flex items-center gap-1.5 font-display text-sm text-white">
                <Clock className="h-3.5 w-3.5 text-copper" />
                {when(lastSuccess.createdAt)}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                <MapPin className="h-3.5 w-3.5 text-copper" />
                {locationLabel(lastSuccess)}
              </p>
            </>
          ) : (
            <p className="mt-3 text-sm text-muted">No logins recorded yet.</p>
          )}
        </div>
      </div>

      {/* Log */}
      <div className="overflow-x-auto border border-white/10 bg-ink-800">
        <table className="w-full min-w-[760px] text-left">
          <thead className="border-b border-white/10 bg-ink-700">
            <tr className="font-display text-[11px] uppercase tracking-widest2 text-muted">
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">When</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">IP Address</th>
              <th className="px-4 py-3">Device</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/8">
            {events.map((e) => (
              <tr key={e.id} className="hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  {e.success ? (
                    <span className="inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-widest text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" /> Success
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-widest text-red-400">
                      <XCircle className="h-4 w-4" /> Failed
                    </span>
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-white">
                  {when(e.createdAt)}
                </td>
                <td className="px-4 py-3 text-sm text-muted-light">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-copper" />
                    {locationLabel(e)}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted">
                  {e.ip ?? "—"}
                </td>
                <td className="px-4 py-3 text-sm text-muted-light">
                  {deviceLabel(e.userAgent)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {events.length === 0 && (
          <p className="px-5 py-10 text-center text-sm text-muted">
            No sign-in activity recorded yet. It will appear here after the next
            login.
          </p>
        )}
      </div>

      <p className="text-xs text-muted">
        Location is derived from the visitor&apos;s IP address via edge geo-data
        and is approximate. When testing locally it may show “Unknown / Local”.
      </p>
    </div>
  );
}
