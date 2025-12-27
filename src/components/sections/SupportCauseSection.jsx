import React from "react";

const SupportCauseSection = () => {
  const causes = [
    {
      img: "https://www.figma.com/api/mcp/asset/f668d40b-1b1c-491b-9e04-09e8bd2907d6",
      alt: "Support",
      overlayClass: "bg-green-500/20 group-hover:bg-green-500/30",
    },
    {
      img: "https://www.figma.com/api/mcp/asset/8945fa60-8acd-43dd-a8de-840c4cbd8b4e",
      alt: "Support",
      overlayClass: "bg-bg-dark/20 group-hover:bg-bg-dark/30",
    },
    {
      img: "https://www.figma.com/api/mcp/asset/e516ac97-8366-4270-a88c-1f190a945f51",
      alt: "Support",
      overlayClass: "bg-accent/20 group-hover:bg-accent/30",
    },
  ];

  return (
    <section className="py-10 sm:py-12 md:py-15 px-4 sm:px-5">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading text-center mb-3 sm:mb-4">
          Support a cause close to your heart
        </h2>
        <p className="text-base sm:text-lg text-body text-center mb-8 sm:mb-12 px-4">
          A one stop platform for directly supporting grassroots NGOs
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {causes.map((cause, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden group cursor-pointer"
            >
              <img
                src={cause.img}
                alt={cause.alt}
                className="w-full h-48 sm:h-64 object-cover"
              />
              <div
                className={`absolute inset-0 ${cause.overlayClass} transition-colors`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportCauseSection;
