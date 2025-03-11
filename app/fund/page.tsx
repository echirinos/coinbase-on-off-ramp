"use client";

import React from "react";
import Link from "next/link";
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
      <main className="flex-grow">
        {/* Modern hero section with gradient background */}
        <section className="relative overflow-hidden">
          {/* Modern gradient background */}
          <div className="absolute inset-0 bg-[#fafafa] dark:bg-[#111] z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-amber-50 dark:from-amber-900/30 dark:via-[#131313] dark:to-amber-900/30 opacity-80"></div>

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNmMWYxZjEiIGQ9Ik0zNiAxOGgtMnYyaDJ6TTQwIDE4aC0ydjJoMnpNNDQgMThoLTJ2Mmgyek0zNCAxNmgtMnYyaDJ6TTM4IDE2aC0ydjJoMnpNNDIgMTZoLTJ2Mmgyek0zMCAxNmgtMnYyaDJ6TTI2IDE2aC0ydjJoMnpNMjIgMTZoLTJ2Mmgyek0xOCAxNmgtMnYyaDJ6TDE0IDE2aC0ydjJoMnpNMTAgMTZIOHYyaDJ6TTYgMTZINHYyaDJ6Ii8+PC9nPjwvc3ZnPg==')] opacity-[0.15] dark:opacity-[0.05]"></div>
          </div>

          {/* Subtle gradient orb */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-amber-400 dark:bg-amber-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-float"></div>
          </div>

          <div className="container mx-auto px-4 pt-28 pb-16 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 mb-6">
                <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                <span className="text-amber-700 dark:text-amber-300 text-sm font-medium whitespace-nowrap">
                  Powered by Coinbase Developer Platform
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 dark:from-amber-400 dark:via-yellow-400 dark:to-amber-400 tracking-tight">
                Fund with OnchainKit
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Integrate Coinbase's Fund Button and Fund Card features to
                enable crypto funding for your dApp or project with just a few
                lines of code.
              </p>

              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8 max-w-3xl mx-auto">
                <p className="text-blue-700 dark:text-blue-300 text-sm md:text-base">
                  <span className="font-medium">Note:</span> Wallet connection
                  is required for Fund features to work. Connect your wallet to
                  test the functionality.
                </p>
              </div>

              <Link
                href="https://docs.base.org/builderkits/onchainkit/fund/fund-button"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium mb-10"
              >
                View Documentation <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Fund Button Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold mb-6 dark:text-white">
                    Configure Fund Button
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    The Fund Button allows your users to contribute funds to
                    your dApp or project in a seamless manner.
                  </p>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="asset"
                          className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                        >
                          Select Asset
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {["ETH", "USDC", "MATIC", "AVAX", "ARB", "OP"].map(
                            (assetOption) => (
                              <button
                                key={assetOption}
                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors"
                              >
                                {assetOption}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="button-text"
                          className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                        >
                          Button Text
                        </label>
                        <input
                          type="text"
                          id="button-text"
                          defaultValue="Fund Project"
                          className="block w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 flex flex-col">
                  <h3 className="text-xl font-bold mb-6 dark:text-white">
                    Preview
                  </h3>
                  <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                      <div className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg mb-4">
                        Fund Project
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        A simple button that opens the Coinbase Fund flow
                      </p>
                      <p className="text-amber-600 dark:text-amber-400 text-xs mt-2">
                        Wallet connection required to use
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fund Card Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold mb-6 dark:text-white">
                    Configure Fund Card
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    The Fund Card provides a complete payment experience that
                    enables users to fund your project with crypto.
                  </p>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="asset"
                          className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                        >
                          Select Asset
                        </label>
                        <select className="block w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-3 px-4 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option value="ETH">Ethereum (ETH)</option>
                          <option value="USDC">USD Coin (USDC)</option>
                          <option value="MATIC">Polygon (MATIC)</option>
                          <option value="AVAX">Avalanche (AVAX)</option>
                          <option value="ARB">Arbitrum (ARB)</option>
                          <option value="OP">Optimism (OP)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                          Preset Amounts
                        </label>
                        <div className="flex space-x-2 mb-2">
                          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors">
                            $10
                          </button>
                          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors">
                            $25
                          </button>
                          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors">
                            $50
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 flex flex-col">
                  <h3 className="text-xl font-bold mb-6 dark:text-white">
                    Preview
                  </h3>
                  <div className="flex-grow flex items-center justify-center">
                    <FundCardDemo />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Documentation Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 dark:text-white">
                Ready to Integrate?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Check out our comprehensive documentation to learn how to
                integrate Fund Button and Fund Card into your application.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="https://docs.base.org/builderkits/onchainkit/fund/fund-button"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  Fund Button Docs
                </Link>
                <Link
                  href="https://docs.base.org/builderkits/onchainkit/fund/fund-card"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  Fund Card Docs
                </Link>
                <Link
                  href="https://docs.base.org/builderkits/onchainkit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  OnchainKit Docs
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
