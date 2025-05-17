import React from "react";
import StatusBadge from "./StatusBadge";

const ProjectRow = ({ id, name, startDate, finishDate, status }) => {
  return (
    <div className="flex w-full items-start justify-start flex-wrap border-b border-[rgba(162,161,168,0.10)] mt-2 sm:mt-2.5">
      <div className="w-[60px] sm:w-[65px] md:w-[72px] py-2 sm:py-2.5 pr-2 sm:pr-2.5 text-sm sm:text-base">
        {id}
      </div>
      <div className="w-[180px] sm:w-[200px] md:w-[240px] flex-1 py-2 sm:py-2.5 pr-2 sm:pr-2.5 text-sm sm:text-base">
        {name}
      </div>
      <div className="w-[140px] sm:w-[155px] md:w-[172px] py-2 sm:py-2.5 pr-2 sm:pr-2.5 text-sm sm:text-base">
        {startDate}
      </div>
      <div className="w-[120px] sm:w-[135px] md:w-[152px] py-2 sm:py-2.5 pr-2 sm:pr-2.5 text-sm sm:text-base">
        {finishDate}
      </div>
      <div className="w-[80px] sm:w-[85px] md:w-[94px] py-2 sm:py-2.5 pr-2 sm:pr-2.5 flex items-start gap-2.5">
        <StatusBadge status={status} />
      </div>
    </div>
  );
};

export default ProjectRow;
