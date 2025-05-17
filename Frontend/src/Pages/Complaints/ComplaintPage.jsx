import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Complaints/Complaints.css";
// import "./Page.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useAllComplaintsQuery } from "../../Redux/api/complaintsApi";
import { toast } from "react-toastify";

const ComplaintPage = () => {
	const [expanded, setExpanded] = useState({});
	const navigate = useNavigate();
	const toggleReadMore = (id) => {
		setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	const { data, isError, error, isLoading } = useAllComplaintsQuery();
  const complaints = data?.complaints;
//   console.log("complaints : ", complaints);

	if (isLoading) {
		return <div>Loading...</div>;
	} 
  if (isError) {
		console.log("error : ", error);
		toast.error(error?.data?.message || "Error fetching complaints data");
	}
	return (
		<div className="custom-shadow mt-3 rounded-md mx-auto  ">
			<div className="bg-white  rounded-lg p-3">
				<div className="flex  flex-col sm:flex-row sm:justify-between sm:items-center  space-y-2 sm:space-y-0">
					<button
						onClick={() => navigate("/complaint")}
						className="p-2 bg-violet-500  items-end  text-white rounded-md flex  gap-1 AddComplaintButton"
					>
						<IoIosAddCircleOutline className="text-2xl" />
						Add new Complaint
					</button>
				</div>
				{complaints ? (
					<div>
						{complaints?.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{complaints?.map((complaint) => (
									<div
										key={complaint._id}
										className="bg-white w-full rounded-lg p-4 border border-gray-200 h-full flex flex-col"
									>
										<div className="flex-grow">
											<h2 className="text-xl font-semibold mb-2 text-gray-700">
												{complaint.subject}
											</h2>
											<p className="text-gray-600 text-sm mb-1">
												<strong>Employee:</strong>{" "}
												{complaint.employee.username}
											</p>
											<p className="text-gray-600 text-sm mb-1">
												<strong>Date:</strong>{" "}
												{
													complaint.updatedAt.split(
														"T"
													)[0]
												}
											</p>
											<p className="text-gray-600 text-sm mb-2">
												<strong>Description:</strong>{" "}
												{expanded[complaint.id] ||
												complaint.description.length <=
													50
													? complaint.description
													: `${complaint.description.slice(
															0,
															50
													  )}... `}
												{complaint.description.length >
													50 && (
													<button
														onClick={() =>
															toggleReadMore(
																complaint.id
															)
														}
														className="text-blue-500 font-semibold"
													>
														{expanded[complaint.id]
															? "Read Less"
															: "Read More"}
													</button>
												)}
											</p>
										</div>
										<a
											href={
												complaint?.documents[0]?.url || "#"
											}
											target="_blank"
											rel="noopener noreferrer"
										>
											<button className="bg-violet-500 text-white text-sm font-semibold p-2 rounded-md w-24">
												View
											</button>
										</a>
									</div>
								))}
							</div>
						) : (
							<div className="mt-4">No complaints yet </div>
						)}
					</div>
				) : (
					<div className="mt-6 flex justify-center loader"></div>
				)}
			</div>
		</div>
	);
};

export default ComplaintPage;
