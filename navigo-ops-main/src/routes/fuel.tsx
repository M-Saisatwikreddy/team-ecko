import { createFileRoute } from "@tanstack/react-router";
import { Plus, Download, Fuel, Gauge, Wallet } from "lucide-react";
import { toast } from "sonner";
import { AuthGate } from "@/layouts/AuthGate";
import { AppLayout } from "@/layouts/AppLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, type Column } from "@/components/common/DataTable";
import { KpiCard } from "@/components/cards/KpiCard";
import { Button } from "@/components/ui/button";
import { fuelLogs, vehicles } from "@/mock/data";
import { formatDate, formatINR, formatNumber, exportToCsv } from "@/utils/format";
import type { FuelLog } from "@/types";

export const Route = createFileRoute("/fuel")({
  ssr: false,
  head: () => ({ meta: [{ title: "Fuel Logs — Beayrik" }] }),
  component: () => (<AuthGate><AppLayout><FuelPage /></AppLayout></AuthGate>),
});

function FuelPage() {
  const totalCost = fuelLogs.reduce((s, f) => s + f.cost, 0);
  const totalLiters = fuelLogs.reduce((s, f) => s + f.quantityLiters, 0);
  const avgMileage = fuelLogs.length ? (fuelLogs.reduce((s, f) => s + f.mileage, 0) / fuelLogs.length).toFixed(2) : "0";

  const columns: Column<FuelLog>[] = [
    { key: "date", header: "Date", accessor: (f) => formatDate(f.date), sortValue: (f) => f.date },
    { key: "veh", header: "Vehicle", accessor: (f) => vehicles.find((v) => v.id === f.vehicleId)?.registrationNumber ?? "—" },
    { key: "qty", header: "Quantity", accessor: (f) => `${formatNumber(f.quantityLiters)} L`, sortValue: (f) => f.quantityLiters },
    { key: "cost", header: "Cost", accessor: (f) => formatINR(f.cost), sortValue: (f) => f.cost },
    { key: "mil", header: "Mileage", accessor: (f) => `${f.mileage} km/L`, sortValue: (f) => f.mileage },
    { key: "sta", header: "Station", accessor: (f) => f.station },
  ];

  return (
    <>
      <PageHeader
        title="Fuel Logs"
        description="Refueling history and per-vehicle efficiency."
        breadcrumbs={[{ label: "Operations" }, { label: "Fuel Logs" }]}
        actions={
          <>
            <Button variant="outline" onClick={() => exportToCsv("fuel.csv", fuelLogs)}><Download className="h-4 w-4" /> Export</Button>
            <Button onClick={() => toast.info("Open fuel entry form")}><Plus className="h-4 w-4" /> Fuel Entry</Button>
          </>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <KpiCard label="Total Cost" value={formatINR(totalCost)} icon={Wallet} tone="danger" />
        <KpiCard label="Litres Consumed" value={`${formatNumber(totalLiters)} L`} icon={Fuel} tone="warning" />
        <KpiCard label="Avg. Mileage" value={`${avgMileage} km/L`} icon={Gauge} tone="success" />
      </div>

      <DataTable data={fuelLogs} columns={columns} searchable={(f) => `${f.station}`} pageSize={10} />
    </>
  );
}
