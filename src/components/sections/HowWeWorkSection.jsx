import React from "react";

const HowWeWorkSection = () => {
  const steps = [
    {
      emoji: "🚗",
      title: "Schedule a Pickup",
      description:
        "Select approx. quantity of the goods you are donating from below. It helps us in measuring the overall impact we create.",
    },
    {
      emoji: "📦",
      title: "Donate at your Doorstep",
      description:
        "Pack the donations nicely (washed and folded) in any carton boxes or gunny or shopping bags.",
    },
    {
      emoji: "🎁",
      title: "Get Rewards",
      description:
        "Select your preferred mode of pick up and book order. Sit back, relax and feel good.",
    },
  ];

  return (
    <section className="py-10 sm:py-12 md:py-15 px-4 sm:px-5">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading text-center mb-8 sm:mb-12">
          How we work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center p-4 sm:p-6">
              <div className="text-4xl sm:text-5xl mb-4">{step.emoji}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-heading mb-3">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base text-body leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;

