"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useCoinbaseRampTransaction } from "../contexts/CoinbaseRampTransactionContext";

// Define interfaces for type safety
interface Country {
  id: string;
  name: string;
  subdivisions: string[];
}

export const RegionSelector = () => {
  const {
    countries,
    setSelectedCountry,
    selectedCountry,
    setSelectedSubdivision,
    selectedSubdivision,
    loadingBuyConfig,
  } = useCoinbaseRampTransaction();

  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [subdivisionDropdownOpen, setSubdivisionDropdownOpen] = useState(false);

  const subdivisions = useMemo(() => {
    if (selectedCountry) {
      return selectedCountry.subdivisions;
    }
    return [];
  }, [selectedCountry]);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setCountryDropdownOpen(false);
  };

  const handleSubdivisionSelect = (subdivision: string) => {
    setSelectedSubdivision(subdivision);
    setSubdivisionDropdownOpen(false);
  };

  return (
    <div className="flex flex-row gap-4 m-auto">
      {loadingBuyConfig ? (
        <>
          <div className="h-10 w-[200px] rounded-lg bg-gray-200 animate-pulse"></div>
          <div className="h-10 w-[150px] rounded-lg bg-gray-200 animate-pulse"></div>
        </>
      ) : (
        <div className="flex flex-col md:flex-row gap-4 md:gap-2">
          {/* Country Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
              className="flex items-center justify-between w-full max-w-[200px] px-3 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {selectedCountry ? (
                <div className="flex items-center">
                  {selectedCountry && (
                    <Image
                      src={`https://flagcdn.com/${selectedCountry.id.toLowerCase()}.svg`}
                      alt={selectedCountry.id}
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                  )}
                  <span>{selectedCountry.name}</span>
                </div>
              ) : (
                <span>Select Country</span>
              )}
              <svg
                className="w-5 h-5 ml-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {countryDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {countries.map((country) => (
                  <div
                    key={country.id}
                    className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleCountrySelect(country)}
                  >
                    <Image
                      src={`https://flagcdn.com/${country.id.toLowerCase()}.svg`}
                      alt={country.id}
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                    <span>{country.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Subdivision Dropdown */}
          {subdivisions.length > 0 && (
            <div className="relative">
              <button
                onClick={() =>
                  setSubdivisionDropdownOpen(!subdivisionDropdownOpen)
                }
                className="flex items-center justify-between w-full max-w-[200px] px-3 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {selectedSubdivision ? (
                  <span>{selectedSubdivision}</span>
                ) : (
                  <span>Select Subdivision</span>
                )}
                <svg
                  className="w-5 h-5 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {subdivisionDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {subdivisions.map((subdivision) => (
                    <div
                      key={subdivision}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSubdivisionSelect(subdivision)}
                    >
                      {subdivision}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
