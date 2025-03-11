"use client";
import React, { useState, useEffect } from "react";
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

export function FundCardDemo() {
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
  const [selectedAmount, setSelectedAmount] = useState("25");
  const [customAmount, setCustomAmount] = useState("");
  const [showCustomAmount, setShowCustomAmount] = useState(false);

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

  const handleAmountSelect = (amount: string) => {
    setSelectedAmount(amount);
    setShowCustomAmount(false);
  };

  const handleCustomAmountClick = () => {
    setShowCustomAmount(true);
    setSelectedAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      {isLoading ? (
        <div className="p-6 space-y-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
            <div className="h-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Fund Project
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Choose an amount to fund
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleAmountSelect("10")}
                className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                  selectedAmount === "10"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                $10
              </button>
              <button
                onClick={() => handleAmountSelect("25")}
                className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                  selectedAmount === "25"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                $25
              </button>
              <button
                onClick={() => handleAmountSelect("50")}
                className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                  selectedAmount === "50"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                $50
              </button>
            </div>

            <div>
              <button
                onClick={handleCustomAmountClick}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors text-left ${
                  showCustomAmount
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                Custom amount
              </button>

              {showCustomAmount && (
                <div className="mt-2">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
                      $
                    </span>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      placeholder="Enter amount"
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg">
            Continue
          </button>

          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            Powered by Coinbase
          </div>

          <div className="text-center text-xs text-amber-600 dark:text-amber-400 mt-2">
            Wallet connection required to use
          </div>
        </div>
      )}
    </div>
  );
}
