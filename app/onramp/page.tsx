"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
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

          <div className="container mx-auto px-4 pt-28 pb-16 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                <span className="text-green-700 dark:text-green-300 text-sm font-medium whitespace-nowrap">
                  Powered by Coinbase Developer Platform
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 tracking-tight">
                Coinbase Onramp
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
                The easiest way to bring users onchain with a simple
                fiat-to-crypto experience
              </p>

              <Link
                href="https://docs.cloud.coinbase.com/cdp/docs/coinbase-onramp-overview"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium mb-10"
              >
                View Documentation <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Onramp Feature Component */}
        <OnrampFeature />

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <FaqItem
                  question="What is Coinbase Onramp?"
                  answer="Coinbase Onramp is a service that allows users to purchase crypto with fiat currency directly within your application. It provides a seamless experience for users to convert their traditional currency to cryptocurrency."
                />
                <FaqItem
                  question="Which countries are supported?"
                  answer="Coinbase Onramp is available in 90+ countries worldwide. The specific payment methods available may vary by region."
                />
                <FaqItem
                  question="What payment methods are supported?"
                  answer="Coinbase Onramp supports various payment methods including debit/credit cards, bank transfers (ACH), Apple Pay, and more depending on your region."
                />
                <FaqItem
                  question="How long do transactions take?"
                  answer="Transaction times vary based on the payment method. Card payments are typically faster (minutes), while bank transfers may take 1-3 business days."
                />
                <FaqItem
                  question="Are there any fees?"
                  answer="Yes, Coinbase charges a fee for each transaction. The fee structure varies based on payment method, region, and transaction amount."
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
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        className="flex justify-between items-center w-full p-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
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
      {isOpen && (
        <div className="p-4 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
          {answer}
        </div>
      )}
    </div>
  );
}
