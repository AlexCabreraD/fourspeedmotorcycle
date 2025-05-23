// src/components/home/CategoriesSection.tsx
import {
  Wrench,
  Zap,
  Fuel,
  Settings,
  Shield,
  Disc,
  Gauge,
  Wind,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  itemCount: number;
  image?: string;
}

export default function CategoriesSection() {
  const categories: Category[] = [
    {
      id: "engine",
      name: "Engine Parts",
      description: "Pistons, gaskets, filters, and more",
      icon: <Settings className="h-8 w-8" />,
      itemCount: 1250,
    },
    {
      id: "electrical",
      name: "Electrical",
      description: "Batteries, ignition, lighting systems",
      icon: <Zap className="h-8 w-8" />,
      itemCount: 890,
    },
    {
      id: "fuel",
      name: "Fuel System",
      description: "Carburetors, fuel pumps, injectors",
      icon: <Fuel className="h-8 w-8" />,
      itemCount: 650,
    },
    {
      id: "brakes",
      name: "Brakes",
      description: "Pads, rotors, brake lines, fluid",
      icon: <Disc className="h-8 w-8" />,
      itemCount: 420,
    },
    {
      id: "suspension",
      name: "Suspension",
      description: "Shocks, springs, fork components",
      icon: <Gauge className="h-8 w-8" />,
      itemCount: 340,
    },
    {
      id: "exhaust",
      name: "Exhaust",
      description: "Headers, mufflers, performance systems",
      icon: <Wind className="h-8 w-8" />,
      itemCount: 280,
    },
    {
      id: "tools",
      name: "Tools & Shop",
      description: "Specialty tools, maintenance supplies",
      icon: <Wrench className="h-8 w-8" />,
      itemCount: 520,
    },
    {
      id: "protection",
      name: "Protection",
      description: "Guards, covers, crash protection",
      icon: <Shield className="h-8 w-8" />,
      itemCount: 180,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our extensive catalog of motorcycle parts and accessories
            organized by system.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-orange-300 transition-all duration-300 cursor-pointer"
            >
              {/* Icon */}
              <div className="mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  {category.icon}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
                <p className="text-sm font-medium text-orange-600">
                  {category.itemCount.toLocaleString()} items
                </p>
              </div>

              {/* Hover Arrow */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:border-orange-500 hover:text-orange-600 transition-colors">
            View All Categories
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
