"use client";

import React, { useState, useEffect } from "react";
import { FundCard } from "@coinbase/onchainkit/fund";
import { RegionSelector } from "./RegionSelector";
import { useCoinbaseRampTransaction } from "../contexts/CoinbaseRampTransactionContext";

// Import the Currency interface
interface Currency {
  id: string;
  name: string;
}

export function FundCardFeature() {
  const {
    selectedCountry,
    selectedSubdivision,
    selectedCurrency,
    setSelectedCurrency,
    buyOptions,
  } = useCoinbaseRampTransaction();

  const [previewConfig, setPreviewConfig] = useState("");
  const [asset, setAsset] = useState("BTC");
  const [headerText, setHeaderText] = useState("Fund Project");
  const [buttonText, setButtonText] = useState("Purchase");
  const [presetAmounts, setPresetAmounts] = useState<string[]>([
    "10",
    "20",
    "50",
  ]);
  const [cdpProjectId, setCdpProjectId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

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
  country="${selectedCountry?.id || "US"}"
  currency="${selectedCurrency?.id || "USD"}"
  subdivision="${selectedSubdivision || ""}"
  headerText="${headerText}"
  buttonText="${buttonText}"
  presetAmountInputs={['${presetAmounts.join("', '")}'] as const}
/>`);
  }, [
    asset,
    selectedCountry,
    selectedCurrency,
    selectedSubdivision,
    headerText,
    buttonText,
    presetAmounts,
  ]);

  const handleCurrencySelect = (currency: Currency) => {
    setSelectedCurrency(currency);
    setCurrencyDropdownOpen(false);
  };

  const availableCurrencies = buyOptions?.paymentCurrencies || [];

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

        <div className="flex flex-col items-center justify-center flex-wrap gap-4">
          <div className="flex justify-center items-center w-full max-w-[500px] gap-4 flex-col">
            {isLoading ? (
              <div className="text-center text-gray-500">
                <p>Loading Fund Card...</p>
              </div>
            ) : (
              <FundCard
                key={`${asset}-${selectedCountry?.id}-${selectedCurrency?.id}-${selectedSubdivision}`}
                assetSymbol={asset}
                country={selectedCountry?.id || "US"}
                currency={selectedCurrency?.id || "USD"}
                subdivision={selectedSubdivision || undefined}
                headerText={headerText}
                buttonText={buttonText}
                presetAmountInputs={presetAmounts as any}
              />
            )}
          </div>

          <div className="flex flex-col gap-2 items-center p-4 w-full max-w-[800px]">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden w-full">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <p className="text-lg font-medium">Fund card props</p>
              </div>

              <div className="p-4">
                <div>
                  <RegionSelector />
                </div>

                <div className="flex pt-4 pb-4 gap-2 flex-wrap">
                  {/* Currency Dropdown */}
                  <div className="relative w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Currency
                    </label>
                    <button
                      onClick={() =>
                        setCurrencyDropdownOpen(!currencyDropdownOpen)
                      }
                      className="flex items-center justify-between w-full px-3 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <span>{selectedCurrency?.id || "Select Currency"}</span>
                      <svg
                        className="w-5 h-5 ml-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {currencyDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {availableCurrencies.map((currency) => (
                          <div
                            key={currency.id}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleCurrencySelect(currency)}
                          >
                            {currency.id}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Asset Input */}
                  <div className="w-[150px]">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Asset
                    </label>
                    <input
                      type="text"
                      placeholder="asset"
                      value={asset}
                      onChange={(e) => setAsset(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Header Text Input */}
                  <div className="w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Header Text
                    </label>
                    <input
                      type="text"
                      placeholder="Header Text"
                      value={headerText}
                      onChange={(e) => setHeaderText(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Button Text Input */}
                  <div className="w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Button Text
                    </label>
                    <input
                      type="text"
                      placeholder="Button Text"
                      value={buttonText}
                      onChange={(e) => setButtonText(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Preset Amounts Input */}
                  <div className="w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Preset Amounts
                    </label>
                    <input
                      type="text"
                      placeholder="presetAmountInputs"
                      value={presetAmounts.join(",")}
                      onChange={(e) =>
                        setPresetAmounts(e.target.value.split(","))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="mt-2 space-y-2 w-full">
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
    </div>
  );
}
