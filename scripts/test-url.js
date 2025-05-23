// test-url.js
const url = process.env.DATABASE_URL;

console.log("🔍 Checking DATABASE_URL format...");

if (!url) {
  console.error("❌ DATABASE_URL not found in environment");
  process.exit(1);
}

console.log("✅ DATABASE_URL found");
console.log("📋 Format check:");

// Parse the URL to check components
try {
  const parsed = new URL(url);
  console.log(`   Protocol: ${parsed.protocol}`);
  console.log(`   Username: ${parsed.username}`);
  console.log(
    `   Password: ${parsed.password ? "[HIDDEN - " + parsed.password.length + " chars]" : "MISSING!"}`,
  );
  console.log(`   Host: ${parsed.hostname}`);
  console.log(`   Port: ${parsed.port}`);
  console.log(`   Database: ${parsed.pathname.slice(1)}`);

  // Validate components
  if (parsed.protocol !== "postgresql:") {
    console.error('❌ Protocol should be "postgresql:"');
  }
  if (parsed.username !== "postgres") {
    console.error('❌ Username should be "postgres"');
  }
  if (!parsed.password) {
    console.error("❌ Password is missing!");
  }
  if (!parsed.hostname.includes("supabase.co")) {
    console.error('❌ Host should contain "supabase.co"');
  }
  if (parsed.port !== "5432") {
    console.error('❌ Port should be "5432"');
  }
  if (parsed.pathname !== "/postgres") {
    console.error('❌ Database name should be "/postgres"');
  }

  console.log("✅ URL format looks correct");
} catch (error) {
  console.error("❌ Invalid URL format:", error.message);
}
