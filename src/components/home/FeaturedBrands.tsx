// src/components/home/FeaturedBrands.tsx
"use client";

import { Star, ArrowRight } from "lucide-react";

const brands = [
  {
    id: 1,
    name: "Akrapovič",
    logo: "https://via.placeholder.com/120x60/dc2626/ffffff?text=Akrapovič",
    description: "Premium exhaust systems",
    partCount: "1,200+ parts",
    href: "/brands/akrapovic",
    featured: true,
  },
  {
    id: 2,
    name: "Öhlins",
    logo: "https://via.placeholder.com/120x60/fbbf24/000000?text=Öhlins",
    description: "Suspension technology",
    partCount: "800+ parts",
    href: "/brands/ohlins",
    featured: true,
  },
  {
    id: 3,
    name: "Brembo",
    logo: "https://via.placeholder.com/120x60/dc2626/ffffff?text=Brembo",
    description: "Braking systems",
    partCount: "950+ parts",
    href: "/brands/brembo",
    featured: true,
  },
  {
    id: 4,
    name: "Rizoma",
    logo: "https://via.placeholder.com/120x60/1f2937/ffffff?text=Rizoma",
    description: "Styling & accessories",
    partCount: "650+ parts",
    href: "/brands/rizoma",
    featured: false,
  },
  {
    id: 5,
    name: "K&N",
    logo: "https://via.placeholder.com/120x60/dc2626/ffffff?text=K%26N",
    description: "Air filtration",
    partCount: "400+ parts",
    href: "/brands/kn",
    featured: false,
  },
  {
    id: 6,
    name: "Motul",
    logo: "https://via.placeholder.com/120x60/3b82f6/ffffff?text=Motul",
    description: "Lubricants & oils",
    partCount: "300+ parts",
    href: "/brands/motul",
    featured: false,
  },
];

export default function FeaturedBrands() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-xl">
            <Star className="w-6 h-6 text-yellow-600 fill-current" />
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Trusted Brands
            </h2>
            <p className="text-gray-600 text-lg">
              Premium parts from industry leaders
            </p>
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {brands.map((brand) => (
            <a
              key={brand.id}
              href={brand.href}
              className="group relative bg-white border-2 border-gray-100 hover:border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg text-center"
            >
              {/* Featured Badge */}
              {brand.featured && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                  <Star className="w-3 h-3 text-white fill-current" />
                </div>
              )}

              {/* Brand Logo */}
              <div className="mb-4">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-12 object-contain mx-auto opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Brand Info */}
              <div>
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                  {brand.name}
                </h3>
                <p className="text-xs text-gray-500 mb-2">
                  {brand.description}
                </p>
                <p className="text-xs font-semibold text-gray-700">
                  {brand.partCount}
                </p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl -z-10" />
            </a>
          ))}
        </div>

        {/* View All Brands */}
        <div className="text-center">
          <a
            href="/brands"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-red-600 text-white px-8 py-4 font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            View All Brands
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Brand Promise */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Only Authentic Parts
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              We work directly with manufacturers to ensure every part is
              genuine. All products come with full warranty coverage and our
              guarantee of authenticity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
