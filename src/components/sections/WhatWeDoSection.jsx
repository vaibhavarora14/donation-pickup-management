import { Check } from "lucide-react";
import React from "react";

const features = [
  "A one stop platform for directly supporting grassroots NGOs",
  "Book doorstep donation pick up services",
  "First ever transparent solution that keeps you updated on the impact you creating",
  "Support a cause close to your heart",
];

const WhatWeDoSection = () => {
  return (
    <section
      className="py-10 sm:py-12 md:py-15 px-4 sm:px-5 bg-[#F1F7F7]"
      id="how-it-works"
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-center">
        <div className="flex flex-col">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-heading mb-6 sm:mb-8">
            What we do?
          </h2>
          <ul>
            {features.map((feature, index) => (
              <li
                key={index}
                className="text-base sm:text-lg text-body flex items-center gap-2"
              >
                <span className="text-primary bg-primary/10 rounded-full w-5 h-5 flex items-center justify-center">
                  <Check className="w-2 h-2 " />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img
            src="/assests/images/what-we-do.png"
            alt="What we do"
            className="w-full rounded-[52px] h-[520px]"
          />
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
