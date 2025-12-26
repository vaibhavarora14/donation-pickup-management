import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Lock } from "lucide-react";
import { TopBar, Header, Footer } from "../components/layout";
import { Button, Card } from "../components/ui";
import "./PaymentOption.css";

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
    <div className="payment-option-page">
      <TopBar />
      <Header />

      {/* Main Content */}
      <main className="main-content">
        <h1 className="page-title">Select Payment Option</h1>
        <p className="security-note">
          All transactions are secure and encrypted
        </p>

        <div className="payment-section">
          {/* Payment Methods Card */}
          <Card variant="default" padding="medium" className="payment-methods-card">
            <h3 className="card-title">Payment Methods</h3>
            <div className="payment-methods">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`payment-method ${selectedPayment === method.id ? "selected" : ""}`}
                  onClick={() => setSelectedPayment(method.id)}
                >
                  <span className="method-icon">{method.icon}</span>
                  <span className="method-name">{method.name}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Price Detail Card */}
          <Card variant="default" padding="medium" className="price-detail-card">
            <h3 className="card-title">Price Detail</h3>
            <div className="price-breakdown">
              <div className="price-row">
                <span>Total Price</span>
                <span>₹200</span>
              </div>
              <div className="price-row">
                <span>Helper Charges</span>
                <span>₹10.00</span>
              </div>
              <div className="price-row">
                <span>Total GST</span>
                <span>₹5.00</span>
              </div>
            </div>
            <div className="price-total">
              <span>Total Amount</span>
              <span>₹{total}.0</span>
            </div>
            <Button
              variant="primary"
              size="large"
              fullWidth
              onClick={handlePayment}
              disabled={!selectedPayment}
              className="payment-button"
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

