"use client";

import React from "react";
import { Header } from "../components/Header";
import { SimpleFundButton } from "../components/SimpleFundButton";
import { WalletConnector } from "../components/WalletConnector";

export default function TestFundPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Test Fund Components</h1>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Wallet Connection</h2>
            <WalletConnector />
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Simple Fund Button</h2>
            <SimpleFundButton />
          </div>
        </div>
      </main>
    </div>
  );
}
