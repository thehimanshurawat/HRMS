import React, { useState } from "react";
import "./Complaints.css";
// import Sidebar from "../../Components/Sidebar/Sidebar";
import {
  useAllComplaintsQuery,
  useSubmitComplaintMutation
} from "../../Redux/api/complaintsApi";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Complaints = () => {
  const [category, setCategory] = useState("");
  const [concern, setConcern] = useState("");
  const [files, setFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setloading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [submitComplaint] = useSubmitComplaintMutation();
  const navigate=useNavigate();

  const handleFileChange = (e) => {
    if (!e.target.files.length) return;

    const selectedFiles = Array.from(e.target.files);

    // Generate preview URLs
    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));

    setFiles(selectedFiles); // Store file objects
    setPreviews(previewUrls);
  };

  const validateForm = () => {
    let newErrors = {};
    if (!category) newErrors.category = "Please select a category";
    if (!concern.trim()) newErrors.concern = "Please describe your concern";
    if (!files.length) newErrors.file = "Please upload a document";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    setloading(true);
    e.preventDefault();
    if (!validateForm()){
      setloading(false);
      return;
    };

    setloading(true);
    const formData = new FormData();
    formData.append("subject", category.trim());
    formData.append("description", concern.trim());
    files.forEach((file) => formData.append("documents", file));

    try {
    const response=  await submitComplaint(formData).unwrap();
    // console.log("response : ",response);

      setIsModalOpen(true);
      setCategory("");
      setConcern("");
      setFiles([]);
      setPreviews([]);
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast.error("Error Submitting Form");
    }
    setloading(false);
  };

  return (
    <div className="">
      {/* <div>
        <Sidebar/>
        </div> */}
      <div className=" mx-auto rounded-lg shadow-md border border-gray-300 max-w-full max-[330px]:text-[8px] attendance">
        {/* <header className="complaints-header">
        <h2>Complaints</h2>
        <p>Speak up: We're here to listen and resolve </p>
     </header> */}

        <div className="complaints-container">
          <div className="box">
            <p className="description">
              At TEN, we prioritize a positive, respectful, and inclusive
              environment for all our team members, including interns. We
              understand that challenges can arise during your internship, and
              we are here to listen and help. If you are facing any issues, we
              encourage you to share them with us, so we can resolve them
              promptly.
            </p>
            <hr />

            <form onSubmit={handleSubmit} className="complaints-form">
              <label className="category">Choose the Category</label>
              <div className="select-wrapper">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={errors.category ? "error-border" : ""}
                >
                  <option value="">Select the category</option>
                  <option value="workplace">Workplace</option>
                  <option value="payroll">Payroll</option>
                  <option value="harassment">Harassment</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {errors.category && (
                <p className="error-message">{errors.category}</p>
              )}
              <hr />
              <label>Describe your concern</label>
              <textarea
                placeholder="Please explain your concern in detail here..."
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
                className={errors.concern ? "error-border" : ""}
              ></textarea>
              {errors.concern && (
                <p className="error-message">{errors.concern}</p>
              )}
              <hr />
              <label>Upload supporting Document</label>
              <span className="upload-text">Any evidence or file</span>
              <input
                type="file"
                multiple
                placeholder="Upload Document"
                onChange={handleFileChange}
                className={errors.file ? "error-border" : "cursor-pointer"}
              />
              {/* Show image previews */}
              {previews.length > 0 && (
                <div className="preview-container">
                  {previews.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Preview ${index}`}
                      className="h-40 w-60"
                    />
                  ))}
                </div>
              )}

              {errors.file && <p className="error-message">{errors.file}</p>}

              <br></br>
              {!loading == false ? (
                <button>
                  <div className="loader"></div>
                </button>
              ) : (
                <div className="flex gap-2 ">
                <button type="submit">Submit</button>
                <button onClick={()=>navigate('/complaintPage')}>Cancel</button>

                </div>
              )}

            </form>
            {isModalOpen && (
              <div className="modal-overlay ">
                <div className="modal-content bg-white">
                  <img
                    src="/Images/Welcomeback.png"
                    alt="Success"
                    className="success-icon"
                  />
                  <h3>
                    Your Complaint is submitted Soon we will get back to you.
                  </h3>
                  <button
                    className="dashboard-button "
                    onClick={() => setIsModalOpen(false)}
                  >
                    Go back to dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaints;
