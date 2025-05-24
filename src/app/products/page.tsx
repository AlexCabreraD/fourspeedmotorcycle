// src/app/products/page.tsx
"use client";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import ProductsPageContent from "@/components/products/ProductsPageContent";

export default function ProductsPage() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-red-600" />
          </div>
        }
      >
        <ProductsPageContent />
      </Suspense>
    </>
  );
}
