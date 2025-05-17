import React from "react";
import { useParams } from "react-router-dom";
import { useEmployeeDetailsQuery } from "../../Redux/api/employeeApi";
import SideOption from "./SideOption";
import MyProfileDetails from "./MyProfileDetails";

const LayoutFile = ({ children }) => {
  const { empId } = useParams();
  // console.log("empId", empId);

  const {
    data: empData,
    isLoading,
    isError,
    error,
  } = useEmployeeDetailsQuery(empId);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin ml-4" />
      </div>
    );
  if (isError) {
    console.log("log error", error);
    return <p className="my-4 text-2xl font-bold text-center">Error: {error?.data?.message}</p>;
  }

  console.log("emp data : ", empData)
  const { employee } = empData;


  return (
    <div className=" mt-[132px] lg:ml-[330px]">
      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 p-2 xs:ml-3 sm:ml-3">
        {/* Profile Section */}
        <MyProfileDetails employee={employee} />

        {/* Sidebar + Content Wrapper */}
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-0">
          {/* Sidebar */}
          <div className="w-full md:w-[30%]">
            <SideOption employee={employee} />
          </div>

          {/* Content (Children) - Adjust width for responsiveness */}
          <div className="w-full md:w-[65%]">
            {React.Children.map(children, (child) =>
              React.cloneElement(child, { employee })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutFile;
