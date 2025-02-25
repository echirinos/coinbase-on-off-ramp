"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OfframpFeature from "../components/OfframpFeature";

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
        Your offramp transaction has been initiated. Check your Coinbase account
        for details.
      </p>
    </div>
  );
}

export default function OfframpPage() {
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
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-900/30 dark:via-[#131313] dark:to-purple-900/30 opacity-80"></div>

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNmMWYxZjEiIGQ9Ik0zNiAxOGgtMnYyaDJ6TTQwIDE4aC0ydjJoMnpNNDQgMThoLTJ2Mmgyek0zNCAxNmgtMnYyaDJ6TTM4IDE2aC0ydjJoMnpNNDIgMTZoLTJ2Mmgyek0zMCAxNmgtMnYyaDJ6TTI2IDE2aC0ydjJoMnpNMjIgMTZoLTJ2Mmgyek0xOCAxNmgtMnYyaDJ6TDE0IDE2aC0ydjJoMnpNMTAgMTZIOHYyaDJ6TTYgMTZINHYyaDJ6Ii8+PC9nPjwvc3ZnPg==')] opacity-[0.15] dark:opacity-[0.05]"></div>
          </div>

          {/* Subtle gradient orb */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-float"></div>
          </div>

          <div className="container mx-auto px-4 py-24 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                <span className="text-blue-700 dark:text-blue-300 text-sm font-medium">
                  Powered by Coinbase Developer Platform
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 tracking-tight">
                Coinbase Offramp
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Convert crypto back to fiat with Coinbase Offramp - the easiest
                way to cash out. Seamlessly move from crypto to fiat with just a
                few clicks.
              </p>
            </div>
          </div>
        </section>

        <OfframpFeature />

        <section className="py-24 bg-gray-50 dark:bg-gray-800/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-4">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                  <span className="text-blue-700 dark:text-blue-300 text-sm font-medium">
                    Common Questions
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Frequently Asked Questions
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Everything you need to know about Coinbase Offramp integration
                </p>
              </div>

              <div className="space-y-6">
                <FaqItem
                  question="What is Coinbase Offramp?"
                  answer="Coinbase Offramp is a service that allows users to convert cryptocurrency to fiat currency (like USD) directly within your application. It provides a seamless way for users to cash out their crypto holdings without leaving your platform."
                />

                <FaqItem
                  question="Do users need a Coinbase account?"
                  answer="Yes, users need a Coinbase account to use Offramp. This is required to process the conversion from crypto to fiat and to deposit the funds into their account or bank."
                />

                <FaqItem
                  question="Which cashout methods are supported?"
                  answer="Coinbase Offramp supports various cashout methods including bank accounts (ACH in the US), PayPal (in supported countries), and Coinbase fiat wallets. The available methods vary by country."
                />

                <FaqItem
                  question="Which cryptocurrencies can users sell?"
                  answer="Coinbase Offramp supports a wide range of cryptocurrencies including ETH, BTC, USDC, SOL, and many more. The available assets can be filtered based on your application's needs."
                />

                <FaqItem
                  question="How do I integrate Coinbase Offramp?"
                  answer="You can integrate Coinbase Offramp by generating Offramp URLs with the appropriate parameters and handling the redirect flow. Our demo showcases this approach with detailed implementation examples."
                />

                <FaqItem
                  question="What happens if the price changes during the transaction?"
                  answer="If after the onchain send, the price of the asset falls below the 'Receive at least' amount in a user's transaction, Coinbase will cancel the transaction and deposit the full crypto amount in the user's Coinbase account."
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
    <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-all hover:shadow-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">
          <svg
            className="w-5 h-5 text-blue-500"
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
