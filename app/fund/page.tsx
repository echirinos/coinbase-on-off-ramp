"use client";

import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useState } from "react";
import { FundCardDemo } from "../components/FundCardDemo";
import { FundButtonFeature } from "../components/FundButtonFeature";
import { useCoinbaseRampTransaction } from "../contexts/CoinbaseRampTransactionContext";
import { CustomIntegrationDemo } from "../components/CustomIntegrationDemo";

export default function FundPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { selectedCountry, selectedSubdivision, selectedCurrency } =
    useCoinbaseRampTransaction();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-20 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Fund Your Project
            </h1>
            <p className="mx-auto max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Integrate Coinbase's Fund Button and Fund Card features to enable
              crypto funding for your dApp or project.
            </p>
          </div>
        </section>

        {/* Fund Button Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <FundButtonFeature />
            </div>
          </div>
        </section>

        {/* Fund Card Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Fund Card</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  The Fund Card provides a complete payment experience that
                  enables users to fund your project with crypto.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-md">
                <div className="flex flex-col items-center justify-center">
                  <FundCardDemo />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Integration Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Custom Integration</h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Build your own custom integration with full control over the
                  user experience. This example demonstrates how to create a
                  complete on/off-ramp solution using individual components.
                </p>
              </div>

              <CustomIntegrationDemo />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
