// src/app/api/wps/products/[sku]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { wpsClient } from "@/lib/wps-client";

export async function GET(
  request: NextRequest,
  { params }: { params: { sku: string } },
) {
  try {
    const { sku } = params;

    if (!sku) {
      return NextResponse.json(
        { success: false, error: "SKU is required" },
        { status: 400 },
      );
    }

    console.log("Fetching product by SKU:", sku);

    const product = await wpsClient.getProductBySKU(sku);

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("WPS Product API Error:", error);

    // Handle specific error cases
    if (error instanceof Error && error.message.includes("not found")) {
      return NextResponse.json(
        {
          success: false,
          error: "Product not found",
          message: `Product with SKU '${params.sku}' not found`,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch product",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
