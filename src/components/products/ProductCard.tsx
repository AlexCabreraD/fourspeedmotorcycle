// src/components/products/ProductCard.tsx
"use client";

import { useState } from "react";
import {
  ShoppingCart,
  Eye,
  Package,
  AlertTriangle,
  ImageIcon,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { WPSProduct } from "@/lib/wps-client";

interface ProductCardProps {
  product: WPSProduct;
  viewMode?: "grid" | "list";
  showCompatibility?: boolean;
  vehicleCompatible?: boolean;
  onAddToCart?: (product: WPSProduct) => void;
  onQuickView?: (product: WPSProduct) => void;
}

export default function ProductCard({
  product,
  viewMode = "grid",
  showCompatibility = false,
  vehicleCompatible = true,
  onAddToCart,
  onQuickView,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleQuickView = () => {
    if (onQuickView) {
      onQuickView(product);
    }
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const isInStock = product.inventory?.inStock || false;
  const hasImages = product.images && product.images.length > 0 && !imageError;
  const displayPrice = product.price > 0 ? product.price : product.listPrice;
  const hasDiscount =
    product.listPrice && product.price > 0 && product.listPrice > product.price;

  // Fallback image component
  const ImageFallback = () => (
    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
      <ImageIcon className="w-8 h-8 mb-2" />
      <span className="text-xs">No Image</span>
    </div>
  );

  // Loading placeholder
  const ImageLoading = () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="animate-pulse bg-gray-200 w-full h-full flex items-center justify-center">
        <Package className="w-8 h-8 text-gray-300" />
      </div>
    </div>
  );

  return (
    <div
      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 group ${
        viewMode === "list" ? "flex gap-4 p-4" : "overflow-hidden"
      }`}
    >
      {/* Product Image */}
      <div
        className={`${
          viewMode === "list" ? "w-32 h-32 flex-shrink-0" : "aspect-square"
        } bg-gray-100 relative overflow-hidden rounded-lg`}
      >
        {hasImages && !imageError ? (
          <>
            {imageLoading && <ImageLoading />}
            <img
              src={product.images![0]}
              alt={product.name}
              className={`w-full h-full object-cover hover:scale-105 transition-transform duration-300 ${
                imageLoading ? "opacity-0" : "opacity-100"
              }`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading="lazy"
            />
          </>
        ) : (
          <ImageFallback />
        )}

        {/* Status Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isInStock ? (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              IN STOCK
            </span>
          ) : (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              OUT OF STOCK
            </span>
          )}

          {hasDiscount && (
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              SALE
            </span>
          )}

          {product.dropShipEligible && (
            <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              DROP SHIP
            </span>
          )}
        </div>

        {/* Vehicle Compatibility Badge */}
        {showCompatibility && (
          <div className="absolute top-2 right-2">
            {vehicleCompatible ? (
              <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                ✓ Fits
              </span>
            ) : (
              <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Check Fit
              </span>
            )}
          </div>
        )}

        {/* Quick Actions */}
        {viewMode === "grid" && (
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleQuickView}
              className="w-8 h-8 bg-white/90 hover:bg-white rounded-lg flex items-center justify-center shadow-lg"
              title="Quick View"
            >
              <Eye className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className={viewMode === "list" ? "flex-1" : "p-4"}>
        {/* Brand and Product Type */}
        <div className="flex items-center gap-2 mb-2">
          {product.brand && (
            <span className="text-sm font-semibold text-red-600 uppercase tracking-wide">
              {product.brand}
            </span>
          )}
          {product.productType && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {product.productType}
            </span>
          )}
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-red-600 transition-colors cursor-pointer">
          {product.name}
        </h3>

        {/* SKU */}
        <p className="text-sm text-gray-500 mb-2">SKU: {product.sku}</p>

        {/* Description */}
        {product.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Dimensions (if available) */}
        {product.dimensions && (
          <div className="text-xs text-gray-500 mb-3">
            {product.dimensions.weight && (
              <span>Weight: {product.dimensions.weight} lbs</span>
            )}
            {product.dimensions.length &&
              product.dimensions.width &&
              product.dimensions.height && (
                <span className="ml-2">
                  Dims: {product.dimensions.length}" ×{" "}
                  {product.dimensions.width}" × {product.dimensions.height}"
                </span>
              )}
          </div>
        )}

        {/* Price and Actions */}
        <div
          className={`flex items-center ${
            viewMode === "list" ? "justify-between" : "flex-col gap-3"
          }`}
        >
          {/* Price Section */}
          <div
            className={
              viewMode === "list" ? "flex items-center gap-3" : "w-full"
            }
          >
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">
                {displayPrice
                  ? formatCurrency(displayPrice)
                  : "Price on Request"}
              </span>
              {hasDiscount && product.listPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatCurrency(product.listPrice)}
                </span>
              )}
            </div>

            {/* MAPP Price Info */}
            {product.mappPrice && product.mappPrice > 0 && (
              <div className="text-xs text-blue-600 font-medium">
                MAP: {formatCurrency(product.mappPrice)}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div
            className={`flex gap-2 ${viewMode === "list" ? "flex-shrink-0" : "w-full"}`}
          >
            {viewMode === "list" && (
              <button
                onClick={handleQuickView}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors flex items-center gap-2"
                title="Quick View"
              >
                <Eye className="w-4 h-4" />
                View
              </button>
            )}

            <button
              onClick={handleAddToCart}
              disabled={!isInStock}
              className={`px-4 py-2 font-medium rounded-lg transition-colors flex items-center gap-2 ${
                viewMode === "list" ? "flex-shrink-0" : "flex-1"
              } ${
                isInStock
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              title={isInStock ? "Add to Cart" : "Out of Stock"}
            >
              <ShoppingCart className="w-4 h-4" />
              {isInStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>

        {/* Additional Product Info */}
        {viewMode === "grid" && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Status: {product.status}</span>
              {product.upc && <span>UPC: {product.upc}</span>}
            </div>

            {/* Show image count if multiple images */}
            {hasImages && product.images && product.images.length > 1 && (
              <div className="flex items-center gap-1 mt-1">
                <ImageIcon className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-400">
                  +{product.images.length - 1} more
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
