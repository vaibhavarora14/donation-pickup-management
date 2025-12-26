import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ChevronDown, Check } from "lucide-react";
import { TopBar, Header, Footer } from "../components/layout";
import { Button, Select, Card } from "../components/ui";
import { supabase } from "../supabaseClient";
import { ORGANIZATION_ID } from "../config";
import "./BookDonationPickup.css";

const BookDonationPickup = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from existing API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from("item_categories")
          .select(
            `
            id,
            label, 
            value, 
            icon,
            item_subcategories (
              label,
              value
            )
          `
          )
          .eq("organization_id", ORGANIZATION_ID)
          .order("label");

        if (error) {
          console.error("Error fetching categories:", error);
        } else {
          if (data && data.length > 0) {
            // Transform API data to match component structure
            // Note: If icon is already a full URL, use it; otherwise use fallback
            const iconMap = {
              book: "https://www.figma.com/api/mcp/asset/362c4c7e-75d5-44d6-a2bb-fd69b4de3b2a",
              plug: "https://www.figma.com/api/mcp/asset/caff4f7f-264e-4d07-9281-5e7c390191c1",
              sofa: "https://www.figma.com/api/mcp/asset/e8934c77-dab1-47bc-9cd1-998af8c34da2",
              home: "https://www.figma.com/api/mcp/asset/de9e804f-d096-47d5-908a-cb160ab615fb",
              medal:
                "https://www.figma.com/api/mcp/asset/e528ddaa-24e0-40d6-842d-549664daeeb3",
              "heart-pulse":
                "https://www.figma.com/api/mcp/asset/951f23e7-6d92-4d25-a9c6-29f44735b44b",
              utensils:
                "https://www.figma.com/api/mcp/asset/55da3c5f-bfcf-4bb4-816d-a30f65fbb31e",
            };

            const transformedCategories = data.map((cat) => ({
              id: cat.value,
              name: cat.label,
              icon:
                cat.icon && iconMap[cat.icon]
                  ? iconMap[cat.icon]
                  : cat.icon && cat.icon.startsWith("http")
                  ? cat.icon
                  : null,
              items:
                cat.item_subcategories?.map((sub) => ({
                  id: sub.value,
                  name: sub.label,
                })) || [],
            }));
            setCategories(transformedCategories);
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

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
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <p>Loading categories...</p>
          </div>
        ) : (
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
        )}

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
