import React from "react";
import { Key } from "lucide-react";

const Banner = () => {
  return (
    // The main container now extends to the full screen width.
    <div className="bg-yellow-50 px-4 py-16">
      {/* The inner content is now centered and has a max-width for readability */}
      <div className="bg-orange-100 rounded-3xl shadow-lg border border-orange-200 p-8 flex flex-col md:flex-row items-center justify-between gap-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 text-gray-800">
          <Key size={48} strokeWidth={1.5} className="text-orange-500" />
          <div>
            <h3 className="text-xl md:text-2xl font-bold">
              Do You Own a Luxury Car?
            </h3>
            <p className="text-gray-600 mt-1 max-w-sm">
              Monetize your vehicle effortlessly by listing it on CarRental.
            </p>
          </div>
        </div>
        <button className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-orange-600 transition-colors w-full md:w-auto">
          List your car
        </button>
      </div>
    </div>
  );
};

export default Banner;
