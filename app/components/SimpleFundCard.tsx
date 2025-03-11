"use client";

import React, { useState, useEffect } from "react";
import { FundCard } from "@coinbase/onchainkit/fund";
import { useAccount } from "wagmi";

export function SimpleFundCard() {
  const { isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simple loading simulation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div className="p-4 border rounded-lg">Loading...</div>;
  }

  if (!isConnected) {
    return (
      <div className="p-4 border rounded-lg">
        Please connect your wallet to use the Fund Card
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border rounded-lg text-red-500">Error: {error}</div>
    );
  }

  // Using the FundCard component according to the documentation
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold mb-4">Simple Fund Card</h2>
      <FundCard
        assetSymbol="ETH"
        country="US"
        currency="USD"
        headerText="Fund Your Project"
        buttonText="Continue"
        presetAmountInputs={["10", "25", "50"]}
      />
    </div>
  );
}
