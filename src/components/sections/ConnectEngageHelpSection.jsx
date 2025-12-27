import React from "react";

const ConnectEngageHelpSection = () => {
  const cards = [
    {
      emoji: "👤",
      title: "Connect",
      description: "Search and Discover NGOs near you by location or cause",
    },
    {
      emoji: "🤝",
      title: "Engage",
      description: "Checkout the NGO's success stories, campaigns and more",
    },
    {
      emoji: "❤️",
      title: "Help",
      description: "Donate in-kind supplies the NGOs need",
    },
  ];

  return (
    <section className="py-10 sm:py-12 md:py-15 px-4 sm:px-5 bg-gray-50">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl sm:text-5xl mb-4">{card.emoji}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-heading mb-3">
                {card.title}
              </h3>
              <p className="text-sm sm:text-base text-body">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConnectEngageHelpSection;
