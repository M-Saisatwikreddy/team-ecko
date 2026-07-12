// Service layer — all UI reads through these functions so a real API
// (Node.js + Express + PostgreSQL) can be swapped in without UI changes.
import * as mock from "@/mock/data";
import type {
  Vehicle, Driver, Trip, Maintenance, FuelLog, Expense, AppNotification,
} from "@/types";

const delay = <T>(v: T, ms = 200) => new Promise<T>((r) => setTimeout(() => r(v), ms));

export const vehicleService = {
  list: () => delay<Vehicle[]>(mock.vehicles),
  get: (id: string) => delay<Vehicle | undefined>(mock.vehicles.find((v) => v.id === id)),
};
export const driverService = {
  list: () => delay<Driver[]>(mock.drivers),
  get: (id: string) => delay<Driver | undefined>(mock.drivers.find((d) => d.id === id)),
};
export const tripService = {
  list: () => delay<Trip[]>(mock.trips),
};
export const maintenanceService = {
  list: () => delay<Maintenance[]>(mock.maintenance),
};
export const fuelService = {
  list: () => delay<FuelLog[]>(mock.fuelLogs),
};
export const expenseService = {
  list: () => delay<Expense[]>(mock.expenses),
};
export const notificationService = {
  list: () => delay<AppNotification[]>(mock.notifications),
};
