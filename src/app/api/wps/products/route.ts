// src/app/api/wps/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { wpsClient, transformWPSProduct } from "@/lib/wps-client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filters = {
      search: searchParams.get("search") || undefined,
      category: searchParams.get("category") || undefined,
      vehicleId: searchParams.get("vehicleId") || undefined,
      page: searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1,
      limit: searchParams.get("limit")
        ? parseInt(searchParams.get("limit")!)
        : 24,
    };

    const response = await wpsClient.getProducts(filters);

    // Transform the data to our format
    const transformedProducts = response.data.map(transformWPSProduct);

    return NextResponse.json({
      success: true,
      data: transformedProducts,
      meta: response.meta || {},
    });
  } catch (error) {
    console.error("WPS Products API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch products",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
