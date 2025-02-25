"use client";

import { OnchainKitProvider } from "@coinbase/onchainkit";
import { mainnet, optimism, arbitrum, base } from "wagmi/chains";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const chains = [mainnet, optimism, base, arbitrum];

  return (
    <OnchainKitProvider
      chain={mainnet}
      projectId={process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ""}
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || ""}
      config={{
        appearance: {
          name: "Coinbase Ramp Demo",
          theme: "blue",
        },
      }}
    >
      {children}
    </OnchainKitProvider>
  );
}
