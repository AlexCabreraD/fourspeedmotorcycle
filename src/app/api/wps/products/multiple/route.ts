// src/app/api/wps/products/multiple/route.ts
import { NextRequest, NextResponse } from "next/server";
import { wpsClient } from "@/lib/wps-client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get("ids");

    if (!ids) {
      return NextResponse.json(
        { success: false, error: "Product IDs are required" },
        { status: 400 },
      );
    }

    const idArray = ids
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id);

    if (idArray.length === 0) {
      return NextResponse.json(
        { success: false, error: "Valid product IDs are required" },
        { status: 400 },
      );
    }

    console.log("Fetching multiple products:", idArray);

    const products = await wpsClient.getMultipleProducts(idArray);

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("WPS Multiple Products API Error:", error);

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
