// src/components/home/VehicleSelector.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Search, AlertCircle, Loader2 } from "lucide-react";
import {
  useVehicleMakes,
  useVehicleModels,
  useVehicleYears,
} from "@/hooks/useWPS";

export default function VehicleSelector() {
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // Fetch data using our hooks
  const {
    data: makes,
    loading: makesLoading,
    error: makesError,
  } = useVehicleMakes();
  const {
    data: models,
    loading: modelsLoading,
    error: modelsError,
  } = useVehicleModels(selectedMake);
  const {
    data: years,
    loading: yearsLoading,
    error: yearsError,
  } = useVehicleYears(selectedModel);

  // Reset dependent selections when parent changes
  useEffect(() => {
    setSelectedModel("");
    setSelectedYear("");
  }, [selectedMake]);

  useEffect(() => {
    setSelectedYear("");
  }, [selectedModel]);

  const handleSearch = () => {
    if (selectedMake && selectedModel && selectedYear) {
      // Find the selected vehicle data
      const selectedMakeData = makes?.find((make) => make.id === selectedMake);
      const selectedModelData = models?.find(
        (model) => model.id === selectedModel,
      );
      const selectedYearData = years?.find((year) => year.id === selectedYear);

      if (selectedMakeData && selectedModelData && selectedYearData) {
        // Construct vehicle search URL or handle the search
        const vehicleString = `${selectedYearData.year}-${selectedMakeData.name}-${selectedModelData.name}`;
        console.log("Searching for vehicle:", vehicleString);

        // Here you would typically navigate to a results page or trigger a search
        // For now, we'll just log it
        window.location.href = `/products?vehicle=${encodeURIComponent(vehicleString)}&vehicleId=${selectedYearData.id}`;
      }
    }
  };

  const isSearchDisabled = !selectedMake || !selectedModel || !selectedYear;
  const hasError = makesError || modelsError || yearsError;

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

        {/* Error Banner */}
        {hasError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Connection Error</span>
            </div>
            <p className="text-red-600 text-sm mt-1">
              Unable to load vehicle data. Please check your connection or try
              again later.
            </p>
          </div>
        )}

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
                  disabled={makesLoading || !!makesError}
                  className="w-full p-4 border-2 border-gray-200 bg-white text-gray-900 focus:border-red-500 focus:outline-none appearance-none cursor-pointer font-medium disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {makesLoading ? "Loading makes..." : "Select Make"}
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
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Model
              </label>
              <div className="relative">
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  disabled={!selectedMake || modelsLoading || !!modelsError}
                  className="w-full p-4 border-2 border-gray-200 bg-white text-gray-900 focus:border-red-500 focus:outline-none appearance-none cursor-pointer font-medium disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {!selectedMake
                      ? "Select Make First"
                      : modelsLoading
                        ? "Loading models..."
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
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Year
              </label>
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  disabled={!selectedModel || yearsLoading || !!yearsError}
                  className="w-full p-4 border-2 border-gray-200 bg-white text-gray-900 focus:border-red-500 focus:outline-none appearance-none cursor-pointer font-medium disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {!selectedModel
                      ? "Select Model First"
                      : yearsLoading
                        ? "Loading years..."
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
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 px-8 font-semibold transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            <Search className="w-5 h-5" />
            Find Compatible Parts
          </button>

          {/* Alternative Options */}
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600 mb-4">Don&#39;t see your vehicle?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="text-red-600 hover:text-red-700 font-semibold underline underline-offset-4"
              >
                Browse All Categories
              </a>
              <a
                href="/contact"
                className="text-red-600 hover:text-red-700 font-semibold underline underline-offset-4"
              >
                Contact Our Experts
              </a>
            </div>
          </div>

          {/* Debug Info (remove in production) */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-8 pt-8 border-t border-gray-200 text-xs text-gray-500">
              <p>Debug Info:</p>
              <p>Makes: {makes?.length || 0} loaded</p>
              <p>Models: {models?.length || 0} loaded</p>
              <p>Years: {years?.length || 0} loaded</p>
              <p>
                Selected:{" "}
                {selectedMake && selectedModel && selectedYear
                  ? "Ready"
                  : "Incomplete"}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
