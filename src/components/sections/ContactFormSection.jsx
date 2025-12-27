import React from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, MessageSquare } from "lucide-react";
import { Button, Input, Textarea } from "../ui";

const ContactFormSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Contact form submitted:", data);
    reset();
    alert("Thank you for your message! We will get back to you soon.");
  };

  return (
    <section className="py-10 sm:py-12 md:py-15 px-4 sm:px-5 bg-gray-50" id="contact">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading mb-6 sm:mb-8">
              Be a part of our story
            </h2>
            <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <Input
                type="text"
                placeholder="Name"
                icon={<User size={20} />}
                fullWidth
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Name can only contain letters and spaces",
                  },
                })}
                error={errors.name?.message}
              />
              <Input
                type="email"
                placeholder="Email"
                icon={<Mail size={20} />}
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
              <Input
                type="tel"
                placeholder="Contact no."
                icon={<Phone size={20} />}
                fullWidth
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits",
                  },
                })}
                error={errors.phone?.message}
              />
              <Textarea
                placeholder="Message"
                icon={<MessageSquare size={20} />}
                fullWidth
                rows={5}
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 10,
                    message: "Message must be at least 10 characters",
                  },
                  maxLength: {
                    value: 500,
                    message: "Message cannot exceed 500 characters",
                  },
                })}
                error={errors.message?.message}
              />
              <Button type="submit" variant="dark" size="medium" fullWidth>
                Send message
              </Button>
            </form>
          </div>
          <div className="relative rounded-lg overflow-hidden h-[300px] sm:h-[400px] lg:h-full">
            <img
              src="https://www.figma.com/api/mcp/asset/fbf2132c-75e6-4cd2-ac2c-582fa4e423d5"
              alt="Contact"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
                Join us in our mission
              </h3>
              <p className="text-sm sm:text-base leading-relaxed">
                We're always looking for great folks to join us on our mission.
                If you want to be a part of our story, we'd love to chat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;

