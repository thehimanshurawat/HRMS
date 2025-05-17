import React, { useState, useEffect } from "react";
import { FaSearch, FaPlusCircle } from "react-icons/fa";
import data from "./data.json";
import filterImg from "../../assets/images/filter.svg";
import Table from "./Tabel";
import "./AllEmployee.css";
import { useNavigate } from "react-router-dom";

const AllEmployee = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [departmentFilters, setDepartmentFilters] = useState([]);
  const [workType, setWorkType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const departments = [
    "HR",
    "Sales",
    "Bussiness Analyst",
    "Project Manager",
    "Design",
    "Java",
    "Python",
    "React JS",
    "Node JS",
    "Account",
  ];

  const filteredEmployees = data.filter(
    (employee) =>
      employee.employeeName.toLowerCase().includes(search.toLowerCase()) &&
      (!departmentFilters.length ||
        departmentFilters.includes(employee.department)) &&
      (!workType || employee.type === workType)
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const handleCheckboxChange = (department) => {
    setDepartmentFilters((prev) =>
      prev.includes(department)
        ? prev.filter((d) => d !== department)
        : [...prev, department]
    );
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [departmentFilters]);

  return (
    <div className="all-employee-container">
      {/* <Sidebar /> */}
      <div className="all-employee-content">
        <div className="all-employee-search-container">
          <div className="all-employee-search-input">
            <FaSearch className="all-employee-search-icon" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="all-employee-search-input-field"
            />
          </div>

          <div className="all-employee-button-container">
            <button
              onClick={() => navigate("/add-employee")}
              className="all-employee-add-button"
            >
              <FaPlusCircle />
              Add New Employee
            </button>
            <button
              onClick={() => setIsPopupOpen(true)}
              className="all-employee-filter-button"
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
        <div className="flex justify-between items-center mt-4 text-sm px-4">
          <div className="mb-4 pt-3">
            <label className="mr-2 p-3">Show:</label>
            <select
              className="border p-2 rounded-md max-[330px]:p-1"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={7}>7</option>
              <option value={10}>10</option>
            </select>
          </div>
          <span className="max-[600px]:hidden ">
            Showing {itemsPerPage} out of {filteredEmployees.length} records
          </span>
          <div className="flex gap-2 p-3">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`px-2 py-1 rounded-md max-[330px]:px-2 ${
                  currentPage === index + 1
                    ? "bg-violet-500 text-white"
                    : " border-1 border-gray-300"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <div className="all-employee-popup-overlay">
          <div className="all-employee-popup-content">
            <h2 className="all-employee-popup-header">Filter Options</h2>

            <div className="all-employee-popup-search-container">
              <FaSearch className="all-employee-popup-search-icon" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="all-employee-popup-search-input"
              />
            </div>

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

            <p className="all-employee-popup-work-type-label">Work Type</p>
            <div className="all-employee-popup-work-type-container">
              <label className="all-employee-popup-work-type-item">
                <input
                  type="radio"
                  name="workType"
                  value="Remote"
                  checked={workType === "Remote"}
                  onChange={() => setWorkType("Remote")}
                />
                Remote
              </label>
              <label className="all-employee-popup-work-type-item">
                <input
                  type="radio"
                  name="workType"
                  value="Office"
                  checked={workType === "Office"}
                  onChange={() => setWorkType("Office")}
                />
                Office
              </label>
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
