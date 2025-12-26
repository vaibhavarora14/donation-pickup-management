import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Lock } from "lucide-react";
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
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-content">
          <div className="top-bar-left">
            <span className="top-bar-icon">📞</span>
            <span className="top-bar-text">+91 96067 49381</span>
            <span className="top-bar-icon">✉️</span>
            <span className="top-bar-text">hello@happieesouls.com</span>
          </div>
          <div className="top-bar-right">
            <button className="top-bar-login">Login</button>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <Link to="/">
              <img
                src="https://www.figma.com/api/mcp/asset/ba72bfaf-40be-4f92-84a6-6837ff297755"
                alt="Logo"
                className="logo-img"
              />
            </Link>
          </div>
          <nav className="nav-menu">
            <Link to="/" className="nav-link active">
              Home
            </Link>
            <Link to="/#how-it-works" className="nav-link">
              How it works
            </Link>
            <Link to="/#blog" className="nav-link">
              Blog
            </Link>
            <Link to="/#contact" className="nav-link">
              Contact Us
            </Link>
          </nav>
          <div className="header-actions">
            <div className="happiee-box">
              <span>
                Happiee
                <br />
                Box
              </span>
              <div className="heart-icon">❤️</div>
              <span className="badge">0</span>
            </div>
            <button className="ngo-login-btn">Ngo Login</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <h1 className="page-title">Select Payment Option</h1>
        <p className="security-note">
          All transactions are secure and encrypted
        </p>

        <div className="payment-section">
          {/* Payment Methods Card */}
          <div className="payment-methods-card">
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
          </div>

          {/* Price Detail Card */}
          <div className="price-detail-card">
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
            <button
              className="payment-button"
              onClick={handlePayment}
              disabled={!selectedPayment}
            >
              Make payment
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <img
              src="https://www.figma.com/api/mcp/asset/1f027dd6-cede-4bf2-b419-9f9b127c8a6d"
              alt="Logo"
              className="footer-logo"
            />
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Usefull Link</h4>
            <ul className="footer-links">
              <li>
                <Link to="/#about">About us</Link>
              </li>
              <li>
                <Link to="/#how-it-works">How can you help?</Link>
              </li>
              <li>
                <Link to="/#contact">Contact us</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Information for</h4>
            <ul className="footer-links">
              <li>
                <a href="#ngos">NGOs</a>
              </li>
              <li>
                <a href="#individuals">Individuals</a>
              </li>
              <li>
                <a href="#corporates">Corporates</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">How to Help</h4>
            <ul className="footer-links">
              <li>
                <a href="#donate">Donate</a>
              </li>
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="#pricing">Pricing Policy</a>
              </li>
              <li>
                <a href="#terms">Terms of Service</a>
              </li>
              <li>
                <a href="#cancellation">Cancellation & Refund Policy</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 happieesouls. All Rights Reseved</p>
        </div>
      </footer>
    </div>
  );
};

export default PaymentOption;

