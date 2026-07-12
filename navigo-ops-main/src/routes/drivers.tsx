import { createFileRoute } from "@tanstack/react-router";
import { Download, Plus, MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AuthGate } from "@/layouts/AuthGate";
import { AppLayout } from "@/layouts/AppLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, type Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { drivers, vehicles } from "@/mock/data";
import { formatDate, exportToCsv } from "@/utils/format";
import type { Driver } from "@/types";

export const Route = createFileRoute("/drivers")({
  ssr: false,
  head: () => ({ meta: [{ title: "Drivers — Beayrik" }] }),
  component: () => (<AuthGate><AppLayout><DriversPage /></AppLayout></AuthGate>),
});

const isExpired = (iso: string) => new Date(iso).getTime() < Date.now();

function DriversPage() {
  const columns: Column<Driver>[] = [
    { key: "name", header: "Driver", accessor: (d) => (
      <div className="flex items-center gap-2">
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
          {d.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
        </div>
        <div className="min-w-0">
          <div className="truncate font-medium">{d.name}</div>
          <div className="truncate text-xs text-muted-foreground">{d.phone}</div>
        </div>
      </div>
    ), sortValue: (d) => d.name },
    { key: "lic", header: "License", accessor: (d) => <span className="font-mono text-xs">{d.licenseNumber}</span> },
    { key: "cat", header: "Category", accessor: (d) => d.licenseCategory },
    { key: "exp", header: "Expiry", accessor: (d) => (
      <span className={isExpired(d.licenseExpiry) ? "text-destructive font-medium" : ""}>
        {formatDate(d.licenseExpiry)}
      </span>
    ), sortValue: (d) => d.licenseExpiry },
    { key: "score", header: "Safety Score", accessor: (d) => (
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
          <div
            className={d.safetyScore >= 85 ? "h-full bg-success" : d.safetyScore >= 70 ? "h-full bg-warning" : "h-full bg-destructive"}
            style={{ width: `${d.safetyScore}%` }}
          />
        </div>
        <span className="text-xs tabular-nums">{d.safetyScore}</span>
      </div>
    ), sortValue: (d) => d.safetyScore },
    { key: "status", header: "Status", accessor: (d) => <StatusBadge status={d.status} /> },
    { key: "veh", header: "Vehicle", accessor: (d) => vehicles.find((v) => v.id === d.assignedVehicleId)?.registrationNumber ?? "—" },
    { key: "actions", header: "", accessor: (d) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}><MoreHorizontal className="h-4 w-4" /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => toast.info(`Profile: ${d.name}`)}><Eye className="h-4 w-4" /> Profile</DropdownMenuItem>
          <DropdownMenuItem><Pencil className="h-4 w-4" /> Edit</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4" /> Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ) },
  ];

  return (
    <>
      <PageHeader
        title="Drivers"
        description="License compliance, safety scores, and current assignments."
        breadcrumbs={[{ label: "Operations" }, { label: "Drivers" }]}
        actions={
          <>
            <Button variant="outline" onClick={() => exportToCsv("drivers.csv", drivers)}><Download className="h-4 w-4" /> Export CSV</Button>
            <Button onClick={() => toast.info("Open driver form")}><Plus className="h-4 w-4" /> Add Driver</Button>
          </>
        }
      />
      <DataTable data={drivers} columns={columns} searchable={(d) => `${d.name} ${d.licenseNumber} ${d.phone}`} pageSize={8} />
    </>
  );
}
