"use client";

import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { generateOnrampURL } from "../utils/rampUtils";
import GeneratedLinkModal from "./GeneratedLinkModal";

export default function OnrampFeature() {
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<"api" | "url">("api");
  const [selectedAsset, setSelectedAsset] = useState("ETH");
  const [amount, setAmount] = useState("100");
  const [selectedNetwork, setSelectedNetwork] = useState("ethereum");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [showUrlModal, setShowUrlModal] = useState(false);

  // Define supported payment methods
  const paymentMethods = [
    {
      id: "CARD",
      name: "Debit Card",
      description: "Available in 90+ countries",
    },
    {
      id: "ACH_BANK_ACCOUNT",
      name: "Bank Transfer (ACH)",
      description: "US only",
    },
    { id: "APPLE_PAY", name: "Apple Pay", description: "US only" },
    {
      id: "FIAT_WALLET",
      name: "Coinbase Fiat Wallet",
      description: "Requires Coinbase account",
    },
    {
      id: "CRYPTO_WALLET",
      name: "Coinbase Crypto Wallet",
      description: "Requires Coinbase account",
    },
  ];

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethods[0].id
  );
  const [enableGuestCheckout, setEnableGuestCheckout] = useState(true);

  // Define supported assets
  const assets = [
    { symbol: "ETH", name: "Ethereum" },
    { symbol: "USDC", name: "USD Coin" },
    { symbol: "BTC", name: "Bitcoin" },
    { symbol: "SOL", name: "Solana" },
    { symbol: "MATIC", name: "Polygon" },
    { symbol: "AVAX", name: "Avalanche" },
  ];

  // Define supported networks
  const networks = [
    { id: "ethereum", name: "Ethereum" },
    { id: "base", name: "Base" },
    { id: "optimism", name: "Optimism" },
    { id: "polygon", name: "Polygon" },
    { id: "arbitrum", name: "Arbitrum" },
    { id: "avalanche-c-chain", name: "Avalanche" },
    { id: "solana", name: "Solana" },
  ];

  // Generate one-time URL
  const handleGenerateUrl = () => {
    if (!address && activeTab === "url") {
      alert("Please connect your wallet first");
      return;
    }

    const url = generateOnrampURL({
      asset: selectedAsset,
      amount,
      network: selectedNetwork,
      paymentMethod: selectedPaymentMethod,
      address: address || "0x0000000000000000000000000000000000000000",
      redirectUrl: window.location.origin + "/onramp?status=success",
      enableGuestCheckout: enableGuestCheckout,
    });

    setGeneratedUrl(url);
    setShowUrlModal(true);
  };

  // Handle direct onramp
  const handleOnramp = () => {
    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }

    const url = generateOnrampURL({
      asset: selectedAsset,
      amount,
      network: selectedNetwork,
      paymentMethod: selectedPaymentMethod,
      address: address || "0x0000000000000000000000000000000000000000",
      redirectUrl: window.location.origin + "/onramp?status=success",
      enableGuestCheckout: enableGuestCheckout,
    });

    window.open(url, "_blank");
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(generatedUrl);
    alert("URL copied to clipboard!");
  };

  const handleOpenUrl = () => {
    window.open(generatedUrl, "_blank");
  };

  return (
    <div className="bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-6 dark:text-white">
                Configure Your Onramp
              </h3>

              {/* Integration Method Tabs */}
              <div className="mb-8">
                <div className="flex space-x-2 mb-4">
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      activeTab === "api"
                        ? "bg-gray-700 text-white"
                        : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("api")}
                  >
                    Onramp API
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      activeTab === "url"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("url")}
                  >
                    One-time Payment Link
                  </button>
                </div>
              </div>

              {/* Connect Wallet Button */}
              {!isConnected && (
                <div className="mb-6">
                  <button
                    onClick={() =>
                      document.getElementById("connect-wallet-button")?.click()
                    }
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
                  >
                    Connect Wallet
                  </button>
                </div>
              )}

              {/* Asset Selection */}
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  Select Asset
                </label>
                <div className="relative">
                  <select
                    value={selectedAsset}
                    onChange={(e) => setSelectedAsset(e.target.value)}
                    className="block w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-3 px-4 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {assets.map((asset) => (
                      <option key={asset.symbol} value={asset.symbol}>
                        {asset.name} ({asset.symbol})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  Amount
                </label>
                <div className="flex space-x-2 mb-2">
                  <button
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors"
                    onClick={() => setAmount("10")}
                  >
                    $10
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors"
                    onClick={() => setAmount("25")}
                  >
                    $25
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors"
                    onClick={() => setAmount("50")}
                  >
                    $50
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white">
                    $
                  </span>
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="block w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-8 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  Payment Method
                </label>
                <div className="relative">
                  <select
                    value={selectedPaymentMethod}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="block w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-3 px-4 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {paymentMethods.map((method) => (
                      <option key={method.id} value={method.id}>
                        {method.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Guest Checkout Toggle */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <label className="text-gray-700 dark:text-gray-300 font-medium">
                    Enable Guest Checkout
                  </label>
                  <div
                    className={`relative inline-block w-12 h-6 transition-colors duration-200 ease-in-out rounded-full ${
                      enableGuestCheckout
                        ? "bg-blue-600"
                        : "bg-gray-400 dark:bg-gray-600"
                    }`}
                    onClick={() => setEnableGuestCheckout(!enableGuestCheckout)}
                  >
                    <span
                      className={`absolute left-1 top-1 w-4 h-4 transition-transform duration-200 ease-in-out bg-white rounded-full ${
                        enableGuestCheckout ? "transform translate-x-6" : ""
                      }`}
                    ></span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Allow users to checkout without a Coinbase account
                </p>
              </div>

              {/* Action Button */}
              {activeTab === "api" ? (
                <button
                  onClick={handleOnramp}
                  disabled={!isConnected}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                    isConnected
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                      : "bg-gray-600 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  Connect Wallet to Continue
                </button>
              ) : (
                <button
                  onClick={handleGenerateUrl}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  Generate Payment Link
                </button>
              )}
            </div>

            {/* Preview Section */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 flex flex-col">
              <h3 className="text-xl font-bold mb-6 dark:text-white">
                Preview
              </h3>

              <div className="flex-grow flex items-center justify-center">
                {activeTab === "api" ? (
                  <div className="text-center">
                    <div className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg mb-4">
                      Buy with Coinbase
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      A simple button that opens the Coinbase Onramp flow
                    </p>
                  </div>
                ) : (
                  <div className="w-full max-w-sm bg-gray-700 rounded-xl shadow-lg p-6 border border-gray-600">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-white">
                        One-time Payment Link
                      </h4>
                      <span className="text-blue-400">
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path>
                        </svg>
                      </span>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm text-gray-400 mb-1">Amount</div>
                      <div className="text-2xl font-bold text-white">
                        ${amount}
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm text-gray-400 mb-1">Asset</div>
                      <div className="flex items-center text-white">USDC</div>
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all">
                      Generate Link
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* URL Modal */}
          {showUrlModal && (
            <GeneratedLinkModal
              title="Generated Onramp URL"
              url={generatedUrl}
              onClose={() => setShowUrlModal(false)}
              onCopy={handleCopyUrl}
              onOpen={handleOpenUrl}
            />
          )}
        </div>
      </div>
    </div>
  );
}
