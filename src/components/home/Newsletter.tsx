// src/components/home/Newsletter.tsx
"use client";

import { Mail, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setEmail("");
  };

  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 via-red-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-6">
              <Mail className="w-8 h-8" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Stay in the Fast Lane
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
              Get exclusive access to new arrivals, technical guides, racing
              insights, and special offers delivered straight to your inbox.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">🏁</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Racing Updates</h3>
              <p className="text-sm opacity-80">
                Latest from MotoGP, WSBK, and racing technology
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">🔧</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Tech Guides</h3>
              <p className="text-sm opacity-80">
                Installation tips and performance tuning advice
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">💰</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Exclusive Deals</h3>
              <p className="text-sm opacity-80">
                Subscriber-only discounts and early access
              </p>
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-none border border-white/20">
            {!isSubmitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto"
              >
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-6 py-4 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  Subscribe Now
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="w-8 h-8 rotate-45" />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  Welcome to the Team!
                </h3>
                <p className="opacity-90">
                  Check your inbox for a confirmation email.
                </p>
              </div>
            )}

            {/* Privacy Note */}
            <p className="text-sm opacity-70 mt-6 max-w-md mx-auto">
              We respect your privacy. Unsubscribe at any time. No spam, just
              premium content for serious riders.
            </p>
          </div>

          {/* Social Proof */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-lg mb-4">
              Join <span className="font-bold text-red-400">12,000+</span>{" "}
              riders already subscribed
            </p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              <span className="text-sm">Trusted by professionals</span>
              <span className="text-sm">•</span>
              <span className="text-sm">Weekly insights</span>
              <span className="text-sm">•</span>
              <span className="text-sm">No spam guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
