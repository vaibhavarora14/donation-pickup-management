import React from "react";

const WelcomeSection = () => {
  return (
    <section className="py-10 sm:py-12 md:py-15 px-4 sm:px-5">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-15 items-center">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">{/** Images */}</div>
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-heading mb-4">
              Welcome to HappieeSouls!
            </h2>
            <p className="text-base sm:text-lg text-body mb-4 font-medium">
              We envision to build a conscious global community of happy souls
              who believe in sustainability and support grassroot NGOs in India.
            </p>
            <p className="text-sm sm:text-base text-body leading-relaxed">
              We are on a mission to support grassroots NGOs that support
              sustainability by donating old goods in usable condition to them
              or selling upcycled, recycled or handmade products developed by
              the beneficiaries at these NGOs. It is to make "giving" a practice
              and "Happiness" a culture.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
