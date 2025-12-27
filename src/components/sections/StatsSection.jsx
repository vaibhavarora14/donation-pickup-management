import React from "react";

const StatsSection = () => {
  const stats = [
    {
      imageSrc: "/assests/icons/total-lives-impacted.svg",
      value: "013 856",
      label: "Total Lives Impacted",
      bgColor: "bg-[#D95353]",
    },
    {
      imageSrc: "/assests/icons/total-old-items-donated.svg",
      value: "013 856",
      label: "Total Old Items Donated",
      bgColor: "bg-[#FFA415]",
    },
    {
      imageSrc: "/assests/icons/total-ngos-reached.svg",
      value: "013 856",
      label: "Total NGOs Reached",
      bgColor: "bg-[#8138E7]",
    },
    {
      imageSrc: "/assests/icons/total-ngos-listed.svg",
      value: "013 856",
      label: "Total NGOs listed",
      bgColor: "bg-[#665253]",
    },
  ];

  return (
    <section className="py-10 sm:py-12 md:py-15 px-4 sm:px-5 bg-linear-to-r from-[#3AC58C] to-[#30B979]">
      <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-15">
        {stats.map((stat, index) => (
          <div key={index} className="flex ">
            <div
              className={`h-18 w-18 rounded-full flex items-center justify-center ${stat.bgColor}`}
            >
              <img
                src={stat.imageSrc}
                alt={stat.label}
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="flex flex-col pl-4">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-white/90 leading-tight">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
