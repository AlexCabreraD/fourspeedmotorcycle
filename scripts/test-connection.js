const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log("🔍 Testing Supabase connection...");

    // Test basic connection
    await prisma.$connect();
    console.log("✅ Connected to Supabase successfully!");

    // Test raw SQL query
    const result = await prisma.$queryRaw`SELECT version();`;
    console.log("✅ PostgreSQL version:", result[0].version.split(" ")[0]);

    // Test if we can create/read from a simple table
    const tableCheck = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE';
    `;

    console.log("📊 Current tables in database:", tableCheck.length);
    if (tableCheck.length > 0) {
      console.log(
        "   Tables found:",
        tableCheck.map((t) => t.table_name).join(", "),
      );
    } else {
      console.log(
        "   No custom tables found yet (this is normal for new database)",
      );
    }
  } catch (error) {
    console.error("❌ Connection failed:");

    if (error.code === "P1001") {
      console.error("🔧 Database unreachable. Check your DATABASE_URL in .env");
    } else if (error.code === "P1000") {
      console.error(
        "🔧 Authentication failed. Check your password in DATABASE_URL",
      );
    } else {
      console.error("🔧 Error details:", error.message);
    }

    console.log("\n🛠️  Troubleshooting steps:");
    console.log("1. Verify DATABASE_URL in .env file");
    console.log("2. Check if Supabase project is active");
    console.log(
      "3. Ensure password is correct (no special URL encoding needed)",
    );
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
