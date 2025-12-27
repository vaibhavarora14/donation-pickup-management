import React from "react";

const CorporatePartnersSection = () => {
  const partners = [
    "https://www.figma.com/api/mcp/asset/431545f2-ac4a-4d8b-888d-b35d75f98e69",
    "https://www.figma.com/api/mcp/asset/cffaae46-8838-49e4-8db7-c88ae7cda542",
    "https://www.figma.com/api/mcp/asset/deef771f-7879-4e5b-b4a4-bcdfdc4cadfb",
    "https://www.figma.com/api/mcp/asset/d670f110-198b-4147-8a79-494eea9bf30d",
    "https://www.figma.com/api/mcp/asset/08b8a275-5fbf-4808-a06e-38f5b495d453",
  ];

  return (
    <section className="py-10 sm:py-12 md:py-15 px-4 sm:px-5">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading text-center mb-8 sm:mb-12">
          Our Corporate Partners
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 items-center justify-items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-3 sm:p-4"
            >
              <img
                src={partner}
                alt="Partner"
                className="max-w-full h-auto max-h-12 sm:max-h-16 object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CorporatePartnersSection;
