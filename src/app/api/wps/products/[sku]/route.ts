// src/app/api/wps/products/[sku]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { wpsClient, transformWPSProduct } from "@/lib/wps-client";

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

    const product = await wpsClient.getProductBySKU(sku);
    const transformedProduct = transformWPSProduct(product);

    return NextResponse.json({
      success: true,
      data: transformedProduct,
    });
  } catch (error) {
    console.error("WPS Product API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch product",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status:
          error instanceof Error && error.message.includes("404") ? 404 : 500,
      },
    );
  }
}
