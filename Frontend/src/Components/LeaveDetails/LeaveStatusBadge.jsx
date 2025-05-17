import React from "react";

const LeaveStatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-200 text-green-700 max-[330px]:text-[8px]";
      case "reject":
        return "bg-red-200 text-red-700 max-[330px]:text-[8px]";
      default:
        return "bg-green-200 text-green-700 max-[330px]:text-[8px]";
    }
  };

  return (
    <div
      className={`self-stretch rounded px-2 py-[3px] text-xs ${getStatusStyles()}`}
    >
      {status}
    </div>
  );
};

export default LeaveStatusBadge;





