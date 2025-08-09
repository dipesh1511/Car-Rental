import React from "react";

const Title = ({ title, subtitle, align }) => {
  return (
    // The title container uses dynamic alignment based on the 'align' prop
    <div
      className={`flex flex-col justify-center items-center text-center px-4
      ${align === "left" && "md:items-start md:text-left"}`}
    >
      {/* The main title with updated color and font size */}
      <h1 className="font-bold text-3xl md:text-4xl text-gray-900 leading-tight">
        {title}
      </h1>
      {/* The subtitle with a warm, slightly lighter color and a standard max-width */}
      <p className="text-sm md:text-base text-gray-600 mt-2 max-w-xl">
        {subtitle}
      </p>
    </div>
  );
};

export default Title;
