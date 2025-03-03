"use client";

import { useState } from "react";
import { useCoinbaseRampTransaction } from "../contexts/CoinbaseRampTransactionContext";

export const AmountInput = () => {
  const {
    isOnrampActive,
    selectedCurrency,
    rampTransaction,
    setRampTransaction,
    selectedPaymentMethodLimit,
  } = useCoinbaseRampTransaction();

  const [isFocused, setIsFocused] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Only allow numbers and a single decimal point
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setRampTransaction({
        ...rampTransaction,
        amount: value,
      });
    }
  };

  const getCurrencySymbol = () => {
    if (isOnrampActive && selectedCurrency) {
      return selectedCurrency.id;
    }
    return "ETH";
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-2 flex justify-between items-center">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount
        </label>
        {selectedPaymentMethodLimit && (
          <div className="text-xs text-gray-500">
            <span>
              Min: {selectedPaymentMethodLimit.min} {getCurrencySymbol()}
            </span>
            <span className="mx-2">|</span>
            <span>
              Max: {selectedPaymentMethodLimit.max} {getCurrencySymbol()}
            </span>
          </div>
        )}
      </div>

      <div
        className={`relative rounded-md shadow-sm ${
          isFocused ? "ring-2 ring-blue-500 border-blue-500" : "border-gray-300"
        }`}
      >
        <input
          type="text"
          name="amount"
          id="amount"
          className="block w-full rounded-md border-0 py-3 pl-4 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
          placeholder="0.00"
          value={rampTransaction?.amount || ""}
          onChange={handleAmountChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <span className="text-gray-500 sm:text-sm">
            {getCurrencySymbol()}
          </span>
        </div>
      </div>

      {selectedPaymentMethodLimit &&
        rampTransaction?.amount &&
        parseFloat(rampTransaction.amount) > 0 && (
          <div className="mt-2">
            {parseFloat(rampTransaction.amount) <
              parseFloat(selectedPaymentMethodLimit.min) && (
              <p className="text-sm text-red-600">
                Amount is below the minimum of {selectedPaymentMethodLimit.min}{" "}
                {getCurrencySymbol()}
              </p>
            )}
            {parseFloat(rampTransaction.amount) >
              parseFloat(selectedPaymentMethodLimit.max) && (
              <p className="text-sm text-red-600">
                Amount is above the maximum of {selectedPaymentMethodLimit.max}{" "}
                {getCurrencySymbol()}
              </p>
            )}
          </div>
        )}
    </div>
  );
};
