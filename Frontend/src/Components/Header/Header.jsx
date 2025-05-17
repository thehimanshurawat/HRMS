import React, { useState, useRef, useEffect } from "react";
import { FaBell, FaChevronDown } from "react-icons/fa";
import { HiOutlineLogout, HiUser, HiHome } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import "./Header.css";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../Redux/api/userApi";
import { useSelector } from "react-redux";
import { userNotExist } from "../../Redux/reducers/userReducer";
import { toast } from "react-toastify";
import { useGetEmployeeNotificationsQuery, useLazyGetEmployeeNotificationsQuery } from "../../Redux/api/notificationApi";

const Header = ({ pageTitle }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);

  const { user } = useSelector((state) => state.userReducer);
  // console.log("user : ", user._id);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const [getNotification] = useLazyGetEmployeeNotificationsQuery();
  const {data : notificationData} = useGetEmployeeNotificationsQuery();

  // Websocket connection
    useEffect(() => {
      const socket = io(`${import.meta.env.VITE_SERVER}`, {withCredentials : true});
      
      // console.log("socket : ", socket);
      // console.log("socket id : ", socket.id);

      // Join room
      if (user?._id) {
        // console.log("joining room of user id : ", user._id);
        socket.emit("joinRoom", user._id);
      }
  
      // Listen for notification
      socket.on("receiveNotification", async (notification) => {
        // console.log("recieved notification : ", notification);
        await getNotification().unwrap();
        setNotificationCount((prevCount) =>  prevCount + 1);
      });
  
      return () => {
        socket.disconnect();
      };
    }, [user, getNotification]);

    

  // Handling notification count
  useEffect(() => {
    if(!notificationData){
      setNotificationCount(0);
    }
    else{
      let count = 0;
      notificationData?.notifications?.forEach((notification) => {
        if(notification.status === "unread"){
          count++;
        }
      })
      setNotificationCount(count);
    }
  },[notificationData])

  const handleLogout = async () => {
    await logout();
    dispatch(userNotExist());
    navigate("/login"); // ✅ Redirect to login page after logout
    toast.success("logged-out")
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsDropdownOpen(false);
  };
  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`topBar relative h-full`}>
      {/* Backdrop Blur Overlay when dropdown is open */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 backdrop-blur-md z-10"
          onClick={() => setIsDropdownOpen(false)}
        ></div>
      )}

      {/* Header Section */}
      <div className="headerTopBar flex justify-between items-center relative z-20 MainHeader ">
        {/* Page Title & Greeting */}
        <div className="flex flex-col pt-3">
          <h2 className="text-xl font-semibold HeadingText ">{pageTitle}</h2>
          <p className="text-gray-500 text-sm HeadingGreeting">{greeting}</p>
        </div>

        {/* Notification & User Dropdown */}
        <div className="flex items-center gap-2">
          {/* Notification Bell */}
          <button
            className="relative bg-gray-200 hover:bg-gray-300 p-3  transition notifications"
            aria-label="Notifications"
            onClick={() => handleNavigation("/notification")}
          >
            {notificationCount > 0 && <span className="notification-tag">{notificationCount}</span>}
            <FaBell className="text-gray-600 text-xl cursor-pointer max-[330px]:text-[15px] notification" />
          </button>

          {/* User Profile Dropdown */}
          <div
            ref={dropdownRef}
            className="relative profileContainer bg-gray-200 "
          >
            
            <button
              className="flex items-center gap-2 p-2 content-center h-12 rounded-lg border-gray-300 cursor-pointer hover:shadow-md transition avataruse"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-expanded={isDropdownOpen}
            >
              {/* Avatar */}
              <img
                src={user.profileImg}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />

              

              <div className="max-md:hidden md:flex flex-col justify-center Robert">
                <span className="font-medium text-base leading-none mb-2">
                  {user.username}
                </span>
                <span className="text-gray-500 text-sm leading-none designationmd">
                  {user.role}
                </span>
              </div>

              {/* Dropdown Arrow */}
              <FaChevronDown className="text-gray-600" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute bg-white right-0 top-full mt-2 w-48 border border-gray-300 rounded-lg shadow-lg py-2 z-30 max-w-[90vw]">
                <ul className="space-y-1 dropul">
                  <li
                    onClick={() => handleNavigation(`/profile/${user._id}`)}
                    className="px-3 py-2 flex items-center gap-2 hover:bg-gray-50 cursor-pointer dropli"
                  >
                    <HiUser className="text-gray-600" />
                    <span className="text-sm">My Profile</span>
                  </li>
                  <li
                    className="px-3 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer text-red-500"
                    onClick={handleLogout}
                  >
                    <HiOutlineLogout className="text-red-500" />
                    <span className="text-sm">Logout</span>
                  </li>
                  <li
                    className="px-3 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer dropli"
                    onClick={() => {
                      if (user.role === "Employee") {
                        handleNavigation("user-dashboard");
                      } else {
                        handleNavigation("/");
                      }
                    }}
                  >
                    <HiHome className="text-gray-600" />
                    <span className="text-sm">Back to Dashboard</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
