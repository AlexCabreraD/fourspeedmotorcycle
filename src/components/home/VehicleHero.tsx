// src/components/home/VehicleHero.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Search, Loader2, Wrench } from "lucide-react";
import {
  useVehicleMakes,
  useVehicleModels,
  useVehicleYears,
} from "@/hooks/useWPS";

export default function VehicleHero() {
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const { data: makes, loading: makesLoading } = useVehicleMakes();
  const { data: models, loading: modelsLoading } =
    useVehicleModels(selectedMake);
  const { data: years, loading: yearsLoading } = useVehicleYears(selectedModel);

  useEffect(() => {
    setSelectedModel("");
    setSelectedYear("");
  }, [selectedMake]);

  useEffect(() => {
    setSelectedYear("");
  }, [selectedModel]);

  const handleSearch = () => {
    if (selectedMake && selectedModel && selectedYear) {
      const selectedMakeData = makes?.find((make) => make.id === selectedMake);
      const selectedModelData = models?.find(
        (model) => model.id === selectedModel,
      );
      const selectedYearData = years?.find((year) => year.id === selectedYear);

      if (selectedMakeData && selectedModelData && selectedYearData) {
        const vehicleString = `${selectedYearData.year} ${selectedMakeData.name} ${selectedModelData.name}`;
        window.location.href = `/products?vehicle=${encodeURIComponent(vehicleString)}&vehicleId=${selectedYearData.id}`;
      }
    }
  };

  const isSearchDisabled = !selectedMake || !selectedModel || !selectedYear;

  return (
    <section className="bg-gradient-to-br from-slate-50 to-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-600 rounded-2xl mb-6">
              <Wrench className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
              Find Your <span className="text-red-600">Perfect Parts</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select your vehicle to discover compatible parts instantly
            </p>
          </div>

          {/* Vehicle Selector */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-8">
              {/* Make Selector */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 text-left">
                  MAKE
                </label>
                <div className="relative">
                  <select
                    value={selectedMake}
                    onChange={(e) => setSelectedMake(e.target.value)}
                    disabled={makesLoading}
                    className="w-full h-14 px-4 pr-10 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 font-medium focus:border-red-500 focus:bg-white focus:outline-none appearance-none transition-all disabled:opacity-50"
                  >
                    <option value="">
                      {makesLoading ? "Loading..." : "Select Make"}
                    </option>
                    {makes?.map((make) => (
                      <option key={make.id} value={make.id}>
                        {make.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    {makesLoading ? (
                      <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Model Selector */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 text-left">
                  MODEL
                </label>
                <div className="relative">
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    disabled={!selectedMake || modelsLoading}
                    className="w-full h-14 px-4 pr-10 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 font-medium focus:border-red-500 focus:bg-white focus:outline-none appearance-none transition-all disabled:opacity-50"
                  >
                    <option value="">
                      {!selectedMake
                        ? "Select Make First"
                        : modelsLoading
                          ? "Loading..."
                          : "Select Model"}
                    </option>
                    {selectedMake &&
                      models?.map((model) => (
                        <option key={model.id} value={model.id}>
                          {model.name}
                        </option>
                      ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    {modelsLoading ? (
                      <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Year Selector */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 text-left">
                  YEAR
                </label>
                <div className="relative">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    disabled={!selectedModel || yearsLoading}
                    className="w-full h-14 px-4 pr-10 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 font-medium focus:border-red-500 focus:bg-white focus:outline-none appearance-none transition-all disabled:opacity-50"
                  >
                    <option value="">
                      {!selectedModel
                        ? "Select Model First"
                        : yearsLoading
                          ? "Loading..."
                          : "Select Year"}
                    </option>
                    {selectedModel &&
                      years?.map((year) => (
                        <option key={year.id} value={year.id}>
                          {year.year}
                        </option>
                      ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    {yearsLoading ? (
                      <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              disabled={isSearchDisabled}
              className="w-full lg:w-auto lg:px-12 h-14 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              <Search className="w-5 h-5" />
              Find Compatible Parts
            </button>

            {/* Quick Browse */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-gray-500 text-sm mb-4">
                Or browse by category
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href="/products?category=brakes"
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Brakes
                </a>
                <a
                  href="/products?category=engine"
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Engine
                </a>
                <a
                  href="/products?category=suspension"
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Suspension
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
