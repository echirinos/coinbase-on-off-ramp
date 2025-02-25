"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OnrampFeature from "../components/OnrampFeature";

// Create a separate component that uses useSearchParams
function StatusMessage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const [showStatusMessage, setShowStatusMessage] = useState(false);

  useEffect(() => {
    if (status === "success") {
      setShowStatusMessage(true);
      // Hide the message after 5 seconds
      const timer = setTimeout(() => {
        setShowStatusMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  if (!showStatusMessage) return null;

  return (
    <div className="fixed top-24 left-0 right-0 mx-auto max-w-md bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg z-50 shadow-lg">
      <div className="flex items-center">
        <svg
          className="w-6 h-6 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
        <span className="font-medium">Success!</span>
      </div>
      <p className="text-sm mt-1">
        Your onramp transaction has been initiated. Check your wallet for the
        funds.
      </p>
    </div>
  );
}

export default function OnrampPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Wrap the component that uses useSearchParams in a Suspense boundary */}
        <Suspense fallback={<div>Loading status...</div>}>
          <StatusMessage />
        </Suspense>

        {/* Modern hero section with gradient background */}
        <section className="relative overflow-hidden">
          {/* Modern gradient background */}
          <div className="absolute inset-0 bg-[#fafafa] dark:bg-[#111] z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-green-900/30 dark:via-[#131313] dark:to-blue-900/30 opacity-80"></div>

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNmMWYxZjEiIGQ9Ik0zNiAxOGgtMnYyaDJ6TTQwIDE4aC0ydjJoMnpNNDQgMThoLTJ2Mmgyek0zNCAxNmgtMnYyaDJ6TTM4IDE2aC0ydjJoMnpNNDIgMTZoLTJ2Mmgyek0zMCAxNmgtMnYyaDJ6TTI2IDE2aC0ydjJoMnpNMjIgMTZoLTJ2Mmgyek0xOCAxNmgtMnYyaDJ6TDE0IDE2aC0ydjJoMnpNMTAgMTZIOHYyaDJ6TTYgMTZINHYyaDJ6Ii8+PC9nPjwvc3ZnPg==')] opacity-[0.15] dark:opacity-[0.05]"></div>
          </div>

          {/* Subtle gradient orb */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-green-400 dark:bg-green-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-float"></div>
          </div>

          <div className="container mx-auto px-4 py-24 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                <span className="text-green-700 dark:text-green-300 text-sm font-medium">
                  Powered by Coinbase Developer Platform
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 tracking-tight">
                Coinbase Onramp
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                The easiest way to bring users onchain with a simple
                fiat-to-crypto experience
              </p>
            </div>
          </div>
        </section>

        <OnrampFeature />

        <section className="py-24 bg-gray-50 dark:bg-gray-800/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 mb-4">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-green-700 dark:text-green-300 text-sm font-medium">
                    Common Questions
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Frequently Asked Questions
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Everything you need to know about Coinbase Onramp integration
                </p>
              </div>

              <div className="space-y-6">
                <FaqItem
                  question="What payment methods are supported?"
                  answer="Coinbase Onramp supports various payment methods including debit cards, bank transfers (ACH), Apple Pay, and Coinbase accounts. Available methods may vary by region."
                />

                <FaqItem
                  question="How do I integrate Coinbase Onramp?"
                  answer="Integration is simple with our SDK components like FundButton and FundCard, or by generating custom URLs. Check out our documentation for detailed implementation guides."
                />

                <FaqItem
                  question="What cryptocurrencies can users purchase?"
                  answer="Users can purchase a wide range of cryptocurrencies including ETH, BTC, USDC, SOL, and many more. The available assets may vary by region and payment method."
                />

                <FaqItem
                  question="Is KYC required for users?"
                  answer="Yes, users will need to complete Coinbase's KYC process to use the Onramp service, ensuring compliance with regulatory requirements."
                />
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
  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-800 transition-all hover:shadow-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">
          <svg
            className="w-5 h-5 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            {question}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
