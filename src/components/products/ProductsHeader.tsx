// src/components/products/ProductsHeader.tsx
"use client";

import { Grid, List, SlidersHorizontal } from "lucide-react";

interface PaginationDisplay {
  start: number;
  end: number;
  total: number;
  currentPage: number;
  totalPages: number;
}

interface ProductsHeaderProps {
  vehicleString: string | null;
  paginationDisplay: PaginationDisplay;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  showPaginationInfo?: boolean; // New optional prop for cursor pagination
}

export default function ProductsHeader({
  vehicleString,
  paginationDisplay,
  viewMode,
  setViewMode,
  showFilters,
  setShowFilters,
  sortBy,
  onSortChange,
  showPaginationInfo = true, // Default to true for backwards compatibility
}: ProductsHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {vehicleString ? `Parts for ${vehicleString}` : "All Products"}
            </h1>
            <p className="text-gray-600 mt-1">
              {vehicleString
                ? "Compatible parts and accessories for your vehicle"
                : "Premium motorcycle parts and accessories"}
            </p>
            {/* Only show traditional pagination info if enabled */}
            {showPaginationInfo &&
              paginationDisplay.total > 0 &&
              paginationDisplay.start > 0 &&
              paginationDisplay.end > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  Showing {paginationDisplay.start}-{paginationDisplay.end} of{" "}
                  {paginationDisplay.total} products
                </p>
              )}
          </div>

          {/* Controls Row */}
          <div className="flex items-center gap-4">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="relevance">Sort by relevance</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name: A to Z</option>
              <option value="name_desc">Name: Z to A</option>
              <option value="created_at_desc">Newest First</option>
            </select>

            {/* View Toggle */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded transition-colors ${
                  viewMode === "grid"
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded transition-colors ${
                  viewMode === "list"
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
