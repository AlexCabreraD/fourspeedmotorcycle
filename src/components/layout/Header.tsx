// src/components/layout/Header.tsx
"use client";

import { useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Phone,
  ChevronDown,
} from "lucide-react";

const navigation = [
  {
    name: "Shop by Vehicle",
    href: "/vehicles",
    featured: true,
  },
  {
    name: "Categories",
    href: "/categories",
    submenu: [
      { name: "Engine & Performance", href: "/categories/engine" },
      { name: "Suspension & Handling", href: "/categories/suspension" },
      { name: "Brakes & Safety", href: "/categories/brakes" },
      { name: "Body & Styling", href: "/categories/body" },
      { name: "Electrical & Lighting", href: "/categories/electrical" },
      { name: "Tools & Maintenance", href: "/categories/tools" },
    ],
  },
  {
    name: "Brands",
    href: "/brands",
    submenu: [
      { name: "Akrapovič", href: "/brands/akrapovic" },
      { name: "Öhlins", href: "/brands/ohlins" },
      { name: "Brembo", href: "/brands/brembo" },
      { name: "Rizoma", href: "/brands/rizoma" },
      { name: "View All Brands", href: "/brands" },
    ],
  },
  {
    name: "Support",
    href: "/support",
  },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  return (
    <header className="bg-white shadow-lg relative z-50">
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
                Free Shipping on Orders $75+
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/account"
                className="hover:text-red-400 transition-colors"
              >
                My Account
              </a>
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
              <div className="w-12 h-12 bg-red-600 text-white font-bold text-xl flex items-center justify-center">
                4S
              </div>
              <div>
                <div className="font-bold text-xl text-gray-900">
                  4SpeedMotorcycle
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  Performance Parts
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
                placeholder="Search parts, brands, or part numbers..."
                className="w-full px-4 py-3 border-2 border-gray-200 focus:border-red-500 focus:outline-none text-gray-900 font-medium"
              />
              <button className="absolute right-0 top-0 h-full px-6 bg-red-600 hover:bg-red-700 text-white transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Mobile Search Toggle */}
            <button className="lg:hidden p-2 text-gray-600 hover:text-red-600">
              <Search className="w-6 h-6" />
            </button>

            {/* Account */}
            <a
              href="/account"
              className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <User className="w-6 h-6" />
              <span className="hidden md:block">Account</span>
            </a>

            {/* Cart */}
            <a
              href="/cart"
              className="relative flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="hidden md:block">Cart</span>
              {/* Cart Count Badge */}
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-red-600"
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
      <nav className="hidden lg:block border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.submenu && setActiveSubmenu(item.name)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <a
                  href={item.href}
                  className={`flex items-center gap-1 px-6 py-4 font-semibold transition-colors ${
                    item.featured
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "text-gray-700 hover:text-red-600"
                  }`}
                >
                  {item.name}
                  {item.submenu && <ChevronDown className="w-4 h-4" />}
                </a>

                {/* Submenu */}
                {item.submenu && activeSubmenu === item.name && (
                  <div className="absolute top-full left-0 bg-white shadow-xl border border-gray-200 min-w-64 z-50">
                    {item.submenu.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl z-50">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search parts..."
                className="w-full px-4 py-3 border-2 border-gray-200 focus:border-red-500 focus:outline-none"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="px-6 py-4">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="border-b border-gray-100 last:border-b-0"
              >
                <a
                  href={item.href}
                  className={`block py-3 font-semibold ${
                    item.featured ? "text-red-600" : "text-gray-700"
                  }`}
                >
                  {item.name}
                </a>
                {item.submenu && (
                  <div className="pl-4 pb-2">
                    {item.submenu.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.href}
                        className="block py-2 text-sm text-gray-600"
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
