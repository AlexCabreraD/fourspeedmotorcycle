// src/app/api/wps/vehicles/[vehicleId]/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { wpsClient, transformWPSProduct } from "@/lib/wps-client";

export async function GET(
  request: NextRequest,
  { params }: { params: { vehicleId: string } },
) {
  try {
    const { vehicleId } = params;

    if (!vehicleId) {
      return NextResponse.json(
        { success: false, error: "Vehicle ID is required" },
        { status: 400 },
      );
    }

    const products = await wpsClient.getItemsByVehicle(vehicleId);
    const transformedProducts = products.map(transformWPSProduct);

    return NextResponse.json({
      success: true,
      data: transformedProducts,
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
