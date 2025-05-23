// src/components/home/FeaturedCategories.tsx
"use client";

import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Engine & Performance",
    description: "High-performance parts to maximize your machine's potential",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    itemCount: "2,400+ Items",
  },
  {
    id: 2,
    name: "Suspension & Handling",
    description:
      "Professional-grade suspension components for superior control",
    image:
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=300&fit=crop",
    itemCount: "1,800+ Items",
  },
  {
    id: 3,
    name: "Brakes & Safety",
    description: "Premium braking systems engineered for maximum safety",
    image:
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop",
    itemCount: "1,200+ Items",
  },
  {
    id: 4,
    name: "Body & Styling",
    description: "Custom styling parts to make your ride uniquely yours",
    image:
      "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=400&h=300&fit=crop",
    itemCount: "3,100+ Items",
  },
  {
    id: 5,
    name: "Electrical & Lighting",
    description: "Advanced electrical components and LED lighting systems",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    itemCount: "900+ Items",
  },
  {
    id: 6,
    name: "Tools & Maintenance",
    description: "Professional tools and maintenance supplies for your garage",
    image:
      "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop",
    itemCount: "750+ Items",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover premium parts and accessories organized for your
            convenience. Each category features professionally curated
            selections.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Item Count Badge */}
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 text-sm font-semibold">
                  {category.itemCount}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {category.description}
                </p>

                {/* CTA */}
                <button className="flex items-center gap-2 text-red-600 font-semibold group-hover:gap-3 transition-all duration-300">
                  Shop Category
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-gray-900 hover:bg-red-600 text-white px-8 py-4 font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto">
            View All Categories
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
