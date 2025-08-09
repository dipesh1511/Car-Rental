import React from "react";
// We've replaced image-based icons with modern, vector-based icons
// from lucide-react for a cleaner, more consistent look.
import { useNavigate } from "react-router-dom";
import { Users, Fuel, Car, MapPin } from "lucide-react";

const CarCard = ({ car }) => {
  // Assuming the currency is set via environment variables.
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/car-details/${car._id}`);
        scrollTo(0, 0);
      }}
      // Refined styling for a warmer, more compact feel
      className="group rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer bg-white"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={car.image}
          alt="Car"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {car.isAvailable && (
          // The "Available Now" badge uses the new accent color
          <p className="absolute top-3 left-3 bg-orange-500/90 text-white text-xs px-2 py-1 rounded-full font-semibold">
            Available Now
          </p>
        )}

        {/* The price tag is now styled to match the dark text of the theme */}
        <div className="absolute bottom-3 right-3 bg-gray-800/80 backdrop-blur-sm text-white px-2.5 py-1.5 rounded-lg text-sm">
          <span className="font-semibold">
            {currency}
            {car.pricePerDay}
          </span>
          <span className="text-xs text-white/80"> / day</span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-base font-semibold text-gray-800">
              {car.brand} {car.model}
            </h3>
            <p className="text-gray-500 text-xs">
              {car.category} &bull; {car.year}
            </p>
          </div>
        </div>

        {/* The details grid is more compact with smaller icons and text */}
        <div className="mt-4 grid grid-cols-2 gap-y-2 text-gray-600">
          <div className="flex items-center text-xs text-gray-600">
            <Users size={14} className="text-orange-400 mr-2" />
            <span>{car.seating_capacity} Seats</span>
          </div>

          <div className="flex items-center text-xs text-gray-600">
            <Fuel size={14} className="text-orange-400 mr-2" />
            <span>{car.fuel_type}</span>
          </div>

          <div className="flex items-center text-xs text-gray-600">
            <Car size={14} className="text-orange-400 mr-2" />
            <span>{car.transmission}</span>
          </div>

          <div className="flex items-center text-xs text-gray-600">
            <MapPin size={14} className="text-orange-400 mr-2" />
            <span>{car.location} </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
