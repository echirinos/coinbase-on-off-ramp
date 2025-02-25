"use client";

import Link from "next/link";

export default function CompareFeature() {
  return (
    <div className="bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
              Onramp vs Offramp
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
              Compare the features of Coinbase Onramp and Offramp to understand
              how they can enhance your application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-1">
              <div className="h-full bg-gradient-to-br from-green-500 to-green-700 text-white rounded-lg p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Onramp</h3>
                <p className="mb-6">
                  Convert fiat to crypto and bring users onchain with Coinbase
                  Onramp.
                </p>
                <Link
                  href="/onramp"
                  className="inline-block bg-white text-green-700 font-bold py-2 px-4 rounded hover:bg-gray-100 transition-colors"
                >
                  Try Onramp
                </Link>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="h-full bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-lg p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Offramp</h3>
                <p className="mb-6">
                  Convert crypto back to fiat with Coinbase Offramp - the
                  easiest way to cash out.
                </p>
                <Link
                  href="/offramp"
                  className="inline-block bg-white text-blue-700 font-bold py-2 px-4 rounded hover:bg-gray-100 transition-colors"
                >
                  Try Offramp
                </Link>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="h-full bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-lg p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Combined</h3>
                <p className="mb-6">
                  Provide a complete solution with both Onramp and Offramp for a
                  seamless user experience.
                </p>
                <Link
                  href="#combined-flow"
                  className="inline-block bg-white text-purple-700 font-bold py-2 px-4 rounded hover:bg-gray-100 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>

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
                </tr>
              </thead>
              <tbody>
                <FeatureRow
                  feature="Direction"
                  onramp="Fiat → Crypto"
                  offramp="Crypto → Fiat"
                />
                <FeatureRow
                  feature="Primary Use Case"
                  onramp="Bringing users onchain"
                  offramp="Cashing out crypto"
                />
                <FeatureRow
                  feature="Payment Methods"
                  onramp="Debit/Credit Cards, Bank Transfers, Apple Pay, Coinbase Account"
                  offramp="Bank Account (ACH), PayPal, Coinbase Account"
                />
                <FeatureRow
                  feature="Guest Checkout"
                  onramp="Yes (US only)"
                  offramp="No (Coinbase account required)"
                />
                <FeatureRow
                  feature="Supported Countries"
                  onramp="90+ countries"
                  offramp="Available in most Coinbase-supported countries"
                />
                <FeatureRow
                  feature="Transaction Limits"
                  onramp="Varies by payment method and country"
                  offramp="Varies by cashout method and country"
                />
                <FeatureRow
                  feature="Implementation"
                  onramp="URL generation or React components"
                  offramp="URL generation with redirect handling"
                />
                <FeatureRow
                  feature="Transaction Flow"
                  onramp="Select asset → Pay → Receive crypto"
                  offramp="Select asset → Confirm → Send crypto → Receive fiat"
                />
                <FeatureRow
                  feature="Transaction Status API"
                  onramp="Yes"
                  offramp="Yes"
                />
                <FeatureRow
                  feature="SDK Support"
                  onramp="OnchainKit, REST API"
                  offramp="REST API"
                />
                <FeatureRow
                  feature="Price Protection"
                  onramp="Price locked at time of quote"
                  offramp="Transaction cancelled if price drops below minimum"
                />
                <FeatureRow
                  feature="Network Support"
                  onramp="Multiple networks per asset (L2 support)"
                  offramp="Multiple networks per asset (L2 support)"
                />
                <FeatureRow
                  feature="Fee Structure"
                  onramp="Spread + Coinbase fee + Network fee (0% for USDC)"
                  offramp="Spread + Coinbase fee"
                />
              </tbody>
            </table>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 dark:text-white">
                When to Use Onramp
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>When users need to purchase crypto with fiat</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>
                    For NFT marketplaces where users need ETH to make purchases
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>
                    For DeFi applications where users need to fund their wallets
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>
                    To reduce friction in onboarding new users to Web3
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>
                    When you want to offer a guest checkout option (US only)
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 dark:text-white">
                When to Use Offramp
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>When users want to convert crypto back to fiat</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>
                    For gaming applications where users earn crypto rewards
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>
                    For marketplaces where sellers receive crypto payments
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>
                    To provide liquidity options for users with crypto holdings
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>
                    When you want to offer a complete crypto experience
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div
            id="combined-flow"
            className="mt-12 bg-purple-50 dark:bg-purple-900/30 p-6 rounded-lg"
          >
            <h3 className="text-xl font-bold mb-6 dark:text-white text-center">
              Combined Onramp & Offramp Flow
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-center">
              Implementing both Onramp and Offramp provides a complete solution
              for your users, allowing them to move seamlessly between fiat and
              crypto.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-lg mb-4 text-purple-700 dark:text-purple-400">
                  Complete User Journey
                </h4>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <div className="ml-4">
                      <h5 className="font-medium dark:text-white">
                        User Onboarding
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        New user signs up for your application
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <div className="ml-4">
                      <h5 className="font-medium dark:text-white">
                        Onramp Integration
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        User purchases crypto with fiat using Onramp
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <div className="ml-4">
                      <h5 className="font-medium dark:text-white">
                        Application Usage
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        User interacts with your application using crypto
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      4
                    </div>
                    <div className="ml-4">
                      <h5 className="font-medium dark:text-white">
                        Offramp Integration
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        User converts crypto back to fiat using Offramp
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                      5
                    </div>
                    <div className="ml-4">
                      <h5 className="font-medium dark:text-white">
                        Continued Engagement
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        User returns to repeat the cycle as needed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-lg mb-4 text-purple-700 dark:text-purple-400">
                  Implementation Strategy
                </h4>
                <ol className="list-decimal pl-5 space-y-3 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Identify User Touchpoints:</strong> Determine where
                    in your application users need to move between fiat and
                    crypto
                  </li>
                  <li>
                    <strong>Implement Onramp First:</strong> Start with Onramp
                    to help users acquire crypto, as this is typically the first
                    step
                  </li>
                  <li>
                    <strong>Add Offramp:</strong> Once Onramp is working, add
                    Offramp to provide a complete solution
                  </li>
                  <li>
                    <strong>Unified Transaction Tracking:</strong> Use the
                    Transaction Status APIs to track both Onramp and Offramp
                    transactions
                  </li>
                  <li>
                    <strong>Consistent UI:</strong> Maintain a consistent user
                    interface for both Onramp and Offramp to provide a seamless
                    experience
                  </li>
                  <li>
                    <strong>User Education:</strong> Provide clear guidance on
                    when and how to use each feature
                  </li>
                </ol>
                <div className="mt-6 p-4 bg-purple-100 dark:bg-purple-800/50 rounded-lg">
                  <h5 className="font-medium mb-2 text-purple-700 dark:text-purple-300">
                    Pro Tip
                  </h5>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Use the partnerUserId parameter consistently across both
                    Onramp and Offramp to link all transactions to the same user
                    in your application.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 dark:text-white">
                Integration Best Practices
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-2 dark:text-white">
                    Onramp Integration
                  </h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">1.</span>
                      <span>Use OnchainKit for the simplest integration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">2.</span>
                      <span>
                        Implement the Transaction Status API to track purchases
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">3.</span>
                      <span>
                        Use One-Click-Buy URLs for a streamlined experience
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">4.</span>
                      <span>
                        Consider using Session Tokens for enhanced security
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-2 dark:text-white">
                    Offramp Integration
                  </h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">1.</span>
                      <span>
                        Generate Offramp URLs with all required parameters
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">2.</span>
                      <span>Handle redirects properly in your application</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">3.</span>
                      <span>
                        Use the Transaction Status API to get the destination
                        address
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">4.</span>
                      <span>Guide users through the onchain send process</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 dark:text-white">
                Security Considerations
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">⚠️</span>
                  <div>
                    <strong>API Key Security:</strong> Store your CDP API keys
                    securely and never expose them in client-side code
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">⚠️</span>
                  <div>
                    <strong>Session Tokens:</strong> Use session tokens to avoid
                    exposing sensitive parameters in URLs
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">⚠️</span>
                  <div>
                    <strong>Domain Allowlisting:</strong> Add your redirect URLs
                    to your domain allowlist in the CDP portal
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">⚠️</span>
                  <div>
                    <strong>Transaction Validation:</strong> Always validate
                    transaction parameters before processing
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">⚠️</span>
                  <div>
                    <strong>User Education:</strong> Clearly communicate
                    transaction details and fees to users
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureRow({
  feature,
  onramp,
  offramp,
}: {
  feature: string;
  onramp: string;
  offramp: string;
}) {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700">
      <td className="p-4 border border-gray-200 dark:border-gray-700 font-medium text-gray-700 dark:text-gray-300">
        {feature}
      </td>
      <td className="p-4 border border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400">
        {onramp}
      </td>
      <td className="p-4 border border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400">
        {offramp}
      </td>
    </tr>
  );
}
