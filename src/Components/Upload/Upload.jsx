import React, { useState, useEffect, useRef, useContext } from "react";
import { BsUpload } from "react-icons/bs";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../UserContext';

const Upload = () => {
    const [files, setFiles] = useState([]);
    const [albumTitle, setAlbumTitle] = useState("");
    const [previewUrls, setPreviewUrls] = useState([]);
    const fileInputRef = useRef(null);
    
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const uploadPhoto = (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (let file of files) {
            formData.append('file', file);
        }
        formData.append('albumTitle', albumTitle);
        
        axios.post("/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => navigate("/user/" + user.name))
        .catch(err => console.log(err));
    };

    useEffect(() => {
        const newPreviewUrls = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(newPreviewUrls);

        return () => newPreviewUrls.forEach(url => URL.revokeObjectURL(url));
    }, [files]);

    const handleRemoveImage = (index) => {
        const updatedFiles = files.filter((_, fileIndex) => fileIndex !== index);
        setFiles(updatedFiles);

        const updatedPreviewUrls = previewUrls.filter((_, urlIndex) => urlIndex !== index);
        setPreviewUrls(updatedPreviewUrls);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="relative flex flex-col items-center w-screen h-screen font-montSerrat bg-[#1b1e20]">
            <div className="flex flex-col items-center justify-center w-full lg:w-[65rem] h-full py-[2rem] lg:py-[8rem]">
                <form className="flex flex-col justify-center items-center w-full h-full" onSubmit={(e)=>uploadPhoto(e)}>
                    <div className="flex flex-col lg:flex-row justify-center items-center w-[60%] gap-2">
                        <label className="font-bold whitespace-nowrap">Album Title</label>
                        <input value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)} className="px-2 py-1 rounded-[8px] w-full border-white border-[1px]" required />
                    </div>
                    <div className="mt-4 flex items-center justify-center w-[60%] h-[20rem]">
                        <label className="h-full w-full cursor-pointer flex flex-col items-center justify-center gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                            <BsUpload className="text-[46px] lg:text-[124px] opacity-60" />
                            <input
                                type="file"
                                multiple
                                ref={fileInputRef}
                                className="hidden w-full h-full"
                                onChange={(e) => setFiles(Array.from(e.target.files))}
                            />
                            <p className="text-center text-[16px] lg:text-[28px]">Click here to upload your files</p>
                        </label>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4">
    {previewUrls.map((url, index) => (
        <div key={index} className="relative">
            {files[index] && files[index].type === "video/mp4" ? (
                <div className="w-[12rem] h-[14rem] bg-black flex items-center justify-center">
                    <video
                        src={url}
                        alt={`Video Preview ${index}`}
                        className="max-w-full max-h-full object-contain"
                        controls
                    />
                </div>
            ) : (
                <img src={url} alt={`Image Preview ${index}`} className="w-[12rem] h-[14rem]" />
            )}
            <button onClick={() => handleRemoveImage(index)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-[2rem] h-[2rem] flex items-center justify-center">X</button>
        </div>
    ))}
</div>

                    <button type="submit" className="mt-4 rounded-[8px] font-bold w-[20rem] border-[1px] border-white hover:border-[#faa0a0]">UPLOAD</button>
                </form>
            </div>
        </div>
    );
};

export default Upload;
