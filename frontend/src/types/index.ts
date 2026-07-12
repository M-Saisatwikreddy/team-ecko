export type VehicleStatus = "Available" | "On Trip" | "In Shop" | "Retired";
export type DriverStatus = "Available" | "On Trip" | "Suspended" | "Off Duty";
export type TripStatus = "Draft" | "Dispatched" | "Completed" | "Cancelled";
export type MaintenanceStatus = "Open" | "Assigned" | "In Progress" | "Completed" | "Closed";
export type MaintenancePriority = "Low" | "Medium" | "High" | "Critical";
export type UserRole = "Fleet Manager" | "Driver" | "Safety Officer" | "Financial Analyst" | "Administrator";
export type ExpenseCategory = "Fuel" | "Repair" | "Insurance" | "Tax" | "Toll" | "Salary" | "Other";

export interface Vehicle {
  id: string;
  registrationNumber: string;
  name: string;
  type: string;
  capacityKg: number;
  odometer: number;
  acquisitionCost: number;
  status: VehicleStatus;
  lastService: string;
}

export interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  licenseCategory: string;
  licenseExpiry: string;
  phone: string;
  safetyScore: number;
  status: DriverStatus;
  assignedVehicleId?: string;
}

export interface Trip {
  id: string;
  source: string;
  destination: string;
  vehicleId: string;
  driverId: string;
  cargoWeightKg: number;
  distanceKm: number;
  estimatedRevenue: number;
  status: TripStatus;
  createdAt: string;
}

export interface Maintenance {
  id: string;
  vehicleId: string;
  issue: string;
  priority: MaintenancePriority;
  technician: string;
  cost: number;
  status: MaintenanceStatus;
  createdAt: string;
}

export interface FuelLog {
  id: string;
  vehicleId: string;
  quantityLiters: number;
  cost: number;
  mileage: number;
  station: string;
  date: string;
}

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  vehicleId?: string;
  remarks: string;
  date: string;
}

export interface AppNotification {
  id: string;
  type: "maintenance" | "license" | "trip" | "fuel" | "expense" | "system";
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
