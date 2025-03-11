"use client";

import Link from "next/link";
import Header from "./components/Header";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />

      <main className="flex-grow">
        {/* Features Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-4">
                  <span className="text-blue-700 dark:text-blue-300 text-sm font-medium">
                    Features
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                  Powerful Ramp Solutions
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Explore the powerful features of Coinbase Onramp and Offramp
                  that can enhance your application.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <FeatureCard
                  title="Onramp"
                  description="Convert fiat to crypto and bring users onchain with Coinbase Onramp."
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  }
                  link="/onramp"
                  linkText="Explore Onramp"
                />

                <FeatureCard
                  title="Offramp"
                  description="Convert crypto back to fiat with Coinbase Offramp - the easiest way to cash out."
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  }
                  link="/offramp"
                  linkText="Explore Offramp"
                />

                <FeatureCard
                  title="Fund"
                  description="Enable users to fund your project with crypto using Coinbase's Fund Button and Fund Card components."
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  }
                  link="/fund"
                  linkText="Explore Fund"
                />

                <FeatureCard
                  title="Compare"
                  description="See how Onramp, Offramp, and Fund features compare and learn when to use each feature."
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  }
                  link="/compare"
                  linkText="Compare Features"
                />
              </div>
            </div>
          </div>
        </section>

        {/* User Journey Section */}
        <section className="py-24 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-4">
                  <span className="text-blue-700 dark:text-blue-300 text-sm font-medium">
                    User Journey
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                  Complete User Experience
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Provide a seamless experience for your users with both Onramp
                  and Offramp integration
                </p>
              </div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700"></div>

                {/* Timeline steps */}
                <div className="space-y-16 relative">
                  <StepCard
                    number="1"
                    title="User Onboarding"
                    description="New users sign up for your application and create a wallet"
                    direction="left"
                  />

                  <StepCard
                    number="2"
                    title="Fiat to Crypto (Onramp)"
                    description="Users purchase crypto with their preferred payment method"
                    direction="right"
                  />

                  <StepCard
                    number="3"
                    title="Application Usage"
                    description="Users interact with your application using their crypto"
                    direction="left"
                  />

                  <StepCard
                    number="4"
                    title="Crypto to Fiat (Offramp)"
                    description="Users convert crypto back to fiat when needed"
                    direction="right"
                  />

                  <StepCard
                    number="5"
                    title="Continued Engagement"
                    description="Users return to repeat the cycle as needed"
                    direction="left"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
                  Explore our demo to see how Coinbase Onramp and Offramp can
                  enhance your application
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
                  <CTACard
                    title="Try Onramp"
                    description="See how easy it is for users to purchase crypto with fiat"
                    link="/onramp"
                    linkText="Explore Onramp"
                  />

                  <CTACard
                    title="Try Offramp"
                    description="Experience how users can convert crypto back to fiat"
                    link="/offramp"
                    linkText="Explore Offramp"
                  />

                  <CTACard
                    title="Try Fund"
                    description="Enable crypto funding for your dApp or project"
                    link="/fund"
                    linkText="Explore Fund"
                  />

                  <CTACard
                    title="Compare Features"
                    description="Learn when to use each feature in your application"
                    link="/compare"
                    linkText="View Comparison"
                  />
                </div>

                <div className="text-center">
                  <p className="text-xl text-blue-100 mb-8">
                    Want to learn more about implementing Coinbase Ramp in your
                    application?
                  </p>
                  <a
                    href="https://docs.cdp.coinbase.com/onramp/docs/welcome"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-white text-blue-700 font-medium py-3 px-8 rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                  >
                    <span>Read the Documentation</span>
                    <svg
                      className="ml-2 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
  link,
  linkText,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  linkText: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="p-6 flex-grow">
        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      </div>
      <div className="px-6 pb-6">
        <Link
          href={link}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
        >
          {linkText} <span className="ml-2">→</span>
        </Link>
      </div>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
  direction,
}: {
  number: string;
  title: string;
  description: string;
  direction: "left" | "right";
}) {
  return (
    <div
      className={`flex items-center ${
        direction === "left" ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <div
        className={`w-1/2 ${
          direction === "left" ? "pr-12 text-right" : "pl-12 text-left"
        }`}
      >
        <div
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 ${
            direction === "left" ? "ml-auto" : "mr-auto"
          } max-w-md`}
        >
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </div>
      </div>

      <div className="relative z-10">
        <div className="w-12 h-12 bg-blue-600 dark:bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
          {number}
        </div>
      </div>

      <div className="w-1/2"></div>
    </div>
  );
}

function CTACard({
  title,
  description,
  link,
  linkText,
}: {
  title: string;
  description: string;
  link: string;
  linkText: string;
}) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/20 transition-all duration-300 flex flex-col h-full">
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-blue-100 mb-4">{description}</p>
      </div>
      <div className="px-6 pb-6">
        <Link
          href={link}
          className="inline-flex items-center text-white hover:text-blue-100 font-medium"
        >
          {linkText} <span className="ml-2">→</span>
        </Link>
      </div>
    </div>
  );
}
