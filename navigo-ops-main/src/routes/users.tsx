import { createFileRoute } from "@tanstack/react-router";
import { Plus, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { AuthGate } from "@/layouts/AuthGate";
import { AppLayout } from "@/layouts/AppLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, type Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import type { UserRole } from "@/types";

export const Route = createFileRoute("/users")({
  ssr: false,
  head: () => ({ meta: [{ title: "Users — Beayrik" }] }),
  component: () => (<AuthGate><AppLayout><UsersPage /></AppLayout></AuthGate>),
});

interface Row { id: string; name: string; email: string; role: UserRole; status: "Active" | "Suspended" | "Off Duty"; lastLogin: string }

const USERS: Row[] = [
  { id: "u1", name: "Priya Sharma", email: "priya@beayrik.io", role: "Administrator", status: "Active", lastLogin: "2 min ago" },
  { id: "u2", name: "Arjun Mehta", email: "arjun@beayrik.io", role: "Fleet Manager", status: "Active", lastLogin: "1 hour ago" },
  { id: "u3", name: "Deepak Bansal", email: "deepak@beayrik.io", role: "Safety Officer", status: "Active", lastLogin: "Yesterday" },
  { id: "u4", name: "Anita Rao", email: "anita@beayrik.io", role: "Financial Analyst", status: "Active", lastLogin: "3 days ago" },
  { id: "u5", name: "Rajesh Kumar", email: "rajesh.k@beayrik.io", role: "Driver", status: "Active", lastLogin: "5 min ago" },
  { id: "u6", name: "Anil Verma", email: "anil.v@beayrik.io", role: "Driver", status: "Suspended", lastLogin: "2 weeks ago" },
];

function UsersPage() {
  const cols: Column<Row>[] = [
    { key: "name", header: "Name", accessor: (u) => (
      <div className="flex items-center gap-2">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
          {u.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
        </div>
        <div>
          <div className="font-medium">{u.name}</div>
          <div className="text-xs text-muted-foreground">{u.email}</div>
        </div>
      </div>
    ) },
    { key: "role", header: "Role", accessor: (u) => (
      <span className="inline-flex items-center rounded-md border border-border bg-muted/40 px-2 py-0.5 text-xs font-medium">{u.role}</span>
    ) },
    { key: "status", header: "Status", accessor: (u) => <StatusBadge status={u.status} /> },
    { key: "last", header: "Last Login", accessor: (u) => u.lastLogin },
    { key: "act", header: "", accessor: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Reset Password</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">Suspend</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ) },
  ];

  return (
    <>
      <PageHeader
        title="Users & Access"
        description="Manage team members and role-based access to modules."
        breadcrumbs={[{ label: "Administration" }, { label: "Users" }]}
        actions={<Button onClick={() => toast.info("Open user form")}><Plus className="h-4 w-4" /> Invite User</Button>}
      />
      <DataTable data={USERS} columns={cols} searchable={(u) => `${u.name} ${u.email} ${u.role}`} pageSize={8} />
    </>
  );
}
