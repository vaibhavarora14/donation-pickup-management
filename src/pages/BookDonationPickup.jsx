import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ChevronDown, Check } from "lucide-react";
import { TopBar, Header, Footer } from "../components/layout";
import { Button, Select, Card } from "../components/ui";
import { supabase } from "../supabaseClient";
import { ORGANIZATION_ID } from "../config";
import { cn } from "../utils/cn";

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
    <div className="w-full min-h-screen bg-[#f4f4f4] font-sans">
      <TopBar />
      <Header />

      <main className="max-w-[1440px] mx-auto px-5 py-10">
        {/* Location Selector */}
        <div className="flex justify-end mb-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 cursor-pointer hover:border-accent transition-colors">
            <MapPin size={20} className="text-accent" />
            <span className="text-sm font-medium text-heading">Mohali</span>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-black text-center mb-8 uppercase tracking-wide">
          PICK YOUR DONATION ITEMS
        </h1>

        {/* Category Filter */}
        <div className="flex justify-center mb-10">
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            options={categoryOptions}
            fullWidth={false}
          />
        </div>

        {/* Category Sections */}
        {loading ? (
          <div className="text-center py-10">
            <p className="text-body">Loading categories...</p>
          </div>
        ) : (
          <div className="space-y-6 mb-10">
            {filteredCategories.map((category) => (
              <Card
                key={category.id}
                variant="default"
                padding="medium"
              >
                <div className="flex items-center gap-4 mb-6">
                  {category.icon && (
                    <img
                      src={category.icon}
                      alt={category.name}
                      className="w-12 h-12 object-contain"
                    />
                  )}
                  <h2 className="text-2xl font-semibold text-heading">{category.name}</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {category.items.map((item) => {
                    const isSelected = selectedItems.has(item.id);
                    return (
                      <button
                        key={item.id}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all",
                          isSelected
                            ? "bg-accent text-white border-accent"
                            : "bg-white text-heading border-gray-300 hover:border-accent"
                        )}
                        onClick={() => toggleItem(item.id)}
                      >
                        {isSelected && (
                          <Check size={18} className="text-white" />
                        )}
                        <span className="text-sm font-medium">{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Proceed Button */}
        <div className="flex justify-center mb-10">
          <Button
            variant="primary"
            size="large"
            fullWidth={false}
            onClick={handleProceed}
            disabled={selectedItems.size === 0}
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
