// src/components/products/ProductsPageContent.tsx
"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AlertCircle, Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/useWPS";
import { WPSProduct } from "@/lib/wps-client";
import ProductsHeader from "./ProductsHeader";
import ProductsFilters from "./ProductsFilters";
import ProductsGrid from "./ProductsGrid";
import PaginationControls from "./PaginationControls";

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
  const currentPage = parseInt(searchParams.get("page") || "1");

  // Use the paginated products hook
  const {
    data: products,
    loading,
    error,
    pagination,
    refetch,
    goToPage,
    nextPage,
    prevPage,
  } = useProducts({
    search: searchQuery,
    category: selectedCategory,
    brandId: selectedBrand,
    vehicleId: vehicleId || undefined,
    page: currentPage,
    limit: 24,
    sortBy: sortBy === "relevance" ? undefined : sortBy,
    sortOrder: sortBy.includes("_desc") ? "desc" : "asc",
  });

  // Helper function to safely calculate pagination display values
  const getPaginationDisplayValues = () => {
    // Return safe defaults if no pagination data or no products
    if (!pagination || !products || products.length === 0) {
      return {
        start: 0,
        end: 0,
        total: 0,
        currentPage: 1,
        totalPages: 1,
      };
    }

    // Ensure all required pagination properties exist and are valid numbers
    const currentPageNum = pagination.currentPage || 1;
    const itemsPerPageNum = pagination.itemsPerPage || 24;
    const totalItemsNum = pagination.totalItems || 0;

    if (totalItemsNum === 0) {
      return {
        start: 0,
        end: 0,
        total: 0,
        currentPage: currentPageNum,
        totalPages: pagination.totalPages || 1,
      };
    }

    const start = Math.max(1, (currentPageNum - 1) * itemsPerPageNum + 1);
    const end = Math.min(currentPageNum * itemsPerPageNum, totalItemsNum);

    return {
      start,
      end,
      total: totalItemsNum,
      currentPage: currentPageNum,
      totalPages: pagination.totalPages || 1,
    };
  };

  const paginationDisplay = getPaginationDisplayValues();

  // Update URL when pagination changes
  const updateURL = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    if (newPage > 1) {
      params.set("page", String(newPage));
    } else {
      params.delete("page");
    }
    router.push(`/products?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    updateURL(page);
    goToPage(page);
    // Scroll to top of results
    document.getElementById("products-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Reset to page 1 when searching
    updateURL(1);
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
    router.push("/products");
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    updateURL(1); // Reset to page 1 when sorting
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
    updateURL(1); // Reset to page 1 when filtering
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
                <ProductsGrid
                  products={products}
                  viewMode={viewMode}
                  vehicleString={vehicleString}
                  paginationDisplay={paginationDisplay}
                  onAddToCart={handleAddToCart}
                  onQuickView={handleQuickView}
                  onResetFilters={resetFilters}
                />

                {/* Pagination */}
                <PaginationControls
                  pagination={pagination}
                  onPageChange={handlePageChange}
                  onNextPage={nextPage}
                  onPrevPage={prevPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
