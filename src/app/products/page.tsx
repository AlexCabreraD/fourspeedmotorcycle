// src/app/products/page.tsx
"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  Grid,
  List,
  AlertCircle,
  Loader2,
  SlidersHorizontal,
} from "lucide-react";
import { useProducts } from "@/hooks/useWPS";
import { WPSProduct } from "@/lib/wps-client";
import Header from "@/components/layout/Header";
import ProductCard from "@/components/products/ProductCard";

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "",
  );
  const [selectedBrand, setSelectedBrand] = useState(
    searchParams.get("brand") || "",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Get vehicle info from URL if vehicle-specific search
  const vehicleId = searchParams.get("vehicleId");
  const vehicleString = searchParams.get("vehicle");

  const {
    data: products,
    loading,
    error,
    refetch,
  } = useProducts({
    search: searchQuery,
    category: selectedCategory,
    brandId: selectedBrand,
    vehicleId: vehicleId || undefined,
    page: currentPage,
    limit: 24,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
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
    setCurrentPage(1);
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
                      setCurrentPage(1);
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
                      onClick={() => (window.location.href = "/products")}
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
            <div className="flex-1">
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
                  {/* Results Info */}
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-600">
                      Showing {products.length} products
                      {vehicleString && (
                        <span className="text-green-600 font-medium">
                          {" "}
                          compatible with your {vehicleString}
                        </span>
                      )}
                    </p>

                    {/* Sort Options */}
                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                      <option>Sort by relevance</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Name: A to Z</option>
                      <option>Brand</option>
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
                  )}

                  {/* Pagination */}
                  {products.length > 0 && (
                    <div className="mt-12 flex justify-center">
                      <div className="flex items-center gap-2">
                        <button
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage(currentPage - 1)}
                          className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                          Previous
                        </button>
                        <span className="px-4 py-2 text-gray-600">
                          Page {currentPage}
                        </span>
                        <button
                          onClick={() => setCurrentPage(currentPage + 1)}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          Next
                        </button>
                      </div>
                    </div>
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
