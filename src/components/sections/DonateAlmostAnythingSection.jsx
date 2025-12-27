import React from "react";

const DonateAlmostAnythingSection = () => {
  const items = [
    {
      img: "https://www.figma.com/api/mcp/asset/5fe5138b-51e9-4c94-8108-dd7b7fbb544e",
      alt: "Shoes",
      label: "Shoes",
    },
    {
      img: "https://www.figma.com/api/mcp/asset/785b8423-81e6-4a1a-b623-16ac84c180e4",
      alt: "Stationery",
      label: "Stationery",
    },
    {
      img: "https://www.figma.com/api/mcp/asset/2500176e-73bc-4fda-bc97-2d8ec9e9b3ca",
      alt: "Bags",
      label: "Bags",
    },
    {
      img: "https://www.figma.com/api/mcp/asset/a2a5b27c-6acc-49df-9df7-6f2ff70011d4",
      alt: "Clothes",
      label: "Clothes",
    },
    {
      img: "https://www.figma.com/api/mcp/asset/a2a5b27c-6acc-49df-9df7-6f2ff70011d4",
      alt: "Clothes",
      label: "Clothes",
    },
    {
      img: "https://www.figma.com/api/mcp/asset/4024dbd0-6b92-455e-9e73-247a668975b6",
      alt: "More",
      label: "More Donation",
      subLabel: "VIEW MORE",
      isMore: true,
    },
  ];

  return (
    <section className="py-10 sm:py-12 md:py-15 px-4 sm:px-5 bg-gray-50">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading mb-3 sm:mb-4">
            Donate Almost Anything
          </h2>
          <p className="text-sm sm:text-base text-body max-w-2xl mx-auto px-4">
            Select approx. quantity of the goods you are donating from below.
            It helps us in measuring the overall impact we create.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                item.isMore ? "relative" : ""
              }`}
            >
              <img
                src={item.img}
                alt={item.alt}
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain mb-2 sm:mb-3"
              />
              <span className="text-xs sm:text-sm font-medium text-heading mb-1 text-center">
                {item.label}
              </span>
              {item.subLabel && (
                <span className="text-[10px] sm:text-xs font-bold text-accent uppercase">
                  {item.subLabel}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonateAlmostAnythingSection;

