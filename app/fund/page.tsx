import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FundButtonFeature } from "../components/FundButtonFeature";
import { FundCardFeature } from "../components/FundCardFeature";

export default function FundPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-20 bg-white dark:bg-gray-950">
          <div className="container space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Fund Your Project
            </h1>
            <p className="mx-auto max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Integrate Coinbase's Fund Button and Fund Card features to enable
              crypto funding for your dApp or project.
            </p>
          </div>
        </section>

        <FundButtonFeature />
        <FundCardFeature />
      </main>
      <Footer />
    </div>
  );
}
