"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle, Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PaymentMethods() {
  const [paymentMethod, setPaymentMethod] = useState("stellar");
  const [paymentStatus, setPaymentStatus] =
    (useState < "idle") | "processing" | "success" | ("error" > "idle");
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");
  const { toast } = useToast();

  const handlePayment = () => {
    if (!walletAddress || !amount) {
      toast({
        title: "Missing information",
        description: "Please provide both wallet address and amount",
        variant: "destructive",
      });
      return;
    }

    setPaymentStatus("processing");

    // Simulate blockchain transaction
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate for demo
      setPaymentStatus(success ? "success" : "error");

      if (success) {
        toast({
          title: "Payment successful",
          description: `Transaction confirmed on the ${
            paymentMethod === "stellar" ? "Stellar" : "StarkNet"
          } network`,
        });
      } else {
        toast({
          title: "Payment failed",
          description:
            "There was an issue with your transaction. Please try again.",
          variant: "destructive",
        });
      }
    }, 2000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Address copied to clipboard",
    });
  };

  const resetPayment = () => {
    setPaymentStatus("idle");
    setWalletAddress("");
    setAmount("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Blockchain Payment</CardTitle>
              <CardDescription>
                Pay securely using cryptocurrency on the blockchain
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs
                defaultValue="stellar"
                value={paymentMethod}
                onValueChange={setPaymentMethod}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="stellar">Stellar (XLM)</TabsTrigger>
                  <TabsTrigger value="starknet">StarkNet (STRK)</TabsTrigger>
                </TabsList>
                <TabsContent value="stellar" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="stellar-address">
                      Your Stellar Wallet Address
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        id="stellar-address"
                        placeholder="G..."
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                        disabled={
                          paymentStatus === "processing" ||
                          paymentStatus === "success"
                        }
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          copyToClipboard(
                            "GDQP2KPQGKIHYJGXNUIYOMHARUARCA7DJT5FO2FFOOKY3B2WSQHG4W37"
                          )
                        }
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stellar-amount">Amount (XLM)</Label>
                    <Input
                      id="stellar-amount"
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      disabled={
                        paymentStatus === "processing" ||
                        paymentStatus === "success"
                      }
                    />
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Important</AlertTitle>
                    <AlertDescription>
                      Make sure to double-check the wallet address before
                      sending. Blockchain transactions cannot be reversed.
                    </AlertDescription>
                  </Alert>
                </TabsContent>

                <TabsContent value="starknet" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="starknet-address">
                      Your StarkNet Wallet Address
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        id="starknet-address"
                        placeholder="0x..."
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                        disabled={
                          paymentStatus === "processing" ||
                          paymentStatus === "success"
                        }
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          copyToClipboard(
                            "0x04a0a3bf85c41c24915c4513cc4b4d105a87f66b5e40c7f6b5c9acb7b60d7c5"
                          )
                        }
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="starknet-amount">Amount (STRK)</Label>
                    <Input
                      id="starknet-amount"
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      disabled={
                        paymentStatus === "processing" ||
                        paymentStatus === "success"
                      }
                    />
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Important</AlertTitle>
                    <AlertDescription>
                      StarkNet transactions are fast and have low fees. Ensure
                      you have enough STRK for gas fees.
                    </AlertDescription>
                  </Alert>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              {paymentStatus === "idle" && (
                <Button onClick={handlePayment} className="w-full">
                  Pay Now
                </Button>
              )}

              {paymentStatus === "processing" && (
                <Button disabled className="w-full">
                  <span className="mr-2">Processing...</span>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                </Button>
              )}

              {paymentStatus === "success" && (
                <div className="space-y-4 w-full">
                  <div className="flex items-center justify-center space-x-2 text-green-500">
                    <CheckCircle className="h-5 w-5" />
                    <span>Payment Successful!</span>
                  </div>
                  <Button
                    onClick={resetPayment}
                    variant="outline"
                    className="w-full"
                  >
                    Make Another Payment
                  </Button>
                </div>
              )}

              {paymentStatus === "error" && (
                <div className="space-y-4 w-full">
                  <div className="flex items-center justify-center space-x-2 text-destructive">
                    <AlertCircle className="h-5 w-5" />
                    <span>Payment Failed</span>
                  </div>
                  <Button onClick={resetPayment} className="w-full">
                    Try Again
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>
                Information about your booking and payment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium">Booking ID:</div>
                  <div className="text-sm">BK-2025-0042</div>

                  <div className="text-sm font-medium">Event Date:</div>
                  <div className="text-sm">June 15, 2025</div>

                  <div className="text-sm font-medium">Event Type:</div>
                  <div className="text-sm">Wedding</div>

                  <div className="text-sm font-medium">DJ Package:</div>
                  <div className="text-sm">Premium (6 hours)</div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>DJ Services (6 hours)</span>
                    <span>$1,200.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Equipment Setup</span>
                    <span>$200.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Travel Fee</span>
                    <span>$75.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Special Requests</span>
                    <span>$150.00</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-medium">
                    <span>Subtotal</span>
                    <span>$1,625.00</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Tax (8%)</span>
                    <span>$130.00</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>$1,755.00</span>
                  </div>

                  <div className="bg-muted p-3 rounded-md text-sm">
                    <p>
                      <span className="font-medium">Deposit Required:</span>{" "}
                      $438.75 (25%)
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      The remaining balance will be due 7 days before your
                      event.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                <p>
                  Payment secured by blockchain smart contracts. View your{" "}
                  <a
                    href="#"
                    className="text-primary underline inline-flex items-center"
                  >
                    contract details
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cryptocurrency Exchange Rates</CardTitle>
          <CardDescription>
            Current exchange rates for supported cryptocurrencies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Currency</th>
                  <th className="text-left py-3 px-4">Price (USD)</th>
                  <th className="text-left py-3 px-4">24h Change</th>
                  <th className="text-left py-3 px-4">Network Fee</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                      XLM
                    </div>
                    Stellar (XLM)
                  </td>
                  <td className="py-3 px-4">$0.1423</td>
                  <td className="py-3 px-4 text-green-500">+2.34%</td>
                  <td className="py-3 px-4">0.00001 XLM</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">
                      STRK
                    </div>
                    StarkNet (STRK)
                  </td>
                  <td className="py-3 px-4">$1.8745</td>
                  <td className="py-3 px-4 text-red-500">-1.05%</td>
                  <td className="py-3 px-4">0.0002 STRK</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-white text-xs font-bold">
                      ETH
                    </div>
                    Ethereum (ETH)
                  </td>
                  <td className="py-3 px-4">$3,245.67</td>
                  <td className="py-3 px-4 text-green-500">+0.87%</td>
                  <td className="py-3 px-4">Variable (~$2-5)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
                      BTC
                    </div>
                    Bitcoin (BTC)
                  </td>
                  <td className="py-3 px-4">$52,487.93</td>
                  <td className="py-3 px-4 text-green-500">+1.23%</td>
                  <td className="py-3 px-4">Variable (~$5-10)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Rates updated every 5 minutes. Last updated:{" "}
            {new Date().toLocaleTimeString()}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
