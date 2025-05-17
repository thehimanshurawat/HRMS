import React, { useState } from "react";
import { MdChevronRight } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Department.css";
const Department = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const sectors = [
    {
      name: "HR",
      members: 20,
      roles: [
        { name: "HR Associates", link: "/role-details/hr-associates" },
        { name: "Sr HR Associates", link: "/role-details/sr-hr-associates" },
        { name: "Managers", link: "/role-details/managers" },
        { name: "Sr Managers", link: "/role-details/sr-managers" },
        {
          name: "Associate Director",
          link: "/role-details/associate-director",
        },
      ],
    },
    // {
    //   name: "Marketing",
    //   members: 14,
    //   roles: [
    //     { name: "Sales Manager", link: "/role-details/sales-manager" },
    //     {
    //       name: "Marketing Executive",
    //       link: "/role-details/marketing-executive",
    //     },
    //     {
    //       name: "Social Media Manager",
    //       link: "/role-details/social-media-manager",
    //     },
    //     {
    //       name: "Advertising Specialist",
    //       link: "/role-details/advertising-specialist",
    //     },
    //     { name: "Brand Manager", link: "/role-details/brand-manager" },
    //   ],
    // },
    // {
    //   name: "Engineering",
    //   members: 25,
    //   roles: [
    //     { name: "Software Engineer", link: "/role-details/software-engineer" },
    //     { name: "DevOps Engineer", link: "/role-details/devops-engineer" },
    //     { name: "QA Engineer", link: "/role-details/qa-engineer" },
    //     { name: "Tech Lead", link: "/role-details/tech-lead" },
    //     { name: "CTO", link: "/role-details/cto" },
    //   ],
    // },
    // {
    //   name: "Finance",
    //   members: 10,
    //   roles: [
    //     { name: "Accountant", link: "/role-details/accountant" },
    //     { name: "Financial Analyst", link: "/role-details/financial-analyst" },
    //     { name: "Auditor", link: "/role-details/auditor" },
    //     {
    //       name: "Investment Manager",
    //       link: "/role-details/investment-manager",
    //     },
    //     { name: "CFO", link: "/role-details/cfo" },
    //   ],
    // },
  ];

  // Filter logic: If search matches department or role, show it
  const filteredSectors = sectors
    .map((sector) => {
      const filteredRoles = sector.roles.filter((role) =>
        role.name.toLowerCase().includes(search.toLowerCase())
      );

      // If department name matches OR roles match, include this sector
      if (
        sector.name.toLowerCase().includes(search.toLowerCase()) ||
        filteredRoles.length > 0
      ) {
        return { ...sector, roles: filteredRoles };
      }

      return null;
    })
    .filter(Boolean); // Remove null values

  return (
    <div className="shadow-xl border border-gray-200 rounded-lg depart">
      <div className="p-6 rounded-lg departmentSection">
        {/* Search Box */}
        <div className="flex items-center space-x-4 w-full sm:w-1/4 mb-4">
          <div className="flex items-center p-2 rounded-lg w-full border bg-gray-50 border-gray-300 department">
            <FaSearch className="text-gray-400 mr-4" />
            <input
              type="text"
              placeholder="Search"
              className="w-full border-none focus:ring-0 focus:outline-none bg-transparent ms-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredSectors.length > 0 ? (
            filteredSectors.map((sector, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg shadow p-4 mb-6 department2"
              >
                <h2 className="text-lg font-bold text-gray-700 mb-2">
                  {sector.name}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  {sector.members} Members
                </p>
                <hr className="border-t-2 border-gray-100 sm:w-3/4 md:w-4/4 w-full mx-auto" />
                <ul className="space-y-1 tableul">
                  {sector.roles.map((role, roleIndex) => (
                    <li
                      key={roleIndex}
                      className={`flex justify-between items-center py-3 cursor-pointer  rounded-lg transition duration-200 ease-in-out mb-2
                          ${
                            search &&
                            role.name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                              ? "bg-gray-300 font-normal"
                              : "hover:bg-gray-200"
                          }`}
                      onClick={() => navigate(role.link)}
                    >
                      <span className="text-gray-800">{role.name}</span>
                      <MdChevronRight className="w-5 h-5 text-gray-500" />
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Department;
