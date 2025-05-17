import React, { useEffect, useState } from "react";
import { useEmployeeDetailsQuery, useUpdateEmployeeMutation } from "../../Redux/api/employeeApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Handle empty/null values
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
};

const EditEmployee = () => {
  const { id } = useParams();
  // console.log(id);

  const [formData, setFormData] = useState({
    employeeId: "",
    userName: "",
    email: "",
    department: "",
    designation: "",
    role: "",
    reportsTo: "",
    teamNo: "",
    tenure: "",
    joiningDate: "",
    phoneNo : ""
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { data: empData, isError, error } = useEmployeeDetailsQuery(id);
  // console.log("empData : ", empData);

  const employee = empData?.employee;
  const [updateEmployee, {isLoading}] = useUpdateEmployeeMutation();

  useEffect(() => {
    if (empData?.employee && !isLoading) {
      setFormData({
        employeeId: empData.employee.employeeId || "",
        userName: empData.employee.username || "",
        email: empData.employee.email || "",
        phoneNo: empData.employee.phoneNo || "",
        department: empData.employee.department || "",
        designation: empData.employee.designation || "",
        role: empData.employee.role || "",
        reportsTo: empData.employee.reportsTo?.employeeId ?? "N/A",
        tenure: empData.employee.tenure || "",
        joiningDate: formatDate(empData.employee.joiningDate) || "",
        teamNo: empData.employee.teamNo || 0,
      });
      setProfileImage(empData.employee.profileImg);
      setImagePreview(empData.employee.profileImg);
    }
  }, [empData, isLoading, id]);
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const updatedData = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            updatedData.append(key, value);
        });

        if (profileImage && profileImage instanceof File) {
            updatedData.append("profileImg", profileImage);
        }

        const res = await updateEmployee({empId : id, updateData : updatedData});
        // console.log("res : ", res);
        if("error" in res){
          toast.error(res.error?.data?.message || "Updation failed");
          return;
        }
        else{
          toast.success("Employee updated successfully!");
          navigate(`/profile/${id}`);
        }
    } catch (error) {
        console.error("Update error:", error);
        toast.error(error?.data?.message || "Failed to update employee");
    }
  };
  
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin ml-4" />
      </div>
    );

  if(isError){
    console.log("error : ", error);
    toast.error(error.data.message);
    return <p>Error: {error.message}</p>;
  }

  const handleCancel = () => {
    navigate(`/profile/${employee._id}`)
  };

  return (
    <div className="relative font-['Lexend'] text-base font-light w-full min-h-screen top-5 overflow-x-hidden px-4 md:px-6">
      <div className="rounded-[10px] border border-[rgba(162,161,168,0.20)] min-h-[545px] w-full relative">
        <div className="relative z-[1] flex w-full flex-col p-4 md:p-6">
          {/* Tab Bar */}
          <div className="flex flex-col w-full py-[1px] items-start text-[#000001] font-semibold mb-8">
            <div className="flex items-start gap-5 w-full">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 flex">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 7H4C3.44772 7 3 7.44772 3 8V19C3 19.5523 3.44772 20 4 20H20C20.5523 20 21 19.5523 21 19V8C21 7.44772 20.5523 7 20 7Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 7V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-base max-[357px]:text-[0.8rem]">
                  Professional Information
                </span>
              </div>
            </div>

            <div className="mt-2 w-full max-w-[236px] h-[3px] bg-[#7152F3] z-10 sm:ml-0" />
            <div className="w-full h-[1px] bg-[rgba(162,161,168,0.20)]" />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="w-full text-[#010101] flex flex-col gap-3 mt-3"
          >
            {/* Profile Image Upload */}
            <div className="flex flex-col gap-2 mb-3">
              <div className="text-sm text-[#A2A1A8]">Profile Image</div>
              <div className="flex items-center max-[400px]:gap-2 min-[400px]:gap-4">
                <div className="w-[100px] h-[100px] max-[400px]:h-[70px] max-[400px]:w-[70px] rounded-[10px] border border-[rgba(162,161,168,0.20)] overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                          fill="#A2A1A8"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1 min-w-[100px]">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      name="profileImg"
                    />
                    <span className="inline-block px-4 py-2 rounded-[10px] bg-[#7152F3] text-white text-sm max-[400px]:text-[7px]">
                      Upload Image
                    </span>
                  </label>
                  <p className="text-xs text-[#A2A1A8] max-[400px]:text-[8px]">
                    Maximum file size: 2MB
                    <br />
                    Formats: JPG, PNG
                  </p>
                </div>
              </div>
            </div>

            {/* Row 1 */}
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                placeholder="Employee ID"
                className="flex-1 min-w-0 md:min-w-[240px] p-3 rounded-[10px] border border-[rgba(162,161,168,0.20)]"
                required
              />
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                placeholder="User Name"
                className="flex-1 min-w-0 md:min-w-[240px] p-3 rounded-[10px] border border-[rgba(162,161,168,0.20)] "
                required
              />
            </div>

            {/* Row 2 */}
            <div className="flex flex-col md:flex-row gap-3 justify-end">
              <select
                name="employeeType"
                value={formData.employeeType}
                onChange={handleInputChange}
                className={`flex-1 min-w-0 md:min-w-[240px] p-3 rounded-[10px] border border-[rgba(162,161,168,0.20)]
                  appearance-none bg-[url('https://cdn.builder.io/api/v1/image/assets/TEMP/b8e3ff633edd90edc64908025680b1259825114553637295cab1fb0526abb187')]
                  bg-no-repeat bg-[position:right_1rem_center] bg-[length:24px]
                  ${formData.employeeType ? "text-black" : "text-[#cecbcc]"}`}
                required
              >
                <option value="" disabled hidden>
                  Select Employee Type
                </option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
              </select>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="flex-1 min-w-0 md:min-w-[240px] p-3 rounded-[10px] border border-[rgba(162,161,168,0.20)] "
                required
              />
            </div>

            {/* Row 3 */}
            <div className="flex flex-col md:flex-row gap-3">
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className={`flex-1 min-w-0 md:min-w-[240px] p-3 rounded-[10px] border border-[rgba(162,161,168,0.20)]
                  appearance-none bg-[url('https://cdn.builder.io/api/v1/image/assets/TEMP/b8e3ff633edd90edc64908025680b1259825114553637295cab1fb0526abb187')]
                  bg-no-repeat bg-[position:right_1rem_center] bg-[length:24px]
                  ${formData.department ? "text-black" : "text-[#cecbcc]"}`}
                required
              >
                <option value="" disabled hidden>
                  Select Department
                </option>
                <option value="it">IT</option>
                <option value="hr">HR</option>
                <option value="finance">Finance</option>
                <option value="marketing">Marketing</option>
              </select>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                placeholder="Enter Designation"
                className="flex-1 min-w-0 md:min-w-[240px] p-3 rounded-[10px] border border-[rgba(162,161,168,0.20)] "
                required
              />
            </div>

            {/* New Row - Role and Reports To */}
            <div className="flex flex-col md:flex-row gap-3">
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className={`flex-1 min-w-0 md:min-w-[240px] p-3 rounded-[10px] border border-[rgba(162,161,168,0.20)]
                  appearance-none bg-[url('https://cdn.builder.io/api/v1/image/assets/TEMP/b8e3ff633edd90edc64908025680b1259825114553637295cab1fb0526abb187')]
                  bg-no-repeat bg-[position:right_1rem_center] bg-[length:24px]
                  ${formData.role ? "text-black" : "text-[#cecbcc]"}`}
                required
              >
                <option value="" disabled hidden>
                  Select Role
                </option>
                <option value="HR Associate">HR</option>
                <option value="Sr. HR Associate">SR. HR</option>
                <option value="Manager">Manager</option>
              </select>
              <input
                type="text"
                name="reportsTo"
                value={formData.reportsTo}
                onChange={handleInputChange}
                placeholder="Reports To"
                className="flex-1 min-w-0 md:min-w-[240px] p-3 rounded-[10px] border border-[rgba(162,161,168,0.20)] "
                required
              />
            </div>

            {/* Row 4 */}
            <div className="flex flex-col md:flex-row gap-3">
              <select
                name="tenure"
                value={formData.tenure}
                onChange={handleInputChange}
                className={`flex-1 min-w-0 md:min-w-[240px] p-3 rounded-[10px] border border-[rgba(162,161,168,0.20)]
                appearance-none bg-[url('https://cdn.builder.io/api/v1/image/assets/TEMP/b8e3ff633edd90edc64908025680b1259825114553637295cab1fb0526abb187')]
                bg-no-repeat bg-[position:right_1rem_center] bg-[length:24px]
                ${formData.tenure ? "text-black" : "text-[#cecbcc]"}`}
                required
              >
                <option value="" disabled hidden>
                  Select Tenure
                </option>
                <option value="1">1 Year</option>
                <option value="2">2 Years</option>
                <option value="3">3 Years</option>
                <option value="4">4+ Years</option>
              </select>


              <input
                type="text"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleInputChange}
                onFocus={(e) => {
                  e.target.type = "date";
                  e.target.classList.add("text-black");
                }}
                onBlur={(e) => {
                  if (!e.target.value) {
                    e.target.type = "text";
                    e.target.classList.remove("text-black");
                  }
                }}
                placeholder="Select Joining Date"
                className="flex-1 min-w-0 md:min-w-[240px] p-3 rounded-[10px] border border-[rgba(162,161,168,0.20)] "
                required
              />
             
            </div>


            {/* New Row - Team Number */}
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="number"
                name="teamNo"
                value={formData.teamNo}
                onChange={handleInputChange}
                placeholder="Team Number"
                min="1"
                className="flex-1 min-w-0 md:min-w-[24px] p-3 rounded-[10px] border border-[rgba(162,161,168,0.20)] "
                required
              />
              
              <input
              type="text"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleInputChange}
              placeholder="Enter Contact Number"
              className="flex-1 min-w-0 md:min-w-[24px] p-3 rounded-[10px] border border-[rgba(162,161,168,0.20)]"
              required
              />
              
            </div>

            {/* Action Buttons */}

            <div className="flex flex-row mt-8 gap-3 justify-end w-full">
              <button
                type="button"
                onClick={handleCancel}
                className="h-[50px] min-w-[70px] w-[91px] px-3 py-2 rounded-lg  border border-gray-300 text-black
              hover:bg-gray-100 transition-colors text-sm sm:text-base"
                style={{ borderRadius: "10px" }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="h-[50px] min-w-[70px] w-[91px] px-3 py-2 rounded-lg border bg-[#7152F3] text-white
              hover:bg-[#5b3ed9] transition-colors text-sm sm:text-base"
                disabled = {isLoading}
                style={{ borderRadius: "10px" }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
