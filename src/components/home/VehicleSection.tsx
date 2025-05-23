// src/components/home/VehicleSection.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ChevronDown, Wrench, Search } from "lucide-react";

export default function VehicleSection() {
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // Mock data - replace with actual WPS API calls
  const makes = ["Honda", "Yamaha", "Kawasaki", "Suzuki", "Ducati", "BMW"];
  const models = selectedMake
    ? ["CBR600RR", "CBR1000RR", "CB650R", "CRF450R"]
    : [];
  const years = selectedModel ? [2024, 2023, 2022, 2021, 2020] : [];

  const handleShopByVehicle = () => {
    if (selectedMake && selectedModel && selectedYear) {
      // Navigate to vehicle-specific product page
      console.log(
        `Shopping for ${selectedYear} ${selectedMake} ${selectedModel}`,
      );
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Wrench className="h-8 w-8 text-orange-500 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Shop by Your Vehicle
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find parts that fit your exact motorcycle. Select your bike below to
            see compatible products.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Make Selector */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Make
                </label>
                <div className="relative">
                  <select
                    value={selectedMake}
                    onChange={(e) => {
                      setSelectedMake(e.target.value);
                      setSelectedModel("");
                      setSelectedYear("");
                    }}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none cursor-pointer"
                  >
                    <option value="">Select Make</option>
                    {makes.map((make) => (
                      <option key={make} value={make}>
                        {make}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Model Selector */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Model
                </label>
                <div className="relative">
                  <select
                    value={selectedModel}
                    onChange={(e) => {
                      setSelectedModel(e.target.value);
                      setSelectedYear("");
                    }}
                    disabled={!selectedMake}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Model</option>
                    {models.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Year Selector */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Year
                </label>
                <div className="relative">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    disabled={!selectedModel}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Selected Vehicle Display */}
            {selectedMake && selectedModel && selectedYear && (
              <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-orange-800 text-center font-semibold">
                  Selected:{" "}
                  <span className="font-bold">
                    {selectedYear} {selectedMake} {selectedModel}
                  </span>
                </p>
              </div>
            )}

            {/* Action Button */}
            <div className="text-center">
              <Button
                onClick={handleShopByVehicle}
                disabled={!selectedMake || !selectedModel || !selectedYear}
                size="lg"
                className="px-12 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Search className="mr-2 h-5 w-5" />
                Find Compatible Parts
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Don't see your bike? Browse by popular categories:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Sport Bikes",
                "Cruisers",
                "Dirt Bikes",
                "Touring",
                "Street",
              ].map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-full hover:border-orange-500 hover:text-orange-600 transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
