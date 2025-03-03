"use client";

import React, { useState, useEffect } from "react";
import { FundButton, getOnrampBuyUrl } from "@coinbase/onchainkit/fund";
import { useAccount } from "wagmi";

export function FundButtonFeature() {
  const [previewConfig, setPreviewConfig] = useState("");
  const [chainId, setChainId] = useState("1");
  const [asset, setAsset] = useState("ETH");
  const [amount, setAmount] = useState("0.01");
  const [cdpProjectId, setCdpProjectId] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [fiatCurrency, setFiatCurrency] = useState("USD");
  const [isLoading, setIsLoading] = useState(true);
  const [buttonText, setButtonText] = useState("Fund");
  const [hideIcon, setHideIcon] = useState(false);
  const { address, isConnected } = useAccount();

  // List of supported assets with their default amounts
  const supportedAssets = [
    { symbol: "ETH", name: "Ethereum", defaultAmount: "0.01" },
    { symbol: "USDC", name: "USD Coin", defaultAmount: "10" },
    { symbol: "MATIC", name: "Polygon", defaultAmount: "10" },
    { symbol: "AVAX", name: "Avalanche", defaultAmount: "1" },
    { symbol: "ARB", name: "Arbitrum", defaultAmount: "10" },
    { symbol: "OP", name: "Optimism", defaultAmount: "10" },
  ];

  useEffect(() => {
    // Fetch CDP Project ID from server
    const fetchCdpProjectId = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.success && data.config.cdpProjectId) {
          setCdpProjectId(data.config.cdpProjectId);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching CDP Project ID:", error);
        setIsLoading(false);
      }
    };

    fetchCdpProjectId();
  }, []);

  useEffect(() => {
    // Update preview config and custom URL when parameters change
    if (cdpProjectId && address) {
      try {
        // Generate custom onramp URL
        const onrampBuyUrl = getOnrampBuyUrl({
          projectId: cdpProjectId,
          addresses: { [address]: [chainId] },
          assets: [asset],
          presetCryptoAmount: parseFloat(amount) || 0.01,
        });

        setCustomUrl(onrampBuyUrl);

        // Update preview config
        setPreviewConfig(`<FundButton
  fundingUrl="${onrampBuyUrl}"
  openIn="popup"
  text="${buttonText}"
  fiatCurrency="${fiatCurrency}"
  hideIcon={${hideIcon}}
/>`);
      } catch (error) {
        console.error("Error generating onramp URL:", error);
      }
    }
  }, [
    cdpProjectId,
    address,
    chainId,
    asset,
    amount,
    fiatCurrency,
    buttonText,
    hideIcon,
  ]);

  // Handle asset selection and update default amount
  const handleAssetChange = (newAsset: string) => {
    setAsset(newAsset);
    const selectedAsset = supportedAssets.find((a) => a.symbol === newAsset);
    if (selectedAsset) {
      setAmount(selectedAsset.defaultAmount);
    }
  };

  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="container space-y-12">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Fund Button
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
            The Fund Button allows your users to contribute funds to your dApp
            or project in a seamless manner.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Configuration Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">
                Fund Button Configuration
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Customize how the Fund Button appears and functions
              </p>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="asset" className="text-sm font-medium">
                      Asset
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {supportedAssets.map((supportedAsset) => (
                        <button
                          key={supportedAsset.symbol}
                          onClick={() =>
                            handleAssetChange(supportedAsset.symbol)
                          }
                          className={`px-4 py-2 rounded-md ${
                            asset === supportedAsset.symbol
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                          }`}
                        >
                          {supportedAsset.symbol}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="fiat-currency"
                      className="text-sm font-medium"
                    >
                      Fiat Currency
                    </label>
                    <select
                      id="fiat-currency"
                      value={fiatCurrency}
                      onChange={(e) => setFiatCurrency(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="CAD">CAD</option>
                      <option value="AUD">AUD</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="button-text"
                      className="text-sm font-medium"
                    >
                      Button Text
                    </label>
                    <input
                      id="button-text"
                      type="text"
                      value={buttonText}
                      onChange={(e) => setButtonText(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="hide-icon"
                      checked={hideIcon}
                      onChange={() => setHideIcon(!hideIcon)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="hide-icon" className="text-sm font-medium">
                      Hide Icon
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">Fund Button Preview</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                See how your Fund Button will look
              </p>

              <div className="p-6 rounded-md flex items-center justify-center min-h-[200px] bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                {isLoading ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Loading Fund Button...
                    </p>
                  </div>
                ) : !isConnected ? (
                  <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-300">
                      Connect your wallet to use the Fund Button
                    </p>
                  </div>
                ) : customUrl ? (
                  <div className="flex flex-col items-center space-y-4">
                    <FundButton
                      fundingUrl={customUrl}
                      openIn="popup"
                      text={buttonText}
                      fiatCurrency={fiatCurrency}
                      hideIcon={hideIcon}
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-300">
                      Could not generate funding URL. Please check your
                      configuration.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Fund button props</h4>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md">
                    <div className="text-xs text-gray-500 mb-1">text</div>
                    <div className="font-medium">{buttonText}</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md">
                    <div className="text-xs text-gray-500 mb-1">
                      fiatCurrency
                    </div>
                    <div className="font-medium">{fiatCurrency}</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md">
                    <div className="text-xs text-gray-500 mb-1">hideIcon</div>
                    <div className="font-medium">{hideIcon.toString()}</div>
                  </div>
                </div>
                <a
                  href="https://onchainkit.xyz/fund/fund-button"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm"
                >
                  See full documentation here
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
