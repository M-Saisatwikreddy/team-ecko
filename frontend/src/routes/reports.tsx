import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from "recharts";
import { AuthGate } from "@/layouts/AuthGate";
import { AppLayout } from "@/layouts/AppLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { formatINR } from "@/utils/format";

export const Route = createFileRoute("/reports")({
  ssr: false,
  head: () => ({ meta: [{ title: "Reports & Analytics — TransitOps" }] }),
  component: () => (<AuthGate><AppLayout><ReportsPage /></AppLayout></AuthGate>),
});

function ReportsPage() {
  const utilization = [
    { name: "Mumbai", value: 82 }, { name: "Delhi", value: 74 },
    { name: "Bengaluru", value: 88 }, { name: "Chennai", value: 69 },
    { name: "Kolkata", value: 61 }, { name: "Ahmedabad", value: 77 },
  ];
  const roi = [
    { veh: "MH-01", value: 22 }, { veh: "DL-08", value: 18 },
    { veh: "KA-03", value: 12 }, { veh: "GJ-05", value: 26 },
    { veh: "TN-10", value: 19 }, { veh: "UP-16", value: 15 },
  ];
  const fuelEff = [
    { month: "Feb", value: 3.8 }, { month: "Mar", value: 3.9 },
    { month: "Apr", value: 4.0 }, { month: "May", value: 4.1 },
    { month: "Jun", value: 4.2 }, { month: "Jul", value: 4.1 },
  ];
  const monthly = [
    { month: "Feb", fuel: 220000, repair: 90000, other: 170000 },
    { month: "Mar", fuel: 250000, repair: 60000, other: 210000 },
    { month: "Apr", fuel: 280000, repair: 120000, other: 210000 },
    { month: "May", fuel: 260000, repair: 100000, other: 230000 },
    { month: "Jun", fuel: 290000, repair: 140000, other: 210000 },
    { month: "Jul", fuel: 310000, repair: 155000, other: 240000 },
  ];
  const tripsBreakdown = [
    { name: "On Time", value: 68, color: "var(--color-success)" },
    { name: "Delayed", value: 22, color: "var(--color-warning)" },
    { name: "Cancelled", value: 10, color: "var(--color-destructive)" },
  ];
  const opCost = [
    { month: "Feb", value: 480 }, { month: "Mar", value: 520 },
    { month: "Apr", value: 610 }, { month: "May", value: 590 },
    { month: "Jun", value: 640 }, { month: "Jul", value: 705 },
  ];

  return (
    <>
      <PageHeader
        title="Reports & Analytics"
        description="Fleet performance, financial insights, and operational KPIs."
        breadcrumbs={[{ label: "Analytics" }, { label: "Reports" }]}
        actions={
          <>
            <Button variant="outline" onClick={() => toast.success("CSV export queued")}><Download className="h-4 w-4" /> CSV</Button>
            <Button onClick={() => toast.success("PDF export queued")}><FileText className="h-4 w-4" /> PDF</Button>
          </>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-4">
        <div className="flex flex-col gap-1"><Label className="text-xs">Vehicle Type</Label>
          <Select defaultValue="all"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
            <SelectItem value="all">All</SelectItem><SelectItem value="hmv">Heavy</SelectItem><SelectItem value="mmv">Medium</SelectItem><SelectItem value="lmv">Light</SelectItem>
          </SelectContent></Select>
        </div>
        <div className="flex flex-col gap-1"><Label className="text-xs">Status</Label>
          <Select defaultValue="all"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
            <SelectItem value="all">All</SelectItem><SelectItem value="Available">Available</SelectItem><SelectItem value="On Trip">On Trip</SelectItem><SelectItem value="In Shop">In Shop</SelectItem>
          </SelectContent></Select>
        </div>
        <div className="flex flex-col gap-1"><Label className="text-xs">Driver</Label>
          <Select defaultValue="all"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem></SelectContent></Select>
        </div>
        <div className="flex flex-col gap-1"><Label className="text-xs">Date Range</Label>
          <Select defaultValue="30d"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem><SelectItem value="30d">Last 30 days</SelectItem><SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent></Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Fleet Utilization">
          <BarChart data={utilization}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
            <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickFormatter={(v) => `${v}%`} />
            <Tooltip contentStyle={ttStyle} formatter={(v) => `${v}%`} />
            <Bar dataKey="value" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Vehicle ROI (%)">
          <BarChart data={roi}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis dataKey="veh" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
            <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
            <Tooltip contentStyle={ttStyle} formatter={(v) => `${v}%`} />
            <Bar dataKey="value" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Fuel Efficiency (km/L)">
          <LineChart data={fuelEff}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
            <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
            <Tooltip contentStyle={ttStyle} />
            <Line type="monotone" dataKey="value" stroke="var(--color-chart-3)" strokeWidth={2} />
          </LineChart>
        </ChartCard>

        <ChartCard title="Monthly Expenses">
          <BarChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
            <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
            <Tooltip contentStyle={ttStyle} formatter={(v: number) => formatINR(v)} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="fuel" stackId="a" fill="var(--color-chart-3)" />
            <Bar dataKey="repair" stackId="a" fill="var(--color-chart-4)" />
            <Bar dataKey="other" stackId="a" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Trip Analytics">
          <PieChart>
            <Pie data={tripsBreakdown} innerRadius={55} outerRadius={90} paddingAngle={2} dataKey="value">
              {tripsBreakdown.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie>
            <Tooltip contentStyle={ttStyle} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ChartCard>

        <ChartCard title="Operational Cost (₹ '000)">
          <LineChart data={opCost}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
            <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
            <Tooltip contentStyle={ttStyle} />
            <Line type="monotone" dataKey="value" stroke="var(--color-chart-4)" strokeWidth={2} />
          </LineChart>
        </ChartCard>
      </div>
    </>
  );
}

const ttStyle = { background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 };

function ChartCard({ title, children }: { title: string; children: React.ReactElement }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="mb-2 text-sm font-semibold">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer>
      </div>
    </div>
  );
}
