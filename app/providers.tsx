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

  useEffect(() => {
    // Fetch the configuration from our secure API endpoint
    const fetchConfig = async () => {
      try {
        const response = await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // In a real app, you would include authentication here
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
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
          }
        }
      } catch (error) {
        console.error("Failed to fetch configuration:", error);
      }
    };

    fetchConfig();
  }, []);

  console.log("OnchainKitProvider config:", {
    chain: "base",
    projectId: config.cdpProjectId ? "Set" : "Not set",
    apiKey: config.apiKey ? "Set" : "Not set",
  });

  return (
    <CoinbaseRampTransactionProvider>
      <OnchainKitProvider
        chain={base}
        projectId={config.cdpProjectId}
        apiKey={config.apiKey}
        config={{
          appearance: {
            name:
              process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME ||
              "Coinbase Ramp Demo",
            theme: "blue",
          },
        }}
      >
        {children}
      </OnchainKitProvider>
    </CoinbaseRampTransactionProvider>
  );
}
