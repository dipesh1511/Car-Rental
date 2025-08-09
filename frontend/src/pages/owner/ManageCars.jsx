import React, { useEffect, useState } from "react";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { Eye, EyeOff, Trash2, IndianRupee } from "lucide-react";

const ManageCars = () => {
  const { isOwner, axios, currency } = useAppContext();
  const [cars, setCars] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get("/api/owner/cars");
      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post("/api/owner/toggle-car", { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteCar = (carId) => {
    setCarToDelete(carId);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!carToDelete) return;
    try {
      const { data } = await axios.post("/api/owner/delete-car", {
        carId: carToDelete,
      });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setShowConfirmModal(false);
      setCarToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setCarToDelete(null);
  };

  useEffect(() => {
    isOwner && fetchOwnerCars();
  }, [isOwner]);

  // Helper function to get status badge classes
  const getStatusBadgeClass = (isAvailable) => {
    return isAvailable
      ? "bg-emerald-100 text-emerald-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <div className="px-4 py-10 md:px-10 w-full flex-1 bg-white">
      <Title
        title="Manage Your Cars"
        subtitle="View all listed cars, update their details, or remove them from the booking platform."
        align="left"
      />

      <div className="max-w-4xl w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm mt-8">
        <table className="w-full border-collapse text-left text-sm text-gray-700">
          <thead className="bg-gray-50 text-gray-600 uppercase tracking-wider">
            <tr>
              <th className="p-4 font-bold">Car</th>
              <th className="p-4 font-bold max-md:hidden">Category</th>
              <th className="p-4 font-bold">Price</th>
              <th className="p-4 font-bold max-md:hidden">Status</th>
              <th className="p-4 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {cars.length > 0 ? (
              cars.map((car, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={
                        car.image ||
                        `https://placehold.co/48x48/d1d5db/4b5563?text=Car`
                      }
                      alt={`${car.brand} ${car.model}`}
                      className="h-12 w-12 aspect-square rounded-md object-cover border border-gray-200"
                    />
                    <div>
                      <p className="font-semibold">
                        {car.brand} {car.model}
                      </p>
                      <p className="text-sm text-gray-500">
                        {car.seating_capacity} Seater . {car.transmission}
                      </p>
                    </div>
                  </td>

                  <td className="p-4 max-md:hidden text-gray-500">
                    {car.category}
                  </td>
                  <td className="p-4 font-semibold">
                    <div className="flex items-center gap-1">
                      <IndianRupee size={16} />
                      {car.pricePerDay} /day
                    </div>
                  </td>
                  <td className="p-4 max-md:hidden">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
                        car.isAvailable
                      )}`}
                    >
                      {car.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleAvailability(car._id)}
                        className="text-gray-500 hover:text-orange-600 transition-colors"
                      >
                        {car.isAvailable ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteCar(car._id)}
                        className="text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No cars found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-800">
              Confirm Deletion
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete this car? This action cannot be
              undone.
            </p>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCars;
