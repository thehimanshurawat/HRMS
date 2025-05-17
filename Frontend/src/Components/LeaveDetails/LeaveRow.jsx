import React from "react";
import LeaveStatusBadge from "./LeaveStatusBadge";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Importing React Icons
import { useParams } from "react-router-dom";
import { useUpdateLeaveStatusMutation } from "../../Redux/api/leaveApi";
import { toast } from "react-toastify";

const LeaveRow = ({
  date,
  duration,
  days,
  manager,
  status,
  onApprove,
  onReject,
  empId,
  userId,
  leaveId
}) => {

  const [updateLeaveStatus, {isLoading, isError, error}] = useUpdateLeaveStatusMutation();

  if(isError){
    console.log("error : ", error);
    toast.error(error.data.message)
  }

  const onApproveHandler = async (leaveId, status) => {
    const res = await updateLeaveStatus({ leaveId, status}).unwrap();
    toast.success(res.message);
  }
  const onRejectHandler = async (leaveId, status) => {
    const res = await updateLeaveStatus({leaveId, status}).unwrap();    
    toast.success(res.message);
  }

  return (
    <div className="flex w-full items-start justify-start flex-wrap border-b border-[rgba(162,161,168,0.10)] mt-2 sm:mt-2.5">
      <div className="w-[100px] sm:w-[120px] md:w-[132px] py-2 sm:py-2.5 pr-2 sm:pr-2.5 text-sm sm:text-base">
        {date}
      </div>
      <div className="w-[140px] sm:w-[170px] md:w-[199px] py-2 sm:py-2.5 pr-2 sm:pr-2.5 text-sm sm:text-base">
        {duration}
      </div>
      <div className="w-[90px] sm:w-[90px] md:w-[90px] py-2 sm:py-2.5 pr-2 sm:pr-2.5 text-sm sm:text-base">
        {days}
      </div>
      <div className="w-[140px] sm:w-[170px] md:w-[192px] py-2 sm:py-2.5 pr-2 sm:pr-2.5 text-sm sm:text-base">
        {manager}
      </div>
      {status && (
        <div className="w-[80px] sm:w-[90px] md:w-[93px] py-2 sm:py-2.5 pr-2 sm:pr-2.5 flex items-start gap-2.5">
          <LeaveStatusBadge status={status} />
        </div>
      )}
      {empId !== userId && (
        <div className="flex gap-2 items-center py-2 sm:py-2.5">
          <button
            onClick={() => onApproveHandler(leaveId, "Approved")}
            className="text-green-600 hover:text-green-800"
          >
            <FaCheckCircle size={20} />
          </button>
          <button
            onClick={() => onRejectHandler(leaveId, "Rejected")}
            className="text-red-600 hover:text-red-800"
          >
            <FaTimesCircle size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default LeaveRow;
