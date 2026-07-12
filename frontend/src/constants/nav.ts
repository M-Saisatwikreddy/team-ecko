import {
  LayoutDashboard, Truck, Users, Route as RouteIcon, Wrench, Fuel,
  Receipt, BarChart3, UserCog, Settings,
} from "lucide-react";
import type { UserRole } from "@/types";

export interface NavItem {
  label: string;
  to: string;
  icon: typeof LayoutDashboard;
  roles?: UserRole[]; // if omitted, visible to all authenticated
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Vehicle Registry", to: "/vehicles", icon: Truck, roles: ["Fleet Manager", "Administrator", "Safety Officer"] },
  { label: "Drivers", to: "/drivers", icon: Users, roles: ["Fleet Manager", "Administrator", "Safety Officer"] },
  { label: "Trips", to: "/trips", icon: RouteIcon, roles: ["Fleet Manager", "Administrator", "Driver"] },
  { label: "Maintenance", to: "/maintenance", icon: Wrench, roles: ["Fleet Manager", "Administrator"] },
  { label: "Fuel Logs", to: "/fuel", icon: Fuel, roles: ["Fleet Manager", "Administrator", "Driver"] },
  { label: "Expenses", to: "/expenses", icon: Receipt, roles: ["Financial Analyst", "Administrator", "Fleet Manager"] },
  { label: "Reports & Analytics", to: "/reports", icon: BarChart3, roles: ["Fleet Manager", "Financial Analyst", "Administrator"] },
  { label: "Users", to: "/users", icon: UserCog, roles: ["Administrator"] },
  { label: "Settings", to: "/settings", icon: Settings },
];
