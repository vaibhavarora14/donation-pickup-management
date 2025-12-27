import React from "react";

const WhatWeDoSection = () => {
  return (
    <section className="py-10 sm:py-12 md:py-15 px-4 sm:px-5 bg-gray-50" id="how-it-works">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading mb-6 sm:mb-8">
            What we do?
          </h2>
          <div className="max-w-2xl mx-auto">
            <img
              src="https://www.figma.com/api/mcp/asset/aa1c45fd-4d2f-4ba4-a699-0f4a6bc8182d"
              alt="What we do"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;

