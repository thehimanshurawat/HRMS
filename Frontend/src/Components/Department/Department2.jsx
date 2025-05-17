import React, { useState } from "react";
import { MdChevronRight } from "react-icons/md";
import searchimg from '../../assets/department_image/search.svg'
import { useNavigate } from 'react-router-dom';
import { department1, departments } from './DepartmentEmployees.js'

const Department = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleClick = () => {

    navigate('./viewdepartment');
  };
  const handleHrClick = () => {

    navigate('./viewdepartment');
  };
  const filteredSectors = department1
    .map((department1) => {
      const filteredRoles = department1.people.filter((people) =>
        people.name.toLowerCase().includes(search.toLowerCase())
      );

      // If department name matches OR roles match, include this department1
      if (department1.name.toLowerCase().includes(search.toLowerCase()) || filteredRoles.length > 0) {
        return { ...department1, people: filteredRoles };
      }

      return null;
    })
    .filter(Boolean); // Remove null values

  return (
    <div className="p-6  mb-3 max-w-6xl mx-auto border border-gray-200 rounded-lg department1">
      <div className="flex items-center py-[13px] px-[16px] mb-6 border border-gray-300 max-w-[330px] rounded-lg shadow-sm">
        <img src={searchimg} width={24} height={24} />
        {/* <input type="text" placeholder="Search" className="  "/> */}
        <input type="text" placeholder="Search" className="p-1  pl-2 text-[16px] font-light text-[#16151C33] departmentSearch   outline-none" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      {filteredSectors.length > 0 ? (
        filteredSectors.map((department1, index) => (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {department1.map((dept, index) => (
              <div
                key={index}
                className="p-6 border rounded-lg shadow-md bg-white flex flex-col h-auto w-full "
              >
                <div className="px-3">
                  <h2 className="text-lg font-semibold text-gray-800">{dept.name}</h2>
                  <p className="text-sm text-gray-500 mb-4">{dept.members} Members</p>
                </div>
                <hr />
                <ul className="space-y-2 flex-grow">
                  {dept.people?.map((person, i) => (
                    <div className="flex items-center justify-between py-[18px] px-3 hover:bg-gray-100 rounded-md" onClick={handleHrClick}>
                      <li
                        key={i}
                        // className="flex items-center gap-3 "
                        className={`flex justify-between items-center py-3 cursor-pointer px-3 rounded-lg transition duration-200 ease-in-out 
                      ${search &&
                            role.name.toLowerCase().includes(search.toLowerCase())
                            ? "bg-gray-300 font-normal"
                            : "hover:bg-gray-200"
                          }`}
                        onClick={() => navigate(role.link)}

                      >
                        <div>
                          <p className="font-medium text-gray-900">{person.name}</p>
                          {person.role && (
                            <p className="text-sm text-gray-600">{person.role}</p>
                          )}
                        </div>

                      </li>
                      <div>
                        <MdChevronRight className="w-5 h-5 text-gray-500" />
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
            ))}
            {departments.map((dept, index) => (
              <div
                key={index}
                className="p-6 border rounded-lg shadow-md bg-white flex flex-col h-auto w-full"
              >
                <div className="px-3">
                  <h2 className="text-lg font-semibold text-gray-800">{dept.name}</h2>
                  <p className="text-sm text-gray-500 mb-4">{dept.members} Members</p>
                </div>
                <hr />
                <ul className="space-y-2 flex-grow">
                  {dept.people?.map((person, i) => (
                    <div className="flex items-center justify-between  py-2 px-3 hover:bg-gray-100 rounded-md" onClick={handleClick}>
                      <li key={i} className="flex items-center gap-3">
                        <img src={person.image} />

                        <div>
                          <p className="font-medium text-gray-900">{person.name}</p>
                          {person.role && (
                            <p className="text-sm text-gray-600">{person.role}</p>
                          )}
                        </div>

                      </li>
                      <div>
                        <MdChevronRight className="w-5 h-5 text-gray-500" />
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No results found</p>
      )}
    </div>
  );
};

export default Department;
