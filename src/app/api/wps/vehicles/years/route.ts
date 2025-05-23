// src/app/api/wps/vehicles/years/route.ts
import { NextRequest, NextResponse } from "next/server";
import { wpsClient } from "@/lib/wps-client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const modelId = searchParams.get("modelId") || undefined;

    const years = await wpsClient.getVehicleYears(modelId);

    return NextResponse.json({
      success: true,
      data: years,
    });
  } catch (error) {
    console.error("WPS Vehicle Years API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch vehicle years",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
