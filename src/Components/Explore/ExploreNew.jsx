import React, { useEffect, useState } from "react";
import axios from "axios";
import Media from "./Media";
import CheckAge from "./CheckAge";
import { useNavigate, useLocation } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const ExploreNew = () => {
  const [albums, setAlbums] = useState([]);
  const [currentPage, setPage] = useState(0);
  const navigate = useNavigate();


  // Assuming 15 albums per page for pagination
  const numberOfPages = Math.ceil(albums.length / 15);

  useEffect(() => {
    axios.get("/getMediaAll") // Replace with your actual API endpoint
      .then((res) => {
        console.log(res.data.albums)
        setAlbums(res.data.albums || []);
      })
      .catch((err) => console.log(err));
  }, []);

  const IndexPage = () => {
    let allRefs = [];
    for (let i = 0; i < numberOfPages; i++) {
      allRefs.push(
        <a
          key={i}
          onClick={() => {
            navigate(`/explore?page=${i + 1}`);
            setPage(i + 1);
          }}
          className={`${
            currentPage === i + 1 ? "bg-[#ff0000]" : "bg-black"
          } text-white lg:text-[22px] cursor-pointer ease-in-out duration-[.3s]  px-4 py-1 hover:bg-[#ff0000] hover:text-white`}
        >
          {i + 1}
        </a>
      );
    }
    return allRefs;
  };

  return (
    <div
      className={`flex flex-col items-center relative font-montSerrat bg-[#1b1e20]  min-w-screen w-full min-h-screen h-full"
      `}
    >
      
      <div className="flex flex-col w-[90%] lg:w-[65rem] py-[4rem] lg:py-[8rem]">
        <h1 className="text-[18px] lg:text-[28px] font-bold">EXPLORE</h1>
        <ul className="flex my-4 gap-4 lg:text-[20px] font-extrabold text-white">
          <li className="flex flex-col">
            <a
              onClick={() => navigate("/explore")}
              className="text-white cursor-pointer hover:text-white px-4  rounded-[5px]"
            >
              HOT
            </a>
          </li>
          <li className="flex flex-col">
            <a
              onClick={() => navigate("/explore/new")}
              className="text-white cursor-pointer hover:text-white px-4 bg-[#ff0000] rounded-[5px]"
            >
              NEW
            </a>
          </li>
        </ul>
        <div className="flex gap-10 justify-center lg:justify-start flex-wrap w-full">
          {albums.map((album, index) => {
            const images = album.files.filter(
              (file) =>
                file.endsWith("png") ||
                file.endsWith("jpeg") ||
                file.endsWith("jpg")
            );
            const videos = album.files.filter((file) => file.endsWith("mp4"));
            console.log(album.code);
            return (
              <Media
                key={index}
                navigateTo={`/media/${album.code}`} // Use the unique album code for navigation
                thumbnail={[...images, ...videos]}
                userName={album.userName} // Using userName from the album
                videoTitle={album.title}
                viewsNumber={album.views}
                videosNumber={videos.length}
                photosNumber={images.length}
              />
            );
          })}
        </div>
        <div className="flex items-center w-full justify-center text-[26px] text-white ">
          <a
            onClick={() => {
              if (!(currentPage === 0 || currentPage === 1)) {
                navigate(`/explore?page=${currentPage - 1}`);
                setPage(currentPage - 1);
              }
            }}
            className={`cursor-pointer ${
              currentPage === 0 || currentPage === 1
                ? "text-gray-400 hover:text-gray-400"
                : "text-white hover:text-white hover:bg-[#ff0000]"
            } bg-black px-2 py-2 `}
          >
            <FaAngleLeft />
          </a>
          {IndexPage()}
          <a
            onClick={() => {
              if (currentPage < numberOfPages) {
                navigate(`/explore?page=${currentPage + 1}`);
                setPage(currentPage + 1);
              }
            }}
            className={`cursor-pointer ${
              currentPage === numberOfPages
                ? "text-gray-400 hover:text-gray-400"
                : "text-white hover:text-white hover:bg-[#ff0000]"
            } bg-black px-2 py-2 `}
          >
            <FaAngleRight />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ExploreNew;
