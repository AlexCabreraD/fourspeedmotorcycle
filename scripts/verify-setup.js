const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function verifySetup() {
  try {
    console.log("🔍 Verifying database setup...");

    // Check all expected tables
    const tables = await prisma.$queryRaw`
      SELECT table_name, 
             (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
      FROM information_schema.tables t
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `;

    const expectedTables = [
      "users",
      "accounts",
      "sessions",
      "verification_tokens",
      "user_vehicles",
      "addresses",
      "cart_items",
      "orders",
      "order_items",
      "product_cache",
      "vehicle_compatibility",
      "app_config",
    ];

    console.log(`\n📊 Database Tables (${tables.length}/12):`);

    let allTablesPresent = true;
    expectedTables.forEach((expectedTable) => {
      const found = tables.find((t) => t.table_name === expectedTable);
      if (found) {
        console.log(`   ✅ ${expectedTable} (${found.column_count} columns)`);
      } else {
        console.log(`   ❌ ${expectedTable} - MISSING`);
        allTablesPresent = false;
      }
    });

    if (!allTablesPresent) {
      console.log(
        "\n⚠️  Some tables are missing. Run: npx prisma migrate dev --name init",
      );
      return false;
    }

    // Test basic CRUD operations if tables exist
    if (tables.length > 0) {
      console.log("\n🧪 Testing basic operations...");

      // Test app_config table if it exists
      const configTableExists = tables.some(
        (t) => t.table_name === "app_config",
      );
      if (configTableExists) {
        const testConfig = await prisma.appConfig.create({
          data: {
            key: "setup_test",
            value: new Date().toISOString(),
          },
        });
        console.log("✅ Create operation works");

        const retrieved = await prisma.appConfig.findUnique({
          where: { key: "setup_test" },
        });
        console.log("✅ Read operation works");

        await prisma.appConfig.delete({
          where: { key: "setup_test" },
        });
        console.log("✅ Delete operation works");
      }
    }

    console.log("\n🎉 Database setup verification complete!");
    return true;
  } catch (error) {
    console.error("❌ Verification failed:", error.message);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

verifySetup();
