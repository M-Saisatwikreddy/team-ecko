import type {
  Vehicle, Driver, Trip, Maintenance, FuelLog, Expense, AppNotification,
} from "@/types";

export const vehicles: Vehicle[] = [
  { id: "v1", registrationNumber: "MH-01-AB-1234", name: "Tata Prima 3123", type: "Heavy Truck", capacityKg: 25000, odometer: 128430, acquisitionCost: 4200000, status: "Available", lastService: "2026-05-12" },
  { id: "v2", registrationNumber: "DL-08-CD-5567", name: "Ashok Leyland Ecomet", type: "Medium Truck", capacityKg: 12000, odometer: 82150, acquisitionCost: 2650000, status: "On Trip", lastService: "2026-04-30" },
  { id: "v3", registrationNumber: "KA-03-EF-8891", name: "Eicher Pro 2049", type: "Light Truck", capacityKg: 4500, odometer: 41200, acquisitionCost: 1450000, status: "In Shop", lastService: "2026-06-01" },
  { id: "v4", registrationNumber: "GJ-05-GH-2210", name: "BharatBenz 1617R", type: "Heavy Truck", capacityKg: 16000, odometer: 96110, acquisitionCost: 3120000, status: "Available", lastService: "2026-05-22" },
  { id: "v5", registrationNumber: "TN-10-JK-4477", name: "Mahindra Blazo X", type: "Medium Truck", capacityKg: 14000, odometer: 60340, acquisitionCost: 2820000, status: "On Trip", lastService: "2026-06-08" },
  { id: "v6", registrationNumber: "RJ-14-LM-9931", name: "Volvo FMX 440", type: "Heavy Truck", capacityKg: 28000, odometer: 154220, acquisitionCost: 5400000, status: "Retired", lastService: "2025-12-11" },
  { id: "v7", registrationNumber: "MH-12-NO-6620", name: "Tata Ace Gold", type: "Mini Truck", capacityKg: 750, odometer: 22400, acquisitionCost: 620000, status: "Available", lastService: "2026-06-30" },
  { id: "v8", registrationNumber: "UP-16-PQ-1157", name: "Eicher Pro 6055T", type: "Tanker", capacityKg: 22000, odometer: 71980, acquisitionCost: 3980000, status: "Available", lastService: "2026-05-04" },
];

export const drivers: Driver[] = [
  { id: "d1", name: "Rajesh Kumar", licenseNumber: "MH1420110034521", licenseCategory: "HMV", licenseExpiry: "2027-08-14", phone: "+91 98200 11223", safetyScore: 92, status: "Available" },
  { id: "d2", name: "Suresh Patel", licenseNumber: "GJ0620090011789", licenseCategory: "HMV", licenseExpiry: "2026-11-02", phone: "+91 98240 55678", safetyScore: 88, status: "On Trip", assignedVehicleId: "v2" },
  { id: "d3", name: "Anil Verma", licenseNumber: "DL0820140028910", licenseCategory: "LMV", licenseExpiry: "2025-11-20", phone: "+91 98110 45612", safetyScore: 74, status: "Suspended" },
  { id: "d4", name: "Karthik Iyer", licenseNumber: "KA0320170014455", licenseCategory: "HMV", licenseExpiry: "2028-02-19", phone: "+91 98450 77812", safetyScore: 96, status: "On Trip", assignedVehicleId: "v5" },
  { id: "d5", name: "Mohammed Farooq", licenseNumber: "TN1020120009821", licenseCategory: "HMV", licenseExpiry: "2027-05-30", phone: "+91 98430 33445", safetyScore: 81, status: "Available" },
  { id: "d6", name: "Vikram Singh", licenseNumber: "RJ1420080004421", licenseCategory: "HMV", licenseExpiry: "2026-09-18", phone: "+91 94140 22118", safetyScore: 90, status: "Off Duty" },
  { id: "d7", name: "Ramesh Nair", licenseNumber: "MH1220150066712", licenseCategory: "LMV", licenseExpiry: "2027-01-11", phone: "+91 98670 88901", safetyScore: 85, status: "Available" },
];

