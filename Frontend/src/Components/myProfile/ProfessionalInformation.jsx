import React from "react";
import "./MyProfile.css";

// ✅ Function to format dates like "May 10, 2025"
const formatDate = (dateString) => {
  if (!dateString) return "N/A"; // Handle empty/null values
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};

const InfoField = ({ label, value }) => (
  <div className="w-full sm:w-full flex-1">
    <div className="w-full">
      <div className="text-[#A2A1A8] text-xs sm:text-sm">{label}</div>
      <div className="text-sm sm:text-base mt-[5px] professionalContainer">
        {value || "N/A"} {/* Default to "N/A" if value is null or undefined */}
      </div>
    </div>
    <div className="border border-[rgba(162,161,168,0.1)] bg-[rgba(162,161,168,0.10)] min-h-[1px] mt-2 w-full sm:w-auto sm:max-w-[250px]" />
  </div>
);

const ProfessionalInformation = ({employee}) => {

  if (!employee) {
    return <p className="text-center text-gray-500">No employee data available.</p>;
  }

  const reporterId = employee.reportsTo;
  // console.log(employee);

  // if(reporterId){
  //   const {data, isLoading, isError, error} = useEmployeeDetailsQuery(reporterId);
  
  //   if (isLoading)
  //     return (
  //       <div className="flex justify-center items-center h-screen">
  //         <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin ml-4" />
  //       </div>
  //     );
  //   if (isError) return <p>Error: {error.message}</p>;

  //   console.log(data);

  // }
  
  return (
    <div className="flex w-full flex-col items-start font-['Lexend,_-apple-system,_Roboto,_Helvetica,_sans-serif'] font-light px-4 md:px-12 lg:px-16 xl:px-24 mx-auto">
      {/* Heading Section */}
      <div className="flex w-full flex-col items-start text-xs sm:text-sm md:text-base text-[#000001] font-semibold">
        <div className="flex items-center gap-2">
          <svg
            width="20"
            height="20"
            className="sm:w-6 sm:h-6 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 6H16V4C16 2.89 15.11 2 14 2H10C8.89 2 8 2.89 8 4V6H4C2.89 6 2.01 6.89 2.01 8L2 19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM10 4H14V6H10V4ZM20 19H4V8H20V19Z"
              fill="#010101"
            />
          </svg>
          <span>Professional Information</span>
        </div>
        <div className="bg-[rgba(162,161,168,0.20)] w-full h-[1px] mt-2" />
        <div className="bg-[#7152F3] w-[200px] h-[3px]" />
      </div>

      {/* Employee Information Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 sm:gap-y-6 mt-5 w-full">
        <InfoField label="Employee ID" value={employee.employeeId} />
        <InfoField label="User Name" value={employee.username} />
        <InfoField label="Email Address" value={employee.email} />
        <InfoField label="Phone Number" value={employee.phoneNo} />
        <InfoField label="Department" value={employee.department} />
        <InfoField label="Designation" value={employee.designation} />
        <InfoField label="Team No" value={employee.teamNo} />
        <InfoField label="Role" value={employee.role} />
        <InfoField label="Reports To" value={employee.reportsTo?.username ?? "N/A"} />
        <InfoField label="Tenure" value={`${employee.tenure} days`} />
        <InfoField label="Joining Date" value={formatDate(employee.joiningDate)} />
        <InfoField label="Last Working Date" value={formatDate(employee.lastWorkingDate)} />
      </div> 
    </div>
  );
};

export default ProfessionalInformation;
