// src/components/home/Hero.tsx
"use client";

import { ChevronRight, Play } from "lucide-react";
import { useState } from "react";

export default function Hero() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop&crop=center"
          alt="Professional motorcycle"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center text-white">
        <div className="space-y-8">
          {/* Brand Statement */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="block">Performance</span>
              <span className="block text-red-500">Redefined</span>
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
              Professional-grade parts and accessories for riders who demand
              excellence. Your machine deserves the best.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-none font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              Shop by Vehicle
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setIsVideoPlaying(true)}
              className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-none font-semibold transition-all duration-300 flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Watch Our Story
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 pt-12 opacity-80">
            <div className="text-center">
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm uppercase tracking-wide">
                Years Experience
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-sm uppercase tracking-wide">
                Parts Available
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm uppercase tracking-wide">
                Expert Support
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
