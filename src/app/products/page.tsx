// src/app/products/page.tsx
"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  Filter,
  Grid,
  List,
  AlertCircle,
  Loader2,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import { useProducts } from "@/hooks/useWPS";
import { WPSProduct } from "@/lib/wps-client";
import Header from "@/components/layout/Header";
import ProductCard from "@/components/products/ProductCard";

function ProductsPageContent() {
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
    page: parseInt(searchParams.get("page") || "1"),
    limit: 24,
    sortBy: sortBy === "relevance" ? undefined : sortBy,
    sortOrder: sortBy.includes("_desc") ? "desc" : "asc",
  });

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

  // Pagination component
  const PaginationControls = () => {
    if (!pagination || pagination.totalPages <= 1) return null;

    const { currentPage, totalPages, hasNextPage, hasPrevPage } = pagination;

    // Generate page numbers to show
    const getPageNumbers = () => {
      const pages = [];
      const maxVisible = 7;

      if (totalPages <= maxVisible) {
        // Show all pages
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Smart pagination
        if (currentPage <= 4) {
          // Show first pages
          for (let i = 1; i <= 5; i++) {
            pages.push(i);
          }
          pages.push("...");
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 3) {
          // Show last pages
          pages.push(1);
          pages.push("...");
          for (let i = totalPages - 4; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          // Show middle pages
          pages.push(1);
          pages.push("...");
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i);
          }
          pages.push("...");
          pages.push(totalPages);
        }
      }

      return pages;
    };

    return (
      <div className="flex items-center justify-center space-x-2 mt-8">
        {/* Previous Button */}
        <button
          onClick={prevPage}
          disabled={!hasPrevPage}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() =>
                typeof page === "number" ? handlePageChange(page) : undefined
              }
              disabled={page === "..."}
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                page === currentPage
                  ? "bg-red-600 text-white"
                  : page === "..."
                    ? "cursor-default"
                    : "border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {page === "..." ? <MoreHorizontal className="w-4 h-4" /> : page}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextPage}
          disabled={!hasNextPage}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {vehicleString
                    ? `Parts for ${vehicleString}`
                    : "All Products"}
                </h1>
                <p className="text-gray-600 mt-1">
                  {vehicleString
                    ? "Compatible parts and accessories for your vehicle"
                    : "Premium motorcycle parts and accessories"}
                </p>
                {pagination && (
                  <p className="text-sm text-gray-500 mt-2">
                    Showing{" "}
                    {(pagination.currentPage - 1) * pagination.itemsPerPage + 1}
                    -
                    {Math.min(
                      pagination.currentPage * pagination.itemsPerPage,
                      pagination.totalItems,
                    )}{" "}
                    of {pagination.totalItems} products
                  </p>
                )}
              </div>

              {/* View Toggle and Filters */}
              <div className="flex items-center gap-4">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>

                {/* View Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${
                      viewMode === "grid"
                        ? "bg-red-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${
                      viewMode === "list"
                        ? "bg-red-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div
              className={`lg:w-64 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}
            >
              <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filters
                  </h3>
                  <button
                    onClick={resetFilters}
                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    Clear All
                  </button>
                </div>

                {/* Search */}
                <form onSubmit={handleSearch}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Products
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search parts, SKU, brand..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                </form>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      updateURL(1); // Reset to page 1
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">All Categories</option>
                    <option value="Engine">Engine & Performance</option>
                    <option value="Suspension">Suspension & Handling</option>
                    <option value="Brakes">Brakes & Safety</option>
                    <option value="Body">Body & Styling</option>
                    <option value="Electrical">Electrical & Lighting</option>
                    <option value="Tools">Tools & Maintenance</option>
                    <option value="Exhaust">Exhaust Systems</option>
                    <option value="Filtration">Filtration</option>
                  </select>
                </div>

                {/* Vehicle Info (if applicable) */}
                {vehicleString && (
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-medium text-red-900 mb-2">
                      Selected Vehicle
                    </h4>
                    <p className="text-red-800 text-sm mb-3">{vehicleString}</p>
                    <button
                      onClick={() => router.push("/products")}
                      className="text-red-600 text-sm underline hover:text-red-800"
                    >
                      View All Products
                    </button>
                  </div>
                )}

                {/* Active filters summary */}
                {(searchQuery || selectedCategory || selectedBrand) && (
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Active Filters:
                    </h4>
                    <div className="space-y-1">
                      {searchQuery && (
                        <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Search: {searchQuery}
                        </div>
                      )}
                      {selectedCategory && (
                        <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Category: {selectedCategory}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1" id="products-section">
              {/* Loading State */}
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-red-600" />
                  <span className="ml-2 text-gray-600">
                    Loading products...
                  </span>
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
                  {/* Results Info and Sort */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      {pagination && (
                        <p className="text-gray-600">
                          Showing{" "}
                          {(pagination.currentPage - 1) *
                            pagination.itemsPerPage +
                            1}
                          -
                          {Math.min(
                            pagination.currentPage * pagination.itemsPerPage,
                            pagination.totalItems,
                          )}{" "}
                          of {pagination.totalItems} products
                          {vehicleString && (
                            <span className="text-green-600 font-medium">
                              {" "}
                              compatible with your {vehicleString}
                            </span>
                          )}
                        </p>
                      )}
                    </div>

                    {/* Sort Options */}
                    <select
                      value={sortBy}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="relevance">Sort by relevance</option>
                      <option value="price_asc">Price: Low to High</option>
                      <option value="price_desc">Price: High to Low</option>
                      <option value="name_asc">Name: A to Z</option>
                      <option value="name_desc">Name: Z to A</option>
                      <option value="created_at_desc">Newest First</option>
                    </select>
                  </div>

                  {/* Products */}
                  {products.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <Search className="w-12 h-12 mx-auto" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No products found
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Try adjusting your search or filters
                      </p>
                      <button
                        onClick={resetFilters}
                        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Clear Filters
                      </button>
                    </div>
                  ) : (
                    <>
                      <div
                        className={`grid gap-6 ${
                          viewMode === "grid"
                            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                            : "grid-cols-1"
                        }`}
                      >
                        {products.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            viewMode={viewMode}
                            showCompatibility={!!vehicleString}
                            vehicleCompatible={true} // TODO: Implement actual compatibility check
                            onAddToCart={handleAddToCart}
                            onQuickView={handleQuickView}
                          />
                        ))}
                      </div>

                      {/* Pagination */}
                      <PaginationControls />
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-red-600" />
        </div>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
}
