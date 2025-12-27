import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Lock } from "lucide-react";
import { TopBar, Header, Footer } from "../components/layout";
import { Button, Card } from "../components/ui";
import { cn } from "../utils/cn";

const PaymentOption = () => {
  const location = useLocation();
  const { total = 225 } = location.state || {};

  const [selectedPayment, setSelectedPayment] = useState(null);

  const paymentMethods = [
    { id: "upi", name: "UPI", icon: "📱" },
    { id: "card", name: "Credit/Debit Card", icon: "💳" },
    { id: "netbanking", name: "Net Banking", icon: "🏦" },
    { id: "wallet", name: "Wallet", icon: "👛" },
  ];

  const handlePayment = () => {
    // Handle payment processing
    console.log("Processing payment:", selectedPayment);
    // Navigate to success page or process payment
  };

  return (
    <div className="w-full min-h-screen bg-[#f4f4f4] font-sans">
      <TopBar />
      <Header />

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-5 py-15 pb-25 text-center">
        <h1 className="text-[32px] font-medium text-black mb-5">
          Select Payment Option
        </h1>
        <p className="text-base text-body opacity-70 mb-15">
          All transactions are secure and encrypted
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1000px] mx-auto">
          {/* Payment Methods Card */}
          <Card variant="default" padding="large">
            <h3 className="text-xl font-semibold text-heading mb-8 text-left">
              Payment Methods
            </h3>
            <div className="flex flex-col gap-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={cn(
                    "flex items-center gap-4 p-5 border-2 rounded-[10px] cursor-pointer transition-all text-left",
                    selectedPayment === method.id
                      ? "border-accent bg-accent/10"
                      : "border-gray-300 hover:border-accent hover:bg-accent/5"
                  )}
                  onClick={() => setSelectedPayment(method.id)}
                >
                  <span className="text-2xl">{method.icon}</span>
                  <span className="text-base font-medium text-heading">
                    {method.name}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Price Detail Card */}
          <Card variant="default" padding="large">
            <h3 className="text-xl font-semibold text-heading mb-8 text-left">
              Price Detail
            </h3>
            <div className="mb-5">
              <div className="flex justify-between py-5 text-base border-b border-gray-300">
                <span className="text-black opacity-60">Total Price</span>
                <span className="text-heading font-medium text-right">
                  ₹200
                </span>
              </div>
              <div className="flex justify-between py-5 text-base border-b border-gray-300">
                <span className="text-black opacity-60">Helper Charges</span>
                <span className="text-heading font-medium text-right">
                  ₹10.00
                </span>
              </div>
              <div className="flex justify-between py-5 text-base border-b border-gray-300">
                <span className="text-black opacity-60">Total GST</span>
                <span className="text-heading font-medium text-right">
                  ₹5.00
                </span>
              </div>
            </div>
            <div className="flex justify-between py-5 text-base font-semibold text-heading border-t-2 border-gray-300 mb-8">
              <span>Total Amount</span>
              <span>₹{total}.0</span>
            </div>
            <Button
              variant="primary"
              size="large"
              fullWidth
              onClick={handlePayment}
              disabled={!selectedPayment}
            >
              Make payment
            </Button>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentOption;
