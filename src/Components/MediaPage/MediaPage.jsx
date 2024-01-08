import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPlay } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FaShare } from "react-icons/fa";
import { CiChat2 } from "react-icons/ci";
import { MdGridView } from "react-icons/md";
import { UserContext } from "../../UserContext";
import { FaCheck } from "react-icons/fa";
import Media from "../Explore/Media";

const MediaPage = () => {
  const { albumCode } = useParams();
  const [album, setAlbum] = useState(null);
  const [userName, setUserName] = useState("");
  const videoRefs = useRef([]);
  const [playing, setPlaying] = useState([]);
  const { user } = useContext(UserContext);
  const [commentInput, setCommentInput] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [currentComments, setCurrentComments] = useState([]);
  const [followedUser, setFollowedUser] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(0);
  const [viewsNumber, setViewsNumber] = useState(0);
  const [currentUserLiked, setCurrentUserLiked] = useState(false);
  const [sugestedPosts, setSugestedPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/albums/${albumCode}`)
      .then(async (response) => {
        console.log(response.data);
        const albumData = response.data._doc; // Accessing the album data
        setAlbum(albumData);
        setUserName(response.data.userName); // Setting the username
        const videoMaterial =
          albumData.files?.filter((file) => file.endsWith(".mp4")) || [];
        setPlaying(Array(videoMaterial.length).fill(false));
        videoRefs.current = videoMaterial.map(() => React.createRef());
        setNumberOfLikes(albumData.likes);
        setViewsNumber(albumData.views);
        try {
          const response = await axios.post(`/album/whoLiked`, {
            idsArray: albumData.likesByUsers,
          });
          if (response.data);
          setCurrentUserLiked(true);
        } catch (error) {
          console.error("Error for like:", error);
        }
      })
      .catch((error) => {
        console.error("Error fetching album:", error);
      });

    axios
      .get(`/album/view/${albumCode}`)
      .catch((error) => console.error("Error incrementing views:", error));

    const checkIfUserFollowed = async () => {
      try {
        console.log(albumCode);
        const response = await axios.get(`/albums/${albumCode}/follow-check`);
        console.log(response.data);
        setFollowedUser(response.data.isFollowing);
      } catch (error) {
        console.error("Error for follow:", error);
      }
    };

    checkIfUserFollowed();

    const fetchMoreAlbums = async () => {
      try {
        const response = await axios.get(`/getMoreAlbums/${albumCode}`);
        console.log("More Albums:", response.data.albums);
        setSugestedPosts(response.data.albums);
        // Process and store these albums as needed
      } catch (error) {
        console.error("Error fetching more albums:", error);
      }
    };

    fetchMoreAlbums();
  }, [albumCode]);

  const fetchComments = async () => {
    try {
      console.log(albumCode);
      const response = await axios.get(`/getComments/${albumCode}`);
      console.log(response.data);
      setCurrentComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [albumCode]);

  const playVideo = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.play();
      const updatedPlaying = playing.slice(); // Copy the playing array
      updatedPlaying[index] = true; // Update the playing status for the clicked video
      setPlaying(updatedPlaying); // Set the new playing status
    }
  };

  const handleLike = async () => {
    setCurrentUserLiked((prev) => !prev);

    try {
      console.log(albumCode);
      const response = await axios.post(`/addLikeToAlbum/${albumCode}`);
      if (response.data.message === "Like added to album")
        setNumberOfLikes((prev) => prev + 1);
      else setNumberOfLikes((prev) => prev - 1);
      console.log(response.data.message);
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  const handleFollow = async () => {
    try {
      const response = await axios.post("/followUser", {
        usernameToFollow: userName,
      });
      console.log(response.data.message);
      setFollowedUser((prev) => !prev);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleAddComment = async () => {
    try {
      console.log(albumCode);
      // Assume we're sending the commentContent to the server
      const response = await axios.post(`/addComment/${albumCode}`, {
        comment: commentContent,
      });

      // Create a new comment object to add to the current comments
      const newComment = {
        username: user.name, // Assuming user.name is the username of the current user
        text: commentContent,
        // Add any other necessary fields that your comment might have
      };

      // Update the state with the new comment
      setCurrentComments((prevComments) => {
        const updatedComments = [...prevComments, newComment];
        console.log("Updated comments:", updatedComments); // Debugging log
        return updatedComments;
      });

      // Clear the comment input field
      setCommentContent("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!album) {
    return <div>Loading...</div>; // Loading state
  }

  const { title: videoTitle, files } = album;
  const imageMaterial = files.filter(
    (file) =>
      file.endsWith(".png") || file.endsWith(".jpg") || file.endsWith(".jpeg")
  );

  return (
    <div className="relative flex flex-col items-center w-full h-full font-montSerrat bg-[#1b1e20]">
      <div className="flex gap-8 flex-col w-full lg:w-[65rem] py-[4rem] lg:py-[8rem]">
        <div className="flex flex-col lg:items-start items-center w-full">
          <h1 className="font-extrabold text-[22px] lg:[28px] xl:text-[48px]">
            {videoTitle}
          </h1>
          <div className="flex flex-col lg:flex-row mt-[1rem] lg:mt-[2rem] w-full justify-between items-center ">
            <div className="flex items-center gap-2 lg:gap-4">
              <a
                onClick={() => navigate(`/user/${userName}`)}
                className="text-[16px] lg:text-[22px] font-bold text-white cursor-pointer hover:text-white"
              >
                {userName}
              </a>
              <button
                onClick={handleFollow}
                className={` ${
                  !followedUser
                    ? "bg-[#eb9898] hover:bg-[#faa0a0]"
                    : "border-[#eb9898] text-gray-300 hover:border-[#eb9898]"
                } font-bold text-[14px] lg:text-[18px] `}
              >
                {followedUser ? (
                  <div className="flex items-center gap-2 ">
                    <FaCheck /> FOLLOWING
                  </div>
                ) : (
                  "FOLLOW"
                )}
              </button>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex gap-2">
                <IoEyeSharp className="text-[18px] lg:text-[24px]" />{" "}
                {viewsNumber}
              </span>
              <span className="flex gap-2">
                <MdOutlineInsertPhoto className="text-[18px] lg:text-[24px]" />
                {imageMaterial.length}
              </span>
              <span className="flex gap-2">
                <BsFillCameraReelsFill className=" text-[16px] lg:text-[20px]" />
                {files.length - imageMaterial.length}
              </span>
              <button
                onClick={handleLike}
                className={`flex gap-2 items-center ${
                  currentUserLiked && "bg-red-600"
                }`}
              >
                {/*Likes Number*/}
                <CiHeart className="text-[18px] lg:text-[24px]" />
                {numberOfLikes}
              </button>
              <button className="text-[18px] lg:text-[24px]">
                {/*Shares Number*/}
                <FaShare />
              </button>
            </div>
          </div>
        </div>
        {imageMaterial.map((img, index) => (
    <div key={index} className="flex items-center justify-center w-full h-[40rem] bg-black">
        <img
            src={`https://blisio-backend-d30f62efe387.herokuapp.com/uploads/${img}`}
            className="object-contain max-w-full max-h-full"
            alt={`Image ${index}`}
        />
    </div>
))}
{files
  .filter((file) => file.match(/\.(mp4|mov|avi|flv|wmv)$/i)) // Filters for multiple video formats
  .map((vid, index) => (
    <div key={index} className="flex items-center justify-center w-full h-[40rem] bg-black">
      <video
        ref={(el) => (videoRefs.current[index] = el)}
        src={`https://blisio-backend-d30f62efe387.herokuapp.com/uploads/${vid}`}
        className="object-contain max-w-full max-h-full"
        controls
      />
      {!playing[index] && (
        <button
          className="absolute z-30 text-[120px] center hidden"
          onClick={() => playVideo(index)}
        >
          <FaPlay />
        </button>
      )}
    </div>
  ))
}

        <div className="flex flex-col">
          <h2 className="mb-4 flex items-center gap-2 text-[18px] lg:text-[28px] text-gray-300">
            <CiChat2 className="text-[48px]" />
            Comments
          </h2>
          {currentComments && currentComments.length > 0 ? (
            currentComments.map((comment, index) => (
              <div className="flex gap-4">
                <a
                  onClick={() => navigate(`/user/${comment.username}`)}
                  className="text-[#faa0a0]"
                >
                  {" "}
                  {comment.username}:
                </a>{" "}
                <p key={index}>{comment.text}</p>
              </div>
            ))
          ) : (
            <p>No comments yet</p>
          )}
          {!commentInput ? (
            <button
              onClick={() => setCommentInput(true)}
              className="mt-8 bg-[#1B1E20] w-[15rem] border-[1px]  border-white"
            >
              Add a comment
            </button>
          ) : (
            <div className="mt-8 flex flex-col items-center lg:items-start p-2">
              <div className="flex flex-col items-center">
                <textarea
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  className="p-2 w-full lg:w-[25rem]"
                  maxLength={160}
                />
                <button
                  onClick={() => {
                    handleAddComment();
                    fetchComments();
                  }}
                  className="mt-4 border-white border-[1px] w-full lg:w-[10rem]"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
        <p className="mt-8 flex items-center gap-2 text-[18px] lg:text-[28px] text-gray-300">
          <MdGridView className="text-[48px]" />
          See More Posts
        </p>
        <div className="flex gap-10 justify-center lg:justify-start flex-wrap w-full">
          {sugestedPosts.map((album, index) => {
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
      </div>
    </div>
  );
};

export default MediaPage;
