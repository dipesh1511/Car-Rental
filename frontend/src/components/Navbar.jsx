import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";
import { Search } from "lucide-react";

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } =
    useAppContext();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    // The main container with a warm, soft background
    <div
      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-3 md:py-4 text-gray-700 bg-yellow-50 border-b border-orange-100 relative transition-all`}
    >
      <Link to="/">
        <img src={assets.logo} alt="logo" className="h-7" />
      </Link>

      <div
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-[56px] max-sm:border-t border-orange-100 right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 max-sm:p-4 transition-all duration-300 z-50 bg-yellow-50
        ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}
      >
        {menuLinks.map((link, index) => (
          <Link
            to={link.path}
            key={index}
            className="hover:text-orange-500 transition-colors"
          >
            {link.name}
          </Link>
        ))}

        {/* The search bar is now smaller and styled to match the theme */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-200 px-3 py-1 rounded-full w-full max-w-44 bg-white">
          <input
            type="text"
            className="w-full bg-transparent outline-none placeholder-gray-400 text-sm"
            placeholder="Search Cars"
          />
          <Search size={16} className="text-orange-400" />
        </div>

        <div className="flex max-sm:flex-col items-start sm:items-center gap-4">
          <button
            onClick={() => {
              isOwner ? navigate("/owner") : changeRole();
            }}
            className="cursor-pointer text-sm font-semibold hover:text-orange-500 transition-colors"
          >
            {isOwner ? "Dashboard" : "List cars"}
          </button>
          <button
            onClick={() => {
              user ? logout() : setShowLogin(true);
            }}
            className="cursor-pointer px-4 py-2 bg-orange-500 hover:bg-orange-600 transition-all text-white rounded-full text-sm font-semibold"
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>

      <button
        className="sm:hidden cursor-pointer"
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <img
          src={open ? assets.close_icon : assets.menu_icon}
          alt="menu"
          className="h-6 w-6"
        />
      </button>
    </div>
  );
};

export default Navbar;
