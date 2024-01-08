import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Media from '../Explore/Media';
import POST1 from '../../assets/POST1/loremIpsum.png';

const Profile = () => {
    const navigate = useNavigate();
    const [albums, setAlbums] = useState([]);
    const { user } = useContext(UserContext);
    const { username } = useParams();
    const [userStats,setUserStats] = useState(0);
    useEffect(() => {
        const fetchAlbums = async () => {
            const endpoint = user && user.name === username ? '/getMedia' : `/userAlbums/${username}`;
            try {
                const res = await axios.get(endpoint);
   
                setAlbums(res.data.albums || []);
            } catch (err) {
                console.log(err);
            }
        };

        fetchAlbums();

        const fetchUserStats = async () => {
            try {
              const response = await axios.post(`/user/${username}`);
              setUserStats(response.data);
              console.log(response.data)
            } catch (error) {
              console.error("Error fetching user stats:", error);
              // Handle error (e.g., show a message)
            }
          };
      
          if (username) {
            fetchUserStats();
          }
   

    }, [username, user]);

    // Calculate total views
    const totalViews = albums.reduce((acc, album) => acc + (album.views || 0), 0);

    return (
        <div className="relative flex flex-col items-center min-w-screen w-full min-h-screen h-full font-montSerrat bg-[#1b1e20]">
            <div className="flex flex-col items-center  w-[90%] lg:w-[65rem] py-[4rem] lg:py-[8rem]">
                {
                    userStats.userImage ?
                <img src={userStats.userImage } className="rounded-[50%] w-[10rem] h-[10rem]" alt="Profile" />
                :
                <span className='flex items-center justify-center w-[120px] lg:w-[200px] h-[120px] lg:h-[200px] text-[110px] lg:text-[180px] rounded-[50%] bg-[#3B3B3B]'>{user?.name[0].toUpperCase()}</span>
}
                <h1 className="mt-2 text-[28px]">{username}</h1>
                <div className="flex gap-4">
                    {user && user.name === username && (
                        <>
                            <a onClick={() => navigate("/edit-profile")} className="flex justify-center mt-2 cursor-pointer text-white font-bold bg-[#eb9898] w-[8rem] py-2 rounded-[8px] hover:text-white hover:bg-[#faa0a0]">Edit Profile</a>
                            <a onClick={() => navigate("/upload")} className="flex justify-center mt-2 cursor-pointer text-white font-bold bg-[#eb9898] w-[8rem] py-2 rounded-[8px] hover:text-white hover:bg-[#faa0a0]">Create Album</a>
                        </>
                    )}
                </div>
                
                <div className="mt-[1rem] flex justify-between text-gray-300 font-bold text-[14px] w-[20rem]">
                    <span><i>{albums.length}</i> ALBUMS</span>
                    <span><i>{totalViews}</i> VIEWS</span>
                    <a onClick={()=>navigate(`/user/${user.name}/following`)} className='font-bold cursor-pointer text-gray-300 hover:text-white'><i>{userStats.followingCount}</i> Following</a>
                    <span><i>{userStats.followersCount}</i> Followers</span>
                    {/* Following and followers count here */}
                </div>
                <p className='w-[80%] lg:w-[20rem] text-gray-300 text-center'>{user?.bio}</p>
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
                                    userName={album.userName || username} // Display the appropriate username
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
