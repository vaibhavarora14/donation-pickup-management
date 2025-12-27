import React from "react";

const BrandCollaborationsSection = () => {
  const brands = ["Shoes", "Stationery", "Bags", "Clothes", "Clothes"];

  return (
    <section className="py-10 sm:py-12 md:py-15 px-4 sm:px-5 bg-gray-50">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading text-center mb-3 sm:mb-4">
          OUR BRAND COLLABORATIONS
        </h2>
        <p className="text-sm sm:text-base text-body text-center mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
          Our brand partners provide our donors gifts* as a "gesture of thanks"
          for making a difference.
          <br />
          Be ready to get surprised!
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
          {brands.map((name, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-3 sm:p-4 bg-white rounded-lg shadow-sm"
            >
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-200 rounded-lg mb-2 sm:mb-3"></div>
              <p className="text-xs sm:text-sm font-medium text-heading text-center">
                {name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCollaborationsSection;
