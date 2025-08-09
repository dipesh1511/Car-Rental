import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import CarCard from "../components/CarCard";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { Search, SlidersHorizontal } from "lucide-react";

const Cars = () => {
  // getting search params from url
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const { cars, axios } = useAppContext();

  const [input, setInput] = useState("");

  // filter cars respect to pickup location
  const isSearchData = pickupLocation && pickupDate && returnDate;
  const [filteredCars, setFilteredCars] = useState([]);

  const applyFilter = () => {
    if (input === "") {
      setFilteredCars(cars);
      return;
    }
    const filtered = cars.filter(
      (car) =>
        car.brand.toLowerCase().includes(input.toLowerCase()) ||
        car.model.toLowerCase().includes(input.toLowerCase()) ||
        car.category.toLowerCase().includes(input.toLowerCase()) ||
        car.transmission.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredCars(filtered);
  };

  const searchCarAvailablity = async () => {
    const { data } = await axios.post("/api/bookings/check-availability", {
      location: pickupLocation,
      pickupDate,
      returnDate,
    });
    if (data.success) {
      setFilteredCars(data.availableCars);
      if (data.availableCars.length === 0) {
        toast("No car available");
      }
      return null;
    }
    console.log(data);
  };

  useEffect(() => {
    isSearchData && searchCarAvailablity();
  }, [isSearchData, pickupLocation, pickupDate, returnDate, axios]);

  useEffect(() => {
    cars.length > 0 && !isSearchData && applyFilter();
  }, [input, cars, isSearchData]);

  return (
    <div>
      {/* Refined top section with a warm background */}
      <div className="flex flex-col items-center py-20 bg-yellow-50 px-4">
        <Title
          title="Available Cars"
          subtitle="Browse our selection of premium vehicles available for your next adventure"
        />

        {/* Refined search bar with new icons and styling */}
        <div className="flex items-center bg-white px-4 mt-6 max-w-xl w-full h-12 rounded-full shadow-md border border-gray-200">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search by make, model, or features"
            className="w-full h-full outline-none text-gray-700 bg-transparent placeholder-gray-400"
          />
          <SlidersHorizontal
            size={18}
            className="text-gray-400 ml-2 cursor-pointer"
          />
        </div>
      </div>
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto">
          Showing {filteredCars.length} Cars
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {filteredCars.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cars;
