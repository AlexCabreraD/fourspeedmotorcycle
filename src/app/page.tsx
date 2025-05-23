// src/app/page.tsx
import Hero from "@/components/home/Hero";
import VehicleSection from "@/components/home/VehicleSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import UniversalItemsSection from "@/components/home/UniversalItemsSection";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Search */}
      <Hero />

      {/* Vehicle Selection Section */}
      <VehicleSection />

      {/* Categories Section for Parts */}
      <CategoriesSection />

      {/* Universal Items Section (Clothing, Helmets, Accessories) */}
      <UniversalItemsSection />
    </main>
  );
}
