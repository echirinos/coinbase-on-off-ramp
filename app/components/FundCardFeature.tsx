"use client";

import React, { useState, useEffect } from "react";
import { FundCard } from "@coinbase/onchainkit/fund";
import { RegionSelector } from "./RegionSelector";
import { useCoinbaseRampTransaction } from "../contexts/CoinbaseRampTransactionContext";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { Key } from "@react-types/shared";

export function FundCardFeature() {
  const {
    selectedCountry,
    selectedSubdivision,
    selectedCurrency,
    setSelectedCurrency,
    buyOptions,
  } = useCoinbaseRampTransaction();

  const [previewConfig, setPreviewConfig] = useState("");
  const [asset, setAsset] = useState("BTC");
  const [headerText, setHeaderText] = useState("Fund Project");
  const [buttonText, setButtonText] = useState("Purchase");
  const [presetAmounts, setPresetAmounts] = useState<string[]>([
    "10",
    "20",
    "50",
  ]);
  const [cdpProjectId, setCdpProjectId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
    // Update preview config when parameters change
    setPreviewConfig(`<FundCard
  assetSymbol="${asset}"
  country="${selectedCountry?.id || "US"}"
  currency="${selectedCurrency?.id || "USD"}"
  subdivision="${selectedSubdivision || ""}"
  headerText="${headerText}"
  buttonText="${buttonText}"
  presetAmountInputs={['${presetAmounts.join("', '")}'] as const}
/>`);
  }, [
    asset,
    selectedCountry,
    selectedCurrency,
    selectedSubdivision,
    headerText,
    buttonText,
    presetAmounts,
  ]);

  const handleCurrencySelection = (value: Key | null) => {
    if (value) {
      if (buyOptions) {
        const newCurrency =
          buyOptions.paymentCurrencies.find(
            (currency) => currency.id === value
          ) || null;
        setSelectedCurrency(newCurrency);
      }
    }
  };

  const availableCurrencies = buyOptions?.paymentCurrencies || [];

  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="container space-y-12">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Fund Card
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
            The Fund Card provides a complete payment experience that enables
            users to fund your project with crypto.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center flex-wrap gap-4">
          <div className="flex justify-center items-center w-full max-w-[500px] gap-4 flex-col">
            {isLoading ? (
              <div className="text-center text-gray-500">
                <p>Loading Fund Card...</p>
              </div>
            ) : (
              <FundCard
                key={`${asset}-${selectedCountry?.id}-${selectedCurrency?.id}-${selectedSubdivision}`}
                assetSymbol={asset}
                country={selectedCountry?.id || "US"}
                currency={selectedCurrency?.id || "USD"}
                subdivision={selectedSubdivision || undefined}
                headerText={headerText}
                buttonText={buttonText}
                presetAmountInputs={presetAmounts as any}
              />
            )}
          </div>

          <div className="flex flex-col gap-2 items-center p-4 w-full max-w-[800px]">
            <Card>
              <CardHeader>
                <p className="text-lg">Fund card props</p>
              </CardHeader>
              <CardBody>
                <div>
                  <RegionSelector />
                </div>
                <div className="flex pt-4 pb-4 gap-2 flex-wrap">
                  <Autocomplete
                    isClearable={false}
                    label="Currency"
                    placeholder="Search for a currency"
                    className="w-[200px] my-auto"
                    onSelectionChange={handleCurrencySelection}
                    selectedKey={selectedCurrency?.id}
                  >
                    {availableCurrencies.map((currency) => (
                      <AutocompleteItem key={currency.id} value={currency.id}>
                        {currency.id}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>

                  <Input
                    placeholder="asset"
                    label="asset"
                    variant="bordered"
                    value={asset}
                    className="w-[150px]"
                    onChange={(e) => {
                      setAsset(e.target.value);
                    }}
                  />

                  <Input
                    placeholder="Header Text"
                    label="Header Text"
                    variant="bordered"
                    value={headerText}
                    className="w-[200px]"
                    onChange={(e) => {
                      setHeaderText(e.target.value);
                    }}
                  />

                  <Input
                    placeholder="Button Text"
                    label="Button Text"
                    variant="bordered"
                    value={buttonText}
                    className="w-[200px]"
                    onChange={(e) => {
                      setButtonText(e.target.value);
                    }}
                  />

                  <Input
                    placeholder="presetAmountInputs"
                    label="presetAmountInputs"
                    variant="bordered"
                    className="w-[200px]"
                    value={presetAmounts?.join(",")}
                    onChange={(e) => {
                      setPresetAmounts(e.target.value.split(","));
                    }}
                  />
                </div>
              </CardBody>

              <CardFooter>
                <div className="mt-2 space-y-2 w-full">
                  <label className="text-sm font-medium">
                    Implementation Code
                  </label>
                  <div className="rounded-md overflow-hidden bg-gray-900 p-4">
                    <pre className="text-xs text-white overflow-x-auto">
                      {previewConfig}
                    </pre>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
