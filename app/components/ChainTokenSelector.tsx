"use client";
import { useMemo, useState } from "react";
import { useCoinbaseRampTransaction } from "../contexts/CoinbaseRampTransactionContext";

export interface Token {
  id: string;
  name: string;
  symbol: string;
  chainId: number;
}

export interface Chain {
  id: string;
  name: string;
}

interface PurchaseCurrency {
  id: string;
  name: string;
  networks: Network[];
}

interface Network {
  name: string;
  displayName: string;
}

interface SellCurrency {
  id: string;
  name: string;
  networks: SellCurrencyNetwork[];
}

interface SellCurrencyNetwork {
  name: string;
  display_name: string;
}

export const ChainTokenSelector = () => {
  const {
    selectedPurchaseCurrency,
    setSelectedPurchaseCurrency,
    selectedSellCurrency,
    setSelectedSellCurrency,
    selectedPurchaseCurrencyNetwork,
    setSelectedPurchaseCurrencyNetwork,
    selectedSellCurrencyNetwork,
    setSelectedSellCurrencyNetwork,
    buyOptions,
    sellOptions,
    loadingBuyOptions,
    isOnrampActive,
  } = useCoinbaseRampTransaction();

  const [tokenDropdownOpen, setTokenDropdownOpen] = useState(false);
  const [networkDropdownOpen, setNetworkDropdownOpen] = useState(false);

  const handleTokenSelect = (currency: PurchaseCurrency | SellCurrency) => {
    if (isOnrampActive) {
      setSelectedPurchaseCurrency(currency as PurchaseCurrency);
      setSelectedPurchaseCurrencyNetwork(
        (currency as PurchaseCurrency).networks.find(
          (network) => network.name.toUpperCase() === "BASE"
        ) || (currency as PurchaseCurrency).networks[0]
      );
    } else {
      setSelectedSellCurrency(currency as SellCurrency);
      setSelectedSellCurrencyNetwork(
        (currency as SellCurrency).networks.find(
          (network) => network.name.toUpperCase() === "BASE"
        ) || (currency as SellCurrency).networks[0]
      );
    }
    setTokenDropdownOpen(false);
  };

  const handleNetworkSelect = (network: Network | SellCurrencyNetwork) => {
    if (isOnrampActive) {
      setSelectedPurchaseCurrencyNetwork(network as Network);
    } else {
      setSelectedSellCurrencyNetwork(network as SellCurrencyNetwork);
    }
    setNetworkDropdownOpen(false);
  };

  const getSelectedCurrency = () => {
    return isOnrampActive
      ? selectedPurchaseCurrency?.id
      : selectedSellCurrency?.id;
  };

  const getSelectedCurrencyName = () => {
    return isOnrampActive
      ? selectedPurchaseCurrency?.name
      : selectedSellCurrency?.name;
  };

  const getSelectedNetworkName = () => {
    if (isOnrampActive) {
      return selectedPurchaseCurrencyNetwork?.displayName;
    }
    return selectedSellCurrencyNetwork?.display_name;
  };

  const availableCurrencies = isOnrampActive
    ? buyOptions?.purchaseCurrencies || []
    : sellOptions?.sell_currencies || [];

  const networkDisplayNames = useMemo(() => {
    if (isOnrampActive) {
      return (selectedPurchaseCurrency?.networks ?? []).map(
        (network) => network
      );
    }

    return (selectedSellCurrency?.networks ?? []).map((network) => network);
  }, [isOnrampActive, selectedPurchaseCurrency, selectedSellCurrency]);

  return (
    <div className="flex flex-col gap-4">
      {loadingBuyOptions ? (
        <>
          <div className="h-10 w-[200px] rounded-lg bg-gray-200 animate-pulse"></div>
          <div className="h-10 w-[200px] rounded-lg bg-gray-200 animate-pulse"></div>
        </>
      ) : (
        <>
          {/* Token Dropdown */}
          <div className="relative">
            <button
              onClick={() => setTokenDropdownOpen(!tokenDropdownOpen)}
              className="flex items-center justify-between w-full max-w-[200px] px-3 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span>
                {getSelectedCurrencyName() ||
                  `Select ${isOnrampActive ? "Buy" : "Sell"} Token`}
              </span>
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

            {tokenDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {availableCurrencies.map((currency) => (
                  <div
                    key={currency.id}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleTokenSelect(currency)}
                  >
                    {currency.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Network Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNetworkDropdownOpen(!networkDropdownOpen)}
              className="flex items-center justify-between w-full max-w-[200px] px-3 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span>{getSelectedNetworkName() || "Select Network"}</span>
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

            {networkDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {networkDisplayNames.map((network) => (
                  <div
                    key={
                      isOnrampActive
                        ? network.displayName
                        : network.display_name
                    }
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100 capitalize"
                    onClick={() => handleNetworkSelect(network)}
                  >
                    {isOnrampActive
                      ? network.displayName
                      : network.display_name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
