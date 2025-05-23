// src/components/home/UniversalItemsSection.tsx
"use client";

import { useState } from "react";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface UniversalItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

export default function UniversalItemsSection() {
  const [activeTab, setActiveTab] = useState("clothing");

  // Mock data - replace with actual API data
  const universalItems: Record<string, UniversalItem[]> = {
    clothing: [
      {
        id: "1",
        name: "Pro Racing Leather Jacket",
        brand: "Alpinestars",
        price: 299.99,
        originalPrice: 349.99,
        rating: 4.8,
        reviewCount: 124,
        image: "/api/placeholder/300/300",
        category: "Jackets",
        inStock: true,
        isBestseller: true,
      },
      {
        id: "2",
        name: "Waterproof Touring Pants",
        brand: "REV'IT!",
        price: 179.99,
        rating: 4.6,
        reviewCount: 89,
        image: "/api/placeholder/300/300",
        category: "Pants",
        inStock: true,
      },
      {
        id: "3",
        name: "Heated Gloves",
        brand: "Gerbing",
        price: 149.99,
        rating: 4.7,
        reviewCount: 67,
        image: "/api/placeholder/300/300",
        category: "Gloves",
        inStock: true,
        isNew: true,
      },
      {
        id: "4",
        name: "Racing Boots",
        brand: "SIDI",
        price: 399.99,
        rating: 4.9,
        reviewCount: 156,
        image: "/api/placeholder/300/300",
        category: "Boots",
        inStock: false,
      },
    ],
    helmets: [
      {
        id: "5",
        name: "Carbon Fiber Full Face",
        brand: "Shoei",
        price: 599.99,
        rating: 4.9,
        reviewCount: 203,
        image: "/api/placeholder/300/300",
        category: "Full Face",
        inStock: true,
        isBestseller: true,
      },
      {
        id: "6",
        name: "Modular Adventure Helmet",
        brand: "Arai",
        price: 549.99,
        rating: 4.8,
        reviewCount: 178,
        image: "/api/placeholder/300/300",
        category: "Modular",
        inStock: true,
      },
      {
        id: "7",
        name: "Lightweight Sport Helmet",
        brand: "AGV",
        price: 449.99,
        originalPrice: 499.99,
        rating: 4.7,
        reviewCount: 145,
        image: "/api/placeholder/300/300",
        category: "Sport",
        inStock: true,
        isNew: true,
      },
      {
        id: "8",
        name: "Retro Open Face",
        brand: "Bell",
        price: 199.99,
        rating: 4.5,
        reviewCount: 92,
        image: "/api/placeholder/300/300",
        category: "Open Face",
        inStock: true,
      },
    ],
    accessories: [
      {
        id: "9",
        name: "Tank Bag",
        brand: "SW-MOTECH",
        price: 89.99,
        rating: 4.6,
        reviewCount: 76,
        image: "/api/placeholder/300/300",
        category: "Luggage",
        inStock: true,
      },
      {
        id: "10",
        name: "Phone Mount",
        brand: "RAM Mounts",
        price: 34.99,
        rating: 4.8,
        reviewCount: 234,
        image: "/api/placeholder/300/300",
        category: "Electronics",
        inStock: true,
        isBestseller: true,
      },
      {
        id: "11",
        name: "Chain Cleaning Kit",
        brand: "Motul",
        price: 24.99,
        rating: 4.7,
        reviewCount: 167,
        image: "/api/placeholder/300/300",
        category: "Maintenance",
        inStock: true,
      },
      {
        id: "12",
        name: "LED Light Bar",
        brand: "Denali",
        price: 159.99,
        rating: 4.5,
        reviewCount: 89,
        image: "/api/placeholder/300/300",
        category: "Lighting",
        inStock: true,
        isNew: true,
      },
    ],
  };

  const tabs = [
    {
      id: "clothing",
      label: "Riding Gear",
      count: universalItems.clothing.length,
    },
    { id: "helmets", label: "Helmets", count: universalItems.helmets.length },
    {
      id: "accessories",
      label: "Accessories",
      count: universalItems.accessories.length,
    },
  ];

  const currentItems = universalItems[activeTab] || [];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Universal Items
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Quality gear and accessories that work with any motorcycle.
            Essential items every rider needs.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-xl p-2 shadow-lg">
            <div className="flex space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === tab.id
                      ? "bg-orange-500 text-white shadow-md"
                      : "text-gray-600 hover:text-orange-600"
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 text-sm opacity-75">({tab.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 space-y-1">
                  {item.isNew && (
                    <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                      NEW
                    </span>
                  )}
                  {item.isBestseller && (
                    <span className="px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
                      BESTSELLER
                    </span>
                  )}
                  {item.originalPrice && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                      SALE
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                  <Heart className="h-4 w-4 text-gray-600" />
                </button>

                {/* Stock Status */}
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2">
                  <p className="text-sm text-gray-500">{item.brand}</p>
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {item.name}
                  </h3>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(item.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    ({item.reviewCount})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">
                      ${item.price.toFixed(2)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                  disabled={!item.inStock}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {item.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            View All {tabs.find((tab) => tab.id === activeTab)?.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
