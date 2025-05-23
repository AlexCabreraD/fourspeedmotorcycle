import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed app config
  await prisma.appConfig.createMany({
    data: [
      { key: "tax_rate_utah", value: "0.0725" },
      { key: "free_shipping_threshold", value: "75.00" },
      { key: "store_name", value: "4SpeedMotorcycle" },
      { key: "store_email", value: "orders@4speedmotorcycle.com" },
    ],
  });

  console.log("Database seeded successfully");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
