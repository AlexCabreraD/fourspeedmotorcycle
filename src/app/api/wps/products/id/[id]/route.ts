// src/app/api/wps/products/id/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { wpsClient } from "@/lib/wps-client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Product ID is required" },
        { status: 400 },
      );
    }

    console.log("Fetching product by ID:", id);

    const product = await wpsClient.getProductById(id);

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("WPS Product by ID API Error:", error);

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
