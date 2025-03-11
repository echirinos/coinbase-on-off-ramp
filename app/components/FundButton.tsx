"use client";

import React from "react";
import {
  FundButton as CoinbaseFundButton,
  getOnrampBuyUrl,
} from "@coinbase/onchainkit/fund";
import { useAccount } from "wagmi";

interface FundButtonProps {
  customText?: string;
  hideIcon?: boolean;
  hideText?: boolean;
  openIn?: "popup" | "tab";
  useCustomUrl?: boolean;
  presetAmount?: number;
}

export function FundButton({
  customText,
  hideIcon = false,
  hideText = false,
  openIn = "popup",
  useCustomUrl = false,
  presetAmount = 20,
}: FundButtonProps) {
  const { address, isConnected } = useAccount();

  // Get CDP Project ID from environment variables
  const cdpProjectId = process.env.NEXT_PUBLIC_CDP_PROJECT_ID || "";

  // Generate custom onramp URL if requested
  const customOnrampUrl =
    useCustomUrl && isConnected && address
      ? getOnrampBuyUrl({
          projectId: cdpProjectId,
          addresses: { [address]: ["base"] },
          assets: ["ETH", "USDC"],
          presetFiatAmount: presetAmount,
          fiatCurrency: "USD",
        })
      : undefined;

  if (!isConnected) {
    return (
      <div className="p-4 border rounded-lg bg-yellow-50 text-yellow-700">
        Please connect your wallet to use the Fund Button
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg bg-white">
      <h3 className="text-lg font-semibold mb-3">Fund Your Wallet</h3>
      <p className="text-gray-600 mb-4">
        Add funds to your wallet directly from this app.
      </p>

      <div className="flex flex-col space-y-4">
        <div>
          <CoinbaseFundButton
            text={customText}
            hideIcon={hideIcon}
            hideText={hideText}
            openIn={openIn}
            fundingUrl={customOnrampUrl}
          />
        </div>

        {useCustomUrl && (
          <div className="text-xs text-gray-500 mt-2">
            Using custom onramp URL with preset amount: ${presetAmount}
          </div>
        )}
      </div>
    </div>
  );
}
