import React from "react";
import ProjectRow from "./ProjectRow";
import "../myProfile/MyProfile.css";
const projectData = [
  {
    id: 1,
    name: "Amongus - Discovery Phase",
    startDate: "Feb 01, 2023",
    finishDate: "Mar 05, 2023",
    status: "Completed",
  },
  {
    id: 2,
    name: "Wildcare - Development Project",
    startDate: "Feb 12, 2023",
    finishDate: "April 20, 2023",
    status: "Completed",
  },
  {
    id: 3,
    name: "Hingutsan Web Development",
    startDate: "April 05, 2023",
    finishDate: "October 05, 2023",
    status: "In Process",
  },
  {
    id: 4,
    name: "Montilisy Ecommerce Platform",
    startDate: "May 12, 2023",
    finishDate: "August 12, 2023",
    status: "In Process",
  },
];

const ProjectDetails = () => {
  return (
    <div className="w-full flex items-start gap-3 sm:gap-4 md:gap-5 justify-start font-['Lexend,_-apple-system,_Roboto,_Helvetica,_sans-serif'] text-sm sm:text-base font-light text-black" style={{margin: "0 20px"}} >
      <div className="overflow-x-auto">
      <div className="min-w-[620px] sm:min-w-[700px] md:min-w-[768px] projectDetails">
        {/* Header Row */}
        <div className="flex w-full items-start justify-start flex-wrap border-b border-[rgba(162,161,168,0.10)]">
          <div className="w-[60px] sm:w-[65px] md:w-[72px] py-2 sm:py-2.5 pr-2 sm:pr-2.5 whitespace-nowrap">
            Sr. No.
          </div>
          <div className="w-[180px] sm:w-[200px] md:w-[240px] flex-1 py-2 sm:py-2.5 pr-2 sm:pr-2.5 whitespace-nowrap">
            Project Name
          </div>
          <div className="w-[140px] sm:w-[155px] md:w-[172px] py-2 sm:py-2.5 pr-2 sm:pr-2.5 whitespace-nowrap">
            Start Date
          </div>
          <div className="w-[120px] sm:w-[135px] md:w-[152px] py-2 sm:py-2.5 pr-2 sm:pr-2.5 whitespace-nowrap">
            Finish Date
          </div>
          <div className="w-[80px] sm:w-[85px] md:w-[94px] py-2 sm:py-2.5 pr-2 sm:pr-2.5 whitespace-nowrap">
            Status
          </div>
        </div>

        {/* Project Rows */}
          {projectData.map((project) => (
            <ProjectRow
              key={project.id}
              id={project.id}
              name={project.name}
              startDate={project.startDate}
              finishDate={project.finishDate}
              status={project.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
