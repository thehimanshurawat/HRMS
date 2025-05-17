import React from "react";

const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "Completed":
        return "bg-green-200 text-green-700 max-[330px]:text-[8px]";
      case "In Process":
        return "bg-yellow-200 text-yellow-700 max-[330px]:text-[8px]";
      default:
        return "bg-gray-200 text-gray-700 max-[330px]:text-[8px]";
    }
  };

  return (
    <div
      className={`text-xs px-2 py-0.5 rounded self-stretch ${getStatusStyles()}`}
    >
      {status}
    </div>
  );
};

export default StatusBadge;
