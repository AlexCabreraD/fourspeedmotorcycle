const { config } = require("dotenv");
config({ path: ".env.local" });

function verifyWPSSetup() {
  console.log("🔍 Verifying WPS Integration Setup...\n");

  const checks = [
    {
      name: "Environment Variables",
      check: () => {
        const apiUrl =
          process.env.WPS_API_URL || process.env.NEXT_PUBLIC_WPS_API_URL;
        const apiToken =
          process.env.WPS_API_TOKEN || process.env.NEXT_PUBLIC_WPS_API_TOKEN;
        return apiUrl && apiToken;
      },
      fix: "Copy .env.example to .env.local and add your WPS API credentials",
    },
    {
      name: "API URL Format",
      check: () => {
        const apiUrl =
          process.env.WPS_API_URL || process.env.NEXT_PUBLIC_WPS_API_URL;
        return apiUrl && apiUrl.startsWith("http");
      },
      fix: "Ensure WPS_API_URL starts with http:// or https://",
    },
    {
      name: "API Token Length",
      check: () => {
        const apiToken =
          process.env.WPS_API_TOKEN || process.env.NEXT_PUBLIC_WPS_API_TOKEN;
        return apiToken && apiToken.length > 10;
      },
      fix: "Ensure WPS_API_TOKEN is a valid token from WPS",
    },
  ];

  let allPassed = true;

  checks.forEach((check, index) => {
    const passed = check.check();
    const status = passed ? "✅" : "❌";
    console.log(`${status} ${check.name}`);

    if (!passed) {
      console.log(`   Fix: ${check.fix}`);
      allPassed = false;
    }
  });

  console.log("\n" + "=".repeat(50));

  if (allPassed) {
    console.log("✅ All setup checks passed!");
    console.log("🚀 You can now run: npm run wps:test");
  } else {
    console.log("❌ Some setup checks failed.");
    console.log("🔧 Please fix the issues above and run this script again.");
  }

  console.log("\n📖 Next steps:");
  console.log("1. Run: npm run wps:test");
  console.log("2. Start development server: npm run dev");
  console.log("3. Visit: http://localhost:3000");
  console.log("4. Test the vehicle selector component");
}

verifyWPSSetup();
