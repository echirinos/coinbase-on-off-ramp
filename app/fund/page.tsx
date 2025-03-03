"use client";

import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FundButton } from "@coinbase/onchainkit/fund";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { getOnrampBuyUrl } from "@coinbase/onchainkit/fund";
import { FundCardDemo } from "../components/FundCardDemo";
import { useCoinbaseRampTransaction } from "../contexts/CoinbaseRampTransactionContext";

export default function FundPage() {
  const [cdpProjectId, setCdpProjectId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { address } = useAccount();
  const [customUrl, setCustomUrl] = useState("");
  const [fiatCurrency, setFiatCurrency] = useState("USD");
  const [asset, setAsset] = useState("BTC"); // For FundCard
  const [buttonAsset, setButtonAsset] = useState("ETH"); // For FundButton
  const [presetAmountInputs, setPresetAmountInputs] = useState<string[]>([
    "10",
    "20",
    "50",
  ]);

  const { selectedCountry, selectedSubdivision, selectedCurrency } =
    useCoinbaseRampTransaction();

  useEffect(() => {
    // Fetch CDP Project ID from server
    const fetchCdpProjectId = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.success && data.config.cdpProjectId) {
          setCdpProjectId(data.config.cdpProjectId);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching CDP Project ID:", error);
        setIsLoading(false);
      }
    };

    fetchCdpProjectId();
  }, []);

  useEffect(() => {
    // Generate custom onramp URL when cdpProjectId and address are available
    if (cdpProjectId && address) {
      const onrampBuyUrl = getOnrampBuyUrl({
        projectId: cdpProjectId,
        addresses: { [address]: ["1"] }, // Ethereum mainnet
        assets: [buttonAsset], // Use ETH for FundButton
        presetCryptoAmount: buttonAsset === "ETH" ? 0.01 : 0.001, // Adjust amount based on asset
      });

      setCustomUrl(onrampBuyUrl);
    }
  }, [cdpProjectId, address, buttonAsset]);

  // List of supported assets for the FundButton
  const supportedButtonAssets = ["ETH", "USDC", "MATIC", "AVAX", "ARB"];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-20 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Fund Your Project
            </h1>
            <p className="mx-auto max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Integrate Coinbase's Fund Button and Fund Card features to enable
              crypto funding for your dApp or project.
            </p>
          </div>
        </section>

        {/* Fund Button Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Fund Button</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  The Fund Button allows your users to contribute funds to your
                  dApp or project in a seamless manner.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-md">
                <div className="flex flex-col items-center justify-center space-y-6">
                  {isLoading ? (
                    <div className="text-center p-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                      <p className="text-gray-600 dark:text-gray-300">
                        Loading Fund Button...
                      </p>
                    </div>
                  ) : address ? (
                    customUrl ? (
                      <div className="text-center">
                        <p className="mb-6 text-gray-600 dark:text-gray-300">
                          Click the button below to fund your wallet with{" "}
                          {buttonAsset}
                        </p>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Select Asset for Fund Button
                          </label>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {supportedButtonAssets.map((supportedAsset) => (
                              <button
                                key={supportedAsset}
                                onClick={() => setButtonAsset(supportedAsset)}
                                className={`px-4 py-2 rounded-md ${
                                  buttonAsset === supportedAsset
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                                }`}
                              >
                                {supportedAsset}
                              </button>
                            ))}
                          </div>
                        </div>
                        <FundButton
                          fundingUrl={customUrl}
                          openIn="popup"
                          text={`Fund ${buttonAsset}`}
                          fiatCurrency={fiatCurrency}
                        />
                      </div>
                    ) : (
                      <div className="text-center p-8">
                        <p className="text-gray-600 dark:text-gray-300">
                          Could not generate funding URL. Please check your
                          configuration.
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="text-center p-8">
                      <p className="text-gray-600 dark:text-gray-300">
                        Connect your wallet to use the Fund Button
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fund Card Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Fund Card</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  The Fund Card provides a complete payment experience that
                  enables users to fund your project with crypto.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-md">
                <div className="flex flex-col items-center justify-center">
                  {isLoading ? (
                    <div className="text-center p-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                      <p className="text-gray-600 dark:text-gray-300">
                        Loading Fund Card...
                      </p>
                    </div>
                  ) : (
                    <FundCardDemo />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
