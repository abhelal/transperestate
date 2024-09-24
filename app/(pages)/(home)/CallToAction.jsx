import React from "react";

export default function CallToAction() {
  return (
    <div className="bg-primary-500 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="text-2xl font-bold tracking-tight text-white">Ready to get started ?</h3>
          <p className="mt-4 text-base leading-7 text-gray-200">
            Sign up for a account today and start managing your properties with ease.
          </p>
          <a
            href="/register"
            className="inline-block mt-8 px-6 py-3 text-base font-medium text-center text-primary-600 rounded-lg bg-white hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Join the Revolution
          </a>
        </div>
      </div>
    </div>
  );
}
