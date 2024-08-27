import React from "react";

const types = {
  hoursToPension: {
    colorClass: "text-parcoBlue", // Tailwind classes for the color
    description: "Hours Towards Pension",
  },
  hoursWasted: {
    colorClass: "text-parcoRed",
    description: "Hours Wasted",
  },
  hoursUsed: {
    colorClass: "text-parcoGreen",
    description: "Hours Used",
  },
};

export default function HoursKey({ hours, type }) {
  // Destructure colorClass and description based on the provided type
  const { colorClass, description } = types[type] || {};

  return (
    <div className={`${colorClass} flex flex-col items-center w-full `}>
      <div className="text-xl font-bold">{hours}</div>
      <div className="text-center">{description}</div>
    </div>
  );
}
