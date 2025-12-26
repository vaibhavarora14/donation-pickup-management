import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ChevronDown, Check } from "lucide-react";
import { TopBar, Header, Footer } from "../components/layout";
import { Button, Select, Card } from "../components/ui";
import "./BookDonationPickup.css";

const BookDonationPickup = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Category data structure
  const categories = [
    {
      id: "books",
      name: "Books",
      icon: "https://www.figma.com/api/mcp/asset/362c4c7e-75d5-44d6-a2bb-fd69b4de3b2a",
      items: [
        { id: "school-books", name: "School books (1-10th std)" },
        {
          id: "higher-studies-books",
          name: "Higher studies books ( 11 and above)",
        },
      ],
    },
    {
      id: "electrical",
      name: "Electrical Items",
      icon: "https://www.figma.com/api/mcp/asset/caff4f7f-264e-4d07-9281-5e7c390191c1",
      items: [
        { id: "washing-machine", name: "Washing Machine" },
        { id: "gas-stove", name: "Gas Stove" },
        { id: "microwave-oven", name: "Microwave Oven" },
        { id: "mixer-grinder", name: "Mixer Grinder" },
        { id: "water-purifier", name: "Water Purifier" },
        { id: "table-fan", name: "Table Fan" },
        { id: "dining-table", name: "Dining Table" },
      ],
    },
    {
      id: "furniture",
      name: "Furniture",
      icon: "https://www.figma.com/api/mcp/asset/e8934c77-dab1-47bc-9cd1-998af8c34da2",
      items: [
        { id: "dining-table-furniture", name: "Dining Table" },
        { id: "bookshelf", name: "Bookshelf (3x3x3)" },
        { id: "almirah", name: "Almirah" },
        { id: "center-table", name: "Center Table" },
        { id: "chair", name: "Chair" },
        { id: "dressing-table", name: "Dressing Table" },
        { id: "large-showcase", name: "Large Showcase / Bookshelf" },
        { id: "shoe-rack", name: "Shoe Rack" },
        { id: "side-table", name: "Side Table" },
        { id: "single-double-cot", name: "Single Or Double Cot" },
        { id: "two-door-wardrobe", name: "Two-Door Wardrobe" },
        { id: "study-table", name: "Study Table" },
      ],
    },
    {
      id: "home-appliances",
      name: "Home appliances",
      icon: "https://www.figma.com/api/mcp/asset/de9e804f-d096-47d5-908a-cb160ab615fb",
      items: [
        { id: "washing-machine-appliance", name: "Washing Machine" },
        { id: "gas-stove-appliance", name: "Gas Stove" },
        { id: "microwave-oven-appliance", name: "Microwave Oven" },
        { id: "mixer-grinder-appliance", name: "Mixer Grinder" },
        { id: "water-purifier-appliance", name: "Water Purifier" },
        { id: "table-fan-appliance", name: "Table Fan" },
        { id: "dining-table-appliance", name: "Dining Table" },
      ],
    },
    {
      id: "sports",
      name: "Sports/ Co-curriculum",
      icon: "https://www.figma.com/api/mcp/asset/e528ddaa-24e0-40d6-842d-549664daeeb3",
      items: [
        { id: "basketball-football-bat", name: "Basketball/Football/ Bat" },
      ],
    },
    {
      id: "health",
      name: "Health",
      icon: "https://www.figma.com/api/mcp/asset/951f23e7-6d92-4d25-a9c6-29f44735b44b",
      items: [
        { id: "treadmill", name: "Tread Mill" },
        { id: "wheelchair", name: "Wheel Chair" },
      ],
    },
    {
      id: "kitchen",
      name: "Kitchen",
      icon: "https://www.figma.com/api/mcp/asset/55da3c5f-bfcf-4bb4-816d-a30f65fbb31e",
      items: [
        { id: "utensils", name: "Utensils" },
        { id: "storage", name: "Storage" },
        { id: "cooking", name: "Cooking" },
      ],
    },
  ];

  const toggleItem = (itemId) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const handleProceed = () => {
    const itemsArray = Array.from(selectedItems);
    navigate("/pickup-mode", { state: { selectedItems: itemsArray } });
  };

  const filteredCategories =
    selectedCategory === "all"
      ? categories
      : categories.filter((cat) => cat.id === selectedCategory);

  const categoryOptions = [
    { value: "all", label: "Category" },
    ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
  ];

  return (
    <div className="book-donation-page">
      <TopBar />
      <Header />

      <main className="main-content">
        {/* Location Selector */}
        <div className="location-selector">
          <div className="location-badge">
            <MapPin size={20} />
            <span className="location-text">Mohali</span>
            <ChevronDown size={16} />
          </div>
        </div>

        {/* Page Title */}
        <h1 className="page-title">PICK YOUR DONATION ITEMS</h1>

        {/* Category Filter */}
        <div className="category-filter">
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            options={categoryOptions}
            fullWidth={false}
            className="category-select"
          />
        </div>

        {/* Category Sections */}
        <div className="categories-container">
          {filteredCategories.map((category) => (
            <Card
              key={category.id}
              variant="default"
              padding="medium"
              className="category-section"
            >
              <div className="category-header">
                <img
                  src={category.icon}
                  alt={category.name}
                  className="category-icon-img"
                />
                <h2 className="category-title">{category.name}</h2>
              </div>
              <div className="category-items-container">
                <div className="category-items">
                  {category.items.map((item) => {
                    const isSelected = selectedItems.has(item.id);
                    return (
                      <button
                        key={item.id}
                        className={`item-tag ${isSelected ? "selected" : ""}`}
                        onClick={() => toggleItem(item.id)}
                      >
                        {isSelected && (
                          <Check size={18} className="check-icon" />
                        )}
                        <span>{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Proceed Button */}
        <div className="proceed-container">
          <Button
            variant="primary"
            size="large"
            fullWidth={false}
            onClick={handleProceed}
            disabled={selectedItems.size === 0}
            className="proceed-button"
          >
            Proceed
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookDonationPickup;
