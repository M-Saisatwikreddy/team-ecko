import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding Database...");

    const adminPassword = await bcrypt.hash("admin123", 10);
    const fleetPassword = await bcrypt.hash("fleet123", 10);

    await prisma.user.createMany({
        data: [
            {
                fullName: "Admin",
                email: "admin@transitops.com",
                password: adminPassword,
                role: "ADMIN",
                isActive: true
            },
            {
                fullName: "Fleet Manager",
                email: "fleet@transitops.com",
                password: fleetPassword,
                role: "FLEET_MANAGER",
                isActive: true
            }
        ],
        skipDuplicates: true
    });

    console.log("Database Seed Completed");
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });