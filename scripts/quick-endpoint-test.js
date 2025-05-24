const { config } = require("dotenv");
config({ path: ".env.local" });

/**
 * Quick test for a specific WPS API endpoint
 * Usage: node scripts/quick-endpoint-test.js [endpoint]
 *
 * Examples:
 * node scripts/quick-endpoint-test.js vehiclemakes
 * node scripts/quick-endpoint-test.js items
 * node scripts/quick-endpoint-test.js vehicles
 */

async function testSpecificEndpoint() {
  const endpoint = process.argv[2] || "vehiclemakes";

  console.log(`🔍 Testing WPS API endpoint: /${endpoint}\n`);

  const apiUrl = process.env.WPS_API_URL || process.env.NEXT_PUBLIC_WPS_API_URL;
  const apiToken =
    process.env.WPS_API_TOKEN || process.env.NEXT_PUBLIC_WPS_API_TOKEN;

  if (!apiUrl || !apiToken) {
    console.error("❌ Missing WPS API configuration");
    console.log(
      "Please set WPS_API_URL and WPS_API_TOKEN in your .env.local file",
    );
    process.exit(1);
  }

  try {
    const url = `${apiUrl}/${endpoint}?page[size]=1`;
    console.log(`📡 Fetching: ${url}`);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    console.log("✅ Response received!\n");
    console.log("📊 FULL RESPONSE STRUCTURE:");
    console.log("=".repeat(50));
    console.log(JSON.stringify(data, null, 2));
    console.log("=".repeat(50));

    // Quick analysis
    console.log("\n🔍 QUICK ANALYSIS:");

    if (data.data && Array.isArray(data.data)) {
      console.log(`• Type: Array in 'data' property`);
      console.log(`• Count: ${data.data.length} items`);

      if (data.data.length > 0) {
        const firstItem = data.data[0];
        console.log(`• First item keys: ${Object.keys(firstItem).join(", ")}`);
        console.log(`• Sample item:`, firstItem);
      }
    } else if (Array.isArray(data)) {
      console.log(`• Type: Direct array`);
      console.log(`• Count: ${data.length} items`);

      if (data.length > 0) {
        console.log(`• First item keys: ${Object.keys(data[0]).join(", ")}`);
        console.log(`• Sample item:`, data[0]);
      }
    } else if (data.data && !Array.isArray(data.data)) {
      console.log(`• Type: Single object in 'data' property`);
      console.log(`• Object keys: ${Object.keys(data.data).join(", ")}`);
      console.log(`• Sample object:`, data.data);
    } else {
      console.log(`• Type: Direct object`);
      console.log(`• Object keys: ${Object.keys(data).join(", ")}`);
    }

    if (data.meta) {
      console.log(`\n📋 Meta info:`, data.meta);
    }

    if (data.links) {
      console.log(`\n🔗 Pagination:`, data.links);
    }
  } catch (error) {
    console.error("❌ Error:", error.message);

    console.log("\n🛠️ Troubleshooting:");
    console.log("• Check if the endpoint name is correct");
    console.log("• Verify your API token has access to this endpoint");
    console.log(
      "• Try these common endpoints: vehiclemakes, vehiclemodels, items, vehicles",
    );
  }
}

// Show usage if no args
if (process.argv.length === 2) {
  console.log("Usage: node scripts/quick-endpoint-test.js [endpoint]");
  console.log("\nCommon endpoints:");
  console.log(
    "• vehiclemakes    - List of manufacturers (Honda, Yamaha, etc.)",
  );
  console.log("• vehiclemodels   - List of vehicle models");
  console.log("• vehicleyears    - List of vehicle years");
  console.log("• vehicles        - Complete vehicle records");
  console.log("• items           - Product catalog");
  console.log("\nExample: node scripts/quick-endpoint-test.js vehiclemakes");
  process.exit(0);
}

testSpecificEndpoint();
