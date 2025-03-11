"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CompareFeature from "../components/CompareFeature";

export default function ComparePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Modern hero section with gradient background */}
        <section className="relative overflow-hidden">
          {/* Modern gradient background */}
          <div className="absolute inset-0 bg-[#fafafa] dark:bg-[#111] z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-900/30 dark:via-[#131313] dark:to-blue-900/30 opacity-80"></div>

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNmMWYxZjEiIGQ9Ik0zNiAxOGgtMnYyaDJ6TTQwIDE4aC0ydjJoMnpNNDQgMThoLTJ2Mmgyek0zNCAxNmgtMnYyaDJ6TTM4IDE2aC0ydjJoMnpNNDIgMTZoLTJ2Mmgyek0zMCAxNmgtMnYyaDJ6TTI2IDE2aC0ydjJoMnpNMjIgMTZoLTJ2Mmgyek0xOCAxNmgtMnYyaDJ6TDE0IDE2aC0ydjJoMnpNMTAgMTZIOHYyaDJ6TTYgMTZINHYyaDJ6Ii8+PC9nPjwvc3ZnPg==')] opacity-[0.15] dark:opacity-[0.05]"></div>
          </div>

          {/* Subtle gradient orb */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-float"></div>
          </div>

          <div className="container mx-auto px-4 pt-28 pb-16 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 mb-6">
                <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                <span className="text-purple-700 dark:text-purple-300 text-sm font-medium whitespace-nowrap">
                  Powered by Coinbase Developer Platform
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 dark:from-purple-400 dark:via-blue-400 dark:to-purple-400 tracking-tight">
                Compare Onramp, Offramp & Fund
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Understand the differences and use cases for Coinbase Onramp,
                Offramp, and Fund solutions. See how they work together to
                provide a complete crypto experience.
              </p>

              <Link
                href="https://docs.cloud.coinbase.com/cdp/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium mb-10"
              >
                View Documentation <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                      <th className="p-4 text-left font-bold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                        Feature
                      </th>
                      <th className="p-4 text-center font-bold text-green-700 dark:text-green-400 border border-gray-200 dark:border-gray-700">
                        Onramp
                      </th>
                      <th className="p-4 text-center font-bold text-blue-700 dark:text-blue-400 border border-gray-200 dark:border-gray-700">
                        Offramp
                      </th>
                      <th className="p-4 text-center font-bold text-amber-700 dark:text-amber-400 border border-gray-200 dark:border-gray-700">
                        Fund
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <FeatureRowWithFund
                      feature="Direction"
                      onramp="Fiat → Crypto"
                      offramp="Crypto → Fiat"
                      fund="Fiat → Crypto"
                    />
                    <FeatureRowWithFund
                      feature="Primary Use Case"
                      onramp="Bringing users onchain"
                      offramp="Cashing out crypto"
                      fund="Funding projects/dApps"
                    />
                    <FeatureRowWithFund
                      feature="Payment Methods"
                      onramp="Debit/Credit Cards, Bank Transfers, Apple Pay, Coinbase Account"
                      offramp="Bank Account (ACH), PayPal, Coinbase Account"
                      fund="Debit/Credit Cards, Bank Transfers, Apple Pay, Coinbase Account"
                    />
                    <FeatureRowWithFund
                      feature="Guest Checkout"
                      onramp="Yes (US only)"
                      offramp="No (Coinbase account required)"
                      fund="Yes (US only)"
                    />
                    <FeatureRowWithFund
                      feature="Supported Countries"
                      onramp="90+ countries"
                      offramp="Available in most Coinbase-supported countries"
                      fund="90+ countries"
                    />
                    <FeatureRowWithFund
                      feature="Transaction Limits"
                      onramp="Varies by payment method and country"
                      offramp="Varies by cashout method and country"
                      fund="Varies by payment method and country"
                    />
                    <FeatureRowWithFund
                      feature="Implementation"
                      onramp="URL generation or React components"
                      offramp="URL generation with redirect handling"
                      fund="Pre-built React components (Fund Button, Fund Card)"
                    />
                    <FeatureRowWithFund
                      feature="Transaction Flow"
                      onramp="Select asset → Pay → Receive crypto"
                      offramp="Select asset → Confirm → Send crypto → Receive fiat"
                      fund="Select amount → Pay → Fund project"
                    />
                    <FeatureRowWithFund
                      feature="Transaction Status API"
                      onramp="Yes"
                      offramp="Yes"
                      fund="Yes"
                    />
                    <FeatureRowWithFund
                      feature="SDK Support"
                      onramp="OnchainKit, REST API"
                      offramp="REST API"
                      fund="OnchainKit, REST API"
                    />
                    <FeatureRowWithFund
                      feature="Price Protection"
                      onramp="Price locked at time of quote"
                      offramp="Transaction cancelled if price drops below minimum"
                      fund="Price locked at time of quote"
                    />
                    <FeatureRowWithFund
                      feature="Network Support"
                      onramp="Multiple networks per asset (L2 support)"
                      offramp="Multiple networks per asset (L2 support)"
                      fund="Multiple networks per asset (L2 support)"
                    />
                    <FeatureRowWithFund
                      feature="Fee Structure"
                      onramp="Spread + Coinbase fee + Network fee (0% for USDC)"
                      offramp="Spread + Coinbase fee"
                      fund="Spread + Coinbase fee + Network fee (0% for USDC)"
                    />
                    <FeatureRowWithFund
                      feature="UI Components"
                      onramp="Custom or pre-built"
                      offramp="Custom only"
                      fund="Pre-built (Fund Button, Fund Card)"
                    />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <FaqItem
                  question="What's the main difference between Onramp, Offramp, and Fund?"
                  answer="Onramp converts fiat currency to cryptocurrency, Offramp converts cryptocurrency back to fiat, and Fund provides pre-built components specifically designed for funding projects with crypto. Onramp and Fund bring users into the crypto ecosystem, while Offramp provides an exit path."
                />

                <FaqItem
                  question="Can I implement all three in my application?"
                  answer="Yes, you can implement Onramp, Offramp, and Fund to provide a complete solution for your users. This gives them the ability to purchase crypto, fund your project, and cash out when needed, all within your application."
                />

                <FaqItem
                  question="Which one should I implement first?"
                  answer="It depends on your application's needs. If your primary goal is to help users acquire crypto, start with Onramp. If you need to collect payments for your project, start with Fund. If your users already have crypto and need a way to cash out, start with Offramp."
                />

                <FaqItem
                  question="What's the difference between Fund and Onramp?"
                  answer="While both Fund and Onramp allow users to convert fiat to crypto, Fund is specifically designed for collecting payments with pre-built UI components (Fund Button and Fund Card). Onramp is more general-purpose and can be implemented with custom UI or pre-built components."
                />

                <FaqItem
                  question="Are there different integration requirements?"
                  answer="Yes. Onramp can be integrated using OnchainKit React components or by generating URLs. Offramp requires URL generation and handling the redirect flow. Fund provides pre-built React components through OnchainKit. All three use similar API patterns but have different implementation details."
                />
              </div>
              <div className="mt-8 text-center">
                <Link
                  href="https://docs.cloud.coinbase.com/cdp/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  View CDP Documentation →
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

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-4">
      <button
        className="flex justify-between items-center w-full p-5 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-900 dark:text-white">
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && <div className="p-5 bg-gray-700 text-white">{answer}</div>}
    </div>
  );
}

function FeatureRowWithFund({
  feature,
  onramp,
  offramp,
  fund,
}: {
  feature: string;
  onramp: string;
  offramp: string;
  fund: string;
}) {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
      <td className="p-4 font-medium text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700">
        {feature}
      </td>
      <td className="p-4 text-center text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
        {onramp}
      </td>
      <td className="p-4 text-center text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
        {offramp}
      </td>
      <td className="p-4 text-center text-gray-700 dark:text-gray-300">
        {fund}
      </td>
    </tr>
  );
}
