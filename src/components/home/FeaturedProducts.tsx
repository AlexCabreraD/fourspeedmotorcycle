// src/components/home/FeaturedProducts.tsx
"use client";

import { Star, ShoppingCart, Eye } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const featuredProducts = [
  {
    id: 1,
    name: "Akrapovič Evolution Titanium Exhaust System",
    brand: "Akrapovič",
    price: 1299.99,
    originalPrice: 1499.99,
    rating: 4.9,
    reviews: 127,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    badge: "Best Seller",
    inStock: true,
    fitsVehicles: ["Honda CBR1000RR", "Yamaha R1", "Kawasaki ZX-10R"],
  },
  {
    id: 2,
    name: "Öhlins TTX GP Rear Shock Absorber",
    brand: "Öhlins",
    price: 2199.99,
    rating: 5.0,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=400&fit=crop",
    badge: "Professional Grade",
    inStock: true,
    fitsVehicles: ["Ducati Panigale V4", "BMW S1000RR"],
  },
  {
    id: 3,
    name: "Brembo GP4-RX Brake Calipers",
    brand: "Brembo",
    price: 899.99,
    rating: 4.8,
    reviews: 203,
    image:
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop",
    badge: "Track Proven",
    inStock: true,
    fitsVehicles: ["Multiple Models"],
  },
  {
    id: 4,
    name: "Rizoma Fluid Reservoir Mirror Caps",
    brand: "Rizoma",
    price: 149.99,
    rating: 4.7,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    badge: "New Arrival",
    inStock: true,
    fitsVehicles: ["Honda CBR600RR", "Yamaha R6"],
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hand-selected premium parts from the world's leading manufacturers.
            Each product is verified for quality and performance.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-none shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Badge */}
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-sm font-semibold">
                  {product.badge}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors">
                    <Eye className="w-4 h-4 text-gray-700" />
                  </button>
                </div>

                {/* Stock Status */}
                <div className="absolute bottom-4 left-4">
                  <span className="bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
                    In Stock
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Brand */}
                <div className="text-sm text-red-600 font-semibold mb-1 uppercase tracking-wide">
                  {product.brand}
                </div>

                {/* Product Name */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Vehicle Compatibility */}
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-1">Fits:</div>
                  <div className="text-xs text-gray-700 font-medium">
                    {product.fitsVehicles.join(", ")}
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-gray-900">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-gray-900 hover:bg-red-600 text-white px-8 py-4 font-semibold transition-all duration-300 transform hover:scale-105">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
