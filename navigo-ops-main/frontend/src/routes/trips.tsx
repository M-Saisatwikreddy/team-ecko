import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Download, Send } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { AuthGate } from "@/layouts/AuthGate";
import { AppLayout } from "@/layouts/AppLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, type Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { drivers, trips, vehicles } from "@/mock/data";
import { formatDate, formatINR, formatNumber, exportToCsv } from "@/utils/format";
import type { Trip, TripStatus } from "@/types";

export const Route = createFileRoute("/trips")({
  ssr: false,
  head: () => ({ meta: [{ title: "Trips — TransitOps" }] }),
  component: () => (<AuthGate><AppLayout><TripsPage /></AppLayout></AuthGate>),
});

const tripSchema = z.object({
  source: z.string().min(2, "Required"),
  destination: z.string().min(2, "Required"),
  vehicleId: z.string().min(1, "Select a vehicle"),
  driverId: z.string().min(1, "Select a driver"),
  cargoWeightKg: z.coerce.number().positive("Must be > 0"),
  distanceKm: z.coerce.number().positive(),
  estimatedRevenue: z.coerce.number().min(0),
});
type TripValues = z.infer<typeof tripSchema>;

function TripsPage() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<TripStatus | "All">("All");

  const filtered = useMemo(
    () => tab === "All" ? trips : trips.filter((t) => t.status === tab),
    [tab],
  );

  const columns: Column<Trip>[] = [
    { key: "id", header: "Trip #", accessor: (t) => <span className="font-mono text-xs">TR-{t.id.slice(1).padStart(4, "0")}</span> },
    { key: "route", header: "Route", accessor: (t) => <span className="font-medium">{t.source} → {t.destination}</span> },
    { key: "veh", header: "Vehicle", accessor: (t) => vehicles.find((v) => v.id === t.vehicleId)?.registrationNumber ?? "—" },
    { key: "drv", header: "Driver", accessor: (t) => drivers.find((d) => d.id === t.driverId)?.name ?? "—" },
    { key: "cargo", header: "Cargo", accessor: (t) => `${formatNumber(t.cargoWeightKg)} kg`, sortValue: (t) => t.cargoWeightKg },
    { key: "dist", header: "Distance", accessor: (t) => `${t.distanceKm} km`, sortValue: (t) => t.distanceKm },
    { key: "rev", header: "Est. Revenue", accessor: (t) => formatINR(t.estimatedRevenue), sortValue: (t) => t.estimatedRevenue },
    { key: "date", header: "Created", accessor: (t) => formatDate(t.createdAt), sortValue: (t) => t.createdAt },
    { key: "status", header: "Status", accessor: (t) => <StatusBadge status={t.status} /> },
  ];

  return (
    <>
      <PageHeader
        title="Trips"
        description="Plan, dispatch, and close-out shipments across the fleet."
        breadcrumbs={[{ label: "Operations" }, { label: "Trips" }]}
        actions={
          <>
            <Button variant="outline" onClick={() => exportToCsv("trips.csv", trips)}><Download className="h-4 w-4" /> Export</Button>
            <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Create Trip</Button>
          </>
        }
      />

      <Tabs value={tab} onValueChange={(v) => setTab(v as TripStatus | "All")} className="mb-4">
        <TabsList>
          {(["All", "Draft", "Dispatched", "Completed", "Cancelled"] as const).map((s) => (
            <TabsTrigger key={s} value={s}>{s}</TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={tab} />
      </Tabs>

      <DataTable data={filtered} columns={columns} searchable={(t) => `${t.source} ${t.destination} ${t.status}`} pageSize={10} />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Create Trip</DialogTitle></DialogHeader>
          <TripForm onDone={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

function TripForm({ onDone }: { onDone: () => void }) {
  const form = useForm<TripValues>({
    resolver: zodResolver(tripSchema),
    defaultValues: { source: "", destination: "", vehicleId: "", driverId: "", cargoWeightKg: 0, distanceKm: 0, estimatedRevenue: 0 },
  });

  const vId = form.watch("vehicleId");
  const dId = form.watch("driverId");
  const cargo = form.watch("cargoWeightKg");
  const selectedVehicle = vehicles.find((v) => v.id === vId);
  const selectedDriver = drivers.find((d) => d.id === dId);

  const eligibleVehicles = vehicles.filter((v) => v.status === "Available");
  const eligibleDrivers = drivers.filter(
    (d) => d.status !== "Suspended" && new Date(d.licenseExpiry).getTime() > Date.now(),
  );

  const capacityIssue = selectedVehicle && cargo > selectedVehicle.capacityKg;

  const onSubmit = (v: TripValues, dispatch: boolean) => {
    if (capacityIssue) {
      toast.error("Cargo weight exceeds vehicle capacity");
      return;
    }
    toast.success(dispatch ? "Trip dispatched" : "Trip saved as draft", {
      description: `${v.source} → ${v.destination}`,
    });
    onDone();
  };

  const err = form.formState.errors;

  return (
    <form className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div className="flex flex-col gap-1.5">
        <Label>Source</Label>
        <Input {...form.register("source")} />
        {err.source && <p className="text-xs text-destructive">{err.source.message}</p>}
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Destination</Label>
        <Input {...form.register("destination")} />
        {err.destination && <p className="text-xs text-destructive">{err.destination.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Vehicle</Label>
        <Select onValueChange={(v) => form.setValue("vehicleId", v)}>
          <SelectTrigger><SelectValue placeholder="Select an available vehicle" /></SelectTrigger>
          <SelectContent>
            {eligibleVehicles.length === 0 && <div className="px-2 py-1 text-xs text-muted-foreground">No available vehicles</div>}
            {eligibleVehicles.map((v) => (
              <SelectItem key={v.id} value={v.id}>
                {v.registrationNumber} — {v.name} ({formatNumber(v.capacityKg)} kg)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {err.vehicleId && <p className="text-xs text-destructive">{err.vehicleId.message}</p>}
        <p className="text-[11px] text-muted-foreground">Vehicles in shop or retired are hidden.</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Driver</Label>
        <Select onValueChange={(v) => form.setValue("driverId", v)}>
          <SelectTrigger><SelectValue placeholder="Select an eligible driver" /></SelectTrigger>
          <SelectContent>
            {eligibleDrivers.map((d) => (
              <SelectItem key={d.id} value={d.id}>{d.name} — {d.licenseCategory}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {err.driverId && <p className="text-xs text-destructive">{err.driverId.message}</p>}
        <p className="text-[11px] text-muted-foreground">Suspended or expired-license drivers are hidden.</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Cargo Weight (kg)</Label>
        <Input type="number" {...form.register("cargoWeightKg")} />
        {err.cargoWeightKg && <p className="text-xs text-destructive">{err.cargoWeightKg.message}</p>}
        {capacityIssue && selectedVehicle && (
          <p className="text-xs text-destructive">
            Exceeds capacity ({formatNumber(selectedVehicle.capacityKg)} kg)
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Distance (km)</Label>
        <Input type="number" {...form.register("distanceKm")} />
      </div>
      <div className="sm:col-span-2 flex flex-col gap-1.5">
        <Label>Estimated Revenue (INR)</Label>
        <Input type="number" {...form.register("estimatedRevenue")} />
      </div>

      {selectedDriver && (
        <div className="sm:col-span-2 rounded-md border border-border bg-muted/40 p-2 text-xs text-muted-foreground">
          Assigned driver <span className="font-medium text-foreground">{selectedDriver.name}</span> — status {selectedDriver.status}, license expires {formatDate(selectedDriver.licenseExpiry)}.
        </div>
      )}

      <div className="sm:col-span-2 flex flex-wrap justify-end gap-2 pt-1">
        <Button type="button" variant="outline" onClick={form.handleSubmit((v) => onSubmit(v, false))}>Save as Draft</Button>
        <Button type="button" onClick={form.handleSubmit((v) => onSubmit(v, true))}>
          <Send className="h-4 w-4" /> Dispatch
        </Button>
      </div>
    </form>
  );
}
