// src/app/api/wps/vehicles/models/route.ts
import { NextRequest, NextResponse } from "next/server";
import { wpsClient } from "@/lib/wps-client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const makeId = searchParams.get("makeId") || undefined;

    const models = await wpsClient.getVehicleModels(makeId);

    return NextResponse.json({
      success: true,
      data: models,
    });
  } catch (error) {
    console.error("WPS Vehicle Models API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch vehicle models",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
