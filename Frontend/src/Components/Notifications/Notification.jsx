import React, { useEffect, useState } from "react";
import "./Notification.css";
import {
	useGetEmployeeNotificationsQuery,
	useMarkAsReadMutation,
} from "../../Redux/api/notificationApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Notification = () => {
	const [notifications, setNotifications] = useState([]);

	const { user } = useSelector((state) => state.userReducer);

	const { data, isLoading, isError, error } =
		useGetEmployeeNotificationsQuery();

	const [markAsRead] = useMarkAsReadMutation();

	// console.log("data : ", data);
	useEffect(() => {
		if (!data) {
			setNotifications([]);
		} else {
			setNotifications(data.notifications);
		}
	}, [data]);

	if (isError) {
		console.log("error : ", error);
		toast.error(error.data.message || "Notification not found");
	}

	const markAllReadHandler = async () => {
		await markAsRead();
	};

	if(notifications.length <= 0){
		return <p className="text-center mt-4 text-2xl font-bold">No Notifications yet</p>
	}

	return (
		<div className="pt-2 mx-auto font-[Lexend] max-[330px]:text-[8px] relative">
			{notifications.length > 0 && <button
				type="button"
				onClick={markAllReadHandler}
				className="flex text-blue-700 underline text-[1rem] absolute right-0 my-2 mx-4"
			>
				Mark all as read
			</button>}
			<div className="shadow-md rounded-lg p-4 text-sm notificationContainer">
				{notifications.map((notification) => {
					const empId = notification?.message.split(" | ID : ")[1];
					console.log("empId : ", notification)
					return (
						<div
							key={notification.id}
							className="flex gap-2 p-3 border-b border-zinc-300 last:border-b-0 items-center"
						>
							<img
								src={user.profileImg}
								alt={"Profile Image"}
								className="w-10 h-10 rounded-full max-[330px]:w-7 max-[330px]:h-7 "
							/>
							<Link 
								to={
									notification.type === "complaint" ? '/complaintPage' 
									: (notification.type === "leave" 
										? `/leave/${empId ?? user._id}`
										: `/employee-attendance/${user._id}`
									)
								} 
								className="flex-1" style={{textDecoration : "none"}}>
									<p className="text-zinc-400 font-light">
										{notification.message.split("|")[0]}
									</p>
							</Link>
							<p className="text-gray-400 text-sm whitespace-nowrap max-[330px]:text-[8px]">
								{notification.createdAt?.toString().split("T")[0]}
							</p>
						</div>
					)
				})}
			</div>
		</div>
	);
};

export default Notification;
