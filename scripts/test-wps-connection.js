const { config } = require("dotenv");
config({ path: ".env.local" });

async function testWPSConnection() {
  console.log("🔍 Testing WPS API connection...");

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

  console.log(`📡 API URL: ${apiUrl}`);
  console.log(`🔑 Token: ${apiToken.substring(0, 10)}...`);

  try {
    // Test basic connection
    const response = await fetch(`${apiUrl}/vehiclemakes?page[size]=1`, {
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
    console.log("✅ WPS API connection successful!");
    console.log(`📊 Sample data received:`, JSON.stringify(data, null, 2));

    // Test a few more endpoints
    console.log("\n🔍 Testing additional endpoints...");

    const endpoints = [
      { name: "Vehicle Models", path: "/vehiclemodels?page[size]=1" },
      { name: "Vehicle Years", path: "/vehicleyears?page[size]=1" },
      { name: "Items", path: "/items?page[size]=1" },
    ];

    for (const endpoint of endpoints) {
      try {
        const testResponse = await fetch(`${apiUrl}${endpoint.path}`, {
          headers: {
            Authorization: `Bearer ${apiToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (testResponse.ok) {
          console.log(`✅ ${endpoint.name}: OK`);
        } else {
          console.log(
            `⚠️  ${endpoint.name}: ${testResponse.status} ${testResponse.statusText}`,
          );
        }
      } catch (error) {
        console.log(`❌ ${endpoint.name}: ${error.message}`);
      }
    }
  } catch (error) {
    console.error("❌ WPS API connection failed:");
    console.error(`🔧 Error: ${error.message}`);

    if (error.message.includes("401")) {
      console.log("\n🛠️  Troubleshooting steps:");
      console.log("1. Check if your WPS_API_TOKEN is correct");
      console.log("2. Verify the token has the necessary permissions");
      console.log("3. Contact WPS support if the token should be valid");
    } else if (error.message.includes("404")) {
      console.log("\n🛠️  Troubleshooting steps:");
      console.log("1. Check if WPS_API_URL is correct");
      console.log("2. Verify the API endpoint paths");
      console.log("3. Check WPS API documentation for correct endpoints");
    } else {
      console.log("\n🛠️  Troubleshooting steps:");
      console.log("1. Check your internet connection");
      console.log("2. Verify WPS API service status");
      console.log("3. Check firewall/proxy settings");
    }

    process.exit(1);
  }
}

testWPSConnection();
