import React from "react";
import view from "../../assets/images/view.svg";
import edit from "../../assets/images/edit.svg";
import trash from "../../assets/images/trash 01.svg";

import "./AllEmployee.css";
import { useNavigate } from "react-router-dom";
import { useDeleteEmployeeMutation } from "../../Redux/api/employeeApi";
import { toast } from "react-toastify";

const statuses = {
  Permanent: "bg-green-200 text-green-700  max-[330px]:text-[8px]",
  Temporary: "bg-yellow-200 text-yellow-700  max-[330px]:text-[8px]",
};

const Table = ({ employees, currentPage, itemsPerPage }) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedEmployees = employees.slice(startIndex, endIndex);
  const navigate = useNavigate();

  // Initialize delete mutation
  const [deleteEmployee] = useDeleteEmployeeMutation();

  // Handler for delete action
  const handleDelete = async (empId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(empId).unwrap();
        toast.success("Employee deleted successfully!");
        // Optionally: trigger a refetch or update local state to remove deleted employee
      } catch (error) {
        toast.error(error?.data?.message || "Failed to delete employee");
      }
    }
  };

  return (
    <div className="all-employee-table-container">
      <table className="all-employee-table">
        <thead>
          <tr className="all-employee-table-header">
            <th className="text-left p-2 text-sm sm:text-base text-gray-500 font-normal">
              ID
            </th>
            <th className="text-left p-2 text-sm sm:text-base text-gray-500 font-normal">
              Name
            </th>
            <th className="text-left p-2 text-sm sm:text-base text-gray-500 font-normal">
              Designation
            </th>
            <th className="text-left p-2 text-sm sm:text-base text-gray-500 font-normal">
              Department
            </th>
            <th className=" p-2 text-sm sm:text-base text-gray-500 font-normal text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedEmployees.map((employee, index) => (
            <tr key={index} className="all-employee-table-row">
              <td className="p-3 text-sm text-gray-800">
                {employee.employeeId}
              </td>
              <td className="all-employee-table-cell flex items-center">
                <img
                  src={employee.profileImg || "/placeholder.svg"}
                  alt="profile pic"
                  className="all-employee-profile-pic"
                />
                <span className="whitespace-nowrap">{employee.username}</span>
              </td>

              <td className="p-3 text-sm">{employee.designation}</td>
              <td className="p-3 text-sm text-gray-800">
                {employee.department}
              </td>

              {/* <td className="p-3 text-sm text-gray-800">{employee.status}</td> */}
              <td className="p-3 text-sm flex items-center justify-evenly">
                <img
                  src={view || "/placeholder.svg"}
                  alt="view"
                  className="all-employee-action-icons"
                  onClick={() => navigate(`/profile/${employee._id}`)}
                />
                <img
                  src={edit || "/placeholder.svg"}
                  alt="edit"
                  className="all-employee-action-icons"
                  onClick={() => navigate(`/edit-employee/${employee._id}`)}
                />
                <img
                  src={trash || "/placeholder.svg"}
                  alt="trash"
                  className="all-employee-action-icons"
                  onClick={() => handleDelete(employee._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
