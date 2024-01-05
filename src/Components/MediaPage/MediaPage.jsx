import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaPlay } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FaShare } from "react-icons/fa";
import { CiChat2 } from "react-icons/ci";
import { MdGridView } from "react-icons/md";

const MediaPage = () => {
    const { albumCode } = useParams();
    const [album, setAlbum] = useState(null);
    const [userName, setUserName] = useState('');
    const videoRefs = useRef([]);
    const [playing, setPlaying] = useState([]);

    useEffect(() => {
        axios.get(`/albums/${albumCode}`)
            .then(response => {
                const albumData = response.data._doc; // Accessing the album data
                setAlbum(albumData);
                setUserName(response.data.userName); // Setting the username
                const videoMaterial = albumData.files?.filter(file => file.endsWith('.mp4')) || [];
                setPlaying(Array(videoMaterial.length).fill(false));
                videoRefs.current = videoMaterial.map(() => React.createRef());
            })
            .catch(error => {
                console.error('Error fetching album:', error);
            });

            axios.get(`/album/view/${albumCode}`)
            .catch(error => console.error('Error incrementing views:', error));
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

    if (!album) {
        return <div>Loading...</div>; // Loading state
    }

    const { title: videoTitle, files } = album;
    const imageMaterial = files.filter(file => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg'));

    return (
        <div className="relative flex flex-col items-center w-full h-full font-montSerrat bg-[#1b1e20]">
            <div className="flex gap-8 flex-col w-full lg:w-[65rem] py-[4rem] lg:py-[8rem]">
                <div className="flex flex-col lg:items-start items-center w-full">
                    <h1 className="font-extrabold text-[22px] lg:[28px] xl:text-[48px]">{videoTitle}</h1>
                    <div className="flex flex-col lg:flex-row mt-[1rem] lg:mt-[2rem] w-full justify-between items-center ">
                        <div className="flex items-center gap-2 lg:gap-4">
                            <a className="text-[16px] lg:text-[22px] font-bold text-white cursor-pointer hover:text-white">{userName}</a>
                            <button className="bg-[#eb9898] font-bold text-[14px] lg:text-[18px] hover:bg-[#faa0a0]">
                                FOLLOW
                            </button>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="flex gap-2"><IoEyeSharp className="text-[18px] lg:text-[24px]" /> </span>
                            <span className="flex gap-2"><MdOutlineInsertPhoto className="text-[18px] lg:text-[24px]" />{imageMaterial.length}</span>
                            <span className="flex gap-2"><BsFillCameraReelsFill className=" text-[16px] lg:text-[20px]"/>{files.length - imageMaterial.length}</span>
                            <button className="text-[18px] lg:text-[24px]"><CiHeart /></button>
                            <button className="text-[18px] lg:text-[24px]"><FaShare /></button>
                        </div>
                    </div>
                </div>
                {imageMaterial.map((img, index) => (
                    <img key={index} src={`https://site-blisio.netlify.app/uploads/${img}`} className="w-full h-full" alt={`Image ${index}`} />
                ))}
                {files.filter(file => file.endsWith('.mp4')).map((vid, index) => (
                    <div key={index} className="relative w-full h-full">
                        <video
                            ref={el => videoRefs.current[index] = el}
                            src={`https://site-blisio.netlify.app/uploads/${vid}`}
                            className="relative w-full h-full"
                            controls
                        />
                        {!playing[index] && (
                            <button className="center z-30 text-[120px] hidden" onClick={() => playVideo(index)}>
                                <FaPlay />
                            </button>
                        )}
                    </div>
                ))}
                <h2 className="flex items-center gap-2 text-[18px] lg:text-[28px] text-gray-300">
                    <CiChat2 className="text-[48px]" />Comments
                </h2>
                <p className="flex items-center gap-2 text-[18px] lg:text-[28px] text-gray-300">
                    <MdGridView className="text-[48px]" />See More Posts
                </p>
            </div>
        </div>
    );
};

export default MediaPage;
