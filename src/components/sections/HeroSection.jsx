import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
      <img
        src="/assests/images/hero-banner.jpg"
        alt="Hero"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-br from-accent/20 to-accent/5"></div>
      <div className="absolute z-10 text-center px-4 sm:px-5 max-w-4xl mx-auto text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-heading mb-6 sm:mb-8 leading-tight">
          Fulfilled Souls. <br /> Happiness Delivered.
        </h1>
        <Link to="/book-donation">
          <Button
            variant="primary"
            size="large"
            className="text-sm sm:text-base rounded-full"
          >
            Book Donation pick-up
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
