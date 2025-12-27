import React from "react";
import { Button } from "../ui";

const TestimonialsSection = () => {
  return (
    <section className="py-10 sm:py-12 md:py-15 px-4 sm:px-5 bg-gray-50">
      <div className="max-w-[1440px] mx-auto">
        <p className="text-xs sm:text-sm font-semibold text-accent text-center mb-2 uppercase tracking-wide">
          Testimonials
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading text-center mb-8 sm:mb-12">
          What they're talking
          <br />
          About Us
        </h2>
        <div className="max-w-3xl mx-auto bg-white rounded-lg p-6 sm:p-8 md:p-12 shadow-lg">
          <p className="text-sm sm:text-base text-body leading-relaxed mb-6 sm:mb-8">
            Happiee Souls is a miracle that I was searching for.
            <br />
            <br />I am a book lover who is quite possessive about my books.
            There is hardly a book I've thrown away and this whole bundle has
            moved homes along with us. My mum's house and mine had a cupboard
            full of books and clothes that were waiting to be
          </p>
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <img
              src="https://www.figma.com/api/mcp/asset/25b8cf9e-b79f-4257-b23b-3ee1570877bd"
              alt="Author"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
            />
            <div>
              <p className="text-base sm:text-lg font-semibold text-heading">
                Shalini Jain
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <Button
              variant="ghost"
              size="small"
              className="text-xl sm:text-2xl"
            >
              ←
            </Button>
            <div className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              <span className="w-2 h-2 rounded-full bg-gray-300"></span>
            </div>
            <Button
              variant="ghost"
              size="small"
              className="text-xl sm:text-2xl"
            >
              →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
