import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MapPin, ChevronDown, AlertCircle } from "lucide-react";
import { TopBar, Header, Footer } from "../components/layout";
import { Button, Select, Card, Radio } from "../components/ui";
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
      image:
        "https://www.figma.com/api/mcp/asset/7deb1127-bbda-4e28-b56f-52a84f33677c",
    },
    {
      id: "3-wheeler",
      name: "3 wheeler",
      price: "₹500",
      capacity: "2-5 Bags/Cartons",
      weight: "upto 500 Kgs",
      image:
        "https://www.figma.com/api/mcp/asset/22099832-adc1-461c-9bad-9194c7c77daa",
    },
    {
      id: "4-wheeler",
      name: "4 wheeler",
      price: "₹800",
      capacity: "5-10 Bags/Carton",
      weight: "upto 2000 Kgs",
      image:
        "https://www.figma.com/api/mcp/asset/aea107b6-25f3-4709-87b6-709c1a7710f8",
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
    const basePrice =
      pickupModes.find((m) => m.id === selectedMode)?.price || "₹200";
    const priceValue =
      parseInt(basePrice.replace(/[₹,\s-]/g, "").split(" ")[0]) || 200;
    const helperCharges = needHelper === "yes" ? 10 : 0;
    const gst = Math.round((priceValue + helperCharges) * 0.025); // 2.5% GST
    return priceValue + helperCharges + gst;
  };

  const location = useLocation();
  const { selectedItems = [] } = location.state || {};

  const handlePayment = () => {
    navigate("/payment", {
      state: {
        selectedItems,
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
      <TopBar />
      <Header />

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
            <Card
              key={mode.id}
              variant={selectedMode === mode.id ? "outlined" : "default"}
              padding="medium"
              className={`mode-card ${
                selectedMode === mode.id ? "selected" : ""
              }`}
              onClick={() => setSelectedMode(mode.id)}
            >
              {mode.image && (
                <img src={mode.image} alt={mode.name} className="mode-image" />
              )}
              <div className="mode-name">{mode.name}</div>
              <div className="mode-price">{mode.price}</div>
              <div className="mode-capacity">{mode.capacity}</div>
              <div className="mode-weight">{mode.weight}</div>
            </Card>
          ))}
        </div>

        {/* Helper and Terms Section */}
        <div className="details-section">
          <div className="details-left">
            {/* Need Helper Card */}
            <Card variant="default" padding="medium" className="detail-card">
              <h3 className="detail-card-title">Need Helper ?</h3>
              <div className="radio-group">
                <Radio
                  name="helper"
                  value="yes"
                  checked={needHelper === "yes"}
                  onChange={(e) => setNeedHelper(e.target.value)}
                  label="Yes"
                />
                <Radio
                  name="helper"
                  value="no"
                  checked={needHelper === "no"}
                  onChange={(e) => setNeedHelper(e.target.value)}
                  label="No"
                />
              </div>

              <div className="floor-selector">
                <label className="floor-label">Which Floor ?</label>
                <Select
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  options={[
                    { value: "1st", label: "1st" },
                    { value: "2nd", label: "2nd" },
                    { value: "3rd", label: "3rd" },
                    { value: "4th", label: "4th" },
                    { value: "5th+", label: "5th+" },
                  ]}
                  className="floor-select"
                />
                <p className="floor-note">
                  (Charges apply, if floor more than 1st)
                </p>
              </div>

              <div className="lift-selector">
                <label className="lift-label">Lift Available ?</label>
                <div className="radio-group">
                  <Radio
                    name="lift"
                    value="yes"
                    checked={liftAvailable === "yes"}
                    onChange={(e) => setLiftAvailable(e.target.value)}
                    label="Yes"
                  />
                  <Radio
                    name="lift"
                    value="no"
                    checked={liftAvailable === "no"}
                    onChange={(e) => setLiftAvailable(e.target.value)}
                    label="No"
                  />
                </div>
              </div>
            </Card>

            {/* Terms Card */}
            <Card variant="default" padding="medium" className="detail-card">
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
              <Button
                variant="ghost"
                size="small"
                className="show-more-btn"
                onClick={() => setShowMoreTerms(!showMoreTerms)}
              >
                Show more
                <ChevronDown
                  size={12}
                  className={showMoreTerms ? "rotated" : ""}
                />
              </Button>
            </Card>
          </div>

          {/* Price Detail Card */}
          <Card
            variant="default"
            padding="medium"
            className="price-detail-card"
          >
            <h3 className="price-title">Price Detail</h3>
            <div className="price-breakdown">
              <div className="price-row">
                <span>Total Price</span>
                <span>
                  {pickupModes.find((m) => m.id === selectedMode)?.price ||
                    "₹200"}
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
                      (
                        pickupModes.find((m) => m.id === selectedMode)?.price ||
                        "₹200"
                      )
                        .replace(/[₹,\s-]/g, "")
                        .split(" ")[0] || "200"
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
            <Button
              variant="primary"
              size="large"
              fullWidth
              onClick={handlePayment}
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

export default PickupModeSelection;
