"use client";
import { useState } from 'react';
import { useCoinbaseRampTransaction } from '../contexts/CoinbaseRampTransactionContext';

interface Network {
  id: string;
  name: string;
}

interface Currency {
  id: string;
  name: string;
  symbol: string;
  networks: Network[];
}

export const ChainTokenSelector = () => {
  const {
    isOnrampActive,
    buyOptions,
    selectedPurchaseCurrency,
    setSelectedPurchaseCurrency,
    selectedPurchaseCurrencyNetwork,
    setSelectedPurchaseCurrencyNetwork,
    rampTransaction,
    setRampTransaction,
    loadingBuyOptions,
  } = useCoinbaseRampTransaction();

  const [networkDropdownOpen, setNetworkDropdownOpen] = useState(false);
  const [tokenDropdownOpen, setTokenDropdownOpen] = useState(false);

  const toggleNetworkDropdown = () => {
    setNetworkDropdownOpen(!networkDropdownOpen);
    if (tokenDropdownOpen) setTokenDropdownOpen(false);
  };

  const toggleTokenDropdown = () => {
    setTokenDropdownOpen(!tokenDropdownOpen);
    if (networkDropdownOpen) setNetworkDropdownOpen(false);
  };

  const handleNetworkSelect = (network: Network) => {
    setSelectedPurchaseCurrencyNetwork(network);
    setNetworkDropdownOpen(false);
  };

  const handleTokenSelect = (currency: Currency) => {
    setSelectedPurchaseCurrency(currency);

    // If the selected currency has networks and the current network isn't in them,
    // select the first available network
    if (currency.networks && currency.networks.length > 0) {
      const currentNetworkIsValid = currency.networks.some(
        network => network.id === selectedPurchaseCurrencyNetwork?.id
      );

      if (!currentNetworkIsValid) {
        setSelectedPurchaseCurrencyNetwork(currency.networks[0]);
      }
    }

    setTokenDropdownOpen(false);

    // Update the ramp transaction with the new currency
    if (rampTransaction) {
      setRampTransaction({
        ...rampTransaction,
        asset: currency.symbol,
      });
    }
  };

  // Get available currencies from buy options
  const availableCurrencies = isOnrampActive && buyOptions
    ? buyOptions.purchaseCurrencies
    : [];

  // Get available networks for the selected currency
  const availableNetworks = selectedPurchaseCurrency?.networks || [];

  if (loadingBuyOptions) {
    return (
      <div className="flex flex-col gap-2 animate-pulse">
        <div className="h-10 w-full bg-gray-200 rounded"></div>
        <div className="h-10 w-full bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Token Selector */}
      <div className="relative">
        <button
          onClick={toggleTokenDropdown}
          className="w-full flex items-center justify-between p-2 border border-gray-300 rounded-md bg-white"
        >
          <span>
            {selectedPurchaseCurrency
              ? `${selectedPurchaseCurrency.symbol} - ${selectedPurchaseCurrency.name}`
              : 'Select Token'}
          </span>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {tokenDropdownOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {availableCurrencies.map((currency) => (
              <div
                key={currency.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleTokenSelect(currency)}
              >
                <div className="flex items-center">
                  <span className="font-medium">{currency.symbol}</span>
                  <span className="ml-2 text-gray-500 text-sm">{currency.name}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Network Selector - Only show if the selected currency has networks */}
      {selectedPurchaseCurrency && availableNetworks.length > 0 && (
        <div className="relative">
          <button
            onClick={toggleNetworkDropdown}
            className="w-full flex items-center justify-between p-2 border border-gray-300 rounded-md bg-white"
          >
            <span>
              {selectedPurchaseCurrencyNetwork
                ? selectedPurchaseCurrencyNetwork.name
                : 'Select Network'}
            </span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {networkDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {availableNetworks.map((network) => (
                <div
                  key={network.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleNetworkSelect(network)}
                >
                  {network.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChainTokenSelector;
