"use client";

import React, { useState, useEffect } from "react";
import { FundButton } from "@coinbase/onchainkit/fund";
import { useCoinbaseRampTransaction } from "../contexts/CoinbaseRampTransactionContext";
import { useAccount } from "wagmi";
import { getOnrampBuyUrl } from "@coinbase/onchainkit/fund";

// Custom ChevronDown component instead of importing from lucide-react
const ChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export function FundButtonFeature() {
  const [buttonText, setButtonText] = useState("Fund Project");
  const [selectedAsset, setSelectedAsset] = useState("ETH");
  const [isAssetDropdownOpen, setIsAssetDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hideIcon, setHideIcon] = useState(false);
  const [hideText, setHideText] = useState(false);
  const [openIn, setOpenIn] = useState<"popup" | "tab">("popup");
  const { address, isConnected } = useAccount();
  const [cdpProjectId, setCdpProjectId] = useState("");

  const supportedAssets = [
    { symbol: "ETH", name: "Ethereum" },
    { symbol: "USDC", name: "USD Coin" },
    { symbol: "MATIC", name: "Polygon" },
    { symbol: "AVAX", name: "Avalanche" },
    { symbol: "ARB", name: "Arbitrum" },
    { symbol: "OP", name: "Optimism" },
  ];

  useEffect(() => {
    // Fetch the configuration from our secure API endpoint
    const fetchConfig = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setCdpProjectId(data.config.cdpProjectId || "");
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch configuration:", error);
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const handleAssetSelect = (asset: string) => {
    setSelectedAsset(asset);
    setIsAssetDropdownOpen(false);
  };

  const handleButtonTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setButtonText(e.target.value);
  };

  // Generate custom onramp URL based on selected options
  const getCustomOnrampUrl = () => {
    console.log("getCustomOnrampUrl called with:", { address, cdpProjectId });
    if (!address || !cdpProjectId) return undefined;

    const url = getOnrampBuyUrl({
      projectId: cdpProjectId,
      addresses: { [address]: ["base"] },
      assets: [selectedAsset],
      presetFiatAmount: 20,
      fiatCurrency: "USD",
    });
    console.log("Generated onramp URL:", url);
    return url;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
        <h3 className="text-xl font-bold mb-6 dark:text-white">
          Configure Fund Button
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          The Fund Button allows your users to contribute funds to your dApp or
          project in a seamless manner.
        </p>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="asset"
                className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
              >
                Select Asset
              </label>
              <div className="relative">
                <button
                  onClick={() => setIsAssetDropdownOpen(!isAssetDropdownOpen)}
                  className="flex items-center justify-between w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <span>{selectedAsset}</span>
                  <ChevronDown />
                </button>
                {isAssetDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-gray-700 border border-gray-600 rounded-lg shadow-lg">
                    <ul className="py-1 max-h-60 overflow-auto">
                      {supportedAssets.map((asset) => (
                        <li key={asset.symbol}>
                          <button
                            onClick={() => handleAssetSelect(asset.symbol)}
                            className="w-full text-left px-4 py-2 text-white hover:bg-gray-600 focus:outline-none"
                          >
                            {asset.name} ({asset.symbol})
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="button-text"
                className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
              >
                Button Text
              </label>
              <input
                type="text"
                id="button-text"
                value={buttonText}
                onChange={handleButtonTextChange}
                className="block w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Display Options
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setHideIcon(!hideIcon)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    hideIcon
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                >
                  {hideIcon ? "Icon Hidden" : "Hide Icon"}
                </button>
                <button
                  onClick={() => setHideText(!hideText)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    hideText
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                >
                  {hideText ? "Text Hidden" : "Hide Text"}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Open In
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setOpenIn("popup")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    openIn === "popup"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                >
                  Popup
                </button>
                <button
                  onClick={() => setOpenIn("tab")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    openIn === "tab"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                >
                  New Tab
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 flex flex-col">
        <h3 className="text-xl font-bold mb-6 dark:text-white">Preview</h3>
        <div className="flex-grow flex items-center justify-center">
          {isLoading ? (
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-lg bg-gray-700 h-12 w-32"></div>
            </div>
          ) : (
            <div className="text-center">
              {isConnected ? (
                <FundButton
                  text={hideText ? undefined : buttonText}
                  hideIcon={hideIcon}
                  hideText={hideText}
                  openIn={openIn}
                  fundingUrl={getCustomOnrampUrl()}
                />
              ) : (
                <div className="text-amber-600 dark:text-amber-400 text-sm">
                  Please connect your wallet to use the Fund Button
                </div>
              )}
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
                A simple button that opens the Coinbase Fund flow
              </p>
              <p className="text-amber-600 dark:text-amber-400 text-xs mt-2">
                Wallet connection required to use
              </p>
              {cdpProjectId ? (
                <p className="text-green-600 dark:text-green-400 text-xs mt-2">
                  CDP Project ID loaded successfully
                </p>
              ) : (
                <p className="text-red-600 dark:text-red-400 text-xs mt-2">
                  CDP Project ID not loaded
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
