import { Metadata } from "next";
import PaymentsAndContractsPage from "@/components/payments/PaymentsAndContractsPage";

export default function PaymentsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">
        Payments & Contracts
      </h1>
      <div className="max-w-6xl mx-auto">
        <PaymentsAndContractsPage />
      </div>
    </div>
  );
}
