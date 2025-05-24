// src/components/products/ProductsPageContent.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AlertCircle, Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/useWPS";
import { WPSProduct } from "@/lib/wps-client";
import ProductsHeader from "./ProductsHeader";
import ProductsFilters from "./ProductsFilters";
import ProductsGrid from "./ProductsGrid";
import CursorPaginationControls from "./CursorPaginationControls";

export default function ProductsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "",
  );
  const [selectedBrand, setSelectedBrand] = useState(
    searchParams.get("brand") || "",
  );
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Get vehicle info from URL if vehicle-specific search
  const vehicleId = searchParams.get("vehicleId");
  const vehicleString = searchParams.get("vehicle");

  // Use the cursor-based products hook
  const {
    data: products,
    loading,
    error,
    cursor,
    refetch,
    goToNextPage,
    goToPrevPage,
    goToFirstPage,
    resetPagination,
    productCount,
    isEmpty,
  } = useProducts({
    search: searchQuery,
    category: selectedCategory,
    brandId: selectedBrand,
    vehicleId: vehicleId || undefined,
    pageSize: 24,
    sortBy: sortBy === "relevance" ? undefined : sortBy,
    sortOrder: sortBy.includes("_desc") ? "desc" : "asc",
  });

  // Reset pagination when filters change significantly
  useEffect(() => {
    resetPagination();
  }, [searchQuery, selectedCategory, selectedBrand, vehicleId, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    resetPagination();
    refetch();
  };

  const handleAddToCart = (product: WPSProduct) => {
    console.log("Adding to cart:", product);
    // TODO: Implement cart functionality
  };

  const handleQuickView = (product: WPSProduct) => {
    console.log("Quick view:", product);
    // TODO: Implement quick view modal
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedBrand("");
    setSortBy("relevance");
    resetPagination();
    router.push("/products");
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    resetPagination(); // Reset to first page when sorting
  };

  const handleFilterChange = (filterType: string, value: string) => {
    switch (filterType) {
      case "category":
        setSelectedCategory(value);
        break;
      case "brand":
        setSelectedBrand(value);
        break;
    }
    resetPagination(); // Reset to first page when filtering
  };

  const handlePageNavigation = (action: () => void) => {
    action();
    // Scroll to top of results
    document.getElementById("products-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // Create pagination display data for header
  const paginationDisplay = {
    start: products && products.length > 0 ? 1 : 0,
    end: productCount,
    total: productCount, // We don't know total with cursor pagination
    currentPage: cursor?.current ? 1 : 1, // We don't have page numbers with cursors
    totalPages: 1, // We don't know total pages with cursor pagination
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <ProductsHeader
        vehicleString={vehicleString}
        paginationDisplay={paginationDisplay}
        viewMode={viewMode}
        setViewMode={setViewMode}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        showPaginationInfo={false} // Disable traditional pagination info
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <ProductsFilters
            showFilters={showFilters}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            selectedBrand={selectedBrand}
            vehicleString={vehicleString}
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onResetFilters={resetFilters}
            onNavigateToAllProducts={() => router.push("/products")}
          />

          {/* Main Content */}
          <div className="flex-1" id="products-section">
            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-red-600" />
                <span className="ml-2 text-gray-600">Loading products...</span>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center gap-2 text-red-700 mb-2">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">Error Loading Products</span>
                </div>
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={() => refetch()}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Products Grid/List */}
            {!loading && !error && products && (
              <>
                {/* Current Page Results Info */}
                {productCount > 0 && (
                  <div className="mb-6">
                    <p className="text-gray-600">
                      Showing {productCount} products on this page
                      {vehicleString && (
                        <span className="text-green-600 font-medium">
                          {" "}
                          compatible with your {vehicleString}
                        </span>
                      )}
                    </p>
                    {cursor && (cursor.next || cursor.prev) && (
                      <p className="text-sm text-gray-500 mt-1">
                        {cursor.prev
                          ? "Previous pages available"
                          : "First page"}{" "}
                        • {cursor.next ? "More results available" : "Last page"}
                      </p>
                    )}
                  </div>
                )}

                <ProductsGrid
                  products={products}
                  viewMode={viewMode}
                  vehicleString={vehicleString}
                  paginationDisplay={paginationDisplay}
                  onAddToCart={handleAddToCart}
                  onQuickView={handleQuickView}
                  onResetFilters={resetFilters}
                />

                {/* Cursor-based Pagination */}
                <CursorPaginationControls
                  cursor={cursor}
                  loading={loading}
                  currentCount={productCount}
                  onNextPage={() => handlePageNavigation(goToNextPage)}
                  onPrevPage={() => handlePageNavigation(goToPrevPage)}
                  onFirstPage={() => handlePageNavigation(goToFirstPage)}
                  showFirstPageButton={true}
                />
              </>
            )}

            {/* Empty State */}
            {!loading && !error && isEmpty && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <AlertCircle className="w-12 h-12 mx-auto" />
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
                    onClick={resetFilters}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
