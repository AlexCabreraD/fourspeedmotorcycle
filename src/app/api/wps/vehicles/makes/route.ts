import { NextResponse } from "next/server";
import { wpsClient } from "@/lib/wps-client";

export async function GET() {
  try {
    const makes = await wpsClient.getVehicleMakes();

    return NextResponse.json({
      success: true,
      data: makes,
    });
  } catch (error) {
    console.error("WPS Vehicle Makes API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch vehicle makes",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
