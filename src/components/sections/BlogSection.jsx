import React from "react";
import { Button } from "../ui";

const BlogSection = () => {
  const blogs = [
    {
      img: "https://www.figma.com/api/mcp/asset/3d95b9fb-324c-4695-97e2-12df7db0dc28",
      variant: "primary",
    },
    {
      img: "https://www.figma.com/api/mcp/asset/d9dd71a4-66e8-4b13-a52c-ecfea11fd82f",
      variant: "secondary",
    },
    {
      img: "https://www.figma.com/api/mcp/asset/f91d9929-e396-4d21-bc72-e7cca01968f5",
      variant: "secondary",
    },
  ];

  return (
    <section className="py-10 sm:py-12 md:py-15 px-4 sm:px-5" id="blog">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading text-center mb-8 sm:mb-12">
          Latest news & article directly from our blog
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={blog.img}
                alt="Blog"
                className="w-full h-40 sm:h-48 object-cover"
              />
              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-heading mb-2 sm:mb-3">
                  5 Eco-friendly travel products of NGO Bazaar to gear up your
                  travelling
                </h3>
                <p className="text-xs sm:text-sm text-body mb-3 sm:mb-4 leading-relaxed">
                  Travel takes us out to leave our comfort zones and see, taste,
                  and try new things.
                </p>
                <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                  <span className="px-2 sm:px-3 py-1 bg-gray-100 text-[10px] sm:text-xs font-medium text-body rounded-full">
                    Environment
                  </span>
                  <span className="px-2 sm:px-3 py-1 bg-gray-100 text-[10px] sm:text-xs font-medium text-body rounded-full">
                    Lifestyle
                  </span>
                  <span className="px-2 sm:px-3 py-1 bg-gray-100 text-[10px] sm:text-xs font-medium text-body rounded-full">
                    SustainableLifestyle
                  </span>
                </div>
                <Button variant={blog.variant} size="small" className="text-xs sm:text-sm">
                  Read more
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

