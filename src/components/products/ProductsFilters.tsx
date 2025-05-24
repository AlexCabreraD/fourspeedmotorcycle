// src/components/products/ProductsFilters.tsx
"use client";

import { Filter, Search } from "lucide-react";

interface ProductsFiltersProps {
  showFilters: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  selectedBrand: string;
  vehicleString: string | null;
  onSearch: (e: React.FormEvent) => void;
  onFilterChange: (filterType: string, value: string) => void;
  onResetFilters: () => void;
  onNavigateToAllProducts: () => void;
}

export default function ProductsFilters({
  showFilters,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  selectedBrand,
  vehicleString,
  onSearch,
  onFilterChange,
  onResetFilters,
  onNavigateToAllProducts,
}: ProductsFiltersProps) {
  return (
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
            onClick={onResetFilters}
            className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors"
          >
            Clear All
          </button>
        </div>

        {/* Search */}
        <form onSubmit={onSearch}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Products
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search parts, SKU, brand..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors"
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
            onChange={(e) => onFilterChange("category", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
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
            <option value="Accessories">Accessories</option>
            <option value="Apparel">Apparel & Gear</option>
          </select>
        </div>

        {/* Brand Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand
          </label>
          <select
            value={selectedBrand}
            onChange={(e) => onFilterChange("brand", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
          >
            <option value="">All Brands</option>
            <option value="1">Akrapovič</option>
            <option value="2">Öhlins</option>
            <option value="3">Brembo</option>
            <option value="4">Rizoma</option>
            <option value="5">K&N</option>
            <option value="6">Motul</option>
            <option value="7">Yoshimura</option>
            <option value="8">Pro Circuit</option>
            <option value="9">FMF Racing</option>
            <option value="10">Twin Air</option>
          </select>
        </div>

        {/* Vehicle Info (if applicable) */}
        {vehicleString && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <h4 className="font-medium text-red-900 mb-2">Selected Vehicle</h4>
            <p className="text-red-800 text-sm mb-3">{vehicleString}</p>
            <p className="text-red-700 text-xs mb-3">
              Showing only compatible parts for your vehicle
            </p>
            <button
              onClick={onNavigateToAllProducts}
              className="text-red-600 text-sm underline hover:text-red-800 transition-colors"
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
              {selectedBrand && (
                <div className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                  Brand: Brand ID {selectedBrand}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick Tips */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Quick Tips:
          </h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Use specific part numbers for exact matches</li>
            <li>• Filter by category to narrow results</li>
            <li>• Select your vehicle for compatible parts only</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
