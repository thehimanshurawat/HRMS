// EmployeeTable.jsx
import React, { useState } from 'react';
import allEmployees from './Employees';
import { FaSearch, FaPlus, FaUser } from 'react-icons/fa';
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import view from "../../assets/images/view.svg";
import edit from "../../assets/images/edit.svg";
import trash from "../../assets/images/trash 01.svg";
import "./Department.css";

const RoleDetails = () => {
  // For demo: totalRecords = 60, pageSize = 10, currentPage in state.
  const [currentPage, setCurrentPage] = useState(1);
  const { roleName } = useParams();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const employees = allEmployees[roleName] || [];
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase()) ||
    employee.id.includes(search) ||
    employee.type.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (e) => {
    const trimmedValue = e.target.value.replace(/\s+/g, ' ').trim();
    setSearch(trimmedValue);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white p-6  sm:w-full lg:w-full">
      {/* Role details content */}
      {/* <div className="mb-6">
        <h6 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {roleName
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </h6>
      </div> */}

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
        {/* Rest of the Role Details Content */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0">
          <div className="flex items-center bg-gray-50 p-2 rounded-lg sm:w-1/4">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="w-full border-none focus:ring-0 focus:outline-none bg-transparent ms-2"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          <a onClick={() => navigate('/add-employee')} style={{ textDecoration: 'none' }} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 flex items-center justify-center w-full sm:w-auto">
            <FaPlus className="mr-2" />
            Add New Employee
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-2 text-sm sm:text-base text-gray-500 font-normal">Employee ID</th>
                <th className="text-left p-2 text-sm sm:text-base text-gray-500 font-normal">Employee Name</th>
                <th className="text-left p-2 text-sm sm:text-base text-gray-500 font-normal">Type</th>
                <th className="text-left p-2 text-sm sm:text-base text-gray-500 font-normal">Status</th>
                <th className="text-left p-2 text-sm sm:text-base text-gray-500 font-normal">Action</th>
                {/* Other columns */}
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-200">
                  <td className="p-3 text-sm text-gray-800">{employee.id}</td>
                  {/* Other rows */}
                  <td className="p-3 text-sm flex items-center text-gray-500">
                    {/* Dynamic picture */}
                    {employee.image ? (
                      <img
                        src={employee.image}
                        alt={employee.name}
                        className="w-9 h-9 rounded-full mr-2 me-2"
                        style={{ width: "36px", height: "36px" }}
                      />
                    ) : (
                      <FaUser
                        className="text-gray-600 mr-2 me-2"
                        style={{ width: "36px", height: "36px" }}
                      />
                    )}
                    {employee.name}
                  </td>
                  <td className="p-3 text-sm text-gray-800">{employee.type}</td>
                  <td className="p-2 text-sm text-gray-800">
                    <button className="bg-purple-200 text-purple-800 px-3 py-1 rounded-md hover:bg-gray-300">
                      {employee.status}
                    </button>
                  </td>
                  <td className="p-3 flex space-x-2">
                    <img
                      src={view || "/placeholder.svg"}
                      alt="view"
                      className="all-employee-action-icons me-2"
                      onClick={() => navigate('/profile')}
                    />
                    <img
                      src={edit || "/placeholder.svg"}
                      alt="edit"
                      className="all-employee-action-icons me-2"
                    />
                    <img
                      src={trash || "/placeholder.svg"}
                      alt="trash"
                      className="all-employee-action-icons"
                    />

                    {/* <a onClick={() => navigate('/profile')} className=" px-2 py-1 rounded-md">
                      <IoEyeOutline className="text-black cursor-pointer" />
                    </a>
                    <Link to={`/edit-employee/${employee.id}`} className="px-2 py-1 rounded-md">
                      <FaEdit className="text-black cursor-pointer" />
                    </Link>
                    <Link to={`/delete-employee/${employee.id}`} className="px-2 py-1 rounded-md">
                      <MdDeleteOutline className="text-black cursor-pointer" />
                    </Link> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="all-employee-pagination-container">
          <div className="all-employee-rows-per-page">
            <span>Rows per page: </span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="all-employee-rows-per-page-select"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          <div className="all-employee-pagination-buttons">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="all-employee-pagination-button"
            >
              ⬅️
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="all-employee-pagination-button"
            >
              ➡️
            </button>
          </div>
        </div>
      </div>
    </div>
  );

};

export default RoleDetails;