export const trips: Trip[] = [
  { id: "t1", source: "Mumbai", destination: "Pune", vehicleId: "v2", driverId: "d2", cargoWeightKg: 9500, distanceKm: 150, estimatedRevenue: 42000, status: "Dispatched", createdAt: "2026-07-10" },
  { id: "t2", source: "Bengaluru", destination: "Chennai", vehicleId: "v5", driverId: "d4", cargoWeightKg: 12500, distanceKm: 350, estimatedRevenue: 96000, status: "Dispatched", createdAt: "2026-07-11" },
  { id: "t3", source: "Delhi", destination: "Jaipur", vehicleId: "v4", driverId: "d1", cargoWeightKg: 14200, distanceKm: 280, estimatedRevenue: 78000, status: "Completed", createdAt: "2026-07-06" },
  { id: "t4", source: "Ahmedabad", destination: "Surat", vehicleId: "v7", driverId: "d7", cargoWeightKg: 620, distanceKm: 265, estimatedRevenue: 18500, status: "Completed", createdAt: "2026-07-04" },
  { id: "t5", source: "Hyderabad", destination: "Vijayawada", vehicleId: "v8", driverId: "d5", cargoWeightKg: 18500, distanceKm: 275, estimatedRevenue: 84000, status: "Draft", createdAt: "2026-07-12" },
  { id: "t6", source: "Kolkata", destination: "Bhubaneswar", vehicleId: "v1", driverId: "d6", cargoWeightKg: 21000, distanceKm: 440, estimatedRevenue: 132000, status: "Cancelled", createdAt: "2026-07-02" },
];

export const maintenance: Maintenance[] = [
  { id: "m1", vehicleId: "v3", issue: "Clutch replacement", priority: "High", technician: "Ravi Auto Works", cost: 42500, status: "In Progress", createdAt: "2026-07-05" },
  { id: "m2", vehicleId: "v1", issue: "Scheduled oil service", priority: "Low", technician: "In-house Bay 2", cost: 8200, status: "Completed", createdAt: "2026-06-20" },
  { id: "m3", vehicleId: "v4", issue: "Brake pad replacement", priority: "Medium", technician: "Mahesh Motors", cost: 15800, status: "Assigned", createdAt: "2026-07-08" },
  { id: "m4", vehicleId: "v8", issue: "Tanker seal leakage", priority: "Critical", technician: "OEM Service", cost: 58000, status: "Open", createdAt: "2026-07-11" },
  { id: "m5", vehicleId: "v6", issue: "Engine overhaul (final)", priority: "Critical", technician: "OEM Service", cost: 320000, status: "Closed", createdAt: "2025-12-11" },
];

export const fuelLogs: FuelLog[] = [
  { id: "f1", vehicleId: "v1", quantityLiters: 220, cost: 22440, mileage: 3.8, station: "IndianOil Panvel", date: "2026-07-08" },
  { id: "f2", vehicleId: "v2", quantityLiters: 180, cost: 18300, mileage: 4.1, station: "HP Lonavala", date: "2026-07-10" },
  { id: "f3", vehicleId: "v4", quantityLiters: 195, cost: 19890, mileage: 4.4, station: "BPCL Gurugram", date: "2026-07-06" },
  { id: "f4", vehicleId: "v5", quantityLiters: 210, cost: 21315, mileage: 4.0, station: "Shell Hosur", date: "2026-07-11" },
  { id: "f5", vehicleId: "v8", quantityLiters: 240, cost: 24480, mileage: 3.6, station: "IndianOil Nampally", date: "2026-07-09" },
];

export const expenses: Expense[] = [
  { id: "e1", amount: 22440, category: "Fuel", vehicleId: "v1", remarks: "Refuel Panvel", date: "2026-07-08" },
  { id: "e2", amount: 42500, category: "Repair", vehicleId: "v3", remarks: "Clutch job", date: "2026-07-05" },
  { id: "e3", amount: 128000, category: "Insurance", vehicleId: "v1", remarks: "Annual comprehensive", date: "2026-06-01" },
  { id: "e4", amount: 3200, category: "Toll", vehicleId: "v2", remarks: "MH-Pune expressway", date: "2026-07-10" },
  { id: "e5", amount: 85000, category: "Salary", remarks: "Driver payroll — Rajesh K.", date: "2026-06-30" },
  { id: "e6", amount: 14500, category: "Tax", vehicleId: "v4", remarks: "Road tax quarterly", date: "2026-06-15" },
];

export const notifications: AppNotification[] = [
  { id: "n1", type: "maintenance", title: "Maintenance due", message: "MH-01-AB-1234 scheduled service in 3 days.", createdAt: "2026-07-11T09:12:00Z", read: false },
  { id: "n2", type: "license", title: "License expiring", message: "Suresh Patel — license expires 2026-11-02.", createdAt: "2026-07-11T08:03:00Z", read: false },
  { id: "n3", type: "trip", title: "Trip completed", message: "Trip DL → JAI completed by Rajesh Kumar.", createdAt: "2026-07-10T18:45:00Z", read: true },
  { id: "n4", type: "fuel", title: "Fuel entry added", message: "Shell Hosur — 210 L, ₹21,315.", createdAt: "2026-07-10T12:20:00Z", read: true },
  { id: "n5", type: "system", title: "Backup complete", message: "Nightly database backup succeeded.", createdAt: "2026-07-10T02:00:00Z", read: true },
];
