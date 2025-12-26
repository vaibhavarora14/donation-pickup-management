import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, ChevronDown, AlertCircle, Check } from "lucide-react";
import "./PickupModeSelection.css";

const PickupModeSelection = () => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState("2-wheeler");
  const [needHelper, setNeedHelper] = useState("no");
  const [liftAvailable, setLiftAvailable] = useState("yes");
  const [floor, setFloor] = useState("4th");
  const [showMoreTerms, setShowMoreTerms] = useState(false);

  const pickupModes = [
    {
      id: "2-wheeler",
      name: "2 wheeler",
      price: "₹200",
      capacity: "1 Bag Upto 10 kgs",
      weight: "Upto 10 kgs",
      image: "https://www.figma.com/api/mcp/asset/7deb1127-bbda-4e28-b56f-52a84f33677c",
    },
    {
      id: "3-wheeler",
      name: "3 wheeler",
      price: "₹500",
      capacity: "2-5 Bags/Cartons",
      weight: "upto 500 Kgs",
      image: "https://www.figma.com/api/mcp/asset/22099832-adc1-461c-9bad-9194c7c77daa",
    },
    {
      id: "4-wheeler",
      name: "4 wheeler",
      price: "₹800",
      capacity: "5-10 Bags/Carton",
      weight: "upto 2000 Kgs",
      image: "https://www.figma.com/api/mcp/asset/aea107b6-25f3-4709-87b6-709c1a7710f8",
    },
    {
      id: "bulk",
      name: "Bulk",
      price: "₹1200 - 3000",
      capacity: "Furniture/Large Appliances",
      weight: "> 2000 Kgs",
      image: null,
    },
  ];

  const calculateTotal = () => {
    const basePrice = pickupModes.find((m) => m.id === selectedMode)?.price || "₹200";
    const priceValue = parseInt(basePrice.replace(/[₹,\s-]/g, "").split(" ")[0]) || 200;
    const helperCharges = needHelper === "yes" ? 10 : 0;
    const gst = Math.round((priceValue + helperCharges) * 0.025); // 2.5% GST
    return priceValue + helperCharges + gst;
  };

  const handlePayment = () => {
    navigate("/payment", {
      state: {
        selectedMode,
        needHelper,
        liftAvailable,
        floor,
        total: calculateTotal(),
      },
    });
  };

  return (
    <div className="pickup-mode-page">
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
                src="https://www.figma.com/api/mcp/asset/fa2d6c8f-85b7-4e37-96b6-52220693ebf4"
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
        {/* Page Title and Location */}
        <div className="page-header">
          <h1 className="page-title">Please select your mode of pick up</h1>
          <div className="location-selector">
            <div className="location-badge">
              <MapPin size={20} />
              <span className="location-text">Mohali</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="info-note">
          <div className="note-icon">
            <AlertCircle size={18} />
          </div>
          <div className="note-content">
            <span className="note-label">Note:</span>
            <span className="note-text">
              We are glad to have benevolent donors like you who are
              willing/pleased to go the extra mile to help the people in need.
              Choose the number of boxes/bags and estimate your pickup *
            </span>
          </div>
        </div>

        {/* Pickup Mode Cards */}
        <div className="pickup-modes">
          {pickupModes.map((mode) => (
            <div
              key={mode.id}
              className={`mode-card ${selectedMode === mode.id ? "selected" : ""}`}
              onClick={() => setSelectedMode(mode.id)}
            >
              {mode.image && (
                <img src={mode.image} alt={mode.name} className="mode-image" />
              )}
              <div className="mode-name">{mode.name}</div>
              <div className="mode-price">{mode.price}</div>
              <div className="mode-capacity">{mode.capacity}</div>
              <div className="mode-weight">{mode.weight}</div>
            </div>
          ))}
        </div>

        {/* Helper and Terms Section */}
        <div className="details-section">
          <div className="details-left">
            {/* Need Helper Card */}
            <div className="detail-card">
              <h3 className="detail-card-title">Need Helper ?</h3>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="helper"
                    value="yes"
                    checked={needHelper === "yes"}
                    onChange={(e) => setNeedHelper(e.target.value)}
                  />
                  <span>Yes</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="helper"
                    value="no"
                    checked={needHelper === "no"}
                    onChange={(e) => setNeedHelper(e.target.value)}
                  />
                  <span>No</span>
                </label>
              </div>

              <div className="floor-selector">
                <label className="floor-label">Which Floor ?</label>
                <div className="floor-input-wrapper">
                  <select
                    className="floor-select"
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                  >
                    <option value="1st">1st</option>
                    <option value="2nd">2nd</option>
                    <option value="3rd">3rd</option>
                    <option value="4th">4th</option>
                    <option value="5th+">5th+</option>
                  </select>
                  <ChevronDown size={16} className="floor-dropdown-icon" />
                </div>
                <p className="floor-note">
                  (Charges apply, if floor more than 1st)
                </p>
              </div>

              <div className="lift-selector">
                <label className="lift-label">Lift Available ?</label>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="lift"
                      value="yes"
                      checked={liftAvailable === "yes"}
                      onChange={(e) => setLiftAvailable(e.target.value)}
                    />
                    <span>Yes</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="lift"
                      value="no"
                      checked={liftAvailable === "no"}
                      onChange={(e) => setLiftAvailable(e.target.value)}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Terms Card */}
            <div className="detail-card">
              <h3 className="detail-card-title">Terms and conditions*</h3>
              <p className="terms-text">
                <strong>Lorem ipsum dolor sit amet</strong>, consectetur
                adipiscing elit. Duis lacinia urna sit amet sapien suscipit, in
                consectetur neque sodales. Phasellus scelerisque finibus tempor.
                Vestibulum viverra pharetra finibus. Suspendisse potenti. Orci
                varius natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus.
                {showMoreTerms && (
                  <>
                    {" "}
                    Nullam quis felis ut elit accumsan sollicitudin. Vivamus id
                    pulvinar risus, sit amet mollis mauris. Nulla eget arcu
                    libero.
                  </>
                )}
              </p>
              <button
                className="show-more-btn"
                onClick={() => setShowMoreTerms(!showMoreTerms)}
              >
                Show more
                <ChevronDown
                  size={12}
                  className={showMoreTerms ? "rotated" : ""}
                />
              </button>
            </div>
          </div>

          {/* Price Detail Card */}
          <div className="price-detail-card">
            <h3 className="price-title">Price Detail</h3>
            <div className="price-breakdown">
              <div className="price-row">
                <span>Total Price</span>
                <span>
                  {pickupModes.find((m) => m.id === selectedMode)?.price || "₹200"}
                </span>
              </div>
              <div className="price-row">
                <span>Helper Charges</span>
                <span>₹{needHelper === "yes" ? "10.00" : "0.00"}</span>
              </div>
              <div className="price-row">
                <span>Total GST</span>
                <span>
                  ₹
                  {Math.round(
                    (parseInt(
                      (pickupModes.find((m) => m.id === selectedMode)?.price || "₹200").replace(
                        /[₹,\s-]/g,
                        ""
                      ).split(" ")[0] || "200"
                    ) +
                      (needHelper === "yes" ? 10 : 0)) *
                      0.025
                  ).toFixed(2)}
                </span>
              </div>
            </div>
            <div className="price-total">
              <span>Total Amount</span>
              <span>₹{calculateTotal()}.0</span>
            </div>
            <button className="payment-button" onClick={handlePayment}>
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
              src="https://www.figma.com/api/mcp/asset/21301931-e131-4189-8008-2ee6bb05015c"
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

export default PickupModeSelection;

