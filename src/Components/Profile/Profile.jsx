import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Media from '../Explore/Media';
import POST1 from '../../assets/POST1/loremIpsum.png'; // Replace with your actual image import if needed

const Profile = () => {
    const navigate = useNavigate();
    const [albums, setAlbums] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        axios.get('/getMedia')
            .then(res => {
                setAlbums(res.data.albums || []);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="relative flex flex-col items-center min-w-screen w-full min-h-screen h-full font-montSerrat bg-[#1b1e20]">
            <div className="flex flex-col items-center w-full lg:w-[65rem] py-[2rem] lg:py-[8rem]">
                <img src={POST1} className="rounded-[50%] w-[10rem] h-[10rem]" alt="Profile" />
                <h1 className="mt-2 text-[28px]">{user && user.name}</h1>
                <div className="flex gap-4">
                    <a onClick={() => navigate("/edit-profile")} className="flex justify-center mt-2 cursor-pointer text-white font-bold bg-[#eb9898] w-[8rem] py-2 rounded-[8px] hover:text-white hover:bg-[#faa0a0]">Edit Profile</a>
                    <a onClick={() => navigate("/upload")} className="flex justify-center mt-2 cursor-pointer text-white font-bold bg-[#eb9898] w-[8rem] py-2 rounded-[8px] hover:text-white hover:bg-[#faa0a0]">Create Album</a>
                </div>
                <div className="mt-[1rem] flex justify-between text-gray-300 font-bold text-[14px] w-[10rem]">
                    <span><i>{albums.length}</i> ALBUMS</span>
                    <span><i>0</i> VIEWS</span>
                </div>
                <div className="mt-[3rem] flex gap-8 flex-wrap w-full">
                    {albums.map((album, index) => {
                        const images = album.files.filter(file => file.endsWith('png') || file.endsWith('jpeg') || file.endsWith('jpg'));
                        const videos = album.files.filter(file => file.endsWith('mp4'));

                        return (
                            (images.length > 0 || videos.length > 0) && (
                                <Media
                                    key={index}
                                    navigateTo={`/media/${album.code}`} // Use the album code for navigation
                                    thumbnail={[...images, ...videos]}
                                    userName={user && user.name}
                                    videoTitle={album.title}
                                    viewsNumber={album.views}
                                    videosNumber={videos.length}
                                    photosNumber={images.length}
                                />
                            )
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Profile;
