"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle,
  FileText,
  AlertCircle,
  ExternalLink,
  Download,
  Eye,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data for contracts
const contracts = [
  {
    id: "SC-2025-001",
    name: "Wedding DJ Services Agreement",
    status: "active",
    date: "June 15, 2025",
    client: "John & Sarah Smith",
    address: "0x7a58c0be72be218b41c608b7fe7c5bb630736c71",
    network: "Stellar",
    terms: [
      "6 hours of DJ services",
      "Equipment setup and teardown",
      "Customized playlist",
      "MC services for announcements",
      "Lighting package included",
    ],
    created: "January 10, 2025",
    expires: "June 22, 2025",
  },
  {
    id: "SC-2025-002",
    name: "Corporate Event DJ Contract",
    status: "pending",
    date: "July 28, 2025",
    client: "Acme Corporation",
    address: "0x4a0a3bf85c41c24915c4513cc4b4d105a87f66b5",
    network: "StarkNet",
    terms: [
      "4 hours of DJ services",
      "Professional sound system",
      "Corporate-appropriate music selection",
      "Coordination with event planner",
      "Early setup (2 hours before event)",
    ],
    created: "January 15, 2025",
    expires: "July 30, 2025",
  },
];

export default function SmartContracts() {
  const [selectedContract, setSelectedContract] = useState(contracts[0]);
  const [contractView, setContractView] =
    (useState < "details") | ("code" > "details");
  const [isExecuting, setIsExecuting] = useState(false);
  const { toast } = useToast();

  const executeContract = () => {
    setIsExecuting(true);

    // Simulate contract execution
    setTimeout(() => {
      setIsExecuting(false);
      toast({
        title: "Contract executed successfully",
        description: `Smart contract ${selectedContract.id} has been executed on the ${selectedContract.network} network.`,
      });
    }, 2000);
  };

  const signContract = () => {
    toast({
      title: "Contract signed",
      description: "Your digital signature has been added to the contract.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Your Contracts</CardTitle>
              <CardDescription>
                Smart contracts for your DJ bookings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {contracts.map((contract) => (
                <div
                  key={contract.id}
                  className={`p-4 border rounded-md cursor-pointer transition-colors ${
                    selectedContract.id === contract.id
                      ? "border-primary bg-primary/5"
                      : "hover:bg-accent"
                  }`}
                  onClick={() => setSelectedContract(contract)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">{contract.name}</div>
                    <Badge
                      variant={
                        contract.status === "active" ? "default" : "outline"
                      }
                    >
                      {contract.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {contract.date} • {contract.client}
                  </div>
                  <div className="text-xs flex items-center text-muted-foreground">
                    <FileText className="h-3 w-3 mr-1" />
                    {contract.id}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Create New Contract
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>{selectedContract.name}</CardTitle>
                <CardDescription>
                  Contract ID: {selectedContract.id} • Created:{" "}
                  {selectedContract.created}
                </CardDescription>
              </div>
              <Tabs
                defaultValue="details"
                value={contractView}
                onValueChange={(v) => setContractView()}
              >
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="code">Smart Contract</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <TabsContent value="details" className="space-y-6 mt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Client</h4>
                    <p className="text-sm">{selectedContract.client}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Event Date</h4>
                    <p className="text-sm">{selectedContract.date}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Status</h4>
                    <Badge
                      variant={
                        selectedContract.status === "active"
                          ? "default"
                          : "outline"
                      }
                    >
                      {selectedContract.status}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Expires</h4>
                    <p className="text-sm">{selectedContract.expires}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-2">Contract Terms</h4>
                  <ul className="space-y-2">
                    {selectedContract.terms.map((term, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-2">
                    Blockchain Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Network:</span>
                      <span>{selectedContract.network}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Contract Address:
                      </span>
                      <span className="font-mono text-xs">
                        {selectedContract.address}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Verification:
                      </span>
                      <span className="text-green-500 flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1" /> Verified
                      </span>
                    </div>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    This smart contract automatically enforces the terms of your
                    DJ booking agreement. Payment will be released according to
                    the specified milestones.
                  </AlertDescription>
                </Alert>
              </TabsContent>

              <TabsContent value="code" className="mt-0">
                <div className="relative">
                  <pre className="p-4 rounded-md bg-muted overflow-x-auto text-xs font-mono">
                    {`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title DJBookingContract
 * @dev Smart contract for DJ booking services
 */
contract DJBookingContract {
    address public client;
    address public djProvider;
    uint256 public eventDate;
    uint256 public totalAmount;
    uint256 public depositAmount;
    bool public isConfirmed;
    bool public isCompleted;
    
    enum Status { Pending, Confirmed, Completed, Cancelled }
    Status public contractStatus;
    
    event ContractCreated(address indexed client, uint256 eventDate, uint256 amount);
    event DepositPaid(address indexed client, uint256 amount);
    event ContractConfirmed(address indexed djProvider, uint256 timestamp);
    event ServiceCompleted(uint256 timestamp);
    event FinalPaymentReleased(uint256 amount);
    
    modifier onlyClient() {
        require(msg.sender == client, "Only the client can call this function");
        _;
    }
    
    modifier onlyDJProvider() {
        require(msg.sender == djProvider, "Only the DJ provider can call this function");
        _;
    }
    
    constructor(
        address _client,
        address _djProvider,
        uint256 _eventDate,
        uint256 _totalAmount
    ) {
        client = _client;
        djProvider = _djProvider;
        eventDate = _eventDate;
        totalAmount = _totalAmount;
        depositAmount = totalAmount / 4; // 25% deposit
        contractStatus = Status.Pending;
        
        emit ContractCreated(client, eventDate, totalAmount);
    }
    
    function payDeposit() external payable onlyClient {
        require(contractStatus == Status.Pending, "Contract is not in pending status");
        require(msg.value == depositAmount, "Incorrect deposit amount");
        
        contractStatus = Status.Confirmed;
        isConfirmed = true;
        
        emit DepositPaid(client, msg.value);
        emit ContractConfirmed(djProvider, block.timestamp);
    }
    
    function completeService() external onlyDJProvider {
        require(contractStatus == Status.Confirmed, "Contract is not confirmed");
        require(block.timestamp > eventDate, "Event has not occurred yet");
        
        contractStatus = Status.Completed;
        isCompleted = true;
        
        emit ServiceCompleted(block.timestamp);
    }
    
    function releaseFinalPayment() external onlyClient {
        require(contractStatus == Status.Completed, "Service not marked as completed");
        
        uint256 remainingAmount = totalAmount - depositAmount;
        require(address(this).balance >= remainingAmount, "Insufficient contract balance");
        
        payable(djProvider).transfer(remainingAmount);
        
        emit FinalPaymentReleased(remainingAmount);
    }
    
    function getContractDetails() external view returns (
        address, address, uint256, uint256, uint256, Status, bool, bool
    ) {
        return (
            client,
            djProvider,
            eventDate,
            totalAmount,
            depositAmount,
            contractStatus,
            isConfirmed,
            isCompleted
        );
    }
}`}
                  </pre>
                  <div className="absolute top-2 right-2 space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        toast({
                          title: "Code copied",
                          description:
                            "Smart contract code copied to clipboard",
                        });
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-4">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="explanation">
                      <AccordionTrigger>Contract Explanation</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 text-sm">
                          <p>
                            This smart contract manages the DJ booking process
                            with the following features:
                          </p>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>
                              Securely stores booking details on the blockchain
                            </li>
                            <li>Handles 25% deposit payment</li>
                            <li>Confirms booking when deposit is received</li>
                            <li>Allows DJ to mark service as completed</li>
                            <li>
                              Releases final payment after service completion
                            </li>
                            <li>Provides transparency with event logging</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </TabsContent>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Eye className="h-4 w-4 mr-2" />
                    View Full Contract
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>{selectedContract.name}</DialogTitle>
                    <DialogDescription>
                      Contract ID: {selectedContract.id} • Created:{" "}
                      {selectedContract.created}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="max-h-[60vh] overflow-y-auto p-4 border rounded-md">
                    <h3 className="text-lg font-bold mb-4">
                      DJ SERVICES AGREEMENT
                    </h3>
                    <p className="mb-4">
                      This DJ Services Agreement (the "Agreement") is entered
                      into as of {selectedContract.created} by and between:
                    </p>
                    <p className="mb-4">
                      <strong>DJ Provider:</strong> Professional DJ Services LLC
                      ("Provider")
                    </p>
                    <p className="mb-4">
                      <strong>Client:</strong> {selectedContract.client}{" "}
                      ("Client")
                    </p>

                    <h4 className="text-md font-bold mt-6 mb-2">1. SERVICES</h4>
                    <p className="mb-4">
                      Provider agrees to provide DJ services for Client's event
                      as follows:
                    </p>
                    <ul className="list-disc pl-8 mb-4">
                      {selectedContract.terms.map((term, index) => (
                        <li key={index} className="mb-2">
                          {term}
                        </li>
                      ))}
                    </ul>

                    <h4 className="text-md font-bold mt-6 mb-2">
                      2. EVENT DETAILS
                    </h4>
                    <p className="mb-2">
                      <strong>Date:</strong> {selectedContract.date}
                    </p>
                    <p className="mb-2">
                      <strong>Venue:</strong> To be confirmed by Client
                    </p>
                    <p className="mb-4">
                      <strong>Hours:</strong> To be confirmed by Client (minimum
                      4 hours)
                    </p>

                    <h4 className="text-md font-bold mt-6 mb-2">3. PAYMENT</h4>
                    <p className="mb-2">Total Fee: $1,755.00 USD</p>
                    <p className="mb-2">
                      Deposit: $438.75 USD (25% of total fee, non-refundable)
                    </p>
                    <p className="mb-4">
                      Balance: $1,316.25 USD (due 7 days before event)
                    </p>

                    <h4 className="text-md font-bold mt-6 mb-2">
                      4. CANCELLATION
                    </h4>
                    <p className="mb-4">
                      If Client cancels this Agreement 30 or more days before
                      the event date, Client forfeits the non-refundable
                      deposit. If Client cancels this Agreement less than 30
                      days before the event date, Client shall pay the full fee.
                    </p>

                    <h4 className="text-md font-bold mt-6 mb-2">
                      5. SMART CONTRACT EXECUTION
                    </h4>
                    <p className="mb-4">
                      This Agreement is executed as a smart contract on the{" "}
                      {selectedContract.network} blockchain with contract
                      address {selectedContract.address}. The smart contract
                      automatically enforces the terms of this Agreement,
                      including payment processing and milestone tracking.
                    </p>

                    <h4 className="text-md font-bold mt-6 mb-2">
                      6. TERM AND TERMINATION
                    </h4>
                    <p className="mb-4">
                      This Agreement shall commence on the date of signing and
                      shall continue until all obligations have been fulfilled.
                      The Agreement expires on {selectedContract.expires}.
                    </p>

                    <div className="mt-8 pt-4 border-t">
                      <p className="mb-2">
                        <strong>Digital Signatures:</strong>
                      </p>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm">
                            Provider: Professional DJ Services LLC
                          </p>
                          <p className="text-sm text-green-500 flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" /> Signed on{" "}
                            {selectedContract.created}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm">
                            Client: {selectedContract.client}
                          </p>
                          {selectedContract.status === "active" ? (
                            <p className="text-sm text-green-500 flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1" /> Signed on{" "}
                              {selectedContract.created}
                            </p>
                          ) : (
                            <p className="text-sm text-yellow-500 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" /> Awaiting
                              signature
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    {selectedContract.status === "pending" && (
                      <Button onClick={signContract}>Sign Contract</Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button
                className="w-full sm:w-auto"
                onClick={executeContract}
                disabled={isExecuting || selectedContract.status !== "active"}
              >
                {isExecuting ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Executing...
                  </>
                ) : (
                  <>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Execute Contract
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
