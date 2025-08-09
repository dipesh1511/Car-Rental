import React from "react";
import Title from "./Title";
import { assets, dummyCarData } from "../assets/assets";
import CarCard from "./CarCard";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { ArrowRight } from "lucide-react";

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { cars } = useAppContext();

  // Mock car data to provide a visual example
  const featuredCars = [
    {
      _id: "1",
      name: "Mercedes-Benz C-Class",
      image: "https://placehold.co/400x250/F9FAFB/525252?text=Car+1",
      price: "₹5,000/day",
      location: "Mumbai",
      description: "A luxurious and comfortable sedan for city driving.",
    },
    {
      _id: "2",
      name: "Tesla Model 3",
      image: "https://placehold.co/400x250/F9FAFB/525252?text=Car+2",
      price: "₹6,500/day",
      location: "Delhi",
      description: "An electric car with long range and advanced features.",
    },
    {
      _id: "3",
      name: "Ford Mustang",
      image: "https://placehold.co/400x250/F9FAFB/525252?text=Car+3",
      price: "₹8,000/day",
      location: "Bangalore",
      description:
        "A classic muscle car with a powerful engine and iconic design.",
    },
  ];

  return (
    // The main container with a light background to match the theme
    <div className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32 bg-yellow-50 text-gray-800">
      <div className="text-center">
        {/* The Title component will use the default text colors of the parent div */}
        <Title
          title="Featured Vehicles"
          subtitle="Explore our selection of premium vehicles available for your next adventure."
        />
      </div>

      {/* The grid of car cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18 max-w-screen-xl w-full">
        {/* Using mock data for now, but you can uncomment your 'cars' prop */}
        {/* {featuredCars.slice(0, 3).map((car) => ( */}
        {cars.slice(0, 6).map((car) => (
          <div
            key={car._id}
            // The car card is now a white, rounded, elevated card
            className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            {/* The CarCard component itself may need to be updated to match the theme */}
            <CarCard car={car} />
          </div>
        ))}
      </div>

      {/* The "Explore all cars" button */}
      <button
        onClick={() => {
          navigate("/cars");
          scrollTo(0, 0);
        }}
        // The button has been restyled to match the new accent color
        className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors mt-18 cursor-pointer"
      >
        Explore all cars <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default FeaturedSection;
