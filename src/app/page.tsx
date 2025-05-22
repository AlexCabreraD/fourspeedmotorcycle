"use client";

import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Star,
  Shield,
  Truck,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const MotorcycleLandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const featuredCategories = [
    {
      name: "Engine Parts",
      image: "https://placehold.co/300x200",
      count: "2,547",
    },
    {
      name: "Exhaust Systems",
      image: "https://placehold.co/300x200",
      count: "892",
    },
    {
      name: "Suspension",
      image: "https://placehold.co/300x200",
      count: "1,234",
    },
    {
      name: "Body & Frame",
      image: "https://placehold.co/300x200",
      count: "3,156",
    },
    {
      name: "Electrical",
      image: "https://placehold.co/300x200",
      count: "1,789",
    },
    {
      name: "Wheels & Tires",
      image: "https://placehold.co/300x200",
      count: "967",
    },
  ];

  const topBrands = [
    { name: "Honda", logo: "https://placehold.co/120x60" },
    { name: "Yamaha", logo: "https://placehold.co/120x60" },
    { name: "Kawasaki", logo: "https://placehold.co/120x60" },
    { name: "Suzuki", logo: "https://placehold.co/120x60" },
    { name: "KTM", logo: "https://placehold.co/120x60" },
    { name: "Harley-Davidson", logo: "https://placehold.co/120x60" },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Pro Circuit Exhaust System",
      brand: "Pro Circuit",
      price: 499.99,
      originalPrice: 599.99,
      rating: 4.8,
      reviews: 124,
      image: "https://placehold.co/250x200",
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "K&N Air Filter Kit",
      brand: "K&N",
      price: 89.99,
      rating: 4.6,
      reviews: 89,
      image: "https://placehold.co/250x200",
      badge: "New",
    },
    {
      id: 3,
      name: "Ohlins Rear Shock",
      brand: "Ohlins",
      price: 1299.99,
      rating: 4.9,
      reviews: 67,
      image: "https://placehold.co/250x200",
      badge: "Premium",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white relative z-50">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex justify-between items-center py-2 text-sm border-b border-gray-800">
            <div className="flex items-center space-x-6">
              <span className="flex items-center">
                <Phone className="w-4 h-4 mr-1" /> 1-800-HARDRIVE
              </span>
              <span className="flex items-center">
                <Mail className="w-4 h-4 mr-1" /> support@harddrive.com
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Free Shipping on Orders $99+</span>
              <span>|</span>
              <span>Track Your Order</span>
            </div>
          </div>

          {/* Main Header */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <button
                className="lg:hidden mr-4"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
              <h1 className="text-2xl font-bold text-red-500">
                HARD DRIVE PARTS
              </h1>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <nav className="flex space-x-6">
                <a href="#" className="hover:text-red-500 transition-colors">
                  Shop by Brand
                </a>
                <a href="#" className="hover:text-red-500 transition-colors">
                  Shop by Vehicle
                </a>
                <a href="#" className="hover:text-red-500 transition-colors">
                  Categories
                </a>
                <a href="#" className="hover:text-red-500 transition-colors">
                  Deals
                </a>
                <a href="#" className="hover:text-red-500 transition-colors">
                  Support
                </a>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search parts..."
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg w-64 pr-10"
                />
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
              <button className="relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black border-t border-gray-800">
            <nav className="px-4 py-4 space-y-4">
              <a href="#" className="block hover:text-red-500">
                Shop by Brand
              </a>
              <a href="#" className="block hover:text-red-500">
                Shop by Vehicle
              </a>
              <a href="#" className="block hover:text-red-500">
                Categories
              </a>
              <a href="#" className="block hover:text-red-500">
                Deals
              </a>
              <a href="#" className="block hover:text-red-500">
                Support
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://placehold.co/1920x600"
            alt="Motorcycle parts hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold mb-6">
              Premium Motorcycle Parts & Accessories
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              From OEM replacements to performance upgrades, find everything you
              need to keep your ride running strong.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-semibold transition-colors">
                Shop Now
              </button>
              <button className="border border-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-semibold transition-colors">
                Browse Catalog
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center space-x-3">
              <Shield className="w-8 h-8 text-red-600" />
              <span className="font-semibold">Genuine OEM & Aftermarket</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Truck className="w-8 h-8 text-red-600" />
              <span className="font-semibold">Fast & Free Shipping</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Star className="w-8 h-8 text-red-600" />
              <span className="font-semibold">Expert Support Team</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-600">
              Browse our extensive selection of motorcycle parts and accessories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-opacity" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <p className="text-sm opacity-90">
                      {category.count} Products
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600">
              Hand-picked performance parts for your motorcycle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-1">
                    {product.brand}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-500 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current" : ""}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-red-600">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Brands */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Top Brands</h2>
            <p className="text-gray-600">
              Shop parts from the most trusted manufacturers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {topBrands.map((brand, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-12 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-300 mb-8">
            Get the latest deals and new product announcements
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg text-black"
            />
            <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-r-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-red-500">
                HARD DRIVE PARTS
              </h3>
              <p className="text-gray-400 mb-4">
                Your trusted source for premium motorcycle parts and
                accessories.
              </p>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                <span>123 Motor Way, Bike City, BC 12345</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    All Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Sale Items
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Gift Cards
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Track Order
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Hard Drive Parts. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MotorcycleLandingPage;
