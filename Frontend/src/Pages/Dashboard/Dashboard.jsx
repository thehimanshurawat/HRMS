/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "react-calendar/dist/Calendar.css";
import classNames from "classnames";
import { useDashboardDataQuery } from "../../Redux/api/dashboardApi";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useSelector((state) => state.userReducer);

  if (user.role === "Employee") {
    return <Navigate to={"/user-dashboard"} />;
  }

  const { data: dashboardData, isError, error } = useDashboardDataQuery();
  // console.log("dashboard data : ", dashboardData);

  if (isError) {
    console.log("error : ", error);
  }

  // Will run every time the user state changes

  const [stats, setStats] = useState({
    attendance: 0,
    department: 0,
    employee: 0,
    team: 0,
    todayTodos: [],
  });

  const [graphData, setGraphData] = useState([]);

  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    if (dashboardData) {
      setStats(dashboardData);
      setGraphData(dashboardData.attendance?.attendanceData);
    }
  }, [dashboardData]);
  // console.log("stats : ", stats);
  // console.log("graph: ", graphData);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    taskName: "",
    date: "",
  });
  const [tasks, setTasks] = useState(
    localStorage.getItem("tasks")?.length > 0
      ? JSON.parse(localStorage.getItem("tasks"))
      : []
  );
  const [date, setDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form Data Submitted:", formData);
    if (!formData.taskName || !formData.date) {
      alert("Please fill in all fields!");
      return;
    }

    const newTask = { ...formData };
    const updatedTasks = [...tasks, newTask];

    setTasks(updatedTasks);

    // Store task and dates in localstorage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setFormData({ taskName: "", date: "" });
    setIsOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const xOffset = window.innerWidth > 768 ? 160 : 100; // Adjust based on screen width
  const yOffset = window.innerHeight > 600 ? 30 : 20;

  const handleMouseEnter = (event, dateStr, tasksForDate) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const tooltipWidth = 200;
    const tooltipHeight = 50;
    const padding = 10; // Minimum space from screen edges

    // Default position: centered above the element
    let x = rect.left + window.scrollX - 50;
    let y = rect.top + window.scrollY - tooltipHeight - padding;

    // If tooltip goes off the left edge, position it to the right of the element instead
    if (x < padding) {
      x = rect.right + window.scrollX + padding;
    }
    // If tooltip goes off the right edge, adjust x to keep it within viewport
    if (x + tooltipWidth > window.innerWidth) {
      x = window.innerWidth - tooltipWidth - padding;
    }

    // Adjust vertically: if no space above, place below the element
    if (y < padding) {
      y = rect.bottom + window.scrollY + padding;
    }
    // If tooltip would overflow the bottom, try positioning it above
    if (y + tooltipHeight > window.innerHeight) {
      y = rect.top + window.scrollY - tooltipHeight - padding;
    }

    setTooltipPosition({ x, y });
    setHoveredDate({ dateStr, tasksForDate });
  };

  const handleMouseLeave = () => {
    setHoveredDate(null);
  };

  const handleRemoveTask = (dateStr, taskIndex) => {
    const updatedTasks = [...tasks].filter((task, index) => {
      return !(task.date === dateStr && index === taskIndex);
    });

    setTasks(updatedTasks);
    localStorage.setItem("tasks", updatedTasks);
  };

  const toggleStatus = (id) => {
    // console.log("Toggling status for ID:", id);
    setAttendanceData((prevData) =>
      prevData.map((employee) =>
        employee.id === id
          ? {
              ...employee,
              status: employee.status === "Present" ? "Absent" : "Present",
            }
          : employee
      )
    );
  };

  return (
    <div className="dashboard-container">
      <main className="content">
        <section className="mid-section">
          <section className="stats">
            <div className="stat-card">
              <div className="employee-logo">
                <img src="/Images/Button.png" />
                <h5>Total Employee</h5>
              </div>
              <div className="count">
                <h1>{stats.employee?.totalEmployees}</h1>
                <div
                  className={classNames("stat-card", {
                    profit: stats.employee?.employeeChangePercent >= 0,
                    loss: stats.employee?.employeeChangePercent < 0,
                  })}
                >
                  <img
                    src={
                      stats.employee?.employeeChangePercent >= 0
                        ? "/Images/Vector-1.svg"
                        : "/Images/vector-3.svg"
                    }
                    alt={
                      stats.employee?.employeeChangePercent >= 0
                        ? "Profit Indicator"
                        : "Loss Indicator"
                    }
                  />
                  <p>
                    {Math.abs(stats.employee?.employeeChangePercent).toFixed(2)}
                    %
                  </p>
                </div>
              </div>
              <div className="update">
                <p>Updated at : {new Date().toISOString().split("T")[0]}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="employee-logo">
                <img src="/Images/business.png" />
                <h5>Total Departments</h5>
              </div>
              <div className="count">
                <h1>{stats.department?.totalDepartments}</h1>
                <div
                  className={classNames("stat-card", {
                    profit: stats.department?.departmentChangePercent >= 0,
                    loss: stats.department?.departmentChangePercent < 0,
                  })}
                >
                  <img
                    src={
                      stats.department?.departmentChangePercent >= 0
                        ? "/Images/Vector-1.svg"
                        : "/Images/Vector-3.svg"
                    }
                    alt={
                      stats.department?.departmentChangePercent >= 0
                        ? "Profit Indicator"
                        : "Loss Indicator"
                    }
                  />
                  <p>
                    {Math.abs(
                      stats.department?.departmentChangePercent
                    ).toFixed(2)}
                    %
                  </p>
                </div>
              </div>
              <div className="update">
                <p>Updated at : {new Date().toISOString().split("T")[0]}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="employee-logo">
                <img src="/Images/attendance.png" />
                <h5>Today Attendance</h5>
              </div>
              <div className="count">
                <h1>{stats.attendance?.todayAttendanceCount}</h1>
                <div
                  className={classNames("stat-card", {
                    profit: stats.attendance?.todayAttendancePercentage >= 0,
                    loss: stats.attendance?.todayAttendancePercentage < 0,
                  })}
                >
                  <img
                    src={
                      stats.attendance?.todayAttendancePercentage >= 0
                        ? "/Images/Vector-1.svg"
                        : "/Images/Vector-3.svg"
                    }
                    alt={
                      stats.attendance?.todayAttendancePercentage >= 0
                        ? "Profit Indicator"
                        : "Loss Indicator"
                    }
                  />
                  <p>
                    {Math.abs(
                      stats.attendance?.todayAttendancePercentage
                    ).toFixed(2)}
                    %
                  </p>
                </div>
              </div>
              <div className="update">
                <p>Updated at : {new Date().toISOString().split("T")[0]}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="employee-logo">
                <img src="/Images/projects.png" />
                <h5>Total Teams</h5>
              </div>
              <div className="count">
                <h1>{stats.team?.totalTeamCount}</h1>
                <div
                  className={classNames("stat-card", {
                    profit: stats.team?.teamChangePercent >= 0,
                    loss: stats.team?.teamChangePercent < 0,
                  })}
                >
                  <img
                    src={
                      stats.team?.teamChangePercent >= 0
                        ? "/Images/Vector-1.svg"
                        : "/Images/Vector-3.svg"
                    }
                    alt={
                      stats.team?.teamChangePercent >= 0
                        ? "Profit Indicator"
                        : "Loss Indicator"
                    }
                  />
                  <p>{Math.abs(stats.team?.teamChangePercent).toFixed(2)}%</p>
                </div>
              </div>
              <div className="update">
                <p>Updated at : {new Date().toISOString().split("T")[0]}</p>
              </div>
            </div>
          </section>
          <section className="attendance-overview">
            <h2>Attendance Overview</h2>
            <div style={{ overflowX: "auto", width: "100%" }}>
              <div style={{ minWidth: "600px", height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={graphData} barGap={8} barCategoryGap={15}>
                    <CartesianGrid stroke="none" />
                    <XAxis dataKey="day" />
                    <YAxis
                      domain={[0, 100]}
                      ticks={[0, 20, 40, 60, 80, 100]}
                      tickFormatter={(tick) => `${tick}%`}
                      padding={{ bottom: 20 }}
                    />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Bar
                      dataKey="OnTime"
                      stackId="a"
                      fill=" #7152F3"
                      barSize={12}
                      radius={10}
                      padding={{ bottom: 20 }}
                    />
                    <Bar
                      dataKey="Late"
                      stackId="a"
                      fill=" #FEB85B"
                      barSize={12}
                      radius={10}
                      padding={{ bottom: 20 }}
                    />
                    <Bar
                      dataKey="Absent"
                      stackId="a"
                      fill=" #F45B69"
                      barSize={12}
                      radius={10}
                      padding={{ bottom: 20 }}
                    />
                    <Bar
                      dataKey="Leave"
                      stackId="a"
                      fill=" #49F3D8"
                      barSize={12}
                      radius={10}
                      padding={{ bottom: 20 }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        </section>

        <section className="right-section">
          <section className="calendar">
            <div className="calendar-container">
              <h2>My Schedule</h2>
              <p>Current Time: {currentDate.toDateString()}</p>
              <Calendar
                navigationLabel={({ date, locale }) =>
                  date.toLocaleDateString(locale, {
                    month: "short",
                  })
                }
                onChange={setDate}
                value={date}
                prevLabel={<FaChevronLeft />}
                nextLabel={<FaChevronRight />}
                tileClassName={({ date }) => {
                  const dateStr = date.toLocaleDateString("en-CA");
                  if (date.toDateString() === new Date().toDateString()) {
                    return "today-highlight"; // Purple for current date
                  } else if ([...tasks.map((t) => t.date)].includes(dateStr)) {
                    return "task-highlight";
                  }
                  return "";
                }}
                tileContent={({ date }) => {
                  const dateStr = date.toLocaleDateString("en-CA"); // Convert date to YYYY-MM-DD format
                  const tasksForDate = tasks.filter(
                    (task) => task.date === dateStr
                  );

                  if (tasksForDate?.length > 0) {
                    return (
                      <div
                        className="task-tooltip-wrapper"
                        onClick={(event) =>
                          handleMouseEnter(event, dateStr, tasksForDate)
                        }
                        onMouseLeave={handleMouseLeave}
                      >
                        {/* 🔹 Red Dot for Task Days */}
                        <span className="task-indicator">●</span>

                        {/* 🔹 Tooltip for Task Details */}
                        {hoveredDate?.dateStr === dateStr && (
                          <div
                            className="task-tooltip"
                            style={{
                              top: tooltipPosition.y,
                              left: tooltipPosition.x,
                            }}
                          >
                            {hoveredDate.tasksForDate.map((task, index) => (
                              <div key={index} className="task-item">
                                <div
                                  onClick={() =>
                                    handleRemoveTask(task.date, index)
                                  }
                                  className="remove-task-container"
                                  role="button"
                                  tabIndex={0}
                                >
                                  ❌
                                </div>
                                <p>
                                  <strong>Task Name:</strong> {task.taskName}
                                </p>

                                {/* <p><strong>Employee Name:</strong> {task.employeeName}</p> */}
                                <p>
                                  <strong>Date:</strong> {task.date}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </div>
          </section>
          <div className="container">
            {/* Plus Icon Button */}
            <button onClick={() => setIsOpen(true)} className="plus-button">
              <span>+ </span> Add Time & Task of Respective Person
            </button>

            {/* <div className="task-list">
       
      </div> */}
            {/* Modal */}
            {isOpen && (
              <div className="modal-overlay">
                <div className="modal-container">
                  <h2 className="modal-title">Add Task</h2>
                  <form onSubmit={handleSubmit} className="modal-form">
                    <input
                      type="text"
                      name="taskName"
                      placeholder="Task Name"
                      value={formData.taskName}
                      onChange={handleChange}
                      required
                    />

                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />

                    <div className="modal-buttons">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="cancel-button"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="submit-button">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
