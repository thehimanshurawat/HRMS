import React, { useState, useEffect, useMemo } from "react";
import { FaSearch, FaPlusCircle } from "react-icons/fa";
import data from "./data.json";
import filterImg from "../../assets/images/filter.svg";
import Table from "./Tabel";
import "./AllEmployee.css";
import { useNavigate } from "react-router-dom";
import { useAllEmployeesQuery } from "../../Redux/api/employeeApi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AllEmployee = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [departmentFilters, setDepartmentFilters] = useState([]);
  const [workType, setWorkType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  const departments = ["HR", "IT", "Manager", "Director", "COS", "CEO"];

  const { data: empData, isLoading, isError, error } = useAllEmployeesQuery();

  // console.log(empData);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [departmentFilters, workType]);

  const filteredEmployees = useMemo(() => {
    if (!empData?.result) return [];
    return empData.result.filter(
      (employee) =>
        employee.username.toLowerCase().includes(search.toLowerCase()) &&
        (!departmentFilters.length ||
          departmentFilters.includes(employee.department)) &&
        (!workType || employee.type === workType)
    );
  }, [empData, search, departmentFilters, workType]);

  // console.log(filteredEmployees);
  const totalPages = Math.ceil((filteredEmployees?.length || 0) / itemsPerPage);

  const handleCheckboxChange = (department) => {
    setDepartmentFilters((prev) =>
      prev.includes(department)
        ? prev.filter((d) => d !== department)
        : [...prev, department]
    );
  };
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen z-0">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin ml-4" />
      </div>
    );
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="all-employee-container">
      {/* <Sidebar /> */}
      <div className="all-employee-content">
        <div className="all-employee-search-container">
          <div className="flex items-center bg-gray-50 border border-gray-300 p-2 rounded-lg">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="w-full border-none focus:ring-0 focus:outline-none bg-transparent ms-2 search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="all-employee-button-container">
            <button
              onClick={() => navigate("/add-employee")}
              className="all-employee-add-button md:left-0 lg:left-6 "
            >
              <FaPlusCircle />
              Add New Employee
            </button>
              <button
                onClick={() => setIsPopupOpen(true)}
                className="all-employee-filter-button lg:top-[10px] top-0 left-0 md:left-0 lg:left-9"
              >
                <img src={filterImg || "/placeholder.svg"} alt="filterImg" />
                Filter
              </button>
          </div>
        </div>
        <Table
          employees={filteredEmployees}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <label>Show:</label>
            <select
              className="border p-1 sm:p-2 rounded-md"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              {[5, 7, 10].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <span className="max-[600px]:hidden">
            Showing {paginatedEmployees.length} out of{" "}
            {filteredEmployees.length} records
          </span>
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 rounded-md flex items-center justify-center ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-violet-500 text-white"
              }`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>
            <button
              className={`px-3 py-1 rounded-md flex items-center justify-center ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-violet-500 text-white"
              }`}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <div className="all-employee-popup-overlay">
          <div className="all-employee-popup-content">
            <h2 className="all-employee-popup-header">Filter Options</h2>

            <p className="all-employee-popup-department-label">Department</p>
            <div className="all-employee-popup-department-grid">
              {departments.map((department) => (
                <label
                  key={department}
                  className="all-employee-popup-department-item"
                >
                  <input
                    type="checkbox"
                    checked={departmentFilters.includes(department)}
                    onChange={() => handleCheckboxChange(department)}
                  />
                  {department}
                </label>
              ))}
            </div>

            <div className="all-employee-popup-buttons-container">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="all-employee-popup-button all-employee-popup-cancel-button"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="all-employee-popup-button all-employee-popup-apply-button"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllEmployee;
