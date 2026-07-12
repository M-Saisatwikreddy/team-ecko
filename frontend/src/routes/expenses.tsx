import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Download } from "lucide-react";
import { toast } from "sonner";
import { AuthGate } from "@/layouts/AuthGate";
import { AppLayout } from "@/layouts/AppLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, type Column } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { expenses, vehicles } from "@/mock/data";
import { formatDate, formatINR, exportToCsv } from "@/utils/format";
import type { Expense, ExpenseCategory } from "@/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/expenses")({
  ssr: false,
  head: () => ({ meta: [{ title: "Expenses — TransitOps" }] }),
  component: () => (<AuthGate><AppLayout><ExpensesPage /></AppLayout></AuthGate>),
});

const CATEGORIES: (ExpenseCategory | "All")[] = ["All", "Fuel", "Repair", "Insurance", "Tax", "Toll", "Salary", "Other"];

function ExpensesPage() {
  const [cat, setCat] = useState<ExpenseCategory | "All">("All");
  const filtered = useMemo(() => cat === "All" ? expenses : expenses.filter((e) => e.category === cat), [cat]);
  const total = filtered.reduce((s, e) => s + e.amount, 0);

  const columns: Column<Expense>[] = [
    { key: "date", header: "Date", accessor: (e) => formatDate(e.date), sortValue: (e) => e.date },
    { key: "cat", header: "Category", accessor: (e) => (
      <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium">{e.category}</span>
    ) },
    { key: "veh", header: "Vehicle", accessor: (e) => e.vehicleId ? vehicles.find((v) => v.id === e.vehicleId)?.registrationNumber : "—" },
    { key: "rem", header: "Remarks", accessor: (e) => e.remarks },
    { key: "amt", header: "Amount", accessor: (e) => <span className="font-medium tabular-nums">{formatINR(e.amount)}</span>, sortValue: (e) => e.amount },
  ];

  return (
    <>
      <PageHeader
        title="Expenses"
        description="Cost tracking across fuel, repair, insurance, tax, toll and payroll."
        breadcrumbs={[{ label: "Finance" }, { label: "Expenses" }]}
        actions={
          <>
            <Button variant="outline" onClick={() => exportToCsv("expenses.csv", filtered)}><Download className="h-4 w-4" /> Export</Button>
            <Button onClick={() => toast.info("Open expense form")}><Plus className="h-4 w-4" /> Expense Entry</Button>
          </>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              cat === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
        <div className="ml-auto text-sm">
          <span className="text-muted-foreground">Filtered total: </span>
          <span className="font-semibold text-foreground">{formatINR(total)}</span>
        </div>
      </div>

      <DataTable data={filtered} columns={columns} searchable={(e) => `${e.category} ${e.remarks}`} pageSize={10} />
    </>
  );
}
