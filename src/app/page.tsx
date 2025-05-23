// src/app/page.tsx
import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import VehicleSelector from "@/components/home/VehicleSelector";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <VehicleSelector />
        <FeaturedCategories />
        <FeaturedProducts />
        <WhyChooseUs />
        <Newsletter />
      </main>
    </>
  );
}
