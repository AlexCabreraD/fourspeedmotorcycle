// src/components/layout/Header.tsx
"use client";

import { useState } from "react";
import { Search, ShoppingCart, User, Menu, X, Phone } from "lucide-react";

const navigation = [
  {
    name: "Shop by Vehicle",
    href: "/vehicles",
    featured: true,
  },
  {
    name: "Engine & Performance",
    href: "/products?category=engine",
  },
  {
    name: "Brakes & Safety",
    href: "/products?category=brakes",
  },
  {
    name: "Suspension",
    href: "/products?category=suspension",
  },
  {
    name: "Body & Styling",
    href: "/products?category=body",
  },
  {
    name: "Electrical",
    href: "/products?category=electrical",
  },
  {
    name: "Tools",
    href: "/products?category=tools",
  },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-sm">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>(801) 555-0123</span>
              </div>
              <span className="hidden md:block">
                Free shipping on orders $75+ • Same day shipping before 2PM
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <a
                href="/track-order"
                className="hover:text-red-400 transition-colors"
              >
                Track Order
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 text-white font-bold text-lg flex items-center justify-center rounded-lg">
                4S
              </div>
              <div>
                <div className="font-bold text-xl text-gray-900">
                  4SpeedMotorcycle
                </div>
              </div>
            </a>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search parts, SKU, or brand..."
                className="w-full h-12 px-4 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:border-red-500 focus:bg-white focus:outline-none text-gray-900 font-medium placeholder-gray-500"
              />
              <button className="absolute right-0 top-0 h-12 px-4 bg-red-600 hover:bg-red-700 text-white rounded-r-xl transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Mobile Search */}
            <button className="lg:hidden p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-gray-50">
              <Search className="w-6 h-6" />
            </button>

            {/* Account */}
            <a
              href="/account"
              className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-gray-50"
            >
              <User className="w-6 h-6" />
            </a>

            {/* Cart */}
            <a
              href="/cart"
              className="relative flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-gray-50"
            >
              <ShoppingCart className="w-6 h-6" />
              {/* Cart Count Badge */}
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-gray-50"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="hidden lg:block border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`px-6 py-4 font-semibold text-sm transition-colors border-b-2 border-transparent hover:border-red-600 ${
                  item.featured
                    ? "bg-red-600 text-white hover:bg-red-700 border-red-600"
                    : "text-gray-700 hover:text-red-600"
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          {/* Mobile Search */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Search parts..."
                className="w-full h-12 px-4 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:border-red-500 focus:bg-white focus:outline-none"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="px-6 py-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`block py-3 font-semibold border-b border-gray-100 last:border-b-0 ${
                  item.featured ? "text-red-600" : "text-gray-700"
                }`}
              >
                {item.name}
              </a>
            ))}

            {/* Mobile Account Link */}
            <a
              href="/account"
              className="block py-3 font-semibold text-gray-700 border-t border-gray-100 mt-4 pt-6"
            >
              My Account
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
