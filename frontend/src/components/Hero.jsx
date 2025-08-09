import React, { useState, createContext, useContext } from "react";
// The original imports below caused an error because the files were not found.
// To fix this, we will define mock data and context within this single file.
import { assets, cityList } from "../assets/assets";
import { AppProvider, useAppContext } from "../context/AppContext";
import { Search, MapPin, CalendarDays } from "lucide-react";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");

  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } =
    useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      "/cars?pickupLocation=" +
        pickupLocation +
        "&pickupDate=" +
        pickupDate +
        "&returnDate=" +
        returnDate
    );
  };

  return (
    // The main container with a warm, soft background
    <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-4 bg-yellow-50 text-gray-800">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          Your Next Adventure Awaits
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Find and book the perfect car for your journey with ease.
        </p>
      </div>

      {/* The search form is now smaller, both in width and height */}
      <form
        onSubmit={handleSearch}
        className="bg-white p-3 md:p-4 rounded-3xl shadow-lg border border-gray-100 max-w-3xl mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-2 items-end"
      >
        {/* Pickup Location Dropdown */}
        <div className="col-span-1 md:col-span-2">
          <label
            htmlFor="location"
            className="block text-xs font-medium text-gray-500 mb-1"
          >
            Pick-up Location
          </label>
          <div className="relative">
            <MapPin
              className="absolute left-2 top-1/2 -translate-y-1/2 text-orange-400"
              size={14}
            />
            <select
              id="location"
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full pl-7 pr-2 py-1.5 bg-white border border-gray-300 rounded-xl text-xs text-gray-700 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all duration-300"
            >
              <option value="">Select Location</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pickup Date Input */}
        <div>
          <label
            htmlFor="pickup-date"
            className="block text-xs font-medium text-gray-500 mb-1"
          >
            Pick-up Date
          </label>
          <div className="relative">
            <CalendarDays
              className="absolute left-2 top-1/2 -translate-y-1/2 text-orange-400"
              size={14}
            />
            <input
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              type="date"
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
              className="w-full pl-7 pr-2 py-1.5 bg-white border border-gray-300 rounded-xl text-xs text-gray-700 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all duration-300"
              required
            />
          </div>
        </div>

        {/* Return Date Input */}
        <div>
          <label
            htmlFor="return-date"
            className="block text-xs font-medium text-gray-500 mb-1"
          >
            Return Date
          </label>
          <div className="relative">
            <CalendarDays
              className="absolute left-2 top-1/2 -translate-y-1/2 text-orange-400"
              size={14}
            />
            <input
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              type="date"
              id="return-date"
              min={pickupDate || new Date().toISOString().split("T")[0]}
              className="w-full pl-7 pr-2 py-1.5 bg-white border border-gray-300 rounded-xl text-xs text-gray-700 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all duration-300"
              required
            />
          </div>
        </div>

        {/* Search button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-1 py-1.5 px-3 bg-orange-500 text-white text-xs font-semibold rounded-xl hover:bg-orange-600 transition-colors col-span-1 md:col-start-4"
        >
          <Search size={14} />
          Search
        </button>
      </form>

      {/* The car image is now a separate element to create a visual break */}
      <img src={assets.main_car} alt="car" className="max-h-74 mt-16" />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <Hero />
    </AppProvider>
  );
}
