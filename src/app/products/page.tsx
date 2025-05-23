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
  ShoppingCart,
} from "lucide-react";
import { useProducts, useVehicleProducts } from "@/hooks/useWPS";
import { formatCurrency } from "@/lib/utils";
import Header from "@/components/layout/Header";

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Get vehicle info from URL if vehicle-specific search
  const vehicleId = searchParams.get("vehicleId");
  const vehicleString = searchParams.get("vehicle");

  // Use appropriate hook based on whether this is a vehicle-specific search
  const productsQuery = useProducts({
    search: searchQuery,
    category: selectedCategory,
    vehicleId: vehicleId || undefined,
    page: currentPage,
    limit: 24,
  });

  const vehicleProductsQuery = useVehicleProducts(vehicleId || undefined);

  // Choose which query result to use
  const {
    data: products,
    loading,
    error,
    refetch,
  } = vehicleId ? vehicleProductsQuery : productsQuery;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    // Update URL with search params
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedCategory) params.set("category", selectedCategory);
    if (vehicleId) params.set("vehicleId", vehicleId);
    if (vehicleString) params.set("vehicle", vehicleString);

    window.history.pushState({}, "", `/products?${params.toString()}`);
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

              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-600"}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-600"}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h3>

                {/* Search */}
                <form onSubmit={handleSearch} className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Products
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search parts..."
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
                <div className="mb-6">
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
                    <option value="engine">Engine & Performance</option>
                    <option value="suspension">Suspension & Handling</option>
                    <option value="brakes">Brakes & Safety</option>
                    <option value="body">Body & Styling</option>
                    <option value="electrical">Electrical & Lighting</option>
                    <option value="tools">Tools & Maintenance</option>
                  </select>
                </div>

                {/* Vehicle Info (if applicable) */}
                {vehicleString && (
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-medium text-red-900 mb-2">
                      Your Vehicle
                    </h4>
                    <p className="text-red-800 text-sm">{vehicleString}</p>
                    <button className="text-red-600 text-sm underline mt-2">
                      Change Vehicle
                    </button>
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
                  <p className="text-red-600">{error}</p>
                  <button
                    onClick={() => refetch()}
                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
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
                      {products.length} products found
                    </p>
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
                      <p className="text-gray-600">
                        Try adjusting your search or filters
                      </p>
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
                        <div
                          key={product.id}
                          className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 ${
                            viewMode === "list"
                              ? "flex gap-4 p-4"
                              : "overflow-hidden"
                          }`}
                        >
                          {/* Product Image */}
                          <div
                            className={`${viewMode === "list" ? "w-32 h-32 flex-shrink-0" : "aspect-square"} bg-gray-100 relative`}
                          >
                            {product.images && product.images.length > 0 ? (
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                No Image
                              </div>
                            )}

                            {/* Stock Badge */}
                            {product.inventory?.inStock && (
                              <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                In Stock
                              </span>
                            )}
                          </div>

                          {/* Product Info */}
                          <div
                            className={viewMode === "list" ? "flex-1" : "p-4"}
                          >
                            {/* Brand */}
                            {product.brand && (
                              <div className="text-sm text-red-600 font-semibold mb-1 uppercase tracking-wide">
                                {product.brand}
                              </div>
                            )}

                            {/* Name */}
                            <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-red-600 transition-colors cursor-pointer">
                              {product.name}
                            </h3>

                            {/* SKU */}
                            <p className="text-sm text-gray-500 mb-2">
                              SKU: {product.sku}
                            </p>

                            {/* Description */}
                            {product.description && (
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                {product.description}
                              </p>
                            )}

                            {/* Price and Add to Cart */}
                            <div
                              className={`flex items-center ${viewMode === "list" ? "justify-between" : "flex-col gap-2"}`}
                            >
                              <div className="text-2xl font-bold text-gray-900">
                                {formatCurrency(product.price)}
                              </div>

                              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium transition-colors flex items-center gap-2">
                                <ShoppingCart className="w-4 h-4" />
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
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
