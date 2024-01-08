import { IoEyeSharp } from "react-icons/io5";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

// Replace this with your spinner component or CSS
const Spinner = () => <div className="w-[20rem] h-[15rem] border-white border-[1px]"></div>; // Placeholder spinner

const Media = ({ navigateTo, thumbnail, userName, videoTitle, viewsNumber = 0, videosNumber = false, photosNumber = false }) => {
  const navigate = useNavigate();
  const [currentThumbnail, setCurrentThumbnail] = useState(0);
  const [isPreviewed, setIsPreviewed] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New state for loading

  useEffect(() => {
    let timer;

    if (isPreviewed && thumbnail.length > 0) {
      timer = setInterval(() => {
        setCurrentThumbnail(prev => (prev + 1) % thumbnail.length);
      }, 1000);
    } else {
      setCurrentThumbnail(0);
    }

    return () => clearInterval(timer);
  }, [isPreviewed, thumbnail.length]);

  const handleImageLoad = () => {
    setIsLoading(false); // Set loading to false when image is loaded
  };

  return (
    <div>
      <div
        onMouseOver={() => setIsPreviewed(true)}
        onMouseOut={() => setIsPreviewed(false)}
        onClick={() => navigate(navigateTo)}
        className="relative flex cursor-pointer justify-center min-h-[15rem] h-[15rem] border-[1px] border-white   w-[20rem]"
      >
        {isLoading && <Spinner />} {/* Show spinner while loading */}
        <img
          src={`https://blisio-backend-d30f62efe387.herokuapp.com/uploads/${thumbnail[currentThumbnail]}`}
          className="w-full h-full"
          onLoad={handleImageLoad}
          style={{ display: isLoading ? 'none' : 'block' }}
          alt="Thumbnail"
        />
        <span className="absolute bottom-0 w-full h-[3rem] bg-gradient-to-b from-transparent to-black" />
        <div className="flex justify-between absolute bottom-2 w-[90%]">
          <div className="flex gap-2">
            <IoEyeSharp className="text-[18px] lg:text-[24px]" />
            <span className="font-bold">{viewsNumber}</span>
          </div>
          <div className="flex gap-2">
            {photosNumber !== 0 && (
              <>
                <MdOutlineInsertPhoto className="text-[18px] lg:text-[24px]" />
                <span className="font-bold">{photosNumber}</span>
              </>
            )}
            {videosNumber !== 0 && (
              <>
                <BsFillCameraReelsFill className="text-[16px] lg:text-[20px]" />
                <span className="font-bold">{videosNumber}</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center mt-2 w-full">
        <div className="rounded-[50%] bg-gray-200 w-[35px] h-[35px]"></div>
        <div className="flex ml-2 flex-col">
          <a className="text-[18px] font-bold text-gray-200 cursor-pointer hover:text-gray-200">{videoTitle}</a>
          <a className="text-gray-300 cursor-pointer hover:text-gray-300">{userName}</a>
        </div>
      </div>
    </div>
  );
};

export default Media;
