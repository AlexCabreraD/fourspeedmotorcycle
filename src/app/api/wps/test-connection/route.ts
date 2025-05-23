// src/app/api/wps/test-connection/route.ts
import { NextResponse } from "next/server";
import { wpsClient } from "@/lib/wps-client";

export async function GET() {
  try {
    const isConnected = await wpsClient.testConnection();

    if (isConnected) {
      return NextResponse.json({
        success: true,
        message: "WPS API connection successful",
        timestamp: new Date().toISOString(),
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "WPS API connection failed",
          timestamp: new Date().toISOString(),
        },
        { status: 503 },
      );
    }
  } catch (error) {
    console.error("WPS Connection Test Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "WPS API connection test failed",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 503 },
    );
  }
}
