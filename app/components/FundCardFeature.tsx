import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CopyBlock, dracula } from "react-code-blocks";
import Image from "next/image";

export function FundCardFeature() {
  const [darkMode, setDarkMode] = useState(false);
  const [appearance, setAppearance] = useState("default");
  const [previewConfig, setPreviewConfig] = useState("");
  const [chainId, setChainId] = useState("1");
  const [asset, setAsset] = useState("ETH");
  const [destinationAddress, setDestinationAddress] = useState("0xYourAddress");
  const [isPayWithAnyCrypto, setIsPayWithAnyCrypto] = useState(true);
  const [cdpProjectId, setCdpProjectId] = useState("");

  useEffect(() => {
    // Fetch CDP Project ID from server
    const fetchCdpProjectId = async () => {
      try {
        const response = await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.success && data.config.cdpProjectId) {
          setCdpProjectId(data.config.cdpProjectId);
        }
      } catch (error) {
        console.error("Error fetching CDP Project ID:", error);
      }
    };

    fetchCdpProjectId();
  }, []);

  useEffect(() => {
    // Update preview config when parameters change
    if (cdpProjectId) {
      setPreviewConfig(`<FundCard
  projectId="${cdpProjectId}"
  darkMode={${darkMode}}
  appearance="${appearance}"
  chainId="${chainId}"
  asset="${asset}"
  destinationAddress="${destinationAddress}"
  payWithAnyCrypto={${isPayWithAnyCrypto}}
/>`);
    }
  }, [
    cdpProjectId,
    darkMode,
    appearance,
    chainId,
    asset,
    destinationAddress,
    isPayWithAnyCrypto,
  ]);

  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="container space-y-12">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Fund Card
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
            The Fund Card provides a complete payment experience that enables
            users to fund your project with crypto.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Fund Card Configuration</CardTitle>
              <CardDescription>
                Customize how your Fund Card appears and functions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode-card">Dark Mode</Label>
                  <Switch
                    id="dark-mode-card"
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="appearance-card">Appearance</Label>
                  <Select
                    defaultValue={appearance}
                    onValueChange={setAppearance}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select appearance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="flat">Flat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chain-id-card">Chain</Label>
                  <Select defaultValue={chainId} onValueChange={setChainId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select chain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Ethereum</SelectItem>
                      <SelectItem value="137">Polygon</SelectItem>
                      <SelectItem value="42161">Arbitrum</SelectItem>
                      <SelectItem value="10">Optimism</SelectItem>
                      <SelectItem value="43114">Avalanche</SelectItem>
                      <SelectItem value="56">BNB Chain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="asset-card">Asset</Label>
                  <Select defaultValue={asset} onValueChange={setAsset}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select asset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ETH">ETH</SelectItem>
                      <SelectItem value="USDC">USDC</SelectItem>
                      <SelectItem value="USDT">USDT</SelectItem>
                      <SelectItem value="DAI">DAI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination-address">
                    Destination Address
                  </Label>
                  <Input
                    id="destination-address"
                    value={destinationAddress}
                    onChange={(e) => setDestinationAddress(e.target.value)}
                    placeholder="0xYourAddress"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pay-with-any-crypto-card"
                    checked={isPayWithAnyCrypto}
                    onCheckedChange={setIsPayWithAnyCrypto}
                  />
                  <label
                    htmlFor="pay-with-any-crypto-card"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Allow payment with any crypto
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fund Card Preview</CardTitle>
              <CardDescription>
                See how your Fund Card will look
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div
                className={`p-6 rounded-md flex items-center justify-center min-h-[300px] ${
                  darkMode ? "bg-gray-900" : "bg-white border border-gray-200"
                }`}
              >
                <div className="w-full max-w-[320px] rounded-xl overflow-hidden border border-gray-200 shadow-md">
                  <div
                    className={`p-4 ${
                      darkMode
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-900"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Fund Project</h3>
                      <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {asset}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Amount
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <div className="text-xl font-bold">0.01 {asset}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            ≈ $25.00
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                          Connect Wallet
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`px-4 py-2 text-xs ${
                      darkMode
                        ? "bg-gray-700 text-gray-400"
                        : "bg-gray-50 text-gray-500"
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <span>Powered by</span>
                      <span className="ml-1 font-semibold">Coinbase</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Implementation Code</Label>
                <div className="rounded-md overflow-hidden">
                  <CopyBlock
                    text={previewConfig}
                    language="jsx"
                    showLineNumbers={false}
                    theme={dracula}
                    wrapLines
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Copy Code</Button>
              <Button>Try Demo</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
