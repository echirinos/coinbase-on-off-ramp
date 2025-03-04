"use client";
import { useState, useEffect } from "react";
import { FundCard, FundCardPropsReact } from "@coinbase/onchainkit/fund";
import { useCoinbaseRampTransaction } from "../contexts/CoinbaseRampTransactionContext";
import { RegionSelector } from "./RegionSelector";
import { useAccount } from "wagmi";
import { RampTransaction } from "../types/RampTransaction";

// Import the Currency interface
interface Currency {
  id: string;
  name: string;
}

export const FundCardDemo = () => {
  const {
    selectedCountry,
    selectedSubdivision,
    selectedCurrency,
    setSelectedCurrency,
    buyOptions,
    setRampTransaction,
  } = useCoinbaseRampTransaction();

  const { address, isConnected } = useAccount();
  const [cdpProjectId, setCdpProjectId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [asset, setAsset] = useState("USDC");
  const [presetAmountInputs, setPresetAmountInputs] = useState<
    FundCardPropsReact["presetAmountInputs"]
  >(["10", "25", "50"]);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const [transactionError, setTransactionError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch CDP Project ID from server
    const fetchCdpProjectId = async () => {
      try {
        setIsLoading(true);
        // For demo purposes, we'll just set a dummy CDP Project ID
        setCdpProjectId("demo-project-id");
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching CDP Project ID:", error);
        setIsLoading(false);
      }
    };

    fetchCdpProjectId();
  }, []);

  useEffect(() => {
    // Update the ramp transaction with the wallet address when connected
    if (isConnected && address) {
      setRampTransaction({
        wallet: address,
        chainToken: asset,
        currency: selectedCurrency?.id || "USD",
      });
    }
  }, [isConnected, address, asset, selectedCurrency, setRampTransaction]);

  const handleCurrencySelect = (currency: Currency) => {
    setSelectedCurrency(currency);
    setCurrencyDropdownOpen(false);
  };

  const handleTransactionSuccess = (data: any) => {
    console.log("Transaction successful:", data);
    setTransactionInProgress(false);
    setTransactionError(null);
    alert("Transaction initiated successfully!");
  };

  const handleTransactionError = (error: any) => {
    console.error("Transaction error:", error);
    setTransactionInProgress(false);
    setTransactionError(
      error.message || "Transaction failed. Please try again."
    );
    alert("Transaction failed. Please try again.");
  };

  const availableCurrencies = buyOptions?.paymentCurrencies || [];

  return (
    <div className="flex flex-col items-center justify-center flex-wrap gap-4">
      <div className="flex justify-center items-center w-[500px] gap-4 flex-col">
        {isLoading ? (
          <div className="text-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">
              Loading Fund Card...
            </p>
          </div>
        ) : !isConnected ? (
          <div className="text-center p-8">
            <p className="text-gray-600 dark:text-gray-300">
              Please connect your wallet to use the Fund Card
            </p>
          </div>
        ) : (
          <>
            {transactionError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 w-full">
                <span className="block sm:inline">{transactionError}</span>
              </div>
            )}
            <FundCard
              key={`${asset}-${selectedCountry?.id}-${selectedCurrency?.id}-${selectedSubdivision}`}
              assetSymbol={asset}
              country={selectedCountry?.id || "US"}
              currency={selectedCurrency?.id || "USD"}
              subdivision={selectedSubdivision || undefined}
              presetAmountInputs={presetAmountInputs}
              onSuccess={handleTransactionSuccess}
              onError={handleTransactionError}
            />
          </>
        )}
      </div>

      <div className="flex flex-col gap-2 items-center p-4">
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
                  onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
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

              {/* Preset Amounts Input */}
              <div className="w-[150px]">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Preset Amounts
                </label>
                <input
                  type="text"
                  placeholder="presetAmountInputs"
                  value={presetAmountInputs?.join(",")}
                  onChange={(e) => {
                    setPresetAmountInputs(
                      e.target.value.split(
                        ","
                      ) as unknown as FundCardPropsReact["presetAmountInputs"]
                    );
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm cursor-pointer text-blue-500">
              <a
                href="https://onchainkit.xyz/fund/fund-card"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                See full documentation here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
