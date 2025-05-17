import React, { useEffect, useState } from "react";
import AttendanceRow from "./AttendanceRow";
import "../Attendance/Attendance.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useGetAttendanceDetailsQuery } from "../../Redux/api/attendanceApi";

const AttendanceDetails = ({ employee }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const empId = employee?._id;
  // console.log(empId);
  const {
    data: attendanceData,
    isLoading,
    isError,
    error,
  } = useGetAttendanceDetailsQuery(empId);

  // console.log("attendance data : ", attendanceData);

  const totalRecords = attendanceData?.attendance?.length || 0;
  const totalPages =
    totalRecords > 0 ? Math.ceil(totalRecords / itemsPerPage) : 1;

  const currentRecords = attendanceData?.attendance
    ? attendanceData.attendance.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin ml-4" />
      </div>
    );
  if (isError)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="w-full flex flex-col items-start gap-3 sm:gap-4 md:gap-5 justify-start text-sm sm:text-base font-light text-black overflow-x-auto px-4">
      <div className="w-full">
        {/* Header Row */}
        <div className="flex w-full items-center justify-between border-b border-[rgba(162,161,168,0.10)] font-semibold attendanceDetails">
          <div className="flex-1 min-w-0 py-2 sm:py-2.5 text-center">Date</div>
          <div className="flex-1 min-w-0 py-2 sm:py-2.5 text-center">
            Status
          </div>
        </div>

        {/* Attendance Rows */}
        <div className="overflow-x-auto w-full attendanceDetails">
          {currentRecords.length > 0 ? (
            currentRecords.map((attendance, index) => (
              <AttendanceRow
                key={index}
                date={attendance.date.split("T")[0]}
                status={attendance.status}
              />
            ))
          ) : (
            <p className="text-center py-2">No attendance records found.</p>
          )}
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
            Showing {currentRecords.length} out of {totalRecords} records
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
};

export default AttendanceDetails;
