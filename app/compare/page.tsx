"use client";

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
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNmMWYxZjEiIGQ9Ik0zNiAxOGgtMnYyaDJ6TTQwIDE4aC0ydjJoMnpNNDQgMThoLTJ2Mmgyek0zNCAxNmgtMnYyaDJ6TTM4IDE2aC0ydjJoMnpNNDIgMTZoLTJ2Mmgyek0zMCAxNmgtMnYyaDJ6TTI2IDE2aC0ydjJoMnpNMjIgMTZoLTJ2Mmgyek0xOCAxNmgtMnYyaDJ6TTE0IDE2aC0ydjJoMnpNMTAgMTZIOHYyaDJ6TTYgMTZINHYyaDJ6Ii8+PC9nPjwvc3ZnPg==')] opacity-[0.15] dark:opacity-[0.05]"></div>
          </div>

          {/* Subtle gradient orb */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-float"></div>
          </div>

          <div className="container mx-auto px-4 py-24 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 mb-6">
                <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                <span className="text-purple-700 dark:text-purple-300 text-sm font-medium">
                  Feature Comparison
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 dark:from-purple-400 dark:via-blue-400 dark:to-purple-400 tracking-tight">
                Compare Onramp & Offramp
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Understand the differences and use cases for Coinbase Onramp and
                Offramp solutions. See how they work together to provide a
                complete crypto experience.
              </p>
            </div>
          </div>
        </section>

        <CompareFeature />

        <section className="py-24 bg-gray-50 dark:bg-gray-800/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 mb-4">
                  <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                  <span className="text-purple-700 dark:text-purple-300 text-sm font-medium">
                    Common Questions
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Frequently Asked Questions
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Everything you need to know about Coinbase Onramp and Offramp
                  integration
                </p>
              </div>

              <div className="space-y-6">
                <FaqItem
                  question="What's the main difference between Onramp and Offramp?"
                  answer="Onramp converts fiat currency (like USD) to cryptocurrency, while Offramp does the opposite, converting cryptocurrency back to fiat. Onramp brings users into the crypto ecosystem, while Offramp provides an exit path."
                />

                <FaqItem
                  question="Can I implement both in my application?"
                  answer="Yes, you can implement both Onramp and Offramp to provide a complete solution for your users. This gives them the ability to both purchase crypto and cash out when needed, all within your application."
                />

                <FaqItem
                  question="Which one should I implement first?"
                  answer="It depends on your application's needs. If your primary goal is to help users acquire crypto, start with Onramp. If your users already have crypto and need a way to cash out, start with Offramp. Many applications benefit from implementing both."
                />

                <FaqItem
                  question="Are there different integration requirements?"
                  answer="Yes. Onramp can be integrated using OnchainKit React components or by generating URLs. Offramp requires URL generation and handling the redirect flow. Both use similar API patterns but have different implementation details."
                />

                <FaqItem
                  question="Do both require a Coinbase account?"
                  answer="Onramp offers a Guest checkout option in the US, allowing users without a Coinbase account to purchase crypto with a debit card or Apple Pay. Offramp requires users to have a Coinbase account to receive fiat currency."
                />

                <FaqItem
                  question="How do I track transaction status for both?"
                  answer="Both Onramp and Offramp provide Transaction Status APIs that allow you to track the status of transactions. You can use the partnerUserId parameter to link transactions to specific users in your application."
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
    <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800 transition-all hover:shadow-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">
          <svg
            className="w-5 h-5 text-purple-500"
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
