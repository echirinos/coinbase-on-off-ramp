"use client";

import Link from "next/link";
import Header from "./components/Header";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
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
