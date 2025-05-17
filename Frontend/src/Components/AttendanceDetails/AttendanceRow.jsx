import React from "react";
import StatusBadge from "./StatusBadge";

const AttendanceRow = ({ date, status }) => {
  return (
    <div className="flex w-full items-center justify-between border-b border-[rgba(162,161,168,0.10)]">
      <div className="flex-1 min-w-0 py-2 sm:py-2.5 text-center">{date}</div>
      <div className="flex-1 min-w-0 py-2 sm:py-2.5 flex items-center justify-center">
        <StatusBadge status={status} />
      </div>
    </div>
  );
};

export default AttendanceRow;
