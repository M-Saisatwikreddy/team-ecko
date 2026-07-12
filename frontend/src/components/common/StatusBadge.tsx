import { cn } from "@/lib/utils";

type Tone = "success" | "info" | "warning" | "danger" | "muted";

const TONES: Record<Tone, string> = {
  success: "bg-success/10 text-success border-success/20",
  info: "bg-info/10 text-info border-info/20",
  warning: "bg-warning/15 text-warning-foreground border-warning/30 dark:text-warning",
  danger: "bg-destructive/10 text-destructive border-destructive/20",
  muted: "bg-muted text-muted-foreground border-border",
};

const MAP: Record<string, Tone> = {
  Available: "success",
  "On Trip": "info",
  "In Shop": "warning",
  Retired: "muted",
  Draft: "muted",
  Dispatched: "info",
  Completed: "success",
  Cancelled: "danger",
  Open: "warning",
  Assigned: "info",
  "In Progress": "info",
  Closed: "muted",
  "Off Duty": "muted",
  Suspended: "danger",
  Low: "muted",
  Medium: "info",
  High: "warning",
  Critical: "danger",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const tone = MAP[status] ?? "muted";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        TONES[tone],
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", {
        "bg-success": tone === "success",
        "bg-info": tone === "info",
        "bg-warning": tone === "warning",
        "bg-destructive": tone === "danger",
        "bg-muted-foreground": tone === "muted",
      })} />
      {status}
    </span>
  );
}
