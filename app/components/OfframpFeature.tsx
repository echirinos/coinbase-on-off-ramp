"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useAccount } from "wagmi";
import { generateOfframpURL } from "../utils/rampUtils";
import {
  fetchSellConfig,
  fetchSellOptions,
  Country,
  CryptoAsset,
} from "../utils/offrampApi";
import GeneratedLinkModal from "./GeneratedLinkModal";

export default function OfframpFeature() {
  const { address, isConnected } = useAccount();
  const [selectedAsset, setSelectedAsset] = useState("ETH");
  const [amount, setAmount] = useState("100");
  const [selectedNetwork, setSelectedNetwork] = useState("ethereum");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [estimatedUsdValue, setEstimatedUsdValue] = useState("100.00");
  const [selectedCashoutMethod, setSelectedCashoutMethod] =
    useState("ACH_BANK_ACCOUNT");
  const [activeTab, setActiveTab] = useState<"api" | "url">("api");

  // Country and subdivision state
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedSubdivision, setSelectedSubdivision] = useState("");
  const [subdivisions, setSubdivisions] = useState<string[]>([]);

  // Assets and networks state
  const [availableAssets, setAvailableAssets] = useState<CryptoAsset[]>([]);
  const [availableNetworks, setAvailableNetworks] = useState<
    { id: string; name: string }[]
  >([]);

  // Cashout methods state
  const [cashoutMethods, setCashoutMethods] = useState([
    {
      id: "ACH_BANK_ACCOUNT",
      name: "Bank Transfer (ACH)",
      description: "US only, 1-3 business days",
    },
    {
      id: "PAYPAL",
      name: "PayPal",
      description: "Available in select countries",
    },
    {
      id: "FIAT_WALLET",
      name: "Coinbase Fiat Wallet",
      description: "Instant transfer to your Coinbase account",
    },
  ]);

  // Define supported assets using useMemo to prevent recreation on every render
  const assets = useMemo(
    () => [
      { symbol: "ETH", name: "Ethereum", price: 3500 },
      { symbol: "USDC", name: "USD Coin", price: 1 },
      { symbol: "BTC", name: "Bitcoin", price: 60000 },
      { symbol: "SOL", name: "Solana", price: 140 },
      { symbol: "MATIC", name: "Polygon", price: 0.8 },
      { symbol: "AVAX", name: "Avalanche", price: 35 },
      { symbol: "LINK", name: "Chainlink", price: 15 },
      { symbol: "UNI", name: "Uniswap", price: 8 },
      { symbol: "DOGE", name: "Dogecoin", price: 0.1 },
      { symbol: "SHIB", name: "Shiba Inu", price: 0.00002 },
      { symbol: "XRP", name: "XRP", price: 0.5 },
      { symbol: "LTC", name: "Litecoin", price: 80 },
      { symbol: "BCH", name: "Bitcoin Cash", price: 300 },
    ],
    []
  );

  // Fetch countries and cashout methods on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const config = await fetchSellConfig();
        setCountries(config.countries);

        // Set default country and update cashout methods
        if (config.countries.length > 0) {
          const defaultCountry =
            config.countries.find((c) => c.code === "US") ||
            config.countries[0];
          setSelectedCountry(defaultCountry.code);

          // Update cashout methods based on selected country
          if (defaultCountry.cashout_methods) {
            setCashoutMethods(
              defaultCountry.cashout_methods.map((cm) => ({
                id: cm.id,
                name: cm.name,
                description: cm.description || "",
              }))
            );

            // Set default cashout method
            if (defaultCountry.cashout_methods.length > 0) {
              setSelectedCashoutMethod(defaultCountry.cashout_methods[0].id);
            }
          }

          // Set subdivisions if available
          if (defaultCountry.supported_states) {
            setSubdivisions(defaultCountry.supported_states);
            if (defaultCountry.supported_states.length > 0) {
              setSelectedSubdivision(defaultCountry.supported_states[0]);
            }
          } else {
            setSubdivisions([]);
            setSelectedSubdivision("");
          }
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Fetch assets and networks when country or subdivision changes
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const options = await fetchSellOptions(
          selectedCountry,
          selectedSubdivision
        );
        setAvailableAssets(options.sell_currencies);

        // Set default asset and update networks
        if (options.sell_currencies.length > 0) {
          const defaultAsset =
            options.sell_currencies.find((a) => a.code === "ETH") ||
            options.sell_currencies[0];
          setSelectedAsset(defaultAsset.code);

          // Update available networks for the selected asset
          updateNetworksForAsset(defaultAsset.code, options.sell_currencies);
        }
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    if (selectedCountry) {
      fetchAssets();
    }
  }, [selectedCountry, selectedSubdivision]);

  // Update cashout methods when country changes
  useEffect(() => {
    const country = countries.find((c) => c.code === selectedCountry);
    if (country && country.cashout_methods) {
      setCashoutMethods(
        country.cashout_methods.map((cm) => ({
          id: cm.id,
          name: cm.name,
          description: cm.description || "",
        }))
      );

      // Set default cashout method
      if (country.cashout_methods.length > 0) {
        setSelectedCashoutMethod(country.cashout_methods[0].id);
      }

      // Update subdivisions
      if (country.supported_states) {
        setSubdivisions(country.supported_states);
        if (country.supported_states.length > 0) {
          setSelectedSubdivision(country.supported_states[0]);
        }
      } else {
        setSubdivisions([]);
        setSelectedSubdivision("");
      }
    }
  }, [selectedCountry, countries]);

  // Update networks when asset changes
  const updateNetworksForAsset = (
    assetCode: string,
    assets: CryptoAsset[] = availableAssets
  ) => {
    const asset = assets.find((a) => a.code === assetCode);
    if (asset && asset.networks) {
      setAvailableNetworks(asset.networks);

      // Set default network
      if (asset.networks.length > 0) {
        const defaultNetwork =
          asset.networks.find((n) => n.id === "ethereum") || asset.networks[0];
        setSelectedNetwork(defaultNetwork.id);
      }
    } else {
      setAvailableNetworks([]);
    }
  };

  // Handle asset change
  const handleAssetChange = (assetCode: string) => {
    setSelectedAsset(assetCode);
    updateNetworksForAsset(assetCode);
  };

  // Calculate estimated USD value when asset or amount changes
  useEffect(() => {
    const selectedAssetObj = assets.find((a) => a.symbol === selectedAsset);
    if (selectedAssetObj && amount) {
      const usdValue = parseFloat(amount) * selectedAssetObj.price;
      setEstimatedUsdValue(usdValue.toFixed(2));
    } else if (amount) {
      // If asset not found, assume 1:1 conversion for display purposes
      setEstimatedUsdValue(parseFloat(amount).toFixed(2));
    }
  }, [selectedAsset, amount, assets]);

  // Generate one-time URL
  const handleGenerateUrl = () => {
    if (!address) {
      alert("Please connect your wallet first");
      return;
    }

    // Ensure amount is a valid number
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    // Find the selected asset to get its price
    const selectedAssetObj = assets.find((a) => a.symbol === selectedAsset);
    if (!selectedAssetObj) {
      console.warn(
        `Asset ${selectedAsset} not found in price list, using default price of 1.0`
      );
      // Use a fallback price of 1.0 for unknown assets
      const cryptoAmount = numericAmount.toFixed(8);

      const url = generateOfframpURL({
        asset: selectedAsset,
        amount: cryptoAmount,
        network: selectedNetwork,
        cashoutMethod: selectedCashoutMethod,
        address: address,
        redirectUrl: window.location.origin + "/offramp?status=success",
      });

      setGeneratedUrl(url);
      setShowUrlModal(true);
      return;
    }

    // Calculate the crypto amount based on the USD value
    const cryptoAmount = (numericAmount / selectedAssetObj.price).toFixed(8);

    const url = generateOfframpURL({
      asset: selectedAsset,
      // Pass the crypto amount instead of the USD amount
      amount: cryptoAmount,
      network: selectedNetwork,
      cashoutMethod: selectedCashoutMethod,
      address: address,
      redirectUrl: window.location.origin + "/offramp?status=success",
    });

    console.log("Generated offramp URL:", url);
    console.log("Parameters:", {
      asset: selectedAsset,
      cryptoAmount,
      usdAmount: numericAmount,
      network: selectedNetwork,
      cashoutMethod: selectedCashoutMethod,
      address,
    });

    setGeneratedUrl(url);
    setShowUrlModal(true);
  };

  // Handle direct offramp
  const handleOfframp = () => {
    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }

    // Ensure amount is a valid number
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    // Find the selected asset to get its price
    const selectedAssetObj = assets.find((a) => a.symbol === selectedAsset);
    if (!selectedAssetObj) {
      console.warn(
        `Asset ${selectedAsset} not found in price list, using default price of 1.0`
      );
      // Use a fallback price of 1.0 for unknown assets
      const cryptoAmount = numericAmount.toFixed(8);

      const url = generateOfframpURL({
        asset: selectedAsset,
        amount: cryptoAmount,
        network: selectedNetwork,
        cashoutMethod: selectedCashoutMethod,
        address: address || "0x0000000000000000000000000000000000000000",
        redirectUrl: window.location.origin + "/offramp?status=success",
      });

      window.open(url, "_blank");
      return;
    }

    // Calculate the crypto amount based on the USD value
    const cryptoAmount = (numericAmount / selectedAssetObj.price).toFixed(8);

    // Generate the offramp URL with validated parameters
    const url = generateOfframpURL({
      asset: selectedAsset,
      // Pass the crypto amount instead of the USD amount
      amount: cryptoAmount,
      network: selectedNetwork,
      cashoutMethod: selectedCashoutMethod,
      address: address || "0x0000000000000000000000000000000000000000",
      redirectUrl: window.location.origin + "/offramp?status=success",
    });

    console.log("Opening offramp URL:", url);
    console.log("Parameters:", {
      asset: selectedAsset,
      cryptoAmount,
      usdAmount: numericAmount,
      network: selectedNetwork,
      cashoutMethod: selectedCashoutMethod,
      address: address || "0x0000000000000000000000000000000000000000",
    });

    window.open(url, "_blank");
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(generatedUrl);
    alert("URL copied to clipboard!");
  };

  const handleOpenUrl = () => {
    window.open(generatedUrl, "_blank");
  };

  return (
    <div className="bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-6 dark:text-white">
                Configure Your Offramp
              </h3>

              {/* Integration Method Tabs */}
              <div className="mb-8">
                <div className="flex space-x-2 mb-4">
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      activeTab === "api"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200"
                    }`}
                    onClick={() => setActiveTab("api")}
                  >
                    Offramp API
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      activeTab === "url"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200"
                    }`}
                    onClick={() => setActiveTab("url")}
                  >
                    One-time Payment Link
                  </button>
                </div>
              </div>

              {/* Connect Wallet Button */}
              {!isConnected && (
                <div className="mb-6">
                  <button
                    onClick={() =>
                      document.getElementById("connect-wallet-button")?.click()
                    }
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
                  >
                    Connect Wallet
                  </button>
                </div>
              )}

              {/* Country Selection */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">
                  Country
                </label>
                <div className="relative">
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="block w-full bg-white text-gray-800 border border-gray-300 rounded-lg py-3 px-4 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* State/Subdivision Selection (for US) */}
              {subdivisions.length > 0 && (
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">
                    State
                  </label>
                  <div className="relative">
                    <select
                      value={selectedSubdivision}
                      onChange={(e) => setSelectedSubdivision(e.target.value)}
                      className="block w-full bg-white text-gray-800 border border-gray-300 rounded-lg py-3 px-4 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {subdivisions.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* Asset Selection */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">
                  Select Asset
                </label>
                <div className="relative">
                  <select
                    value={selectedAsset}
                    onChange={(e) => handleAssetChange(e.target.value)}
                    className="block w-full bg-white text-gray-800 border border-gray-300 rounded-lg py-3 px-4 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {availableAssets.map((asset) => (
                      <option key={asset.code} value={asset.code}>
                        {asset.name} ({asset.code})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">
                  Amount
                </label>
                <div className="flex space-x-2 mb-2">
                  <button
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-gray-800 font-medium transition-colors"
                    onClick={() => setAmount("10")}
                  >
                    $10
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-gray-800 font-medium transition-colors"
                    onClick={() => setAmount("25")}
                  >
                    $25
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-gray-800 font-medium transition-colors"
                    onClick={() => setAmount("50")}
                  >
                    $50
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-700">
                    $
                  </span>
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="block w-full bg-white border border-gray-300 rounded-lg py-3 pl-8 pr-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Estimated value: {selectedAsset}{" "}
                  {(() => {
                    const selectedAssetObj = assets.find(
                      (a) => a.symbol === selectedAsset
                    );
                    if (selectedAssetObj) {
                      return (
                        parseFloat(amount) / selectedAssetObj.price
                      ).toFixed(6);
                    } else {
                      return parseFloat(amount).toFixed(6);
                    }
                  })()}
                </p>
              </div>

              {/* Network Selection */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">
                  Network
                </label>
                <div className="relative">
                  <select
                    value={selectedNetwork}
                    onChange={(e) => setSelectedNetwork(e.target.value)}
                    className="block w-full bg-white text-gray-800 border border-gray-300 rounded-lg py-3 px-4 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {availableNetworks.map((network) => (
                      <option key={network.id} value={network.id}>
                        {network.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Cashout Method Selection */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">
                  Cashout Method
                </label>
                <div className="relative">
                  <select
                    value={selectedCashoutMethod}
                    onChange={(e) => setSelectedCashoutMethod(e.target.value)}
                    className="block w-full bg-white text-gray-800 border border-gray-300 rounded-lg py-3 px-4 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {cashoutMethods.map((method) => (
                      <option key={method.id} value={method.id}>
                        {method.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                {cashoutMethods.find((m) => m.id === selectedCashoutMethod)
                  ?.description && (
                  <p className="text-sm text-gray-500 mt-2">
                    {
                      cashoutMethods.find((m) => m.id === selectedCashoutMethod)
                        ?.description
                    }
                  </p>
                )}
              </div>

              {/* Action Button */}
              {activeTab === "api" ? (
                <button
                  onClick={handleOfframp}
                  disabled={!isConnected}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                    isConnected
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                      : "bg-gray-600 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  {isConnected ? "Start Offramp" : "Connect Wallet to Continue"}
                </button>
              ) : (
                <button
                  onClick={handleGenerateUrl}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  Generate Payment Link
                </button>
              )}
            </div>

            {/* Preview Section */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 flex flex-col">
              <h3 className="text-xl font-bold mb-6 dark:text-white">
                Preview
              </h3>

              <div className="flex-grow flex items-center justify-center">
                {activeTab === "api" ? (
                  <div className="text-center">
                    <div className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg mb-4">
                      Cash Out with Coinbase
                    </div>
                    <p className="text-gray-600 text-sm">
                      A simple button that opens the Coinbase Offramp flow
                    </p>
                  </div>
                ) : (
                  <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6 border border-gray-300">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-gray-800">
                        One-time Payment Link
                      </h4>
                      <span className="text-blue-600">
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path>
                        </svg>
                      </span>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm text-gray-500 mb-1">
                        You'll Receive
                      </div>
                      <div className="text-2xl font-bold text-gray-800">
                        ${estimatedUsdValue}
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm text-gray-500 mb-1">
                        You'll Send
                      </div>
                      <div className="flex items-center text-gray-800">
                        {(() => {
                          const selectedAssetObj = assets.find(
                            (a) => a.symbol === selectedAsset
                          );
                          if (selectedAssetObj) {
                            return (
                              parseFloat(amount) / selectedAssetObj.price
                            ).toFixed(6);
                          } else {
                            return parseFloat(amount).toFixed(6);
                          }
                        })()}{" "}
                        {selectedAsset} on{" "}
                        {availableNetworks.find((n) => n.id === selectedNetwork)
                          ?.name || selectedNetwork}
                      </div>
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all">
                      Generate Link
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* URL Modal */}
          {showUrlModal && (
            <GeneratedLinkModal
              title="Generated Offramp URL"
              url={generatedUrl}
              onClose={() => setShowUrlModal(false)}
              onCopy={handleCopyUrl}
              onOpen={handleOpenUrl}
            />
          )}
        </div>
      </div>
    </div>
  );
}
