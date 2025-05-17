import React, { useState, useEffect } from "react";
import {
  useAddPayrollMutation,
  useGetPayrollByIdQuery,
  useUpdatePayrollMutation,
} from "../../Redux/api/payrollApi";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./AddPayroll.module.css";

const AddPayroll = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { payrollId } = useParams();
  // console.log("payrollId", payrollId);
  const navigate = useNavigate();
  const isEditing = !!payrollId;

  const { data: payrollData } = useGetPayrollByIdQuery(payrollId, {
    skip: !isEditing,
  });
  // console.log("payrollData", payrollData);

  const [formData, setFormData] = useState({
    employeeId: "",
    ctc: "",
    deductions: "",
    salaryPerMonth: "",
  });

  useEffect(() => {
    if (isEditing && payrollData?.payroll) {
      setFormData({
        employeeId: String(payrollData?.payroll?.employee?.employeeId ?? ""),
        ctc: String(payrollData?.payroll?.ctc ?? "0"),
        deductions: String(payrollData?.payroll?.deductions ?? "0"),
        salaryPerMonth: String(payrollData?.payroll?.salaryPerMonth ?? "0"),
      });
    }
  }, [payrollData, isEditing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [addPayroll] = useAddPayrollMutation();
  const [updatePayroll] = useUpdatePayrollMutation();
  // console.log("formdata : ", formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Data = {
      employeeId: String(formData.employeeId),
      ctc: String(formData.ctc),
      deductions: String(formData.deductions),
      salaryPerMonth: String(formData.salaryPerMonth),
    };

    try {
      // console.log("Data", Data);
      let res;
      var toastid = toast.loading("loading...");
      if (isEditing) {
        await updatePayroll({ id: payrollId, ...Data }).unwrap();
      } else {
        res = await addPayroll(Data).unwrap();
        // console.log("res : ", res);
        // console.log("payid : ", res.newPayroll._id);
      }

      if (res?.newPayroll?._id) {
        localStorage.setItem("payrollId", res.newPayroll._id);
      }
      toast.dismiss(toastid);
      toast.success(
        isEditing
          ? "Payroll updated successfully"
          : "Payroll added successfully"
      );
      localStorage.setItem("refreshPayroll", "true");
      navigate("/payroll");
    } catch (error) {
      console.log("error : ", error);
      toast.dismiss(toastid);
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div
      className={`${styles.payrollSection} ${
        isSubmitted ? `` : `${styles.form} ${styles.payrollSection}`
      } z-0`}
    >
      <div className={styles.add_new_form}>
        <div className={styles.form_content}>
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className={`relative ${styles.payrollForm}`}
          >
            <div className="flex flex-col gap-2 mb-3">
              <div className={styles.payrollHeading}>
                {isEditing ? "Update" : "Add New"} Payroll
              </div>
            </div>

            {/* Row 1 */}
            <div className={`${styles.form_row} md`}>
              <div className={styles.payrollLabel}>
                <label>Employee ID:</label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  className="flex-1 min-w-0 md:min-w-[240px] p-3 rounded-[10px] border border-[rgba(162,161,168,0.20)]"
                  required
                />
              </div>
              <div className={styles.payrollLabel}>
                <label>$CTC:</label>
                <input
                  type="number"
                  name="ctc"
                  value={formData.ctc}
                  onChange={handleInputChange}
                  min="1"
                  className="flex-1 min-w-0 md:min-w-[24px] p-3 rounded-[10px] border border-[rgba(162,161,168,0.20)] "
                  required
                />
              </div>
            </div>
            {/* New Row - Role and Reports To */}
            <div className={styles.form_row}>
              <div className={styles.payrollLabel}>
                <label>$Salary Per Month:</label>
                <input
                  type="number"
                  name="salaryPerMonth"
                  value={formData.salaryPerMonth}
                  onChange={handleInputChange}
                  className="flex-1 min-w-0 md:min-w-[240px] p-3 rounded-[10px] border border-[rgba(162,161,168,0.20)] "
                  required
                />
              </div>
              <div className={styles.payrollLabel}>
                <label>$Deduction:</label>
                <input
                  type="number"
                  name="deductions"
                  value={formData.deductions}
                  onChange={handleInputChange}
                  min="1"
                  className="flex-1 min-w-0 md:min-w-[24px] p-3 rounded-[10px] border border-[rgba(162,161,168,0.20)] "
                  required
                />
              </div>{" "}
            </div>

            <div className={styles.payrollButtonContainer}>
              <button
                onClick={() => navigate("/payroll")}
                className={styles.payrollCancelButton}
              >
                Cancel
              </button>

              <button type="submit" className={styles.payrollSubmitButton}>
                {isEditing ? "Update" : "Submit"}
              </button>
            </div>
          </form>
          {isSubmitted && (
            <div className={styles.modal_overlay}>
              <div className={styles.modal_content}>
                <img
                  src="/public/images/Welcomeback.png"
                  alt="Success"
                  className={styles.success_icon}
                />
                <h3>Your Payroll submit</h3>
                <Link to="/">
                  <button
                    className={styles.dashboard_button}
                    onClick={() => setIsSubmitted(false)}
                  >
                    Go back to Dashboard
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

export default AddPayroll;
