"use client";

import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { WalletConnector } from "../components/WalletConnector";
import { useAccount } from "wagmi";

export default function DebugPage() {
  const { isConnected, address } = useAccount();
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [publicEnvVars, setPublicEnvVars] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    // Collect all public environment variables
    const envVars: Record<string, string> = {};
    Object.keys(process.env).forEach((key) => {
      if (key.startsWith("NEXT_PUBLIC_")) {
        envVars[key] = process.env[key] || "";
      }
    });
    setPublicEnvVars(envVars);
  }, []);

  const fetchApiData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("API Response:", data);
      setApiResponse(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching API data:", error);
      setError(error instanceof Error ? error.message : "Unknown error");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Debug Environment</h1>

          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Wallet Connection</h2>
            <p className="mb-4">Connect your wallet to test the connection.</p>
            <WalletConnector />

            {isConnected && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700">
                  <span className="font-bold">Connected:</span> {address}
                </p>
              </div>
            )}
          </div>

          <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-bold mb-4">
              Client-Side Environment Variables
            </h2>
            <p className="mb-4 text-gray-600">
              These are the public environment variables available in the
              browser. Note that only variables prefixed with NEXT_PUBLIC_ are
              accessible client-side.
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b text-left">Variable</th>
                    <th className="py-2 px-4 border-b text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(publicEnvVars).map(([key, value]) => (
                    <tr key={key} className="border-b">
                      <td className="py-2 px-4 font-mono text-sm">{key}</td>
                      <td className="py-2 px-4">
                        {value ? (
                          <span className="text-green-600">✓ Set</span>
                        ) : (
                          <span className="text-red-600">✗ Not set</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-bold mb-4">
              Server-Side Environment Variables
            </h2>
            <p className="mb-4 text-gray-600">
              Test the API endpoint to check if server-side environment
              variables are correctly set.
            </p>

            <button
              onClick={fetchApiData}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
            >
              {isLoading ? "Loading..." : "Test API Endpoint"}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">
                  <span className="font-bold">Error:</span> {error}
                </p>
              </div>
            )}

            {apiResponse && (
              <div className="mt-4">
                <h3 className="font-bold mb-2">API Response:</h3>
                <div className="p-3 bg-gray-100 rounded-lg overflow-x-auto">
                  <pre className="text-sm">
                    {JSON.stringify(apiResponse, null, 2)}
                  </pre>
                </div>

                {apiResponse.success ? (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-bold mb-2">
                      Server-Side Variables Status:
                    </h4>
                    <ul className="list-disc pl-5">
                      <li className="mb-1">
                        CDP Project ID:{" "}
                        {apiResponse.config.cdpProjectId ? (
                          <span className="text-green-600">✓ Set</span>
                        ) : (
                          <span className="text-red-600">✗ Not set</span>
                        )}
                      </li>
                      <li className="mb-1">
                        OnchainKit API Key:{" "}
                        {apiResponse.config.onchainKitApiKey ? (
                          <span className="text-green-600">✓ Set</span>
                        ) : (
                          <span className="text-red-600">✗ Not set</span>
                        )}
                      </li>
                      <li className="mb-1">
                        WalletConnect Project ID:{" "}
                        {apiResponse.config.walletConnectProjectId ? (
                          <span className="text-green-600">✓ Set</span>
                        ) : (
                          <span className="text-red-600">✗ Not set</span>
                        )}
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700">
                      <span className="font-bold">API Error:</span>{" "}
                      {apiResponse.error}
                    </p>
                    {apiResponse.missingVars && (
                      <div className="mt-2">
                        <p className="font-bold text-red-700">
                          Missing Variables:
                        </p>
                        <ul className="list-disc pl-5">
                          {apiResponse.missingVars.map((variable: string) => (
                            <li key={variable} className="text-red-700">
                              {variable}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Troubleshooting Steps</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Check your .env.local file</strong> - Make sure it
                contains all the required variables:
                <ul className="list-disc pl-5 mt-2">
                  <li>
                    <code>CDP_PROJECT_ID</code> - Server-side variable for the
                    Coinbase Developer Platform Project ID
                  </li>
                  <li>
                    <code>ONCHAINKIT_API_KEY</code> - Server-side variable for
                    the OnchainKit API Key
                  </li>
                  <li>
                    <code>WALLETCONNECT_PROJECT_ID</code> - Server-side variable
                    for the WalletConnect Project ID
                  </li>
                  <li>
                    <code>NEXT_PUBLIC_ONCHAINKIT_API_KEY</code> - Client-side
                    variable for the OnchainKit API Key
                  </li>
                  <li>
                    <code>NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID</code> -
                    Client-side variable for the WalletConnect Project ID
                  </li>
                </ul>
              </li>
              <li>
                <strong>Restart your development server</strong> - After
                updating environment variables, restart the server with:
                <pre className="bg-gray-100 p-2 rounded mt-2">npm run dev</pre>
              </li>
              <li>
                <strong>Check for typos</strong> - Ensure variable names match
                exactly what's expected
              </li>
              <li>
                <strong>Verify API keys</strong> - Make sure your API keys are
                valid and active
              </li>
              <li>
                <strong>Check browser console</strong> - Look for error messages
                that might provide more details
              </li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
