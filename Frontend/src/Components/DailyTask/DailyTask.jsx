import React, { useState } from "react";
import "./DailyTask.css";
import "./Complaints1.css";
import { useDailyTaskMutation } from "../../Redux/api/attendanceApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const DailyTask = () => {
  const [formData, setFormData] = useState({
    teamNo: "",
    name: "",
    employeeId: "",
    numberOfCalls: "",
    numberOfOnboarding: "",
    numberOfHiring: "",
    totalTechTeamHiring: "",

    updatedInGroup: false,
    updatedInSheet: false,
    updateEmailSent: false,
    attendedMeet: false,
    dailyTeamMeet: false,
    additionalTask: "",
    issuesAndIdeas: "",
    teamQueries: "",
  });
  const [dailyTask, { isLoading, isError, error: submissionError }] =
    useDailyTaskMutation();

  if (isError) {
    console.log("error : ", submissionError);
    toast.error(submissionError.data?.message);
  }

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [url, setUrl] = useState("");
  const [url1, setUrl1] = useState("");
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.userReducer);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "number" && !/^\d*$/.test(value)) return;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (!user._id) {
    alert("User is not logged in. Please log in first.");
    return;
  }

  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const isValidURL = (value) => {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleChange1 = (e) => {
    const value = e.target.value;
    setUrl(value);

    if (!isValidURL(value)) {
      setError("Please enter a valid URL (e.g., https://example.com)");
    } else {
      setError("");
    }
  };

  const handleChange2 = (e) => {
    const value = e.target.value;
    setUrl1(value);

    if (!isValidURL(value)) {
      setError("Please enter a valid URL (e.g., https://example.com)");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sanitizedData = {
      ...formData,
      teamNo: Number(formData.teamNo) || 0,
      numberOfCalls: Number(formData.numberOfCalls) || 0,
      numberOfHiring: Number(formData.numberOfHiring) || 0,
      numberOfOnboarding: Number(formData.numberOfOnboarding) || 0,
      totalTechTeamHiring: Number(formData.totalTechTeamHiring) || 0,
      jobPostLink: url,
      specificPostLink: url1,
    };

    // console.log("Submitting data:", {
    //   employee: user._id,
    //   ...sanitizedData,
    // });

    try {
      const response = await dailyTask({
        employee: user._id,
        dailyTask: sanitizedData,
      }).unwrap();

      // console.log("Response:", response);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting daily task:", error);
      toast.error(
        `Failed to submit. Reason: ${error.data?.message || "Unknown error"}`
      );
    }
  };

  const handleCancel = () => {
    setFormData({
      teamNo: "",
      name: "",
      employeeId: "",
      numberOfCalls: "",
      numberOfOnboarding: "",
      numberOfHiring: "",
      totalTechTeamHiring: "",
      jobPostLink: "",
      specificPostLink: "",
      updatedInGroup: false,
      updatedInSheet: false,
      updateEmailSent: false,
      attendedMeet: false,
      dailyTeamMeet: false,
      additionalTask: "",
      issuesAndIdeas: "",
      teamQueries: "",
    });
  };

  return (
    <div
      className={`layout-container relative ${
        isSubmitted ? "" : "form layout-container relative"
      } custom-shadow rounded-md  `}
    >
      <div className="form-container">
        <div className="form-content">
          <form
            onSubmit={handleSubmit}
            className={`relative ${isSubmitted ? "blur h-[500px]" : "form"}`}
          >
            <div className="form-row md">
              <div className="dailyTaskLabel">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="dailyTaskLabel">
                <label>Employee ID:</label>
                <input
                  type="number"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-row md">
              <div className="dailyTaskLabel">
                <label>Hiring:</label>
                <input
                  type="number"
                  name="numberOfHiring"
                  value={formData.numberOfHiring}
                  onChange={handleInputChange}
                  placeholder="No of Hiring"
                />
              </div>
              <div className="dailyTaskLabel">
                <label>Team Number:</label>
                <input
                  type="number"
                  name="teamNo"
                  value={formData.teamNo}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-row md">
              <div className="dailyTaskLabel">
                <label>Number of Calls:</label>
                <input
                  type="number"
                  name="numberOfCalls"
                  value={formData.numberOfCalls}
                  onChange={handleInputChange}
                />
              </div>
              <div className="dailyTaskLabel">
                <label>Designation:</label>
                <input
                  type="number"
                  name="numberOfOnboarding"
                  value={formData.numberOfOnboarding}
                  onChange={handleInputChange}
                />
              </div>
              <div className="dailyTaskLabel">
                <label>Tech Team Hiring:</label>
                <input
                  type="number"
                  name="totalTechTeamHiring"
                  value={formData.totalTechTeamHiring}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-row md">
              <div className="dailyTaskLabel">
                <label>Enter URL:</label>
                <input
                  type="text"
                  placeholder="https://example.com"
                  value={url}
                  onChange={handleChange1}
                />
              </div>
              <div className="dailyTaskLabel">
                <label>Enter URL 1:</label>
                <input
                  type="text"
                  placeholder="https://example.com"
                  value={url1}
                  onChange={handleChange2}
                />
              </div>
            </div>
            <div className="form-row md">
              <div className="dailyTaskLabel">
                <label>Any issues or ideas you would like to share:</label>
                <input
                  className="additionalTask"
                  type="text"
                  name="additionalTask"
                  value={formData.additionalTask}
                  onChange={handleInputChange}
                />
              </div>
              <div className="dailyTaskLabel">
                <label>Enter URL 1:</label>
                <input
                  type="text"
                  placeholder="https://example.com"
                  value={url1}
                  onChange={handleChange2}
                />
              </div>
            </div>
            <div className="form-row md">
              <div className="dailyTaskLabel">
                <label>Mention Clarification on new hiring guidelines</label>
                <input
                  className="additionalTask"
                  type="text"
                  name="teamQueries"
                  value={formData.teamQueries}
                  onChange={handleInputChange}
                />
              </div>
              <div className="dailyTaskLabel">
                <label>Mention any additional Task you want to add</label>
                <input
                  className="additionalTask"
                  type="text"
                  name="issuesAndIdeas"
                  value={formData.issuesAndIdeas}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { id: "updatedInGroup", label: "Updated in Group" },
                { id: "updatedInSheet", label: "Updated the Sheet" },
                { id: "updateEmailSent", label: "Update email sent" },
                { id: "attendedMeet", label: "Update attended Meet" },
                { id: "dailyTeamMeet", label: "daily team meet" },
              ].map((item) => (
                <div
                  key={item.id}
                  className="toggle-container flex items-center space-x-4 cursor-pointer"
                  onClick={() =>
                    handleToggleChange({
                      target: {
                        name: item.id,
                        checked: !formData[item.id],
                      },
                    })
                  }
                >
                  <label htmlFor={item.id} className="text-gray-700">
                    {item.label}
                  </label>

                  <input
                    type="checkbox"
                    name={item.id}
                    id={item.id}
                    checked={formData[item.id]}
                    readOnly
                    className="opacity-0 absolute"
                  />

                  <div
                    className={`w-6 h-6  shrink-0 rounded-full border-2 flex items-center justify-center ${
                      formData[item.id]
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-400"
                    }`}
                  >
                    {formData[item.id] && (
                      <svg
                        className="w-4 h-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 16.2l-4.2-4.2-1.4 1.4L9 19l12-12-1.4-1.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>

                  <span>{formData[item.id] ? "Yes" : "No"}</span>
                </div>
              ))}
            </div>
            <div className="form-actions relative lg:bottom-1">
              <button
                type="button"
                onClick={handleCancel}
                className="cancel-button"
              >
                Cancel
              </button>

              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>
          </form>
          {isSubmitted && (
            <div className="modal-overlay">
              <div className="modal-content">
                <img
                  src="/public/images/Welcomeback.png"
                  alt="Success"
                  className="success-icon"
                />
                <h3>Your Daily Task submit</h3>
                <Link to="/">
                  <button
                    className="dashboard-button"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Go back to dashboard
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyTask;
