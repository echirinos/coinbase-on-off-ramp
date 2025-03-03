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

export function FundButtonFeature() {
  const [darkMode, setDarkMode] = useState(false);
  const [appearance, setAppearance] = useState("default");
  const [previewConfig, setPreviewConfig] = useState("");
  const [chainId, setChainId] = useState("1");
  const [asset, setAsset] = useState("ETH");
  const [amount, setAmount] = useState("0.01");
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
      const config = {
        projectId: cdpProjectId,
        darkMode,
        appearance,
        chainId,
        asset,
        amount,
        payWithAnyCrypto: isPayWithAnyCrypto,
      };

      setPreviewConfig(`<FundButton
  projectId="${cdpProjectId}"
  darkMode={${darkMode}}
  appearance="${appearance}"
  chainId="${chainId}"
  asset="${asset}"
  amount="${amount}"
  payWithAnyCrypto={${isPayWithAnyCrypto}}
/>`);
    }
  }, [
    cdpProjectId,
    darkMode,
    appearance,
    chainId,
    asset,
    amount,
    isPayWithAnyCrypto,
  ]);

  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="container space-y-12">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Fund Button
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
            The Fund Button allows your users to contribute funds to your dApp
            or project in a seamless manner.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Fund Button Configuration</CardTitle>
              <CardDescription>
                Customize how the Fund Button appears and functions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <Switch
                    id="dark-mode"
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="appearance">Appearance</Label>
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
                  <Label htmlFor="chain-id">Chain</Label>
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
                  <Label htmlFor="asset">Asset</Label>
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
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.01"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pay-with-any-crypto"
                    checked={isPayWithAnyCrypto}
                    onCheckedChange={setIsPayWithAnyCrypto}
                  />
                  <label
                    htmlFor="pay-with-any-crypto"
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
              <CardTitle>Fund Button Preview</CardTitle>
              <CardDescription>
                See how your Fund Button will look
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div
                className={`p-6 rounded-md flex items-center justify-center min-h-[200px] ${
                  darkMode ? "bg-gray-900" : "bg-white border border-gray-200"
                }`}
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-full max-w-[240px] h-12 relative">
                    <div
                      className={`w-full h-full rounded-md flex items-center justify-center font-medium ${
                        darkMode
                          ? "bg-blue-600 text-white"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      Fund {asset}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center dark:text-gray-400">
                    <span>Powered by</span>
                    <span className="ml-1 font-semibold">Coinbase</span>
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
