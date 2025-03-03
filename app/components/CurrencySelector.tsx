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
  const [paymentMethodDropdownOpen, setPaymentMethodDropdownOpen] =
    useState(false);

  const handleCurrencySelect = (currency: any) => {
    if (isOnrampActive && buyOptions) {
      setSelectedCurrency(currency);
      setRampTransaction({
        ...rampTransaction,
        currency: currency?.id,
      });
    } else if (isOfframpActive && sellOptions) {
      setSelectedCurrency(currency);
      setRampTransaction({
        ...rampTransaction,
        currency: currency?.id,
      });
    }
    setCurrencyDropdownOpen(false);
  };

  const handlePaymentMethodSelect = (method: any) => {
    if (selectedCountry?.paymentMethods) {
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
        <button
          type="button"
          className="w-[200px] flex justify-between items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
        >
          {rampTransaction?.currency || "Select Currency"}
          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {currencyDropdownOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {getCurrencies().map((currency) => (
              <div
                key={currency.id}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
          <button
            type="button"
            className="w-[200px] flex justify-between items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setPaymentMethodDropdownOpen(!paymentMethodDropdownOpen)}
          >
            {rampTransaction?.paymentMethod || "Select Payment Method"}
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {paymentMethodDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {(selectedCountry?.paymentMethods || []).map((paymentMethod) => (
                <div
                  key={paymentMethod.id}
                  className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                  onClick={() => handlePaymentMethodSelect(paymentMethod)}
                >
                  {paymentMethod.id}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
