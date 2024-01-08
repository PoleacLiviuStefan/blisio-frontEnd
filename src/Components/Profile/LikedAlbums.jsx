import {React, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import Media from "../Explore/Media";
import axios from 'axios'
const LikedAlbums = () => {

    const navigate = useNavigate();
    const [albums,setAlbums]=useState([]);

    useEffect(() => {
        const fetchLikedAlbums = async () => {
            try {
                const response = await axios.get('/getLikedAlbums'); // Update with your actual API endpoint
                setAlbums(response.data);
            } catch (error) {
                console.error('Error fetching liked albums:', error);
                // Handle errors appropriately
            }
        };

        fetchLikedAlbums();
    }, []);

  return (
    <div className="relative flex flex-col items-center w-full h-full font-montSerrat bg-[#1b1e20]">
      <div className="flex gap-8 flex-col  w-[90%] lg:w-[65rem] py-[4rem] lg:py-[8rem]">
      <h1 className="text-[18px] lg:text-[28px] font-bold">LIKED VIDEOS</h1>
      {albums.length===0  ? <p>No videos liked yet</p>:albums.map((album, index) => {
      const images = album.thumbnail.filter(
              (file) =>
                file.endsWith("png") ||
                file.endsWith("jpeg") ||
                file.endsWith("jpg")
            );
            const videos = album.thumbnail.filter((file) => file.endsWith("mp4"));
            console.log(album.code);
      return (<Media
                key={index}
                navigateTo={`/media/${album.code}`} // Use the unique album code for navigation
                thumbnail={[...images, ...videos]}
                userName={album.userName} // Using userName from the album
                videoTitle={album.title}
                viewsNumber={album.views}
                videosNumber={videos.length}
                photosNumber={images.length}
              />
      )})}
      </div>
    </div>
  );
};

export default LikedAlbums;
