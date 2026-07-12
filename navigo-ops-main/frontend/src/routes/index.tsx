import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Truck, CheckCircle2, Wrench, Route as RouteIcon, Clock, UserCheck,
  Gauge, Fuel, Wallet, Plus,
} from "lucide-react";
import {
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, LineChart, Line, Legend,
} from "recharts";

import { AuthGate } from "@/layouts/AuthGate";
import { AppLayout } from "@/layouts/AppLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { KpiCard } from "@/components/cards/KpiCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { DataTable, type Column } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { vehicles, trips, drivers, maintenance, expenses, fuelLogs } from "@/mock/data";
import { formatDate, formatINR } from "@/utils/format";
import type { Trip, Maintenance, Driver } from "@/types";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({ meta: [{ title: "Dashboard — TransitOps" }] }),
  component: () => (
    <AuthGate><AppLayout><Dashboard /></AppLayout></AuthGate>
  ),
});

function Dashboard() {
  const active = vehicles.filter((v) => v.status === "On Trip").length;
  const available = vehicles.filter((v) => v.status === "Available").length;
  const inShop = vehicles.filter((v) => v.status === "In Shop").length;
  const activeTrips = trips.filter((t) => t.status === "Dispatched").length;
  const pendingTrips = trips.filter((t) => t.status === "Draft").length;
  const driversOnDuty = drivers.filter((d) => d.status === "On Trip" || d.status === "Available").length;
  const utilization = vehicles.length ? Math.round((active / (vehicles.length - inShop)) * 100) : 0;
  const monthlyFuel = fuelLogs.reduce((s, f) => s + f.cost, 0);
  const opCost = expenses.reduce((s, e) => s + e.amount, 0);

  const vehicleStatus = [
    { name: "Available", value: available, color: "var(--color-success)" },
    { name: "On Trip", value: active, color: "var(--color-info)" },
    { name: "In Shop", value: inShop, color: "var(--color-warning)" },
    { name: "Retired", value: vehicles.filter((v) => v.status === "Retired").length, color: "var(--color-muted-foreground)" },
  ];
  const tripStatus = [
    { name: "Draft", value: trips.filter((t) => t.status === "Draft").length, color: "var(--color-muted-foreground)" },
    { name: "Dispatched", value: activeTrips, color: "var(--color-info)" },
    { name: "Completed", value: trips.filter((t) => t.status === "Completed").length, color: "var(--color-success)" },
    { name: "Cancelled", value: trips.filter((t) => t.status === "Cancelled").length, color: "var(--color-destructive)" },
  ];

  const monthlyExpenses = [
    { month: "Feb", value: 480000 }, { month: "Mar", value: 520000 },
    { month: "Apr", value: 610000 }, { month: "May", value: 590000 },
    { month: "Jun", value: 640000 }, { month: "Jul", value: 705000 },
  ];
  const fuelConsumption = [
    { month: "Feb", liters: 3200 }, { month: "Mar", liters: 3600 },
    { month: "Apr", liters: 3900 }, { month: "May", liters: 3700 },
    { month: "Jun", liters: 4100 }, { month: "Jul", liters: 4250 },
  ];

  const tripCols: Column<Trip>[] = [
    { key: "route", header: "Route", accessor: (r) => (
      <div className="flex flex-col">
        <span className="font-medium">{r.source} → {r.destination}</span>
        <span className="text-xs text-muted-foreground">{formatDate(r.createdAt)}</span>
      </div>
    ) },
    { key: "vehicle", header: "Vehicle", accessor: (r) => vehicles.find((v) => v.id === r.vehicleId)?.registrationNumber ?? "—" },
    { key: "driver", header: "Driver", accessor: (r) => drivers.find((d) => d.id === r.driverId)?.name ?? "—" },
    { key: "status", header: "Status", accessor: (r) => <StatusBadge status={r.status} /> },
  ];

  const maintCols: Column<Maintenance>[] = [
    { key: "vehicle", header: "Vehicle", accessor: (m) => vehicles.find((v) => v.id === m.vehicleId)?.registrationNumber ?? "—" },
    { key: "issue", header: "Issue", accessor: (m) => m.issue },
    { key: "priority", header: "Priority", accessor: (m) => <StatusBadge status={m.priority} /> },
    { key: "status", header: "Status", accessor: (m) => <StatusBadge status={m.status} /> },
  ];

  const upcoming = [...drivers]
    .filter((d) => d.licenseExpiry)
    .sort((a, b) => a.licenseExpiry.localeCompare(b.licenseExpiry))
    .slice(0, 5);

  const licCols: Column<Driver>[] = [
    { key: "name", header: "Driver", accessor: (d) => d.name },
    { key: "license", header: "License", accessor: (d) => d.licenseNumber },
    { key: "expiry", header: "Expires", accessor: (d) => formatDate(d.licenseExpiry) },
    { key: "status", header: "Status", accessor: (d) => <StatusBadge status={d.status} /> },
  ];

  return (
    <>
      <PageHeader
        title="Fleet Operations Dashboard"
        description="Real-time overview of vehicles, drivers, trips, and financials."
        breadcrumbs={[{ label: "Home" }, { label: "Dashboard" }]}
        actions={
          <Button asChild>
            <Link to="/trips"><Plus className="h-4 w-4" /> New Trip</Link>
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        <KpiCard label="Active Vehicles" value={active} icon={Truck} hint={`${vehicles.length} total fleet`} tone="info" />
        <KpiCard label="Available Vehicles" value={available} icon={CheckCircle2} tone="success" />
        <KpiCard label="In Maintenance" value={inShop} icon={Wrench} tone="warning" />
        <KpiCard label="Active Trips" value={activeTrips} icon={RouteIcon} tone="info" />
        <KpiCard label="Pending Trips" value={pendingTrips} icon={Clock} tone="warning" />
        <KpiCard label="Drivers On Duty" value={driversOnDuty} icon={UserCheck} tone="success" />
        <KpiCard label="Fleet Utilization" value={`${utilization}%`} icon={Gauge} tone="default" trend={{ value: 4.2, positive: true }} />
        <KpiCard label="Monthly Fuel Cost" value={formatINR(monthlyFuel)} icon={Fuel} tone="warning" trend={{ value: 3.1, positive: false }} />
        <KpiCard label="Operational Cost" value={formatINR(opCost)} icon={Wallet} tone="danger" trend={{ value: 1.8, positive: true }} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Vehicle Status</h3>
            <span className="text-xs text-muted-foreground">Fleet: {vehicles.length}</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={vehicleStatus} innerRadius={55} outerRadius={85} paddingAngle={2} dataKey="value">
                  {vehicleStatus.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Trip Status</h3>
            <span className="text-xs text-muted-foreground">Total: {trips.length}</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tripStatus}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
                <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {tripStatus.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Monthly Expenses</h3>
            <span className="text-xs text-muted-foreground">Last 6 months</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyExpenses}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
                <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => formatINR(v)} contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="value" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Fuel Consumption</h3>
            <span className="text-xs text-muted-foreground">Liters / month</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={fuelConsumption}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
                <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="liters" stroke="var(--color-chart-3)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4 xl:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Recent Trips</h3>
            <Button asChild variant="ghost" size="sm"><Link to="/trips">View all</Link></Button>
          </div>
          <DataTable data={trips.slice(0, 5)} columns={tripCols} pageSize={5} />
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Recent Maintenance</h3>
            <Button asChild variant="ghost" size="sm"><Link to="/maintenance">View all</Link></Button>
          </div>
          <DataTable data={maintenance.slice(0, 5)} columns={maintCols} pageSize={5} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4 xl:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Upcoming License Expiry</h3>
            <Button asChild variant="ghost" size="sm"><Link to="/drivers">View drivers</Link></Button>
          </div>
          <DataTable data={upcoming} columns={licCols} pageSize={5} />
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-2">
            <Button asChild variant="outline" className="justify-start"><Link to="/vehicles"><Truck className="h-4 w-4" /> Register Vehicle</Link></Button>
            <Button asChild variant="outline" className="justify-start"><Link to="/trips"><RouteIcon className="h-4 w-4" /> Create Trip</Link></Button>
            <Button asChild variant="outline" className="justify-start"><Link to="/maintenance"><Wrench className="h-4 w-4" /> Maintenance</Link></Button>
            <Button asChild variant="outline" className="justify-start"><Link to="/fuel"><Fuel className="h-4 w-4" /> Fuel Entry</Link></Button>
            <Button asChild variant="outline" className="justify-start"><Link to="/expenses"><Wallet className="h-4 w-4" /> Expense Entry</Link></Button>
          </div>
        </div>
      </div>
    </>
  );
}
