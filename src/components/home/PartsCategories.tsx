// src/components/home/PartsCategories.tsx
"use client";

import {
  Wrench,
  Zap,
  Disc,
  Palette,
  Lightbulb,
  Settings,
  ArrowRight,
  Package,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Engine & Performance",
    description: "Exhaust, air filters, engine management",
    icon: Zap,
    itemCount: "2,400+ Items",
    href: "/products?category=engine",
    color: "bg-orange-500",
    lightColor: "bg-orange-50",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Brakes & Safety",
    description: "Brake pads, rotors, calipers, safety gear",
    icon: Disc,
    itemCount: "1,200+ Items",
    href: "/products?category=brakes",
    color: "bg-red-500",
    lightColor: "bg-red-50",
    image:
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Suspension & Handling",
    description: "Shocks, springs, steering components",
    icon: Settings,
    itemCount: "1,800+ Items",
    href: "/products?category=suspension",
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    image:
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Body & Styling",
    description: "Fairings, mirrors, grips, custom parts",
    icon: Palette,
    itemCount: "3,100+ Items",
    href: "/products?category=body",
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
    image:
      "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Electrical & Lighting",
    description: "LED lights, batteries, wiring, gauges",
    icon: Lightbulb,
    itemCount: "900+ Items",
    href: "/products?category=electrical",
    color: "bg-yellow-500",
    lightColor: "bg-yellow-50",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Tools & Maintenance",
    description: "Tools, oils, cleaners, repair kits",
    icon: Wrench,
    itemCount: "750+ Items",
    href: "/products?category=tools",
    color: "bg-gray-500",
    lightColor: "bg-gray-50",
    image:
      "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=400&fit=crop",
  },
];

export default function PartsCategories() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-900 rounded-xl">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Shop by Category
            </h2>
            <p className="text-gray-600 text-lg">
              Find exactly what you need for your ride
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isLarge = index === 0; // Make first category larger

            return (
              <a
                key={category.id}
                href={category.href}
                className={`group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                  isLarge ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                {/* Background Image */}
                <div className="relative h-48 lg:h-56 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Item Count Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                      {category.itemCount}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Icon and Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`flex items-center justify-center w-12 h-12 ${category.color} rounded-xl flex-shrink-0`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-500">
                      Browse Category
                    </span>
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-100 group-hover:bg-red-600 rounded-full transition-all duration-300">
                      <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">50K+</div>
              <div className="text-sm text-gray-600 font-medium">
                Parts Available
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-sm text-gray-600 font-medium">Brands</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-sm text-gray-600 font-medium">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">Free</div>
              <div className="text-sm text-gray-600 font-medium">
                Shipping $75+
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
