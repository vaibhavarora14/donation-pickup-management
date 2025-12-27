import React from "react";

const StatsSection = () => {
  const stats = [
    {
      emoji: "👥",
      value: "013 856",
      label: "Total Lives Impacted",
    },
    {
      emoji: "🎁",
      value: "013 856",
      label: "Total Old Items Donated",
    },
    {
      emoji: "🏢",
      value: "013 856",
      label: "Total NGOs Reached",
    },
    {
      emoji: "📋",
      value: "013 856",
      label: "Total NGOs listed",
    },
  ];

  return (
    <section className="py-10 sm:py-12 md:py-15 px-4 sm:px-5 bg-white">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-15">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl sm:text-4xl mb-2">{stat.emoji}</div>
            <div className="text-2xl sm:text-3xl font-bold text-accent mb-2">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm text-body leading-tight">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;

