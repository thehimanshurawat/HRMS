import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaUser, FaPlusCircle } from "react-icons/fa";
import { CiExport } from "react-icons/ci";
import "./Payroll.css";
import * as XLSX from "xlsx";
import {
  useAllPayrollQuery,
  useDeletePayrollMutation,
} from "../../Redux/api/payrollApi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import view from "../../assets/images/view.svg";
import edit from "../../assets/images/edit.svg";
import trash from "../../assets/images/trash 01.svg";
import { toast } from "react-toastify";

const statuses = {
  Completed: "bg-green-200 text-green-700 max-[330px]:text-[8px]",
  Pending: "bg-yellow-200 text-yellow-700 max-[330px]:text-[8px]",
  Rejected: "bg-red-200 text-red-700 max-[330px]:text-[8px]",
};
  
export default function Payroll() {
  const { data: emp, error, isLoading, refetch } = useAllPayrollQuery();

  const [deletePayroll] = useDeletePayrollMutation();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const navigate = useNavigate();

  const [payrollId, setPayrollId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem("payrollId");
    console.log("storedId", storedId);
    setPayrollId(storedId);
  }, []);

  useEffect(() => {
    const shouldRefresh = localStorage.getItem("refreshPayroll");

    if (shouldRefresh === "true") {
      refetch();
      localStorage.removeItem("refreshPayroll");
    }
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin ml-4" />
      </div>
    );
  }
  if (error) return <p>Error: {error.message}</p>;
  const payrollData = emp?.payrolls || [];

  const filteredEmployees = payrollData.filter(
    (employee) =>
      employee?.employee?.username
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      employee?.employee?._id?.includes(search)
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExport = () => {
    const exportData =
      filteredEmployees.length > 0 ? filteredEmployees : payrollData;
    const formattedData = exportData.map((employee, index) => ({
      ID: index + 1,
      "Employee ID": employee?.employee?._id || "N/A",
      "Employee Name": employee?.employee?.username || "Unknown",
      CTC: employee?.ctc || "N/A",
      "Salary Per Month": employee?.salary || "N/A",
      Deduction: employee?.deduction || "N/A",
      Status: employee?.status || "N/A",
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payroll Data");
    XLSX.writeFile(workbook, "Employee_Payroll.xlsx");
  };

  const edithandler = (id) => {
    navigate(`/add-payroll/${id}`);
  };
  // deletepayroll
  const deleteHandler = async (id) => {
    try {
      if (!id) {
        toast.error("Invalid payroll ID!");
        return;
      }

      await deletePayroll(id);
      refetch();
      toast.success("Payroll deleted successfully!");
    } catch (error) {
      console.error("Error deleting payroll:", error);
      toast.error(error.message || "Failed to delete payroll");
    }
  };
  console.log(paginatedEmployees.length);

  return (
    <div className="bg-white p-6 border border-gray-200 rounded-lg w-full payrollContainer">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0">
          <div className="flex items-center bg-gray-50 border border-gray-300 p-2 rounded-lg sm:w-1/4">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="w-full border-none focus:ring-0 focus:outline-none bg-transparent ms-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="addPayrollContainer">
            <button
              onClick={() => navigate("/add-payroll")}
              className="p-2 bg-violet-500 text-white rounded-md flex items-center gap-1"
            >
              <FaPlusCircle />
              Add New Payroll
            </button>
            <button
              onClick={handleExport}
              className="p-2 bg-violet-500 text-white rounded-md flex items-center gap-1"
            >
              <CiExport />
              Export
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="p-2 text-left text-sm sm:text-base text-gray-500 font-normal">
                  Employee ID
                </th>
                <th className="p-2 text-left text-sm sm:text-base text-gray-500 font-normal">
                  Employee Name
                </th>
                <th className="p-2 text-left text-sm sm:text-base text-gray-500 font-normal">
                  CTC
                </th>
                <th className="p-2 text-left text-sm sm:text-base text-gray-500 font-normal">
                  Salary Per Month
                </th>
                <th className="p-2 text-left text-sm sm:text-base text-gray-500 font-normal">
                  Deduction
                </th>
                <th className="p-2 text-left text-sm sm:text-base text-gray-500 font-normal">
                  Status
                </th>
                <th className="p-2 text-center text-sm sm:text-base text-gray-500 font-normal">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees.length > 0 ? (
                paginatedEmployees.map((employee) => (
                  <tr key={employee._id} className="border-b border-gray-200">
                    <td className="p-3 text-sm text-gray-800">
                      {employee?.employee?.employeeId || "N/A"}
                    </td>
                    <td className="p-3 text-sm flex items-center text-gray-500">
                      {employee?.employee?.username || "Unknown"}
                    </td>
                    <td className="p-3 text-sm text-gray-800">
                      {employee?.ctc || "N/A"}
                    </td>
                    <td className="p-2">{employee?.salaryPerMonth || "N/A"}</td>
                    <td className="p-2">{employee?.deductions || "N/A"}</td>
                    <td className="p-2 text-sm text-gray-800">
                      <span
                        className={`px-2 py-1 rounded-md ${
                          statuses[employee?.status] ||
                          "text-gray-700"
                        }`}
                      >
                        {employee?.status || "N/A"}
                      </span>
                    </td>
                    <td className="p-3 text-sm flex items-center justify-evenly">
                      <img
                        src={edit || "/placeholder.svg"}
                        alt="edit"
                        onClick={() => edithandler(employee._id)}
                        className="all-employee-action-icons"
                      />
                      <img
                        src={trash || "/placeholder.svg"}
                        alt="trash"
                        onClick={() => deleteHandler(employee._id)}
                        className="all-employee-action-icons"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <p className="text-center py-2 w-full">
                  No Payroll records found.
                </p>
              )}
            </tbody>
          </table>
        </div>

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
