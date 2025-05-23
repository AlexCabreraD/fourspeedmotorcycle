// src/components/home/VehicleSelector.tsx
"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

export default function VehicleSelector() {
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // Mock data - replace with WPS API data
  const makes = ["Honda", "Yamaha", "Kawasaki", "Suzuki", "Ducati", "BMW"];
  const models = ["CBR600RR", "CBR1000RR", "CRF450R", "Shadow", "Gold Wing"];
  const years = Array.from({ length: 25 }, (_, i) => 2024 - i);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Parts for Your Machine
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select your vehicle to discover compatible parts and accessories
            engineered for peak performance.
          </p>
        </div>

        {/* Vehicle Selector Card */}
        <div className="bg-white rounded-none shadow-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Make Selector */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Make
              </label>
              <div className="relative">
                <select
                  value={selectedMake}
                  onChange={(e) => setSelectedMake(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 bg-white text-gray-900 focus:border-red-500 focus:outline-none appearance-none cursor-pointer font-medium"
                >
                  <option value="">Select Make</option>
                  {makes.map((make) => (
                    <option key={make} value={make}>
                      {make}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Model Selector */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Model
              </label>
              <div className="relative">
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  disabled={!selectedMake}
                  className="w-full p-4 border-2 border-gray-200 bg-white text-gray-900 focus:border-red-500 focus:outline-none appearance-none cursor-pointer font-medium disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Select Model</option>
                  {selectedMake &&
                    models.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Year Selector */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Year
              </label>
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  disabled={!selectedModel}
                  className="w-full p-4 border-2 border-gray-200 bg-white text-gray-900 focus:border-red-500 focus:outline-none appearance-none cursor-pointer font-medium disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Select Year</option>
                  {selectedModel &&
                    years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Search Button */}
          <button
            disabled={!selectedMake || !selectedModel || !selectedYear}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 px-8 font-semibold transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            <Search className="w-5 h-5" />
            Find Compatible Parts
          </button>

          {/* Alternative Options */}
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600 mb-4">Don&#39;t see your vehicle?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="text-red-600 hover:text-red-700 font-semibold underline underline-offset-4">
                Browse All Categories
              </button>
              <button className="text-red-600 hover:text-red-700 font-semibold underline underline-offset-4">
                Contact Our Experts
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
