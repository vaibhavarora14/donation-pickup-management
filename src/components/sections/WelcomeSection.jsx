import React from "react";

const WelcomeSection = () => {
  return (
    <section className="py-10 sm:py-12 md:py-15 px-4 sm:px-5">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-15 items-center">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="col-span-2">
              <img
                src="https://www.figma.com/api/mcp/asset/53679d0d-8540-497f-b8e3-9a51c2ca8cde"
                alt="Welcome"
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
            <div>
              <img
                src="https://www.figma.com/api/mcp/asset/6e329eac-5119-4ba9-bc3a-1bbcb86238eb"
                alt="Community"
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
            <div>
              <img
                src="https://www.figma.com/api/mcp/asset/728242de-55f9-461b-bb4c-a34d26562ac1"
                alt="People"
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
            <div className="col-span-2">
              <img
                src="https://www.figma.com/api/mcp/asset/f3b721de-d1f4-4694-a4f0-72ec324540dd"
                alt="Children"
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading mb-4">
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

