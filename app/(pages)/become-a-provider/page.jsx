"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function BecomeAProvider() {
  const router = useRouter();
  return (
    <div className="font-sans leading-relaxed">
      <section className="py-10 text-center">
        <h2 className="text-2xl font-semibold mb-6">Why Join Us?</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="max-w-xs">
            <img src="/images/carpenter.jpg" alt="Carpenter" className="w-64 h-40 object-cover rounded-lg" />
            <h3 className="text-xl font-medium mt-4">Carpenter</h3>
            <p className="text-gray-600">Offer your carpentry services to a wide range of clients.</p>
          </div>
          <div className="max-w-xs">
            <img src="/images/electrician.jpg" alt="Electrician" className="w-64 h-40 object-cover rounded-lg" />
            <h3 className="text-xl font-medium mt-4">Electrician</h3>
            <p className="text-gray-600">Help maintain and repair electrical systems in apartments.</p>
          </div>
          <div className="max-w-xs">
            <img src="/images/plumber.jpg" alt="Plumber" className="w-64 h-40 object-cover rounded-lg" />
            <h3 className="text-xl font-medium mt-4">Plumber</h3>
            <p className="text-gray-600">Provide plumbing solutions to buildings and apartments.</p>
          </div>
          <div className="max-w-xs">
            <img src="/images/painter.jpg" alt="Painter" className="w-64 h-40 object-cover rounded-lg" />
            <h3 className="text-xl font-medium mt-4">Painter</h3>
            <p className="text-gray-600">Showcase your painting skills to enhance living spaces.</p>
          </div>
          <div className="max-w-xs">
            <img src="/images/cleaner.jpg" alt="Cleaner" className="w-64 h-40 object-cover rounded-lg" />
            <h3 className="text-xl font-medium mt-4">Cleaner</h3>
            <p className="text-gray-600">Provide cleaning services to maintain tidy and hygienic spaces.</p>
          </div>
          <div className="max-w-xs">
            <img src="/images/gardener.jpg" alt="Gardener" className="w-64 h-40 object-cover rounded-lg" />
            <h3 className="text-xl font-medium mt-4">Gardener</h3>
            <p className="text-gray-600">Offer gardening services to beautify outdoor spaces.</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-10">
        <h2 className="text-2xl font-semibold text-center mb-6">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div>
            <h3 className="text-lg font-medium">How do I register?</h3>
            <p className="text-gray-600">{`Click the "Register Now" button below and fill out the form with your details.`}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium">What services can I provide?</h3>
            <p className="text-gray-600">
              You can provide services such as carpentry, electrical work, plumbing, painting, cleaning, gardening, and general handyman
              tasks.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Is there a fee to join?</h3>
            <p className="text-gray-600">No, joining as a provider is completely free.</p>
          </div>
        </div>
      </section>

      <section className="text-center py-10">
        <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-6">Click the button below to register as a provider and start offering your services today!</p>
        <button
          onClick={() => router.push("/register-provider")}
          className="bg-primary-500 text-white py-2 px-6 rounded-lg text-lg hover:bg-primary-600 transition"
        >
          Register Now
        </button>
      </section>
    </div>
  );
}
