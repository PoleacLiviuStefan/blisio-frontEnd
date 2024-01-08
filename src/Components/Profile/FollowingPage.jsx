import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaCheck } from "react-icons/fa";

const FollowingPage = () => {
  const [following, setFollowing] = useState([]);
  const [currentFollow, setCurrentFollow] = useState({});
  const navigate = useNavigate();
  const userId = useParams();

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await axios.post(`/user/${userId.username}/following`);
        const followingData = response.data;
        
        // Assuming the data includes a field to indicate if the current user is following them
        const followStatus = followingData.reduce((acc, user) => {
          acc[user.name] = user.isFollowed; // Replace 'isFollowed' with the actual field name
          return acc;
        }, {});

        setFollowing(followingData);
        setCurrentFollow(followStatus);
      } catch (error) {
        console.error("Error fetching following data:", error);
        // Handle error
      }
    };

    fetchFollowing();
  }, [userId]);

  const handleFollow = async (username) => {
    try {
      const response = await axios.post("/followUser", { usernameToFollow: username });
      console.log(response.data.message);

      setCurrentFollow(prev => ({ ...prev, [username]: !prev[username] }));
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return (
    <div className="relative flex flex-col items-center w-full h-full font-montSerrat bg-[#1b1e20]">
      <div className="flex gap-8 flex-col  w-[90%] lg:w-[65rem] py-[4rem] lg:py-[8rem]">
        {following.map((user, index) => (
          <div className="grid grid-cols-6  items-center justify-items-center w-full" key={index}>
            <p>{user.name}</p>
            <button
              onClick={() => handleFollow(user.name)}
              className={` ${
                currentFollow[user.name]
                  ? "bg-[#eb9898] hover:bg-[#faa0a0]"
                  : "border-[#eb9898] text-gray-300 hover:border-[#eb9898]"
              } font-bold text-[14px] lg:text-[16px] `}
            >
              {!currentFollow[user.name] ? (
                <div className="flex items-center gap-2 ">
                  <FaCheck /> FOLLOWING
                </div>
              ) : (
                "FOLLOW"
              )}
            </button>
            <p>{user.albumsCount} Albums</p>
            <p>{user.views} Views</p>
            <p>{user.followersCount} Followers</p>
            <p>{user.followingCount} Following</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowingPage;
