import React, { useEffect, useState } from "react";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import {
  Car,
  ListChecks,
  AlertCircle,
  CalendarCheck,
  DollarSign,
  CalendarDays,
  IndianRupee,
} from "lucide-react";

const Dashboard = () => {
  const { axios, isOwner, currency } = useAppContext();

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const dashboardCards = [
    { title: "Total Cars", value: data.totalCars, icon: <Car size={24} /> },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: <ListChecks size={24} />,
    },
    {
      title: "Pending",
      value: data.pendingBookings,
      icon: <AlertCircle size={24} />,
    },
    {
      title: "Confirmed",
      value: data.completedBookings,
      icon: <CalendarCheck size={24} />,
    },
  ];

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/owner/dashboard");

      if (data.success) {
        setData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchDashboardData();
    }
  }, [isOwner]);

  return (
    <div className="px-4 py-10 md:px-10 flex-1 bg-white">
      <Title
        title={"Admin Dashboard"}
        subtitle={
          "Monitor overall platform performance including total cars, bookings, revenue and recent activities"
        }
        align="left"
      />

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 p-6 rounded-lg shadow-sm border border-gray-200 bg-orange-50"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-sm font-medium text-gray-700">
                {card.title}
              </h1>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-600">
                {card.icon}
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Bookings and Monthly Revenue */}
      <div className="flex flex-wrap items-start gap-6 w-full">
        {/* Recent Bookings */}
        <div className="p-6 border border-gray-200 rounded-lg shadow-sm w-full lg:max-w-xl bg-white">
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Bookings
          </h2>
          <p className="text-gray-500 text-sm mt-1">Latest customer bookings</p>
          <div className="mt-4 space-y-4">
            {data.recentBookings.length > 0 ? (
              data.recentBookings.map((booking, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-50 text-orange-500">
                      <CalendarDays size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {booking.car.brand} {booking.car.model}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <p className="text-md font-bold text-gray-800">
                      {currency} {booking.price}
                    </p>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold
                    ${
                      booking.status === "Pending"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-6">
                No recent bookings found.
              </p>
            )}
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="p-6 border border-gray-200 rounded-lg shadow-sm w-full lg:max-w-sm bg-white">
          <h2 className="text-lg font-semibold text-gray-800">
            Monthly Revenue
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Revenue for current month
          </p>
          <div className="flex items-end mt-6 gap-2 text-3xl font-bold text-orange-600">
            <IndianRupee size={32} strokeWidth={2.5} />
            <p>{data.monthlyRevenue}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
