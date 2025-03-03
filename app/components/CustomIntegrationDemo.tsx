'use client';

import { useState } from "react";
import { WalletConnector } from "./WalletConnector";
import { AmountInput } from "./AmountInput";
import { ChainTokenSelector } from "./ChainTokenSelector";
import { CurrencySelector } from "./CurrencySelector";
import { OrderHistory } from "./OrderHistory";
import { RampTransactionSummary } from "./RampTransactionSummary";
import { useCoinbaseRampTransaction } from "../contexts/CoinbaseRampTransactionContext";
import { RegionSelector } from './RegionSelector';

export const CustomIntegrationDemo = () => {
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const { authenticated } = useCoinbaseRampTransaction();

  return (
    <>
      <div className="flex gap-4 justify-center py-4">
        <WalletConnector />
        {authenticated && (
          <button
            onClick={() => setShowOrderHistory(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Order History
          </button>
        )}
      </div>

      <div className="flex flex-col gap-4 justify-center items-center">
        <RegionSelector />

        <div className="flex flex-col md:flex-row justify-around min-h-[750px] max-w-screen md:w-[1000px] m-auto gap-4 md:gap-0">
          <div className="flex flex-col gap-4 grow">
            <AmountInput />
            <div className="flex flex-col md:flex-row gap-4 items-center justify-around">
              <ChainTokenSelector />
              <CurrencySelector />
            </div>
          </div>

          <div className="flex justify-center items-center w-full md:w-[400px] my-8 md:my-0">
            <RampTransactionSummary />
          </div>
        </div>
      </div>

      {/* Order History Modal */}
      {showOrderHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Order History</h2>
              <button
                onClick={() => setShowOrderHistory(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <OrderHistory />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomIntegrationDemo;
