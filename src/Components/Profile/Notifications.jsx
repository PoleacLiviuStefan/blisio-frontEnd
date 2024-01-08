import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";


const Notifications = () => {
  
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
    useEffect(() => {
        // Fetch notifications when the component mounts
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('/notifications', { withCredentials: true }); // make sure the URL is correct
                setNotifications(response.data);
            } catch (error) {
                console.error("Error fetching notifications:", error);
                // Handle error (show message, redirect, etc.)
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div className="relative flex flex-col items-center w-full h-full font-montSerrat bg-[#1b1e20]">
            <div className="flex gap-8 flex-col w-[90%] lg:w-[65rem] py-[4rem] lg:py-[8rem]">
                <h1 className="text-[18px] lg:text-[28px] font-bold">NOTIFICATIONS</h1>
                <div>
                    {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                            <div onClick={()=>navigate(`/media/${notification.albumCode}`)} key={index} className="cursor-pointer lg:text-[24px]">
                                <p>{notification.message}</p>
                                {/* Additional details can be displayed here */}
                            </div>
                        ))
                    ) : (
                        <p>No new notifications</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notifications;
