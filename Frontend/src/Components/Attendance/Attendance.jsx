import React, { useState } from "react";
import "./Attendance.css";
import { FaSearch, FaUser } from "react-icons/fa";
import { useAllAttendanceQuery } from "../../Redux/api/attendanceApi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CiExport } from "react-icons/ci";
import * as XLSX from "xlsx";

const statuses = {
  "On-Time": "bg-green-200 text-green-700 px-2 py-1 rounded-md text-xs md:text-sm whitespace-nowrap",
  Absent: "bg-red-200 text-red-700 px-2 py-1 rounded-md text-xs md:text-sm whitespace-nowrap",
  Late: "bg-yellow-200 text-yellow-700 px-2 py-1 rounded-md text-xs md:text-sm whitespace-nowrap",
};

export default function Attendance() {
  const { data: emp, error, isLoading } = useAllAttendanceQuery();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  console.log(emp);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin ml-4" />
      </div>
    );
  }
  if (error) return <p>Error: {error.message}</p>;

  const filteredEmployees =
    emp?.allAttendance?.filter(
      (emp) =>
        emp?.employee?.username?.toLowerCase().includes(search.toLowerCase()) ||
        emp?.employee?.employeeId?.includes(search)
    ) || [];

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleExport = () => {
    const exportData = filteredEmployees.length > 0 ? filteredEmployees : emp;
    const formattedData = exportData.map((employee, index) => ({
      ID: index + 1,
      "Employee ID": employee?.employee?._id || "N/A",
      "Employee Name": employee?.employee?.username || "Unknown",
      Designation: employee?.employee?.designation || "N/A",

      Status: employee?.status || "N/A",
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Data");
    XLSX.writeFile(workbook, "Employee_Attendance.xlsx");
  };

  return (
    <div className="bg-white p-6 border border-gray-200 rounded-lg w-full attendance">
      <div className="p-4 sm:p-6 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0">
          <div className="flex items-center bg-gray-50 border border-gray-300 p-2 rounded-lg sm:w-1/4">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search "
              className="w-full border-none focus:ring-0 focus:outline-none bg-transparent ms-2 attendanceInput"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={handleExport}
            className="p-2 bg-violet-500 text-white rounded-md flex items-center gap-1 attendanceExportButton"
          >
            <CiExport />
            Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-2 text-sm sm:text-base text-gray-500 font-normal">
                  Employee ID
                </th>
                <th className="text-left p-2 text-sm sm:text-base text-gray-500 font-normal">
                  Employee Name
                </th>
                <th className="text-left p-2 text-sm sm:text-base text-gray-500 font-normal">
                  Designation
                </th>
                <th className="text-left p-2 text-sm sm:text-base text-gray-500 font-normal">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees.map((emp) => (
                <tr key={emp._id} className="border-b border-gray-200 ">
                  <td className="p-3 text-sm attendanceText">
                    {emp?.employee?.employeeId || "N/A"}
                  </td>
                  <td className="p-3 text-sm flex items-center attendanceText">
                    <img
                      src={emp?.employee?.profileImg || "/placeholder.svg"}
                      alt="Profile"
                      className="all-attendance-profile-pic"
                    />
                    {emp?.employee?.username || "Unknown"}
                  </td>
                  <td className="p-3 text-sm attendanceText">
                    {emp?.employee?.designation || "N/A"}
                  </td>
                  <td className="p-2 text-sm text-gray-800 attendanceText">
                    <span
                      className={`px-2 py-1 rounded-md ${
                        statuses[emp.status] || "text-gray-700"
                      }`}
                    >
                      {emp.status || "Unknown"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
    </div>
  );
}
