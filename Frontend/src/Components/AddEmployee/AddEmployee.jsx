import React, { useState } from "react";
import { useCreateEmployeeMutation } from "../../Redux/api/employeeApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../AllEmployee/AllEmployee.css";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    username: "",
    email: "",
    department: "",
    designation: "",
    role: "",
    reportsTo: "",
    teamNo: "",
    tenure: "",
    joiningDate: "",
    phoneNo: "",
    profileImage: null,
    employeeType: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  const [createEmployee, { isLoading, isError, error }] =
    useCreateEmployeeMutation();

  if (isError) {
    console.log("error : ", error);
    toast.error(error.data.message);
    navigate("/employees");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("Form submitted:", formData);

    const employeeData = new FormData();

    employeeData.set("employeeId", formData.employeeId);
    employeeData.set("username", formData.username);
    employeeData.set("email", formData.email);
    employeeData.set("department", formData.department);
    employeeData.set("designation", formData.designation);
    employeeData.set("role", formData.role);
    employeeData.set("reportsTo", formData.reportsTo);
    employeeData.set("teamNo", formData.teamNo);
    employeeData.set("tenure", formData.tenure);
    employeeData.set("joiningDate", formData.joiningDate);
    employeeData.set("profileImg", profileImage);
    employeeData.set("phoneNo", formData.phoneNo);

    try {
      const res = await createEmployee(employeeData);
      // console.log("res : ", res);
      if ("data" in res) {
        toast.success("Employee Created Successfully");
        navigate("/employees");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log("error : ", error);
    }
  };

  const handleCancel = () => {
    setFormData({
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
      phoneNo: "",
    });
    setProfileImage(null);
    setImagePreview(null);
    navigate("/employees");
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
              <div className="employeeLabel">
                <label>Employee ID</label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  className="flex-1 min-w-0 md:min-w-[240px] p-3 rounded-[10px] border border-[rgba(162,161,168,0.20)]"
                  required
                />
              </div>
              <div className="employeeLabel">
                <label>User Name</label>
                <input
                  type="text"
                  name="username"
                  value={formData.userName}
                  onChange={handleInputChange}
                  className="flex-1 min-w-0 md:min-w-[240px] p-3 rounded-[10px] border border-[rgba(162,161,168,0.20)] "
                  required
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="employeeLabel">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="flex-1 min-w-0 md:min-w-[240px] p-3 rounded-[10px] border border-[rgba(162,161,168,0.20)] "
                  required
                />
              </div>
              <div className="employeeLabel">
                <label>Contact Number</label>
                <input
                  type="number"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleInputChange}
                  className="flex-1 min-w-0 md:min-w-[24px] p-3 rounded-[10px] border border-[rgba(162,161,168,0.20)]"
                  required
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="employeeLabel">
                <label>Department</label>
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
                    Select
                  </option>
                  <option value="it">IT</option>
                  <option value="hr">HR</option>
                  <option value="finance">Finance</option>
                  <option value="marketing">Marketing</option>
                </select>
              </div>
              <div className="employeeLabel">
                <label>Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className="flex-1 min-w-0 md:min-w-[240px] p-3 rounded-[10px] border border-[rgba(162,161,168,0.20)] "
                  required
                />
              </div>
            </div>

            {/* New Row - Role and Reports To */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="employeeLabel">
                <label>Role</label>
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
                  <option value="Employee">Employee</option>
                  <option value="HR Associate">HR</option>
                  <option value="Sr. HR Associate">SR. HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Sr. Manager">Sr. Manager</option>
                </select>
              </div>
              <div className="employeeLabel">
                <label>Report To</label>
                <input
                  type="text"
                  name="reportsTo"
                  value={formData.reportsTo}
                  onChange={handleInputChange}
                  className="flex-1 min-w-0 md:min-w-[240px] p-3 rounded-[10px] border border-[rgba(162,161,168,0.20)] "
                  required
                />
              </div>
            </div>

            {/* Row 4 */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="employeeLabel">
                <label>Tenure</label>
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
                    Select
                  </option>
                  <option value="60">2 Month</option>
                  <option value="90">3 Month</option>
                  <option value="120">4 Month</option>
                  <option value="180">6 Month</option>
                </select>
              </div>
              <div className="employeeLabel">
                <label>Team Number</label>
                <input
                  type="number"
                  name="teamNo"
                  value={formData.teamNo}
                  onChange={handleInputChange}
                  min="1"
                  className="flex-1 min-w-0 md:min-w-[24px] p-3 rounded-[10px] border border-[rgba(162,161,168,0.20)] "
                  required
                />
              </div>
            </div>

            {/* New Row - Team Number */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="employeeLabel">
                <label>Joining Date</label>
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
                  placeholder="Select"
                  className="flex-1 min-w-0 md:min-w-[240px] p-3 rounded-[10px] border border-[rgba(162,161,168,0.20)] "
                  required
                />
              </div>
              <div className="employeeLabel">
                <input type="text" disabled />
              </div>
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
                className="h-[50px] min-w-[70px] w-[91px] px-4 py-2 rounded-lg border bg-[#7152F3] text-white
              hover:bg-[#5b3ed9] transition-colors text-sm sm:text-base"
                disabled={isLoading}
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

export default AddEmployee;
