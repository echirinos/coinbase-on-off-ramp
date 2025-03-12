"use client";

import React from "react";

interface OfframpInstructionsModalProps {
  onClose: () => void;
  asset: string;
  network: string;
}

export default function OfframpInstructionsModal({
  onClose,
  asset,
  network,
}: OfframpInstructionsModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Complete Your Offramp Transaction
          </h3>
        </div>

        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            After clicking "Cash out now" in the Coinbase interface, you need to
            complete these steps:
          </p>

          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Send your {asset}</strong> to the Coinbase address shown
              in the interface.
            </li>
            <li>
              Make sure to send it on the <strong>{network} network</strong> as
              selected.
            </li>
            <li>
              Complete this transaction within <strong>15 minutes</strong>, or
              the offramp request will expire.
            </li>
            <li>
              Once Coinbase receives and confirms your transaction, they will
              process your cashout.
            </li>
          </ol>

          <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg mt-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-600 dark:text-yellow-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
                  Important Note
                </h3>
                <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                  <p>
                    If the price of {asset} drops significantly during the
                    transaction, Coinbase may cancel the offramp and deposit
                    your crypto into your Coinbase account instead.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
