import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaChevronDown,
  FaGoogle,
  FaReddit,
  FaTwitter,
  FaBell,
} from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { MdEmail, MdOutlineRssFeed } from "react-icons/md";
import { RiAccountCircleFill } from "react-icons/ri";
import { UserContext } from "../../UserContext";
import { FiUpload } from "react-icons/fi";


import axios from "axios";
import NavbarMobile from "./NavbarMobile";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, loading } = useContext(UserContext);
  const [showSignInOptions, setShowSignInOptions] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDisconnect = async () => {
    try {
      await axios.get("/disconnect");
      navigate("/explore");
      window.location.reload();
    } catch (e) {
      alert(e);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <div className="z-50 flex justify-center text-gray-300 font-montSerrat fixed bg-[#181818] top-0 left-0 w-full h-[3rem] lg:h-[4rem]">
      <div className="hidden lg:flex justify-between items-center w-full lg:w-[65rem] h-full">
        <a
          onClick={() => navigate("/explore")}
          className="text-gray-300 text-[16px] lg:text-[22px] cursor-pointer ease-in-out duration-[.3s]"
        >
          LOGO
        </a>
        <div className="inline relative flex  lg:w-[30rem]">
          <button
            onClick={handleSearch}
            className="absolute top-[-3px] left-[-7px] cursor-pointer bg-transparent"
          >
            <FaSearch />
          </button>
          <input
            className="rounded-[10px] w-[10rem] lg:w-[30rem] h-[2rem] px-[3rem]"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <div className="flex items-center h-full gap-8 text-[14px] lg:text-[18px] w-[20%] lg:w-[10%]">
          {loading ? (
            <div>Loading...</div>
          ) : user ? (
            <div className="relative h-full flex items-center">
                <a onClick={()=>navigate("/feed")} className=""><MdOutlineRssFeed className="mr-4 cursor-pointer text-[22px] text-white hover:text-gray-300" /></a>
                <a onClick={()=>navigate("/liked-videos")} className=""><FaHeart className="mr-4 cursor-pointer text-[18px] text-white hover:text-gray-300" /></a>
              <div className="relative  flex flex-col">
                <FaBell
                  onClick={()=>navigate("/notifications")}
                  className="mr-4 cursor-pointer text-white hover:text-gray-300"
                />
                <ul>
                    
                </ul>
              </div>
              <div
                className="relative flex flex-col"
                onMouseOver={() => setShowProfileOptions(true)}
                onMouseOut={() => setShowProfileOptions(false)}
              >
                <button className="flex items-center gap-1 cursor-pointer text-white hover:text-white">
                  <RiAccountCircleFill className="text-[16px] lg:text-[24px]" />{" "}
                  {user.name}
                </button>
                <ul
                  className={`${
                    !showProfileOptions && "hidden"
                  } flex flex-col items-left gap-2 px-2 absolute top-[2.5rem] lg:top-[3rem] bg-[#181818]`}
                >
                  <li
                    onClick={() => navigate("/user/" + user.name)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <RiAccountCircleFill />Profile
                  </li>
                  <li
                    onClick={() => navigate("/upload")}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <FiUpload /> Upload
                  </li>
                  <li
                    onClick={() => navigate("/edit-profile")}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                   Settings
                  </li>
                  <li
                    onClick={handleDisconnect}
                    className="flex items-center gap-2 text-red-500 cursor-pointer"
                  >
                    Disconnect
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div
              className="relative h-full"
              onClick={() => setShowSignInOptions(!showSignInOptions)}
            >
              <a className="flex items-center whitespace-nowrap h-full gap-2 text-gray-300 cursor-pointer ease-in-out duration-[.3s] hover:text-gray-400">
                SIGN IN <FaChevronDown />
              </a>
              <div
                className={`flex flex-col justify-between h-[18rem] bg-[#181818] ${
                  !showSignInOptions && "hidden"
                } text-white`}
              >
                <ul className="flex flex-col justify-between h-full py-4">
                  <li className="flex items-center gap-2 cursor-pointer p-4">
                    <FaGoogle />
                    Google
                  </li>
                  <li className="flex items-center gap-2 cursor-pointer p-4">
                    <FaReddit /> Reddit
                  </li>
                  <li className="flex items-center gap-2 cursor-pointer p-4">
                    <FaTwitter />
                    Twitter
                  </li>
                  <li
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-2 cursor-pointer p-4"
                  >
                    <MdEmail />
                    Email
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

      </div>
      <div className="lg:hidden w-[90%] h-full flex justify-between items-center">
     

      {loading ? (
            <div>Loading...</div>
          ) : user ? <div className="relative w-[2rem] h-full"><NavbarMobile disconnectFunction={handleDisconnect}   /></div>
          : (
            <div
              className="lg:hidden relative h-full"
              onClick={() => setShowSignInOptions(!showSignInOptions)}
            >
              <a className="flex items-center whitespace-nowrap w-[8rem] h-full gap-2 text-gray-300 cursor-pointer ease-in-out duration-[.3s] hover:text-gray-400 ">
                SIGN IN <FaChevronDown />
              </a>
              <div
                className={`flex flex-col justify-between  h-[18rem] bg-[#181818] ${
                  !showSignInOptions && "hidden"
                } text-white`}
              >
                <ul className="flex flex-col justify-between w-[8rem] h-full py-4">
                  <li className="flex items-center gap-2 cursor-pointer p-4">
                    <FaGoogle />
                    Google
                  </li>
                  <li className="flex items-center gap-2 cursor-pointer p-4">
                    <FaReddit /> Reddit
                  </li>
                  <li className="flex items-center gap-2 cursor-pointer p-4">
                    <FaTwitter />
                    Twitter
                  </li>
                  <li
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-2 cursor-pointer p-4"
                  >
                    <MdEmail />
                    Email
                  </li>
                </ul>
              </div>
            </div>
          )
      }
    
            <input
            className="rounded-[10px] w-[10rem] lg:w-[30rem] h-[2rem] px-[3rem]"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <a onClick={() => navigate("/explore")} className="">LOGO</a>
      </div>
    </div>
  );
};

export default Navbar;
