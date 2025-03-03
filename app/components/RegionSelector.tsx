"use client";
import Image from "next/image";
import { useMemo } from "react";
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

  const subdivisions = useMemo(() => {
    if (selectedCountry) {
      return selectedCountry.subdivisions;
    }
    return [];
  }, [selectedCountry]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryId = e.target.value;
    const country = countries.find((country) => country.id === countryId);
    if (country) {
      setSelectedCountry(country);
    }
  };

  const handleSubdivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subdivision = e.target.value;
    setSelectedSubdivision(subdivision);
  };

  return (
    <div className="flex flex-row gap-4 m-auto">
      {loadingBuyConfig ? (
        <>
          <div className="h-10 w-[200px] bg-gray-200 animate-pulse rounded-lg"></div>
          <div className="h-10 w-[150px] bg-gray-200 animate-pulse rounded-lg"></div>
        </>
      ) : (
        <div className="flex flex-col md:flex-row gap-4 md:gap-2">
          <div className="relative">
            <select
              className="block appearance-none w-full max-w-[200px] bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={selectedCountry?.id || ''}
              onChange={handleCountryChange}
            >
              <option value="" disabled>Select Country</option>
              {countries.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          {subdivisions.length > 0 && (
            <div className="relative">
              <select
                className="block appearance-none w-full max-w-[200px] bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={selectedSubdivision || ''}
                onChange={handleSubdivisionChange}
              >
                <option value="" disabled>Select Subdivision</option>
                {subdivisions.map((subdivision) => (
                  <option key={subdivision} value={subdivision}>
                    {subdivision}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
