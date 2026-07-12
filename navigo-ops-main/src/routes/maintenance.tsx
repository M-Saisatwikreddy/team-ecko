import { createFileRoute } from "@tanstack/react-router";
import { Plus, Download } from "lucide-react";
import { toast } from "sonner";
import { AuthGate } from "@/layouts/AuthGate";
import { AppLayout } from "@/layouts/AppLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, type Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { maintenance, vehicles } from "@/mock/data";
import { formatDate, formatINR, exportToCsv } from "@/utils/format";
import type { Maintenance } from "@/types";

export const Route = createFileRoute("/maintenance")({
  ssr: false,
  head: () => ({ meta: [{ title: "Maintenance — Beayrik" }] }),
  component: () => (<AuthGate><AppLayout><MaintenancePage /></AppLayout></AuthGate>),
});

const STAGES = ["Open", "Assigned", "In Progress", "Completed", "Closed"] as const;

function MaintenancePage() {
  const columns: Column<Maintenance>[] = [
    { key: "id", header: "Ticket", accessor: (m) => <span className="font-mono text-xs">MT-{m.id.slice(1).padStart(4, "0")}</span> },
    { key: "veh", header: "Vehicle", accessor: (m) => vehicles.find((v) => v.id === m.vehicleId)?.registrationNumber ?? "—" },
    { key: "issue", header: "Issue", accessor: (m) => m.issue },
    { key: "prio", header: "Priority", accessor: (m) => <StatusBadge status={m.priority} /> },
    { key: "tech", header: "Technician", accessor: (m) => m.technician },
    { key: "cost", header: "Cost", accessor: (m) => formatINR(m.cost), sortValue: (m) => m.cost },
    { key: "date", header: "Created", accessor: (m) => formatDate(m.createdAt), sortValue: (m) => m.createdAt },
    { key: "status", header: "Status", accessor: (m) => <StatusBadge status={m.status} /> },
  ];

  return (
    <>
      <PageHeader
        title="Maintenance"
        description="Workshop workflow: from open ticket to closure."
        breadcrumbs={[{ label: "Operations" }, { label: "Maintenance" }]}
        actions={
          <>
            <Button variant="outline" onClick={() => exportToCsv("maintenance.csv", maintenance)}><Download className="h-4 w-4" /> Export</Button>
            <Button onClick={() => toast.info("Open maintenance form")}><Plus className="h-4 w-4" /> New Ticket</Button>
          </>
        }
      />

      <div className="mb-6 rounded-xl border border-border bg-card p-4">
        <h3 className="mb-3 text-sm font-semibold">Workflow</h3>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {STAGES.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">{i + 1}</span>
                {s}
              </div>
              {i < STAGES.length - 1 && <span className="text-muted-foreground">→</span>}
            </div>
          ))}
        </div>
      </div>

      <DataTable data={maintenance} columns={columns} searchable={(m) => `${m.issue} ${m.technician} ${m.status}`} pageSize={10} />
    </>
  );
}
