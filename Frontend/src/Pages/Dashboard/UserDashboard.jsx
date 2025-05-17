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
import "./UserDashboard.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "react-calendar/dist/Calendar.css";
import { useUserdashboardQuery } from "../../Redux/api/dashboardApi";
const UserDashboard = () => {
	const [stats, setStats] = useState({
		totalLeave: "",
		totalTask: "",
		totalAttendance: "",
		totalProjects: "",
		percentageChange: 0,
	});

	const { data: UserDashboard } = useUserdashboardQuery();
	// console.log("user-dashboard data : ", UserDashboard);

	useEffect(() => {
		if (UserDashboard) {
			setStats(UserDashboard);
		}
	}, [UserDashboard]);
	// console.log("stats", stats);

	const [isOpen, setIsOpen] = useState(false);

	const [formData, setFormData] = useState({
		taskName: "",
		date: "",
	});
	const [tasks, setTasks] = useState([]);
	const [date, setDate] = useState(new Date());
	const [currentDate, setCurrentDate] = useState(new Date());
	const [hoveredDate, setHoveredDate] = useState(null);
	const [tooltipPosition, setTooltipPosition] = useState(null);
	const [taskDates, setTaskDates] = useState([""]);
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
		setTasks((prevTasks) => [...prevTasks, newTask]);
		setTaskDates((prevDates) => [...prevDates, formData.date]);

		setFormData({ taskName: "", date: "" });
		setIsOpen(false);
	};

	const attendanceperweek = UserDashboard?.attendance?.data || [];
	// console.log("attendanceperweek : ", attendanceperweek);

	const data = attendanceperweek.map((item, index) => ({
		week: `${index + 1}st Week`,
		Task: 100,
		Completed: item.onTime,
		Delay: item.delay,
		Absent: item.absent,
	}));

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
		setTasks((prevTasks) =>
			prevTasks.filter(
				(task, index) => !(task.date === dateStr && index === taskIndex)
			)
		);

		setTaskDates((prevDates) => {
			const remainingTasks = tasks.filter(
				(task) => task.date === dateStr
			).length;
			return remainingTasks > 1
				? prevDates
				: prevDates.filter((d) => d !== dateStr);
		});
	};

	return (
		<div className="dashboard-container">
			<main className="content">
				<section className="mid-section">
					<section className="stats">
						<div className="stat-card">
							<div className="employee-logo">
								<img src="/Images/Button.png" />
								<h5>Total Leave</h5>
							</div>
							<div className="count">
								<h1>{stats?.leave?.totalLeave}</h1>
								<div className="vector">
									<img
										src={
											stats.percentageChange >= 0
												? "/Images/Vector-1.svg" // Profit Image
												: "/Images/Vector-1.svg" // Loss Image
										}
										alt={
											stats?.leave?.leaveChangePercent >=
											0
												? "Profit Indicator"
												: "Loss Indicator"
										}
									/>
									<p>{stats?.leave?.leaveChangePercent}%</p>
								</div>
							</div>
							<div className="update">
								<p>Updated at : {currentDate.toISOString().split("T")[0]}</p>
							</div>
						</div>

						<div className="stat-card">
							<div className="employee-logo">
								<img src="/Images/business.png" />
								<h5>Total Task</h5>
							</div>
							<div className="count">
								<h1>{stats?.todo?.totalTodo}</h1>
								<div className="vector">
									<img
										src={
											stats?.todo?.todoChangePercent >= 0
												? "/Images/Vector-1.svg" // Profit Image
												: "/Images/Vector-1.svg" // Loss Image
										}
										alt={
											stats?.todo?.todoChangePercent >= 0
												? "Profit Indicator"
												: "Loss Indicator"
										}
									/>
									<p>{stats?.todo?.todoChangePercent}%</p>
								</div>
							</div>
							<div className="update">
								<p>Updated at : {currentDate.toISOString().split("T")[0]}</p>
							</div>
						</div>

						<div className="stat-card">
							<div className="employee-logo">
								<img src="/Images/attendance.png" />
								<h5>Total Attendance</h5>
							</div>
							<div className="count">
								<h1>
									{stats?.attendance?.weeklyAttendanceCount}
								</h1>
								<div className="vector">
									<img
										src={
											stats?.attendance?.weeklyAttendanceChangePercent >= 0
												? "/Images/Vector-1.svg" // Profit Image
												: "/Images/Vector-1.svg" // Loss Image
										}
										alt={
											stats?.attendance
												?.weeklyAttendanceCount >= 0
												? "Profit Indicator"
												: "Loss Indicator"
										}
									/>
									<p>
										{
											stats?.attendance
												?.weeklyAttendanceChangePercent 
										}
										%
									</p>
								</div>
							</div>
							<div className="update">
								<p>Updated at : {currentDate.toISOString().split("T")[0]}</p>
							</div>
						</div>
						<div className="stat-card">
							<div className="employee-logo">
								<img src="/Images/projects.png" />
								<h5>Total Complaints</h5>
							</div>
							<div className="count">
								<h1>{stats?.complaints?.totalEmployeeComplaint}</h1>
								{/* <div className="vector">
									<img
										src={
											stats.percentageChange >= 0
												? "/public/images/Vector-1.svg" // Profit Image
												: "/public/images/Vector-1.svg" // Loss Image
										}
										alt={
											stats?.project
												?.projectChangePercent >= 0
												? "Profit Indicator"
												: "Loss Indicator"
										}
									/>
									<p>
										{stats?.project?.projectChangePercent}%
									</p>
								</div> */}
							</div>
							<div className="update">
								<p>Updated at : {currentDate.toISOString().split("T")[0]}</p>
							</div>
						</div>
					</section>
					<section className="attendance-overview">
						<h2>Attendance Overview</h2>
						<div className="chart-placeholder">
							<div style={{ width: "100%", height: 400 }}>
								<ResponsiveContainer width="100%" height="100%">
									<BarChart
										data={data}
										barGap={8}
										barCategoryGap={15}
									>
										<CartesianGrid stroke="none" />
										<XAxis dataKey="week" />
										<YAxis
											domain={[0, 100]}
											ticks={[0, 20, 40, 60, 80, 100]}
											tickFormatter={(tick) => `${tick}%`}
											padding={{ bottom: 20 }}
										/>
										<Tooltip
											formatter={(value) => `${value}%`}
										/>
										<Legend />
										<Bar
											dataKey="onTime"
											stackId="a"
											fill=" #7152F3"
											barSize={12}
											radius={10}
											padding={{ bottom: 20 }}
										/>
										<Bar
											dataKey="late"
											stackId="a"
											fill=" #FEB85B"
											barSize={12}
											radius={10}
											padding={{ bottom: 20 }}
										/>
										<Bar
											dataKey="absent"
											stackId="a"
											fill=" #F45B69"
											barSize={12}
											radius={10}
											padding={{ bottom: 20 }}
										/>
										<Bar
											dataKey="leave"
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
									const dateStr =
										date.toLocaleDateString("en-CA");
									if (
										date.toDateString() ===
										new Date().toDateString()
									) {
										return "today-highlight"; // Purple for current date
									} else if (taskDates.includes(dateStr)) {
										return "task-highlight";
									}
									return "";
								}}
								tileContent={({ date }) => {
									const dateStr =
										date.toLocaleDateString("en-CA"); // Convert date to YYYY-MM-DD format
									const tasksForDate = tasks.filter(
										(task) => task.date === dateStr
									);

									if (tasksForDate.length > 0) {
										return (
											<div
												className="task-tooltip-wrapper"
												onClick={(event) =>
													handleMouseEnter(
														event,
														dateStr,
														tasksForDate
													)
												}
												onMouseLeave={handleMouseLeave}
											>
												{/* 🔹 Red Dot for Task Days */}
												<span className="task-indicator">
													●
												</span>

												{/* 🔹 Tooltip for Task Details */}
												{hoveredDate?.dateStr ===
													dateStr && (
													<div
														className="task-tooltip"
														style={{
															top: tooltipPosition.y,
															left: tooltipPosition.x,
														}}
													>
														{hoveredDate.tasksForDate.map(
															(task, index) => (
																<div
																	key={index}
																	className="task-item"
																>
																	<div
																		onClick={() =>
																			handleRemoveTask(
																				task.date,
																				index
																			)
																		}
																		className="remove-task-container"
																		role="button"
																		tabIndex={
																			0
																		}
																	>
																		❌
																	</div>
																	<p>
																		<strong>
																			Task
																			Name:
																		</strong>{" "}
																		{
																			task.taskName
																		}
																	</p>

																	<p>
																		<strong>
																			Date:
																		</strong>{" "}
																		{
																			task.date
																		}
																	</p>
																</div>
															)
														)}
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
						<button
							onClick={() => setIsOpen(true)}
							className="plus-button"
						>
							<span>+ </span> Add Time & Task of Respective Person
						</button>

						{/* <div className="task-list">
       
      </div> */}
						{/* Modal */}
						{isOpen && (
							<div className="modal-overlay">
								<div className="modal-container">
									<h2 className="modal-title">Add Task</h2>
									<form
										onSubmit={handleSubmit}
										className="modal-form"
									>
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
											<button
												type="submit"
												className="submit-button"
											>
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

export default UserDashboard;
