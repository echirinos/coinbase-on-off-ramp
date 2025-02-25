"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { generateOnrampURL } from "../utils/rampUtils";

export default function OnrampFeature() {
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<"button" | "card" | "url">(
    "button"
  );
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
      icon: "💳",
    },
    {
      id: "ACH_BANK_ACCOUNT",
      name: "Bank Transfer (ACH)",
      description: "US only",
      icon: "🏦",
    },
    { id: "APPLE_PAY", name: "Apple Pay", description: "US only", icon: "🍎" },
    {
      id: "FIAT_WALLET",
      name: "Coinbase Fiat Wallet",
      description: "Requires Coinbase account",
      icon: "💰",
    },
    {
      id: "CRYPTO_WALLET",
      name: "Coinbase Crypto Wallet",
      description: "Requires Coinbase account",
      icon: "🪙",
    },
  ];

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethods[0].id
  );
  const [enableGuestCheckout, setEnableGuestCheckout] = useState(true);

  // Define supported assets
  const assets = [
    { symbol: "ETH", name: "Ethereum", icon: "⟠" },
    { symbol: "USDC", name: "USD Coin", icon: "💵" },
    { symbol: "BTC", name: "Bitcoin", icon: "₿" },
    { symbol: "SOL", name: "Solana", icon: "◎" },
    { symbol: "MATIC", name: "Polygon", icon: "⬡" },
    { symbol: "AVAX", name: "Avalanche", icon: "🔺" },
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

  return (
    <div className="bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
              Coinbase Onramp
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Easily convert fiat to crypto and bring users onchain with
              Coinbase Onramp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-6 dark:text-white">
                Configure Your Onramp
              </h3>

              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  Integration Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setActiveTab("button")}
                    className={`p-4 rounded-lg flex flex-col items-center justify-center transition-all ${
                      activeTab === "button"
                        ? "bg-green-600 text-white border-2 border-green-600 shadow-md"
                        : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-500 hover:shadow-sm text-gray-800 dark:text-white"
                    }`}
                  >
                    <svg
                      className="w-6 h-6 mb-2"
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
                    <div className="font-medium">Direct Integration</div>
                    <div className="text-xs mt-1">
                      Open Coinbase Onramp directly
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab("url")}
                    className={`p-4 rounded-lg flex flex-col items-center justify-center transition-all ${
                      activeTab === "url"
                        ? "bg-green-600 text-white border-2 border-green-600 shadow-md"
                        : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-500 hover:shadow-sm text-gray-800 dark:text-white"
                    }`}
                  >
                    <svg
                      className="w-6 h-6 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.172 13.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101"
                      ></path>
                    </svg>
                    <div className="font-medium">Generate URL</div>
                    <div className="text-xs mt-1">
                      Create a URL for custom integration
                    </div>
                  </button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {activeTab === "button"
                    ? "Direct integration opens Coinbase Onramp in a new window. Requires wallet connection."
                    : "Generate a URL that can be used in your application to redirect users to Coinbase Onramp."}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  Your Wallet Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={address || "Please connect your wallet"}
                    readOnly
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-mono text-sm shadow-sm focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400"
                  />
                  {address && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(address);
                          alert("Address copied to clipboard!");
                        }}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        title="Copy address"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Connected wallet address where crypto will be sent
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-3 font-medium">
                  Select Asset
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {assets.map((asset) => (
                    <button
                      key={asset.symbol}
                      onClick={() => setSelectedAsset(asset.symbol)}
                      className={`p-3 rounded-lg flex items-center transition-all ${
                        selectedAsset === asset.symbol
                          ? "bg-green-600 text-white border-2 border-green-600 shadow-md"
                          : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-500 hover:shadow-sm text-gray-800 dark:text-white"
                      }`}
                    >
                      <span className="text-2xl mr-2">{asset.icon}</span>
                      <div>
                        <div className="font-medium text-gray-800 dark:text-white">
                          {asset.symbol}
                        </div>
                        <div className="text-xs text-gray-700 dark:text-gray-300">
                          {asset.name}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  Amount (USD)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400">$</span>
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-8 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-sm focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400"
                    min="5"
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Minimum amount: $5
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-3 font-medium">
                  Payment Method
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      className={`p-3 rounded-lg flex items-center transition-all ${
                        selectedPaymentMethod === method.id
                          ? "bg-green-600 text-white border-2 border-green-600 shadow-md"
                          : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-500 hover:shadow-sm text-gray-800 dark:text-white"
                      }`}
                    >
                      <span className="text-2xl mr-3">{method.icon}</span>
                      <div>
                        <div className="font-medium text-gray-800 dark:text-white">
                          {method.name}
                        </div>
                        <div className="text-xs text-gray-700 dark:text-gray-300">
                          {method.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    id="guest-checkout"
                    type="checkbox"
                    checked={enableGuestCheckout}
                    onChange={(e) => setEnableGuestCheckout(e.target.checked)}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="guest-checkout"
                    className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Enable Guest Checkout
                  </label>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-6">
                  Allows users to purchase crypto without a Coinbase account (US
                  only, limited to debit cards and Apple Pay)
                </p>
              </div>

              <div className="mb-6">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-green-600 dark:text-green-400 text-sm flex items-center font-medium"
                >
                  {showAdvanced ? "Hide" : "Show"} Advanced Options
                  <svg
                    className={`ml-1 w-4 h-4 transition-transform ${
                      showAdvanced ? "rotate-180" : ""
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

                {showAdvanced && (
                  <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <div className="mb-4">
                      <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                        Network
                      </label>
                      <select
                        value={selectedNetwork}
                        onChange={(e) => setSelectedNetwork(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                      >
                        {networks.map((network) => (
                          <option key={network.id} value={network.id}>
                            {network.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8">
                {activeTab === "button" ? (
                  <button
                    onClick={handleOnramp}
                    disabled={!isConnected}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white flex items-center justify-center ${
                      isConnected
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-400 cursor-not-allowed"
                    } transition-colors shadow-md`}
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                    Buy {selectedAsset} with{" "}
                    {
                      paymentMethods.find((m) => m.id === selectedPaymentMethod)
                        ?.name
                    }
                  </button>
                ) : (
                  <button
                    onClick={handleGenerateUrl}
                    className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center justify-center transition-colors shadow-md"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.172 13.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101"
                      ></path>
                    </svg>
                    Generate Onramp URL
                  </button>
                )}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-6 dark:text-white">
                How It Works
              </h3>

              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
                      1
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium dark:text-white">
                      Configure
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      Select the asset you want to purchase, the amount, and
                      your preferred payment method.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
                      2
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium dark:text-white">
                      Initiate
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      Click the button to start the onramp process. You'll be
                      redirected to Coinbase to complete your purchase.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
                      3
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium dark:text-white">
                      Complete
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      Follow the steps on Coinbase to complete your purchase.
                      Once done, you'll be redirected back to this application.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
                      4
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium dark:text-white">
                      Receive
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      Your purchased crypto will be sent to your connected
                      wallet address. The transaction typically completes within
                      minutes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  Developer Note
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                  In a production environment, you would implement transaction
                  status tracking using the Coinbase Transaction Status API to
                  monitor the progress of each transaction.
                </p>
              </div>
            </div>
          </div>

          {/* URL Modal */}
          {showUrlModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold dark:text-white">
                    Generated Onramp URL
                  </h3>
                  <button
                    onClick={() => setShowUrlModal(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>

                <div className="mb-4">
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    Use this URL to redirect users to Coinbase Onramp:
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg overflow-x-auto">
                    <code className="text-sm text-gray-800 dark:text-gray-200 whitespace-normal break-all">
                      {generatedUrl}
                    </code>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedUrl);
                      alert("URL copied to clipboard!");
                    }}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg font-medium flex items-center justify-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      ></path>
                    </svg>
                    Copy URL
                  </button>
                  <button
                    onClick={() => {
                      window.open(generatedUrl, "_blank");
                      setShowUrlModal(false);
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      ></path>
                    </svg>
                    Open URL
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
