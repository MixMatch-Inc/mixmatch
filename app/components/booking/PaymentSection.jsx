"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CreditCard, CheckCircle } from "lucide-react";

export default function PaymentSection() {
  const [paymentMethod, setPaymentMethod] = useState < string > "creditCard";
  const [agreedToTerms, setAgreedToTerms] = useState < boolean > false;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Payment Details</h3>
        <RadioGroup
          defaultValue={paymentMethod}
          onValueChange={setPaymentMethod}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2 border rounded-md p-4">
            <RadioGroupItem value="creditCard" id="creditCard" />
            <Label htmlFor="creditCard" className="flex-1 cursor-pointer">
              <div className="flex justify-between items-center">
                <span>Credit Card</span>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </div>
            </Label>
          </div>

          {paymentMethod === "creditCard" && (
            <div className="border rounded-md p-4 space-y-4 ml-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    className="mt-1"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input id="expiryDate" placeholder="MM/YY" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" className="mt-1" />
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2 border rounded-md p-4">
            <RadioGroupItem value="paypal" id="paypal" />
            <Label htmlFor="paypal" className="flex-1 cursor-pointer">
              <div className="flex justify-between items-center">
                <span>PayPal</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 11l5-5 5 5" />
                  <path d="M7 13l5 5 5-5" />
                </svg>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Booking Summary</h3>
        <div className="border rounded-md p-4 space-y-3">
          <div className="flex justify-between">
            <span>DJ Services (4 hours)</span>
            <span>$800.00</span>
          </div>
          <div className="flex justify-between">
            <span>Equipment Setup</span>
            <span>$150.00</span>
          </div>
          <div className="flex justify-between">
            <span>Travel Fee</span>
            <span>$50.00</span>
          </div>
          <Separator />
          <div className="flex justify-between font-medium">
            <span>Subtotal</span>
            <span>$1,000.00</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Tax (8%)</span>
            <span>$80.00</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>$1,080.00</span>
          </div>
          <div className="bg-muted p-3 rounded-md text-sm">
            <p>
              <span className="font-medium">Deposit Required Today:</span>{" "}
              $270.00 (25%)
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              The remaining balance will be due 7 days before your event.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-start space-x-2">
        <div className="flex h-5 items-center">
          <input
            id="terms"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
          />
        </div>
        <div className="text-sm">
          <label htmlFor="terms" className="font-medium text-gray-900">
            I agree to the terms and conditions
          </label>
          <p className="text-muted-foreground">
            By checking this box, you agree to our{" "}
            <a href="#" className="text-primary underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary underline">
              Cancellation Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
