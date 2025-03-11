"use client";

import { OnchainKitProvider } from "@coinbase/onchainkit";
import { mainnet, optimism, arbitrum, base } from "wagmi/chains";
import { ReactNode, useEffect, useState } from "react";
import { CoinbaseRampTransactionProvider } from "./contexts/CoinbaseRampTransactionContext";

export function Providers({ children }: { children: ReactNode }) {
  const chains = [mainnet, optimism, base, arbitrum];
  const [config, setConfig] = useState({
    projectId: "",
    apiKey: "",
    cdpProjectId: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the configuration from our secure API endpoint
    const fetchConfig = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching configuration from API...");

        const response = await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // In a real app, you would include authentication here
        });

        if (response.ok) {
          const data = await response.json();
          console.log("API response received:", data);

          if (data.success) {
            // Log the configuration status without exposing actual values
            console.log("Config fetched successfully:", {
              projectId: data.config.walletConnectProjectId ? "Set" : "Not set",
              apiKey: data.config.onchainKitApiKey ? "Set" : "Not set",
              cdpProjectId: data.config.cdpProjectId ? "Set" : "Not set",
            });

            setConfig({
              projectId: data.config.walletConnectProjectId || "",
              apiKey: data.config.onchainKitApiKey || "",
              cdpProjectId: data.config.cdpProjectId || "",
            });
          } else {
            console.error("API returned success: false");
          }
        } else {
          console.error("API request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch configuration:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, []);

  // Log the configuration status without exposing actual values
  useEffect(() => {
    console.log("Current provider config status:", {
      chain: "base",
      projectId: config.projectId ? "Set" : "Not set",
      apiKey: config.apiKey ? "Set" : "Not set",
      cdpProjectId: config.cdpProjectId ? "Set" : "Not set",
    });
  }, [config]);

  if (isLoading) {
    return <div>Loading configuration...</div>;
  }

  return (
    <CoinbaseRampTransactionProvider>
      <OnchainKitProvider
        chain={base}
        projectId={config.projectId}
        apiKey={config.apiKey}
        config={{
          appearance: {
            name: "Coinbase Ramp Demo",
            theme: "blue",
          },
        }}
      >
        {children}
      </OnchainKitProvider>
    </CoinbaseRampTransactionProvider>
  );
}
