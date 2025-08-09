import React, { useState } from "react";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { Upload, CheckCircle, CircleDashed } from "lucide-react";

const AddCar = () => {
  const { axios, currency } = useAppContext();

  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: "", // Changed to empty string to prevent it from defaulting to 0 in the UI
    pricePerDay: "", // Changed to empty string
    transmission: "",
    fuel_type: "",
    seating_capacity: "", // Changed to empty string
    location: "",
    description: "",
    category: "", // Added category to the state
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return null;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("carData", JSON.stringify(car));

      const { data } = await axios.post("/api/owner/add-car", formData);

      if (data.success) {
        toast.success(data.message);
        setImage(null);
        setCar({
          brand: "",
          model: "",
          year: "",
          pricePerDay: "",
          transmission: "",
          fuel_type: "",
          seating_capacity: "",
          location: "",
          description: "",
          category: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  return (
    <div className="px-4 py-10 md:px-10 flex-1 bg-white rounded-lg shadow-md">
      <Title
        title="Add New Car"
        subtitle="Fill in the details to list a new car for booking, including pricing, availability, and car specifications."
        align="left"
      />
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-6 text-gray-700 text-sm mt-8 max-w-2xl mx-auto"
      >
        {/* Car Image Upload */}
        <div className="flex flex-col items-center gap-4 w-full p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <label htmlFor="car-image" className="cursor-pointer">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded car"
                className="h-32 w-auto object-cover rounded-md shadow-sm"
              />
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <Upload size={48} />
                <p className="mt-2 text-sm font-medium">
                  Click to upload image
                </p>
                <p className="text-xs">PNG, JPG or GIF (Max 5MB)</p>
              </div>
            )}
            <input
              type="file"
              id="car-image"
              name="image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label className="font-medium mb-1">Brand</label>
            <input
              type="text"
              name="brand"
              placeholder="e.g. Maruti, Mercedes, Nissan..."
              required
              className="px-4 py-3 mt-1 border border-gray-300 rounded-md outline-none bg-gray-50 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-colors"
              value={car.brand}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium mb-1">Model</label>
            <input
              type="text"
              name="model"
              placeholder="e.g. Swift, C-Class, Altima..."
              required
              className="px-4 py-3 mt-1 border border-gray-300 rounded-md outline-none bg-gray-50 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-colors"
              value={car.model}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label className="font-medium mb-1">Year</label>
            <input
              type="number"
              name="year"
              placeholder="e.g. 2025"
              required
              className="px-4 py-3 mt-1 border border-gray-300 rounded-md outline-none bg-gray-50 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-colors"
              value={car.year}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium mb-1">
              Price per Day ({currency})
            </label>
            <input
              type="number"
              name="pricePerDay"
              placeholder="e.g. 100"
              required
              className="px-4 py-3 mt-1 border border-gray-300 rounded-md outline-none bg-gray-50 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-colors"
              value={car.pricePerDay}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium mb-1">Category</label>
            <select
              name="category"
              required
              className="px-4 py-3 mt-1 border border-gray-300 rounded-md outline-none bg-gray-50 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-colors"
              value={car.category}
              onChange={handleInputChange}
            >
              <option value="">Select a Category</option>
              <option value="Crossover">Crossover</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label className="font-medium mb-1">Transmission</label>
            <select
              name="transmission"
              required
              className="px-4 py-3 mt-1 border border-gray-300 rounded-md outline-none bg-gray-50 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-colors"
              value={car.transmission}
              onChange={handleInputChange}
            >
              <option value="">Select a Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium mb-1">Fuel Type</label>
            <select
              name="fuel_type"
              required
              className="px-4 py-3 mt-1 border border-gray-300 rounded-md outline-none bg-gray-50 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-colors"
              value={car.fuel_type}
              onChange={handleInputChange}
            >
              <option value="">Select a Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium mb-1">Seating Capacity</label>
            <input
              type="number"
              name="seating_capacity"
              placeholder="e.g. 4"
              required
              className="px-4 py-3 mt-1 border border-gray-300 rounded-md outline-none bg-gray-50 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-colors"
              value={car.seating_capacity}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex flex-col w-full">
          <label className="font-medium mb-1">Location</label>
          <select
            name="location"
            required
            className="px-4 py-3 mt-1 border border-gray-300 rounded-md outline-none bg-gray-50 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-colors"
            value={car.location}
            onChange={handleInputChange}
          >
            <option value="">Select a Location</option>
            <option value="Prayagraj">Prayagraj</option>
            <option value="Goa">Goa</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
          </select>
        </div>

        <div className="flex flex-col w-full">
          <label className="font-medium mb-1">Description</label>
          <textarea
            name="description"
            rows={5}
            placeholder="e.g. This is a great car."
            required
            className="px-4 py-3 mt-1 border border-gray-300 rounded-md outline-none bg-gray-50 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-colors resize-none"
            value={car.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <button
          type="submit"
          className={`flex items-center justify-center gap-2 px-6 py-3 mt-4
          rounded-md font-bold text-white transition-colors w-full
          ${
            isLoading
              ? "bg-orange-300 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <CircleDashed className="animate-spin" size={20} />
              Listing...
            </>
          ) : (
            <>
              <CheckCircle size={20} />
              List your Car
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
