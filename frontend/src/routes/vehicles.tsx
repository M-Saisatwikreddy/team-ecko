import { createFileRoute } from "@tanstack/react-router";
import { Download, Plus, Pencil, Trash2, Eye, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import { AuthGate } from "@/layouts/AuthGate";
import { AppLayout } from "@/layouts/AppLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, type Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { vehicles } from "@/mock/data";
import { formatDate, formatINR, formatNumber, exportToCsv } from "@/utils/format";
import type { Vehicle } from "@/types";
import { VehicleForm } from "@/components/forms/VehicleForm";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/vehicles")({
  ssr: false,
  head: () => ({ meta: [{ title: "Vehicle Registry — TransitOps" }] }),
  component: () => (<AuthGate><AppLayout><VehiclesPage /></AppLayout></AuthGate>),
});

function VehiclesPage() {
  const [open, setOpen] = useState(false);
  const [rows] = useState<Vehicle[]>(vehicles);

  const columns: Column<Vehicle>[] = [
    { key: "reg", header: "Registration No.", accessor: (v) => <span className="font-mono text-xs font-semibold">{v.registrationNumber}</span>, sortValue: (v) => v.registrationNumber },
    { key: "name", header: "Vehicle", accessor: (v) => <div><div className="font-medium">{v.name}</div><div className="text-xs text-muted-foreground">{v.type}</div></div>, sortValue: (v) => v.name },
    { key: "cap", header: "Capacity", accessor: (v) => `${formatNumber(v.capacityKg)} kg`, sortValue: (v) => v.capacityKg },
    { key: "odo", header: "Odometer", accessor: (v) => `${formatNumber(v.odometer)} km`, sortValue: (v) => v.odometer },
    { key: "cost", header: "Acquisition", accessor: (v) => formatINR(v.acquisitionCost), sortValue: (v) => v.acquisitionCost },
    { key: "status", header: "Status", accessor: (v) => <StatusBadge status={v.status} /> },
    { key: "svc", header: "Last Service", accessor: (v) => formatDate(v.lastService), sortValue: (v) => v.lastService },
    { key: "actions", header: "", accessor: (v) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}><MoreHorizontal className="h-4 w-4" /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => toast.info(`View ${v.registrationNumber}`)}><Eye className="h-4 w-4" /> View Details</DropdownMenuItem>
          <DropdownMenuItem onClick={() => toast.info(`Edit ${v.registrationNumber}`)}><Pencil className="h-4 w-4" /> Edit</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive" onClick={() => toast.error(`Delete ${v.registrationNumber} (demo)`)}><Trash2 className="h-4 w-4" /> Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ) },
  ];

  return (
    <>
      <PageHeader
        title="Vehicle Registry"
        description="Manage the fleet — registrations, capacity, cost, and service status."
        breadcrumbs={[{ label: "Operations" }, { label: "Vehicle Registry" }]}
        actions={
          <>
            <Button variant="outline" onClick={() => exportToCsv("vehicles.csv", rows)}>
              <Download className="h-4 w-4" /> Export CSV
            </Button>
            <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Add Vehicle</Button>
          </>
        }
      />

      <DataTable
        data={rows}
        columns={columns}
        searchable={(v) => `${v.registrationNumber} ${v.name} ${v.type} ${v.status}`}
        pageSize={8}
        onRowClick={(v) => toast.info(`Selected ${v.registrationNumber}`)}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Register Vehicle</DialogTitle>
          </DialogHeader>
          <VehicleForm existingReg={rows.map((r) => r.registrationNumber)} onSubmit={() => { toast.success("Vehicle registered"); setOpen(false); }} />
        </DialogContent>
      </Dialog>
    </>
  );
}
