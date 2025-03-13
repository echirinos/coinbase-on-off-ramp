"use client";

import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { generateOfframpURL } from "../utils/rampUtils";
import {
  fetchSellConfig,
  fetchSellOptions,
  Country,
  CryptoAsset,
} from "../utils/offrampApi";
import { useSearchParams } from "next/navigation";
import OfframpNotification from "./OfframpNotification";

// Define types for the modal component
interface SimpleModalProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
  actions: React.ReactNode;
}

// Simple modal component
const SimpleModal: React.FC<SimpleModalProps> = ({
  title,
  content,
  onClose,
  actions,
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      <div className="mb-4">{content}</div>
      <div className="flex gap-2">{actions}</div>
    </div>
  </div>
);

// Define types for cashout methods
interface CashoutMethod {
  id: string;
  name: string;
}

// Define types for network
interface Network {
  id: string;
  name: string;
}

export default function OfframpFeature() {
  // Core states
  const { address, isConnected } = useAccount();
  const [selectedAsset, setSelectedAsset] = useState<string>("USDC");
  const [amount, setAmount] = useState<string>("10");
  const [selectedNetwork, setSelectedNetwork] = useState<string>("ethereum");
  const [selectedCashoutMethod, setSelectedCashoutMethod] =
    useState<string>("ACH_BANK_ACCOUNT");
  const [activeTab, setActiveTab] = useState<"api" | "url">("api");

  // UI states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [generatedUrl, setGeneratedUrl] = useState<string>("");
  const [showNotification, setShowNotification] = useState<boolean>(false);

  // Data states
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("US");
  const [selectedSubdivision, setSelectedSubdivision] = useState<string>("CA");
  const [subdivisions, setSubdivisions] = useState<string[]>([]);
  const [availableAssets, setAvailableAssets] = useState<CryptoAsset[]>([]);
  const [availableNetworks, setAvailableNetworks] = useState<Network[]>([]);
  const [cashoutMethods, setCashoutMethods] = useState<CashoutMethod[]>([
    { id: "ACH_BANK_ACCOUNT", name: "Bank Transfer (ACH)" },
    { id: "PAYPAL", name: "PayPal" },
    { id: "FIAT_WALLET", name: "Coinbase Fiat Wallet" },
  ]);

  // Check for status in URL
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  // Show notification if returning from Coinbase with a status
  useEffect(() => {
    if (status) {
      setShowNotification(true);
    }
  }, [status]);

  // Fetch countries and cashout methods on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const config = await fetchSellConfig();
        if (config && config.countries) {
          setCountries(config.countries);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Fetch assets and networks when country or subdivision changes
  useEffect(() => {
    const fetchAssets = async () => {
      if (!selectedCountry) return;

      try {
        const options = await fetchSellOptions(
          selectedCountry,
          selectedSubdivision
        );
        if (options && options.sell_currencies) {
          setAvailableAssets(options.sell_currencies);

          // Set default asset to USDC if available
          const usdcAsset = options.sell_currencies.find(
            (a) => a.code === "USDC"
          );
          if (usdcAsset) {
            setSelectedAsset("USDC");

            // Set available networks for USDC
            if (usdcAsset.networks && usdcAsset.networks.length > 0) {
              setAvailableNetworks(usdcAsset.networks);

              // Set default network to base if available
              const baseNetwork = usdcAsset.networks.find(
                (n) => n.id === "base"
              );
              if (baseNetwork) {
                setSelectedNetwork("base");
              } else if (usdcAsset.networks.length > 0) {
                setSelectedNetwork(usdcAsset.networks[0].id);
              }
            }
          } else if (options.sell_currencies.length > 0) {
            // Default to first available asset
            setSelectedAsset(options.sell_currencies[0].code);

            // Set available networks for the selected asset
            if (
              options.sell_currencies[0].networks &&
              options.sell_currencies[0].networks.length > 0
            ) {
              setAvailableNetworks(options.sell_currencies[0].networks);
              setSelectedNetwork(options.sell_currencies[0].networks[0].id);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchAssets();
  }, [selectedCountry, selectedSubdivision]);

  // Handle asset change
  const handleAssetChange = (assetCode: string) => {
    setSelectedAsset(assetCode);

    // Update networks for the selected asset
    const asset = availableAssets.find((a) => a.code === assetCode);
    if (asset && asset.networks && asset.networks.length > 0) {
      setAvailableNetworks(asset.networks);
      setSelectedNetwork(asset.networks[0].id);
    } else {
      setAvailableNetworks([]);
    }
  };

  // Handle offramp
  const handleOfframp = () => {
    // Clear any previous error
    setErrorMessage(null);

    // Validate wallet connection for API mode
    if (activeTab === "api" && !isConnected) {
      setErrorMessage("Please connect your wallet first");
      return;
    }

    // Validate amount
    if (!amount || parseFloat(amount) <= 0) {
      setErrorMessage("Please enter a valid amount");
      return;
    }

    // Start loading
    setIsLoading(true);

    try {
      // Generate offramp URL
      const url = generateOfframpURL({
        asset: selectedAsset,
        amount: amount,
        network: selectedNetwork,
        cashoutMethod: selectedCashoutMethod,
        address: address || "0x0000000000000000000000000000000000000000",
        redirectUrl: window.location.origin + "/offramp?status=success",
      });

      // Handle URL based on active tab
      if (activeTab === "url") {
        setGeneratedUrl(url);
        setShowModal(true);
      } else {
        window.open(url, "_blank");
      }
    } catch (error) {
      console.error("Error generating offramp URL:", error);
      setErrorMessage("Failed to generate offramp URL");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle copy URL
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(generatedUrl);
    alert("URL copied to clipboard!");
  };

  // Handle open URL
  const handleOpenUrl = () => {
    window.open(generatedUrl, "_blank");
  };

  // Get the selected asset name for display
  const getSelectedAssetName = () => {
    const asset = availableAssets.find((a) => a.code === selectedAsset);
    return asset ? asset.name : selectedAsset;
  };

  // Get the selected network name for display
  const getSelectedNetworkName = () => {
    const network = availableNetworks.find((n) => n.id === selectedNetwork);
    return network ? network.name : selectedNetwork;
  };

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Configuration Box */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-xl font-bold mb-6 text-gray-800">
                Configure Your Offramp
              </h3>

              {/* Tab Selection */}
              <div className="mb-6">
                <div className="flex space-x-2 mb-2">
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      activeTab === "api"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 border border-gray-200"
                    }`}
                    onClick={() => setActiveTab("api")}
                  >
                    Offramp API
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      activeTab === "url"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 border border-gray-200"
                    }`}
                    onClick={() => setActiveTab("url")}
                  >
                    One-time Payment Link
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  {activeTab === "api"
                    ? "Connect your wallet to sell crypto for fiat"
                    : "Generate a link to share with others"}
                </p>
              </div>

              {/* Connect Wallet Button */}
              {activeTab === "api" && !isConnected && (
                <div className="mb-6">
                  <button
                    onClick={() =>
                      document.getElementById("connect-wallet-button")?.click()
                    }
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg"
                  >
                    Connect Wallet
                  </button>
                </div>
              )}

              {/* Country Selection */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">
                  Country
                </label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="block w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-800"
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* State Selection (for US) */}
              {subdivisions.length > 0 && (
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 font-medium">
                    State
                  </label>
                  <select
                    value={selectedSubdivision}
                    onChange={(e) => setSelectedSubdivision(e.target.value)}
                    className="block w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-800"
                  >
                    {subdivisions.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Asset Selection */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">
                  Select Asset
                </label>
                <select
                  value={selectedAsset}
                  onChange={(e) => handleAssetChange(e.target.value)}
                  className="block w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-800"
                >
                  {availableAssets.map((asset) => (
                    <option key={asset.code} value={asset.code}>
                      {asset.name} ({asset.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Network Selection */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">
                  Network
                </label>
                <select
                  value={selectedNetwork}
                  onChange={(e) => setSelectedNetwork(e.target.value)}
                  className="block w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-800"
                >
                  {availableNetworks.map((network) => (
                    <option key={network.id} value={network.id}>
                      {network.name}
                    </option>
                  ))}
                </select>
                {availableNetworks.length > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedAsset} is available on {availableNetworks.length}{" "}
                    network{availableNetworks.length > 1 ? "s" : ""}
                  </p>
                )}
              </div>

              {/* Amount Input */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">
                  Amount
                </label>
                <div className="flex space-x-2 mb-2">
                  <button
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg text-gray-800"
                    onClick={() => setAmount("10")}
                  >
                    $10
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg text-gray-800"
                    onClick={() => setAmount("25")}
                  >
                    $25
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg text-gray-800"
                    onClick={() => setAmount("50")}
                  >
                    $50
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    $
                  </span>
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="block w-full bg-white border border-gray-300 rounded-lg py-3 pl-8 pr-4 text-gray-800"
                  />
                </div>
              </div>

              {/* Cashout Method */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">
                  Cashout Method
                </label>
                <select
                  value={selectedCashoutMethod}
                  onChange={(e) => setSelectedCashoutMethod(e.target.value)}
                  className="block w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-800"
                >
                  {cashoutMethods.map((method) => (
                    <option key={method.id} value={method.id}>
                      {method.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Button */}
              <button
                onClick={handleOfframp}
                disabled={isLoading || (activeTab === "api" && !isConnected)}
                className={`w-full py-3 px-4 rounded-lg font-medium ${
                  isLoading || (activeTab === "api" && !isConnected)
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {isLoading
                  ? "Loading..."
                  : activeTab === "api"
                  ? "Start Offramp"
                  : "Generate Link"}
              </button>

              {/* Error Message */}
              {errorMessage && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200">
                  {errorMessage}
                </div>
              )}
            </div>

            {/* Preview Box */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-xl font-bold mb-6 text-gray-800">Preview</h3>

              {activeTab === "api" ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <button
                    onClick={handleOfframp}
                    disabled={!isConnected || isLoading}
                    className={`px-8 py-3 rounded-lg font-medium mb-4 ${
                      !isConnected || isLoading
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-purple-600 hover:bg-purple-700 text-white"
                    }`}
                  >
                    Sell with Coinbase
                  </button>
                  <p className="text-gray-500 text-sm">
                    A simple button that opens the Coinbase Offramp flow
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500 mb-1">You'll receive</p>
                    <p className="text-2xl font-bold text-gray-800">
                      ${parseFloat(amount || "0").toFixed(2)}
                    </p>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500 mb-1">Selling</p>
                    <p className="font-medium text-gray-800">
                      {getSelectedAssetName()} ({selectedAsset})
                    </p>
                    <p className="text-sm text-gray-500">
                      on {getSelectedNetworkName()}
                    </p>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500 mb-1">Cashout Method</p>
                    <p className="font-medium text-gray-800">
                      {cashoutMethods.find(
                        (m) => m.id === selectedCashoutMethod
                      )?.name || selectedCashoutMethod}
                    </p>
                  </div>

                  {isConnected && (
                    <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500 mb-1">
                        Connected Wallet
                      </p>
                      <p className="font-medium text-gray-800">
                        {address
                          ? `${address.substring(0, 6)}...${address.substring(
                              address.length - 4
                            )}`
                          : "Not connected"}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={handleOfframp}
                    disabled={isLoading}
                    className={`w-full py-3 px-4 rounded-lg font-medium mt-6 ${
                      isLoading
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-purple-600 hover:bg-purple-700 text-white"
                    }`}
                  >
                    {isLoading ? "Generating..." : "Generate Link"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* URL Modal */}
      {showModal && (
        <SimpleModal
          title="Generated Offramp URL"
          content={
            <div>
              <p className="text-gray-700 mb-2">
                Use this URL to redirect users to Coinbase:
              </p>
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-100 overflow-hidden">
                <div className="text-xs text-gray-800 break-all max-h-32 overflow-y-auto">
                  {generatedUrl}
                </div>
              </div>
            </div>
          }
          onClose={() => setShowModal(false)}
          actions={
            <>
              <button
                onClick={handleCopyUrl}
                className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 py-2 px-4 rounded-lg font-medium"
              >
                Copy URL
              </button>
              <button
                onClick={handleOpenUrl}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium"
              >
                Open URL
              </button>
            </>
          }
        />
      )}

      {/* Notification */}
      {showNotification && (
        <OfframpNotification
          onClose={() => setShowNotification(false)}
          status={status || "default"}
        />
      )}
    </div>
  );
}
