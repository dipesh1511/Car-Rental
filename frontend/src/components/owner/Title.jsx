import React from "react";

const Title = ({ title, subtitle, align = "center" }) => {
  // Determine text alignment based on the 'align' prop
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    // Container for the title and subtitle, with dynamic alignment
    <div className={`w-full ${alignmentClasses[align]}`}>
      <h1 className="font-bold text-3xl md:text-4xl text-gray-800">{title}</h1>
      <p className="text-sm md:text-base text-gray-500 mt-2">{subtitle}</p>
    </div>
  );
};

export default Title;
