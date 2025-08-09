import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import { Star } from "lucide-react";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Ritu Panwar",
      location: "Civil Lines, Prayagraj",
      image: assets.testimonial_image_1,
      testimonial:
        "I've rented cars from various companies, but the experience with CarRental was exceptional. The whole process was seamless.",
      rating: 5,
    },
    {
      name: "Anshi Rathore",
      location: "Delhi",
      image: assets.testimonial_image_2,
      rating: 4,
      testimonial:
        "I’m truly impressed by the quality and consistency. The entire process was smooth, and the results exceeded all expectations. Thank you!",
    },
    {
      name: "Harshita Singh",
      location: "Mumbai",
      image: assets.testimonial_image_1,
      testimonial:
        "I've rented cars from various companies, but the experience with CarRental was exceptional. I will definitely be a returning customer.",
      rating: 5,
    },
  ];

  return (
    // The main container with a light background to match the theme
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44 bg-yellow-50">
      <div className="text-center mb-10">
        <Title
          title="What Our Customers Say"
          subtitle="Discover why discerning travelers choose our service for their car rental needs."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
        {testimonials.map((testimonial, index) => (
          // The testimonial card has been restyled
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full object-cover border-2 border-orange-300"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="text-xl font-semibold text-gray-900">
                  {testimonial.name}
                </p>
                <p className="text-gray-500">{testimonial.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 mt-4">
              {/* Star icons from lucide-react are now used */}
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={i < testimonial.rating ? "currentColor" : "none"}
                    className={
                      i < testimonial.rating
                        ? "text-orange-400"
                        : "text-gray-300"
                    }
                  />
                ))}
            </div>
            <p className="text-gray-600 mt-4 font-light italic">
              "{testimonial.testimonial}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
