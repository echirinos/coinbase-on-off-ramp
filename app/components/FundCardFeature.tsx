"use client";

import React, { useState, useEffect } from "react";
import { FundCard } from "@coinbase/onchainkit/fund";

export function FundCardFeature() {
  const [darkMode, setDarkMode] = useState(false);
  const [appearance, setAppearance] = useState("default");
  const [previewConfig, setPreviewConfig] = useState("");
  const [chainId, setChainId] = useState("1");
  const [asset, setAsset] = useState("BTC");
  const [country, setCountry] = useState("US");
  const [currency, setCurrency] = useState("USD");
  const [headerText, setHeaderText] = useState("Fund Project");
  const [buttonText, setButtonText] = useState("Purchase");
  const [presetAmounts, setPresetAmounts] = useState<string[]>([
    "10",
    "20",
    "50",
  ]);
  const [cdpProjectId, setCdpProjectId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
    // Update preview config when parameters change
    setPreviewConfig(`<FundCard
  assetSymbol="${asset}"
  country="${country}"
  currency="${currency}"
  headerText="${headerText}"
  buttonText="${buttonText}"
  presetAmountInputs={['${presetAmounts.join("', '")}'] as const}
/>`);
  }, [asset, country, currency, headerText, buttonText, presetAmounts]);

  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="container space-y-12">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Fund Card
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
            The Fund Card provides a complete payment experience that enables
            users to fund your project with crypto.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Configuration Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">
                Fund Card Configuration
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Customize how your Fund Card appears and functions
              </p>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="asset-card" className="text-sm font-medium">
                      Asset
                    </label>
                    <select
                      id="asset-card"
                      value={asset}
                      onChange={(e) => setAsset(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="BTC">BTC</option>
                      <option value="ETH">ETH</option>
                      <option value="USDC">USDC</option>
                      <option value="USDT">USDT</option>
                      <option value="DAI">DAI</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="country" className="text-sm font-medium">
                      Country
                    </label>
                    <select
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="US">United States</option>
                      <option value="GB">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="currency" className="text-sm font-medium">
                      Currency
                    </label>
                    <select
                      id="currency"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="USD">USD</option>
                      <option value="GBP">GBP</option>
                      <option value="EUR">EUR</option>
                      <option value="CAD">CAD</option>
                      <option value="AUD">AUD</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="header-text"
                      className="text-sm font-medium"
                    >
                      Header Text
                    </label>
                    <input
                      id="header-text"
                      type="text"
                      value={headerText}
                      onChange={(e) => setHeaderText(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
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

                  <div className="space-y-2">
                    <label
                      htmlFor="preset-amounts"
                      className="text-sm font-medium"
                    >
                      Preset Amounts (comma separated)
                    </label>
                    <input
                      id="preset-amounts"
                      type="text"
                      value={presetAmounts.join(", ")}
                      onChange={(e) =>
                        setPresetAmounts(e.target.value.split(", "))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">Fund Card Preview</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                See how your Fund Card will look
              </p>

              <div className="rounded-md flex items-center justify-center min-h-[400px]">
                {isLoading ? (
                  <div className="text-center text-gray-500">
                    <p>Loading Fund Card...</p>
                  </div>
                ) : (
                  <FundCard
                    assetSymbol={asset}
                    country={country}
                    currency={currency}
                    headerText={headerText}
                    buttonText={buttonText}
                    presetAmountInputs={presetAmounts as any}
                  />
                )}
              </div>

              <div className="mt-6 space-y-2">
                <label className="text-sm font-medium">
                  Implementation Code
                </label>
                <div className="rounded-md overflow-hidden bg-gray-900 p-4">
                  <pre className="text-xs text-white overflow-x-auto">
                    {previewConfig}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
