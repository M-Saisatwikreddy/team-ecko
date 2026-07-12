import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AuthGate } from "@/layouts/AuthGate";
import { AppLayout } from "@/layouts/AppLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

export const Route = createFileRoute("/settings")({
  ssr: false,
  head: () => ({ meta: [{ title: "Settings — Beayrik" }] }),
  component: () => (<AuthGate><AppLayout><SettingsPage /></AppLayout></AuthGate>),
});

function SettingsPage() {
  const { user } = useAuth();
  const { theme, toggle } = useTheme();
  return (
    <>
      <PageHeader
        title="Settings"
        description="Organization, user preferences, and system configuration."
        breadcrumbs={[{ label: "Administration" }, { label: "Settings" }]}
      />
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="org">Organization</TabsTrigger>
          <TabsTrigger value="prefs">Preferences</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-4">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-semibold">Profile</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5"><Label>Full Name</Label><Input defaultValue={user?.name ?? ""} /></div>
              <div className="flex flex-col gap-1.5"><Label>Email</Label><Input defaultValue={user?.email ?? ""} /></div>
              <div className="flex flex-col gap-1.5"><Label>Role</Label><Input readOnly value={user?.role ?? ""} /></div>
              <div className="flex flex-col gap-1.5"><Label>Phone</Label><Input placeholder="+91 …" /></div>
            </div>
            <div className="mt-4 flex justify-end"><Button onClick={() => toast.success("Profile saved")}>Save Changes</Button></div>
          </div>
        </TabsContent>
        <TabsContent value="org" className="mt-4">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-semibold">Organization</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5"><Label>Company Name</Label><Input defaultValue="Beayrik Logistics Pvt. Ltd." /></div>
              <div className="flex flex-col gap-1.5"><Label>GSTIN</Label><Input defaultValue="27AABCT1234A1Z5" /></div>
              <div className="flex flex-col gap-1.5 sm:col-span-2"><Label>Registered Address</Label><Input defaultValue="Andheri East, Mumbai, MH 400069" /></div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="prefs" className="mt-4">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-semibold">Preferences</h3>
            <div className="flex items-center justify-between border-b border-border py-3">
              <div><div className="text-sm font-medium">Dark Mode</div><div className="text-xs text-muted-foreground">Reduce glare for night operations.</div></div>
              <Switch checked={theme === "dark"} onCheckedChange={toggle} />
            </div>
            <div className="flex items-center justify-between border-b border-border py-3">
              <div><div className="text-sm font-medium">Email Notifications</div><div className="text-xs text-muted-foreground">Maintenance and license alerts.</div></div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between py-3">
              <div><div className="text-sm font-medium">Weekly Reports</div><div className="text-xs text-muted-foreground">Every Monday at 09:00.</div></div>
              <Switch defaultChecked />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="api" className="mt-4">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-1 text-sm font-semibold">API Integration</h3>
            <p className="mb-4 text-xs text-muted-foreground">Connect the UI to your Node.js + Express + PostgreSQL backend.</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5"><Label>API Base URL</Label><Input placeholder="https://api.beayrik.io/v1" /></div>
              <div className="flex flex-col gap-1.5"><Label>API Key</Label><Input type="password" placeholder="••••••••••••" /></div>
            </div>
            <div className="mt-4 flex justify-end"><Button onClick={() => toast.success("Endpoint saved")}>Save</Button></div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
