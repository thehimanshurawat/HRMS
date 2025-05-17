import React from "react";
import  { useState, useEffect } from "react";
import "./Setting.css";
// import { FaBell, FaUserCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Settings = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "Light");
  const [language, setLanguage] = useState("English");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme.toLowerCase());
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "Light";
    setTheme(savedTheme);
    document.body.setAttribute("data-theme", savedTheme.toLowerCase());
  }, []);

  return (
    <div className="settings-container ">
      {/* <aside className="sidebar">
        <h2 className="logo">HRMS</h2>
        <ul>
          <li>Dashboard</li>
          <li>All Employees</li>
          <li>All Departments</li>
          <li>Attendance</li>
          <li>Payroll</li>
          <li>Jobs</li>
          <li>Candidates</li>
          <li>Complaints</li>
          <li className="active">Settings</li>
        </ul>
      </aside> */}

      <main className="settings-main">
        {/* <header className="setting-header">
          <h2>Settings</h2>
          <p>All System Settings</p>
        </header> */}

        <section className="settings-content">
          <div className="setting-item">
            <div className="item">
              <label>Appearance</label>
              <p>Customize how your theme looks on your device</p>
            </div>

            {/* <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option>Light</option>
              <option>Dark</option>
            </select> */}
            <div className="theme-toggle">
              <span>Dark Mode </span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={theme === "Dark"}
                  onChange={() =>
                    setTheme(theme === "Light" ? "Dark" : "Light")
                  }
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          {/* <div className="setting-item">
            <div className="item">
              {" "}
              <label>Language</label>
              <p>Select your language</p>
            </div>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option>English</option>
              <option>Spanish</option>
            </select>
          </div> */}

          {/* <div className="switches">
          <div
            className="form-check form-switch"
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "10px",
              marginBottom:"25px",
            }}
          >
            <div>
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
            <div className="label-div">
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                Two-factor Authentication
              </label>
              <p>Keep your account secure by enabling 2FA via mail</p>
            </div>
          </div>
          <div
            className="form-check form-switch"
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "10px",
              marginBottom:"25px",
            }}
          >
            <div>
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
            <div>
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
              Mobile Push Notifications
              </label>
              <p>Receive push notification</p>
            </div>
          </div>
          <div
            className="form-check form-switch"
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "10px",
              marginBottom:"25px",
            }}
          >
            <div>
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
            <div>
              <label className="form-check-label"  htmlFor="flexSwitchCheckDefault">
              Desktop Notification
              </label>
              <p>Receive push notification on desktop</p>
            </div>
          </div>
          <div
            className="form-check form-switch"
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "10px",
              marginBottom:"25px",
            }}
          >
            <div>
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
            <div>
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
              Email Notifications
              </label>
              <p>Receive email notification</p>
            </div>
          </div>
          </div> */}
        </section>
      </main>
    </div>
  );
};

export default Settings;
