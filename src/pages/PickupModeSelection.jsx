import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MapPin, ChevronDown, AlertCircle } from "lucide-react";
import { TopBar, Header, Footer } from "../components/layout";
import { Button, Select, Card, Radio } from "../components/ui";
import { cn } from "../utils/cn";

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
    <div className="w-full min-h-screen bg-[#f4f4f4] font-sans">
      <TopBar />
      <Header />

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-5 py-10 pb-25">
        {/* Page Title and Location */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-medium text-black m-0">
            Please select your mode of pick up
          </h1>
          <div className="flex justify-end">
            <div className="inline-flex items-center gap-2.5 bg-call-to-action/10 border border-call-to-action/10 rounded-full px-5 py-2 cursor-pointer transition-all hover:bg-call-to-action/15 text-call-to-action">
              <MapPin size={20} />
              <span className="text-base font-medium tracking-[0.8px]">Mohali</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="bg-[#f0ecd6] opacity-50 rounded-[10px] p-4 md:p-5 flex gap-4 mb-10 items-start">
          <div className="w-[29px] h-[29px] bg-call-to-action rounded-full flex items-center justify-center text-white flex-shrink-0">
            <AlertCircle size={18} />
          </div>
          <div className="flex gap-2 flex-1">
            <span className="text-call-to-action font-semibold text-base">Note:</span>
            <span className="text-paragraph text-sm">
              We are glad to have benevolent donors like you who are
              willing/pleased to go the extra mile to help the people in need.
              Choose the number of boxes/bags and estimate your pickup *
            </span>
          </div>
        </div>

        {/* Pickup Mode Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {pickupModes.map((mode) => (
            <Card
              key={mode.id}
              variant={selectedMode === mode.id ? "outlined" : "default"}
              padding="medium"
              className={cn(
                "text-center cursor-pointer transition-all",
                selectedMode === mode.id
                  ? "border-2 border-call-to-action shadow-lg"
                  : "hover:shadow-md"
              )}
              onClick={() => setSelectedMode(mode.id)}
            >
              {mode.image && (
                <img src={mode.image} alt={mode.name} className="w-full h-32 object-contain mb-4" />
              )}
              <div className="text-xl font-semibold text-title mb-2">{mode.name}</div>
              <div className="text-2xl font-bold text-call-to-action mb-2">{mode.price}</div>
              <div className="text-sm text-paragraph mb-1">{mode.capacity}</div>
              <div className="text-sm text-paragraph">{mode.weight}</div>
            </Card>
          ))}
        </div>

        {/* Helper and Terms Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Need Helper Card */}
            <Card variant="default" padding="medium">
              <h3 className="text-xl font-semibold text-title mb-6">Need Helper ?</h3>
              <div className="flex gap-6 mb-6">
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

              <div className="mb-6">
                <label className="block text-sm font-medium text-title mb-2">Which Floor ?</label>
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
                  fullWidth
                />
                <p className="text-xs text-paragraph mt-2">
                  (Charges apply, if floor more than 1st)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-title mb-2">Lift Available ?</label>
                <div className="flex gap-6">
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
            <Card variant="default" padding="medium">
              <h3 className="text-xl font-semibold text-title mb-4">Terms and conditions*</h3>
              <p className="text-sm text-paragraph mb-4 leading-relaxed">
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
                className="text-call-to-action hover:bg-call-to-action/10"
                onClick={() => setShowMoreTerms(!showMoreTerms)}
              >
                Show more
                <ChevronDown
                  size={12}
                  className={cn("transition-transform", showMoreTerms && "rotate-180")}
                />
              </Button>
            </Card>
          </div>

          {/* Price Detail Card */}
          <Card variant="default" padding="medium" className="lg:sticky lg:top-24 h-fit">
            <h3 className="text-xl font-semibold text-title mb-6">Price Detail</h3>
            <div className="mb-6">
              <div className="flex justify-between py-5 text-base border-b border-gray-300">
                <span className="text-black opacity-60">Total Price</span>
                <span className="text-title font-medium">
                  {pickupModes.find((m) => m.id === selectedMode)?.price || "₹200"}
                </span>
              </div>
              <div className="flex justify-between py-5 text-base border-b border-gray-300">
                <span className="text-black opacity-60">Helper Charges</span>
                <span className="text-title font-medium">₹{needHelper === "yes" ? "10.00" : "0.00"}</span>
              </div>
              <div className="flex justify-between py-5 text-base border-b border-gray-300">
                <span className="text-black opacity-60">Total GST</span>
                <span className="text-title font-medium">
                  ₹
                  {Math.round(
                    (parseInt(
                      (
                        pickupModes.find((m) => m.id === selectedMode)?.price || "₹200"
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
            <div className="flex justify-between py-5 text-base font-semibold text-title border-t-2 border-gray-300 mb-6">
              <span>Total Amount</span>
              <span>₹{calculateTotal()}.0</span>
            </div>
            <Button
              variant="primary"
              size="large"
              fullWidth
              onClick={handlePayment}
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
