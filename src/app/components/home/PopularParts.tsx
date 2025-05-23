// src/components/home/PopularParts.tsx
"use client";

import { ShoppingCart, Eye, Zap } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const popularParts = [
  {
    id: 1,
    name: "Akrapovič Evolution Titanium Exhaust",
    brand: "Akrapovič",
    price: 1299.99,
    originalPrice: 1499.99,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    inStock: true,
    isPopular: true,
  },
  {
    id: 2,
    name: "Öhlins TTX GP Rear Shock Absorber",
    brand: "Öhlins",
    price: 2199.99,
    image:
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=400&fit=crop",
    inStock: true,
    isPopular: true,
  },
  {
    id: 3,
    name: "Brembo GP4-RX Brake Calipers",
    brand: "Brembo",
    price: 899.99,
    image:
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop",
    inStock: true,
    isPopular: true,
  },
  {
    id: 4,
    name: "Rizoma Fluid Reservoir Mirror Caps",
    brand: "Rizoma",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    inStock: true,
    isPopular: false,
  },
  {
    id: 5,
    name: "K&N Performance Air Filter",
    brand: "K&N",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=400&fit=crop",
    inStock: true,
    isPopular: false,
  },
  {
    id: 6,
    name: "Motul 300V Racing Oil",
    brand: "Motul",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=400&h=400&fit=crop",
    inStock: true,
    isPopular: true,
  },
];

export default function PopularParts() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl">
            <Zap className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Popular Parts
            </h2>
            <p className="text-gray-600 text-lg">
              Top-selling performance parts this month
            </p>
          </div>
        </div>

        {/* Parts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {popularParts.map((part) => (
            <div
              key={part.id}
              className="group bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <img
                  src={part.image}
                  alt={part.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {part.isPopular && (
                    <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      POPULAR
                    </span>
                  )}
                  {part.inStock && (
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      IN STOCK
                    </span>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-10 h-10 bg-white/90 hover:bg-white rounded-xl flex items-center justify-center shadow-lg">
                    <Eye className="w-4 h-4 text-gray-700" />
                  </button>
                </div>

                {/* Sale Badge */}
                {part.originalPrice && (
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                      SALE
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Brand */}
                <div className="text-sm font-semibold text-red-600 mb-2 tracking-wide">
                  {part.brand}
                </div>

                {/* Name */}
                <h3 className="font-bold text-gray-900 text-lg mb-4 line-clamp-2 group-hover:text-red-600 transition-colors">
                  {part.name}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatCurrency(part.price)}
                  </span>
                  {part.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      {formatCurrency(part.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button className="w-full h-12 bg-gray-900 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="/products"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            View All Parts
          </a>
        </div>
      </div>
    </section>
  );
}
