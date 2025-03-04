"use client";

import { memo, useState } from "react";
import { useCoinbaseRampTransaction } from "../contexts/CoinbaseRampTransactionContext";
import { AmountInput } from "./AmountInput";
import { ChainTokenSelector } from "./ChainTokenSelector";
import { CurrencySelector } from "./CurrencySelector";
import { OrderHistory } from "./OrderHistory";
import { RampTransactionSummary } from "./RampTransactionSummary";
import { RegionSelector } from "./RegionSelector";
import { WalletConnector } from "./WalletConnector";

export const CustomIntegrationDemo = memo(function CustomIntegrationDemo() {
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const { authenticated } = useCoinbaseRampTransaction();

  return (
    <>
      <div className="flex gap-4 justify-center py-4">
        <WalletConnector buttonStyle="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors" />
        {authenticated && (
          <button
            onClick={() => setShowOrderHistory(true)}
            className="cursor-pointer hover:opacity-50 active:opacity-30 flex items-center justify-center"
            aria-label="Order History"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <RegionSelector />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - Amount Input */}
          <div className="md:col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium mb-3">Amount</h3>
              <AmountInput />
            </div>
          </div>

          {/* Middle column - Chain & Currency */}
          <div className="md:col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
              <h3 className="text-lg font-medium mb-3">Asset</h3>
              <ChainTokenSelector />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium mb-3">Currency</h3>
              <CurrencySelector />
            </div>
          </div>

          {/* Right column - Transaction Summary */}
          <div className="md:col-span-1">
            <RampTransactionSummary />
          </div>
        </div>
      </div>

      {/* Order History Modal */}
      {showOrderHistory && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Order History
                    </h3>
                    <div className="mt-2 h-[600px] overflow-y-auto">
                      <OrderHistory />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowOrderHistory(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default CustomIntegrationDemo;
