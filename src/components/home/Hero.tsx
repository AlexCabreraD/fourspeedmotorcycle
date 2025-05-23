// src/components/home/Hero.tsx
import { Button } from "@/components/ui/Button";
import { Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-orange-400">4Speed</span>Motorcycle
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Your one-stop shop for motorcycle parts, gear, and accessories. Find
            exactly what fits your ride.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search parts, brands, or SKU..."
                className="w-full px-6 py-4 pr-14 text-gray-900 bg-white rounded-lg shadow-lg text-lg focus:outline-none focus:ring-4 focus:ring-orange-400/50"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-orange-500">
                <Search size={24} />
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
            >
              Shop by Vehicle
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3"
            >
              Browse Categories
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
