"use client";

import React, { useState, useEffect } from "react";
import { FundButton, getOnrampBuyUrl } from "@coinbase/onchainkit/fund";
import { useAccount } from "wagmi";

export function FundButtonFeature() {
  const [darkMode, setDarkMode] = useState(false);
  const [appearance, setAppearance] = useState("default");
  const [previewConfig, setPreviewConfig] = useState("");
  const [chainId, setChainId] = useState("1");
  const [asset, setAsset] = useState("ETH");
  const [amount, setAmount] = useState("0.01");
  const [isPayWithAnyCrypto, setIsPayWithAnyCrypto] = useState(true);
  const [cdpProjectId, setCdpProjectId] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [fiatCurrency, setFiatCurrency] = useState("USD");
  const { address } = useAccount();

  useEffect(() => {
    // Fetch CDP Project ID from server
    const fetchCdpProjectId = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching CDP Project ID:", error);
      }
    };

    fetchCdpProjectId();
  }, []);

  useEffect(() => {
    // Update preview config and custom URL when parameters change
    if (cdpProjectId && address) {
      // Generate custom onramp URL
      const onrampBuyUrl = getOnrampBuyUrl({
        projectId: cdpProjectId,
        addresses: { [address]: [chainId] },
        assets: [asset],
        presetCryptoAmount: parseFloat(amount),
      });

      setCustomUrl(onrampBuyUrl);

      // Update preview config
      setPreviewConfig(`<FundButton
  fundingUrl="${onrampBuyUrl}"
  openIn="popup"
  text="Fund ${asset}"
  fiatCurrency="${fiatCurrency}"
  hideIcon={false}
/>`);
    }
  }, [
    cdpProjectId,
    address,
    darkMode,
    appearance,
    chainId,
    asset,
    amount,
    isPayWithAnyCrypto,
    fiatCurrency,
  ]);

  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="container space-y-12">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Fund Button
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
            The Fund Button allows your users to contribute funds to your dApp
            or project in a seamless manner.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Configuration Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">
                Fund Button Configuration
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Customize how the Fund Button appears and functions
              </p>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="dark-mode" className="text-sm font-medium">
                      Dark Mode
                    </label>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white bg-gray-200 dark:bg-gray-700">
                      <span
                        className={`${
                          darkMode
                            ? "translate-x-6 bg-blue-600"
                            : "translate-x-1 bg-white"
                        } inline-block h-4 w-4 transform rounded-full transition-transform`}
                      />
                      <input
                        type="checkbox"
                        id="dark-mode"
                        className="sr-only"
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="appearance" className="text-sm font-medium">
                      Appearance
                    </label>
                    <select
                      id="appearance"
                      value={appearance}
                      onChange={(e) => setAppearance(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="default">Default</option>
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="flat">Flat</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="chain-id" className="text-sm font-medium">
                      Chain
                    </label>
                    <select
                      id="chain-id"
                      value={chainId}
                      onChange={(e) => setChainId(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="1">Ethereum</option>
                      <option value="137">Polygon</option>
                      <option value="42161">Arbitrum</option>
                      <option value="10">Optimism</option>
                      <option value="43114">Avalanche</option>
                      <option value="56">BNB Chain</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="asset" className="text-sm font-medium">
                      Asset
                    </label>
                    <select
                      id="asset"
                      value={asset}
                      onChange={(e) => setAsset(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="ETH">ETH</option>
                      <option value="USDC">USDC</option>
                      <option value="USDT">USDT</option>
                      <option value="DAI">DAI</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="amount" className="text-sm font-medium">
                      Amount
                    </label>
                    <input
                      id="amount"
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="fiat-currency"
                      className="text-sm font-medium"
                    >
                      Fiat Currency
                    </label>
                    <select
                      id="fiat-currency"
                      value={fiatCurrency}
                      onChange={(e) => setFiatCurrency(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="CAD">CAD</option>
                      <option value="AUD">AUD</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="pay-with-any-crypto"
                      checked={isPayWithAnyCrypto}
                      onChange={() =>
                        setIsPayWithAnyCrypto(!isPayWithAnyCrypto)
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="pay-with-any-crypto"
                      className="text-sm font-medium"
                    >
                      Allow payment with any crypto
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">Fund Button Preview</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                See how your Fund Button will look
              </p>

              <div
                className={`p-6 rounded-md flex items-center justify-center min-h-[200px] ${
                  darkMode ? "bg-gray-900" : "bg-white border border-gray-200"
                }`}
              >
                <div className="flex flex-col items-center space-y-4">
                  {address ? (
                    customUrl && cdpProjectId ? (
                      <FundButton
                        fundingUrl={customUrl}
                        openIn="popup"
                        text={`Fund ${asset}`}
                        fiatCurrency={fiatCurrency}
                      />
                    ) : (
                      <div className="text-center text-gray-500">
                        <p>Loading Fund Button...</p>
                      </div>
                    )
                  ) : (
                    <div className="text-center text-gray-500">
                      <p>Connect your wallet to see the Fund Button</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <label className="text-sm font-medium">
                  Implementation Code
                </label>
                <div className="rounded-md overflow-hidden bg-gray-900 p-4">
                  <pre className="text-xs text-white overflow-x-auto">
                    {previewConfig}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
