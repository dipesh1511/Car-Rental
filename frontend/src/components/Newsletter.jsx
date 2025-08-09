import React from "react";

const Newsletter = () => {
  return (
    // The main container now has a distinct background and more balanced padding.
    // The max-width centers the content on larger screens.
    <div className="bg-yellow-50 py-16 md:py-20 flex flex-col items-center justify-center text-center px-4 rounded-xl shadow-lg max-w-4xl mx-auto my-20">
      <h1 className="md:text-4xl text-2xl font-bold text-gray-900">
        Never Miss a Deal!
      </h1>
      <p className="md:text-lg text-gray-600 pb-8 mt-2 max-w-xl">
        Subscribe to get the latest offers, new arrivals, and exclusive
        discounts.
      </p>

      {/* The form maintains its responsive layout with a slightly smaller gap */}
      <form className="flex flex-col sm:flex-row gap-2 justify-center max-w-2xl w-full">
        <input
          className="flex-grow px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all duration-300"
          type="email"
          placeholder="Enter your email id"
          required
        />
        <button
          type="submit"
          className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-orange-600 transition-colors text-sm"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
