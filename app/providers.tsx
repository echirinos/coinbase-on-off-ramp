"use client";

import { OnchainKitProvider } from "@coinbase/onchainkit";
import { mainnet, optimism, arbitrum, base } from "wagmi/chains";
import { ReactNode, useEffect, useState } from "react";
import { CoinbaseRampTransactionProvider } from "./contexts/CoinbaseRampTransactionContext";
import { NextUIProvider } from "@nextui-org/react";

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

  return (
    <NextUIProvider>
      <CoinbaseRampTransactionProvider>
        <OnchainKitProvider
          chain={mainnet}
          projectId={config.projectId}
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
    </NextUIProvider>
  );
}
