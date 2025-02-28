"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaymentMethods from "./PaymentMethods";
import SmartContracts from "./SmartContracts";
import TransactionHistory from "./TransactionHistory";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wallet, Contact as FileContract, Clock } from "lucide-react";

export default function PaymentsAndContractsPage() {
  const [activeTab, setActiveTab] = useState("payments");

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Manage Your DJ Bookings</CardTitle>
          <CardDescription>
            Securely manage payments and contracts for your DJ bookings using
            blockchain technology.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="payments"
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="payments" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                <span className="hidden sm:inline">Payments</span>
              </TabsTrigger>
              <TabsTrigger
                value="contracts"
                className="flex items-center gap-2"
              >
                <FileContract className="h-4 w-4" />
                <span className="hidden sm:inline">Contracts</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline">History</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="payments" className="space-y-4">
              <PaymentMethods />
            </TabsContent>

            <TabsContent value="contracts" className="space-y-4">
              <SmartContracts />
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <TransactionHistory />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
