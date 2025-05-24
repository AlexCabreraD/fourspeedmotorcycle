// src/components/products/ProductsGrid.tsx
"use client";

import { Search } from "lucide-react";
import { WPSProduct } from "@/lib/wps-client";
import ProductCard from "./ProductCard";

interface PaginationDisplay {
  start: number;
  end: number;
  total: number;
  currentPage: number;
  totalPages: number;
}

interface ProductsGridProps {
  products: WPSProduct[];
  viewMode: "grid" | "list";
  vehicleString: string | null;
  paginationDisplay: PaginationDisplay;
  onAddToCart: (product: WPSProduct) => void;
  onQuickView: (product: WPSProduct) => void;
  onResetFilters: () => void;
}

export default function ProductsGrid({
  products,
  viewMode,
  vehicleString,
  paginationDisplay,
  onAddToCart,
  onQuickView,
  onResetFilters,
}: ProductsGridProps) {
  // Results Info
  const ResultsInfo = () => {
    // Don't show anything if we don't have valid pagination data
    if (
      paginationDisplay.total === 0 ||
      paginationDisplay.start === 0 ||
      paginationDisplay.end === 0
    ) {
      return null;
    }

    return (
      <div className="mb-6">
        <p className="text-gray-600">
          {vehicleString && (
            <span className="text-green-600 font-medium">
              {" "}
              compatible with your {vehicleString}
            </span>
          )}
        </p>
      </div>
    );
  };

  // Empty State
  if (products.length === 0) {
    return (
      <>
        <ResultsInfo />
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-600 mb-4">
            {vehicleString
              ? `No compatible parts found for your ${vehicleString}. Try browsing all products or adjusting your filters.`
              : "Try adjusting your search or filters to find what you're looking for."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onResetFilters}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Clear Filters
            </button>
            {vehicleString && (
              <a
                href="/products"
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                View All Products
              </a>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ResultsInfo />

      {/* Products Grid */}
      <div
        className={`grid gap-6 ${
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        {products.map((product) => (
          <div key={product.id} className="group">
            <ProductCard
              product={product}
              viewMode={viewMode}
              showCompatibility={!!vehicleString}
              vehicleCompatible={true} // TODO: Implement actual compatibility check
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          </div>
        ))}
      </div>

      {/* Results Summary */}
      {products.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            Displaying {products.length} products
            {vehicleString && (
              <span className="block mt-1 text-green-600 font-medium">
                All shown products are compatible with your {vehicleString}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}
