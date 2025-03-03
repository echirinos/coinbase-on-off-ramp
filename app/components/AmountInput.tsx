"use client";

import { useCallback, useMemo } from "react";
import { useCoinbaseRampTransaction } from "../contexts/CoinbaseRampTransactionContext";

export const AmountInput = () => {
  const {
    rampTransaction,
    setRampTransaction,
    selectedPaymentMethod,
    loadingBuyOptions,
    selectedCurrency,
    selectedPaymentMethodLimit,
  } = useCoinbaseRampTransaction();

  const inputError = useMemo(() => {
    if (rampTransaction?.amount && selectedPaymentMethod) {
      return (
        Number(rampTransaction.amount) < Number(selectedPaymentMethodLimit?.min)
      );
    }

    return false;
  }, [
    rampTransaction?.amount,
    selectedPaymentMethod,
    selectedPaymentMethodLimit,
  ]);

  const getCurrencySymbol = (currencyId?: string) => {
    if (!currencyId) return "$";

    switch (currencyId.toUpperCase()) {
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      default:
        return "$";
    }
  };

  const formatCurrency = (value: string, symbol: string) => {
    return `${symbol}${value}`;
  };

  const handleAmountChange = useCallback(
    (value: string) => {
      // Only allow numeric input with a single decimal point
      if (/^[0-9]*\.?[0-9]*$/.test(value)) {
        if (Number(value) > Number(selectedPaymentMethodLimit?.max)) {
          setRampTransaction({
            ...rampTransaction,
            amount: selectedPaymentMethodLimit?.max,
          });
        } else {
          setRampTransaction({
            ...rampTransaction,
            amount: value,
          });
        }
      }
    },
    [rampTransaction, setRampTransaction, selectedPaymentMethodLimit]
  );

  return (
    <div className="amount-input h-full flex items-center flex-col justify-between mb-8">
      {!loadingBuyOptions ? (
        <>
          <div className="grow">
            <div className="flex flex-col justify-center w-full h-full gap-4">
              <div className="text-5xl flex items-center m-auto">
                <div className="flex items-center justify-center">
                  <input
                    value={`${getCurrencySymbol(selectedCurrency?.id)}${
                      rampTransaction?.amount || "0"
                    }`}
                    type="text"
                    pattern="[0-9]*"
                    onChange={(e) =>
                      handleAmountChange(
                        e.target.value.replace(
                          getCurrencySymbol(selectedCurrency?.id),
                          ""
                        )
                      )
                    }
                    className="text-center max-w-[300px] bg-transparent pl-4 pr-4 outline-none border-none"
                    style={{
                      WebkitAppearance: "none",
                      MozAppearance: "textfield",
                    }}
                  />
                </div>
              </div>
              {inputError && (
                <div className="mx-auto mb-4 text-red-600 text-xs">
                  Amount must be greater than minimum
                </div>
              )}
              <div className="flex mx-auto mb-4 w-[250px] justify-around">
                <span>
                  Min:{" "}
                  {formatCurrency(
                    selectedPaymentMethodLimit?.min || "0",
                    getCurrencySymbol(selectedCurrency?.id)
                  )}
                </span>
                <span>
                  Max:{" "}
                  {formatCurrency(
                    selectedPaymentMethodLimit?.max || "0",
                    getCurrencySymbol(selectedCurrency?.id)
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="flex h-[50px] gap-4">
            {selectedCurrency?.id?.toUpperCase() === "USD" &&
              ["10", "25", "50"].map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleAmountChange(amount)}
                  className="px-4 py-2 text-sm bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  ${amount}
                </button>
              ))}
          </div>
        </>
      ) : (
        <>
          <div className="grow">
            <div className="w-full h-16 bg-gray-200 animate-pulse rounded-lg"></div>
          </div>
          <div className="flex h-[50px] gap-4">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="w-16 h-8 bg-gray-200 animate-pulse rounded-md"
              ></div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
