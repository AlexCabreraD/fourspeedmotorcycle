// src/app/page.tsx
import Header from "@/components/layout/Header";
import VehicleHero from "@/components/home/VehicleHero";
import PopularParts from "@/components/home/PopularParts";
import PartsCategories from "@/components/home/PartsCategories";
import FeaturedBrands from "@/components/home/FeaturedBrands";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <VehicleHero />
        <PopularParts />
        <PartsCategories />
        <FeaturedBrands />
      </main>
    </>
  );
}
