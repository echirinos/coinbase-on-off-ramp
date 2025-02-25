"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  // Ensure animations only run on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-[#fafafa] dark:bg-[#111] z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f0f0f0] via-white to-[#f8f8f8] dark:from-[#111] dark:via-[#131313] dark:to-[#0a0a0a] opacity-80"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNmMWYxZjEiIGQ9Ik0zNiAxOGgtMnYyaDJ6TTQwIDE4aC0ydjJoMnpNNDQgMThoLTJ2Mmgyek0zNCAxNmgtMnYyaDJ6TTM4IDE2aC0ydjJoMnpNNDIgMTZoLTJ2Mmgyek0zMCAxNmgtMnYyaDJ6TTI2IDE2aC0ydjJoMnpNMjIgMTZoLTJ2Mmgyek0xOCAxNmgtMnYyaDJ6TTE0IDE2aC0ydjJoMnpNMTAgMTZIOHYyaDJ6TTYgMTZINHYyaDJ6Ii8+PC9nPjwvc3ZnPg==')] opacity-[0.15] dark:opacity-[0.05]"></div>
      </div>

      {/* Subtle gradient orbs */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-float"></div>
          <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-float animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-green-400 dark:bg-green-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-float animation-delay-4000"></div>
        </div>
      )}

      <div className="container mx-auto px-4 py-24 md:py-40 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
              <span className="text-blue-700 dark:text-blue-300 text-sm font-medium">
                Powered by Coinbase Developer Platform
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 dark:from-blue-400 dark:via-purple-400 dark:to-green-400 tracking-tight">
              Coinbase Onramp & Offramp
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              The seamless bridge between fiat and crypto for your applications
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-4 mb-16">
              <Link
                href="/onramp"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl text-lg"
              >
                Try Onramp
              </Link>
              <Link
                href="/offramp"
                className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 font-medium py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg text-lg"
              >
                Try Offramp
              </Link>
              <Link
                href="/compare"
                className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 font-medium py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg text-lg"
              >
                Compare Features
              </Link>
            </div>
          </div>

          {/* Demo showcase with modern card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 mb-16 transition-all hover:shadow-2xl">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Experience Seamless Crypto Transactions
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Integrate Coinbase's powerful ramp solutions to provide a
                  frictionless experience for your users to move between fiat
                  and crypto.
                </p>
                <Link
                  href="/onramp"
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  <span>Fund Wallet with Coinbase</span>
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </Link>
              </div>
              <div className="md:w-1/2 bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="ml-auto text-xs text-gray-500 dark:text-gray-400 font-mono">
                    crypto-journey.js
                  </div>
                </div>
                <div className="font-mono text-sm text-gray-700 dark:text-gray-300 overflow-auto max-h-[300px]">
                  <div className="mb-4 text-gray-500 dark:text-gray-400">
                    // The Crypto Journey: A Tale of Two Ramps
                  </div>

                  <div className="text-blue-600 dark:text-blue-400">
                    function
                  </div>
                  <div className="text-yellow-600 dark:text-yellow-400 mb-2">
                    {" "}
                    cryptoJourney() {"{"}
                  </div>

                  <div className="pl-4 mb-3">
                    <span className="text-green-600 dark:text-green-400">
                      // Chapter 1: The Onramp Adventure
                    </span>
                  </div>
                  <div className="pl-4 mb-3">
                    <span className="text-gray-600 dark:text-gray-300">
                      console.log(
                    </span>
                    <span className="text-orange-500 dark:text-orange-300">
                      "🚀 Welcome to the Onramp! Your gateway from the familiar
                      world of fiat"
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">);</span>
                  </div>
                  <div className="pl-4 mb-3">
                    <span className="text-gray-600 dark:text-gray-300">
                      console.log(
                    </span>
                    <span className="text-orange-500 dark:text-orange-300">
                      "💳 Swipe your card, connect your bank, or use Apple Pay"
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">);</span>
                  </div>
                  <div className="pl-4 mb-3">
                    <span className="text-gray-600 dark:text-gray-300">
                      console.log(
                    </span>
                    <span className="text-orange-500 dark:text-orange-300">
                      "✨ Watch as your dollars transform into digital assets!"
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">);</span>
                  </div>
                  <div className="pl-4 mb-3">
                    <span className="text-gray-600 dark:text-gray-300">
                      console.log(
                    </span>
                    <span className="text-orange-500 dark:text-orange-300">
                      "🌎 Available in 90+ countries, because crypto is global"
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">);</span>
                  </div>

                  <div className="pl-4 mb-4">
                    <span className="text-purple-600 dark:text-purple-400">
                      await
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {" "}
                      cryptoAdventures();
                    </span>
                  </div>

                  <div className="pl-4 mb-3">
                    <span className="text-green-600 dark:text-green-400">
                      // Chapter 2: The Offramp Experience
                    </span>
                  </div>
                  <div className="pl-4 mb-3">
                    <span className="text-gray-600 dark:text-gray-300">
                      console.log(
                    </span>
                    <span className="text-orange-500 dark:text-orange-300">
                      "💰 Ready to cash out? Welcome to the Offramp!"
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">);</span>
                  </div>
                  <div className="pl-4 mb-3">
                    <span className="text-gray-600 dark:text-gray-300">
                      console.log(
                    </span>
                    <span className="text-orange-500 dark:text-orange-300">
                      "🏦 Send crypto, receive fiat - it's that simple"
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">);</span>
                  </div>
                  <div className="pl-4 mb-3">
                    <span className="text-gray-600 dark:text-gray-300">
                      console.log(
                    </span>
                    <span className="text-orange-500 dark:text-orange-300">
                      "⚡ Fast, secure, and no more complicated than it needs to
                      be"
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">);</span>
                  </div>

                  <div className="pl-4 mb-4">
                    <span className="text-blue-600 dark:text-blue-400">
                      return
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {" "}
                      {`{`}
                    </span>
                  </div>
                  <div className="pl-8 mb-2">
                    <span className="text-gray-600 dark:text-gray-300">
                      message:
                    </span>
                    <span className="text-orange-500 dark:text-orange-300">
                      {" "}
                      "The perfect crypto journey needs both an entrance AND an
                      exit!"
                    </span>
                  </div>
                  <div className="pl-8 mb-2">
                    <span className="text-gray-600 dark:text-gray-300">
                      tip:
                    </span>
                    <span className="text-orange-500 dark:text-orange-300">
                      {" "}
                      "Try both Onramp and Offramp to experience the full cycle"
                    </span>
                  </div>
                  <div className="pl-4 mb-2">
                    <span className="text-gray-600 dark:text-gray-300">
                      {`}`};
                    </span>
                  </div>
                  <div className="mb-1">{"}"}</div>

                  <div className="mt-4 text-purple-600 dark:text-purple-400">
                    // Don't just read about it - try it yourself!
                  </div>
                  <div className="text-blue-600 dark:text-blue-400">
                    cryptoJourney();
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature cards with modern design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Easy Onboarding"
              description="Bring users onchain with a simple fiat-to-crypto experience that integrates seamlessly with your application."
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              }
            />

            <FeatureCard
              title="Cash Out Crypto"
              description="Allow users to convert crypto back to fiat seamlessly with multiple cashout options and competitive rates."
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              }
            />

            <FeatureCard
              title="Global Support"
              description="Available in 90+ countries with multiple payment methods to reach users worldwide."
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(20px, -30px) scale(1.05);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 7s;
        }
        .animation-delay-4000 {
          animation-delay: 14s;
        }
      `}</style>
    </section>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 transition-all hover:shadow-lg border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800">
      <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg inline-block mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}
