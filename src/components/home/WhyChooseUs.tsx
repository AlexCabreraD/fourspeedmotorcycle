// src/components/home/WhyChooseUs.tsx
"use client";

import {
  Shield,
  Truck,
  Users,
  Award,
  Clock,
  Wrench,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Guaranteed Authentic",
    description:
      "Every part is sourced directly from manufacturers. We guarantee 100% authentic products with full warranty coverage.",
  },
  {
    icon: Truck,
    title: "Fast & Free Shipping",
    description:
      "Free shipping on orders over $75. Express delivery available. Most orders ship same day when placed before 2 PM.",
  },
  {
    icon: Users,
    title: "Expert Support",
    description:
      "Our technical specialists have decades of experience. Get professional advice for your specific application.",
  },
  {
    icon: Award,
    title: "Industry Leading Brands",
    description:
      "We partner with premium manufacturers like Akrapovič, Öhlins, Brembo, and other world-class brands.",
  },
  {
    icon: Clock,
    title: "15+ Years Experience",
    description:
      "Established in 2009, we've built relationships with riders and racers worldwide. Your success is our reputation.",
  },
  {
    icon: Wrench,
    title: "Installation Support",
    description:
      "Detailed installation guides and video tutorials. Professional installation services available nationwide.",
  },
];

const stats = [
  { number: "50,000+", label: "Parts in Stock" },
  { number: "15,000+", label: "Happy Customers" },
  { number: "99.8%", label: "Satisfaction Rate" },
  { number: "24/7", label: "Expert Support" },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose 4SpeedMotorcycle
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just another parts supplier. We're passionate riders who
            understand what it takes to build and maintain high-performance
            machines.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium uppercase tracking-wide text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-8 bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-600 text-white rounded-none flex items-center justify-center group-hover:bg-gray-900 transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonial Section */}
        <div className="bg-gray-900 text-white p-12 rounded-none">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <CheckCircle
                    key={i}
                    className="w-6 h-6 text-green-400 mx-1"
                  />
                ))}
              </div>
              <blockquote className="text-2xl md:text-3xl font-light italic mb-6">
                "4SpeedMotorcycle doesn't just sell parts—they provide
                solutions. Their technical expertise helped me build the perfect
                setup for my track bike."
              </blockquote>
              <cite className="text-lg font-semibold">
                — Marcus Rodriguez, Professional Racer
              </cite>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Experience the Difference?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us with their
            high-performance builds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-semibold transition-all duration-300 transform hover:scale-105">
              Start Shopping
            </button>
            <button className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 font-semibold transition-all duration-300">
              Contact Our Experts
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
