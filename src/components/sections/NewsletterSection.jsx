import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "../ui";

const NewsletterSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Newsletter form submitted:", data);
    reset();
    alert("Thank you for subscribing to our newsletter!");
  };

  return (
    <section className="py-10 sm:py-12 md:py-15 px-4 sm:px-5 bg-accent">
      <div className="max-w-[800px] mx-auto text-center">
        <p className="text-xs sm:text-sm font-semibold text-white/90 mb-2 uppercase tracking-wide">
          Join With Us
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8">
          Let's be a Part of us
        </h2>
        <form
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="email"
            placeholder="Enter your E-mail id"
            fullWidth
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={errors.email?.message}
          />
          <Button
            type="submit"
            variant="dark"
            size="medium"
            className="whitespace-nowrap"
          >
            Join Now
          </Button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;

