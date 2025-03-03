"use client";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Skeleton,
} from "@nextui-org/react";
import { Key } from "@react-types/shared";
import Image from "next/image";
import { useMemo } from "react";
import { useCoinbaseRampTransaction } from "../contexts/CoinbaseRampTransactionContext";

export const RegionSelector = () => {
  const {
    countries,
    setSelectedCountry,
    selectedCountry,
    setSelectedSubdivision,
    selectedSubdivision,
    loadingBuyConfig,
  } = useCoinbaseRampTransaction();

  const subdivisions = useMemo(() => {
    if (selectedCountry) {
      return selectedCountry.subdivisions;
    }

    return [];
  }, [selectedCountry]);

  const handleCountrySelectionChange = (selectedKey: Key | null) => {
    if (selectedKey) {
      const country = countries.find((country) => country.id === selectedKey)!;
      setSelectedCountry(country);
    }
  };

  const handleSubdivisionSelectionChange = (selectedKey: Key | null) => {
    if (selectedKey) {
      const subdivision = selectedCountry?.subdivisions.find(
        (subdivision) => subdivision === selectedKey
      );

      if (subdivision) {
        setSelectedSubdivision(subdivision);
      }
    }
  };

  return (
    <div className="flex flex-row gap-4 m-auto">
      {loadingBuyConfig ? (
        <>
          <Skeleton className="h-10 w-[200px] rounded-lg" />
          <Skeleton className="h-10 w-[150px] rounded-lg" />
        </>
      ) : (
        <div className="flex flex-col md:flex-row gap-4 md:gap-2">
          <Autocomplete
            isClearable={false}
            variant="underlined"
            onSelectionChange={handleCountrySelectionChange}
            className="max-w-[200px] mx-auto sm:mx-0"
            label="country"
            selectedKey={selectedCountry?.id}
            startContent={
              selectedCountry && (
                <Image
                  src={`https://flagcdn.com/${selectedCountry?.id.toLowerCase()}.svg`}
                  alt={selectedCountry?.id || "selectedCountry"}
                  width={24}
                  height={24}
                />
              )
            }
          >
            {countries.map(({ id, name }) => (
              <AutocompleteItem
                key={id}
                value={id}
                startContent={
                  <Avatar
                    alt={id}
                    className="w-6 h-6"
                    src={`https://flagcdn.com/${id.toLowerCase()}.svg`}
                  />
                }
              >
                {name}
              </AutocompleteItem>
            ))}
          </Autocomplete>

          {subdivisions.length > 0 && (
            <Autocomplete
              isClearable={false}
              variant="underlined"
              onSelectionChange={handleSubdivisionSelectionChange}
              className="max-w-[200px] mx-auto sm:mx-0"
              label="subdivision"
              selectedKey={selectedSubdivision}
            >
              {subdivisions.map((subdivision) => (
                <AutocompleteItem key={subdivision} value={subdivision}>
                  {subdivision}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          )}
        </div>
      )}
    </div>
  );
};
