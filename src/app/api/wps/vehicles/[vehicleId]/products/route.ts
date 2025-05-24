// src/app/api/wps/vehicles/[vehicleId]/products/route.ts - Updated
import { NextRequest, NextResponse } from "next/server";
import { wpsClient } from "@/lib/wps-client";

export async function GET(
  request: NextRequest,
  { params }: { params: { vehicleId: string } },
) {
  try {
    const { vehicleId } = params;
    const { searchParams } = new URL(request.url);

    if (!vehicleId) {
      return NextResponse.json(
        { success: false, error: "Vehicle ID is required" },
        { status: 400 },
      );
    }

    const page = searchParams.get("page")
      ? parseInt(searchParams.get("page")!)
      : 1;
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!)
      : 24;

    const response = await wpsClient.getItemsByVehicle(vehicleId, page, limit);

    return NextResponse.json({
      success: true,
      data: response.data,
      meta: response.meta,
      links: response.links,
    });
  } catch (error) {
    console.error("WPS Vehicle Products API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch vehicle products",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
