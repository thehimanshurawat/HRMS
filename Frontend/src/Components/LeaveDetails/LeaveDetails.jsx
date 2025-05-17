import React, { useEffect, useState } from "react";
import LeaveRow from "./LeaveRow";
import "../myProfile/MyProfile.css";
import {
  useEmployeeLeaveQuery,
  useSubmitLeaveMutation,
} from "../../Redux/api/leaveApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const LeaveDetails = ({ employee }) => {
  const empId = employee?._id;
  const { user } = useSelector((state) => state.userReducer);
  // console.log("user", user?._id);
  const { data } = useEmployeeLeaveQuery(empId);
  const [submitLeave, { isError, error, isLoading }] = useSubmitLeaveMutation();

  const [leaveData, setLeaveData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
  });

  // console.log(" Data:", data);
  // console.log("leave Data:", leaveData);

  useEffect(() => {
    if (!data) {
      setLeaveData([]);
    } else {
      setLeaveData(data?.leaves);
    }
  }, [data]);

  const formatDateRange = (fromDate, toDate) => {
    const options = { day: "numeric", month: "long" };
    const from = new Date(fromDate).toLocaleDateString("en-US", options);
    const to = new Date(toDate).toLocaleDateString("en-US", options);
    return `${from} - ${to}`;
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await submitLeave(formData).unwrap();
      // console.log("res : ", res);
      if(res?.success){
        toast.success(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Leave Request failed");
    }
    setFormData({
      fromDate: "",
      toDate: "",
      reason: "",
    });
    closePopup();
  };

  return (
    <div
      className="w-full flex flex-col items-start gap-3 sm:gap-4 md:gap-5 font-['Lexend,_-apple-system,_Roboto,_Helvetica,_sans-serif'] text-sm sm:text-base font-light text-black"
      style={{ margin: "0 20px" }}
    >
      {empId === user?._id && (
        <div className="flex w-full leaveButton">
          <button
            className="px-3 py-1 flex items-center justify-center bg-violet-500 text-white rounded mb-3"
            onClick={openPopup}
          >
            Apply for leave
          </button>
        </div>
      )}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[580px] sm:min-w-[700px] md:min-w-[768px] leaveContainer">
          {/* Header Row */}
          <div className="flex w-full items-start justify-start flex-wrap border-b border-[rgba(162,161,168,0.10)]">
            <div className="w-[100px] sm:w-[120px] md:w-[132px] py-2 sm:py-2.5 pr-2 sm:pr-2.5 whitespace-nowrap">
              Date
            </div>
            <div className="w-[140px] sm:w-[170px] md:w-[199px] py-2 sm:py-2.5 pr-2 sm:pr-2.5 whitespace-nowrap">
              Duration
            </div>
            <div className="w-[90px] sm:w-[90px] md:w-[90px] py-2 sm:py-2.5 pr-2 sm:pr-2.5 whitespace-nowrap">
              Days
            </div>
            <div className="w-[140px] sm:w-[170px] md:w-[192px] py-2 sm:py-2.5 pr-2 sm:pr-2.5 whitespace-nowrap">
              Reporting Manager
            </div>
            <div className="w-[80px] sm:w-[90px] md:w-[93px] py-2 sm:py-2.5 pr-2 sm:pr-2.5 whitespace-nowrap">
              Status
            </div>

            {empId !== user?._id && (
              <div className="w-[80px] sm:w-[90px] md:w-[53px] py-2 sm:py-2.5 pr-2 sm:pr-2.5 whitespace-nowrap">
                Action
              </div>
            )}
          </div>

          {/* Leave Rows */}
          {leaveData.length > 0 ? (
            leaveData.map((leave, index) => (
              <LeaveRow
                key={index}
                date={leave.createdAt.split("T")[0]}
                days={leave.days}
                duration={formatDateRange(leave.fromDate, leave.toDate)}
                manager={leave.reportingManager?.username}
                status={leave.leaveStatus}
                empId={empId}
                userId={user?._id}
                leaveId={leave._id}
              />
            ))
          ) : (
            <p className="text-center py-2">No attendance records found.</p>
          )}
        </div>
      </div>

      {/* Popup Form */}
      {isPopupOpen && (
        <div className="fixed inset-0  backdrop-blur-xl flex items-center justify-center z-50  ">
          <div className="bg-white rounded-lg w-full max-w-md m-8 shadow-lg  popup-container">
            <h2 className="text-xl font-medium mb-4 flex justify-center">
              Apply for Leave
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  From Date
                </label>
                <input
                  type="date"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  To Date
                </label>
                <input
                  type="date"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Reason</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="flex justify-evenly gap-3">
                <button
                  type="button"
                  onClick={closePopup}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-violet-500 text-white rounded"
                  disabled={isLoading}
                >
                  Apply for Leave
                </button>
              </div>
            </form>
          </div>
          {/* Backdrop click handler */}
          <div className="absolute inset-0 z-[-1]" onClick={closePopup}></div>
        </div>
      )}
    </div>
  );
};

export default LeaveDetails;
