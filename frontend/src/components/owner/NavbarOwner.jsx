import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const NavbarOwner = () => {
  const { user } = useAppContext();
  return (
    // The container now has a warm, white background with a subtle border and shadow
    <div
      className="flex items-center justify-between px-6 md:px-10 py-4
      bg-white text-gray-700 border-b border-gray-200 shadow-sm
      relative transition-all"
    >
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="h-7" />
      </Link>

      <p className="text-gray-700 font-medium">
        Welcome,{" "}
        <span className="font-semibold text-orange-500">
          {user?.name || "owner"}
        </span>
      </p>
    </div>
  );
};

export default NavbarOwner;
