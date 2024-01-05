// In SearchResults.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Media from '../Explore/Media';
import { useNavigate, useParams } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const SearchResults = () => {
    const navigate = useNavigate();
    const { query } = useParams();
    const [albums, setAlbums] = useState([]);
    const [currentPage, setPage] = useState(0);

    useEffect(() => {
        axios.get(`/search?query=${query}`)
            .then(res => {
                setAlbums(res.data.albums || []);
            })
            .catch(err => console.log(err));
    }, [query]);

    const numberOfPages = Math.ceil(albums.length / 15);

    const IndexPage = () => {
        let allRefs = [];
        for (let i = 0; i < numberOfPages; i++) {
            allRefs.push(
                <a
                    key={i}
                    onClick={() => { navigate(`/search/${query}?page=${i + 1}`); setPage(i + 1) }}
                    className={`${currentPage === i + 1 ? "bg-[#ff0000]" : "bg-black"} text-white lg:text-[22px] cursor-pointer ease-in-out duration-[.3s]  px-4 py-1 hover:bg-[#ff0000] hover:text-white`}
                >
                    {i + 1}
                </a>
            );
        }
        return allRefs;
    };

    return (
        <div className={`flex flex-col items-center relative font-montSerrat bg-[#1b1e20] min-w-screen w-full min-h-screen h-full`}>
            <div className="flex flex-col w-full lg:w-[65rem] py-[4rem] lg:py-[8rem]">
                <h1 className="text-[28px] font-bold">Search Results for "{query}"</h1>
                <div className="flex mt-10 gap-10 justify-center lg:justify-start flex-wrap w-full">
                    {albums.map((album, index) => {
                        const images = album.files.filter(file => file.endsWith('png') || file.endsWith('jpeg') || file.endsWith('jpg'));
                        const videos = album.files.filter(file => file.endsWith('mp4'));

                        return (
                            <Media
                                key={index}
                                navigateTo={`/media/${album.code}`} // Use the unique album code for navigation
                                thumbnail={[...images, ...videos]}
                                userName={album.userName} // Using userName from the album
                                videoTitle={album.title}
                                videosNumber={videos.length}
                                photosNumber={images.length}
                            />
                        );
                    })}
                </div>
                <div className="flex items-center w-full justify-center text-[30px] text-white ">
                    <a onClick={() => { if (!(currentPage === 0 || currentPage === 1)) { navigate(`/search/${query}?page=${currentPage - 1}`); setPage(currentPage - 1) } }} className={`cursor-pointer ${(currentPage === 0 || currentPage === 1) ? "text-gray-400 hover:text-gray-400" : "text-white hover:text-white hover:bg-[#ff0000]"} bg-black px-2 py-2 `}>
                        <FaAngleLeft />
                    </a>
                    {IndexPage()}
                    <a onClick={() => { if (currentPage < numberOfPages) { navigate(`/search/${query}?page=${currentPage + 1}`); setPage(currentPage + 1) } }} className={`cursor-pointer ${currentPage === numberOfPages ? "text-gray-400 hover:text-gray-400" : "text-white hover:text-white hover:bg-[#ff0000]"} bg-black px-2 py-2 `}>
                        <FaAngleRight />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
