// src/app/api/wps/vehicles/[vehicleId]/products/route.ts
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

    const cursor = searchParams.get("cursor") || undefined; // Changed from page
    const pageSize = searchParams.get("pageSize")
      ? parseInt(searchParams.get("pageSize")!)
      : 24; // Changed from limit

    console.log("Fetching vehicle products:", { vehicleId, cursor, pageSize });

    const response = await wpsClient.getItemsByVehicle(
      vehicleId,
      cursor,
      pageSize,
    );

    return NextResponse.json({
      success: true,
      data: response.data,
      meta: response.meta, // Contains cursor pagination info
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
