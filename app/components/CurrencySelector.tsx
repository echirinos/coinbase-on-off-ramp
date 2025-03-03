"use client";

import { useState } from "react";
import { useCoinbaseRampTransaction } from "../contexts/CoinbaseRampTransactionContext";

interface Currency {
  id: string;
  name: string;
}

export const CurrencySelector = () => {
  const {
    isOnrampActive,
    isOfframpActive,
    sellOptions,
    buyOptions,
    setRampTransaction,
    rampTransaction,
    setSelectedPaymentMethod,
    selectedCurrency,
    selectedCountry,
    setSelectedCurrency,
    loadingBuyOptions,
  } = useCoinbaseRampTransaction();

  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [paymentMethodDropdownOpen, setPaymentMethodDropdownOpen] = useState(false);

  const handleCurrencySelect = (currency: Currency) => {
    setSelectedCurrency(currency);
    setRampTransaction({
      ...rampTransaction,
      currency: currency.id,
    });
    setCurrencyDropdownOpen(false);
  };

  const handlePaymentMethodSelect = (methodId: string) => {
    const method = selectedCountry?.paymentMethods.find(
      (method) => method.id === methodId
    );

    if (method) {
      setSelectedPaymentMethod(method);
      setRampTransaction({
        ...rampTransaction,
        paymentMethod: method.id,
      });
    }
    setPaymentMethodDropdownOpen(false);
  };

  const getCurrencies = () => {
    return (
      (isOnrampActive
        ? buyOptions?.paymentCurrencies
        : sellOptions?.cashout_currencies) || []
    );
  };

  if (loadingBuyOptions) {
    return (
      <div className="flex flex-col gap-4">
        <div className="h-10 w-[200px] bg-gray-200 animate-pulse rounded-lg"></div>
        <div className="h-10 w-[200px] bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Currency Selector */}
      <div className="relative">
        <button
          onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
          className="flex items-center justify-between w-full max-w-[200px] px-3 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <span>{selectedCurrency?.id || 'Select Currency'}</span>
          <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {currencyDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {getCurrencies().map((currency) => (
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

      {/* Payment Method Selector */}
      {selectedCurrency && selectedCountry?.paymentMethods && (
        <div className="relative">
          <button
            onClick={() => setPaymentMethodDropdownOpen(!paymentMethodDropdownOpen)}
            className="flex items-center justify-between w-full max-w-[200px] px-3 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <span>{rampTransaction?.paymentMethod || 'Select Payment Method'}</span>
            <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {paymentMethodDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {selectedCountry.paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handlePaymentMethodSelect(method.id)}
                >
                  {method.id}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
